<template>
  <div ref="charts" class="charts"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import { ECharts } from "echarts/core";
import { EChartsOption } from "echarts/types/dist/shared";
import { toRpx } from "@/utils/tools";
import { iwant } from "@guanyu/shared";
import { OptCost } from "@/service";

@Component
export default class MarketingExpenseTrendComponent extends Vue {
  @Ref() charts!: HTMLDivElement;

  @Prop({ default: () => [] }) value!: OptCost["trend"];

  myCharts!: ECharts;

  mounted() {
    this.myCharts = echarts.init(this.charts);
    this.renderCharts();
  }

  /** 获取可以等分的最大值 */
  getChartMaxValue(array: number[], splitNumber = 5) {
    let maxValue = Number.MIN_VALUE;
    let minValue = Number.MAX_VALUE;
    for (let i = array.length; i--; ) {
      if (array[i] > maxValue) {
        maxValue = array[i];
      }
      if (array[i] < minValue) {
        minValue = array[i];
      }
    }

    let interval = iwant.calc(maxValue / splitNumber);
    interval = interval < 1 ? interval : Math.ceil(interval);
    const max = interval * splitNumber;

    return {
      max,
      interval,
      min: 0,
    };
  }

  @Watch("value")
  renderCharts() {
    type Previous = { xAxis: string[]; costs: number[]; perCosts: number[] };
    const data: Previous = { xAxis: [], costs: [], perCosts: [] };

    this.value.forEach((item) => {
      data.xAxis.push(item.dataDate); // 时间
      data.costs.push(item.cost); // 运营成本
      data.perCosts.push(item.perCost); // 客单成本
    });

    const option: EChartsOption = {
      tooltip: {
        // show: false,
        trigger: "axis",
        formatter: (value: any) => {
          return `
            ${value[0].name}<br />
            ${value
              .map((item: any) => {
                return `${item.seriesName}：${item.value}`;
              })
              .join("<br />")}
          `;
        },
        textStyle: {
          fontSize: 12,
        },
      },
      grid: {
        containLabel: true,
        top: "8%",
        left: "4%",
        right: "2%",
        bottom: toRpx(25),
      },
      legend: [
        {
          bottom: 0,
          itemWidth: toRpx(10),
          itemHeight: toRpx(10),
          itemGap: toRpx(18),
          data: [
            {
              name: "运营成本",
            },
            {
              name: "单间运营成本",
              itemStyle: {
                opacity: 0,
              },
            },
          ],
          textStyle: {
            color: "#A5AAAF",
            lineHeight: toRpx(16),
            fontSize: toRpx(10),
          },
        },
      ],
      xAxis: [
        {
          type: "category",
          data: data.xAxis,
          axisLabel: {
            color: "#64696E",
            rotate: 60,
            fontSize: toRpx(10),
          },
          axisPointer: {
            type: "shadow",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              width: 1,
              color: "#F7F7F7",
            },
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          axisLabel: {
            fontSize: toRpx(10),
          },
          ...this.getChartMaxValue(data.costs),
          splitLine: {
            lineStyle: {
              width: 1,
              color: "#F7F7F7",
            },
          },
        },
        {
          type: "value",
          ...this.getChartMaxValue(data.perCosts),
          axisLabel: {
            fontSize: toRpx(10),
          },
          splitLine: {
            show: false,
            lineStyle: {
              width: 1,
              color: "#F7F7F7",
            },
          },
        },
      ],
      series: [
        {
          name: "运营成本",
          type: "bar",
          data: data.costs,
          color: "#5CA2FF",
          itemStyle: {
            borderRadius: [toRpx(2), toRpx(2), 0, 0],
          },
        },
        {
          name: "单间运营成本",
          type: "line",
          data: data.perCosts,
          color: "#FFC327",
          symbol: "none",
          yAxisIndex: 1,
          showSymbol: false,
          lineStyle: {
            width: toRpx(2),
          },
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
  height: 300px;
  z-index: 1;
  position: relative;
}
</style>
