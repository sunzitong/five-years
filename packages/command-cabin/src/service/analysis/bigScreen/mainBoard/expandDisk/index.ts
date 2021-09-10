/**
 * 本文件自动生成 勿手动更改
 * 如需修改可以在同目录下进行扩展
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * 中央奖补、投后攻坚模块-参数
 */
export interface ExpandDiskParams {
  /**
   * 年份
   */
  year?: number;
}

/**
 * 中央奖补、投后攻坚模块-返回值
 */
export interface ExpandDiskReturn {
  yearSubsidiesCollected: number;
  yearSubsidiesCompletionRate: number;
  yearNetIncomeCollected: number;
  allNetIncomeCollected: number;
  yearNetIncomeCompletionRate: number;
  allNetIncomeCompletionRate: number;
}

/**
 * 中央奖补、投后攻坚模块
 * @createBy zhangyao03
 * @updateAt 2021/9/10 下午2:40:15
 * @method GET
 */
export const fetchExpandDisk = (params?: ExpandDiskParams) => {
  return http.get<ExpandDiskReturn>(
    `${BASE_URL}/analysis/bigScreen/mainBoard/expandDisk`,
    {
      ...params,
    }
  );
};
