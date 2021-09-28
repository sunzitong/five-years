/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114848
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 查询主屏(中心位置)顶部信息-参数
 */
export interface TopStatisticDataParams {
  /**
   * 地区类型
   */
  regionType: unknown;

  /**
   * 地区id
   */
  regionId: number;

  /**
   * 数据范围
   */
  dateScope: unknown;
}

/**
 * 查询主屏(中心位置)顶部信息-返回值
 */
export interface TopStatisticDataReturn {
  totalGetRoomNum: number;
  totalOpenRoomNum: number;
  totalIncomeAll: number;
}

/**
 * 查询主屏(中心位置)顶部信息
 * @createBy zhangyao03
 * @updateAt 2021-9-28 2:37:06 ├F10: PM┤
 * @method GET
 */
export const fetchTopStatisticData = (params: TopStatisticDataParams) => {
  return http.get<TopStatisticDataReturn>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/center/topStatisticData`,
    {
      ...params,
    }
  );
};
