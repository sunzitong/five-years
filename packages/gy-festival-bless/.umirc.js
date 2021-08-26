const TemplateTipsWebpackPlugin = require('template-tips-webpack-plugin')
const pkg = require("./package.json");
/** 默认预设 */

import path from 'path';

// ref: https://umijs.org/config/
export default {
  publicPath: process.env.NODE_ENV === "production" ? `/fe/${pkg.name}/` : "/",
  outputPath: `../../dist/${pkg.name}`,
  treeShaking: true,
  chainWebpack: config => {
    config.plugin('template-tips-webpack-plugin').use(TemplateTipsWebpackPlugin)
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: '节日祝福',
        dll: true,
        hd: true,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  alias: {
    // components: path.resolve(__dirname, 'src/components'),
    // services: path.resolve(__dirname, 'src/services'),
    assets: path.resolve(__dirname, 'src/assets'),
    utils: path.resolve(__dirname, 'src/utils'),
    '@': path.resolve(__dirname, 'src'),
  },
  proxy: {
    "/commactivity-server": {
      'logLevel': 'debug',
      "target": 'http://m.test109.iguanyu.com',
      "changeOrigin": true,
    },
    "/app-server": {
      'logLevel': 'debug',
      "target": 'http://m.test109.iguanyu.com',
      "changeOrigin": true,
    },
  },
};
