<template>
  <div :class="chartsWrapperCls">
    <div ref="charts" class="charts"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Prop, Watch } from "vue-property-decorator";
import { ECharts } from "echarts/core";
import echarts from "@/plugins/echarts";
import { toRpx } from "@/utils/tools";
import "echarts-liquidfill";

@Component({
  components: {},
})
export default class EchartsLiquidfill extends Vue {
  @Ref() charts!: HTMLDivElement;
  @Prop({ default: 0 }) value!: number;
  @Prop({ default: "normal" }) type!: "normal" | "low";
  myCharts: ECharts | null = null;

  get chartsWrapperCls() {
    return {
      "charts-wrapper": true,
      "charts-wrapper__low": this.type === "low",
    };
  }

  get themeColors() {
    if (this.type === "low") {
      return {
        backgroundStyleColors: ["#fae3c4", "rgba(255, 255, 255, 1)"],
        series0Colors: ["#FFD698", "#FFB74A"],
        series1Colors: ["#F3B77F", "#EF9847", "#FF4A4A"],
      };
    }

    return {
      backgroundStyleColors: ["#B0D0FF", "rgba(255, 255, 255, 1)"],
      series0Colors: ["rgba(100, 180, 255, 1)", "rgba(255, 255, 255, 0)"],
      series1Colors: ["#28CBFF", "#3479FF", "#AD2DFC"],
    };
  }

  /**
   * 渲染完成
   */
  mounted() {
    this.myCharts = echarts.init(this.charts);
    this.myCharts.setOption({
      series: [
        {
          type: "liquidFill",
          data: [this.value, this.value],
          amplitude: "8%",
          waveLength: "135%",
          radius: "100%",
          backgroundStyle: {
            borderWidth: 1,
            borderColor: "#F0F0F0",
            color: {
              type: "radial",
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [
                {
                  offset: 0,
                  color: this.themeColors.backgroundStyleColors[0],
                },
                {
                  offset: 1,
                  color: this.themeColors.backgroundStyleColors[1],
                },
              ],
            },
          },
          label: {
            fontSize: toRpx(18),
            color: "#000",
            position: ["50%", "30%"],
          },
          outline: {
            borderDistance: toRpx(3),
            itemStyle: {
              borderWidth: 1,
              borderColor: "#F0F0F0",
            },
          },
          color: [
            {
              type: "linear",
              x: 0.5,
              y: 0,
              x2: 0.5,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: this.themeColors.series0Colors[0],
                },
                {
                  offset: 1,
                  color: this.themeColors.series0Colors[1],
                },
              ],
            },
            {
              type: "linear",
              x: 0.5,
              y: 0,
              x2: 0.5,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: this.themeColors.series1Colors[0],
                },
                {
                  offset: 0.5,
                  color: this.themeColors.series1Colors[1],
                },
                {
                  offset: 1,
                  color: this.themeColors.series1Colors[2],
                },
              ],
            },
          ],
          itemStyle: {
            shadowColor: "white",
          },
        },
      ],
    });
  }

  @Watch("value")
  valueChanged() {
    this.myCharts?.setOption({ series: [{ data: [this.value, this.value] }] });
  }
}
</script>

<style lang="scss" scoped>
.charts-wrapper {
  position: relative;
  width: 160px;
  margin: 0 auto;
  z-index: 10;
  &::after,
  &::before {
    position: absolute;
    z-index: -1;
    content: "";
    width: 80px;
    height: 80px;
    border-radius: 50%;
    filter: blur(4px);
  }

  &::after {
    top: 30px;
    left: 10px;
    transform: rotate(155deg);
    background: linear-gradient(
      0,
      rgba(168, 213, 255, 0.56) -100%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  &::before {
    top: 10px;
    right: 20px;
    z-index: 100;
    transform: rotate(-10deg);
    transform-origin: top right;
    background: linear-gradient(
      0,
      rgba(168, 213, 255, 0.56) -100%,
      rgba(255, 255, 255, 0) 100%
    );
  }
}

.charts-wrapper__low {
  &::after {
    background: linear-gradient(0, #fbe3c2 -100%, rgba(255, 255, 255, 0) 100%);
  }
  &::before {
    background: linear-gradient(0, #f6e0c1 -100%, rgba(255, 255, 255, 0) 100%);
  }
}
.charts {
  margin: 0 auto;
  width: 110px;
  height: 110px;
}
</style>
