<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="`0 0 ${width} ${height}`"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect :width="width" :height="height" :rx="radius" :fill="fill[2]" />
    <rect
      :width="progress"
      :height="height"
      :rx="radius"
      :fill="`url(#${uuid})`"
    />
    <defs>
      <linearGradient
        :id="uuid"
        x1="175.946"
        y1="7.151e-06"
        x2="-8.51351"
        y2="-2.80824e-06"
        gradientUnits="userSpaceOnUse"
      >
        <stop :stop-color="fill[0]" />
        <stop offset="1" :stop-color="fill[1]" />
      </linearGradient>
    </defs>
  </svg>
</template>
<script lang="ts">
import { Component, Prop, Vue, Ref, VModel } from "vue-property-decorator";
import { uuid } from "@guanyu/shared";
import { formatColorStr } from "@/utils/tools";

@Component
export default class Progress extends Vue {
  /**
   * 容器
   */
  @Ref() wrapper!: HTMLDivElement;

  /**
   * 进度类型
   * bar 条形
   * circle 圆形
   */
  @Prop() type!: "bar" | "circle";

  /**
   * 宽度
   */
  @Prop({ default: 100 }) width!: number;

  /**
   * 高度
   */
  @Prop({ default: 4 }) height!: number;

  /**
   * 圆角
   */
  @Prop({ default: 4 }) radius!: number;

  @VModel({ type: Number }) iValue!: number;

  /**
   * 颜色
   */
  @Prop({ default: "#5CDCFE|#1D94FF|#143F79" }) color!: string;

  /**
   * 填充颜色
   */
  get fill() {
    return formatColorStr(this.color, 3);
  }

  /**
   * svg 必须使用唯一id
   */
  get uuid() {
    return `__APP-PROGRESS__${uuid()}`;
  }

  /**
   * 计算百分比
   */
  get progress() {
    return (this.iValue * this.width) / 100;
  }
}
</script>
<style lang="scss" scoped></style>
