import Vue from "vue";
import { config } from "@vue/test-utils";

Vue.config.productionTip = false;
Vue.mixin({
  data: () => {
    return {};
  },
});

(<any>config.stubs) = ["router-link", "router-view"];
