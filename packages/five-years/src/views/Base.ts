import { Component, Mixins } from "vue-property-decorator";
import MixStore from "@/store/MixStore";

@Component({})
export default class Base extends Mixins(MixStore) {
  created() {
    if (process.env.NODE_ENV !== "production") {
      window.PAGE = this;
    }
  }
}
