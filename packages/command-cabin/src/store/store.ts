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
     * 数据范围
     */
    dataLevel: DataLevels.GROUP,
    /**
     * 时间维度
     */
    dateScope: DateScopes.YEARLY,
    /**
     * 全国地区城市ID
     */
    orgId: 0,
    /**
     * 门店ID
     */
    projectId: 0,
  },
};

export default store;
