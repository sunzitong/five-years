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

const getPublicPath = () => {
  if (process.env.NODE_ENV === "production") {
    const build = process.env.BUILD ? process.env.BUILD.toLowerCase() : "";
    if (process.env.BUILD && ["sit", "uat", "staging"].includes(build)) {
      return `https://s-${build}.longfor.com/toch5-${build}/${pkg.name}`;
    }
    return `https://s.longfor.com/toch5/${pkg.name}`;
  }
  return "";
};

/**
 * 视频区分环境，正式线为PROD
 */
process.env.VUE_APP_BUILD = (process.env.BUILD || "prod").toLowerCase();

const mockProxy = {
  yapi: "http://docs.gyapt.cn/mock/712",
  mock: "http://localhost:3000",
  test108: "http://oms.test108.gyapt.cn",
  test109: "http://oms.test109.gyapt.cn",
  staging: "http://oms.staging.gyapt.cn",
  prod: "http://oms.gyapt.cn",
};

module.exports = {
  publicPath: getPublicPath(),
  outputDir: `../../dist/${pkg.name}`,
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV === "development",
  // indexPath,
  // 去掉文件名中的 hash
  // filenameHashing: false,
  // 删除 HTML 相关的 webpack 插件
  chainWebpack: (config) => {
    // config.plugins.delete('html')
    // config.plugins.delete("preload");
    // config.plugins.delete("prefetch");
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
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
          if (false) {
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
        target: mockProxy[process.env.MOCK || "yapi"],
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          [`^${process.env.VUE_APP_BASE_API}`]: "",
        },
      },
      /**
       * 联调
       */
      // [`${process.env.VUE_APP_BASE_API}/auth`]: {
      //   target: mockProxy[process.env.MOCK || "yapi"],
      //   secure: false,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     [`^${process.env.VUE_APP_BASE_API}`]: "",
      //   },
      // },
      // [process.env.VUE_APP_BASE_API]: {
      //   target: "http://10.237.1.160:8079/",
      //   secure: false,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     [`^${process.env.VUE_APP_BASE_API}/analysis`]: "",
      //   },
      // },
    },
  },
};
