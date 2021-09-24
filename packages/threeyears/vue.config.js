const pkg = require("./package.json");

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? `/fe/${pkg.name}` : "",
  outputDir: `../../dist/${pkg.name}`,
  pages: {
    index: {
      entry: 'src/index/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '首页',
    },
    prBook: {
      entry: 'src/prBook/main.js',
      template: 'public/prBook.html',
      filename: 'prBook.html',
      title: '白皮书',
    },
    birthday: {
      entry: 'src/birthday/main.js',
      template: 'public/birthday.html',
      filename: 'birthday.html',
      title: '生日趴',
    },
  },
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /\/index/, to: '/index.html' },
        { from: /\/prBook/, to: '/prBook.html' },
        { from: /\/birthday/, to: '/birthday.html' },
      ],
    },
    proxy: {
      '/coupon_api': {
        target: 'http://oms.test109.gyapt.cn',
        changeOrigin: true,
      },
    },
  },
};
