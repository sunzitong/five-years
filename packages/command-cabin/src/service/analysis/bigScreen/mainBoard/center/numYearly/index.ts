/**
 * 本文件自动生成 勿手动更改
 * 如需修改可以在同目录下进行扩展
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 指挥中心-头部数据-年累计块-返回值
 */
export interface NumYearlyReturn {
  getRoomNum: number;
  openRoomNum: number;
  incomeNum: number;
  brandPointNum: number;
  servedPersonNum: number;
  tenantNum: number;
}

/**
 * 指挥中心-头部数据-年累计块
 * @createBy wuyao
 * @updateAt 2021/9/1 下午8:13:57
 * @method GET
 */
export const fetchNumYearly = (params?: Record<string, unknown>) => {
  return http.get<NumYearlyReturn>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/center/numYearly`,
    {
      ...params,
    }
  );
};
