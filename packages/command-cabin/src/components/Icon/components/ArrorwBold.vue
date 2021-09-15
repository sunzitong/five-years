<template>
  <svg
    :width="iconSize"
    :height="(iconSize * 27) / 31"
    :transform="transform"
    viewBox="0 0 31 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.287598 26.8794L0.287598 13.8794L15.2876 0.879395L30.2876 13.8794V26.8794L15.2876 13.8794L0.287598 26.8794Z"
      fill="#01F5F1"
    />
  </svg>
</template>

<script lang="ts">
import { formatColors } from "@/utils/tools";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ArrowBold extends Vue {
  /**
   * 箭头方向
   * Left 左
   * Right 右
   * Top 上
   * Bottom 下
   */
  @Prop({ default: "arrow-bold-top" }) type!:
    | "arrow-bold-left"
    | "arrow-bold-top"
    | "arrow-bold-right"
    | "arrow-bold-bottom";

  /**
   * 图标颜色
   */
  @Prop({ default: "#01F5F1" }) color!: string | string[];

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

  get transform() {
    const maps = {
      "arrow-bold-top": "scale(1)",
      "arrow-bold-left": "rotate(90) scale(-1)",
      "arrow-bold-bottom": "matrix(-1, 0, 0, -1, 0, 0)",
      "arrow-bold-right": "rotate(90) scale(1)",
    };
    return maps[this.type] ?? maps["arrow-bold-top"];
  }

  /**
   * 图标大小
   */
  get iconSize() {
    const sizes = {
      large: 40,
      medium: 31,
      small: 16,
    };
    return sizes[this.size] ?? this.size;
  }
}
</script>
