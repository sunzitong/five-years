<template>
  <svg width="100" height="100" viewBox="0 0 1040 1040">
    <path
      d="M 520 520 m 0, -500 a 500, 500 0 1, 0 0, 1000 a 500, 500 0 1, 0 0, -1000"
      style="fill: none; stroke-width: 40px"
    ></path>
    <path
      d="M 520 520 m 0, -500 a 500, 500 0 1, 0 0, 1000 a 500, 500 0 1, 0 0, -1000"
      style="
        stroke: rgb(114, 50, 221);
        stroke-width: 41px;
        stroke-dasharray: 2198px, 3140px;
      "
    ></path>
  </svg>
</template>
<script lang="ts">
import { Component, Prop, Vue, VModel } from "vue-property-decorator";
import { uuid } from "@guanyu/shared";
import { formatColorStr } from "@/utils/tools";

@Component
export default class ProgressCircle extends Vue {
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
    return `__APP-PROGRESS-CIRCEL__${uuid()}`;
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
