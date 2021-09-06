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
   * group:全国；area:大区；city:城市
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
  openInfo: OpenInfo;
  notOpenInfo: OpenInfo;
}

export interface OpenInfo {
  year: number;
  total: number;
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
 * @updateAt 2021/9/6 下午4:55:53
 * @method GET
 */
export const fetchProjectOpen = (params: ProjectOpenParams) => {
  return http.get<ProjectOpenReturn>(
    `${BASE_URL}/bigScreen/mainBoard/construct/projectOpen`,
    {
      ...params,
    }
  );
};
