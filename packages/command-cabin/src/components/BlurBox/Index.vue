<template>
  <div class="app-blue-box" :style="style">
    <div class="app-blue-box__background">
      <svg
        :width="width"
        :height="height"
        :viewBox="`0 0 ${width} ${height}`"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g :filter="`url(#${uuid}_filter0_b)`">
          <path :d="customerPathD" fill="#113069" fill-opacity="0.6" />
          <path
            :d="customerPathD"
            :stroke="`url(#${uuid}_paint0_linear)`"
            stroke-width="2"
          />
        </g>
        <defs>
          <filter
            :id="`${uuid}_filter0_b`"
            x="-14"
            y="-14"
            width="458"
            height="145.113"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImage" stdDeviation="7" />
            <feComposite
              in2="SourceAlpha"
              operator="in"
              result="effect1_backgroundBlur"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_backgroundBlur"
              result="shape"
            />
          </filter>
          <linearGradient
            :id="`${uuid}_paint0_linear`"
            x1="258.935"
            y1="-80"
            x2="258.935"
            y2="98.9999"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#04879B" />
            <stop offset="1" stop-color="#1B4986" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <slot></slot>
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
  @Prop({ default: 100 }) trangleX!: number;

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

  /**
   * 自定义路径
   */
  get customerPathD() {
    const w = this.width;
    const h = this.height - this.trangleSize;
    const r = this.radius;
    const trangleX = this.trangleX;
    const trangleSize = this.trangleSize;

    return `
    M${r} 1
    L${w - r} 1 

    C${w - r} 1 
    ${w} 1 
    ${w} ${r}

    L${w} ${h - r}

    C${w} ${h - r}
    ${w} ${h}
    ${w - r} ${h}

    L${trangleX} ${h}
    ${trangleX - trangleSize / 2} ${h + trangleSize}
    ${trangleX - trangleSize} ${h}
    
    L${Math.min(r, trangleSize)} ${h}
    C${r} ${h}
    ${1} ${h}
    ${1} ${h - r}

    L${1} ${h - r}
    L${1} ${r}

    C${1} ${r}
    1 1
    ${r} 1
    
    Z
    `;
    // return `
    // M1 6
    // C1 3.23858 3.23858 1 6 1
    // H424
    // C426.761 1 429 3.23858 429 6
    // V93
    // C429 95.7614 426.761 98 424 98
    // H67.8972
    // C65.4383 98 63.1598 99.2901 61.8947 101.399
    // L53.3575 115.627
    // C52.9691 116.275 52.0309 116.275 51.6425 115.627
    // L43.1053 101.399
    // C41.8402 99.2901 39.5617 98 37.1029 98
    // H6
    // C3.23858 98 1 95.7614 1 93
    // V6
    // Z
    // `;
  }
}
</script>

<style lang="scss" scoped>
.app-blue-box {
}
</style>
