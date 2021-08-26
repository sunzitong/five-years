/* ************** 所有api的配置文档 ***************/
let baseUrl
switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = 'https://mop-test.longfor.com:7001/longchat/app/v1/'// 基础服务url
    break
  case 'stage':
    baseUrl = 'https://portal-test.longhu.net:20001/longchat/app/v1/'
    break
  case 'production':
    baseUrl = 'https://portal.longhu.net:20001/longchat/app/v1/'
    break
}
export const BASE_URL = baseUrl
/* ************** service1 ***************/
export const LOGIN = BASE_URL + 'account/login'// 登录接口

