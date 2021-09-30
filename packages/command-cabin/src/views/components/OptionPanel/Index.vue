<template>
  <component
    v-bind:is="currentComponent"
    :show.sync="pipeShow"
    :class="name"
    @click.native.stop
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import TheOrgTree from "./TheOrgTree.vue";
import TheProjectList from "./TheProjectList.vue";
import TheDateScopes from "./TheDateScopes.vue";
import TheNavMenu from "./TheNavMenu.vue";
import mitter, { EventName } from "@/utils/mitter";
import Options from "./Options.vue";

const components = {
  TheOrgTree,
  TheProjectList,
  TheDateScopes,
  TheNavMenu,
  Options,
};

@Component({
  components,
  inheritAttrs: false,
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

  close() {
    this.pipeShow = false;
  }

  created() {
    mitter.on(EventName.DocumentClick, this.close);
  }
  beforeDestroy() {
    mitter.off(EventName.DocumentClick, this.close);
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
