<template>
  <div ref="wrapper" class="app-card-b-background">
    <div class="app-card-b-background__body">
      <svg
        v-if="width && height"
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
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref, Prop } from "vue-property-decorator";
import { ResizeObserver } from "resize-observer";

@Component({
  name: "CardBBackground",
})
export default class CardABackground extends Vue {
  /**
   * div容器
   */
  @Ref() readonly wrapper!: HTMLDivElement;

  /**
   * 填充颜色
   */
  @Prop({ default: "#113069" }) fill!: string;

  /**
   * 边框颜色
   */
  @Prop({ default: "#0C265E" }) stroke!: string;

  /**
   * 透明度
   */
  @Prop({ default: 0.6 }) fillOpacity!: number;

  /**
   * 背景默认宽度
   */
  width = 1000;

  /**
   * 背景默认高度
   */
  height = 200;

  /**
   * 监听器
   */
  resizeObserver: ResizeObserver | null = null;

  /**
   * 自定义路径
   */
  get customerD() {
    const R = 15;
    const LW = 1;
    const SW = 50;
    const SH = 66;
    const W = this.width - LW - SW * 2 - R * 4;
    const H = this.height - LW - SH * 2 - R * 4;

    return `
      m${R} ${LW}
      h${SW}
      l${R} ${R}
      h${W}
      l${R} ${-R}
      h${SW}
      l${R} ${R}
      v${SH}
      l${-R} ${R}
      v${H}
      l${R} ${R}
      v${SH}
      l${-R} ${R}
      h${-SW}
      l${-R} ${-R}
      h${-W}
      l${-R} ${R}
      h${-SW}
      l${-R} ${-R}
      v${-SH}
      l${R} ${-R}
      v${-H}
      l${-R} ${-R}
      v${-SH}
      z
    `;
  }

  /**
   * 更新背景区域宽、高度
   */
  divSizeChangeHandle() {
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
.app-card-b-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  svg {
    vertical-align: middle;
  }
  &__body {
    &::before {
      content: "";
      position: absolute;
      top: 16px;
      right: 16px;
      bottom: 16px;
      left: 16px;
      backdrop-filter: blur(10px);
    }
  }
}
</style>
