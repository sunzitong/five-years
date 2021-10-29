import Vue from "vue";
import Router from "vue-router";
import moment from "moment";
import pipe from "./pipe";
import { env } from "@/store";
import { getCurrentCity } from "@guanyu/guanyu-h5-tools";
import { judgeDevice } from "@guanyu/h5-tools";

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
    meta: "index",
  },
  {
    path: "luckyInfo",
    component: () => import("@/views/luckyInfo.vue"),
    meta: "luckyInfo",
  },
  {
    path: "expired",
    component: () => import("@/views/expired.vue"),
    meta: "expired",
  },
  {
    path: "*",
    component: () => import("@/views/404.vue"),
  },
];

const mainRouter = new Router({
  mode: "hash",
  // base: process.env.BASE_URL, // vue.config.js publicPath
  routes: [
    {
      path: "/",
      // path: "/:sn",
      component: () => import("./Hub.vue"),
      children: subRouter,
      beforeEnter(to, from, next) {
        if (to.meta !== 'expired' && moment().isAfter('2020-10-08 23:59:59')) {
          next({
            path: '/expired'
          })
        } else {
          next();
        }
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
