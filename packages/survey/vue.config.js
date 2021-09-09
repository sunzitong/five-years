const pkg = require("./package.json");
  
  module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? `/fe/${pkg.name}` : "",
    outputDir: `../../dist/${pkg.name}`,
    devServer: {
        proxy: {
            '/evaluation': {
            target: 'http://oms.test.gyapt.cn/evaluation',
            changeOrigin: true,
            pathRewrite: {
                '^/evaluation': ''
            },
            },
        }
    }
  };