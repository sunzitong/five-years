import request from '../utils/request'
const baseURL = '/uc/app'
// const baseURL = '/app'
// 正式线api网址
// const baseURL = 'https://m.iguanyu.com/'
// 正式线api ip网址
// const baseUrl = 'http://oms.test.gyapt.cn/gymwebsite'
const api = {
  // 获取积分
  postCustomerPoint: () => request.post(`/profile/customer-point`, null, {
    baseURL: baseURL
  }),
  // 抽奖接口
  postDraw: () => request.post(`/point/lotteries/draw`, null, {
    baseURL: baseURL
  }),
  // 积分抽奖活动详情
  postDetail: () => request.post(`/point/lotteries/detail`, null, {
    baseURL: baseURL
  }),
  // 提交更新收件信息
  postReceiveInfo: (params) => request.post(`/point/lotteries/receive-info`, params, {
    baseURL: baseURL
  }),
  // 我的中奖记录
  postPaging: (params) => request.post(`/point/lotteries/draw-records/paging`, params, {
    baseURL: baseURL
  })
}
export default api
