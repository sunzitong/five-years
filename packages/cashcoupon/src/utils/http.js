import axios from 'axios';

axios.defaults.timeout = 10000;

axios.defaults.headers.post['Content-Type'] = 'application/json';

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

export function get(url, data, token) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'GET',
      data,
      headers: {
        'Content-Type': 'application/json',
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
      console.log(res);
    })
      .catch((err) => {
        reject(err);
      });
  });
}
