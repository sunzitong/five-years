/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114772
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 财务相关指标-当前投资实现情况-参数
 */
export interface CurrentInfoParams {
  /**
   * 门店分期ID
   */
  phId: unknown;
}

/**
 * 财务相关指标-当前投资实现情况-返回值
 */
export interface CurrentInfoReturn {
  awards: number;
  month: number;
  transactionModel: string;
  list: { [key: string]: string[] }[];
}

/**
 * 财务相关指标-当前投资实现情况
 * @createBy huyanan
 * @updateAt 2021/9/28 14:48:58
 * @method GET
 */
export const fetchCurrentInfo = (params: CurrentInfoParams) => {
  return http.get<CurrentInfoReturn>(
    `${BASE_URL}/analysis/bigScreen/projectBoard/finance/currentInfo`,
    {
      ...params,
    }
  );
};
