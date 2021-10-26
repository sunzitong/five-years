import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'amfe-flexible'
import {
  ShowSharePanel,
  getAppAuthInfo
} from '@guanyu/guanyu-h5-tools'
// 引入接口和axios初始化配置
import './api'
import maMobile from '@longfor/ma-mobile' // 引入ma-mobile依赖
import '@longfor/ma-mobile/lib/styles/ma-mobile.css' // 引入ma-mobile样式 一定要放在cube-ui引用的下面
Vue.use(maMobile)
Vue.prototype.$axios = axios
Vue.prototype.$ShowSharePanel = ShowSharePanel

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
