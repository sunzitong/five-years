const path = require('path');
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
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: '中介报盘',
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
      path: '/user',
      component: '../layouts/user',
      routes: [
        { path: '/user', redirect: '/user/login' },
        // 登录页面
        { path: '/user/login', component: './user/Login.js' },
      ],
    },
    {
      path: '/',
      component: '../layouts/index',
      Routes: ['./src/routes/AuthRouter.js'],
      routes: [
        // 首页
        { path: '/', redirect: '/workbenches' },
        // 工作台
        { path: '/workbench', component: './channel/Workbench' },
        // 工作台入口
        { path: '/workbenches', component: './channel/WorkBenches' },
        // 预约记录
        { path: '/appointment', component: './channel/AppointmentRecord' },
        // 查询结果
        { path: '/search-result', component: './channel/SearchResult' },
      ],
    },
    {
      // path: '*',
      // redirect: '/user/login'
    },
  ],
  proxy: {
    // '/crm': {
    //   target: 'http://oms.test109.gyapt.cn',
    //   changeOrigin: true,
    //   logLevel: 'debug',
    //   secure: false,
    // },
  },
};
