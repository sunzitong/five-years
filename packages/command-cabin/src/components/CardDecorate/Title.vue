<template>
  <svg
    style="vertical-align: middle"
    :width="width"
    :height="height"
    :viewBox="`0 0 ${width} ${height}`"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      :d="titlePath"
      fill="#0B2763"
      :stroke="`url(#${uuid})`"
      stroke-width="2"
    />
    <defs>
      <linearGradient
        :id="uuid"
        x1="265.661"
        y1="2"
        x2="265.661"
        y2="71.8853"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#1B4986" />
        <stop offset="1" stop-color="#00639F" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>
</template>

<script lang="ts">
import { uuid } from "@guanyu/shared";
import { Component, Vue, Prop, PropSync } from "vue-property-decorator";

/**
 * size 枚举
 */
export type SizeProps = "small" | "medium" | "large";

/**
 * 控制title size 实现了small, medium
 * large无使用场景
 */
export const formatSmallSize = (d: string, s: SizeProps) => {
  const size = { small: -101, medium: 0, large: 0 }[s];

  return d
    .replace(/'(-?\d+(\.\d+)?)'/g, (str: string, $1: string) => {
      // 单引号包围表示中心线右侧需要减
      return `${parseFloat($1) - size}`;
    })
    .replace(/"(-?\d+(\.\d+)?)"/g, (str: string, $1: string) => {
      // 双引号包围表示中心线左侧需要加
      return `${parseFloat($1) + size}`;
    });
};

@Component
export default class TitleDecorate extends Vue {
  /**
   * 尺寸
   */
  @Prop({ default: "medium" }) size!: SizeProps;

  width = 519;
  height = 70;

  get formatSize() {
    const rect = {
      W: this.width,
      H: this.height,
      SH: this.height - 10,
    };

    const format = {
      // 小
      small: () => {
        this.width = 318;
        rect.W = this.width;
      },
      // 中
      medium: () => {
        this.width = 519;
        rect.W = this.width;
      },
      // 大
      large: () => {
        this.width = 700;
        rect.W = this.width;
      },
    };
    if (format[this.size]) format[this.size]();
    return rect;
  }

  /**
   * 唯一id
   */
  get uuid() {
    console.log('title', this.size);
    return uuid();
  }

  /**
   * 标题图片缩放
   */
  get titlePath() {
    const { W, H, SH } = this.formatSize;

    return `
      M10 1
      L${W - 9} 1
      C${W - 9} 1
      ${W} 0
      ${W - 4} 10
      L${W - 50} ${H}
      ${W - 79} ${H}
      ${W - 89} ${SH}
      90 ${SH}
      80 ${H}
      50 ${H}
      3 9
      C1 5
      3 1
      11 1
      Z
    `;
  }
}
</script>

<style lang="scss" scoped></style>
