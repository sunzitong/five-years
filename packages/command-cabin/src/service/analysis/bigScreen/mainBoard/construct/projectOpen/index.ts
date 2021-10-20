/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/113944
 */

import http, { ServiceOptions } from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 营造盘面-项目开业-参数
 */
export interface ProjectOpenParams {
  /**
   * 见通用枚举接口  GROUP:全国；AREA:大区；CITY:城市
   */
  orgType: unknown;

  /**
   * 大区ID/城市ID，默认是0
   */
  orgId: number;

  /**
   * 见通用枚举接口  YEARLY("年范围"),MONTHLY("月范围"),
   */
  dateScope: unknown;

  /**
   * 年份
   */
  year: number;
}

/**
 * 营造盘面-项目开业-返回值
 */
export interface ProjectOpenReturn {
  totalOpenNum: number;
  totalOpenList: TotalOpenList[];
  openTargetNum: number;
  notOpenNotGetNum: number;
  notOpenNotGetRatio: number;
  openInfo: OpenInfo;
  notOpenInfo: OpenInfo;
}

export interface OpenInfo {
  total: number;
  ratio: number;
  list: NotOpenInfoList[];
}

export interface NotOpenInfoList {
  transactionModel: string;
  roomNum: number;
  ratio: number;
}

export interface TotalOpenList {
  year: number;
  total: number;
  list: TotalOpenListList[];
}

export interface TotalOpenListList {
  transactionModel: string;
  roomNum: number;
}

/**
 * 营造盘面-项目开业
 * @createBy huyanan
 * @updateAt 2021/10/19 15:43:27
 * @method GET
 */
export const fetchProjectOpen = (
  params: ProjectOpenParams,
  options?: Partial<ServiceOptions>
) => {
  return http.get<ProjectOpenReturn>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/construct/projectOpen`,
    { ...params },
    { ...options }
  );
};
