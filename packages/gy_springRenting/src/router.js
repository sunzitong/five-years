import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import FriendsDrop from './views/FriendsDrop.vue';
import December12th from './views/December12th.vue';

Vue.use(Router);

export default new Router({
  // mode: '',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/friendsDrop',
      name: 'friendsDrop',
      component: FriendsDrop,
    },
    {
      path: '/december12th',
      name: 'december12th',
      component: December12th,
    },
  ],
});
