// fe-h5-fn-start
const fs = require('fs');
const chalk = require('chalk');

/**
 * 获取base url
 */
function getBaseurl() {
  const projectNameContext = fs.readFileSync('./projectName.conf', 'utf8');
  const projectBaseName = projectNameContext.match(/\bPRONAME=(.*)(?=\n)?/);
  return projectBaseName ? projectBaseName[1].trim() : '';
}

/**
 * 构建分支信息
 */
function buildBranchInformation(res) {
  const { notes = '无匹配', ...others } = res;
  const { DEPLOY_ENV } = process.env;
  console.log(chalk.green(`【DEPLOY_ENV】: ${DEPLOY_ENV}`));
  if (DEPLOY_ENV === undefined) {
    console.log(chalk.green('【提示】: 可以布署到任意域名根目录下'));
    console.log(chalk.green("【提示】: {assetsPublicPath: '/'}"));
  } else {
    console.log(chalk.green(`【发布分支为】: ${DEPLOY_ENV}分支`));
    console.log(chalk.green(`【布署环境为】: ${notes}`));
    console.log(chalk.green(`【build】: ${JSON.stringify(others)}`));
  }
  console.log(chalk.yellow('【注意】检查projectName.conf中PRONAME是否与其他项目冲突'));
}

/**
 * 合并对象
 * @param {*} target
 * @param {*} source
 */
function objectMerge(target, source) {
  const isObject = any => Object.prototype.toString.call(any) === '[object Object]';
  const t = target;
  const loop = (s) => {
    for (const i in s) {
      if (!t[i]) {
        t[i] = s[i];
      } else if (isObject(t[i]) && isObject(s[i])) {
        objectMerge(t[i], s[i]);
      } else {
        t[i] = s[i];
      }
    }
    return t;
  };
  return loop(source);
}

/**
 * vue.config.js 配置
 * @param {*} config
 */
const vueconfig = (config = {}) => {
  const { DEPLOY_ENV: dv, NODE_ENV: nv } = process.env;
  if (nv !== 'production') return {};

  // const BASE_URL = getBaseurl();
  const maps = objectMerge(
    {
      dev: {
        notes: '开发环境',
        publicPath: '/',
      },
      test108: {
        notes: '测试服务器108',
        publicPath: '/',
      },
      test109: {
        notes: '测试服务器109',
        publicPath: '/',
      },
      release: {
        notes: '预上线环境',
        publicPath: '/',
      },
      master: {
        notes: '正式环境',
        publicPath: '/',
      },
    },
    config
  );
  const res = maps[dv] ? maps[dv] : { publicPath: '/', notes: '根目录任何环境' };
  // res.publicPath = `${res.publicPath.replace(/\/*$/, '/')}${BASE_URL}`;
  res.publicPath = '.';
  const { notes, ...others } = res;
  buildBranchInformation(res);
  return others;
};

/**
 * 构建地址列表
 */
function showOnlineAddress() {
  const onlinemaps = [
    'http://oms.dev.gyapt.cn',
    'http://oms.test108.gyapt.cn',
    'http://oms.test109.gyapt.cn',
    'http://oms.staging.gyapt.cn',
    'http://oms.gyapt.cn',
  ];
  return onlinemaps.map((item) => {
    return `${item}/fe/${getBaseurl()}`;
  });
}

/**
 * 配置friendly-errors-webpack-plugins
 * 显示项目构建地址
 */
function friendlyErrors(config) {
  config.plugin('friendly-errors').tap((args) => {
    const myargs = args;
    const compilationSuccessInfo = {
      notes: showOnlineAddress(),
    };
    myargs[0].compilationSuccessInfo = compilationSuccessInfo;
    return myargs;
  });
}

module.exports = {
  vueconfig,
  getBaseurl,
  friendlyErrors,
  showOnlineAddress,
};
