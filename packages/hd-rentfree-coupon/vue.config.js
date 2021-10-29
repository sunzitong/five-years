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
        target: 'http://m.test109.iguanyu.com/coupon_api',
        changeOrigin: true,
        pathRewrite: {
          '^/coupon_api': '',
        },
      },
      '/gymwebsite': {
        target: 'http://m.test109.iguanyu.com/gymwebsite',
        changeOrigin: true,
        pathRewrite: {
          '^/gymwebsite': '',
        },
      },
      // '/coupon_api': {
      //   target: 'http://docs.gyapt.cn/mock/23/coupon_api',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/coupon_api': '',
      //   },
      // },
      // '/gymwebsite': {
      //   target: 'http://m.test109.iguanyu.com/gymwebsite',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/gymwebsite': '',
      //   },
      // },
    },
  },
};
