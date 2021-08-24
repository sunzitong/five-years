<template>
  <svg
    :width="iconSize"
    :height="iconSize"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="30" cy="30" r="30" :fill="fill[0]" />
    <path
      d="M34.8254 36.1612C34.8802 36.1116 35.4858 35.5644 35.6642 35.4088C35.9944 35.1205 36.2684 34.8992 36.5494 34.7088C38.5221 33.3609 40.5496 33.7378 43.607 36.2672C45.4982 37.8323 46.257 39.376 45.924 40.921C45.6767 42.0744 44.9531 42.9622 43.5916 44.1398C43.5016 44.2162 42.7148 44.8814 42.5139 45.0598C39.3567 47.8735 30.2435 44.1827 22.7644 36.5153C15.2627 28.8265 12.0297 19.8287 15.229 16.9747L15.6505 16.5911L16.1058 16.1646C17.7132 14.6679 18.7951 13.996 20.2268 14C21.6558 14.0054 23.0243 14.8382 24.3689 16.5482C27.2044 20.1653 27.0877 22.1274 24.7005 24.2934C24.5291 24.4516 23.9165 24.9867 23.8575 25.0391C23.273 25.5621 24.9043 28.1371 28.223 31.5383C31.5811 34.9783 34.1818 36.7312 34.8226 36.1626H34.8254L34.8254 36.1612Z"
      :fill="fill[1]"
    />
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Call extends Vue {
  /**
   * 图标颜色
   */
  @Prop({ default: "green" }) color!: string;

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
    const colors = {
      green: ["#65DA7A", "#fff"],
    };
    return colors[this.color] ?? [this.color, "#fff"];
  }

  /**
   * 图标大小
   */
  get iconSize() {
    const sizes = {
      large: 90,
      medium: 60,
      small: 30,
    };
    return sizes[this.size] ?? this.size;
  }
}
</script>
