const pkg = require("./package.json");

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? `/fe/${pkg.name}` : "",
  outputDir: `../../dist/${pkg.name}`,
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      },
      postcss: {
        autoprefixer: {},
        plugins: [
          require('postcss-px2rem')({
            remUnit: '37.5',
            propList: ['*']
          })
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: false,
      theme: false
    }
  },
  devServer: {
    proxy: {
      '/commactivity-server': {
        target: 'http://m.test109.iguanyu.com/commactivity-server/',
        changeOrigin: true,
        pathRewrite: {
          '^/commactivity-server': '/'
        }
      }
    }
  }
}
