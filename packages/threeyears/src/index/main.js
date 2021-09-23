import Vue from 'vue';
import App from './App.vue';
import 'lib-flexible';
import zhugeio from '../utils/zhugeio';

Vue.use(zhugeio);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
