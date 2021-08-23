<template>
  <div class="app-card-decorate">
    <div class="app-card-decorate__header">
      <CardDecorateTitle :size="size" />
    </div>

    <div ref="wrapper" class="app-card-decorate__body">
      <svg
        :width="width"
        :height="height"
        :viewBox="`0 0 ${width} ${height}`"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_b)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            :d="bodyBackgroundPath"
            :fill="fill"
            :fill-opacity="fillOpacity"
          />
          <path
            :d="outLinePath"
            stroke="url(#paint0_linear)"
            stroke-width="2"
          />
        </g>
        <defs>
          <filter
            id="filter0_b"
            x="-19.728"
            y="-19.918"
            :width="width + 40"
            :height="1000000"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImage" stdDeviation="10" />
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
            id="paint0_linear"
            x1="295.272"
            y1="-2.01758"
            x2="295.272"
            y2="471.21"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#1B4986" />
            <stop offset="1" stop-color="#1B4986" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div class="app-card-decorate__footer">
      <svg
        width="266"
        height="60"
        viewBox="0 0 266 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28.0651 5.37634C29.7655 2.44977 32.8946 0.648926 36.2793 0.648926H245.272C256.042 0.648926 264.772 9.37937 264.772 20.1489V49.1008C264.772 54.3475 260.519 58.6008 255.272 58.6008H6.69732C2.4567 58.6008 -0.188636 54.0043 1.94175 50.3377L28.0651 5.37634Z"
          fill="#0A225D"
          stroke="url(#paint0_linear)"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="110.772"
            y1="0.148926"
            x2="110.772"
            y2="59.1008"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#1B4986" />
            <stop offset="1" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div v-if="showRectBackground" class="app-card-decorate__lattices"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref, Prop } from "vue-property-decorator";
import { ResizeObserver } from "resize-observer";
import CardDecorateTitle from "@/components/CardDecorate/Title.vue";

@Component({
  name: "WithFooter",
  components: {
    CardDecorateTitle,
  },
})
export default class WithFooter extends Vue {
  // @Prop({ default: 1000 }) width!: number;
  @Ref() wrapper!: HTMLDivElement;
  /**
   * 是否显示方格背景
   */
  @Prop({ default: true }) showRectBackground!: boolean;

  /**
   * 填充颜色
   */
  @Prop({ default: "#0A1E58" }) fill!: string;
  /**
   * 透明度
   */
  @Prop({ default: 1 }) fillOpacity!: number;

  /**
   * 尺寸
   */
  @Prop({ default: "medium" }) size!: "small" | "medium" | "large";

  /**
   * 背景最小宽度
   */
  MIN_WIDTH = 600;

  /**
   * 背景默认宽度
   */
  width = 1000;

  /**
   * 背景默认高度
   */
  height = 1000;

  /**
   * 监听器
   */
  resizeObserver: ResizeObserver | null = null;

  /**
   * 格式化svg path
   */
  formatSvgPathD(d: string) {
    const w = (this.width - this.MIN_WIDTH) / 2;

    /**
     * 220为盒子最小高度
     */
    const h = this.height - 220;

    return d
      .replace(/{(-?\d+(\.\d+)?)}/g, (str: string, $1) => {
        // 匹配{100} 数字 * 宽度
        return `${w + parseFloat($1)}`;
      })
      .replace(/\[(-?\d+(\.\d+)?)\]/g, (str: string, $1) => {
        // 匹配[100] 数字 * 宽度
        return `${2 * w + parseFloat($1)}`;
      })
      .replace(/\((-?\d+(\.\d+)?)\)/g, (str: string, $1) => {
        // 匹配(100) 数字 * 高度
        return `${h + parseFloat($1)}`;
      });
  }

  /**
   * 头部标题svg path d
   */
  get outLinePath() {
    return this.formatSvgPathD(`
      M10.272 1.08203
      H{38.3817}
      L{82.8084} 55.3113
      C{84.2072} 57.0186 {86.299} 58.0085 {88.5071} 58.0085
      H{121.705}
      C{125.543} 58.0085 {129.135} 56.1247 {131.314} 52.969
      C{133.12} 50.3547 {136.097} 48.7931 {139.278} 48.7931
      H{460.145}
      C{463.326} 48.7931 {466.303} 50.3547 {468.108} 52.969
      C{470.287} 56.1247 {473.88} 58.0085 {477.717} 58.0085
      H{512.522}
      C{514.771} 58.0085 {516.547} 56.9751 {518.011} 55.5779
      C{519.438} 54.216 {520.647} 52.4328 {521.765} 50.7821
      L{521.799} 50.7316
      C{522.508} 49.6863 {523.183} 48.6905 {523.887} 47.8097
      L{557.117} 6.22065
      C{557.234} 6.07349 {557.352} 5.9237 {557.469} 5.77147
      C{559.602} 2.9965 {562.639} 1.08203 {565.952} 1.08203
      H[590.272]
      C[595.244] 1.08203 [599.272] 5.1069 [599.272] 10.0691
      V132.187
      C[599.272] 142.681 [590.765] 151.187 [580.272] 151.187
      H{364.801}
      C{360.875} 151.187 {357.246} 153.277 {355.28} 156.672
      L{322.296} 213.612
      C{320.686} 216.39 {317.719} 218.101 {314.508} 218.101
      H10.2719
      C5.30017 218.101 1.27197 214.076 1.27197 209.114
      V10.0691
      C1.27197 5.10689 5.30019 1.08203 10.272 1.08203
      Z`);
  }

  /**
   * 内容区域svg path d
   */
  get bodyBackgroundPath() {
    return this.formatSvgPathD(`
      M{83.582} 54.6775
      L{38.8552} 0.0820312
      H10.272
      C4.74913 0.0820312 0.271973 4.55339 0.271973 10.0691
      V(209.114)
      C0.271973 (214.629) 4.7491 (219.101) 10.2719 (219.101)
      H[314.508]
      C[318.076] (219.101) [321.373] (217.2) [323.161] (214.113)
      L[356.145] (157.173)
      C[357.933] (154.088) [361.232] (152.187) [364.801] (152.187)
      H[580.272]
      C[591.318] (152.187) [600.272] (143.233) [600.272] (132.187)
      V10.0691
      C[600.272] 4.55341 [595.795] 0.0820312 [590.272] 0.0820312
      H{565.952}
      C{562.241} 0.0820312 {558.938} 2.22004 {556.676} 5.16202
      C{556.563} 5.3094 {556.449} 5.45427 {556.336} 5.59643
      L{523.106} 47.1855
      C{522.373} 48.1026 {521.675} 49.1323 {520.971} 50.1707
      C{518.686} 53.5435 {516.338} 57.0085 {512.522} 57.0085
      H{477.717}
      C{474.208} 57.0085 {470.923} 55.2858 {468.931} 52.4008
      C{466.939} 49.5158 {463.654} 47.7931 {460.145} 47.7931
      H{139.278}
      C{135.769} 47.7931 {132.484} 49.5158 {130.492} 52.4008
      C{128.499} 55.2858 {125.214} 57.0085 {121.705} 57.0085
      H{88.5071}
      C{86.5985} 57.0085 {84.7906} 56.1529 {83.582} 54.6775
      Z`);
  }

  /**
   * 更新背景区域宽、高度
   */
  divSizeChangeHandle() {
    // const dom = this.wrapper.getBoundingClientRect();
    const dom = window.getComputedStyle(this.wrapper);
    this.width = parseInt(dom.width);
    this.height = parseInt(dom.height);
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
  }

  /**
   * 组件卸载移出监听
   */
  beforeDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.wrapper);
    }
    this.resizeObserver = null;
  }
}
</script>

<style lang="scss" scoped>
.app-card-decorate {
  position: absolute;
  text-align: center;
  height: 100%;
  display: flex;
  min-width: 606px;
  top: 0;
  left: 0;
  right: 0;
  &__header {
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -258px;
    svg {
      margin-left: -2px;
    }
  }
  &__body {
    position: absolute;
    margin-top: auto;
    top: 25px;
    left: 0;
    right: 0;
    bottom: 0;
  }
  &__lattices {
    position: absolute;
    top: 120px;
    left: 20px;
    right: 20px;
    bottom: 100px;
    opacity: 0.8;
    background-size: 100% 100%, 62px 62px;
    background-repeat: no-repeat, repeat;
    background-position: -2px -2px;
    background-image: linear-gradient(
        0,
        rgba(5, 71, 143, 0.04) 0%,
        rgba(1, 77, 159, 0.4) 50%,
        rgba(5, 71, 143, 0.04) 80%
      ),
      url("~@/assets/img/box-lattices.png");
  }
  &__footer {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  svg {
    vertical-align: middle;
  }
}
</style>
