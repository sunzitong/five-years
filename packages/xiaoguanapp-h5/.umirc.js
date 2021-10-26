import path from 'path';
const pkg = require("./package.json");

const TemplateTipsWebpackPlugin = require('template-tips-webpack-plugin')
// ref: https://umijs.org/config/
export default {
  publicPath: process.env.NODE_ENV === "production" ? `/fe/${pkg.name}/` : "/",
  outputPath: `../../dist/${pkg.name}`,
  treeShaking: true,
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
        title: '上线公告',
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
      component: './notice-detail/NoticeDetail.js',
    },
    {
      path: '/notice-detail',
      component: './notice-detail/NoticeDetail.js', // 上线公告
    },
    {
      path: '/detail-share',
      component: './detail-share/DetailShare.js', // 上线公告分享页面
    },
    {
      path: '/message-detail',
      component: './message-detail/MessageDetail.js', // 消息详情页面
    },
    {
      path: '/key-account/reason/:id',
      component: './key-account/BillReason.js',
    },
    {
      path: '/key-account/check/:id',
      component: './key-account/BillReasonCheck.js',
    },
  ],
  base: '/fe/xiaoguanapp-h5',
  history: 'hash',
  // 启用代理需在 npm start 前加MOCK=none参数
  proxy: {
    "/notification": {
      target: "http://oms.test109.gyapt.cn",
      changeOrigin: true,
    },
    "/api": {
      target: "http://oms.dev.gyapt.cn",
      changeOrigin: true,
    },
  },
};
