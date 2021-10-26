<template>
  <div ref="wrapper" class="app-subwrapper-a">
    <div class="app-subwrapper-a__background">
      <svg
        v-if="width && height"
        :width="width"
        :height="height"
        :viewBox="`0 0 ${width} ${height}`"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          :d="`
            M98.9648 34.7478
            L${titleRect.w}.18 34.7478
            L${titleRect.w + 48}.21 97.2938
            H49.9365
            L98.9648 34.7478
            Z`"
          fill="#193497"
          fill-opacity="0.3"
        />
        <g>
          <path
            :id="`${uuid}`"
            d="M98.6597 34.7478H104.306L56.4922 97.2938H49.9365L98.6597 34.7478Z"
            :fill="`url(#${uuid}_paint0_linear)`"
            fill-opacity="0.5"
          />
          <use
            v-for="item in titleRect.repeat"
            :key="item"
            :xlink:href="`#${uuid}`"
            :transform="`translate(${item * 10}, 0)`"
          />
        </g>
        <line
          y1="-1"
          x2="76.5285"
          y2="-1"
          :transform="`
            matrix(0.616927 0.787021 -0.616927 0.787021 ${
              titleRect.w + 5
            } 44.0656)`"
          :stroke="`url(#${uuid}_paint156_linear)`"
          stroke-width="2"
        />
        <path :d="customTitlePathD" :fill="`url(#${uuid}_paint157_linear)`" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          :d="customPathD"
          :fill="`url(#${uuid}_${strokeId})`"
        />
        <defs>
          <linearGradient
            :id="`${uuid}_paint0_linear`"
            x1="49.9365"
            y1="97.2938"
            x2="1755.42"
            y2="97.2938"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#152A78" />
            <stop offset="1" stop-color="#0E1740" />
          </linearGradient>
          <linearGradient
            :id="`${uuid}_paint156_linear`"
            x1="0"
            y1="0"
            x2="56.3448"
            y2="26.085"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#193497" stop-opacity="0" />
            <stop offset="1" stop-color="#193497" />
          </linearGradient>
          <linearGradient
            :id="`${uuid}_paint157_linear`"
            :x1="titleRect.w / 2"
            y1="34.7478"
            :x2="titleRect.w"
            y2="34.7478"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#5180E4" />
            <stop offset="0.936398" stop-color="#193497" stop-opacity="0" />
          </linearGradient>
          <!-- 边框填充色 -->
          <linearGradient
            :id="`${uuid}_stroke_linear`"
            x1="63.9813"
            y1="34.7478"
            x2="-21.9916"
            y2="135.996"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#5180E4" />
            <stop offset="1" stop-color="#4F7EE1" />
          </linearGradient>
          <!-- 边框填充渐变色 -->
          <linearGradient
            :id="`${uuid}_stroke_linear_opacity`"
            x2="0"
            y2="0"
            x1="0"
            :y1="height * 0.8"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#5180E4" stop-opacity="0" />
            <stop offset="1" stop-color="#4F7EE1" />
          </linearGradient>

          <linearGradient
            :id="`bbbb`"
            x1="63.9813"
            y1="34.7478"
            x2="-21.9916"
            y2="135.996"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#5180E4" />
            <stop offset="1" stop-color="#4F7EE1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div ref="header" class="app-subwrapper-a__header">
      <slot name="title">
        <div class="app-subwrapper-a__title">{{ title }}</div>
      </slot>
    </div>
    <div class="app-subwrapper-a__body">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import { ResizeObserver } from "resize-observer";
// import { sample } from "lodash";
import { uuid } from "@guanyu/shared";

@Component
export default class SubWrapperA extends Vue {
  /**
   * 盒子
   */
  @Ref() wrapper!: HTMLDivElement;

  /**
   * 标题
   */
  @Ref() header!: HTMLDivElement;
  /**
   * 标题
   */
  @Prop({ default: "" }) title!: string;

  /**
   * 尺寸
   */
  @Prop({ default: "medium" }) size!: "small" | "medium" | "large";

  /**
   * 样式分为两种
   * 1. 渐变
   * 2. 半透明到实色
   */
  @Prop({ default: "default" }) type!: "default" | "A";

  /**
   * 盒子宽度
   */
  width = 1760;

  /**
   * 盒子高度
   */
  height = 1000;

  /**
   * 标题距左侧距离
   */
  titleRight = 415;

  /**
   * 监听器
   */
  resizeObserver: ResizeObserver | null = null;

  /**
   * 填充id
   */
  get strokeId() {
    if (this.type === "A") {
      return `stroke_linear_opacity`;
    }
    return `stroke_linear`;
  }

  uuid = `${uuid()}`;
  /**
   * 标题尺寸
   */
  get titleRect() {
    const rect = {
      x: this.titleRight,
      repeat: 160,
      w: 1709,
    };

    if (this.size === "small") {
      rect.w = 750;
      rect.repeat = 65;
    }

    return rect;
  }

  /**
   * 标题的path
   */
  get customTitlePathD() {
    const L = this.titleRect.x;
    const W = this.titleRect.w;
    return `
      M${L} 34.7478
      H${W}.64
      L${W}.71 46.3304
      H${L - 10}
      L${L} 34.7478
      Z
    `;
  }

  /**
   * 外框Path
   */
  get customPathD() {
    const W = this.width - 2;
    const H = this.height - 2;

    return `
        M127.859 34.7478
        H59.8495
        V34.7543L0 110.779
        L0.0276766 110.852
        H0
        V154.048
        L0 ${H + 2}
        V${H + 2}
        H2692.78
        V${H + 2}
        H${W + 2}
        L${W + 2} 94.2392
        V92.2406
        H${this.titleRect.w + 45}.12
        V94.2392
        H${W}
        L${W} ${H}
        H5.44783
        V154.048
        L5.44687 146.004
        L38.5659 103.933
        H${W}
        V101.627
        H40.3814
        L84.4155 45.6916
        H118.961
        L127.859 34.7478
        Z
        M81.848 45.6916
        H64.0757
        L5.44687 120.166
        V142.742
        L81.848 45.6916
      Z`;
  }

  /**
   * 更新背景区域宽、高度
   */
  divSizeChangeHandle() {
    if (!this.header) return;
    /**
     * 设置标题
     */
    const header = window.getComputedStyle(this.header);
    this.titleRight = parseInt(header.left) + parseInt(header.width) + 25;

    /**
     * 设置宽高
     */
    const wrapper = window.getComputedStyle(this.wrapper);
    this.width = parseInt(wrapper.width);
    this.height = Math.max(parseInt(wrapper.height), 150);
  }

  /**
   * 组件挂载
   */
  mounted() {
    this.divSizeChangeHandle();

    /**
     * 监听容器尺寸变化
     */
    this.resizeObserver = new ResizeObserver(this.divSizeChangeHandle);
    this.resizeObserver.observe(this.wrapper);
    this.resizeObserver.observe(this.header);
  }

  /**
   * 组件卸载移出监听
   */
  beforeDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.observe(this.wrapper);
      this.resizeObserver.unobserve(this.header);
    }
    this.resizeObserver = null;
  }
}
</script>

<style lang="scss" scoped>
.app-subwrapper-a {
  position: relative;
  svg {
    vertical-align: middle;
  }
  &__header {
    position: absolute;
    top: 0;
    left: 140px;
    line-height: 1;
  }

  &__title {
    font-size: 60px;
    color: #fff;
  }

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  &__extra {
    position: absolute;
    right: 40px;
    top: 50%;
    color: #fff;
    transform: translateY(-50%);
    font-size: 26px;
    display: flex;

    a {
      color: #fff;
    }
  }

  &__body {
    overflow: hidden;
    padding: 129px 26px 26px 26px;
    // background: linear-gradient(
    //   180deg,
    //   rgba(1, 22, 86, 0.5) 0%,
    //   rgba(1, 22, 86, 0.61) 100%
    // );
  }
}
</style>
