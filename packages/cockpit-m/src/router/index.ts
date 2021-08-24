import { getAppAuthInfo } from "@guanyu/guanyu-h5-tools";
import isEmpty from "lodash/isEmpty";
import Vue from "vue";
import Router from "vue-router";
import pipe from "./pipe";

Vue.use(Router);

const subRouter = [
  {
    path: "",
    redirect: {
      path: "credit",
    },
  },
  {
    path: "credit",
    component: () => import("@/views/Credit/Index.vue"),
    meta: {
      title: "综合经营指数",
      zhuge: { name: "VoyagePliot_ManagementIndex_Enter" },
    },
  },
  {
    path: "rank",
    component: () => import("@/views/Rank/Index.vue"),
    meta: {
      title: "月度指数排名",
      zhuge: { name: "VoyagePliot_ManagementIndexRank_Enter" },
    },
  },
  {
    path: "yearskp",
    component: () => import("@/views/YearsKP/Index.vue"),
    meta: {
      title: "年度KP达成排名",
      zhuge: { name: "VoyagePliot_KpRank_Enter" },
    },
  },
  {
    path: "rent-ratio",
    component: () => import("@/views/RentRatio/Index.vue"),
    meta: {
      title: "出租率分析",
      zhuge: { name: "VoyagePliot_RentRate_Enter" },
    },
  },
  {
    path: "renew-ratio",
    component: () => import("@/views/RenewRatio/Index.vue"),
    meta: {
      title: "续租率分析",
      zhuge: { name: "VoyagePliot_ReletRate_Enter" },
    },
  },
  {
    path: "checkout-ratio",
    component: () => import("@/views/CheckoutRatio/Index.vue"),
    meta: {
      title: "违退率分析",
      zhuge: { name: "VoyagePliot_BreakRate_Enter" },
    },
  },
  {
    path: "rent-term",
    component: () => import("@/views/RentTerm/Index.vue"),
    meta: {
      title: "租期分布",
      zhuge: { name: "VoyagePliot_TenancyTerm_Enter" },
    },
  },
  {
    path: "income-reach",
    component: () => import("@/views/IncomeReach/Index.vue"),
    meta: {
      title: "收入达成分析",
      zhuge: { name: "VoyagePliot_Income_Enter" },
    },
  },
  {
    path: "revenue-forecast",
    component: () => import("@/views/RevenueForecast/Index.vue"),
    meta: {
      title: "收入预测计算器",
      zhuge: { name: "VoyagePilot_IncomeCalculator_Enter" },
    },
  },
  {
    path: "pricing",
    component: () => import("@/views/Pricing/Index.vue"),
    meta: {
      title: "追光系统 (动态调价建议)",
      zhuge: { name: "VoyagePliot_PriceAdvice_Enter" },
    },
  },
  {
    path: "cus-store",
    component: () => import("@/views/CusStore/Index.vue"),
    meta: {
      title: "客储与转化率",
      zhuge: { name: "VoyagePliot_CustomerConversion_Enter" },
    },
  },
  {
    path: "marketing-expense",
    component: () => import("@/views/MarketingExpense/Index.vue"),
    meta: {
      title: "营销费用分析",
      zhuge: { name: "VoyagePilot_MarketingCost_Enter" },
    },
  },
  {
    path: "operational-cost",
    component: () => import("@/views/OperationalCost/Index.vue"),
    meta: {
      title: "运营成本分析",
      zhuge: { name: "VoyagePilot_OperatingCost_Enter" },
    },
  },
  {
    path: "equi-abnormal",
    component: () => import("@/views/EquiAbnormal/Index.vue"),
    meta: {
      title: "设备异常",
      zhuge: { name: "VoyagePilot_DeviceAbnorm_Enter" },
    },
  },
  {
    path: "example",
    component: () => import("@/views/Example/Index.vue"),
    meta: { title: "示例" },
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
        next();
        const authInfo = getAppAuthInfo();
        if (window.zhuge) {
          if (!isEmpty(authInfo)) {
            window.zhuge.identify(authInfo.uid, {
              userID: authInfo.uid,
              电话号码: authInfo.phone,
            });
          }
        }

        // APM 监控
        if (window.MAIAAPM) {
          window.MAIAAPM.setUid(authInfo?.uid);
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
