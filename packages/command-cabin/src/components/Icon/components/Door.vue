<template>
  <svg
    :width="iconSize"
    :height="(iconSize * 23) / 22"
    viewBox="0 0 22 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16.2801 2.9342V6.90181H11.7457C10.1587 6.90181 8.91169 8.14877 8.91169 9.73582V15.4038C8.91169 16.9909 10.1587 18.2378 11.7457 18.2378H16.2801V19.9382C16.2801 21.1852 15.2599 22.2055 14.0129 22.2055H2.67687C1.42991 22.2055 0.409668 21.1852 0.409668 19.9382V2.9342C0.409668 1.68724 1.42991 0.666992 2.67687 0.666992H14.0129C15.2599 0.666992 16.2801 1.68724 16.2801 2.9342ZM6.36108 10.586C6.81453 10.586 7.21129 10.1893 7.21129 9.73582C7.21129 7.24189 9.25177 5.20141 11.7457 5.20141C12.1991 5.20141 12.5959 4.80464 12.5959 4.3512C12.5959 3.89776 12.1991 3.501 11.7457 3.501C8.28821 3.501 5.51088 6.27833 5.51088 9.73582C5.51088 10.1893 5.90764 10.586 6.36108 10.586ZM11.7458 8.60217H20.8146C21.4381 8.60217 21.9482 9.11229 21.9482 9.73577V10.8694H10.6122V9.73577C10.6122 9.11229 11.1223 8.60217 11.7458 8.60217ZM11.7458 16.5374C11.1223 16.5374 10.6122 16.0273 10.6122 15.4038V12.003H21.9482V15.4038C21.9482 16.0273 21.4381 16.5374 20.8146 16.5374H11.7458Z"
      :fill="`url(#${uuid})`"
    />
    <defs>
      <linearGradient
        :id="uuid"
        x1="11.179"
        y1="0.666992"
        x2="11.179"
        y2="22.2055"
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
export default class Door extends Vue {
  /**
   * 图标颜色
   */
  @Prop({ default: "#F5C151|#ED9A3A" }) color!: string | string[];

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
