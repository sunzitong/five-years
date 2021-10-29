/**
 * h5-tools http://githome
 * guanyu-h5-tools https://artifactory.longhu.net
 */
import qs from "qs";
import {
  getAppAuthInfo,
} from "@guanyu/guanyu-h5-tools";
import { judgeDevice } from "@guanyu/h5-tools";
import Cookies from "js-cookie";


const getQueries = (searchStr) => {
  if (searchStr) {
    return qs.parse(searchStr, { ignoreQueryPrefix: true });
  }
  let hash = location.hash.split("?")[1];
  if (hash) {
    // 剔除spa-hash模式的$route.hash
    hash = hash.split("#")[0];
  }
  return {
    ...qs.parse(location.search, { ignoreQueryPrefix: true }),
    ...qs.parse(hash, { ignoreQueryPrefix: true }),
  };
}

/**
 * 获取当前用户登录token
 */
export function getToken() {
  const visitSource = judgeDevice();
  // 模拟
  if (process.env.NODE_ENV === "development") {
    return getQueries().sessionId;
  }
  if (visitSource === "小程序") {
    return getQueries().sessionId;
  }
  if (visitSource === "APP") {
    return getAppAuthInfo().access_token;
  }
  if (visitSource === "broswer") {
    return Cookies.get("GyAuthorization");
  }
  return "";
}
/**
 * 调用登录
 * 需要手动引用 jweixin sdk
 */
export function toLogin(webviewUrl = "") {
  const visitSource = judgeDevice();
  if (visitSource === "小程序") {
    webviewUrl = webviewUrl || window.location.href;
    return window.wx.miniProgram.navigateTo({
      url: `/packageA/pages/login/login?webviewUrl=${encodeURIComponent(
        webviewUrl
      )}`,
    });
  }
  if (visitSource === "APP") {
    return (window.location.href = "guanyu://page.gy/login");
  }
  return false;
}
