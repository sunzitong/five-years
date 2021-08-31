<template>
  <svg
    :width="iconSize"
    :height="(iconSize * 32) / 49"
    viewBox="0 0 49 32"
    fill="none"
    :transform="transform"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.900052 13.445L0.900017 17.7673L39.7077 17.7661L29.5431 27.9532L32.6232 31.04L48.0241 15.605L32.6243 0.171233L29.5456 3.25681L39.7112 13.4449L0.900052 13.445Z"
      :fill="fill[0]"
    />
  </svg>
</template>

<script lang="ts">
import { formatColorStr } from "@/utils/tools";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Arrow extends Vue {
  /**
   * 箭头方向
   * Left 左
   * Right 右
   * Top 上
   * Bottom 下
   */
  @Prop({ default: "bottom" }) type!: "left" | "top" | "right" | "bottom";

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
      "arrow-left": "matrix(-1, 0, 0, -1, 0, 0)",
      "arrow-top": "rotate(90) scale(-1)",
      "arrow-right": "scale(1)",
      "arrow-bottom": "rotate(90) scale(1)",
    };
    return maps[this.type] ?? maps["arrow-right"];
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
