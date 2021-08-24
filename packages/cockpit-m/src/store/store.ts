import { OptAndSaleIndexNum, PublicEnum, RentRatio } from "@/service";

const store = {
  /**
   * 运行时参数
   */
  env: {
    ...process.env,
    error: "",
  } as Env,

  /**
   * 公共枚举
   */
  valueEnum: {} as PublicEnum,
  /**
   * 综合经营指数
   */
  optData: {} as OptAndSaleIndexNum,

  rentData: {} as RentRatio,
};
export default store;
