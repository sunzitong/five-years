<template>
  <svg
    v-if="iconSize"
    :width="iconSize"
    :height="iconSize"
    viewBox="0 0 37 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 0H27C32.5228 0 37 4.47715 37 10V37H10C4.47715 37 0 32.5228 0 27V0Z"
      :fill="fill[0]"
    />
    <path
      d="M29.6634 11.4171C29.0769 11.0192 28.4341 11.0837 27.978 11.5966L16.4587 22.1492L10.1593 17.0614L10.0471 16.9503C9.57064 16.5413 8.93264 16.58 8.39392 16.9503C7.80905 17.3534 7.93192 17.8864 8.39392 18.3962L14.4621 25.379L14.6059 25.5248C15.5535 26.4125 17.1369 26.5316 18.2471 25.7666C18.4183 25.6479 18.5723 25.5119 18.7064 25.3608L29.5679 12.8902L29.6634 12.7684C30.0057 12.2647 30.2075 11.7851 29.6634 11.4184V11.4171Z"
      :fill="fill[1]"
    />
  </svg>
</template>

<script lang="ts">
import { formatColors } from "@/utils/tools";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Checked extends Vue {
  /**
   * 图标颜色
   */
  @Prop({ default: "#01F5F1|#111734" }) color!: string | string[];

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
