import { Component, Mixins } from "vue-property-decorator";
import MixStore from "@/store/MixStore";
import { formatValue, sepNumber } from "@/utils/tools";
import { ResponseData } from "@guanyu/shared";

@Component({})
export default class Base extends Mixins(MixStore) {
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
  loading = true;
  /**
   * 数据为空
   */
  empty = false;
  /**
   * 设置数据来源
   * @param payload 数据来源
   */
  setCardDataSource(payload: { from: string; time: string }) {
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
          // 设置loading状态
          const hasParentLoading =
            typeof this.$parent.$data.loading === "boolean";
          this.loading = true;
          if (hasParentLoading) {
            this.$parent.loading = true;
          }
          // 触发请求
          const response: ResponseData<any> = await this.fetch();
          // 设置loading状态
          this.loading = false;
          if (hasParentLoading) {
            this.$parent.loading = false;
          }
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
