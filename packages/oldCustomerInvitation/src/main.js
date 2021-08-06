import Vue from 'vue'
import App from './App.vue'
import zhugeio from '@guanyu/zhugeio';
import { judgeDevice } from '@guanyu/h5-tools';
import router from './router'
import toastRegistry from './toast/index'
import axios from 'axios'
// import  'lib-flexible';
import './rem.js';
Vue.prototype.$axios = axios

// 这里也可以直接执行 toastRegistry()
Vue.use(toastRegistry)
const url = window.location.href;
let appKey = '3ec10a66f82f4951ba811df964fcc199';
let jsSrc = 'https://dataintest.longfor.com/zhuge.js?v=';
const visitSource = judgeDevice();
if (url.includes('m.iguanyu.com')) {
  appKey = 'c6911bc459bb41a5acbb720e91057739'; // 正式
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


Vue.use(zhugeio);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
