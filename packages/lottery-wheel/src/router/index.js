import Vue from 'vue'
import Router from 'vue-router'
import promote from '@/pages/promote'
import index from '@/pages/index'
import record from '@/pages/record'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'promote',
      component: promote
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/record',
      name: 'record',
      component: record
    }
  ]
})
