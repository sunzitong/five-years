import { get, post } from './http';

export function getActiveDetail(number) {
  return get(`/coupon_api/api/cash/${number}`, '');
}

export function drawCounpon(data) {
  return post('/coupon_api/api/cash/receive', data);
}

export function sendPhoneCode(phone) {
  return get(`/coupon_api/api/verification_code?phone=${phone}`);
}
