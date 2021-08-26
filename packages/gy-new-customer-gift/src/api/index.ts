import http from "./http";
import { MOVING_COUPON, DRAW_DISCOUNT, COUPON_STATUS } from "./urls";
// import { env } from "@/store";

/**
 * 领取搬家券
 */
export function getMovingCoupon() {
  return http.post(MOVING_COUPON, null);
}

/**
 * 抽奖
 */
export function drawDiscount(params: { city: string, channel: string}) {
  return http.post(DRAW_DISCOUNT, {
    ...params,
  });
}

/**
 * 查询领取状态
 */
export function queryCouponStatus() {
  return http.get(COUPON_STATUS, null);
}

export default {
  getMovingCoupon,
  drawDiscount,
  queryCouponStatus,
};
