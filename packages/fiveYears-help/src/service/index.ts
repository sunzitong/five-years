import http from "./http";
import {
  getNumberApi,
  getRankingsApi,
  getHelpMyApi,
  getHelpStartApi,
  getHelpJoinApi,
  getMyHelpersApi,
  getStartUserApi,
} from "./urls";

/**
 * 获取活动编号
 */
export function getNumber(params: any) {
  return http.get(getNumberApi, {
    ...params,
  });
}

/**
 * 获取活动编号
 */
export function getRankings(params: any) {
  return http.get(getRankingsApi, {
    ...params,
  });
}

/**
 * 获取我的助力信息
 */
export function getHelpMy(params: any) {
  return http.post(getHelpMyApi, {
    ...params,
  });
}

/**
 * 发起助力
 */
export function helpStart(params: any) {
  return http.post(getHelpStartApi, {
    ...params,
  });
}

/**
 * 为好友助力
 */
export function helpJoin(params: any) {
  return http.post(getHelpJoinApi, {
    ...params,
  });
}

/**
 * 为好友助力
 */
export function getMyHelpers(params: any) {
  return http.post(getMyHelpersApi, {
    ...params,
  });
}

/**
 * 发启人信息
 */
 export function getStartUser(params: any) {
  return http.post(getStartUserApi, {
    ...params,
  });
}

export default {
  getNumber,
  getRankings,
  getHelpMy,
  helpStart,
  helpJoin,
  getMyHelpers,
  getStartUser,
};
