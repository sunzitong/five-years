const TemplateTipsWebpackPlugin = require('template-tips-webpack-plugin')
const pkg = require("./package.json");

export default {
  // base: '/fe/xg-client-store-daliy',
  publicPath: process.env.NODE_ENV === "production" ? `/fe/${pkg.name}/` : "/",
  outputPath: `../../dist/${pkg.name}`,
  treeShaking: true,
  chainWebpack: config => {
    config.plugin('template-tips-webpack-plugin').use(TemplateTipsWebpackPlugin)
  },
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: '',
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
  history: 'hash',
  routes: [
    { path: '/manager-daily', component: './managerDaily', title: '店长日报' },
    { path: '/staff-daily', component: './staffDaily', title: '运营官日报' },
  ],
  proxy: {
    "/crm": {
      'logLevel': 'debug',
      "target": 'http://oms.test109.gyapt.cn',
      "changeOrigin": true,
    },
  },
};
