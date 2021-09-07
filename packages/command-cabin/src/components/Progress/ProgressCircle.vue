<template>
  <div
    class="progress-circle"
    :class="`progress-circle--${styleType}`"
    :style="{ height: size + 'px' }"
  >
    <!-- 中间内容 -->
    <svg
      :width="size * 0.6"
      :height="size * 0.6"
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="progress-circle__inner"
    >
      <ellipse
        cx="90"
        cy="90"
        rx="66"
        ry="66"
        :fill="`url(#${uuid}_paint0_radial)`"
      />
      <defs>
        <radialGradient
          :id="`${uuid}_paint0_radial`"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(90 90) rotate(0) scale(66 66)"
        >
          <template v-if="warning">
            <stop stop-color="#FE3AD3" stop-opacity="0" />
            <stop offset="1" stop-color="#FE3A98" stop-opacity="0.6">
              <animate
                attributeName="stop-opacity"
                dur="0.8s"
                repeatCount="indefinite"
                values="0.4;0.6;0.2"
              />
            </stop>
          </template>
          <template v-else-if="primary">
            <stop stop-color="#14437F" stop-opacity="1" />
          </template>
        </radialGradient>
      </defs>
    </svg>
    <!-- 圈层动画 -->
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 420 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="progress-circle__outer"
    >
      <!-- 外圈刻度 -->
      <ellipse
        cx="210"
        cy="210"
        rx="158"
        ry="158"
        stroke="rgba(30, 130, 177, 0.4)"
        stroke-width="8"
        stroke-dasharray="4 5"
        v-if="styleConfig.showDial"
      >
        <animateTransform
          attributeName="transform"
          from="0 210 210"
          to="360 210 210"
          type="rotate"
          dur="180s"
          repeatCount="indefinite"
        />
      </ellipse>
      <!-- 内圈刻度 -->
      <ellipse
        cx="210"
        cy="210"
        rx="88"
        ry="88"
        stroke="#49C3FD"
        stroke-width="6"
        stroke-dasharray="3 5"
        v-if="styleConfig.showDial"
      >
        <animateTransform
          attributeName="transform"
          from="360 210 210"
          to="0 210 210"
          type="rotate"
          dur="180s"
          repeatCount="indefinite"
        />
      </ellipse>

      <!-- 外圈线条 -->
      <circle
        cx="210"
        cy="210"
        :r="styleConfig.borderR[2]"
        transform="rotate(90 210 210)"
        :stroke="`url(#${uuid}_paint1_linear)`"
        stroke-width="3"
        stroke-linejoin="round"
      >
        <animateTransform
          attributeName="transform"
          from="0 210 210"
          to="360 210 210"
          type="rotate"
          dur="5s"
          repeatCount="indefinite"
        />
      </circle>
      <!-- 中圈线条 -->
      <circle
        cx="210"
        cy="210"
        :r="styleConfig.borderR[1]"
        :stroke="`url(#${uuid}_paint0_linear)`"
        stroke-width="3"
        stroke-linejoin="round"
      >
        <animateTransform
          attributeName="transform"
          from="360 210 210"
          to="0 210 210"
          type="rotate"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <!-- 内圈线条 -->
      <circle
        cx="210"
        cy="210"
        :r="styleConfig.borderR[0]"
        transform="rotate(30 210 210)"
        :stroke="`url(#${uuid}_paint2_linear)`"
        stroke-width="3"
        stroke-linejoin="round"
      >
        <animateTransform
          attributeName="transform"
          from="0 210 210"
          to="360 210 210"
          type="rotate"
          dur="3s"
          repeatCount="indefinite"
        />
        <!-- <animate
          attributeName="opacity"
          values="0.5;1;0.5"
          dur="2s"
          repeatCount="indefinite"
        /> -->
      </circle>
      <defs>
        <linearGradient
          :id="`${uuid}_paint0_linear`"
          x1="402.022"
          y1="212.732"
          x2="18.8499"
          y2="212.732"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#49C3FD" />
          <stop offset="0.242216" stop-color="#49C3FD" stop-opacity="0" />
          <stop offset="0.595904" stop-color="#49C3FD" stop-opacity="0" />
          <stop offset="0.844796" stop-color="#49C3FD" stop-opacity="0" />
          <stop offset="1" stop-color="#49C3FD" />
        </linearGradient>
        <linearGradient
          :id="`${uuid}_paint1_linear`"
          x1="410.705"
          y1="125.925"
          x2="47.2051"
          y2="381.925"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#49C3FD" />
          <stop offset="0.242216" stop-color="#49C3FD" stop-opacity="0" />
          <stop offset="0.595904" stop-color="#49C3FD" stop-opacity="0" />
          <stop offset="0.844796" stop-color="#49C3FD" stop-opacity="0" />
          <stop offset="1" stop-color="#49C3FD" />
        </linearGradient>
        <linearGradient
          :id="`${uuid}_paint2_linear`"
          x1="212.336"
          y1="38.0557"
          x2="212.336"
          y2="383.539"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#49C3FD" />
          <stop offset="0.242216" stop-color="#49C3FD" stop-opacity="0" />
          <stop offset="0.595904" stop-color="#49C3FD" stop-opacity="0" />
          <stop offset="0.844796" stop-color="#49C3FD" stop-opacity="0" />
          <stop offset="1" stop-color="#49C3FD" />
        </linearGradient>
      </defs>
    </svg>
    <!-- 轨道 -->
    <van-circle
      layer-color="rgba(0,0,0,0)"
      class="progress-circle__chart"
      v-bind="styleConfig.vantProps[0]"
    />
    <!-- 进度 -->
    <van-circle
      v-model="currentRate"
      :rate="realRate"
      layer-color="rgba(0,0,0,0)"
      :speed="50"
      class="progress-circle__chart"
      v-bind="styleConfig.vantProps[1]"
    />
    <div class="progress-circle__text">
      <slot :value="calcCurrentRate(currentRate)"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { iwant, uuid } from "@guanyu/shared";
// "#2A7CB2|#FE3AD3|#FE3A98"
@Component
export default class ProgressCircle extends Vue {
  /**
   * 进度 0 - 100
   */
  @Prop({ default: 0 }) rate!: number;
  /**
   * 渲染进度(按比例计算)
   */
  get realRate() {
    if (this.arc) return this.rate * 0.8;
    return this.rate;
  }
  @Watch("rate")
  rateChanged() {
    this.currentRate = 0;
  }
  /**
   * v-model实时进度(vant提供)
   */
  currentRate = 0;
  /**
   * slot实时进度(反向计算提供给调用方)
   */
  calcCurrentRate() {
    if (this.arc) return iwant.calc(this.currentRate / 0.8, 1);
    return this.currentRate;
  }

  /**
   * 宽度
   */
  @Prop({ default: 200 }) size!: number;
  /**
   * 进度条颜色
   */
  @Prop({ default: "#57A6FB" }) color!: string;
  /**
   * 进度条端口风格
   */
  @Prop({ default: "butt" }) strokeLinecap!: "butt" | "round";
  /**
   * 进度条宽度
   */
  @Prop({ default: 100 }) strokeWidth!: number;
  /**
   * 进度条大小
   */
  @Prop({ default: 100 }) strokeSize!: number;
  /**
   * false: 仪表盘风格
   * true: 进度条风格
   */
  @Prop({ default: true }) arc!: boolean;
  /**
   * 顺时针转
   */
  @Prop({ default: true }) clockwise!: boolean;
  /**
   * 显示风格
   */
  @Prop({ default: 3, type: Number }) styleType!: number;
  /**
   * 样式配置
   */
  get styleConfig() {
    const vantProps = [
      {
        value: this.arc ? 80 : 100,
        color: "#14437F",
        size: this.strokeSize,
        strokeLinecap: this.strokeLinecap,
        strokeWidth: this.strokeWidth,
        style: this.arc ? `transform: rotate(216deg)` : null,
      },
      {
        color: this.color,
        size: this.strokeSize,
        strokeLinecap: this.strokeLinecap,
        strokeWidth: this.strokeWidth,
        style: this.arc
          ? `transform: rotate(${this.clockwise ? "+" : "-"}216deg)`
          : null,
        clockwise: this.clockwise,
      },
    ];
    if (this.styleType === 1) {
      return { vantProps, borderR: [] };
    }
    if (this.styleType === 2) {
      return { vantProps, borderR: [172, 190, 208] };
    }
    if (this.styleType === 3) {
      return { vantProps, borderR: [170, 180, 190], showDial: true };
    }
    return { vantProps };
  }

  /**
   * 警告
   */
  @Prop({ default: false, type: Boolean }) warning!: boolean;
  /**
   * 内容填充
   */
  @Prop({ default: false, type: Boolean }) primary!: boolean;

  /**
   * svg 必须使用唯一id
   */
  get uuid() {
    return `__APP-PROGRESS-CIRCEL__${uuid()}`;
  }
}
</script>
<style lang="scss" scoped>
.progress-circle {
  position: relative;
  width: 100%;
  &__outer,
  &__inner,
  &__text,
  &__chart {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }
  &__text {
    @extend %flex-center;
    text-align: center;
  }
}
</style>
