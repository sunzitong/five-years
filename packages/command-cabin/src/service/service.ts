// import { getToken } from "@/utils/guanyu";
import { env } from "@/store";
import mitter, { EventName } from "@/utils/mitter";
import axios from "axios";

const service = axios.create({
  withCredentials: true, // 是否携带cookie信息
  timeout: 30000, // Timeout
});
service.defaults.headers.post["Content-Type"] = "application/json";

// request拦截器
service.interceptors.request.use(
  (config) => {
    // 需要token就在这里设置
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  () => {
    console.error("[接口]", "出错了");
    return;
  }
);

// respone拦截器
service.interceptors.response.use(
  (response) => {
    if (response.data?.timestamp) {
      env.NOW = response.data.timestamp;
    }
    if (response.data?.status !== "ok") {
      console.log(`[url] ${response.status} fail:`, response.config.url);
    }
    return response.data;
  },
  (error) => {
    console.error("[url]", error?.response?.config?.url);
    if (!error) {
      console.error("[接口]", "出错了");
      return;
    }
    if (error.message.includes("timeout")) {
      console.error("[接口]", "请求超时，请稍后再试");
      return;
    }
    if (error.response) {
      mitter.emit(EventName.ServiceError, error.response.status);
      switch (error.response.status) {
        case 400:
          error.message = "请求错误";
          break;
        case 401:
          error.message = "未授权，请登录";
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = `请求地址出错`;
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器开个小差，请稍后再试";
          break;
        case 501:
          error.message = "服务器开个小差，请稍后再试";
          break;
        case 502:
          error.message = "服务器开个小差，请稍后再试";
          break;
        case 503:
          error.message = "服务器开个小差，请稍后再试";
          break;
        case 504:
          error.message = "服务器开个小差，请稍后再试";
          break;
        case 505:
          error.message = "HTTP版本不受支持";
          break;
        default:
          error.message = "请求失败，请稍后再试";
      }
      console.error("[接口]", error.message);
      return;
    }
    console.error("[接口]", "出错了");
    return;
  }
);

export default service;
