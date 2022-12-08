const deploy = require('./deploy');
const deployS3 = require('./upload-dist-to-s3');

module.exports = api => {
  api.registerCommand('deploy', {}, () => deploy());
  api.registerCommand('deploy-s3', {}, () => deployS3());
};
