const devConfig = require('./webpack.dev.conf');

module.exports = new Promise((resolve, reject) => {
  resolve(devConfig);
});
