<template>
  <div ref="charts" class="charts"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import { ECharts } from "echarts/core";
import { EChartsOption } from "echarts/types/dist/shared";
import { RenewRatio } from "@/service";
import { toRpx } from "@/utils/tools";
import { iwant } from "@guanyu/shared";

@Component
export default class RenewRatioTrendComponent extends Vue {
  @Ref() charts!: HTMLDivElement;

  @Prop({ default: () => [] }) value!: RenewRatio["renewRatioTrend"];

  myCharts!: ECharts;

  mounted() {
    this.myCharts = echarts.init(this.charts);
    this.renderCharts();
  }

  @Watch("value")
  renderCharts() {
    type Previous = { xAxis: string[]; group: number[] };
    const data: Previous = { xAxis: [], group: [] };

    this.value.forEach((item) => {
      data.xAxis.push(item.dataDate);
      data.group.push(item.ratio);
    });

    const option: EChartsOption = {
      tooltip: {
        trigger: "axis",
        formatter: (value: any) => {
          console.log(value);
          const [a] = value;
          return `
            ${a.name}<br />
            ${value
              .map((item: any) => {
                return `${item.seriesName}：${iwant.calc(
                  item.value,
                  2,
                  true
                )}%`;
              })
              .join("<br />")}
          `;
        },
        textStyle: {
          fontSize: 12,
        },
        axisPointer: {
          lineStyle: {
            color: "#BABABA",
            width: toRpx(2),
            type: "solid",
          },
        },
      },
      grid: {
        containLabel: true,
        top: "3%",
        left: "2%",
        right: "2%",
        bottom: "2%",
      },
      legend: {
        show: false,
      },
      xAxis: [
        {
          type: "category",
          data: data.xAxis,
          axisLabel: {
            color: "#64696E",
            rotate: 60,
            fontSize: toRpx(10),
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              width: toRpx(1),
              color: "#F7F7F7",
            },
          },
        },
      ],
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value}%",
          fontSize: toRpx(10),
        },
        splitLine: {
          lineStyle: {
            width: toRpx(1),
            color: "#F7F7F7",
          },
        },
      },
      series: [
        {
          name: "续租率",
          type: "line",
          data: data.group,
          symbol: "none",
          showSymbol: false,
          lineStyle: {
            color: "#1C7AF7",
            width: toRpx(1),
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(112, 169, 255, 0.53)", // 100% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(225, 235, 255, 0)", // 0% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
          color: "#5CA2FF",
        },
      ],
    };
    this.myCharts.setOption(option);
  }
}
</script>

<style lang="scss" scoped>
.charts {
  margin: 0 18px;
  height: 180px;
  z-index: 1;
  position: relative;
}
</style>
