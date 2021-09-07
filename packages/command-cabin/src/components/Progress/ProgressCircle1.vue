<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 180 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      :d="customPathDBottom"
      :stroke="fill[0]"
      stroke-opacity="0.3"
      :stroke-width="strokeWidth"
    />
    <path
      :d="customPathD"
      :stroke="fill[0]"
      stroke-opacity="1"
      :stroke-width="strokeWidth"
    />
    <circle cx="90" cy="90" r="66" :fill="`url(#${uuid}_paint0_radial)`" />
    <circle
      cx="90"
      cy="90"
      r="64"
      :stroke="fill[0]"
      stroke-width="4"
      stroke-dasharray="2, 4"
    />
    <defs>
      <radialGradient
        :id="`${uuid}_paint0_radial`"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(90 91.0039) rotate(90) scale(65 65.4961)"
      >
        <stop :stop-color="fill[1]" stop-opacity="0" />
        <stop offset="1" :stop-color="fill[2]" stop-opacity="0.61">
          <animate
            v-if="animate"
            attributeName="stop-opacity"
            dur="0.8s"
            repeatCount="indefinite"
            values="0.2;0.4;0.61"
          />
        </stop>
      </radialGradient>
    </defs>
  </svg>
</template>
<script lang="ts">
import { Component, Prop, Vue, VModel } from "vue-property-decorator";
import { uuid } from "@guanyu/shared";
import { d2a, formatColorStr } from "@/utils/tools";

@Component
export default class ProgressCircle extends Vue {
  /**
   * 宽度
   */
  @Prop({ default: 180 }) size!: number;

  /**
   * 边框宽度
   */
  @Prop({ default: 14 }) strokeWidth!: number;

  /**
   * 动画
   */
  @Prop({ default: false }) animate!: boolean;

  /**
   * 敞开角度
   */
  @Prop({ default: 25 }) openAngel!: number;

  /**
   * 开始角度
   */
  @Prop({ default: 90 }) startAngel!: number;

  /**
   * v-model same as value
   */
  @VModel({ type: Number }) iValue!: number;

  /**
   * 颜色
   */
  @Prop({ default: "#2A7CB2|#FE3AD3|#FE3A98" }) color!: string;

  /**
   * 填充颜色
   */
  get fill() {
    return formatColorStr(this.color, 3);
  }

  /**
   * 圆环的属性
   */
  get circle() {
    return {
      x: this.size / 2,
      y: this.size / 2,
      r: this.size / 2 - this.strokeWidth / 2,
      sAngle: this.openAngel + this.startAngel,
      eMaxAngle: 360 - this.openAngel * 2,
    };
  }

  /**
   * 用户自定义路径
   */
  get customPathD() {
    /** 最大值100，最小值0 */
    const v = Math.max(Math.min(this.iValue, 100), 0);
    const eMaxAngle = this.circle.eMaxAngle;
    return this.createPathArc(
      this.circle.x,
      this.circle.y,
      this.circle.r,
      this.circle.sAngle,
      this.circle.sAngle +
        Math.max(Math.min(eMaxAngle, v * (eMaxAngle / 100)), 0)
    );
  }

  /**
   * 轨迹
   */
  get customPathDBottom() {
    return this.createPathArc(
      this.circle.x,
      this.circle.y,
      this.circle.r,
      this.circle.sAngle,
      this.circle.sAngle + this.circle.eMaxAngle
    );
  }

  /**
   * 创建圆弧
   */
  createPathArc(
    x: number,
    y: number,
    r: number,
    sAngle: number,
    eAngle: number,
    counterclockwise = true
  ) {
    if (sAngle === 0 && eAngle === 0) {
      r = 0;
    }
    const cx = Math.cos(d2a(sAngle)) * r + x;
    const cy = Math.sin(d2a(sAngle)) * r + y;
    const cx1 = Math.cos(d2a(eAngle - 0.01)) * r + x;
    const cy1 = Math.sin(d2a(eAngle - 0.01)) * r + y;

    return `
      M${cx} ${cy}
      A${r},${r} 0 ${eAngle - sAngle < 180 ? 0 : 1}, 
      ${counterclockwise ? 1 : 0} 
      ${cx1},${cy1}
    `;
  }

  /**
   * svg 必须使用唯一id
   */
  get uuid() {
    return `__APP-PROGRESS-CIRCEL__${uuid()}`;
  }
}
</script>
<style lang="scss" scoped></style>
