import axios from 'axios'

//设置超时时间
axios.defaults.timeout = 10000;
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';


export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(`${url}`,params).then((res) => {
      resolve(res)
    })
    .catch((err) => {
      reject(err)
    })
  })
}

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(`${url}`, params).then((res) => {
      resolve(res)
    })
    .catch((err) => {
      reject(err)
    })
  })
}