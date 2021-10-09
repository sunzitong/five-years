<template>
  <svg
    v-if="iconSize"
    :width="iconSize"
    :height="iconSize"
    viewBox="0 0 54 54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="9" y="45" width="36" height="3" rx="1.5" :fill="fill[0]" />
    <path
      d="M10.8 22.2C10.8 13.253 18.053 6 27 6C35.947 6 43.2 13.253 43.2 22.2V36.6L44.7806 41.3419C44.8885 41.6657 44.6476 42 44.3063 42H9.69371C9.35243 42 9.11145 41.6657 9.21937 41.3419L10.8 36.6V22.2Z"
      :fill="fill[0]"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M31.0079 12L27.7335 22.8689H36L22.9919 39L26.2665 28.1312H18L31.0079 12Z"
      :fill="fill[1]"
    />
  </svg>
</template>

<script lang="ts">
import { formatColors } from "@/utils/tools";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Warning extends Vue {
  /**
   * 图标颜色
   */
  @Prop({ default: "#FF3980" }) color!: string | string[];

  /**
   * 图标大小
   */
  @Prop({ default: "medium" }) size!: "large" | "medium" | "small" | number;

  /**
   * 填充颜色
   */
  get fill() {
    /**
     * 处理特殊场景
     */
    return formatColors(this.color, 2);
  }

  /**
   * 图标大小
   */
  get iconSize() {
    const sizes = {
      large: 40,
      medium: 28,
      small: 14,
    };
    return sizes[this.size] ?? this.size;
  }
}
</script>
<style lang="scss" scoped></style>
