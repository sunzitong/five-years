const TemplateTipsWebpackPlugin = require('template-tips-webpack-plugin');

const pkg = require("./package.json");

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? `/fe/${pkg.name}` : "",
  outputDir: `../../dist/${pkg.name}`,
  chainWebpack: (config) => {
    config.plugin('template-tips-webpack-plugin').use(TemplateTipsWebpackPlugin);
  },
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 100,
          }),
        ],
      },
    },
  },
  devServer: {
    proxy: {
      '/app-server': {
        target: 'http://m.test109.iguanyu.com/app-server',
        changeOrigin: true,
        pathRewrite: {
          '^/app-server': '/',
        },
      },
      '/cms-server': {
        target: 'http://m.test109.iguanyu.com/cms-server',
        changeOrigin: true,
        pathRewrite: {
          '^/cms-server': '/',
        },
      },
    },
  },
};
