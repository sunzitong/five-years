import { OrgTreeItemReturn } from "@/service/analysis/commandCabin/orgTree";
import { ProjectListItemReturn } from "@/service/analysis/commandCabin/projectList";
import {
  DataLevels,
  DateScopes,
} from "@/service/analysis/commandCabin/publicEnum";

const store = {
  /**
   * 运行时参数
   */
  env: {
    ...process.env,
    err: "",
  } as Env,

  /**
   * 全局参数
   */
  global: {
    /**
     * 数据范围枚举 全国 地区 城市
     */
    dataLevel: DataLevels.GROUP,
    /**
     * 时间枚举 年 月 日
     */
    dateScope: DateScopes.YEARLY,
    /**
     * 全国地区城市ID
     */
    orgTree: {
      orgLevel: 0, //组织级别 0:国家 1:大区 2:地区 3:城市
      orgId: 1, //组织ID
      orgName: "中国", //组织名称
      parentOrgId: 0, //上一级组织ID
    } as OrgTreeItemReturn,
    /**
     * 门店ID
     */
    project: {
      groupOrgId: 1, //国家组织ID
      groupName: "中国", //国家名称
      areaId: 10, //大区ID
      areaName: "华北区域", //大区名称
      regionId: 81, //地区ID
      regionName: "北京地区", //地区名称
      cityId: 1, //城市ID
      cityName: "北京", //城市名称
      projectId: 98, //门店ID
      projectName: "龙湖冠寓北京酒仙桥店", //门店名称
      phId: "L-BJ00-BJJXQ00.01", //分期ID
      optStatus: "Normal", //经营状态
      transactionModel: "MediumAsset",
      openMonth: 48, //开放时间
      orgId: 40005, //组织ID
      areaOrgId: 10001, //大区组织ID
      regionOrgId: 20001, //地区组织ID
      cityOrgId: 30003, //城市组织ID
    } as ProjectListItemReturn,
  },
};

export default store;
