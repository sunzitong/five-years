import http from "./http";
import {
  yearlyKpSort,
  monthlyIndexNumSort,
  optAndSaleIndexNum,
  publicEnum,
  rentRatio,
  renewRatio,
  renewRatioReason,
  defCheckoutRatio,
  defCheckoutRatioReason,
  rentTerm,
  incomeReach,
  incomeReachReason,
  incomeReachDaily,
  incomeReachDetails,
  modifyPrice,
  cusStore,
  modifyPriceLayouts,
  optCost,
  marketingCost,
  calcSolution,
  equipmentOffline,
  equipmentEnergy,
} from "./urls";
import { IdField, Nullable } from "@guanyu/shared";

/**
 * 指标数据
 */
export type AssessData = {
  grade: number; // 分数
  list: {
    indexName: string; // 指标名称
    indexValue: number; // 指标值（%）
    sigleGrade: number; // 单项得分
    weight: number; // 权重
    finalGrade: number; // 最终得分
  }[];
};

export type optStageEnum = "PREPARE" | "CLIMBING" | "STEADY";

export type assetTypeEnum =
  | "HEAVY"
  | "MEDIUM"
  | "LIGHT_ENTRUST_OPT"
  | "LIGHT_ENTRUST_MANAGE";

/**
 * 排行列表
 */
export type RankItemProps = Record<
  "projectId" | "projectName" | "grade" | "sort",
  any
>;

export type Page<T> = {
  total: number;
  list: T[];
  pageNum: number;
  pageSize: number;
  size: number;
  startRow: number;
  endRow: number;
  pages: number;
  prePage: number;
  nextPage: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  navigatePages: number;
  navigateFirstPage: number;
  navigateLastPage: number;
  firstPage: number;
  lastPage: number;
};

/**
 * 综合经营指数
 */
export type OptAndSaleIndexNum = {
  projectId: IdField; // 门店id
  optStage: Nullable<optStageEnum>; // 运营阶段
  optStageDesc: string; // 运营阶段描述
  optIndexNum: number; // 综合经营指数（分）
  prepareReachRatio: number; // 筹开达成率（%）
  creditIndexNum: number; // 信用指数（%）
  channelEffectNum: number; // 渠道效能值（%）
  optHealthyNum: number; // 运营健康度（%）
  startDataDate: string; //数据日期-开始
  endDataDate: string; //数据日期-结束
  updateDate: string; // 更新于
  // 目标达成
  reachTarget: {
    rentTargetRatio: number; // 目标出租率（%）
    prepareReachRatio: number; // 筹开达成率（%）
    targetLeftDays: number; // 目标倒计时（天）
    prepareReachPeriod: string; // 周期
    offsetNum: number; // 偏差百分比（%）
    tip: string; // 提示
    // 时点出租率趋势
    rentRatioList: {
      dataDate: string; // 时间
      ratio: number; // 时点出租率（%）
      target: number; // 时点目标（%）
      offsetNum: number; // 偏差（%）
    }[];
  };
  /**
   * 筹开达成率
   */
  prepareReachRatioList: AssessData;
  /**
   * 渠道效能
   */
  channelEffectList: AssessData;
  /**
   * 运营健康度
   */
  coptHealthyList: AssessData;
  /**
   * 信用指数
   */
  creditIndexList: AssessData;
};
/**
 * 排名
 */
export type SortItem = {
  projectId: IdField; // 门店id
  projectName: string; // 门店名称
  grade: number; // 分值
  sort: number; // 排名
};

/**
 * 月度指数排名
 */
export function queryMonthlyIndexNumSort(params: {
  month: string;
  indexCode: string;
  range: string;
  projectId: IdField;
  optStage: optStageEnum[];
  assetType: assetTypeEnum[];
}) {
  return http.post<SortItem[]>(monthlyIndexNumSort, {
    ...params,
  });
}
/**
 * 年度KP达成排名
 */
export function queryYearlyKpSort(params: {
  year: string;
  range: string;
  assetType: assetTypeEnum[];
  projectId: string;
}) {
  return http.post<SortItem[]>(yearlyKpSort, {
    ...params,
  });
}
/**
 * 综合经营指数
 */
export function queryOptAndSaleIndexNum(params: {
  dataDate: string;
  projectId: IdField;
}) {
  return http.post<OptAndSaleIndexNum>(optAndSaleIndexNum, {
    ...params,
  });
}

export type PublicEnum = {
  /**
   * 指标
   */
  assessCodeList: Record<"name" | "text", string>[];
  /**
   * 门店周期
   */
  assetTypeList: Record<"name" | "text", string>[];
  /**
   * 指标类型
   */
  configStatusList: Record<"name" | "text", string>[];
  /**
   * 板块内指标
   */
  indexCodeList: Record<"name" | "text", string>[];
  /**
   * 资产类型
   */
  indexTypeList: Record<"name" | "text", string>[];
  /**
   * 门店周期
   */
  optStageList: Record<"name" | "text", string>[];
  /**
   * 范围
   */
  rangeCodeList: Record<"name" | "text", string>[];
  /**
   * 不续租原因时间类型
   */
  checkoutDataTypeList: Record<"name" | "text", string>[];
  /**
   * 业态类型
   */
  formatTypeList: Record<"name" | "text", string>[];
};
/**
 * 综合经营指数
 */
export function queryPublicEnum() {
  return http.post<PublicEnum>(publicEnum, null, { showLoading: false });
}

/**************** v2 ********************/

export type RentRatio = {
  // 头部预警颜色
  warnLight: string;
  // 头部预警提示
  warnLightNote: string;
  // 时点出租率
  rentRatio: number;
  // 时点在租间数
  rentNum: number;
  // 月累平均出租率
  rentRatioMonthly: number;
  // 月累在租间数
  rentNumMonthly: number;
  // 出租率趋势
  trend: {
    // 时间
    dataDate: string;
    // 平均出租率
    avg: number;
    // 月末时点出租率
    monthEnd: number;
    // 出租率参考值
    consult: number;
  }[];
  // 原因分析
  reason: {
    // 原因
    note: string;
    // 原因说明
    noteRemark: string;
    // 匹配度
    matchDegree: string;
    // 匹配度说明
    matchDegreeDesc: string;
  }[];
  // 可选提升方案
  solve: {
    // 原因
    note: string;
    // 原因说明
    noteRemark?: string;
    // 匹配度
    matchDegree: string;
    // 匹配度说明
    matchDegreeDesc: string;
  }[];
};

/**
 * 出租率分析
 */
export function queryRentRatio(params: { projectId: IdField }) {
  return http.post<RentRatio>(rentRatio, {
    ...params,
  });
}

export type RenewRatio = {
  warnLight: string; // 头部预警颜色
  warnLightNote: string; // 头部预警提示
  renewRatioMonthly: number; // 月累平均续租率
  expireNumMonthly: number; // 月累到期间数
  expireNumThirtyDays: number; // 30天内到期间数
  // 续租率趋势
  renewRatioTrend: {
    dataDate: string; // 时间
    ratio: number; // 续租率
  }[];
  // 30天内到期间数情况
  expireTrend: {
    dataDate: string; // 时间
    num: number; // 到期间数
  }[];
  // 不续租原因分布
  noRenewReasonTrend: {
    reason: string; // 原因项
    ratio: number; // 本门店占比
    groupRatio: number; // 全国占比
  }[];
  // 原因分析
  reason: {
    note: string; // 原因
    noteRemark: string; // 原因说明
    matchDegree: string; // 匹配度
    matchDegreeDesc: string; // 匹配度说明
  }[];
  // 可选提升方案
  solve: {
    note: string; // 原因
    matchDegree: string; // 匹配度
    matchDegreeDesc: string; // 匹配度说明
  }[];
};

/**
 * 续租率分析
 */
export function queryRenewRatio(params: { projectId: IdField }) {
  return http.post<RenewRatio>(renewRatio, {
    ...params,
  });
}

export type RenewRatioReason = {
  reason: string; // 原因项
  ratio: number; // 本门店占比
  groupRatio: number; // 全国占比
};

/**
 * 续租率分析-不续租原因分析
 */
export function queryRenewRatioReason(params: {
  projectId: IdField;
  dateType: string;
}) {
  return http.post<RenewRatioReason[]>(renewRatioReason, {
    ...params,
  });
}

export type DefCheckoutRatio = {
  // 头部预警颜色
  warnLight: string;
  // 头部预警提示
  warnLightNote: string;
  // 月累平均违退率
  defCheckoutRatioMonthly: number;
  // 当月违退间数
  defCheckoutNumMonthly: number;
  // 月累平均在租间数
  rentNumMonthly: number;
  // 近12个月违退率趋势
  defCheckoutTrend: {
    // 时间
    dataDate: string;
    // 续租率
    ratio: number;
  }[];
  // 违退原因分布
  noRenewReasonTrend: {
    // 原因项
    reason: string;
    // 本门店占比
    ratio: number;
    // 全国占比
    groupRatio: number;
  }[];
  // 原因分析
  reason: {
    // 原因
    note: string;
    // 原因说明
    noteRemark: string;
    // 匹配度
    matchDegree: string;
    // 匹配度说明
    matchDegreeDesc: string;
  }[];
  // 可选提升方案
  solve: {
    // 原因
    note: string;
    // 匹配度
    matchDegree: string;
    // 匹配度说明
    matchDegreeDesc: string;
  }[];
};

/**
 * 违退率分析
 */
export function queryDefCheckoutRatio(params: { projectId: IdField }) {
  return http.post<DefCheckoutRatio>(defCheckoutRatio, {
    ...params,
  });
}

export type DefCheckoutRatioReason = {
  reason: string; // 原因项
  ratio: number; // 本门店占比
  groupRatio: number; // 全国占比
};

/**
 * 违退率分析-原因分析
 */
export function queryDefCheckoutRatioReason(params: {
  projectId: IdField;
  dataType: string;
}) {
  return http.post<DefCheckoutRatioReason[]>(defCheckoutRatioReason, {
    ...params,
  });
}

export type RentTerm = {
  // 头部预警颜色
  warnLight: string;
  // 头部预警提示
  warnLightNote: string;
  // 在租间数
  rentNum: number;
  // 本门店在租租期
  rentTermNum: number;
  // 地区
  areaName: string;
  // 所属地区在租租期
  areaRentTermNum: number;
  // 全国在租租期
  groupRentTermNum: number;
  // 本月到期占比
  expireRatioThisMonth: number;
  // 下月到期占比
  expireRatioNextMonth: number;
  // 在租房间租期分布
  trend: {
    // 租期名称
    termName: string;
    // 间数
    num: number;
    // 占比（%）
    ratio: number;
  }[];
  // 未来12个月租期落点与到期压力
  expireTrend: {
    // 时间
    dataDate: string;
    // 建议到期占比
    adviseRatio: number;
    // 到期压力线
    pressureRatio: number;
    //到期数
    factNum: number;
    //到期占比
    factRatio: number;
  }[];
  // 租期落点建议方案
  scheme: {
    // 到期月份
    dataDate: string;
    // 签约租期
    rentTerm: 1;
    // 建议到期间数
    adviseNum: number;
    // 实际到期间数
    realNum: number;
    // 建议文本
    adviseNote: string;
  }[];
};

/**
 * 租期分布分析
 */
export function queryRentTerm(params: { projectId: IdField }) {
  return http.post<RentTerm>(rentTerm, {
    ...params,
  });
}

export type IncomeReach = {
  // 头部预警颜色
  warnLight: string;
  // 头部预警提示
  warnLightNote: string;
  // 实际收入
  income: number;
  // 平均单房价格
  avgPerRoomPrice: number;
  // 全业态收入达成
  incomeReachRatio: number;
  // 收入达成详情
  incomeReachDetails: {
    // 业态
    format: string;
    // 实际收入
    income: number;
    // 预算收入
    target: number;
    // 达成度
    reachRatio: number;
  }[];
  // 近12个月收入达成趋势
  incomeReachTrend: {
    // 时间
    dataDate: string;
    // 月收入
    income: number;
    // 月收入预算
    target: number;
    // 收入达成度
    reachRatio: number;
    // 收入增长月环比
    riseYoY: number;
  }[];
  // 近12个月平均单房价格趋势
  avgPerRoomPriceTrend: {
    // 时间
    dataDate: string;
    // 月收入
    income: number;
    // 月收入预算
    target: number;
    // 收入达成度
    reachRatio: number;
    // 收入增长月环比
    riseYoY: number;
  }[];
  // 收入/预算日趋势
  incomeDailyTrend: {
    // 收入总和
    incomeTotal: number;
    // 预算总和
    targetTotal: number;
    list: {
      // 时间
      dataDate: string;
      // 收入
      income: number;
      // 收入预算
      target: number;
    }[];
  };
  // 原因分析
  reason: {
    // 原因
    note: string;
    // 原因说明
    noteRemark: string;
    // 匹配度
    matchDegree: string;
    // 匹配度说明
    matchDegreeDesc: string;
  }[];
  // 可选提升方案
  solve: {
    // 原因说明链接
    url?: string;
    // 原因
    note: string;
    // 原因说明
    noteRemark?: string;
    // 匹配度
    matchDegree: string;
    // 匹配度说明
    matchDegreeDesc: string;
  }[];
};

/**
 * 收入达成分析
 */
export function queryIncomeReach(params: { projectId: IdField }) {
  return http.post<IncomeReach>(incomeReach, {
    ...params,
  });
}

/**
 * 收入达成分析-原因分析
 */
export function queryIncomeReachReason(params: {
  projectId: IdField;
  formatType: string;
}) {
  return http.post<Pick<IncomeReach, "reason" | "solve">>(incomeReachReason, {
    ...params,
  });
}

export type IncomeReachDaily = {
  incomeTotal: number; // 收入总和
  targetTotal: number; // 预算总和
  list: {
    dataDate: string; // 时间
    income: number; // 收入
    target: number; // 收入预算
  }[];
};

/**
 * 收入达成分析-收入/预算日趋势
 */
export function queryIncomeReachDaily(params: {
  projectId: IdField;
  dataDateFrom: string;
  dataDateTo: string;
}) {
  return http.post<IncomeReachDaily>(incomeReachDaily, {
    ...params,
  });
}

export type IncomeReachDetails = {
  format: string; // 业态
  income: number; // 实际收入
  target: number; // 预算收入
  reachRatio: number; // 达成度
};

/**
 * 收入达成分析-收入达成详情
 */
export function queryIncomeReachDetails(params: {
  projectId: IdField;
  dataDate: string;
}) {
  return http.post<IncomeReachDetails[]>(incomeReachDetails, {
    ...params,
  });
}

export type ModifyPrice = {
  // 参考日期
  referenceDate: string;
  // 提示
  note: string;
  // 我情提示
  mainNote: string;
  // 调价信号灯
  signal: {
    // 户型id
    layoutId: number;
    // 户型名称
    layoutName: string;
    // 信号灯：参考小冠-公用枚举中的warnLightList
    light: string;
    // 当日销售均价（元）
    todayPrice: number;
    // 建议销售均价（元）
    advisePrice: number;
    // 建议调价幅度（%）
    changeNum: number;
  }[];
  // 我情
  mainInfo: {
    // 月份
    dataDate: string;
    // 库存去化率
    num: string;
  }[];
  // 敌情
  enemyInfo: {
    // 月份
    dataDate: string;
    // 范围2km内民宅挂牌量/间（2021）
    thisYearNum: string;
    // 范围2km内民宅单平米均价/元（2021）
    thisYearPrice: string;
    // 范围2km内民宅挂牌量/间（2019）
    preTwoYearNum: string;
    // 范围2km内民宅单平米均价/元（2019）
    preTwoYearPrice: string;
  }[];
  // 行情
  industryInfo: {
    // 月份
    dataDate: string;
    // 所在城市内民宅挂牌量/间（2021）
    thisYearNum: string;
    // 所在城市内民宅单平米均价/元（2021）
    thisYearPrice: string;
    // 所在城市内民宅挂牌量/间（2019）
    preTwoYearNum: string;
    // 所在城市内民宅单平米均价/元（2019）
    preTwoYearPrice: string;
  }[];
};

/**
 * 行驶系统-动态调价
 */
export function queryModifyPrice(params: {
  projectId: IdField;
  layoutId?: IdField;
}) {
  return http.post<ModifyPrice>(modifyPrice, {
    ...params,
  });
}

export type ModifyPriceLayouts = {
  layoutId: IdField; // 户型id
  layoutName: string; // 户型名称
};

/**
 * 行驶系统-动态调价
 */
export function queryModifyPriceLayouts(params: { projectId: IdField }) {
  return http.post<ModifyPriceLayouts[]>(modifyPriceLayouts, {
    ...params,
  });
}

export type CusStore = {
  // 个人转化率
  personal: {
    // 姓名
    name: string;
    p1: string;
    p2: string;
    p4: string;
    // 转化率
    ration: string;
  }[];
  // 渠道转化率
  channel: {
    // 渠道名称
    name: string;
    p1: string;
    p2: string;
    p4: string;
    // 转化率
    ration: string;
  }[];
};

/**
 * 行驶系统-客储与转化率
 */
export function queryCusStore(params: {
  projectId: IdField;
  dataDate: string;
}) {
  return http.post<CusStore>(cusStore, {
    ...params,
  });
}

export type OptCost = {
  /** 门店id */
  projectId: number;
  /** 运营成本余量（万元） */
  leftAmount: number;
  /** 运营成本余量比率（%） */
  leftRatio: number;
  /** 本年度实际剩余比率（%） */
  leftRatioYearly: number;
  /** 近12个月运营费用趋势 */
  trend: {
    /** 时间 */
    dataDate: string;
    /** 运营成本 */
    cost: number;
    /** 客单成本 */
    perCost: number;
  }[];
};

/**
 * 小冠-运营成本分析页
 */
export function queryOptCost(params: { projectId: IdField }) {
  return http.post<OptCost>(optCost, {
    ...params,
  });
}

export type MarketingCost = {
  projectId: number; // 门店id
  leftAmount: number; // 营销成本余量（万元）
  leftRatio: number; // 营销成本余量比率（%）
  leftRatioYearly: number; // 本年度实际剩余比率（%）
  channelNum: number;
  channelName: string;
  dataSourceRemark: string;
  // 近12个月营销费用趋势
  trend: {
    dataDate: string; // 时间
    cost: number; // 营销成本
    perCost: number; // 客单成本
  }[];
  // 获客渠道分析
  channel: {
    channel: string; // 渠道
    channelDesc: number; // 渠道名称
    num: number; // 客单成本数
    ratio: number; // 渠道客单成本占比
  }[];
};

/**
 * 小冠-营销费用分析页
 */
export function queryMarketingCost(params: {
  projectId: IdField;
  dataDate: string;
}) {
  return http.post<MarketingCost>(marketingCost, {
    ...params,
  });
}

export type EquipmentOffline = Page<{
  id: number;
  deviceSn: string;
  roomNumber: string;
  equipType: number;
  equipTypeDesc: string;
  offlineDay: number;
}>;

/**
 * 小冠-行驶系统-未同步设备详情
 */
export function queryEquipment(params: {
  projectId: IdField;
  pageNum: number;
  pageSize: number;
}) {
  return http.post<EquipmentOffline>(equipmentOffline, {
    ...params,
  });
}

export type EquipmentEnergy = Page<{
  id: number;
  roomNumber: string;
  rentStatus: string;
  equipType: string;
  equMsgList: {
    equipTypeDesc: string;
    exceptionRemark: string;
  }[];
}>;

/**
 * 小冠-行驶系统-能耗异常详情
 */
export function queryEquipmentEnergy(params: {
  projectId: IdField;
  date: string;
  pageNum: number;
  pageSize: number;
}) {
  return http.post<EquipmentEnergy>(equipmentEnergy, {
    ...params,
  });
}

export type CalcSolution = {
  projectId: IdField; //门店id
  rentRatio: number; //时点出租率（%）
  rentPrice: number; //平均租金（元）
  stockNum: number; //时点空置间数
  leftExpireNum: number; //本月剩余到期间数
  renewRatio: string; //平均续租率（%）
  defCheckoutRatio: string; //平均违退率（%）
  newSignDaily: string; //日均新签流速
  salePrice: string; //可售房间平均销售价（元）
  renewRatioNote: string; //平均续租率说明
  defCheckoutRatioNote: string; //平均违退率说明
  newSignDailyNote: string; //日均新签流速说明
  salePriceNote: string; //可售房间平均销售价说明
  thisMonth: {
    income: number; //万元
    yoy: number; //预测环比提升
    rentRatio: number; //平均出租率预测
    price: number; //平均单房价格预测
  }; //本月收入预测
  nextMonth: {
    income: number; //万元
    yoy: number; //预测环比提升
    rentRatio: number; //平均出租率预测
    price: number; //平均单房价格预测
  }; //下月收入预测
  trend: {
    dataDate: string; //时间
    income: number; //收入
    rentRatio: number; //出租率
    price: number; //平均房价
    isFuture: boolean; //是否预测
  }[]; //收入、出租率、房间趋势及预测
};

/**
 * 收入预测计算器 - 计算器
 */
export function queryCalcSolution(params: {
  projectId: IdField;
  renewRatio: string;
  defCheckoutRatio: string;
  newSignDaily: string;
  salePrice: string;
}) {
  return http.post<CalcSolution>(calcSolution, {
    ...params,
  });
}
