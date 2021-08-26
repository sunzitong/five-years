import axios from 'axios';

axios.defaults.timeout = 10000;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 响应拦截器
axios.interceptors.request.use((config) => {
  console.log(config);
  return config;
}, (err) => {
  console.log(err);
});

// 返回值处理
axios.interceptors.response.use((response) => {
  if (response.status === 200) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
}, (err) => {
  console.log(err);
});

export function http(url, data, type, token) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: type,
      data,
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
}
