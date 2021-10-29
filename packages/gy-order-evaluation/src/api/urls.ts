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
 * 校验是否可以评价
 * 报修校验
 */
export const REPAIR_CHECK_EVALUATE = `${BASE_URL}/app-server/api/v1/workOrderRepair/checkEvaluate`;

/**
 * 校验是否可以评价
 * 投诉校验
 */
export const COMPLAINT_CHECK_EVALUATE = `${BASE_URL}/app-server/api/v1/workOrderComplaint/checkEvaluate`;

/**
 * 报修提交评价
 */
export const EVALUATE_REPAIR = `${BASE_URL}/app-server/api/v1/workOrderRepair/evaluateRepair`;

/**
 * 投诉提交评价
 */
export const EVALUATE_COMPLAINT = `${BASE_URL}/app-server/api/v1/workOrderComplaint/evaluateComplaint`;
