const pkg = require("./package.json");

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? `/fe/${pkg.name}` : "",
  outputDir: `../../dist/${pkg.name}`,
  devServer: {
    historyApiFallback: {
      rewrites: [
        // { from: /\/index/, to: '/index.html' },
      ],
    },
    proxy: {
      '/coupon_api': {
        target: 'http://oms.test109.gyapt.cn',
        changeOrigin: true,
      },
    },
  },
  pages: {
    index: {
      entry: 'src/index/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '冠寓有料·第二弹',
    },
  },
};
