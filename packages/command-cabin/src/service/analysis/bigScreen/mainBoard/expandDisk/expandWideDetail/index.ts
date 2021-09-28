/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114836
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 拓展盘面详情-拓宽台账宽表-参数
 */
export interface ExpandWideDetailParams {
  /**
   * 大区/城市组织ID，默认全部
   */
  orgType?: string;

  /**
   * 组织ID，默认全部
   */
  orgId?: number;

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
  gradeList?: string;

  /**
   * 过会超期预警，是-Y/否-N，默认全部
   */
  overdueWarning?: string;

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
  create_time: string;
  grade: string;
  gradeDesc: string;
  existingStatus: string;
  cityCode: string;
  city: string;
  project_name: string;
  asset_type: string;
  cooperationMode: string;
  expander_login_name: string;
  number_of_rooms: number;
  first_investment_time: string;
  signing_time: string;
  oa_regional_development_director: string;
  this_week_latest_progress: string;
  project_reason_action: string;
  suspend_drain: string;
  overdue_warning: string;
  overdue_days: number;
}

/**
 * 拓展盘面详情-拓宽台账宽表
 * @createBy baishiqiang
 * @updateAt 2021/9/28 下午2:44:00
 * @method GET
 */
export const fetchExpandWideDetail = (params?: ExpandWideDetailParams) => {
  return http.get<ExpandWideDetailReturn>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/expandDisk/expandWideDetail`,
    {
      ...params,
    }
  );
};
