<template>
  <div class="app-white-space" :class="cls" :style="defaultStyle"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class SubWrapper extends Vue {
  /**
   * 上下留白xs,sm,md,lg,xl
   */
  @Prop({ default: "lg" }) size!: "sm" | "md" | "lg" | "xs" | "xl" | number;

  /**
   * 动态设置className
   */
  get cls() {
    if (typeof this.size === "number") return "";
    return `app-white-space--${this.size}`;
  }

  get defaultStyle() {
    if (typeof this.size === "number") {
      return {
        height: `${this.size}px`,
      };
    }
    return {};
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
    height: 24px;
  }
  &--xs {
    height: 40px;
  }
  &--xl {
    height: 50px;
  }
}
</style>
