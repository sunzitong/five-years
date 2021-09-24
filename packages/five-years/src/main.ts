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
import { judgeDevice } from "@guanyu/h5-tools";
import zhugeio from "@guanyu/zhugeio"; 
const url = window.location.href;
let appKey = "3ec10a66f82f4951ba811df964fcc199";
let jsSrc = "https://dataintest.longfor.com/zhuge.js?v=";
const visitSource = judgeDevice();
if (url.includes("m.iguanyu.com")) {
  appKey = "c6911bc459bb41a5acbb720e91057739"; // 正式
  jsSrc = "https://datain.longfor.com/zhuge.js?v=";
}
zhugeio({
  appKey,
  jsSrc,
  options: {
    superProperty: {
      访问来源: visitSource === "browser" ? "其他" : visitSource,
    },
  },
});


Vue.use(zhugeio);
// console
Vue.config.productionTip = false;
Vue.config.ignoredElements = ["wx-open-launch-weapp"];
// 真机本地调试
if (process.env.NODE_ENV === "development") {
  import("vconsole").then((VConsole) => {
    new VConsole.default();
  });
}
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
