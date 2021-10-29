import http from "./http";
import {
  PROMOTION,
  PROMOTION_CITY_LIST,
  PROMOTION_PROJECT_LIST,
  PROMOTION_RECEIVE,
  ANN_CMS,
} from "./urls";
import store, { env } from "@/store";

/**
 * 查询活动信息
 */
export function getActivityInfo() {
  return http.get(PROMOTION + env.sn, null);
}

/**
 * 获取城市列表
 */
export function getCityList() {
  return http.get(PROMOTION_CITY_LIST, {
    activityNumber: env.sn,
  });
}

/**
 * 获取门店列表
 */
export function getProjectList(cityName: string) {
  return http.post(PROMOTION_PROJECT_LIST, {
    activityNumber: env.sn,
    // searchKey: "",
    city: cityName,
  });
}

/**
 * 领取奖品
 */
export function receive(token: string) {
  const prizes: Array<Dictionary<string | number>> =
    store.act.data?.prizes || [];
  const prizeIds = prizes.map((item) => {
    return item.id;
  });
  return http.post(PROMOTION_RECEIVE, {
    activityNumber: env.sn,
    prizeIds,
    channel: "app", //渠道
    token, // 渠道是app时，传token；否则传phone和verificationCode
  });
}

/**
 * 获取活动列表
 */
export function getAnnCMS() {
  return http.get(ANN_CMS, {});
}

export default {
  getActivityInfo,
  getCityList,
  getProjectList,
  receive,
  getAnnCMS,
};
