import VueRouter, { Route } from "vue-router";
import store from "@/store";
// import { getActivityInfo } from "@/api";
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
  if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
    const i = document.createElement("iframe");
    // i.src = process.env.BASE_URL + "favicon.ico";
    i.src = "//static.iguanyu.com/gywebsite/pc/oms/favicon.png";
    i.style.display = "none";
    i.onload = function () {
      setTimeout(function () {
        i.remove();
      }, 9);
    };
    document.body.appendChild(i);
  }
}

export default function (router: VueRouter) {
  router.beforeEach(function (to, from, next) {
    next();
  });
  // router.afterEach(async function () {
  //   // 获取活动详情
  //   if (!store.act.status || store.act.status === "fail") {
  //     store.act.status = "loading";
  //     const res = await getActivityInfo();
  //     if (!res) {
  //       store.act.status = "fail";
  //       return;
  //     }
  //     if (res.status === "ok") {
  //       store.act.data = res.data;
  //       store.act.status = "success";
  //     } else {
  //       store.act.status = "fail";
  //     }
  //   }
  // });
}
