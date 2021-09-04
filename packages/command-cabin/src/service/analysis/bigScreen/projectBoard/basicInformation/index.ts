/**
 * 本文件自动生成 勿手动更改
 * 如需修改可以在同目录下进行扩展
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 门店基本信息模块-参数
 */
export interface BasicInformationParams {
  /**
   * 年份
   */
  year?: number;
}

/**
 * 门店基本信息模块-返回值
 */
export interface BasicInformationReturn {
  transactionModel: string;
  openRoomNum: number;
  businessArea: number;
  workstationNum: number;
  parkingSpaceNum: number;
  valueAddedPoint: number;
  acquireTime: number;
  transactionOpponent: string;
  acquireManner: string;
  cooperationModel: string;
  rentalArea: number;
  landProperty: string;
  buildingProperty: string;
  licensePropertyRight: string;
}

/**
 * 门店基本信息模块
 * @createBy zhangyao03
 * @updateAt 2021/9/1 下午5:09:41
 * @method GET
 */
export const fetchBasicInformation = (params?: BasicInformationParams) => {
  return http.get<BasicInformationReturn>(
    `${BASE_URL}/analysis/bigScreen/projectBoard/basicInformation`,
    {
      ...params,
    }
  );
};
