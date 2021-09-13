import { UnpackParameter } from "@guanyu/shared";
import store from "./store";
import _ from "lodash";

export default store;

export const env = store.env;

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
