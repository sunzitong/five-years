<template>
  <svg
    :width="iconSize"
    :height="(iconSize * 15) / 24"
    viewBox="0 0 24 15"
    fill="none"
    :transform="transform"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M-2.86603e-08 3.01766L2.12594 0.614258L11.9784 10.4952L21.7592 0.74288L24 2.97448L11.9812 14.9997L-2.86603e-08 3.01766Z"
      :fill="fill[0]"
    />
  </svg>
</template>

<script lang="ts">
import { formatColorStr } from "@/utils/tools";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Corner extends Vue {
  /**
   * 箭头方向
   * Left 左
   * Right 右
   * Top 上
   * Bottom 下
   */
  @Prop({ default: "corner-right" }) type!:
    | "corner-left"
    | "corner-top"
    | "corner-right"
    | "corner-bottom";

  /**
   * 图标颜色
   */
  @Prop({ default: "#01F5F1" }) color!: string;

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
    return formatColorStr(this.color, 2);
  }

  get transform() {
    const maps = {
      "corner-left": "matrix(-1, 0, 0, -1, 0, 0)",
      "corner-top": "rotate(90) scale(-1)",
      "corner-right": "scale(1)",
      "corner-bottom": "rotate(90) scale(1)",
    };
    return maps[this.type] ?? maps["corner-right"];
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
<style lang="scss" scoped>
.app-icon {
  &--asce {
    transform: matrix(-1, 0, 0, -1, 0, 0);
  }
  &__desc {
    transform: matrix(1, 0, 0, 1, 0, 0);
  }
}
</style>
