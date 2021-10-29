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
 * 门店列表
 */
export const PROMOTION_PROJECT_LIST = `${BASE_URL}/marketing/api/promotion/project/list`;

/**
 * 领奖接口
 */
export const PROMOTION_RECEIVE = `${BASE_URL}/marketing/api/promotion/receive`;

/**
 * 活动列表
 */
export const ANN_CMS = `${BASE_URL}/commactivity-server/anniversary/cms`;
