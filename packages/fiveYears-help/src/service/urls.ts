export const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 获取活动编号
 */
export const getNumberApi = `${BASE_URL}/coupon_api/api/help/number`;

/**
 * 获取排行榜信息
 */
export const getRankingsApi = `${BASE_URL}/coupon_api/api/help/{number}/rankings`;

/**
 * 获取我的助力信息
 */
export const getHelpMyApi = `${BASE_URL}/coupon_api/api/help/my`;

/**
 * 发起助力
 */
export const getHelpStartApi = `${BASE_URL}/coupon_api/api/help/start`;

/**
 * 为好友助力
 */
export const getHelpJoinApi = `${BASE_URL}/coupon_api/api/help/join`;

/**
 * 我的好友助力列表
 */
export const getMyHelpersApi = `${BASE_URL}/coupon_api/api/help/my_helpers`;