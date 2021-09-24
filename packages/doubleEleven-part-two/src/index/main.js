import Vue from 'vue';
import zhugeio from '@guanyu/zhugeio';
import { judgeDevice } from '@guanyu/h5-tools';
import App from './index.vue';
import router from './router';
import store from './store';
import 'lib-flexible';

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


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
