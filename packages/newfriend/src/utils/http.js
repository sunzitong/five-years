import { get, post } from './server'

// 发送短信验证码
export function getPhoneCode(phone) {
  const response = get(`/coupon_api/api/verification_code?phone=${phone}`);
  return response;
}

// 被推荐人接受邀请
export function UserAcceptInter(params) {
  const response = post(`/coupon_api/api/recommend/accept_invitation`, params);
  return response;
}

// 获取 appid、nonceStr 等
export function getInforMation(url, details) {
  const response = post(`/gymwebsite/getJsapiSigna?url=${url}`, details);
  return response;
}

// 获取 个人头像、名称
export function getUserInfo (token) {
  const response = post(`/coupon_api/api/recommend/start_user?token=${token}`);
  return response;
}

// 获取城市列表
export function getCityList() {
  const response = get(`/gymwebsite/city/cityList?isGqh=0`);
  return response;
}


// 获取附近房源
export function getNearbyHouse(id) {
  const response = get(`/gymwebsite/project/index?cityId=${id}`);
  return response;
}

// 获取经纬坐标
export function positionIp () {
  const response = post(`/gymwebsite/getJsapiSigna`);
  return response;
}