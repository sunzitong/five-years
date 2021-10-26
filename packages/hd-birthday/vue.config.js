
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development'

const pkg = require("./package.json");

// 是否启用cdn
const needCdn = false

const cdn = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  // cdn的css链接
  css: ['https://s.longfor.com/public/css/cube-ui/cube-1.12.15.min.css'],
  // cdn的js链接
  js: [
    'https://s.longfor.com/public/js/vue/2.6.10/vue.min.js',
    'https://s.longfor.com/public/js/vux/3.1.1/vuex.min.js',
    'https://s.longfor.com/public/js/vue-router/3.1.3/vue-router.min.js',
    'https://s.longfor.com/public/js/cube-ui/cube-1.12.15.min.js',
    'https://s.longfor.com/public/js/axios.min.js'
  ],
  externals: {
    'vue': 'Vue',
    'vuex': 'Vuex',
    'vue-router': 'VueRouter',
    'axios': 'axios',
    'CUBEUI': 'Cube'
  }
}
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? `/fe/${pkg.name}` : "",
  outputDir: `../../dist/${pkg.name}`,
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          '~@longfor/ma-mobile/src/components/ma-mobile/stylus/theme.styl'
        ]
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
  chainWebpack: config => {
    // 注入cdn start
    config.plugin('html').tap(args => {
      // 生产环境或本地需要cdn时，才注入cdn
      if (needCdn && isProduction) args[0].cdn = cdn
      return args
    })
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
    // 用cdn方式引入，则构建时要忽略相关资源
    if (needCdn && isProduction) config.externals = cdn.externals

    if (isProduction) {
      // 代码压缩
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log']
            }
          },
          sourceMap: false,
          parallel: true
        })
      )
    }
    // 利用splitChunks单独打包第三方模块
    // config.optimization = {
    //   // runtimeChunk: {
    //   //   name: entrypoint => `runtimechunk~${entrypoint.name}`
    //   // },
    //   splitChunks: {
    //     cacheGroups: {
    //       cube: {
    //         name: 'chunk-cubUI', // split elementUI into a single package
    //         priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
    //         test: /[\\/]node_modules[\\/]cube-ui(.*)/, // in order to adapt to cnpm
    //         chunks: 'all'
    //       }
    //     }
    //   }
    // }

    // gzip压缩,需要后台同学配合，根据需要自行放开
    // const productionGzipExtensions = ['html', 'js', 'css']
    // config.plugins.push(
    //   new CompressionWebpackPlugin({
    //     filename: '[path].gz[query]',
    //     algorithm: 'gzip',
    //     test: new RegExp(
    //       '\\.(' + productionGzipExtensions.join('|') + ')$'
    //     ),
    //     threshold: 10240, // 只有大小大于该值的资源会被处理 10240
    //     minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
    //     deleteOriginalAssets: true // 删除原文件
    //   })
    // )
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  devServer: {
    proxy: {
      // '/app-server': {
      //   target: 'http://docs.gyapt.cn/mock/125/app-server/',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/app-server': '/'
      //   }
      // }
      '/app-server': {
        target: 'http://m.test109.iguanyu.com/app-server/',
        changeOrigin: true,
        pathRewrite: {
          '^/app-server': '/'
        }
      }
    }
  }
}
