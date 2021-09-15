import VueRouter, { Route } from "vue-router";
import store from "@/store";
import noop from "lodash/noop";
import mitter, { EventName } from "@/utils/mitter";

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
      /** TODO */
    });
}

/**
 * 设置标题
 * @param title 标题
 */
// eslint-disable-next-line
function setDocumentTitle(title: string) {
  document.title = title;
  /**
   * 如果ios出现title不能生效的情况加上下面的代码
   * 一般不要加 一些app环境里的可能需要加业务域名
   * （或者iframe加载的地址不要跨域）
   */
  // if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
  //   const i = document.createElement("iframe");
  //   // i.src = process.env.BASE_URL + "favicon.ico";
  //   i.style.display = "none";
  //   i.onload = function () {
  //     setTimeout(function () {
  //       i.remove();
  //     }, 9);
  //   };
  //   document.body.appendChild(i);
  // }
}

export default function (router: VueRouter) {
  router.beforeEach(function (_to, _from, next) {
    /**
     * 删除echarts重绘事件
     */
    mitter.all.delete(EventName.ResizeEcharts);
    next();
  });
  router.afterEach(async function () {
    /**
     * 全局路由守卫 每次跳转都会执行
     * 可以在此处获取全局数据
     */
  });
}
