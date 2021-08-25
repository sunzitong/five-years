import Vue from "vue";
import Router from "vue-router";
import axios from 'axios';
// import pipe from "./pipe";
import { env } from "@/store";
import { getToken } from "@/utils/guanyu";
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
        axios.defaults.headers.common.Authorization = getToken();
        // 获取城市参数
        const visitSource = judgeDevice();
        env.cityId = "";
        env.cityName = "";
        env.GyVirtualPhone = to.query.GyVirtualPhone;
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

// pipe(mainRouter);

export default mainRouter;
