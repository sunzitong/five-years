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
        <g :filter="`url(#${linearId}_filter0_b)`">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            :d="bodyBackgroundPath"
            :fill="fill"
            :fill-opacity="fillOpacity"
          />
          <path
            :d="outLinePath"
            :stroke="`url(#${linearId})`"
            stroke-width="2"
          />
        </g>
        <defs>
          <filter
            :id="`${linearId}_filter0_b`"
            x="-20"
            y="-19.0269"
            :width="width + 20"
            :height="height + 20"
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
            :id="linearId"
            x1="308.5"
            y1="0.973145"
            x2="308.5"
            y2="174.035"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#1B4986" />
            <stop offset="1" stop-color="#1B4986" stop-opacity="0" />
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
import { uuid } from "@guanyu/shared";
import CardDecorateTitle, {
  SizeProps,
  formatSmallSize,
} from "@/components/CardDecorate/Title.vue";

@Component({
  name: "CardDecorate",
  components: {
    CardDecorateTitle,
  },
})
export default class CardDecorate extends Vue {
  /**
   * div容器
   */
  @Ref() readonly wrapper!: HTMLDivElement;

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
  @Prop({ default: "medium" }) size!: SizeProps;

  /**
   * 背景最小宽度
   */
  MIN_WIDTH = 606;

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
    const w = (this.width - this.MIN_WIDTH) / 2 - 5;
    const h = this.height - 505;

    return d
      .replace(/{(-?\d+(\.\d+)?)}/g, (a: string, $1) => {
        // 匹配{100} 数字 * 宽度
        return `${w + parseFloat($1)}`;
      })
      .replace(/\[(-?\d+(\.\d+)?)\]/g, (a: string, $1) => {
        // 匹配[100] 数字 * 宽度
        return `${2 * w + parseFloat($1)}`;
      })
      .replace(/\((-?\d+(\.\d+)?)\)/g, (a: string, $1) => {
        // 匹配(100) 数字 * 高度
        return `${h + parseFloat($1)}`;
      });
  }

  /**
   * 控制size
   */
  formatSmallSize(d: string) {
    return formatSmallSize(d, this.size);
  }

  /**
   * 线框区域svg path d
   */
  get outLinePath() {
    return this.formatSmallSize(
      this.formatSvgPathD(`
      M10 1.97314
      H'{46.1098}'
      L'{90.5366}' 56.1835
      C'{91.9353}' 57.8903 '{94.0272}' 58.8797 '{96.2352}' 58.8797
      H'{129.433}'
      C'{133.271}' 58.8797 '{136.863}' 56.9967 '{139.042}' 53.842
      C'{140.848}' 51.2286 '{143.825}' 49.6676 '{147.006}' 49.6676
      
      H"{468.873}"
      C"{472.054}" 49.6676 "{475.031}" 51.2286 "{476.836}" 53.842
      C"{479.015}" 56.9967 "{482.608}" 58.8797 "{486.445}" 58.8797

      H"{521.25}"
      C"{523.499}" 58.8797 "{525.275}" 57.8468 "{526.739}" 56.45
      C"{528.167}" 55.0882 "{529.375}" 53.3052 "{530.494}" 51.6548
      L"{530.527}" 51.6054
      C"{531.236}" 50.5604 "{531.911}" 49.565 "{532.615}" 48.6845

      L"{565.845}" 7.10997
      L"{565.064}" 6.48562
      L"{565.845}" 7.10991

      C"{565.962}" 6.96297 "{566.079}" 6.81343 "{566.196}" 6.66147
      C"{568.33}" 3.88713 "{571.367}" 2 "{574.679}" 2

      H[606]
      C[610.972] 2 [615] 5.99679 [615] 10.9568
      V484
      C615 494.493 606.493 503 596 503
      C5.02787 503 1 498.976 1 494.016
      V10.9567
      C1 5.99678 5.02789 2 10 2
      Z`)
    );
  }

  /**
   * 内容区域svg path d
   */
  get bodyBackgroundPath() {
    return this.formatSmallSize(
      this.formatSvgPathD(`
      M'{91.31}' 55.5496
      L'{46.5832}' 0.973145
      H10

      C4.47715 0.973145 0 5.44294 0 10.9567
      V(494.016)
      C0 (499.53) 4.47713 (504) 9.99998 (504)

      H388
      H423.873
      C423.873 (504) 428.96 (504) 432.529 (504)

      H[596]
      C[607.046] (504) [616] (495.046) [616] (484)
      V10.9568
      C[616] 5.44296 [611.523] 0.973145 [606] 0.973145

      H"{574.679}"
      C"{570.968}" 0.973145 "{567.665}" 3.11062 "{565.404}" 6.05177
      C"{565.291}" 6.19896 "{565.177}" 6.34364 "{565.064}" 6.48562
      L"{531.834}" 48.0602
      C"{531.101}" 48.977 "{530.403}" 50.0063 "{529.699}" 51.0443
      C"{527.414}" 54.416 "{525.066}" 57.8797 "{521.25}" 57.8797

      H"{486.445}"
      C"{482.936}" 57.8797 "{479.651}" 56.1576 "{477.659}" 53.2736
      C"{475.667}" 50.3896 "{472.382}" 48.6676 "{468.873}" 48.6676

      H'{147.006}'
      C'{143.497}' 48.6676 '{140.212}' 50.3896 '{138.22}' 53.2736
      C'{136.227}' 56.1576 '{132.942}' 57.8797 '{129.433}' 57.8797

      H'{96.2352}'
      C'{94.3265}' 57.8797 '{92.5186}' 57.0244 '{91.31}' 55.5496
      Z`)
    );
  }

  get linearId() {
    return `__APP-CARD-DECORATE__${uuid()}`;
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

    console.log(this.wrapper);
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
  pointer-events: none;
  overflow: hidden;
  height: 100%;
  display: flex;
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
    bottom: 50px;
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
  svg {
    vertical-align: middle;
  }
}
</style>
