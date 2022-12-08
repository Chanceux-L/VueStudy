/* eslint-disable no-console */
const async = require('async');
const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');
const ora = require('ora');
const mime = require('mime-types');
const {
  S3Client,
  PutObjectCommand,
  ListObjectsCommand,
  DeleteObjectsCommand,
} = require('@aws-sdk/client-s3');
const dayjs = require('dayjs');
const _ = require('lodash');
const updateIndexPage = require('./update-index-page');

// https://docs.aws.amazon.com/zh_cn/sdk-for-javascript/v3/developer-guide/setting-credentials-node.html
class Upload {
  constructor() {
    this.BUCKET = process.env.S3_BUCKET;
    this.REGION = process.env.S3_REGION;
    this.noCacheFiles = ['index.html', 'favicon.ico'];  // 不要缓存的文件
    this.s3Client = new S3Client({ region: this.REGION });
  }
  oldListObjects = []
  newListObjects = []

  async getListObjects() {
    const { Contents: contents } = await this.s3Client.send(new ListObjectsCommand({
      Prefix: process.env.S3_ASSETS_NAMESPACE,
      Bucket: this.BUCKET
    }));
    this.oldListObjects = contents || [];
  }

  getFiles(pattern) {
    return new Promise((resolve, reject) => {
      glob(pattern, (err, files) => {
        if (err) {
          return reject(err);
        }
        resolve(files);
      });
    });
  };

  async clearOldVersionFiles() {
    const objectsGroupedByName = _.groupBy([...this.oldListObjects, ...this.newListObjects], ({ Key }) => {
      const nameArr = Key.split('.');
      if (nameArr.length >= 3) {
        nameArr.splice(nameArr[nameArr.length - 1] === 'map' ? -3 : -2, 1);
        return nameArr.join('.');
      }
      return Key;
    });

    // 保留3个版本
    const saveVersion = 3;
    const deleteObjectsNames = _.flatten(
      _.filter(objectsGroupedByName, list => list.length > saveVersion)
        .map(list => list.sort((a, b) => dayjs(a.LastModified).diff(dayjs(b.LastModified))))
        .map(list => list.slice(0, list.length - saveVersion).map(item => ({ Key: item.Key })))
    );
    if (deleteObjectsNames.length) {
      console.log('将从S3删除旧版文件', deleteObjectsNames);
      try {
        await this.s3Client.send(new DeleteObjectsCommand({
          Bucket: this.BUCKET,
          Delete: { Objects: deleteObjectsNames }
        }));
      } catch (e) {
        throw e;
      }
    }
  }

  async uploadFile(filePath) {
    const fileName = path.join(process.env.S3_ASSETS_NAMESPACE, path.relative(path.resolve('dist'), filePath));
    const spinner = ora().start();
    // 有 hash，并且S3已经有对应文件的，不需要再上传了
    if (fileName.split('.').length >= 3 && this.oldListObjects.find(({ Key }) => Key === fileName)) {
      spinner.succeed(`秒传成功: ${fileName}`);
      return ;
    }
    try {
      spinner.text = `读取文件: ${fileName}`;
      const contentText = await fs.readFile(filePath);
      const command = {
        Bucket: this.BUCKET,
        Key: fileName,
        Body: contentText,
        ACL: 'public-read',
        ContentType: mime.contentType(path.extname(fileName)),
      };

      if (this.noCacheFiles.find((item) => (new RegExp(item)).test(fileName))) {
        command.CacheControl = 'no-cache';
      }

      spinner.text = `正在上传文件: ${fileName}`;
      await this.s3Client.send(new PutObjectCommand(command));
      this.newListObjects.push({ Key: fileName });
      spinner.succeed(`上传成功: ${fileName}`);
    } catch (e) {
      spinner.fail(`上传失败: ${fileName}`);
      throw e;
    }
  };

  async run() {
    await this.getListObjects();
    const allFiles = await this.getFiles(`${path.resolve('dist')}/**/*`);
    const files = allFiles.filter((item) => {
      return item.indexOf('apple-touch-icon') === -1 && fs.lstatSync(item).isFile();
    });

    console.log('上传到S3...');
    await async.eachLimit(files, 10, async (item) => {
      await this.uploadFile(item);
    });
    console.log('上传到S3完成');
    console.log('清理S3旧版本文件...');
    await this.clearOldVersionFiles();
    console.log('清理S3旧版本文件完成');
    await updateIndexPage();
  };
}

module.exports = () => {
  return (new Upload()).run()
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
};
