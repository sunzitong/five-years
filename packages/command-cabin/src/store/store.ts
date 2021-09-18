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
    orgTree: {} as OrgTreeItemReturn,
    /**
     * 门店ID
     */
    project: {} as ProjectListItemReturn,
  },
  /**
   * 接口数据
   */
  $service: {},
};

export default store;
