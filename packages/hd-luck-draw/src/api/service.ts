import axios from "axios";
import { Toast } from "vant";
import { getToken } from "@/utils/guanyu";

const service = axios.create({
  withCredentials: true, // 是否携带cookie信息
  timeout: 30000 // Timeout
});
service.defaults.headers.post["Content-Type"] = "application/json";
service.defaults.headers.common["Token"] = getToken();

// request拦截器
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error.toString().indexOf("timeout") != -1) {
      Toast.fail("请求超时，请稍后再试");
    }
    if (error && error.response) {
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
          error.message = `请求地址出错: ${error.response.config.url}`;
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
      Toast.fail(error.message);
    } else {
      Toast.fail("出错了");
    }
    return Promise.reject(error);
  }
);

export default service;
