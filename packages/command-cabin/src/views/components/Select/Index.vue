<template>
  <component
    v-bind:is="currentComponent"
    v-bind="{ ...$attrs, ...$props }"
    v-on="$listeners"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import TheOrgTree from "./TheOrgTree.vue";
import YearRange from "./YearRange.vue";

const components = { TheOrgTree, YearRange };

@Component({
  components,
  inheritAttrs: false,
})
export default class Select extends Vue {
  /**
   * 类型
   */
  @Prop({ required: true, type: String }) name!: keyof typeof components;

  /**
   * 获取动态组件
   */
  get currentComponent() {
    return components[this.name] ?? null;
  }
}
</script>
