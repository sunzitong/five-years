/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/113942
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 营造盘面-开业延期-参数
 */
export interface ProjectDelayInfoParams {
  /**
   * 见通用枚举接口  GROUP:全国；AREA:大区；CITY:城市
   */
  orgType: unknown;

  /**
   * 大区ID/城市ID，默认传0
   */
  orgId: number;

  /**
   * 见通用枚举接口  YEARLY("年范围"),MONTHLY("月范围"),
   */
  dateScope: unknown;

  /**
   * 统计哪一年的数据，默认是当前年份
   */
  year: number;
}

/**
 * 营造盘面-开业延期-返回值
 */
export interface ProjectDelayInfoReturn {
  delayProjectNum: number;
  delayRoomNum: number;
  delayModelList: DelayModelList[];
}

export interface DelayModelList {
  id: number;
  planOpenDate: null | string;
  cityName: string;
  projectName: string;
  transactionModel: string;
  roomNum: number;
  riskType: string;
  chokePoint: null | string;
}

/**
 * 营造盘面-开业延期
 * @createBy huyanan
 * @updateAt 2021/10/19 15:43:7
 * @method GET
 */
export const fetchProjectDelayInfo = (
  params: ProjectDelayInfoParams,
  options?: Partial<ServiceOptions>
) => {
  return http.get<ProjectDelayInfoReturn>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/construct/projectDelayInfo`,
    { ...params },
    { ...options }
  );
};
