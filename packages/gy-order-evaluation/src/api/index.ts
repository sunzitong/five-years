import http from "./http";
import {
  PROMOTION,
  PROMOTION_CITY_LIST,
  REPAIR_CHECK_EVALUATE,
  COMPLAINT_CHECK_EVALUATE,
  EVALUATE_REPAIR,
  EVALUATE_COMPLAINT,
} from "./urls";
import { env } from "@/store";

/**
 * 查询活动信息
 */
export function getActivityInfo() {
  return http.get<Activity>(PROMOTION + env.sn);
}

/**
 * 获取城市列表
 */
export function getCityList() {
  return http.get<string[]>(PROMOTION_CITY_LIST, {
    activityNumber: env.sn,
  });
}

/**
 * 校验是否可以评价
 * 报修
 */
export function rapairCheckEvaluate(params: Record<string, any>) {
  return http.post<string[]>(REPAIR_CHECK_EVALUATE, params);
}

/**
 * 校验是否可以评价
 * 投诉
 */
export function complanitCheckEvaluate(params: Record<string, any>) {
  return http.post<string[]>(COMPLAINT_CHECK_EVALUATE, params);
}

/**
 * 报修提交评价
 */
export function evaluateRepair(params: Record<string, any>) {
  return http.post<string[]>(EVALUATE_REPAIR, params);
}

/**
 * 投诉提交评价
 */
export function evaluateComplaint(params: Record<string, any>) {
  return http.post<string[]>(EVALUATE_COMPLAINT, params);
}

export default {
  getActivityInfo,
  getCityList,
  rapairCheckEvaluate,
  complanitCheckEvaluate,
  evaluateRepair,
  evaluateComplaint,
};
