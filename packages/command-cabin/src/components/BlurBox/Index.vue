<template>
  <div class="app-blur-box" :style="style" v-if="width && height">
    <div class="app-blur-box__background">
      <div
        class="app-blur-box__backdrop"
        :style="`left: ${this.trangleSize}px`"
      ></div>
      <svg
        :width="width"
        :height="height"
        :viewBox="`0 0 ${width} ${height}`"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path :d="customerPathD" :fill="fill" fill-opacity="0.6" />
        <path id="a" :d="customerPathD" :stroke="stroke" stroke-width="2" />
      </svg>
      <div class="app-blur-box__content" :style="`left:${trangleSize}px`">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { uuid } from "@guanyu/shared";
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class BlurBox extends Vue {
  /**
   * 盒子圆角
   */
  @Prop({ default: 5 }) radius!: number;

  /**
   * 边框颜色
   */
  @Prop({ default: "#1B4986" }) stroke!: string;

  /**
   * 背景颜色
   */
  @Prop({ default: "#113069" }) fill!: string;

  /**
   * 宽度
   */
  @Prop({ default: 300 }) width!: number;

  /**
   * 高度
   */
  @Prop({ default: 60 }) height!: number;

  /**
   * 三角的大小
   */
  @Prop({ default: 10 }) trangleSize!: number;

  /**
   * 三角距左的距离
   */
  @Prop({ default: () => [0, 22] }) trangleX!: number[];

  /**
   * 容器宽高
   */
  get style() {
    return {
      width: `${this.width}px`,
      height: `${this.height}px`,
    };
  }

  /**
   * 唯一id
   */
  uuid = `blur-box-${uuid()}`;

  get customerTrangel() {
    const t = this.trangleSize;
    return `
      M${0} ${t / 2}
      L${t} ${t}
      ${0} ${t + t / 2}
    `;
  }

  /**
   * 自定义路径
   */
  get customerPathD() {
    const r = this.radius;
    const w = this.width - 1;
    const h = this.height - 1;
    const x = 1 + this.trangleSize;
    const y = 1;
    const s = this.trangleSize;
    const [, sy] = this.trangleX;

    return `
      M${x + r} ${y}

      L${w - r} ${y}

      C${w - r} ${y}
      ${w} ${y}
      ${w} ${y + r}

      L${w} ${h - r}

      C${w} ${h - r}
      ${w} ${h}
      ${w - r} ${h}

      L${x + r} ${h}

      C${x + r} ${h}
      ${x} ${h}
      ${x} ${h - r}

      L${x} ${h - r - sy}
      ${x - s} ${h - r - s / 2 - sy}
      ${x} ${h - r - s - sy}

      L${x} ${r}
      C${x} ${r}
      ${x} ${y}
      ${x + r} ${y}
      Z
    `;
  }
}
</script>

<style lang="scss" scoped>
.app-blur-box {
  &__background {
    position: relative;
    svg {
      position: relative;
      vertical-align: middle;
    }
  }
  &__backdrop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(20px);
  }

  &__content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
}
</style>
