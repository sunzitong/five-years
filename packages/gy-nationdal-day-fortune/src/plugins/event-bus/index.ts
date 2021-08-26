import { PluginObject } from "vue";
import Vue from "vue";

const Plugin: PluginObject<any> = {
  install: (Vue) => {
    const Bus = new Vue({
      methods: {
        emit(event: string, ...args: any) {
          this.$emit(event, ...args);
        },
        on(event: string, callback: any) {
          this.$on(event, callback);
        },
        off(event: string, callback: any) {
          this.$off(event, callback);
        },
        once(event: string, callback: any) {
          this.$once(event, callback);
        },
      },
    });
    Vue.prototype.$bus = Bus;
    Vue.bus = Bus;
  },
};
Vue.use(Plugin);

export default Plugin;
