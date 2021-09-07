import { Component, Mixins } from "vue-property-decorator";
import MixStore from "@/store/MixStore";
import { formatValue } from "@/utils/tools";

@Component({})
export default class Base extends Mixins(MixStore) {
  formatValue = formatValue;
}
