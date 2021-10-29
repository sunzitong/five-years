import { AnyFunction } from "@guanyu/shared";
import Vue from "vue";

/**
 * 接口请求包装
 */
export const useQuery = <T extends AnyFunction>(
  method: T,
  options?: { defaultLoading: boolean }
) => {
  const loading = Vue.observable({ value: options?.defaultLoading || false });
  return {
    execute: (async (...args) => {
      loading.value = true;
      const response = await method(...args);
      Vue.nextTick(() => {
        loading.value = false;
      });
      return response;
    }) as T,
    loading,
  };
};
