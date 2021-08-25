/**
 * h5-tools http://githome
 * guanyu-h5-tools https://artifactory.longhu.net
 */
import {
  getAppAuthInfo,
  ShowSharePanel,
  MpShareOptions,
  AppShareOptions,
} from "@guanyu/guanyu-h5-tools";
import { judgeDevice, wxShare, WxShareOptions } from "@guanyu/h5-tools";
import Cookies from "js-cookie";
import { getQueries } from "./tools";

/**
 * 获取当前用户登录token
 */
export function getToken() {
  const visitSource = judgeDevice();
  /*
  // 模拟
  if (process.env.NODE_ENV === "development") {
    return getQueries().sessionId;
  }
  */
  if (visitSource === "小程序") {
    return getQueries().sessionId;
  }
  if (visitSource === "APP") {
    return getAppAuthInfo()?.access_token;
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
/**
 * 微信分享
 * 会自动引用 jweixin-1.4.0
 * @param options 微信分享配置
 */
export function setWxShare(options: WxShareOptions) {
  //   if (!/MicroMessenger/i.test(navigator.userAgent)) {
  //     return;
  //   }
  return wxShare({
    debug: false, // 默认为false，不开启调试模式
    // api: "", //获取微信鉴权的接口地址, 不填写默认为 /gymwebsite/getJsapiSigna
    // title: "", // 分享标题,
    link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致,
    // img: "", // 分享图标,
    // desc: "", // 分享描述,
    // type: "", // 分享类型,music、video或link，不填默认为link,
    // dataUrl: "", //如果type是music或video，则要提供数据链接，默认为空,
    // success: () => {},
    ...options,
  });
}
/**
 * 注册小程序分享
 * 需要手动引用 jweixin sdk
 * @param options 配置
 */
export function setMiniProgramShare(options: MpShareOptions) {
  window.wx.miniProgram.postMessage({
    data: {
      title: "",
      imageUrl: "",
      path: "",
      ...options,
    },
  });
}
/**
 * 调用app分享
 * @param options app分享配置
 * @param miniProgramUrl 网址分享到小程序
 * @param type 小程序版本 0正式版 1开发版 2体验版
 */
export function showAppShare(
  options: AppShareOptions,
  miniProgramUrl?: string,
  type = 0
) {
  let shareMiniProgramUrl = "";
  if (miniProgramUrl) {
    miniProgramUrl = encodeURIComponent(miniProgramUrl);
    const path = encodeURIComponent(
      `/packageA/pages/bearWeb/bearWeb?item=${miniProgramUrl}`
    );
    shareMiniProgramUrl = `guanyu://miniProgram?userName=gh_1b7cffb1d9a2&path=${path}&appId=wx1c1c8c073e2be1fc&type=${type}`;
  }
  return ShowSharePanel({
    types: ["wx_session"],
    title: "",
    url: "",
    text: "",
    image: "",
    shareMiniProgramUrl,
    ...options,
  });
}
