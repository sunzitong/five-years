import { VueConstructor } from "vue/types/umd";
import Spin from "./Index.vue";
import { PluginObject } from "vue";

Object.defineProperty(Spin, "install", {
  value(Vue: VueConstructor) {
    Vue.component("Spin", Spin);
  },
});

export default (Spin as unknown) as PluginObject<void>;
