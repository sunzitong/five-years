import { get, post } from './http';

export function getShopList(data) {
  return get('/coupon_api/api/activity/cityAndItem', data);
}

export function getPhoneCode(phone) {
  return get(`/coupon_api/api/verification_code?phone=${phone}`, '');
}

export function drawCoupon(data) {
  return post('/coupon_api/api/user/activity/coupon', data);
}
