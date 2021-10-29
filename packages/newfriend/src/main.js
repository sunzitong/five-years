import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'lib-flexible/flexible.js'
// import axios from 'axios'
// Vue.prototype.$axios = axios
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueJsonp from 'vue-jsonp'
import gio from './utils/growingio'
Vue.use(VueJsonp, 5000)
Vue.use(element)
Vue.use(gio)
// init vConsole
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
