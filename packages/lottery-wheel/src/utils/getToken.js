export const getAppToken = () => {
  try {
    if (window.fetchAuthInfo || window.gyAndroid) {
      let tokenObj = window.gyAndroid ? window.gyAndroid.fetchAuthInfo()
        : window.fetchAuthInfo()
      let token = ''
      if (typeof tokenObj === 'string') {
        tokenObj = JSON.parse(tokenObj)
      }
      token = tokenObj.access_token
      if (token) {
        sessionStorage.setItem('token', token)
        return true
      }
    }
  } catch (e) {
    return false
    // Toast.fail('获取用户信息失败');
  }
}
export const judgeSystem = () => {
  const u = navigator.userAgent
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // 安卓
  const isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  if (isAndroid) {
    return 'isAndroid'
  }
  if (isIos) {
    return 'isIos'
  }
}
// 错误信息
export const ERR_MSG = {
  LOGIN: '登录状态已过期',
  DEFAULT_ERROR_MSG: '网络不给力，请稍后再试',
  EMPTY_DESC_MSG: '请求失败，请稍后再试'
}
