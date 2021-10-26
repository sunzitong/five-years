import path from 'path';
const TemplateTipsWebpackPlugin = require('template-tips-webpack-plugin')
const pkg = require("./package.json");

// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  publicPath: process.env.NODE_ENV === "production" ? `/fe/${pkg.name}/` : "/",
  outputPath: `../../dist/${pkg.name}`,
  alias: {
    '@': path.resolve(__dirname, 'src'),
    'components': path.resolve(__dirname, 'src/components'),
    'services': path.resolve(__dirname, 'src/services'),
    'utils': path.resolve(__dirname, 'src/utils'),
    'assets': path.resolve(__dirname, 'src/assets'),
    'layouts': path.resolve(__dirname, 'src/layouts'),
  },
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
        // title: '运营',
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
  routes: [
    {
      path: '/',
      component: './employee-identify/EmployeeIdentify.js',
    },
    {
      path: '/employee-identify', // 企业员工认证列表
      component: './employee-identify/EmployeeIdentify.js',
    },
    {
      path: '/employee-identify/:id', // 企业员工认证详情
      component: './employee-identify/EmployeeIdentifyDetail.js',
    },
    {
      path: '/employee-identify-city/:id', // 企业员工认证切换城市
      component: './employee-identify/EmployeeIdentifyCity.js',
    },
  ],
  base: '/fe/xiaoguan_operation',
  history: 'hash',
  // 启用代理需在 npm start 前加MOCK=none参数
  proxy: {
    "/crm": {
      target: "http://oms.test109.gyapt.cn",
      changeOrigin: true,
    },
    "/api": {
      target: "http://oms.test109.gyapt.cn",
      changeOrigin: true,
    }
  },
};
