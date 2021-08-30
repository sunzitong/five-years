const pkg = require("./package.json");

const postcss = {
  rootValue: 75, // 换算的基数(设计图750的根字体为32)
  selectorBlackList: ['weui', 'mu'], // 忽略转换正则匹配项
  propList: ['*'],
  exclude: /(node_module)/,
  // 默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
  mediaQuery: false, // （布尔值）允许在媒体查询中转换px。
  minPixelValue: 0, // 设置要替换的最小像素值(3px会被转rem)。 默认 0
};

// eslint-disable-next-line import/order
const pxtorem = require('postcss-pxtorem')(postcss);

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          pxtorem,
        ],
      },
    },
  },
  publicPath: process.env.NODE_ENV === "production" ? `/fe/${pkg.name}` : "",
  outputDir: `../../dist/${pkg.name}`,
  devServer: {
    proxy: {
      '/coupon_api': {
        target: 'http://oms.test109.gyapt.cn', // 109测试环境
        // target: 'https://omsprod.longhu.net/', //  正式环境
        changeOrigin: true,
        pathRewrite: {
          '^/coupon_api': '/coupon_api',
        },
      },
    },
  },
};
