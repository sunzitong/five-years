<template>
  <div>
    <Empty v-if="noData" />
    <div ref="charts" class="area__charts" v-else></div>
  </div>
</template>

<script lang="ts">
import echarts from "@/plugins/echarts";
import { IncomeReachDaily } from "@/service";
import { toRpx } from "@/utils/tools";
import { ECharts } from "echarts/core";
import { EChartsOption } from "echarts/types/dist/shared";
import { Vue, Component, Ref, Prop, Watch } from "vue-property-decorator";
import isEmpty from "lodash/isEmpty";

@Component
export default class AreaCharts extends Vue {
  @Ref() charts!: HTMLDivElement;
  @Prop({ default: () => [] }) dataSource!: IncomeReachDaily["list"];
  myCharts: ECharts | null = null;

  @Watch("dataSource", { deep: true })
  dataChanged() {
    this.setChart();
  }

  mounted() {
    this.setChart();
  }

  noData = false;

  setChart() {
    this.noData = false;
    if (isEmpty(this.dataSource)) {
      this.noData = true;
      return;
    }
    this.myCharts = echarts.init(this.charts);
    // x刻度
    const xAxisData = this.dataSource.map((item) => ({
      value: item.dataDate,
      textStyle: {
        color: "#64696E",
      },
    }));
    // 数据
    const incomeData = this.dataSource.map((item) => item.income);
    const targetData = this.dataSource.map((item) => item.target);

    const option: EChartsOption = {
      tooltip: {
        show: true,
        trigger: "axis",
        textStyle: {
          color: "#232832",
          fontSize: toRpx(10),
        },
        formatter: (params: unknown) => {
          const list = params as any[];
          const arr = list.map((item) => {
            const style = `display:inline-block;text-align:right;`;
            return `<div style="margin-top:${toRpx(
              4,
              true
            )}"><span style="${style}">${item.seriesName}</span>：${
              item.data
            }</div>`;
          });
          if (!isEmpty(arr)) {
            arr.splice(
              0,
              0,
              `<div style="color:#000;">${list[0].axisValue}</div>`
            );
          }
          return arr.join("");
        },
        axisPointer: {
          lineStyle: {
            color: "#BABABA",
            width: 1,
            type: "solid",
          },
        },
      },
      grid: {
        containLabel: true,
        top: "5%",
        left: "6%",
        right: "6%",
        bottom: "10%",
      },
      legend: [
        {
          bottom: 0,
          itemWidth: toRpx(12),
          itemHeight: toRpx(2),
          icon: "rect",
          textStyle: {
            color: "#A5AAAF",
            lineHeight: toRpx(16),
            fontSize: toRpx(10),
          },
        },
      ],
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: xAxisData,
        axisLine: {
          lineStyle: {
            color: "#F7F7F7",
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          rotate: 60,
        },
      },
      yAxis: {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#A5AAAF",
          },
        },
        splitLine: {
          lineStyle: {
            color: "#F7F7F7",
          },
        },
      },
      series: [
        {
          name: "当日收入",
          data: incomeData,
          type: "line",
          smooth: false,
          symbol: "none",
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
          lineStyle: {
            color: "#1C7AF7",
            width: 2,
          },
        },
        {
          name: "当日预算",
          data: targetData,
          type: "line",
          smooth: false,
          symbol: "none",
          lineStyle: {
            color: "#FFC327",
            width: 2,
          },
          itemStyle: {
            color: "#FFC327",
          },
        },
      ],
    };

    this.myCharts.setOption(option);
  }
}
</script>
<style lang="scss" scoped>
.area__charts {
  width: 100%;
  height: 274px;
  margin: auto;
}
</style>
