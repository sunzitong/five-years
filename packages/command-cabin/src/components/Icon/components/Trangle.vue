<template>
  <svg
    :width="iconSize"
    :height="(iconSize * 29) / 30"
    viewBox="0 0 35 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="14" y="6.2002" width="6" height="20.24" :fill="fill[1]" />
    <path
      d="M34.2838 24.2L20.5522 2.87525C18.8728 0.268144 16.128 0.268144 14.4484 2.87525L0.716745 24.2C-0.962441 26.8098 0.411361 28.9387 3.76711 28.9387H31.2335C34.5892 28.9387 35.9617 26.8098 34.2838 24.2ZM18.5856 25.1159H16.4136V23.2046H18.5856V25.1159ZM18.5856 19.3818H16.4136V7.91362H18.5856V19.3818Z"
      :fill="fill[0]"
    />
  </svg>
</template>

<script lang="ts">
import { formatColorStr } from "@/utils/tools";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Trangle extends Vue {
  /**
   * 图标颜色
   */
  @Prop({ default: "#FF2A76" }) color!: string;

  /**
   * 图标大小
   */
  @Prop({ default: "medium" }) size!: "large" | "medium" | "small" | number;

  /**
   * 填充颜色
   */
  get fill() {
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
