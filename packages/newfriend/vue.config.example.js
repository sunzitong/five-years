
/** 默认预设 */
const preconfig = {
  dev: {
    publicPath: '//oms.dev.gyapt.cn/static/manual',
  },
  test108: {
    publicPath: '//oms.test108.gyapt.cn/static/manual',
  },
  test109: {
    publicPath: '//oms.test109.gyapt.cn/static/manual',
  },
  release: {
    publicPath: '//oms.staging.gyapt.cn/static/manual',
  },
  master: {
    publicPath: '//static.iguanyu.com/manual',
  },
};
const { vueconfig } = require('./.feh5.js');
module.exports = {
  ...vueconfig(preconfig),
};

