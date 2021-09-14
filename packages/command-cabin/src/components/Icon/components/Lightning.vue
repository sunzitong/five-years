<template>
  <svg
    :width="iconSize"
    :height="(iconSize * 26) / 20"
    viewBox="0 0 20 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.51717 15.5786H1.21932C0.527589 15.5786 0.0503993 14.9339 0.296537 14.3323L5.56096 1.46419C5.70677 1.10778 6.07371 0.87207 6.48327 0.87207H15.3664C16.0674 0.87207 16.5451 1.53334 16.2806 2.13793L13.2154 9.14448H18.9857C19.8344 9.14448 20.2872 10.0761 19.7275 10.67L5.57992 25.6826C4.89229 26.4126 3.61718 25.7801 3.88396 24.8415L6.51717 15.5786Z"
      :fill="`url(#${uuid})`"
    />
    <defs>
      <linearGradient
        :id="uuid"
        x1="10.1028"
        y1="0.87207"
        x2="10.1028"
        y2="41.7054"
        gradientUnits="userSpaceOnUse"
      >
        <stop :stop-color="fill[0]" />
        <stop offset="1" :stop-color="fill[1]" />
      </linearGradient>
    </defs>
  </svg>
</template>

<script lang="ts">
import { formatColors } from "@/utils/tools";
import { Component, Prop, Vue } from "vue-property-decorator";
import { uuid } from "@guanyu/shared";

@Component
export default class Lightning extends Vue {
  /**
   * 图标颜色
   */
  @Prop({ default: "#AD6FFF|#AE95F6" }) color!: string | string[];

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

  /**
   * 获取uuid
   */
  get uuid() {
    return `icon-${uuid()}`;
  }
}
</script>
