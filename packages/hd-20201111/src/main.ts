import Vue from "vue";
import App from "./App.vue";
// 路由
import router from "./router/index";
// store数据 不是vuex
import store from "./store";
// rem.js计算
import "./plugins/rem";
// vant ui组件
import "./plugins/vant";
// 自定义指令
import "./directives";
// 背景图 样式 filter
import "./filters";
// 样式表
import "./assets/css/style.scss";
// console
Vue.config.productionTip = false;

// 诸葛埋点
import zhugeio from "@guanyu/zhugeio";
import { judgeDevice } from "@guanyu/h5-tools";

// 诸葛埋点
const url = window.location.href;
let appKey = "3ec10a66f82f4951ba811df964fcc199";
let jsSrc = "https://dataintest.longfor.com/zhuge.js?v=";
const visitSource = judgeDevice();
if (url.includes("m.iguanyu.com")) {
  appKey = "c6911bc459bb41a5acbb720e91057739"; // 正式
  jsSrc = "https://datain.longfor.com/zhuge.js?v=";
}

if (!window.zhuge) {
  zhugeio({
    appKey, // 选填 默认： c6911bc459bb41a5acbb720e91057739
    jsSrc, // 选填 默认：https://datain.longfor.com/zhuge.js?v=
    options: {
      superProperty: {
        访问来源: visitSource === "browser" ? "其他" : visitSource,
      },
      adTrack: false, // 广告监测开关
      zgsee: false, // 视屏采集开关
      autoTrack: true, // 启用全埋点采集
      singlePage: true, // 是否是单页面应用（SPA），启用autoTrack后生效
      updateUtm: true, // 实时更新utm信息
    }, // 选填
  });
  Vue.use(zhugeio);
}

// import VConsole from "vconsole";
// if (process.env.NODE_ENV === "development") {
//   new VConsole();
// }
// 实例
const VIEW = new Vue({
  data: store,
  router,
  render: (h) => h(App),
  methods: {},
  provide: {},
}).$mount("#app");

if (process.env.NODE_ENV !== "production") {
  window.VIEW = VIEW;
}
