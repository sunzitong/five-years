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
 * 活动列表
 */
export const PROMOTION_ACTIVITY_LIST = `${BASE_URL}/marketing/api/activity/getCustomEntry`;

/**
 * 活动城市列表
 */
export const PROMOTION_ACTIVITY_CITY = `${BASE_URL}/marketing/api/activity/city/list`;

/**
 * 活动门店列表
 */
export const PROMOTION_ACTIVITY_ROOM = `${BASE_URL}/marketing/api/activity/project/list`;
