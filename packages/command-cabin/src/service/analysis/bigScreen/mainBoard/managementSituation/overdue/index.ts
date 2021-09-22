/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114598
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 经营现状-逾期金额-参数
 */
export interface OverdueParams {
  /**
   * OMS-公用枚举-dataLevels 组织级别
   */
  dataLevel: string;

  /**
   * 国家组织ID/大区组织ID/城市组织ID
   */
  levelId: number;

  /**
   * 最新统计日，默认是当前时间，yyyy-mm-dd
   */
  dateScope?: string;
}

/**
 * 经营现状-逾期金额-返回值
 */
export interface OverdueReturn {
  overdueRatio: number;
  overdueAmount: number;
  overdueAmountGuanyu: number;
  overdueAmountGuanyuFit: number;
  overdueAmountGuanyuPro: number;
  overdueAmountCoworking: number;
  overdueAmountCommerce: number;
  payBackAmount: number;
  dataSource: string;
  updateTime: string;
}

/**
 * 经营现状-逾期金额
 * @createBy huyanan
 * @updateAt 2021/9/22 上午11:03:33
 * @method GET
 */
export const fetchOverdue = (params: OverdueParams) => {
  return http.get<OverdueReturn>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/managementSituation/overdue`,
    {
      ...params,
    }
  );
};
