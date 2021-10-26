/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114824
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 指挥中心-冠寓大事记-参数
 */
export interface EventsParams {
  /**
   * 组织级别：见公用枚举
   */
  orgType: unknown;

  /**
   * 组织id
   */
  orgId: number;
}

/**
 * 指挥中心-冠寓大事记-返回值
 */
export interface EventsItemReturn {
  year: number;
  newRoomNum: number;
  newOpenNum: number;
  profit: number;
  npiProfit: number;
  income: number;
  incomeRate: number;
  rentRate: number;
}

/**
 * 指挥中心-冠寓大事记
 * @createBy huyanan
 * @updateAt 2021/10/21 16:52:38
 * @method GET
 */
export const fetchEvents = (
  params: EventsParams,
  options?: Partial<ServiceOptions>
) => {
  return http.get<EventsItemReturn[]>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/center/events`,
    { ...params },
    { ...options }
  );
};
