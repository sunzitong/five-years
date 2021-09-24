import { post, get } from './server';

export function playLight(data, token) {
  return post('/coupon_api/api/lottery/bright', data, token, 'application/x-www-form-urlencoded');
}

export function getJoinNumber(data, token) {
  // 获取参加人数接口
  return get('/coupon_api/api/lottery/detail', data, token);
}

export function getPrizeIndex(data, token) {
  // 获取抽奖接口
  return post('/coupon_api/api/lottery/draw', data, token, 'application/json');
}

export function getPrizeList(data, token) {
  // 获取我的奖品列表
  return post('/coupon_api/api/lottery/my_prizes', data, token, 'application/x-www-form-urlencoded');
}

export function shareFirend(data, token) {
  return post('/coupon_api/api/lottery/share', data, token, 'application/x-www-form-urlencoded');
}
