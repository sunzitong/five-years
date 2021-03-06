export const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 测试 - 本地mock
 */
export const demoTest = `${BASE_URL}/demo/test`;

/* 支持路由参数 如 /get/{id} */

/* 会员领取月付不上浮接口 */
export const receiveMonthPayNotComeUp = `${BASE_URL}/coupon_api/api/coupon/receiveMonthPayNotComeUp`;