/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114824
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 指挥中心-冠寓大事记-参数
 */
export interface EventsParams {
  /**
   * 组织级别：见公用枚举
   */
  dataLevel: string;

  /**
   * 组织id
   */
  levelId: number;
}

/**
 * 指挥中心-冠寓大事记-返回值
 */
export interface EventsItemReturn {
  year: number;
  newRoomNum: number;
  newOpenNum: number;
  profit: number;
  npiProfitHeavy: number;
  npiProfitLight: number;
  income: number;
  incomeRate: number;
  rentRate: number;
}

/**
 * 指挥中心-冠寓大事记
 * @createBy huyanan
 * @updateAt 2021/9/28 上午11:39:47
 * @method GET
 */
export const fetchEvents = (params: EventsParams) => {
  return http.get<EventsItemReturn[]>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/center/events`,
    {
      ...params,
    }
  );
};
