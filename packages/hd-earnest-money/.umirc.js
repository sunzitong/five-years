const TemplateTipsWebpackPlugin = require('template-tips-webpack-plugin')
const pkg = require("./package.json");

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
        title: '意向金',
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
  proxy: {
    "/app-server": {
      'logLevel': 'debug',
      "target": 'http://m.test109.iguanyu.com',
      "changeOrigin": true,
    },
  },
};
