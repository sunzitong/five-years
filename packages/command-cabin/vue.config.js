/* eslint-disable */

// 接口域名
if (process.env.NODE_ENV === "production") {
  process.env.VUE_APP_BASE_API = "";
} else {
  process.env.VUE_APP_BASE_API = "/dev-api";
}
process.env.VUE_APP_BASE_IMG = `@/assets/img/`;
// css图片域名变量
const scssData = `
$VUE_APP_BASE_IMG: "~${process.env.VUE_APP_BASE_IMG}";
@import "~@/assets/css/bg-img.scss";`;

const pkg = require("./package.json");

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? `/fe/${pkg.name}` : "",
  outputDir: `../../dist/${pkg.name}`,
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV === "development",
  // indexPath,
  // 去掉文件名中的 hash
  // filenameHashing: false,
  // 删除 HTML 相关的 webpack 插件
  chainWebpack: (config) => {
    // config.plugins.delete('html')
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    }
    return {
      resolve: {
        // extensions: ['.js', '.vue', '.json', '.ts'],
        alias: {},
      },
    };
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: process.env.NODE_ENV === "production",
    // 开启 CSS source maps?
    sourceMap: process.env.NODE_ENV !== "production",
    // css预设器配置项
    loaderOptions: {
      postcss: {
        plugins: (function () {
          // 生产环境转rem
          if (process.env.NODE_ENV === "production") {
            return [
              // #region vw转换
              require("postcss-px-to-viewport")({
                unitToConvert: "px",
                viewportWidth: 7680,
                unitPrecision: 5,
                propList: ["*"],
                viewportUnit: "vw",
                fontViewportUnit: "vw",
                selectorBlackList: [],
                minPixelValue: 2,
                mediaQuery: false,
                replace: true,
                exclude: [],
                landscape: false,
                landscapeUnit: "vw",
                landscapeWidth: 7680,
              }),
              // #endregion
            ];
          }
        })(),
      },
      sass: {
        additionalData: scssData,
      },
      less: {
        // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
        lessOptions: {
          globalVars: {},
        },
      },
    },
    requireModuleExtension: true,
  },
  // webpack-dev-server 相关配置
  devServer: {
    host: process.env.HOST,
    port: process.env.PORT || 8080,
    https: false,
    hotOnly: false,
    open: false,
    before: (app) => {},
    disableHostCheck: true,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: "http://docs.gyapt.cn/mock/712",
        // target: "http://oms.test109.gyapt.cn",
        // target: "http://localhost:3000",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: "",
        },
      },
    },
  },
};
