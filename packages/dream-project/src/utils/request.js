import { Toast } from 'antd-mobile';
import { judgeDevice } from '@guanyu/h5-tools';
import axios from 'axios';

const visitSource = judgeDevice();

// const isMiniProgram = navigator.userAgent.includes('miniProgram');

export default function request(url, options, alwaysReturn = false) {
  return axios.request({
    validateStatus(status) {
      return status < 500;
    },
    url,
    ...options,
  }).then((res) => {
    const { data = {}, status = '' } = res || {};
    const { message = '', code } = data || {};
    if (code === 10000 || code === 1000) {
      return res;
    } else if (+status === 401) {
      document.cookie = 'GyAuthorization=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
      // 小程序
      if (visitSource === '小程序') {
        Toast.fail('身份过期,请重新授权', 3, () => {
          window.wx.miniProgram.navigateTo({ url: `/packageA/pages/login/login?webviewUrl=${encodeURIComponent(window.location.href)}` });
        });
      } else if (visitSource === 'APP') { // app
        Toast.fail('身份过期,请重新授权', 3, () => {
          window.location.href = 'guanyu://page.gy/login';
        });
      } else {
        Toast.fail('身份过期,请重新授权', 3, () => {
          window.location.href = '/fe/dream-project/#/fe/dream-project/layout/index?cityId=1&cityName=北京';
          window.location.reload();
        });
      }
    } else if (alwaysReturn) {
      return res;
    } else {
      Toast.fail(message || '系统错误', 3);
    }
  }).catch(() => {
    Toast.fail('系统错误', 3);
  });
}
