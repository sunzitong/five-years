import { iwant, UnpackParameter } from "@guanyu/shared";
import store from "./store";
import _ from "lodash";
import {
  fetchOrgTree,
  OrgTreeItemReturn,
} from "@/service/analysis/commandCabin/orgTree";
import {
  fetchProjectList,
  ProjectListItemReturn,
} from "@/service/analysis/commandCabin/projectList";

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
   * 经营现状-逾期金额
   */
  ProjectOverdue = "ProjectOverdue",
  /**
   * 财务相关指标-财务指标达成与预估
   */
  ProjectFinanceLine = "ProjectFinanceLine",
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
   * 指挥中心-经营现状-收入量价情况
   */
  HomeIncome = "HomeIncome",
  /**
   * 营造盘面详情
   */
  ConstructList = "ConstructList",
  /**
   * 成本分析详情列表
   */
  CostAnalysisList = "CostAnalysisList",
  /**
   * 首屏-现场监控
   */
  HomeMonitorList = "HomeMonitorList",
  /*
   * 拓展盘面详情-拓宽台账宽表
   */
  ExpansionAwardInfo = "ExpansionAwardInfo",
  /**
   * 拓展盘面详情-年度目标表
   */
  YearTargetDetail = "YearTargetDetail",
  /**
   * 拓展盘面详情-战略合作表
   */
  StrategyCoopDetail = "StrategyCoopDetail",

  /**
   * 指挥中心-异常预警
   */
  HomeEarlyWarning = "HomeEarlyWarning",

  /**
   * 基础信息-项目区位
   */
  ProjectLocationUrl = "ProjectLocationUrl",
  /**
   * 指挥中心-地图数据切换条
   */
  HomeMapChangeBar = "HomeMapChangeBar",
  /**
   * 指挥中心-地图大区/城市圆圈
   */
  HomeMapCircle = "HomeMapCircle",

  /**
   * 当前投资实现情况
   */
  ProjectCurrentInfo = "ProjectCurrentInfo",

  /**
   * 门店屏-里程碑
   */
  ProjectMilepost = "ProjectMilepost",

  /**
   * 查询主屏(中心位置)地区(城市)维度详细信息
   */
  HomeRegionDetailsInfo = "HomeRegionDetailsInfo",
}
/**
 * 方法重载
 */
interface UseStoreHook {
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
export const useStore: UseStoreHook = (
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

/**
 * 删除缓存的数据
 * @param key StoreKey 不传清除所有
 */
export const removeStore = (key?: StoreKey) => {
  if (key) {
    delete store.$service[key];
  } else {
    store.$service = {};
  }
};

/**
 * 根据门店查找城市组架
 * @param project 门店
 * @returns orgTree
 */
export const findCityOrgTreeByProject = async (
  project: ProjectListItemReturn
) => {
  const globalOrgTree = iwant.array(
    (await useStore(fetchOrgTree, { key: StoreKey.OrgTree }))?.data
  );
  let orgTree: null | OrgTreeItemReturn = null;
  // 查找国家
  findOrgTree: for (let i = 0; i < globalOrgTree.length; i++) {
    const group = globalOrgTree[i];
    if (group.orgId === project?.groupOrgId && group.childList) {
      // 查找大区
      for (let j = 0; j < group.childList.length; j++) {
        const area = group.childList[j];
        if (area.orgId === project.areaOrgId && area.childList) {
          // 查找城市
          for (let k = 0; k < area.childList.length; k++) {
            const city = area.childList[k];
            if (city.orgId === project.cityOrgId) {
              orgTree = city;
              break findOrgTree;
            }
          }
        }
      }
    }
  }
  return orgTree;
};

/**
 * 根据门店查找组架
 * @param project 门店
 * @returns orgTree
 */
export const findOrgTreeByOrgId = async (orgId: number) => {
  const globalOrgTree = iwant.array(
    (await useStore(fetchOrgTree, { key: StoreKey.OrgTree }))?.data
  );

  const find = (list: OrgTreeItemReturn[]): OrgTreeItemReturn | null => {
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (item.orgId === orgId) return item;
      if (item.childList) {
        return find(item.childList);
      }
    }
    return null;
  };

  return find(globalOrgTree);
};

/**
 * 根据phId查找门店
 * @param phId phId
 * @returns 门店
 */
export const findProjectByPhId = async (phId: string) => {
  const globalProjectList = iwant.array(
    (
      await useStore(fetchProjectList, {
        key: StoreKey.ProjectList,
      })
    )?.data
  );
  return globalProjectList.find((proj) => proj.phId === phId) || null;
};
