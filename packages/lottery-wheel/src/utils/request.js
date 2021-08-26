import Fly from 'flyio'
import { getAppToken, judgeSystem, ERR_MSG } from './getToken'
const msg = desc => window.alert(desc || ERR_MSG.EMPTY_DESC_MSG)

const request = Fly
const IP = window.returnCitySN && window.returnCitySN.cip
request.interceptors.request.use((req) => {
  req.headers['Content-type'] = 'application/json;charset=UTF-8'
  req.headers['Authorization'] = (getAppToken() && sessionStorage.getItem('token')) || '' // ee981029226ce63e 39a52b90b3c25e10
  req.headers['clientIp'] = IP
  req.headers['buCode'] = judgeSystem() === 'isAndroid' ? 'C30503' : judgeSystem() === 'isIos' ? 'C30603' : ''
  return req
})
request.interceptors.response.use(
  (response, promise) => {
    return promise.resolve(response.data)
  },
  (err, promise) => {
    console.log(err.status)
    if (err.status === 401) {
      msg(ERR_MSG.LOGIN)
    } else if (err.status === 500) {
      msg(ERR_MSG.EMPTY_DESC_MSG)
    }
    return promise.resolve()
  }
)

export default request
