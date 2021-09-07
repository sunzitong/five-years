<template>
  <svg
    :width="iconSize"
    :height="iconSize"
    viewBox="0 0 110 110"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.3843 15H88.8992C91.321 15 93.2842 16.9632 93.2842 19.385V95.5959C93.2842 98.8259 89.6536 100.724 87.0013 98.8804L17.8817 50.8398C16.7025 50.0203 15.9993 48.6752 15.9993 47.2392V19.385C15.9993 16.9632 17.9625 15 20.3843 15Z"
      :fill="`url(#${uuid})`"
    />
    <path
      d="M89.2849 15H20C17.7909 15 16 16.7909 16 19V95.5959C16 98.8259 19.6306 100.724 22.2829 98.8804L91.4025 50.8398C92.5817 50.0203 93.2849 48.6752 93.2849 47.2392V19C93.2849 16.7909 91.494 15 89.2849 15Z"
      :fill="fill[0]"
    />
    <defs>
      <linearGradient
        :id="uuid"
        x1="54.6417"
        y1="15"
        x2="54.6417"
        y2="103.247"
        gradientUnits="userSpaceOnUse"
      >
        <stop :stop-color="fill[1]" />
        <stop offset="1" :stop-color="fill[2]" />
      </linearGradient>
    </defs>
  </svg>
</template>

<script lang="ts">
import { formatColors } from "@/utils/tools";
import { Component, Prop, Vue } from "vue-property-decorator";
import { uuid } from "@guanyu/shared";

@Component
export default class Brand extends Vue {
  /**
   * 图标颜色
   */
  @Prop({ default: "#FFAD8D|#BE5126|#BE5126" }) color!: string | string[];

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
    return formatColors(this.color, 3);
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
