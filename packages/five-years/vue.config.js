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
              require("postcss-plugin-px2rem")({
                rootValue: 100, // html font-size
                unitPrecision: 5,
                // propList: ["*"], //原来 postcss-px2rem 的配置
                // propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
                // propBlackList: [], //黑名单
                // exclude: /(node_module|views)/,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
                // selectorBlackList: [], //要忽略并保留为px的选择器
                // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
                replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
                mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
                minPixelValue: 3, //设置要替换的最小像素值(3px会被转rem)。 默认 0
              }),
              // #region vw转换
              /*
              require("postcss-px-to-viewport")({
                unitToConvert: "px",
                viewportWidth: 375,
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
                landscapeWidth: 375,
              }),
              */
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
          globalVars: {
          },
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
        // target: "http://docs.gyapt.cn/mock/382",
        target: "http://10.231.133.109:18099",
        // target: "http://m.test109.iguanyu.com",
        // target: "http://localhost:8081",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: "",
        },
      },
    },
  },
};
