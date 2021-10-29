const TemplateTipsWebpackPlugin = require('template-tips-webpack-plugin');
const pkg = require("./package.json");

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? `/fe/${pkg.name}` : "",
  outputDir: `../../dist/${pkg.name}`,
  chainWebpack: (config) => {
    config.plugin('template-tips-webpack-plugin').use(TemplateTipsWebpackPlugin);
  },
  devServer: {
    proxy: {
      '/': {
        // target: 'http://m.test109.iguanyu.com', // 活动详情
        target: 'http://m.test109.iguanyu.com',
        changeOrigin: true,
      },
    },
  },
  pages: {
    index: {
      entry: 'src/newsNotice/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '消息公告',
    },
    detail: {
      entry: 'src/activityDetail/main.js',
      template: 'public/detail.html',
      filename: 'detail.html',
      title: '活动详情',
    },
    apply: {
      entry: 'src/activityApply/main.js',
      template: 'public/apply.html',
      filename: 'apply.html',
      title: '报名申请',
    },
    success: {
      entry: 'src/applySuccess/main.js',
      template: 'public/success.html',
      filename: 'success.html',
      title: '报名申请',
    },
    down: {
      entry: 'src/download/main.js',
      template: 'public/down.html',
      filename: 'down.html',
      title: '下载页面',
    },
  },
};
