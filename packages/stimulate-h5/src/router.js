import Vue from 'vue';
import Router from 'vue-router';
import index from './views';
import years from './views/years';
import code from './views/code';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: index,
  }, {
    path: '/code',
    name: 'code',
    component: code,
  }, {
    path: '/years',
    name: 'index',
    component: years,
  }],
});
