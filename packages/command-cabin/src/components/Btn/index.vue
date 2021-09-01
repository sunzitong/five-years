<template>
  <div class="app-btn">
    <svg
      :width="width"
      :height="height"
      :viewBox="`0 0 ${width} ${height}`"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        :d="buttonPathD"
        :fill="`url(#${uuid}_paint0_linear)`"
        :stroke="`url(#${uuid}_paint1_linear)`"
        stroke-width="2"
      />
      <path
        d="M10.1929 0.665039H0.192871V10.665L10.1929 0.665039Z"
        fill="#01F4F0"
      />
      <path
        :d="`
          M${width - 10} ${height}
          H${width}
          V${height - 10}
          L${width - 10} ${height}
          Z`"
        fill="#01F4F0"
      />
      <line
        x1="5.97374"
        :y1="height - 70 + 58.9993"
        x2="9.97374"
        :y2="height - 70 + 63.9993"
        stroke="#01F5F1"
        stroke-width="2"
      />
      <line
        x1="7.56612"
        :y1="height - 70 + 50.9781"
        x2="18.5661"
        :y2="height - 70 + 63.9781"
        stroke="#01F5F1"
        stroke-width="2"
      />
      <line
        :x1="width - 250 + 241.304"
        y1="12.0974"
        :x2="width - 250 + 236.606"
        y2="7.07734"
        stroke="#01F5F1"
        stroke-width="2"
      />
      <line
        y1="-1"
        x2="17.0294"
        y2="-1"
        :transform="`matrix(-0.712453 -0.70172 -0.70172 0.712453 ${
          width - 10
        } 20.8535)`"
        stroke="#01F5F1"
        stroke-width="2"
      />
      <defs>
        <linearGradient
          :id="`${uuid}_paint0_linear`"
          x1="124.193"
          y1="4.21379"
          x2="124.193"
          y2="65.9289"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#02236A" />
          <stop offset="1" stop-color="#060847" />
        </linearGradient>
        <linearGradient
          :id="`${uuid}_paint1_linear`"
          :x1="width"
          y1="69.665"
          x2="0.192874"
          y2="0.665028"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#01F5F1" stop-opacity="0.1" />
          <stop offset="0.510417" stop-color="#01F5F1" stop-opacity="0.99" />
          <stop offset="1" stop-color="#01F5F1" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
    <div class="app-btn__txt">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { uuid } from "@guanyu/shared";

@Component
export default class Btn extends Vue {
  @Prop({ default: 249 }) width!: number;

  @Prop({ default: 70 }) height!: number;

  /**
   * 唯一id
   */
  get uuid() {
    return `btn-${uuid()}`;
  }

  /**
   * 按钮路径
   */
  get buttonPathD() {
    const w = this.width - 1;
    const h = this.height - 1;
    const r = 8;

    return `
      M${2 * r + 2} 1
      L${w - r} 1

      C${w - r} 1
      ${w} 1
      ${w} ${r}

      L${w} ${r}
      L${w} ${h - 2 * r - 2}
      C${w} ${h - 2 * r - 2}
      ${w} ${h - 2 * r}
      ${w - 2} ${h - 2 * r + 2}
      L${w - 2} ${h - 2 * r + 2}

      L${w - 2 * r + 2} ${h - 2}

      C${w - 2 * r + 2} ${h - 2}
      ${w - 2 * r} ${h}
      ${w - 2 * r - 2} ${h}
      
      L${w - 2 * r - 2} ${h}


      L${r} ${h}
      C${r} ${h}
      1 ${h}

      1 ${h - r}
      L1 ${h - r}

      L1 ${2 * r + 2}

      C1 ${2 * r + 2}
      1 ${2 * r}
      2 ${2 * r - 2}

      L2 ${2 * r - 2}
      L${2 * r - 2} 2

      C${2 * r - 2} 2
      ${2 * r} 1
      ${2 * r + 2} 1
      Z
    `;
    // return `
    //     M8.40437 8.86775
    //     L13.5568 3.71529
    //     C${w + 44.059} 1.66504 ${w + 47.193} 4.79905 ${w + 47.193} 8.66504
    //     V51.3513
    //     C${w + 47.193} 53.2078 ${w + 46.455} 54.9883 ${w + 45.143} 56.3011
    //     L${w + 39.986} 60.4579
    //     L${w + 34.829} 66.6148
    //     C${w + 33.516} 67.9275 ${w + 31.736} 68.665 ${w + 29.879} 68.665
    //     H8.19287
    //     C4.32688 68.665 1.19287 65.531 1.19287 61.665
    //     V19.1092
    //     C1.19287 17.2828 1.90673 15.5286 3.1821 14.2212
    //     L8.40437 8.86775
    //   Z`;
  }
}
</script>

<style lang="scss" scoped>
.app-btn {
  position: relative;
  display: inline-block;
  &__txt {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 30px;
    font-family: PingFang SC;
    color: #ffffff;
  }
  svg {
    vertical-align: middle;
  }
}
</style>
