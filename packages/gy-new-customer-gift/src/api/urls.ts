export const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 领取搬家券
 */
export const MOVING_COUPON = `${BASE_URL}/coupon_api/api/recommend/receive/discounts/renewal`;

/**
 * 抽奖
 */
export const DRAW_DISCOUNT = `${BASE_URL}/coupon_api/api/lottery/drawDiscount`;

/**
 * 查询领取状态
 */
export const COUPON_STATUS = `${BASE_URL}/coupon_api/api/lottery/newGiftBag`;
