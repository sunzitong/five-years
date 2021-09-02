import Vue from 'vue';
import axios from 'axios';
import moment from 'moment';
import App from './App.vue';
import router from './router';
import store from './store';

import './utils/flexible';

Vue.prototype.$ajax = axios;
Vue.prototype.$moment = moment;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
