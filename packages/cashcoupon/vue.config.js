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
      '/coupon_api': {
        target: 'http://oms.staging.gyapt.cn',
        changeOrigin: true,
      },
    },
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '领取现金券',
    },
  },
};
