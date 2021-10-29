import { http } from './http';

export function postPhoneCode(phone, rid) {
  // 发送短信验证码
  return http(`/webapp/radar/sendSms?phone=${phone}&rid=${rid}`, '', 'GET', 'application/x-www-form-urlencoded', '');
}

export function getUserInfo() {
  // 获取用户信息
  return http('/webapp/radar/userInfo', '', 'GET', 'application/x-www-form-urlencoded', '');
}

export function userRigster(data) {
  return http(`/webapp/radar/addUser?phone=${data.phone}&code=${data.code}&openId=${data.openId}&unionId=${data.unionId}`, '', 'GET', 'application/json', '');
}

export function getCluesList(data, sessionId) {
  return http('/webapp/radar/list', data, 'GET', 'application/json', sessionId);
}

// 发送线索
export function userSureClues(data) {
  return http(`/webapp/radar/addForm?linkName=${data.linkName}&phone=${data.phone}&province=${data.province}&city=${data.city}&district=${data.district}&address=${data.address}&area=${data.area}&areaCode=${data.areaCode}`, '', 'GET', 'application/json');
}
