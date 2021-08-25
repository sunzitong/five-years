import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
// 引入接口和axios初始化配置
import './api'
import maMobile from '@longfor/ma-mobile' // 引入ma-mobile依赖
import '@longfor/ma-mobile/lib/styles/ma-mobile.css' // 引入ma-mobile样式 一定要放在cube-ui引用的下面
import moment from 'moment'
import axios from 'axios'
import zhugeio from '@guanyu/zhugeio'
import { judgeDevice } from '@guanyu/h5-tools'

Vue.use(maMobile)

const url = window.location.href
let appKey = '3ec10a66f82f4951ba811df964fcc199'
let jsSrc = 'https://dataintest.longfor.com/zhuge.js?v='
const visitSource = judgeDevice()
if (url.includes('m.iguanyu.com')) {
  appKey = 'c6911bc459bb41a5acbb720e91057739' // 正式
  jsSrc = 'https://datain.longfor.com/zhuge.js?v='
}

zhugeio({
  appKey, // 选填 默认： c6911bc459bb41a5acbb720e91057739
  jsSrc, // 选填 默认：https://datain.longfor.com/zhuge.js?v=
  options: {
    superProperty: {
      访问来源: visitSource === 'browser' ? '其他' : visitSource
    },
    adTrack: false, // 广告监测开关
    zgsee: false, // 视屏采集开关
    autoTrack: true, // 启用全埋点采集
    singlePage: true // 是否是单页面应用（SPA），启用autoTrack后生效
  } // 选填
})
Vue.use(zhugeio)

Vue.config.productionTip = false
Vue.prototype.$moment = moment
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
