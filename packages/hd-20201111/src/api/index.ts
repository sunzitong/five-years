import http from "./http";
import {
  PROMOTION,
  PROMOTION_CITY_LIST,
  PROMOTION_ACTIVITY_LIST,
  PROMOTION_ACTIVITY_CITY,
  PROMOTION_ACTIVITY_ROOM,
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
 * 获取活动列表
 */
export function getActivityList(activityNumber: ID) {
  return http.get<string[]>(PROMOTION_ACTIVITY_LIST, {
    activityNumber,
  });
}

/**
 * 获取活动城市列表
 */
export function getActivityCity(activityNumber: ID) {
  return http.get<string[]>(PROMOTION_ACTIVITY_CITY, {
    activityNumber,
  });
}

/**
 * 获取活动门店列表
 */
export function getActivityRoom(params: Record<string, any>) {
  return http.post(PROMOTION_ACTIVITY_ROOM, {
    ...params,
  });
}

export default {
  getActivityInfo,
  getCityList,
  getActivityList,
  getActivityCity,
  getActivityRoom,
};
