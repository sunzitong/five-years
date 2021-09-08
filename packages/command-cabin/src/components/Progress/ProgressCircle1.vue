<template>
  <div>
    <svg
      :width="size"
      :height="size"
      :viewBox="`0 0 ${size} ${size}`"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        :d="customPathDBottom"
        :stroke="fill[0]"
        stroke-opacity="0.3"
        :stroke-width="strokeWidth"
        :stroke-linecap="strokeLine"
      />
      <path
        :d="customPathD"
        :stroke="fill[0]"
        stroke-opacity="1"
        y
        :stroke-width="strokeWidth"
        :stroke-linecap="strokeLine"
      />
      <circle
        :cx="circle.x"
        :cy="circle.y"
        r="66"
        :fill="`url(#${uuid}_paint0_radial)`"
      />
      <circle
        :cx="circle.x"
        :cy="circle.y"
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
          :gradientTransform="`translate(${circle.x} ${circle.y}) rotate(90) scale(66)`"
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
    {{ a }}
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, VModel, Watch } from "vue-property-decorator";
import { uuid } from "@guanyu/shared";
import { d2a, formatColors } from "@/utils/tools";
import { gsap } from "gsap";

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
   * 线条末尾形状
   */
  @Prop({ default: 25 }) strokeLine!: "rect" | "round";

  /**
   * 动画
   */
  @Prop({ default: false }) animate!: boolean;

  /**
   * 敞开角度
   */
  @Prop({ default: () => 25 }) openAngel!: number | number[];

  /**
   * 开始角度
   */
  @Prop({ default: 90 }) startAngel!: number;

  /**
   * 开始角度
   */
  @Prop({ default: true }) clockwise!: boolean;

  /**
   * v-model same as value
   */
  @VModel({ type: Number }) iValue!: number;

  /**
   * 颜色
   */
  @Prop({ default: "#2A7CB2|#FE3AD3|#FE3A98" }) color!: string | string[];

  a = 0;

  /**
   * 填充颜色
   */
  get fill() {
    return formatColors(this.color, 3);
  }

  /**
   * 圆环的属性
   */
  get circle() {
    const circle = {
      x: this.size / 2,
      y: this.size / 2,
      r: this.size / 2 - this.strokeWidth,
      sAngle: 0,
      eMaxAngle: 360,
      clockwise: this.clockwise,
    };

    if (typeof this.openAngel === "number") {
      circle.sAngle = this.openAngel + this.startAngel;
      circle.eMaxAngle = 360 - this.openAngel * 2;
    }

    if (Array.isArray(this.openAngel) && this.openAngel.length === 2) {
      circle.sAngle = this.openAngel[0] + this.startAngel;
      circle.eMaxAngle = 360 - (this.openAngel[0] + this.openAngel[1]);
    }

    console.log("circle", circle);

    return circle;
  }

  @Watch("iValue", { immediate: true })
  onchange(v: number) {
    gsap.to(this, { duration: 0.4, a: v });
  }

  /**
   * 用户自定义路径
   */
  get customPathD() {
    /** 最大值100，最小值0 */
    const v = Math.max(Math.min(this.a, 100), 0);
    const eMaxAngle = this.circle.eMaxAngle;
    return this.createPathArc(
      this.circle.x,
      this.circle.y,
      this.circle.r,
      this.circle.sAngle,
      this.circle.sAngle +
        Math.max(Math.min(eMaxAngle, v * (eMaxAngle / 100)), 0),
      this.circle.clockwise
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
      this.circle.sAngle + this.circle.eMaxAngle,
      this.circle.clockwise
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
    clockwise = true
  ) {
    if (sAngle === 0 && eAngle === 0) {
      r = 0;
    }

    const sA = clockwise ? sAngle : 360 - sAngle;
    const eA = clockwise ? eAngle : 360 - eAngle;

    console.log("this.circle.clockwise", clockwise);
    const cx = Math.cos(d2a(sA)) * r + x;
    const cy = Math.sin(d2a(sA)) * r + y;
    const cx1 = Math.cos(d2a(eA - 0.01)) * r + x;
    const cy1 = Math.sin(d2a(eA - 0.01)) * r + y;

    return `
      M${cx} ${cy}
      A${r},${r} 0 ${eAngle - sAngle < 180 ? 0 : 1},
      ${clockwise ? 1 : 0}
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
