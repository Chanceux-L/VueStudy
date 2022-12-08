/* eslint-disable no-console */

const NodeSSH = require('node-deploy');
const dayjs = require('dayjs');
const path = require('path');

module.exports = () => {
  return NodeSSH.deploy({
    project_dir: '/var/www/tc-minisite-frontend',
    namespace: 'frontend',
    release_name: dayjs().format('YYYY-MM-DD_HH_mm'),
    local_target: path.resolve('dist'),
    tar: true,
    ssh_configs: [
      {
        host: process.env.SSH_HOST,
      },
    ]
  });
};
