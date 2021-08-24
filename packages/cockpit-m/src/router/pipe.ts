import VueRouter, { Route } from "vue-router";
import store from "@/store";
import noop from "lodash/noop";

/**
 * 跳转错误页
 */
// eslint-disable-next-line
function toError(router: VueRouter, to: Route) {
  store.env.error = "404";
  router
    .replace({
      path: "./error",
      query: to.query,
    })
    .catch(noop)
    .finally(() => {
      /* TODO */
    });
}

export default function (router: VueRouter) {
  router.beforeEach(function (to, _from, next) {
    document.title = to.meta?.title ?? "远航驾驶舱";
    next();
  });
  router.afterEach(async function (to) {
    if (window.zhuge && to.meta?.zhuge) {
      window.zhuge.track(`驾驶舱-${to.meta.title}-进入`);
    }
  });
}
