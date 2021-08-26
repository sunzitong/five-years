import http from "./http";
import { PROMOTION, PROMOTION_CITY_LIST, MY_PRIZE, USER_ADDR, MY_HELPERS, START_USER, DETAIL, CUR_PRIZE, LOTTERY_JOIN, LOTTERY_SHARE } from "./urls";
import { env } from "@/store";

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
 * 获取我的奖品
 */
export function getMyPrize() {
    return http.post(MY_PRIZE, {

    });
}

/**
 * 提交收货地址
 */
export function submitAddr(params: Record<string, any>) {
    return http.post(USER_ADDR, {
        ...params
    });
}

/**
 * 获取好友列表
 */
export function getMyHelpers(params: Record<string, any>) {
    return http.get(MY_HELPERS, {
        ...params
    });
}

/**
 * 获取受邀好友
 */
export function getStarUser(params: Record<string, any>) {
    return http.get(START_USER, {
        ...params
    });
}

/**
 * 为好友助力
 */
export function lotteryJoin(params: Record<string, any>) {
    return http.post(LOTTERY_JOIN, {
        ...params
    });
}

/**
 * 增加分享次数
 */
export function lotteryShare() {
    return http.post(LOTTERY_SHARE, {
        
    });
}

/**
 * 获取活动详情
 */
export function getDetail(params: Record<string, any>) {
    return http.get(DETAIL, {
        ...params
    });
}

/**
 * 获取抽中奖品
 */
export function getCurPrize(params: Record<string, any>) {
    return http.post(CUR_PRIZE, {
        ...params
    });
}


export default {
    getActivityInfo,
    getCityList,
    getMyPrize,
    submitAddr,
    getMyHelpers,
    getStarUser,
    getDetail,
    getCurPrize,
    lotteryJoin,
    lotteryShare,
};
