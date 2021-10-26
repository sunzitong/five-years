import VueRouter, { Route } from "vue-router";
import store from "@/store";
import { getActivityInfo } from "@/api";
import { noop } from "@/utils/tools";

/**
 * 跳转错误页
 */
// eslint-disable-next-line
function toError(router: VueRouter, to: Route) {
  store.env.err = "404";
  router
    .replace({
      path: "./error",
      query: to.query,
    })
    .catch(noop)
    .finally(() => {
      store.act.status = "fail";
    });
}

/**
 * 设置标题
 * @param title 标题
 */
// eslint-disable-next-line
function setDocumentTitle(title: string) {
  document.title = title;
}

export default function (router: VueRouter) {
  router.beforeEach(function (to, from, next) {
    next();
  });
  router.afterEach(async function () {
    // 获取活动详情
  });
}
