import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import { ConfirmPlugin, ToastPlugin, Scroller, LoadMore, Loading, Alert } from 'vux'

Vue.component('ConfirmPlugin', ConfirmPlugin)
Vue.component('ToastPlugin', ToastPlugin)
Vue.component('scroller', Scroller)
Vue.component('load-more', LoadMore)
Vue.component('Loading', Loading)
Vue.component('Alert', Alert)

Vue.use(VueRouter)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
