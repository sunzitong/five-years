<template>
  <svg
    v-if="iconSize"
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
        x1="0"
        y1="0"
        :x2="width"
        y2="0"
        gradientUnits="userSpaceOnUse"
      >
        <stop :stop-color="fill[0]" />
        <stop offset="1" :stop-color="fill[1]" />
      </linearGradient>
    </defs>
  </svg>
</template>
<script lang="ts">
import { Component, Prop, Vue, VModel } from "vue-property-decorator";
import { uuid } from "@guanyu/shared";
import { formatColors } from "@/utils/tools";

@Component
export default class ProgressBar extends Vue {
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

  /**
   * v-model same as value
   */
  @VModel({ type: Number }) iValue!: number;

  /**
   * 颜色
   */
  @Prop({ default: "#5CDCFE|#1D94FF|#143F79" }) color!: string | string[];

  /**
   * 填充颜色
   */
  get fill() {
    return formatColors(this.color, 3);
  }

  /**
   * svg 必须使用唯一id
   */
  uuid = `__APP-PROGRESS-BAR__${uuid()}`;

  /**
   * 计算百分比
   */
  get progress() {
    const v = Math.min(Math.max(this.iValue, 0), 100);
    return (v * this.width) / 100;
  }
}
</script>
<style lang="scss" scoped></style>
