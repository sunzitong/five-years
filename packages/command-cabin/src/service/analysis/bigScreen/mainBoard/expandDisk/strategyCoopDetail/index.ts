/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114840
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 拓展盘面详情-战略合作表-参数
 */
export interface StrategyCoopDetailParams {
  /**
   * 组织类型，默认全部
   */
  orgType?: unknown;

  /**
   * 组织ID
   */
  orgId?: number;

  /**
   * 类型，1-国企平台，2-总对总，3-资金方
   */
  type?: unknown;

  /**
   * 企业状态，1-已合作，2-洽谈中，3-暂缓，4-流失'，默认全部
   */
  enterpriseState?: unknown;

  /**
   * 第几页，默认1
   */
  pageNum?: number;

  /**
   * 每页数量，默认10
   */
  pageSize?: number;
}

/**
 * 拓展盘面详情-战略合作表-返回值
 */
export interface StrategyCoopDetailReturn {
  total: number;
  pages: number;
  pageSize: number;
  pageNum: number;
  list: List[];
  orders: any[];
  limit: number;
  start: number;
  previousNumber: number;
  nextNumber: number;
  firstNumber: number;
  lastNumber: number;
}

export interface List {
  id: number;
  city: string;
  partnerName: string;
  enterpriseState: string;
  enterpriseStateDesc: string;
  type: number;
  typeDesc: string;
}

/**
 * 拓展盘面详情-战略合作表
 * @createBy baishiqiang
 * @updateAt 2021/9/28 下午2:49:37
 * @method GET
 */
export const fetchStrategyCoopDetail = (params?: StrategyCoopDetailParams) => {
  return http.get<StrategyCoopDetailReturn>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/expandDisk/strategyCoopDetail`,
    {
      ...params,
    }
  );
};
