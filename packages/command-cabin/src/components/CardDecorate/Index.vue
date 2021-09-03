<template>
  <div class="app-card-decorate" :class="cls">
    <div class="app-card-decorate__header" v-if="showHeader">
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
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          :d="customerD"
          :fill="fill"
          :fill-opacity="fillOpacity"
        />
        <path :stroke="`url(#${uuid})`" stroke-width="2" :d="customerD" />
        <defs>
          <linearGradient
            :id="uuid"
            x1="0"
            y1="0"
            x2="0"
            y2="150"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#1b3b6e" stop-opacity="1" />
            <stop offset="1" stop-color="#1b3b6e" :stop-opacity="stopOpacity" />
          </linearGradient>
        </defs>
        <!-- <ellipse
          cx="7"
          cy="-5"
          rx="20"
          ry="14"
          fill="#aaa"
          stroke="#666"
          stroke-width="2"
          opacity=".8"
        >
          <animateMotion dur="2s" rotate="auto" repeatCount="indefinite">
            <mpath :xlink:href="`#${uuid}_1`" />
          </animateMotion>
        </ellipse> -->
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
  @Prop({ default: false }) showRectBackground!: boolean;

  /**
   * 填充颜色
   */
  @Prop({ default: "#0B1F51" }) fill!: string;
  /**
   * 透明度
   */
  @Prop({ default: 1 }) fillOpacity!: number;

  /**
   * 尺寸
   */
  @Prop({ default: "medium" }) size!: SizeProps;

  /**
   * 类型
   * box 带头部
   * box-rect无头部就是一个方块带圆角
   */
  @Prop({ default: "box" }) type!: "box" | "box-rect";

  /**
   * 背景默认宽度
   */
  width = 1000;

  /**
   * 背景默认高度
   */
  height = 500;

  /**
   * 监听器
   */
  resizeObserver: ResizeObserver | null = null;

  /**
   * 设置className
   */
  get cls() {
    return {
      [`app-card-decorate--${this.type}`]: this.type === "box-rect",
    };
  }

  /**
   * 边框渐变
   */
  get stopOpacity() {
    if (this.type === "box-rect") return 1;
    return 0;
  }

  /**
   * 是否显示header
   */
  get showHeader() {
    if (this.type === "box-rect") {
      return false;
    }
    return true;
  }

  /**
   * 格式化尺寸
   */
  get formatSize() {
    const rect = {
      W: 235, // 中心线宽度
      H: this.height, // 高度
      C: 330, // 中心凹进去的中间宽度
      A: 50, //
      B: 40,
      D: 10, // 凹下然后又起的高度
      E: 60,
      R: 10, // 圆角
      LW: 1, // 线条宽度
    };
    const format = {
      // 小
      small: () => {
        rect.C = 125;
      },
      // 中
      medium: () => {
        rect.W = 200;
      },
      // 大
      large: () => {
        rect.W = 300;
      },
    };

    const formatType = {
      // 中
      "box-rect": () => {
        rect.A = 0;
        rect.B = 0;
        rect.E = 0;
      },
    };
    if (format[this.size]) format[this.size]();
    if (formatType[this.type]) formatType[this.type]();
    rect.W = (this.width - rect.C - (rect.A + rect.B + rect.R) * 2) / 2 - 1;
    return rect;
  }

  get customerD() {
    const { W, H, C, A, B, D, E, R, LW } = this.formatSize;
    /**
     *----W----A-------                              -----W---R
     *|        |\                                   /         |
     *|        E \     D----            D----      /          |
     *H        |   -B-/     \----C-----/      \ -B-          H
     *|                                                       |
     *|                                                       |
     *R ---------------------------------------------------- R
     */

    return `
      M${R} ${LW}
      L${W} ${LW}
      
      ${W + 2} ${LW}
      L${W + A} ${E}

      C${W + A - 2} ${E - 2}
      ${W + A} ${E}
      ${W + A + 2} ${E}

      L${W + A + 2} ${E}
      L${W + A + B - 2} ${E}
      C${W + A + B - 2} ${E}
      ${W + A + B} ${E}
      ${W + A + B + 2} ${E - 2}
      L${W + A + B + 2} ${E - 2}

      L${W + A + B + D} ${A}
      C${W + A + B + D - 2} ${A + 2}
      ${W + A + B + D} ${A}
      ${W + A + B + D + 2} ${A}

      L${W + A + B + D + 2} ${A}
      C${W + A + B + D + C - 2}  ${A}
      ${W + A + B + D + C}  ${A}
      ${W + A + B + D + C + 2}  ${A + 2}
      L${W + A + B + D + C + 2}  ${A + 2}


      L${W + A + B + D + C + D - 2} ${E - 2}
      C${W + A + B + D + C + D - 2} ${E - 2}
      ${W + A + B + D + C + D} ${E}
      ${W + A + B + D + C + D + 2} ${E}
      L${W + A + B + D + C + D + 2} ${E}

      L${W + A + B + D + C + D + B - 2} ${E}
      C${W + A + B + D + C + D + B - 2} ${E}
      ${W + A + B + D + C + D + B} ${E}
      ${W + A + B + D + C + D + B + 2} ${E - 2}
      L${W + A + B + D + C + D + B + 2} ${E - 2}
      ${W + A + B + D + C + D + B + A} ${LW}
      ${W + A + B + D + C + D + B + A + W - R} ${LW}
      C${W + A + B + D + C + D + B + A + W - R} ${LW}
      ${W + A + B + D + C + D + B + A + W} ${LW}
      ${W + A + B + D + C + D + B + A + W} ${R}
      L${W + A + B + D + C + D + B + A + W} ${R}
      L${W + A + B + D + C + D + B + A + W} ${H - R}
      C${W + A + B + D + C + D + B + A + W} ${H - R}
      ${W + A + B + D + C + D + B + A + W} ${H}
      ${W + A + B + D + C + D + B + A + W - R} ${H}
      L${W + A + B + D + C + D + B + A + W - R} ${H}
      L${R} ${H}
      C${R} ${H}
      ${LW} ${H}
      ${LW} ${H - R}
      L${LW} ${H - R}
      L${LW} ${R}
      C${LW} ${R}
      ${LW} ${LW}
      ${R} ${LW}
      Z
            `;
  }

  /**
   * 唯一id
   */
  get uuid() {
    return uuid();
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
    transform: translate(-50%, 0);
  }
  &__body {
    position: absolute;
    margin-top: auto;
    top: 23px;
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

  &--box-rect {
    .app-card-decorate__body {
      top: 0;
    }
  }
}
</style>
