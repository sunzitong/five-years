import Vue from 'vue';
import axios from 'axios';
import { getAppAuthInfo, ShowSharePanel, showShareButton } from '@guanyu/guanyu-h5-tools';
import moment from 'moment';// 导入文件
import zhugeio from '@guanyu/zhugeio';
import { judgeDevice } from '@guanyu/h5-tools';
import App from './App.vue';
import router from './router';
import store from './store';

// 诸葛埋点

Vue.prototype.$axios = axios;
Vue.prototype.$getAppAuthInfo = getAppAuthInfo;
Vue.prototype.$ShowSharePanel = ShowSharePanel;
Vue.prototype.$showShareButton = showShareButton;
Vue.prototype.$moment = moment;

Vue.config.productionTip = false;

// 诸葛埋点
const url = window.location.href;
let appKey = '3ec10a66f82f4951ba811df964fcc199';
let jsSrc = 'https://dataintest.longfor.com/zhuge.js?v=';
const visitSource = judgeDevice();
if (url.includes('m.iguanyu.com')) {
  appKey = 'c6911bc459bb41a5acbb720e91057739'; // 正式
  jsSrc = 'https://datain.longfor.com/zhuge.js?v=';
}

zhugeio({
  appKey, // 选填 默认： c6911bc459bb41a5acbb720e91057739
  jsSrc, // 选填 默认：https://datain.longfor.com/zhuge.js?v=
  options: {
    superProperty: {
      访问来源: visitSource === 'browser' ? '其他' : visitSource,
    },
    adTrack: false, // 广告监测开关
    zgsee: false, // 视屏采集开关
    autoTrack: true, // 启用全埋点采集
    singlePage: true, // 是否是单页面应用（SPA），启用autoTrack后生效
    updateUtm: true, // 实时更新utm信息
  }, // 选填
});
Vue.use(zhugeio);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
