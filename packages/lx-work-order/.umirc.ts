import { defineConfig } from 'umi';
import px2viewport from 'postcss-px-to-viewport';

const { NODE_ENV } = process.env;

const pkg = require("./package.json");

export default defineConfig({
  title: '工单详情',
  base: '/fe/lx-work-order',
  publicPath: NODE_ENV === "production" ? `/fe/${pkg.name}/` : "/",
  outputPath: `../../dist/${pkg.name}`,
  history: { type: 'hash' },
  // mock: true,
  nodeModulesTransform: {
    type: 'none',
  },
  extraPostCSSPlugins: [
    ...(NODE_ENV === 'development'
      ? []
      : [px2viewport({ viewportWidth: 375 })]),
  ],
  scripts: [
    {
      src: '/fe/lx-work-order/js/previewImage.min.js',
      defer: true,
    },
  ],
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/workOrder',
          routes: [
            {
              path: '/workOrder',
              redirect: '/workOrder/upcomming',
            },
            {
              path: '/workOrder/upcomming',
              component: '@/pages/workOrder/upcomming',
            },
          ],
        },
      ],
    },
  ],
  request: {
    dataField: '',
  },
  proxy: {
    '/workOrder/reportOrder': {
      target: 'http://docs.gyapt.cn/mock/105',
      // target: 'http://oms.test108.gyapt.cn',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        ['^' + '/workOrder/reportOrder']: '/workOrder/reportOrder',
      },
    },
  },
});
