import Vue from "vue";
import store from "./store";
import Component from "vue-class-component";

@Component
/**
 * 用于vue class component的mixins()
 * 代替Vue.mixins()
 */
export default class MixStore extends Vue {
  // 参数等
  env = store.env;

  store = store;
}
