import { OrgTreeItemReturn } from "@/service/analysis/commandCabin/orgTree";
import { ProjectListItemReturn } from "@/service/analysis/commandCabin/projectList";
import {
  DataLevels,
  DateScopes,
} from "@/service/analysis/commandCabin/publicEnum/enums";
import { TokenReturn } from "@/service/auth/token";
import dayjs from "dayjs";

const store = {
  /**
   * 运行时参数
   */
  env: {
    ...process.env,
    ERROR: "",
    DEBUG: process.env.NODE_ENV === "development",
    /**
     * 数字字体
     */
    VALUE_FONT: "DIN Alternate",
    /**
     * 默认字体
     */
    TEXT_FONT: "PingFang SC",
    /**
     * 全局缩放比例
     */
    SCALE: 1,
    /**
     * 当前时间,自动从服务器更新
     */
    NOW: dayjs().valueOf(),
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
  /**
   * 当前用户信息
   */
  currentUser: null as null | TokenReturn,
};

export default store;
