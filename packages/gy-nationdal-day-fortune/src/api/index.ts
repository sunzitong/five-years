import http from "./http";
import { PROMOTION, PROMOTION_CITY_LIST } from "./urls";
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

export default {
  getActivityInfo,
  getCityList,
};
