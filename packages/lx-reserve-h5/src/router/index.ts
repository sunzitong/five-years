import Vue from "vue";
import Router from "vue-router";
import pipe from "./pipe";
import { env } from "@/store";
import { getCurrentCity } from "@guanyu/guanyu-h5-tools";
import { judgeDevice } from "@guanyu/h5-tools";

Vue.use(Router);

const subRouter = [
  {
    path: "",
    redirect: {
      path: "orderList",
    },
  },
  {
    path: "index",
    component: () => import("@/views/Index.vue"),
    meta: "index",
  },
  {
    path: "reserve",
    component: () => import("@/views/Reserve.vue"),
    meta: "reserve",
  },
  {
    path: "storeList",
    component: () => import("@/views/StoreList.vue"),
    meta: "storeList",
  },
  {
    path: "storeDetail",
    component: () => import("@/views/StoreDetail.vue"),
    meta: "storeDetail",
  },
  {
    path: "storeMap",
    component: () => import("@/views/StoreMap.vue"),
    meta: "storeMap",
  },
  {
    path: "storeAlbum",
    component: () => import("@/views/StoreAlbum.vue"),
    meta: "storeAlbum",
  },
  {
    path: "signOrder",
    component: () => import("@/views/SignOrder.vue"),
    meta: "signOrder",
  },
  {
    path: "orderList",
    component: () => import("@/views/OrderList.vue"),
    meta: "orderList",
  },
  {
    path: "dynamicList",
    component: () => import("@/views/DynamicList.vue"),
    meta: "dynamicList",
  },
  {
    path: "orderDetail",
    component: () => import("@/views/OrderDetail.vue"),
    meta: "orderDetail",
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
        env.sn = process.env.VUE_APP_ACT_NUM; //to.params.sn;
        // 获取城市参数
        const visitSource = judgeDevice();
        env.cityId = "";
        env.cityName = "";
        const cityName = (to.query.cityName as string) || "北京";
        const cityId = (to.query.cityId as string) || "1";
        if (visitSource === "APP") {
          getCurrentCity()
            .then((res: any) => {
              env.cityName = res?.data?.name;
              env.cityId = res?.data?.id;
            })
            .catch(() => {
              env.cityName = cityName;
              env.cityId = cityId;
            });
        } else {
          env.cityName = cityName;
          env.cityId = cityId;
        }
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
