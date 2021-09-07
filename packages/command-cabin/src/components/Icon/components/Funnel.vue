<template>
  <svg
    :width="iconSize"
    :height="iconSize"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 25.5V16.5L24.5 9.5L25.5 7L23.5 5L8 5.5L6.5 6.5V7.67652L13.5 16.5V26.5L18 25.5Z"
      :fill="fill[1]"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.38864 6.00033C7.24514 6.00033 6.63216 7.34539 7.38236 8.2084L13.5095 15.2569C13.8258 15.6208 14.0001 16.0868 14.0001 16.569V25.8209L17.3334 25.0189V16.5952C17.3334 16.0894 17.5251 15.6023 17.8699 15.2321L24.3799 8.2424C25.174 7.38975 24.5694 6.00033 23.4042 6.00033H8.38864ZM6.37608 9.08314C4.87567 7.35711 6.10163 4.66699 8.38864 4.66699H23.4042C25.7346 4.66699 26.9439 7.44585 25.3556 9.15113L18.8455 16.1409C18.7306 16.2643 18.6667 16.4266 18.6667 16.5952V25.0189C18.6667 25.6351 18.2444 26.1711 17.6453 26.3152L12.6667 27.5131V16.569C12.6667 16.4083 12.6087 16.253 12.5032 16.1316L6.37608 9.08314Z"
      :fill="fill[0]"
    />
  </svg>
</template>

<script lang="ts">
import { formatColors } from "@/utils/tools";
import { Component, Prop, Vue } from "vue-property-decorator";
import { uuid } from "@guanyu/shared";

@Component
export default class Funnel extends Vue {
  /**
   * 图标颜色
   */
  @Prop({ default: "#01F5F1|transparent" }) color!: string | string[];

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
