/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/113942
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 营造盘面-开业延期-参数
 */
export interface ProjectDelayInfoParams {
  /**
   * GROUP:全国；AREA:大区；CITY:城市
   */
  regionType: unknown;

  /**
   * 大区ID/城市ID，默认是空
   */
  regionId?: number;

  /**
   * 统计哪一年的数据，默认是当前年份
   */
  dataTime?: number;
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
  transactionModel: TransactionModel;
  roomNum: number;
  riskType: RiskType;
  chokePoint: null | string;
}

export enum RiskType {
  延期风险 = "延期风险",
  跨年风险 = "跨年风险",
}

export enum TransactionModel {
  中资产 = "中资产",
  轻资产 = "轻资产",
  重资产 = "重资产",
}

/**
 * 营造盘面-开业延期
 * @createBy huyanan
 * @updateAt 2021/9/13 AM 10:31:31
 * @method GET
 */
export const fetchProjectDelayInfo = (params: ProjectDelayInfoParams) => {
  return http.get<ProjectDelayInfoReturn>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/construct/projectDelayInfo`,
    {
      ...params,
    }
  );
};
