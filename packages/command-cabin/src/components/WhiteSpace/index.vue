<template>
  <div class="app-white-space" :class="cls"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class SubWrapper extends Vue {
  /**
   * 上下留白xs,sm,md,lg,xl
   */
  @Prop({ default: "lg" }) size!: "sm" | "md" | "lg" | "xs" | "xl";

  /**
   * 动态设置className
   */
  get cls() {
    return `app-white-space--${this.size}`;
  }
}
</script>

<style lang="scss" scoped>
.app-white-space {
  clear: both;
  &--sm {
    height: 10px;
  }
  &--md {
    height: 20px;
  }
  &--lg {
    height: 30px;
  }
  &--xs {
    height: 40px;
  }
  &--xl {
    height: 50px;
  }
}
</style>
