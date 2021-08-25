/**
 * http://githome/app/app-fe/-/wikis/Native%E5%9F%BA%E7%A1%80%E5%8A%9F%E8%83%BD
 * https://artifactory.longhu.net/webapp/#/packages/npm/%2540guanyu~2Fh5-tools/1.1.3/?state=eyJyZXBvIjoiZHQtbnBtLWxvY2FsIiwidmVyc2lvblBhdGgiOiJkdC1ucG0tbG9jYWwvQGd1YW55dS9oNS10b29scy0xLjEuMy50Z3oiLCJxdWVyeSI6e319
 */
import {
    getAppAuthInfo,
    ShowSharePanel,
    miniProgramShareOptions,
    appShareOptions,
} from "@guanyu/guanyu-h5-tools";
import { judgeDevice, wxShare, wxShareOptions } from "@guanyu/h5-tools";
import qs from "qs";
import Cookies from "js-cookie";

/**
 * 获取url的query 包括hash模式的$route.query
 */
export function getQueries(searchStr?: string) {
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
        return getAppAuthInfo()?.access_token;
    }
    if (visitSource === "broswer") {
        return Cookies.get("GyAuthorization");
    }
    return "";
}

/**
 * 调用登录
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
 * @param options 微信分享配置
 */
export function setWxShare(options: wxShareOptions) {
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
 * @param options 配置
 */
export function setMiniProgramShare(options: miniProgramShareOptions) {
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
    options: appShareOptions,
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
        // types: ["wx_session", "wx_timeline", "sina"],
        types: ["wx_session"],
        title: "",
        url: "",
        text: "",
        image: "",
        shareMiniProgramUrl,
        ...options,
    });
}
