import axios from 'axios';

axios.defaults.timeout = 10000;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 响应拦截器
axios.interceptors.request.use((config) => {
  return config;
}, () => {
});

// 返回值处理
axios.interceptors.response.use((response) => {
  if (response.status === 200) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
}, () => {
});

export function get(url, data, token) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'GET',
      data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token,
      },
    }).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
}

export function post(url, data, token, type) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      data,
      method: 'POST',
      headers: {
        'Content-Type': type,
        token,
      },
    }).then((res) => {
      resolve(res);
    })
      .catch((err) => {
        reject(err);
      });
  });
}
