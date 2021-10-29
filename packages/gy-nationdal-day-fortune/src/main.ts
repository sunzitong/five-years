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
// event bus
import "./plugins/event-bus";
// 自定义指令
import "./directives";
// 背景图 样式 filter
import "./filters";
// 样式表
import "./assets/css/style.scss";
// console
Vue.config.productionTip = false;

import VConsole from "vconsole";
import zhugeio from '@guanyu/zhugeio';
import { judgeDevice } from '@guanyu/h5-tools';

let appKey = '5e1ef78402ee4bda898c955c997d6a6b';
let jsSrc = 'https://dataintest.longfor.com/zhuge.js?v=';
const visitSource = judgeDevice();

// 正式环境
if (window.location.href.includes('m.iguanyu.com')) {
  appKey = '15870161b5d247abb895eac7759a267b';
  jsSrc = 'https://datain.longfor.com/zhuge.js?v=';
}

zhugeio({
  appKey,
  jsSrc,
  options: {
    superProperty: {
      访问来源: visitSource === 'browser' ? '其他' : visitSource,
    },
  },
});
// if (process.env.NODE_ENV === "development") {
// new VConsole();
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
