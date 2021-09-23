import { UnpackParameter } from "@guanyu/shared";
import store from "./store";
import _ from "lodash";

export default store;

export const env = store.env;

/**
 * service data keys
 */
export enum StoreKey {
  /**
   * 地区筛选（国家-大区-城市）
   */
  OrgTree = "OrgTree",
  /**
   * 所有门店列表
   */
  ProjectList = "ProjectList",
  /**
   * 门店基本信息
   */
  ProjectBaseInfo = "ProjectBaseInfo",
  /**
   * 门店团队信息
   */
  ProjectGroupInfo = "ProjectGroupInfo",
  /**
   * 财务相关指标-综合经营指数
   */
  ProjectBusinessScore = "ProjectBusinessScore",
  /**
   * 经营现状-设备离线率
   */
  ProjectDeviceOffline = "ProjectDeviceOffline",
  /**
   * 门店屏幕-经营现状-舆情风险
   */
  ProjectSentiment = "ProjectSentiment",
  /**
   * 门店屏幕-经营现状-收入量价情况
   */
  ProjectIncome = "ProjectIncome",
  /**
   * 中央奖补、投后攻坚模块
   */
  HomeExpansionAwardInfo = "HomeExpansionAwardInfo",
  /**
   * 营造盘面-项目开业
   */
  HomeProjectOpen = "HomeProjectOpen",
  /**
   * 营造盘面-开业延期
   */
  HomeProjectDelayInfo = "HomeProjectDelayInfo",
  /**
   * 营造盘面-产品品质
   */
  HomeProductQuality = "HomeProductQuality",
  /**
   * 营造盘面-维保报事
   */
  HomeRepairStat = "HomeRepairStat",
  /**
   * 指挥中心-头部数据-年累计块
   */
  HomeNumYearly = "HomeNumYearly",
  /**
   * 经营现状-设备离线率
   */
  HomeDeviceOffline = "HomeDeviceOffline",
  /**
   * 指挥中心-经营现状-舆情风险
   */
  HomeSentiment = "HomeSentiment",
  /**
   * 成本分析模块
   */
  HomeCostAnalysis = "HomeCostAnalysis",
  /**
   * 经营现状-逾期金额
   */
  HomeOverdue = "HomeOverdue",
  /**
   * 营造盘面详情
   */
  ConstructList = "ConstructList",
  /**
   * 成本分析详情列表
   */
  CostAnalysisList = "CostAnalysisList",
}
/**
 * 方法重载
 */
interface useStoreHook {
  /**
   * 获取service数据
   */
  <F extends AnyFunction>(
    service: F,
    options: { key: StoreKey; params: UnpackParameter<F>; force?: boolean }
  ): ReturnType<F>;
  /**
   * 获取service数据
   */
  <F extends () => any>(
    service: F,
    options: { key: StoreKey; force?: boolean }
  ): ReturnType<F>;
}

/**
 * @param service service请求
 * @param param 配置
 * @returns Promise
 */
export const useStore: useStoreHook = (
  service: any,
  { key, params, force = false }: any
) => {
  const { $service } = store;
  // 已缓存
  if (!force && $service[key]) {
    // 参数一致
    if (_.isEqual($service[key].params, params)) {
      return $service[key].promise;
    }
  }
  // 请求service
  return ($service[key] = {
    params,
    promise: service(params),
  }).promise;
};
