<template>
  <div>
    <Empty v-if="noData" />
    <div ref="charts" class="bar__charts" v-else></div>
  </div>
</template>

<script lang="ts">
import echarts from "@/plugins/echarts";
import { IncomeReach } from "@/service";
import { toRpx } from "@/utils/tools";
import { ECharts } from "echarts/core";
import { EChartsOption } from "echarts/types/dist/shared";
import isEmpty from "lodash/isEmpty";
import { Vue, Component, Ref, Prop, Watch } from "vue-property-decorator";

@Component
export default class BarCharts extends Vue {
  @Ref() charts!: HTMLDivElement;
  @Prop({ default: () => [] }) dataSource!: IncomeReach["incomeReachTrend"];
  myCharts: ECharts | null = null;

  @Prop() type!: string;

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
    const legends =
      {
        incomeReachTrend: {
          names: ["收入", "预算", "达成", "收入环比增长"],
          nameWidth: "6em",
          left: "45%",
          right: "55%",
        },
        avgPerRoomPriceTrend: {
          names: ["平均单房价格", "平均单房预算", "达成度", "单房价格环比增长"],
          nameWidth: "8em",
          left: "51%",
          right: "49%",
        },
      }[this.type] || {};

    // x刻度
    const xAxisData = this.dataSource.map((item) => ({
      value: item.dataDate,
      textStyle: {
        color: "#64696E",
      },
    }));
    // 数据
    const seriesList: number[][] = [[], [], [], []];
    this.dataSource.forEach((item) => {
      seriesList[0].push(item.income);
      seriesList[1].push(item.target);
      seriesList[2].push(item.reachRatio);
      seriesList[3].push(item.riseYoY);
    });

    const option: EChartsOption = {
      tooltip: {
        show: true,
        trigger: "axis",
        renderMode: "html",
        textStyle: {
          color: "#232832",
          fontSize: toRpx(10),
        },
        formatter: (params: unknown) => {
          const list = params as any[];
          const arr = list.map((item) => {
            const data =
              item.seriesIndex < 2 ? `${item.data}` : `${item.data}%`;
            const style = `display:inline-block;width:${legends.nameWidth}`;
            return `<div><span style="${style}">${item.seriesName}</span>：${data}</div>`;
          });
          if (!isEmpty(arr)) {
            arr.splice(
              0,
              0,
              `<div style="color:#000;width:${legends.nameWidth}">${list[0].axisValue}</div>`
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
        top: "5%",
        left: "6%",
        right: "6%",
        bottom: "10%",
        containLabel: true,
      },
      legend: [
        {
          bottom: 0,
          right: legends.right,
          itemWidth: toRpx(10),
          itemHeight: toRpx(10),
          itemGap: toRpx(6),
          data: legends.names?.slice(0, 2),
          textStyle: {
            color: "#A5AAAF",
            lineHeight: toRpx(16),
            fontSize: toRpx(10),
          },
        },
        {
          bottom: 0,
          left: legends.left,
          itemWidth: toRpx(12),
          itemHeight: toRpx(2),
          itemGap: toRpx(6),
          icon: "rect",
          data: legends.names?.slice(2),
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
          data: xAxisData,
          axisLabel: {
            rotate: 60,
          },
          axisLine: {
            lineStyle: {
              color: "#F7F7F7",
            },
          },
          axisTick: {
            show: false,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          splitNumber: 9,
          splitLine: {
            lineStyle: {
              color: "#F7F7F7",
            },
          },
        },
        {
          type: "value",
          splitNumber: 9,
          splitLine: {
            show: false,
          },
          axisLabel: {
            formatter: "{value}%",
          },
        },
      ],
      series: [
        {
          name: legends.names?.[0],
          type: "bar",
          data: seriesList[0],
          itemStyle: {
            color: "#5CA2FF",
          },
        },
        {
          name: legends.names?.[1],
          type: "bar",
          data: seriesList[1],
          itemStyle: {
            color: "#FFD66B",
          },
        },
        {
          name: legends.names?.[2],
          type: "line",
          symbol: "none",
          yAxisIndex: 1,
          data: seriesList[2],
          itemStyle: {
            color: "#32CD96",
          },
        },
        {
          name: legends.names?.[3],
          type: "line",
          symbol: "none",
          yAxisIndex: 1,
          data: seriesList[3],
          itemStyle: {
            color: "#F19A44",
          },
        },
      ],
    };
    this.myCharts.setOption(option);
  }
}
</script>
<style lang="scss" scoped>
.bar__charts {
  width: 100%;
  height: 300px;
  margin: auto;
}
</style>
