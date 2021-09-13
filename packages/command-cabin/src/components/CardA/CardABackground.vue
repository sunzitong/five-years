<template>
  <div ref="wrapper" class="app-card-a-background">
    <div class="app-card-a-background__body">
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
          :stroke="stroke"
          :fill-opacity="fillOpacity"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref, Prop } from "vue-property-decorator";
import { ResizeObserver } from "resize-observer";
import { uuid } from "@guanyu/shared";

@Component({
  name: "CardABackground",
})
export default class CardABackground extends Vue {
  /**
   * div容器
   */
  @Ref() readonly wrapper!: HTMLDivElement;

  /**
   * 填充颜色
   */
  @Prop({ default: "#010F41" }) fill!: string;

  /**
   * 边框颜色
   */
  @Prop({ default: "#0C265E" }) stroke!: string;

  /**
   * 透明度
   */
  @Prop({ default: 0.6 }) fillOpacity!: number;

  /**
   * 是否显示header
   */
  @Prop({ default: true }) showHeader!: boolean;

  /**
   * 背景默认宽度
   */
  width = 1000;

  /**
   * 标题文本宽度
   */
  textWidth = 274;

  /**
   * 背景默认高度
   */
  height = 500;

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
    const W = this.width - LW;
    const H = this.height - LW;
    return `
      M${R} ${LW}
      H${W - R}
      L${W} ${R}
      V${H - R}
      L${W - R} ${H}
      H${R}
      L${LW} ${H - R}
      V${H - R}
      L${LW} ${R}
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
.app-card-a-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  &__relheader,
  &__header {
    position: absolute;
    top: 0;
    left: 0;
  }
  svg {
    vertical-align: middle;
  }

  &__relheader {
    display: flex;
    min-width: 274px;
    align-content: center;
  }
}
</style>
