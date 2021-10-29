import Vue from 'vue';
import { Picker, Toast } from 'vant';
import App from './App.vue';
// import 'lib-flexible';
// import '../unit/rem';

Vue.config.productionTip = false;
Vue.use(Picker);
Vue.use(Toast);

new Vue({
  render: h => h(App),
}).$mount('#app');
