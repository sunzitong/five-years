const TemplateTipsWebpackPlugin = require('template-tips-webpack-plugin')
const pkg = require("./package.json");

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
        title: '学生计划',
        hd: true,
        dll: true,

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
  history: 'hash',
  alias: {
    // components: path.resolve(__dirname, 'src/components'),
    // services: path.resolve(__dirname, 'src/services'),
    assets: path.resolve(__dirname, 'src/assets'),
    utils: path.resolve(__dirname, 'src/utils'),
    '@': path.resolve(__dirname, 'src'),
  },
  hash: true,
  routes: [
    {
      path: '/fe/dream-project/layout', component: '../layouts', routes: [
        { path: '/fe/dream-project/layout/index', component: './index', title: '学生特权' },
        { path: '/fe/dream-project/layout/authentication', component: './authentication', title: '认证身份' },
        { path: '/fe/dream-project/layout/statement', component: './statement', title: '授权声明' },
      ]
    }
  ],
  proxy: {
    "/app-server": {
      'logLevel': 'debug',
      "target": 'http://m.test109.iguanyu.com',
      "changeOrigin": true,
    },
    "/gymwebsite": {
      'logLevel': 'debug',
      "target": 'http://m.test109.iguanyu.com',
      "changeOrigin": true,
    },
  },
};
