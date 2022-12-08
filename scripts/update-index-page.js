const { exec } = require('child-process-promise');
const ora = require('ora');

async function run() {
  const { default: urlJoin } = await import('url-join');
  const spinner = ora().start();
  const command = `curl -X POST ${urlJoin(String(process.env.VUE_APP_WEB_API), '/app_api/v1/utils/refresh_index_page')}`;
  spinner.text = command;
  const res = await exec(command);
  const data = JSON.parse(res.stdout);
  if (data.toLocaleLowerCase() !== 'ok') {
    spinner.fail('fail: 更新服务端index.html文件');
    throw res;
  }
  spinner.succeed('success: 更新服务端index.html文件');
}

module.exports = run;
