<template>
  <div class="app-blur-box" :style="style">
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
        <path :d="customerPathD" fill="#113069" fill-opacity="0.6" />
        <path id="a" :d="customerPathD" stroke="#1B4986" stroke-width="2" />

        <!-- <path
          transform="translate(12, 40) scale(-1, 1)"
          :d="customerTrangel"
          stroke="#1B4986"
          stroke-width="2"
        /> -->

        <defs>
          <linearGradient
            :id="`${uuid}_paint0_linear`"
            x1="0"
            y1="0"
            x2="0"
            :y2="height"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#04879B" />
            <stop offset="1" stop-color="#1B4986" />
          </linearGradient>
        </defs>
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
  get uuid() {
    return `blur-box-${uuid()}`;
  }

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
    const [sx, sy] = this.trangleX;

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

      L${x + sx} ${h - r - sy}
      ${x + sx - s} ${h - r - s / 2 - sy}
      ${x + sx} ${h - r - s - sy}

      C${x} ${r}
      ${x} ${y}
      ${x + r} ${y}
      Z
    `;
  }

  // get customerPathD() {
  //   const w = this.width - 1;
  //   const h = this.height - this.trangleSize - 1;
  //   const r = this.radius;
  //   const trangleX = this.trangleX;
  //   const trangleSize = this.trangleSize;

  //   return `
  //   M${r} 1
  //   L${w - r} 1

  //   C${w - r} 1
  //   ${w} 1
  //   ${w} ${r}

  //   L${w} ${h - r}

  //   C${w} ${h - r}
  //   ${w} ${h}
  //   ${w - r} ${h}

  //   L${trangleX} ${h}
  //   ${trangleX - trangleSize / 2} ${h + trangleSize}
  //   ${trangleX - trangleSize} ${h}

  //   L${Math.min(r, trangleSize)} ${h}
  //   C${r} ${h}
  //   ${1} ${h}
  //   ${1} ${h - r}

  //   L${1} ${h - r}
  //   L${1} ${r}

  //   C${1} ${r}
  //   1 1
  //   ${r} 1

  //   Z
  //   `;
  //   // return `
  //   // M1 6
  //   // C1 3.23858 3.23858 1 6 1
  //   // H424
  //   // C426.761 1 429 3.23858 429 6
  //   // V93
  //   // C429 95.7614 426.761 98 424 98
  //   // H67.8972
  //   // C65.4383 98 63.1598 99.2901 61.8947 101.399
  //   // L53.3575 115.627
  //   // C52.9691 116.275 52.0309 116.275 51.6425 115.627
  //   // L43.1053 101.399
  //   // C41.8402 99.2901 39.5617 98 37.1029 98
  //   // H6
  //   // C3.23858 98 1 95.7614 1 93
  //   // V6
  //   // Z
  //   // `;
  // }
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
