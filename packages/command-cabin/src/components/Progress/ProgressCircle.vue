<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 180 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      :d="customPathD"
      :stroke="fill[0]"
      stroke-opacity="0.3"
      stroke-width="14"
    />
    <path :d="customPathD" :stroke="fill[0]" :stroke-width="strokeWidth">
      <animate attributeName="d" dur="0.8s" repeatCount="indefinite" />
    </path>
    <ellipse
      cx="90"
      cy="91.0039"
      rx="65.4961"
      ry="65"
      transform="rotate(-90 90 91.0039)"
      :fill="`url(#${uuid}_paint0_radial)`"
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
import { formatColorStr } from "@/utils/tools";

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
   * 用户自定义路径
   */
  get customPathD() {
    console.log(this.progress);
    const r = 90 - this.strokeWidth / 2;
    const d2a = (n: number) => {
      return (n / Math.PI) * 180;
    };

    console.log(r, this.iValue);
    const ex = r * Math.sin(d2a(this.iValue)) + r;
    const ey = r * Math.cos(d2a(this.iValue)) + r;

    console.log(ex, ey);

    return `M90 90 a${r},${r} 0 1,1 130,163`;
    // return `M50 163 a${r},${r} 0 1,1 130,163`;
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
