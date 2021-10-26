const TemplateTipsWebpackPlugin = require('template-tips-webpack-plugin');
const pkg = require("./package.json");
// const dingxiangOptions = require('./config/dingxiangOptions');
/** 默认预设 */

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? `/fe/${pkg.name}` : "",
  outputDir: `../../dist/${pkg.name}`,
  chainWebpack: (config) => {
    config.plugin('template-tips-webpack-plugin').use(TemplateTipsWebpackPlugin);
    // config.plugin('define')
    //   .tap(args => {
    //     args[0]['VUE_APP_dingxiangOptions'] = JSON.stringify(dingxiangOptions)
    //     return args;
    //   })
  },
  devServer: {
    proxy: {
      '/webapp': {
        target: 'http://m.test109.iguanyu.com/',
        changeOrigin: true,
      },
    },
  },
  pages: {
    index: {
      entry: 'src/home/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '雷达计划',
    },
    clues: {
      entry: 'src/clues/main.js',
      template: 'public/clues.html',
      filename: 'clues.html',
      title: '已提供线索',
    },
  },
};
