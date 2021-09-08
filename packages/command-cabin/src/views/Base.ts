import { Component, Mixins } from "vue-property-decorator";
import MixStore from "@/store/MixStore";
import { formatValue, sepNumber } from "@/utils/tools";

@Component({})
export default class Base extends Mixins(MixStore) {
  formatValue = formatValue;
  sepNumber = sepNumber;
  /**
   * 设置数据来源
   * @param payload 数据来源
   */
  setCardDataSource(payload: { from: string; time: string }) {
    let ins = this.$parent;
    let card = null;
    while (ins) {
      if (ins.$options.name === "Card") {
        card = ins;
      }
      ins = ins.$parent;
    }
    card?.setCardDataSource?.(payload);
  }
}
