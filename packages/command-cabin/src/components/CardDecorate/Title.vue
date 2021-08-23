<template>
  <svg
    style="vertical-align: middle"
    width="519"
    height="74"
    viewBox="0 0 519 74"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      :d="titlePath"
      fill="#0B2763"
      stroke="url(#paint0_linear)"
      stroke-width="2"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
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
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class TitleDecorate extends Vue {
  /**
   * 尺寸
   */
  @Prop({ default: "medium" }) size!: "small" | "medium" | "large";

  /**
   * 控制size
   */
  formatSmallSize(d: string) {
    const size = {
      small: -101,
      medium: 0,
      large: 0,
    }[this.size];

    return d
      .replace(/'(-?\d+(\.\d+)?)'/g, (str: string, $1: string) => {
        // 单引号包围表示中心线右侧需要减
        return `${parseFloat($1) - size}`;
      })
      .replace(/"(-?\d+(\.\d+)?)"/g, (str: string, $1: string) => {
        // 双引号包围表示中心线左侧需要加
        return `${parseFloat($1) + size}`;
      });
  }

  /**
   * 标题图片缩放
   */
  get titlePath() {
    return this.formatSmallSize(`
      M'9.37569' 1
      C'3.16638' 1 '-0.259503' 8.20668 '3.67708' 13.0102
      L'50.5366' 70.189
      C'51.9354' 71.8958 '54.0272' 72.8853 '56.2352' 72.8853

      H'77.4396'
      C'81.2737' 72.8853 '84.8632' 71.0021 '87.0424' 67.8475
      C'88.8481' 65.2335 '91.8225' 63.6731 '94.9996' 63.6731

      H"427.879"
      C"431.056" 63.6731 "434.03" 65.2335 "435.836" 67.8475
      C"438.015" 71.0021 "441.605" 72.8853 "445.439" 72.8853
      H"466.25"
      C"469.197" 72.8853 "471.32" 71.1167 "473.015" 69.0739
      C"473.867" 68.0472 "474.651" 66.9025 "475.397" 65.8031
      L"475.522" 65.6183
      C"476.232" 64.5709 "476.909" 63.5725 "477.617" 62.6875
      L"510.844" 21.1159
      C"513.488" 17.8085 "516.114" 13.0504 "517.018" 9.04495
      C"517.465" 7.06207 "517.533" 5.07539 "516.764" 3.53505
      C"515.938" 1.87861 "514.288" 1 "511.953" 1

      H'9.37569'
      Z`);
  }
}
</script>

<style lang="scss" scoped></style>
