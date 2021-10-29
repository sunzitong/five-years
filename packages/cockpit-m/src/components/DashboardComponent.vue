<template>
  <div class="charts-wrapper">
    <div ref="charts" class="charts" style=""></div>
    <canvas hidden ref="canvas"></canvas>
    <img hidden ref="chartRing" :src="chartRingBackground" alt="" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import { ECharts } from "echarts/core";
import { EChartsOption } from "echarts/types/dist/shared";
import chartRingBackground from "@/assets/img/chart-ring-background.png";
import { toRpx } from "@/utils/tools";

@Component
export default class DashboardComponent extends Vue {
  @Ref() charts!: HTMLDivElement;
  @Ref() canvas!: HTMLCanvasElement;
  @Ref() chartRing!: HTMLImageElement;

  /** 值 */
  @Prop({ default: 0 }) value!: number;

  /** 渐变结束颜色 */
  @Prop({ default: "#fff" }) anchorLinearColor!: string;

  /** 边框颜色 */
  @Prop({ default: "#fff" }) anchorBorderColor!: string;

  /** 文本颜色 */
  @Prop({ default: "#000" }) detailTextColor!: string;

  /** 图例中的两个值区间 */
  @Prop({ default: () => [90, 95] }) range!: number[];

  /** 进度最大值 */
  @Prop({ default: 100 }) max!: number;

  myCharts!: ECharts;

  /** canvas 被画完 */
  canvasDrawed = false;

  get RANGE() {
    const [s, e] = this.range;
    return { s, e };
  }
  /** 图表圆环渐变进度条 */
  chartRingBackground = chartRingBackground;

  mounted() {
    this.myCharts = echarts.init(this.charts);
    this.renderChartBackground();
  }

  renderChartBackground() {
    const createRing = (canvas: HTMLCanvasElement) => {
      const CANVAS_WIDTH = this.charts.offsetWidth;
      const CANVAS_HEIGHT = this.charts.offsetHeight;
      canvas.width = this.charts.offsetWidth;
      canvas.height = this.charts.offsetHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.save();
        ctx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
        ctx.rotate(0 * (Math.PI / 180));
        ctx.drawImage(
          this.chartRing,
          0,
          0,
          this.chartRing.width,
          this.chartRing.height,
          -CANVAS_WIDTH / 2,
          -CANVAS_HEIGHT / 2,
          CANVAS_WIDTH,
          CANVAS_HEIGHT
        );
        ctx.restore();
        return ctx;
      }
    };

    this.chartRing.onload = () => {
      createRing(this.canvas);
      this.canvasDrawed = true;
    };
  }

  /** 进度转为图例上的进度 */
  progressValue(v: number) {
    /*
      TODO: 算法优化，如果刻度改为多个再使用

      const range: number[] = [0, 35, 40, 100];
      function getIndex(value: number) {
        let index = 0;
        for (let i = 1; i < range.length; i++) {
          if (value <= range[i]) {
            index = i - 1;
            break;
          }
        }
        return index;
      }

      const index = getIndex(v);

      return (
        (100 / 3) * index +
        (100 / 3 / (range[index + 1] - range[index])) * (v - range[index])
      );
    */

    const { s, e } = this.RANGE;
    if (v <= s) {
      return (100 / 3 / s) * v;
    }

    if (v <= e) {
      return 100 / 3 + (100 / 3 / (e - s)) * (v - s);
    }

    return (100 / 3) * 2 + (100 / 3 / (this.max - e)) * (v - e);
  }

  /** 图例上的进度转为真实进度 */
  formatValue(v: number) {
    const { s, e } = this.RANGE;
    if (v <= 100 / 3) {
      return v / (100 / 3 / s);
    }

    if (v <= (100 / 3) * 2) {
      return (v - 100 / 3) / (100 / 3 / (e - s)) + s;
    }

    return (v - (100 / 3) * 2) / (100 / 3 / (this.max - e)) + e;
  }

  @Watch("canvasDrawed")
  @Watch("$props", { deep: true })
  renderCharts() {
    const { s, e } = this.RANGE;
    const option: EChartsOption = {
      series: [
        {
          type: "gauge",
          progress: {
            show: false,
            width: toRpx(5),
          },
          splitNumber: 3,
          axisLine: {
            show: false,
            lineStyle: {
              width: 5,
              color: [[1, "rgba(0, 0, 0, 0)"]],
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
            length: toRpx(4),
            distance: toRpx(2),
            lineStyle: {
              color: "#AAD7FF",
              width: toRpx(2),
            },
          },
          pointer: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          anchor: {
            show: true,
            size: toRpx(60),
            itemStyle: {
              color: "#AAD7FF",
              borderColor: "#fff",
              borderWidth: toRpx(2),
              shadowColor: "#e5f3fe",
              shadowOffsetY: toRpx(5),
              shadowBlur: toRpx(5),
              shadowOffsetX: 0,
            },
          },
          title: {
            show: false,
          },
          detail: {
            // show: false,
          },
        },
        {
          type: "gauge",
          animation: false,
          progress: {
            show: true,
            width: toRpx(5),
            roundCap: true,
            itemStyle: {
              color: {
                image: this.canvas,
                repeat: "no-repeat",
              } as any,
              opacity: 0.1,
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          pointer: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          anchor: {
            show: true,
            size: toRpx(56),
            itemStyle: {
              // borderColor: "#FF9A23",
              borderColor: this.anchorBorderColor,
              borderWidth: toRpx(2),
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#fff",
                },
                {
                  offset: 1,
                  color: this.anchorLinearColor,
                },
              ]),
            },
          },
          title: {
            show: false,
          },
          detail: {
            show: false,
          },
          data: [100],
        },
        {
          type: "gauge",
          progress: {
            show: true,
            width: toRpx(5),
            roundCap: true,
            itemStyle: {
              color: {
                image: this.canvas,
                repeat: "no-repeat",
              } as any,
            },
          },
          splitNumber: 3,
          axisLine: {
            show: false,
            lineStyle: {
              width: toRpx(5),
              color: [[1, "#f50"]],
            },
          },
          axisTick: {
            splitNumber: 6,
            length: toRpx(2),
            distance: toRpx(2),
            lineStyle: {
              color: "#AAD7FF",
              width: toRpx(2),
            },
          },
          splitLine: {
            // show: false,
            length: toRpx(4),
            distance: toRpx(2),
            lineStyle: {
              color: "#AAD7FF",
              width: toRpx(2),
            },
          },
          pointer: {
            show: false,
          },
          axisLabel: {
            distance: -toRpx(20),
            color: "#A5AAAF",
            fontSize: toRpx(8),
            formatter: function (value) {
              const val = Number(value).toFixed(0);
              if (val === "33") {
                return `${s}%`;
              }
              if (val === "67") {
                return `${e}%`;
              }
              return "";
            },
          },
          anchor: {
            show: false,
          },
          title: {
            show: true,
          },
          detail: {
            valueAnimation: true,
            fontSize: toRpx(14),
            // color: "#FFA63E",
            color: this.detailTextColor,
            // fontFamily: "DIN Alternate",
            align: "center",
            formatter: (value) => {
              return `${this.formatValue(value).toFixed(1)}%`;
            },
            offsetCenter: [0, 2],
          },
          data: [
            {
              value: this.progressValue(this.value),
            },
          ],
        },
      ],
    };
    this.myCharts.setOption(option);
  }
}
</script>

<style lang="scss" scoped>
.charts-wrapper {
  height: 120px;
  overflow: hidden;
}
.charts {
  width: 140px;
  height: 140px;
  margin: 0 auto;
}
</style>
