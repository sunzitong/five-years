<template>
  <svg
    :width="iconSize"
    :height="iconSize"
    viewBox="0 0 110 110"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M45 34.4672C45 31.4613 48.1914 29.5294 50.8546 30.9231L92.9902 52.9729C94.3091 53.663 95.1356 55.0284 95.1356 56.5169V95.9995C95.1356 98.2086 93.3447 99.9995 91.1356 99.9995H49C46.7909 99.9995 45 98.2086 45 95.9995V34.4672Z"
      :fill="fill[0]"
    />
    <path
      d="M14.041 41.4333C14.041 40.057 14.7486 38.7773 15.9144 38.0455L58.7478 11.1574C61.4117 9.48521 64.8745 11.4 64.8745 14.5453V100H18.041C15.8319 100 14.041 98.2092 14.041 96.0001V41.4333Z"
      :fill="fill[1]"
    />
  </svg>
</template>

<script lang="ts">
import { formatColorStr } from "@/utils/tools";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Income extends Vue {
  /**
   * 图标颜色
   */
  @Prop({ default: "#3654BC|#6284FF" }) color!: string;

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
