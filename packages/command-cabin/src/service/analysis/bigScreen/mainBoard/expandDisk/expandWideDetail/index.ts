/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114836
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 拓展盘面详情-拓宽台账宽表-参数
 */
export interface ExpandWideDetailParams {
  /**
   * GROUP:全国；AREA:大区；CITY:城市；
   */
  orgType: unknown;

  /**
   * 组织ID
   */
  orgId: number;

  /**
   * 首次投委开始时间，格式yyyy，默认当前时间
   */
  firstInvestStartTime?: number;

  /**
   * 首次投委结束时间，格式yyyy，默认当前时间
   */
  firstInvestEndTime?: number;

  /**
   * 等级，默认全部（A、B、C、D、E、F）
   */
  gradeList?: unknown;

  /**
   * 过会超期预警，是/否，默认全部
   */
  overdueWarning?: unknown;

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
 * 拓展盘面详情-拓宽台账宽表-返回值
 */
export interface ExpandWideDetailReturn {
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
  projectCode: string;
  createTime: string;
  grade: string;
  gradeDesc: string;
  existingStatus: string;
  cityCode: string;
  city: string;
  projectName: string;
  assetType: string;
  cooperationMode: string;
  expanderLoginName: string;
  numberOfRooms: number;
  firstInvestmentTime: string;
  signingTime: string;
  oaRegionalDevelopmentDirector: string;
  thisWeekLatestProgress: string;
  projectReasonAction: string;
  suspendDrain: string;
  overdueWarning: string;
  overdueDays: number;
}

/**
 * 拓展盘面详情-拓宽台账宽表
 * @createBy baishiqiang
 * @updateAt 2021/10/12 14:47:37
 * @method GET
 */
export const fetchExpandWideDetail = (
  params: ExpandWideDetailParams,
  options?: Partial<ServiceOptions>
) => {
  return http.get<ExpandWideDetailReturn>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/expandDisk/expandWideDetail`,
    { ...params },
    { ...options }
  );
};
