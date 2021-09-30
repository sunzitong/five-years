/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/114784
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 门店里程碑（不包含成本决算信息）-参数
 */
export interface MilepostParams {
  /**
   * 40306
   */
  orgId: unknown;
}

/**
 * 门店里程碑（不包含成本决算信息）-返回值
 */
export interface MilepostReturn {
  firstInvestmentTime: Date;
  signingTime: Date;
  structureFinishDate: Date;
  mainFinishDate: Date;
  transferImprovementDate: Date;
  isIpd: string;
  improvementStartDate: Date;
  transferServiceDate: Date;
  workDays: number;
  startCheckScore: number;
  fireControlType: string;
  actualOpenDate: Date;
  pointRentRatioToday: number;
}

/**
 * 门店里程碑（不包含成本决算信息）
 * @createBy baishiqiang
 * @updateAt 2021/9/30 16:43:56
 * @method GET
 */
export const fetchMilepost = (params: MilepostParams) => {
  return http.get<MilepostReturn>(
    `${BASE_URL}/analysis/bigScreen/projectBoard/basicInformation/milepost`,
    {
      ...params,
    }
  );
};
