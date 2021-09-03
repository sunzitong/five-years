<template>
  <div>
    <!-- <svg
      width="376"
      height="91"
      viewBox="0 0 376 91"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="
        M366.437 1.5
        H9.34022
        C3.31769 1.5 -0.248485 8.24026 3.13965 13.2193L52.474 85.7193
        C53.8705 87.7717 56.1921 89 58.6745 89
        H90.0147
        C92.0038 89 93.9115 88.2098 95.318 86.8033L104.303 77.818
        C105.147 76.9741 106.292 76.5 107.485 76.5
        H267.367
        C268.626 76.5 269.827 77.027 270.679 77.9532
        L278.613 86.5779
        C280.034 88.1216 282.035 89 284.133 89
        H315.387
        C317.827 89 320.114 87.813 321.519 85.818
        L372.569 13.318
        C376.068 8.34907 372.514 1.5 366.437 1.5
        Z"
        fill="url(#paint0_linear)"
        stroke="url(#paint1_linear)"
        stroke-width="3"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="188"
          y1="3"
          x2="188"
          y2="87.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#021F63" />
          <stop offset="1" stop-color="#060336" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="188"
          y1="3"
          x2="188"
          y2="87.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#019DC0" />
          <stop offset="0.47929" stop-color="#03C7D7" />
          <stop offset="1" stop-color="#0388A5" />
        </linearGradient>
      </defs>
    </svg> -->

    <svg
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
</template>

<script lang="ts">
import { uuid } from "@guanyu/shared";
import { Component, Vue, Prop } from "vue-property-decorator";

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
  get uuid() {
    return uuid();
  }

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
