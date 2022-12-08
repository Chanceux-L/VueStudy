/* eslint-disable @typescript-eslint/no-unused-vars */
let fs = require('fs-extra');
let path = require('path');
const X2JS = require('x2js');
const JSON5 = require('json5');
const _ = require('lodash');

function parseTemplate(filePath, filename) {
  const filedir = path.join(filePath, filename);
  if (/\.vue$/.test(filedir)) {
    const template = fs.readFileSync(filedir, 'utf-8');
    let x2js = new X2JS({
      arrayAccessForm: 'property'
    });
    let { body } = x2js.xml2js(`<body>${template}</body>`);
    if (body.i18n_asArray) {
      const locale = {};
      body.i18n_asArray.map(item => {
        if (item._src) {
          Object.assign(locale, JSON5.parse(fs.readFileSync(path.resolve(filePath, item._src))));
        } else {
          locale[item._locale] = locale[item._locale] || {};
          Object.assign(locale[item._locale], JSON5.parse(item.toString()));
        }
      });
      // 对比差异，导出没有翻译的语音，如需导出所有，直接使用 locale
      // const contentText = difference(locale.ko_KR || {}, locale.en);
      const contentText = locale;
      if (_.isEmpty(contentText)) {
        return;
      }
      const newFilePath = path.relative(path.resolve('src'), filePath);
      fs.ensureDirSync(path.join('locale', newFilePath));
      fs.writeFile(path.join('locale', newFilePath, filename.replace(/\.vue$/, '.json')), JSON.stringify(contentText, null, 2));
    }
  }
}

/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
function difference(object, base) {
  object = object || base.__proto__.constructor();
  const obj = base.__proto__.constructor();
  _.map(base, (val, key) => {
    if (typeof val === 'object') {
      obj[key] = difference(object[key], val);
      if (_.isEmpty(obj[key])) {
        delete obj[key];
      }
    } else if (val === object[key] || !Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = val;
    }
  });
  return obj;
}

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function filesParse(filePath) {
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, function (err, files) {
    if (err) {
      // eslint-disable-next-line no-console
      console.warn(err);
    } else {
      //遍历读取到的文件列表
      files.forEach(function (filename) {
        //获取当前文件的绝对路径
        let filedir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, function (eror, stats) {
          if (eror) {
            // eslint-disable-next-line no-console
            console.warn('获取文件stats失败');
          } else {
            let isFile = stats.isFile(); //是文件
            let isDir = stats.isDirectory(); //是文件夹
            if (isFile) {
              parseTemplate(filePath, filename);
            }
            if (isDir) {
              filesParse(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        });
      });
    }
  });
}

// 只解析vue文件内的 <i18n> 数据，全局的locale已经可以拿到，没必要再处理
filesParse(path.resolve('src'));
