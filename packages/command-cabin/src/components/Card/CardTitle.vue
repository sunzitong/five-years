<template>
  <svg
    v-if="formatSize.W && formatSize.H"
    style="vertical-align: middle"
    :width="formatSize.W"
    :height="formatSize.H"
    :viewBox="`0 0 ${formatSize.W} ${formatSize.H}`"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      :d="titlePath"
      fill="#0B1F51"
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
        <stop stop-color="#1b3b6e" />
        <stop offset="1" stop-color="#1b3b6e" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>
</template>

<script lang="ts">
import { uuid } from "@guanyu/shared";
import { Component, Vue, Prop } from "vue-property-decorator";

/**
 * size 枚举
 */
export type SizeProps = "small" | "medium" | "large";

@Component
export default class CardTitle extends Vue {
  /**
   * 尺寸
   */
  @Prop({ default: "medium" }) size!: SizeProps;

  @Prop({ default: 519 }) width!: number;
  @Prop({ default: 70 }) height!: number;

  get formatSize() {
    const rect = {
      W: this.width,
      H: this.height,
      SH: this.height - 10,
    };

    const format = {
      // 小
      small: () => {
        rect.W = 318;
      },
      // 中
      medium: () => {
        rect.W = 519;
      },
      // 大
      large: () => {
        rect.W = 700;
      },
    };

    /**
     * 如果设置了size优先处理size
     */
    if (format[this.size]) {
      format[this.size]();
    }

    return rect;
  }

  /**
   * 唯一id
   */
  uuid = uuid();

  /**
   * 标题图片缩放
   */
  get titlePath() {
    const { W, H, SH } = this.formatSize;

    // x + 2,

    return `
      M10 1
      L${W - 9} 1
      C${W - 9} 1
      ${W} 0
      ${W - 4} 10

      L${W - 50 + 2} ${H - 2}
      C${W - 50 + 2} ${H - 2}
      ${W - 50} ${H}
      ${W - 50 - 2} ${H}

      L${W - 79 + 2} ${H}
      C${W - 79 + 2} ${H}
      ${W - 79} ${H}
      ${W - 79 - 2} ${H - 2}
      L${W - 79 - 2} ${H - 2}


      L${W - 89 + 2} ${SH + 2}
      C${W - 89 + 2} ${SH + 2}
      ${W - 89} ${SH}
      ${W - 89 - 2} ${SH}

      L${W - 89 - 2} ${SH}

      92 ${SH}
      C92 ${SH}
      90 ${SH}
      88 ${SH + 2}

      L82 ${H - 2}

      C82 ${H - 2}
      80 ${H}
      78 ${H}

      L52 ${H}

      C52 ${H}
      50 ${H}
      48 ${H - 2}

      L48 ${H - 2}
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
