import http from "./http";
import { demoTest, receiveMonthPayNotComeUp } from "./urls";
import { env } from "@/store";
import { IdField } from "@guanyu/shared";

/**
 * 测试数据
 */
export type Demo = {
  name: string;
  id: IdField;
  value: number;
};

/**
 * 测试
 */
export function getDemo() {
  return http.get<Demo[]>(demoTest, {
    activityNumber: env.NODE_ENV,
  });
}

// export type receiveMonthPayNotComeUpType = {
//   code: number;
//   msg: string;
// };

/**
 * 会员领取月付不上浮接口
 */

export function requestReceiveMonthPayNotComeUp(params: any) {
  return http.post(receiveMonthPayNotComeUp, {
    ...params,
  });
}

export default {
  getDemo,
  requestReceiveMonthPayNotComeUp,
};
