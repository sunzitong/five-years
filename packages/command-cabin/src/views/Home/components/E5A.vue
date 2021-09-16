<template>
  <div
    class="app-echarts"
    ref="barChart"
    style="width: 100%; height: 650px"
  ></div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Watch } from "vue-property-decorator";
import * as echarts from "echarts";
import { ECOption } from "@/plugins/echarts";
import Base from "@/views/Base";
import { SentimentReturn } from "@/service/analysis/bigScreen/mainBoard/managementSituation/sentiment";
import { iwant } from "@guanyu/shared";

type BarData = {
  xAxis: string[];
  yellowNums: number[];
  redNums: number[];
};

@Component
export default class E5A extends Base {
  @Ref() barChart!: HTMLDivElement;

  /**
   * 父组件传进来的数据
   */
  @Prop({ required: true }) response!: SentimentReturn;

  /**
   * 定时器
   */
  barTimer: null | number = null;

  /**
   * 数据
   */
  bar: BarData = {
    xAxis: [],
    yellowNums: [],
    redNums: [],
  };

  @Watch("response", { deep: true })
  onResponse(response: SentimentReturn) {
    const barData: BarData = {
      xAxis: [],
      yellowNums: [],
      redNums: [],
    };

    iwant.array(response.numsByCity).forEach((item) => {
      barData.xAxis?.push(item.cityName);
      barData.yellowNums?.push(item.yellowNum);
      barData.redNums?.push(item.redNum);
    });

    this.echarts.setOption({
      xAxis: {
        data: barData.xAxis,
      },
      series: [
        {
          data: barData.yellowNums,
        },
        {
          data: barData.redNums,
        },
      ],
    });
  }

  /**
   * 组件卸载
   */
  beforeDestroy() {
    if (this.barTimer) clearTimeout(this.barTimer);
    this.barTimer = null;
  }

  mounted() {
    this.renderBarChart();
    this.moveBarChart();
  }

  renderBarChart() {
    this.echarts = echarts.init(this.barChart);
    const option: ECOption = {
      grid: {
        top: "12%",
        right: "5%",
        left: "12%",
        bottom: "12%",
      },
      tooltip: {
        show: true,
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        showContent: false,
      },
      dataZoom: [
        {
          type: "inside",
          zoomLock: true,
          start: 1,
          end: 50,
        },
        {
          type: "slider",
          show: false,
        },
      ],
      xAxis: [
        {
          type: "category",
          data: this.bar.xAxis,
          axisLine: {
            lineStyle: {
              color: "rgba(0,0,0,0)",
            },
          },
          axisLabel: {
            margin: 20,
            rotate: 60, //x轴倾斜40°
            color: "#fff",
            fontSize: 14,
          },
        },
      ],
      yAxis: [
        {
          axisLabel: {
            formatter: "{value}",
            color: "#fff",
            fontSize: 20,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "red",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#1B4985",
              type: [15, 10],
              dashOffset: 5,
            },
          },
          axisTick: {
            show: false,
          },
          splitArea: {
            show: false,
          },
        },
      ],
      series: [
        {
          type: "bar",
          data: this.bar.yellowNums,
          stack: "a",
          barWidth: 20,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "#5180E4", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(12, 90, 171, 0)", // 100% 处的颜色
                },
              ],
              false
            ),
          },
          label: {
            show: true,
            color: "#DBF0FF",
            align: "center",
            fontSize: 18,
          },
        },
        {
          type: "bar",
          stack: "a",
          data: this.bar.redNums,
          barWidth: 20,
          itemStyle: {
            color: "#F7D14A",
          },
          label: {
            show: true,
            align: "center",
            position: "top",
            color: "#F7D14A",
            fontSize: 18,
          },
        },
      ],
    };
    option && this.echarts.setOption(option);
  }

  moveBarChart() {
    let index = 1;
    const nextLoop = () => {
      index += 1;
      const opt: any = this.echarts.getOption();
      if (opt.dataZoom[0]?.end >= 100) {
        index = 0;
        this.echarts.setOption({ animation: false });
      } else {
        this.echarts.setOption({ animation: true });
      }
      this.echarts.setOption({
        dataZoom: [
          {
            start: index,
            end: Math.min(index + 51, 100),
          },
        ],
      });
      this.barTimer = setTimeout(nextLoop, 1000);
    };
    this.barTimer = setTimeout(nextLoop, 1000);
    /**
     * 数据缩放事件
     */
    this.echarts.on("datazoom", (e: any) => {
      index = Math.floor(e.batch[0].start);
      if (this.barTimer) {
        clearTimeout(this.barTimer);
        this.barTimer = setTimeout(nextLoop, 5000);
      }
    });
  }
}
</script>

<style lang="scss" scoped></style>
