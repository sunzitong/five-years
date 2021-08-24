<template>
  <span :style="styles"><slot></slot></span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class GradeText extends Vue {
  /**
   * 字体颜色
   */
  @Prop() color!: string;

  /**
   * 默认类型
   */
  @Prop() type!: "higher" | "highest" | "middle" | "low";

  /**
   * 获取颜色值
   */
  get _color() {
    const mapColor = {
      /** 较高 */
      higher: "#FF8C04",
      /** 高 */
      highest: "#FF0042",
      /** 中 */
      middle: "#32CD96",
      /** 低 */
      low: "#A5AAAF",
    };

    /** 自定义颜色值 */
    if (this.color) return this.color;

    /** 设置了类型优先取设定好的类型 */
    if (mapColor[this.type]) return mapColor[this.type];

    /** 默认为hight */
    return undefined;
  }

  /**
   * 内联样式
   */
  get styles() {
    return {
      color: this._color,
    };
  }
}
</script>
<style lang="scss" scoped></style>
