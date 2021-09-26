import Vue from "vue";
import Router from "vue-router";
import pipe from "./pipe";

Vue.use(Router);

const subRouter = [
  {
    path: "",
    redirect: {
      path: "index",
    },
  },
  {
    path: "index",
    component: () => import("@/views/Index.vue"),
    meta: {
      name: "index",
    },
  },
  {
    path: "home",
    component: () => import("@/views/Home/Index.vue"),
    meta: {
      name: "home",
    },
  },
  {
    path: "project",
    component: () => import("@/views/Project/Index.vue"),
    meta: {
      name: "project",
    },
  },
  {
    path: "build-the-plate",
    component: () => import("@/views/BuildThePlate/Index.vue"),
    meta: {
      name: "build-the-plate",
    },
  },
  {
    path: "login",
    component: () => import("@/views/Login/Index.vue"),
    meta: {
      name: "login",
    },
  },
  {
    path: "example",
    component: () => import("@/views/Example.vue"),
    meta: {
      name: "example",
    },
  },
  {
    path: "example-map",
    component: () => import("@/views/ExampleMap.vue"),
    meta: {
      name: "example-map",
    },
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
