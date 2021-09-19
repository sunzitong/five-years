import { Component, Mixins } from "vue-property-decorator";
import MixStore from "@/store/MixStore";
import { formatValue, sepNumber } from "@/utils/tools";
import { ResponseData } from "@guanyu/shared";

@Component
export class Base extends Mixins(MixStore) {
  /**
   * 空值渲染--
   */
  formatValue = formatValue;
  /**
   * 千分位分隔
   */
  sepNumber = sepNumber;
  /**
   * 加载状态
   */
  protected loading = true;
  /**
   * 数据为空
   */
  protected empty = false;
  /**
   * 设置数据来源
   * @param payload 数据来源
   */
  private setCardDataSource(payload: { from: string; time: string }) {
    let ins = this.$parent;
    let card = null;
    while (ins) {
      if (ins.$options.name === "CardA") {
        card = ins;
      }
      ins = ins.$parent;
    }
    card?.setCardDataSource?.(payload);
  }
  /**
   * 自动请求
   * 固定命名:fetch
   */
  mounted() {
    this.$watch(
      "store.global",
      async () => {
        if (typeof this.fetch === "function") {
          // TODO 递归更新loading
          const updateLoading = (val: boolean) => {
            this.loading = val;
            let ins = this.$parent;
            while (ins) {
              if (typeof ins.$data.loading === "boolean") {
                ins.$data.loading = val;
              }
              ins = ins.$parent;
            }
          };
          // 设置loading状态
          updateLoading(true);
          // 触发请求
          const response: ResponseData<any> = await this.fetch();
          // 设置loading状态
          updateLoading(false);
          console.log("已更新loading", this.$options.name);
          // 设置数据来源
          if (response?.data?.dataSource && response?.data?.updateTime) {
            this.setCardDataSource({
              from: response.data.dataSource,
              time: response.data.updateTime,
            });
          }
        }
      },
      { deep: true, immediate: true }
    );
  }
}

/**
 * abstract实现接口请求
 */
export interface IFetch {
  /**
   * 自动监听触发 重复调用
   * @returns response
   */
  fetch(): Promise<ResponseData<unknown> | void>;
}
