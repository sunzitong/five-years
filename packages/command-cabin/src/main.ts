import Vue from "vue";
import App from "./App.vue";
// 路由
import router from "./router/index";
// store数据 不是vuex
import store from "./store";
// rem.js计算
// import "./plugins/rem";
// vant ui组件
import "./plugins/vant";
// 自定义指令
// import "./directives";
// 背景图 样式 filter
// import "./filters";
// 样式表
import "./assets/css/style.scss";
// 动画样式
import "animate.css";
// 桌面端适配
import "@vant/touch-emulator";
// 全局组件
import Spin from "@/components/Spin";
Vue.use(Spin);
// console
Vue.config.productionTip = false;

// 监控代码开始
if (window.MAIAAPM && window.MAIAAPM.wrapVueRouter) {
  window.MAIAAPM.wrapVueRouter(router, {
    endDelay: 500, // 切换路由后延迟结束时间
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

// if (store.env.DEBUG) {
// }
window.VIEW = VIEW;
