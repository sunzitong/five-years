import Vue from 'vue';
import axios from 'axios';
import { getAppAuthInfo } from '@guanyu/guanyu-h5-tools';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.prototype.$axios = axios;
Vue.prototype.$getAppAuthInfo = getAppAuthInfo;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
