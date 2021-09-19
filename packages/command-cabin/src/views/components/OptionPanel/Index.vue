<template>
  <component v-bind:is="currentComponent" :show.sync="pipeShow" :class="name" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import TheOrgTree from "./TheOrgTree.vue";
import TheProjectList from "./TheProjectList.vue";
import TheDateScopes from "./TheDateScopes.vue";

const components = { TheOrgTree, TheProjectList, TheDateScopes };

@Component({
  components,
})
export default class OptionPanel extends Vue {
  /**
   * 类型
   */
  @Prop({ required: true, type: String }) name!: keyof typeof components;

  @Prop({ default: false, type: Boolean }) show!: false;

  get pipeShow() {
    return this.show;
  }

  set pipeShow(value: boolean) {
    this.$emit("update:show", value);
  }

  /**
   * 获取动态组件
   */
  get currentComponent() {
    return components[this.name] ?? null;
  }
}
</script>
<style lang="scss" scoped>
.option-panel {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 20;
}
</style>
