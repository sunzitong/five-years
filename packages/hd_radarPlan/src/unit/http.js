import axios from 'axios';

axios.defaults.timeout = 10000;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 响应拦截器
// axios.interceptors.request.use((config) => {
//   console.log()
//   return config;
// }, () => {
// });

// // 返回值处理
// axios.interceptors.response.use((response) => {
//   console.log('response', response);
//   if (response.status === 200) {
//     return Promise.resolve(response);
//   } else {
//     return Promise.reject(response);
//   }
// }, () => {
// });

export function http(url, data, method, type, sessionId) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method,
      data,
      headers: {
        'Content-Type': type,
        Authorization: sessionId,
      },
    }).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
}
