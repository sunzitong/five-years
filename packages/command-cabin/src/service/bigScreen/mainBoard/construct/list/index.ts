/**
 * 本文件自动生成 勿手动更改
 * 如需修改可以在同目录下进行扩展
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 营造盘面详情-参数
 */
export interface ListParams {
  /**
   * GROUP:全国；AREA:大区；CITY:城市
   */
  regionType: string;

  /**
   * 大区ID/城市ID，默认是空
   */
  regionId?: number;

  /**
   * 统计哪一年的数据，默认是当前年份
   */
  dataTime?: number;

  /**
   * 项目阶段  Open("已开业"), NotOpen("未开业");
   */
  stage?: string;

  /**
   * 风险类型 Delay("延期风险"), CrossYear("跨年风险"), NoRisk("无风险")
   */
  riskType?: string;
}

/**
 * 营造盘面详情-返回值
 */
export interface ListReturn {
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
  projectNo: string;
  name: string;
  cityDepartmentName: string;
  year: number;
  stage: string;
  transactionModel: string;
  roomNum: number;
  planEnterDate: null | string;
  actualEnterDate: null | string;
  structureFinishDate: null | string;
  mainFinishDate: null | string;
  transferImprovementDate: null | string;
  improvementStartDate: null | string;
  isIpd: null | string;
  transferServiceDate: null | string;
  workDays: number | null;
  planOpenDate: null | string;
  actualOpenDate: null | string;
  startCheckScore: number | null;
  midCheckScore: number | null;
  qualityScore: number | null;
  riskType: string;
  riskReportDate: string;
  chokePoint: null | string;
  fireControlType: null | string;
  buildingDesignPerson: null | string;
  buildingDesignTel: null | string;
  buildingDesignCompany: null | string;
  improvementDesignPerson: null | string;
  improvementDesignTel: null | string;
  improvementDesignCompany: null | string;
  landscapeDesignPerson: null | string;
  landscapeDesignTel: null | string;
  landscapeDesignCompany: null | string;
  buildingConstructionPerson: null | string;
  buildingConstructionTel: null | string;
  buildingConstructionCompany: null | string;
  improvementConstructionPerson: null | string;
  improvementConstructionTel: null | string;
  improvementConstructionCompany: null | string;
  landscapeConstructionPerson: null | string;
  landscapeConstructionTel: null | string;
  landscapeConstructionCompany: null | string;
}

/**
 * 营造盘面详情
 * @createBy huyanan
 * @updateAt 2021/9/6 下午5:32:52
 * @method GET
 */
export const fetchList = (params: ListParams) => {
  return http.get<ListReturn>(
    `${BASE_URL}/bigScreen/mainBoard/construct/list`,
    {
      ...params,
    }
  );
};
