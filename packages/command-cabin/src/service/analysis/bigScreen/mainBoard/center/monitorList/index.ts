/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114778
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 指挥中心-现场监控列表-参数
 */
export interface MonitorListParams {
  /**
   * 组织级别：见公用枚举
   */
  dataLevel: unknown;

  /**
   * 组织id
   */
  levelId: number;

  /**
   * 时间范围：见公用枚举
   */
  dateScope: unknown;
}

/**
 * 指挥中心-现场监控列表-返回值
 */
export interface MonitorListItemReturn {
  projectId: number;
  projectName: string;
  pictureUrl: string;
  problem: string;
  optStatusDesc: string;
}

/**
 * 指挥中心-现场监控列表
 * @createBy wuyao
 * @updateAt 2021/9/28 下午6:25:42
 * @method GET
 */
export const fetchMonitorList = (params: MonitorListParams) => {
  return http.get<MonitorListItemReturn[]>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/center/monitorList`,
    {
      ...params,
    }
  );
};
