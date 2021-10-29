import { VueConstructor } from "vue/types/umd";
import Empty from "./Empty.vue";
import { PluginObject } from "vue";

Object.defineProperty(Empty, "install", {
  value(Vue: VueConstructor) {
    Vue.component("Empty", Empty);
  },
});

export default (Empty as unknown) as PluginObject<void>;
