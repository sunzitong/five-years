/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/113546
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 门店基本信息模块-参数
 */
export interface ProjectBaseInfoParams {
  /**
   * 门店组织ID
   */
  orgId: number;
}

/**
 * 门店基本信息模块-返回值
 */
export interface ProjectBaseInfoReturn {
  phId: string;
  transactionModel: string;
  transactionModelType: string;
  openRoomNum: number;
  businessArea: number;
  workstationNum: number;
  parkingSpaceNum: number;
  valueAddedPoint: number;
  acquireTime: number;
  term: number;
  projectBeginTime: number;
  projectEndTime: number;
  transactionOpponent: string;
  acquireManner: string;
  cooperationModel: string;
  rentalArea: number;
  landProperty: string;
  buildingProperty: string;
  licensePropertyRight: string;
  investmentLink: string;
}

/**
 * 门店基本信息模块
 * @createBy zhangyao03
 * @updateAt 2021/9/18 上午11:39:14
 * @method GET
 */
export const fetchProjectBaseInfo = (params: ProjectBaseInfoParams) => {
  return http.get<ProjectBaseInfoReturn>(
    `${BASE_URL}/analysis/bigScreen/projectBoard/basicInformation/projectBaseInfo`,
    {
      ...params,
    }
  );
};
