<template>
  <div class="app-btn" v-on="$listeners">
    <svg
      :width="rect.width"
      :height="rect.height"
      :viewBox="`0 0 ${rect.width} ${rect.height}`"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        :id="`${uuid}_curve`"
        :d="buttonPathD"
        :fill="`url(#${uuid}_paint0_linear)`"
        :stroke="`url(#${uuid}_paint1_linear)`"
        :fill-opacity="animate ? 1 : 0.1"
        stroke-width="2"
      />
      <path
        d="M10.1929 0.665039H0.192871V10.665L10.1929 0.665039Z"
        fill="#01F4F0"
      />
      <path
        :d="`
          M${rect.width - 10} ${rect.height}
          H${rect.width}
          V${rect.height - 10}
          L${rect.width - 10} ${rect.height}
          Z`"
        fill="#01F4F0"
      />
      <rect
        v-if="animate"
        x="0"
        y="-1"
        height="2"
        width="30"
        :fill="`url(#${uuid}_paint1_linear2)`"
      >
        <animateMotion dur="4s" rotate="auto" repeatCount="indefinite">
          <mpath :xlink:href="`#${uuid}_curve`" />
        </animateMotion>
      </rect>
      <line
        x1="5.97374"
        :y1="rect.height - 70 + 58.9993"
        x2="9.97374"
        :y2="rect.height - 70 + 63.9993"
        stroke="#01F5F1"
        stroke-width="2"
      />
      <line
        x1="7.56612"
        :y1="rect.height - 70 + 50.9781"
        x2="18.5661"
        :y2="rect.height - 70 + 63.9781"
        stroke="#01F5F1"
        stroke-width="2"
      />
      <line
        :x1="rect.width - 250 + 241.304"
        y1="12.0974"
        :x2="rect.width - 250 + 236.606"
        y2="7.07734"
        stroke="#01F5F1"
        stroke-width="2"
      />
      <line
        y1="-1"
        x2="17.0294"
        y2="-1"
        :transform="`matrix(-0.712453 -0.70172 -0.70172 0.712453 ${
          rect.width - 10
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
          v-if="animate"
          :id="`${uuid}_paint1_linear2`"
          x1="0"
          y1="0"
          x2="50"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#01F5F1" stop-opacity="0.1" />
          <stop offset="0.510417" stop-color="#01F5F1" stop-opacity="0.99" />
          <stop offset="1" stop-color="#01F5F1" stop-opacity="0"></stop>
        </linearGradient>
        <linearGradient
          :id="`${uuid}_paint1_linear`"
          :x1="rect.width"
          y1="69.665"
          x2="0.192874"
          y2="0.665028"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#01F5F1" stop-opacity="0.1" />
          <stop offset="0.510417" stop-color="#01F5F1" stop-opacity="0.99" />
          <stop offset="1" stop-color="#01F5F1" stop-opacity="0"></stop>
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
  @Prop({ default: "medium" }) size!: number | "medium" | "small" | "large";

  /**
   * 执行动画
   */
  @Prop({ default: false }) animate!: boolean;

  get rect() {
    const map = {
      large: { width: 249, height: 70 },
      medium: { width: 249, height: 70 },
      small: { width: 249, height: 70 },
    };

    if (map[this.size]) {
      return map[this.size];
    }

    if (typeof this.size === "number") {
      return {
        width: this.size,
        height: (this.size * 70) / 249,
      };
    }

    return map.medium;
  }

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
    const w = this.rect.width - 1;
    const h = this.rect.height - 1;
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
    cursor: pointer;
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
    > a {
      color: #ffffff;
    }
  }
  > svg {
    vertical-align: middle;
  }
}
</style>
