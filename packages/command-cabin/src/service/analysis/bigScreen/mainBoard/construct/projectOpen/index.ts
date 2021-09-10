/**
 * 本文件自动生成 勿手动更改
 * 如需修改可以在同目录下进行扩展
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 营造盘面-项目开业-参数
 */
export interface ProjectOpenParams {
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
  transactionModel: TransactionModel;
  roomNum: number;
  ratio: number;
}

export enum TransactionModel {
  中资产 = "中资产",
  轻资产 = "轻资产",
  重资产 = "重资产",
}

export interface TotalOpenList {
  year: number;
  total: number;
  list: TotalOpenListList[];
}

export interface TotalOpenListList {
  transactionModel: TransactionModel;
  roomNum: number;
}

/**
 * 营造盘面-项目开业
 * @createBy huyanan
 * @updateAt 2021/9/10 下午2:40:34
 * @method GET
 */
export const fetchProjectOpen = (params: ProjectOpenParams) => {
  return http.get<ProjectOpenReturn>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/construct/projectOpen`,
    {
      ...params,
    }
  );
};
