/* ********************* request 全局配置文档 ************************/
import Vue from 'vue'
import axios from 'axios'
import router from '../router'

// 请求错误处理 注意根据具体的服务器端设置，此处仅仅是个示例
const errorFn = err => {
  console.log(err.toString())
  if (err.toString().indexOf('timeout') != -1) {
    Vue.prototype.$message.error('请求超时，请稍后再试')
  }
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误'
        break

      case 401:
        err.message = '未授权，请登录'
        break

      case 403:
        err.message = '拒绝访问'
        break

      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`
        break

      case 408:
        err.message = '请求超时'
        break

      case 500:
        err.message = '服务器开个小差，请稍后再试'
        break

      case 501:
        err.message = '服务器开个小差，请稍后再试'
        break

      case 502:
        err.message = '服务器开个小差，请稍后再试'
        break

      case 503:
        err.message = '服务器开个小差，请稍后再试'
        break

      case 504:
        err.message = '服务器开个小差，请稍后再试'
        break

      case 505:
        err.message = 'HTTP版本不受支持'
        break

      default:
        err.message = '请求失败，请稍后再试'
    }
    Vue.prototype.$message.error(err.message)
  }
  return Promise.reject(err)
}
/* ***此处开始封装不同后台下的axios实例 ****/
// 龙湖后台
const $http = axios.create({
  headers: {},
  // baseURL: BASE_URL,
  timeout: 30000,
  withCredentials: true
})
$http.interceptors.request.use(
  config => {
    // 这里一个token，你需要在这里取到你设置好的token的值
    const token = localStorage['X-LONGCHAT-Token']
    if (token) {
      // 这里将token设置到headers中，header的key是Authorization，这个key值根据你的需要进行修改即可
      config.headers = Object.assign({
        'X-LONGCHAT-Token': token,
        'X-LONGCHAT-RefreshToken': localStorage['X-LONGCHAT-RefreshToken'],
        'lxAccount': localStorage['lxAccount']
      }, config.headers)
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
$http.interceptors.response.use(
  response => {
    // 如果状态码是ES7008，表示token失效，则直接跳转到登录页面
    if (response.data.code == 'ES7008') {
      router.replace({
        path: '/login'
      })
    } else {
      return response
    }
  }, errorFn
)
Vue.prototype.$http = $http
