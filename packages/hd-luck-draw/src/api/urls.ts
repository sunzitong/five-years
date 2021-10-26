export const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 活动信息接口 url接活动编号查询
 */
export const PROMOTION = `${BASE_URL}/marketing/api/promotion/`;

/**
 * 城市列表
 */
export const PROMOTION_CITY_LIST = `${BASE_URL}/marketing/api/promotion/city/list`;


/**
 * 奖品列表
 */
export const MY_PRIZE = `${BASE_URL}/coupon_api/api/lottery/my_prizes`;


/**
 * 填写收货地址
 */
export const USER_ADDR = `${BASE_URL}/coupon_api/api/lottery/modify_user_addr`;

/**
 * 获取好友列表
 */
export const MY_HELPERS = `${BASE_URL}/coupon_api/api/lottery/my_helpers`;

/**
 * 获取受邀好友
 */
export const START_USER = `${BASE_URL}/coupon_api/api/lottery/start_user`;

/**
 * 获取活动详情
 */
export const DETAIL = `${BASE_URL}/coupon_api/api/lottery/detail`;


/**
 * 获取抽中奖品
 */
export const CUR_PRIZE = `${BASE_URL}/coupon_api/api/lottery/draw`;


/**
 * 为好友助力
 */
export const LOTTERY_JOIN= `${BASE_URL}/coupon_api/api/lottery/join`;



// 增加分享次数
export const LOTTERY_SHARE= `${BASE_URL}/coupon_api/api/lottery/share`;
