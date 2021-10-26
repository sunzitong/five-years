/**
 * 本文件自动生成,勿手动更改,如需修改可以在同目录下进行扩展
 * 接口文档: http://docs.gyapt.cn/project/712/interface/api/112036
 */

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

/**
 * 枚举-WarningOptStages
 */
export enum WarningOptStages {
  /**
   * 投资
   */
  INVEST = "INVEST",

  /**
   * 运营
   */
  OPERATE = "OPERATE",

  /**
   * 营销
   */
  MARKETING = "MARKETING",
}

/**
 * 枚举-WarningTypes
 */
export enum WarningTypes {
  /**
   * 超期预警
   */
  OVER_PERIOD = "OVER_PERIOD",

  /**
   * 收入预警
   */
  INCOME = "INCOME",

  /**
   * 出租率预警
   */
  RENT_RATIO = "RENT_RATIO",

  /**
   * 人员离岗
   */
  STAFF_LEAVE = "STAFF_LEAVE",

  /**
   * 运营品质
   */
  OPT_QUALITY = "OPT_QUALITY",

  /**
   * 安全风险
   */
  SECURITY = "SECURITY",

  /**
   * 火情风险
   */
  FIRE_SITUATION = "FIRE_SITUATION",
}
