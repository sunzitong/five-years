import Vue from "vue";
import Router from "vue-router";
import pipe from "./pipe";

Vue.use(Router);

const subRouter = [
  {
    path: "",
    redirect: {
      path: "myInvitation",
    },
  },
  {
    path: "login",
    component: () => import("@/views/login.vue"),
    meta: "login",
  },
  {
    path: "myInvitation",
    component: () => import("@/views/myInvitation.vue"),
    meta: "myInvitation",
  },
  {
    path: "friendsHelp",
    component: () => import("@/views/friendsHelp.vue"),
    meta: "friendsHelp",
  },
  {
    path: "*",
    component: () => import("@/views/404.vue"),
  },
];

const mainRouter = new Router({
  mode: "hash",
  // base: process.env.BASE_URL 即 vue.config.js publicPath
  routes: [
    {
      path: "/",
      component: () => import("./Hub.vue"),
      children: subRouter,
      beforeEnter(to, from, next) {
        /**
         * 可以添加平级路由，复用subRouter
         * 可在此处添加全局数据的初始化 如获取城市
         */
        next();
      },
    },
    {
      path: "*",
      component: () => import("@/views/404.vue"),
    },
  ],
});

pipe(mainRouter);

export default mainRouter;
