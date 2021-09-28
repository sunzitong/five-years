/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/112036
 */

import http from "@/service/http";
const BASE_URL = process.env.VUE_APP_BASE_API;

/**
 * OMS-公用枚举-返回值
 */
export interface PublicEnumReturn {
  publicSentimentTypes: CrisisLabel[];
  crisisLabels: CrisisLabel[];
  dataLevels: CrisisLabel[];
  dateScopes: CrisisLabel[];
  riskTypes: CrisisLabel[];
}

export interface CrisisLabel {
  name: string;
  desc: string;
}

/**
 * OMS-公用枚举
 * @createBy wuyao
 * @updateAt 2021/9/22 PM 2:34:27
 * @method GET
 */
export const fetchPublicEnum = (params?: Record<string, unknown>) => {
  return http.get<PublicEnumReturn>(
    `${BASE_URL}/analysis/commandCabin/publicEnum`,
    {
      ...params,
    }
  );
};

/**
 * 枚举-PublicSentimentTypes
 */
export enum PublicSentimentTypes {
  /**
   * 租户身亡
   */
  CUSTOMER_DEATH = "CUSTOMER_DEATH",

  /**
   * 人身伤害
   */
  PERSONAL_INJURY = "PERSONAL_INJURY",

  /**
   * 疫情相关
   */
  EPIDEMIC_RELATED = "EPIDEMIC_RELATED",

  /**
   * 硬件相关
   */
  HARDWARE_RELATED = "HARDWARE_RELATED",

  /**
   * 媒体舆情
   */
  MEDIA = "MEDIA",

  /**
   * 治安事件
   */
  PUBLIC_SECURITY = "PUBLIC_SECURITY",

  /**
   * 其他
   */
  OTHER = "OTHER",
}

/**
 * 枚举-CrisisLabels
 */
export enum CrisisLabels {
  /**
   * 红色
   */
  RED = "RED",

  /**
   * 橙色
   */
  YELLOW = "YELLOW",

  /**
   * 绿色
   */
  GREEN = "GREEN",
}

/**
 * 枚举-DataLevels
 */
export enum DataLevels {
  /**
   * 全国
   */
  GROUP = "GROUP",

  /**
   * 大区
   */
  AREA = "AREA",

  /**
   * 城市
   */
  CITY = "CITY",
}

/**
 * 枚举-DateScopes
 */
export enum DateScopes {
  /**
   * 年范围
   */
  YEARLY = "YEARLY",

  /**
   * 月范围
   */
  MONTHLY = "MONTHLY",

  /**
   * 日范围
   */
  DAILY = "DAILY",
}

/**
 * 枚举-RiskTypes
 */
export enum RiskTypes {
  /**
   * 延期风险
   */
  Delay = "Delay",

  /**
   * 跨年风险
   */
  CrossYear = "CrossYear",

  /**
   * 无风险
   */
  NoRisk = "NoRisk",
}
