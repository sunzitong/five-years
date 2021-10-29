<template>
  <div>
    <Empty v-if="noData" />
    <div ref="charts" class="price-info__charts" v-else></div>
  </div>
</template>

<script lang="ts">
import echarts from "@/plugins/echarts";
import { ModifyPrice } from "@/service";
import { toRpx } from "@/utils/tools";
import { ECharts } from "echarts/core";
import { EChartsOption } from "echarts/types/dist/shared";
import isEmpty from "lodash/isEmpty";
import { Vue, Component, Ref, Prop, Watch } from "vue-property-decorator";

@Component
export default class PriceInfoCharts extends Vue {
  @Ref() charts!: HTMLDivElement;
  @Prop({ default: () => [] }) dataSource!: ModifyPrice["industryInfo"];
  @Prop({ required: true }) type!: "enemyInfo" | "industryInfo";
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
    const seriesList: string[][] = [[], [], [], []];
    this.dataSource.forEach((item) => {
      seriesList[0].push(item.preTwoYearNum);
      seriesList[1].push(item.thisYearNum);
      seriesList[2].push(item.preTwoYearPrice);
      seriesList[3].push(item.thisYearPrice);
    });

    const year = new Date().getFullYear();
    const y1 = year === 2021 ? 2019 : year - 1;
    const y2 = year === 2021 ? 2021 : year;
    const t1 =
      this.type === "enemyInfo"
        ? "范围2km内民宅\n挂牌量/间"
        : "所在城市民宅\n挂牌量/间";
    const t2 =
      this.type === "enemyInfo"
        ? "范围2km内民宅单平米\n均价/元"
        : "所在城市民宅单平米\n均价/元";
    const b1Name = `${t1}（${y1}）`;
    const b2Name = `${t1}（${y2}）`;
    const c1Name = `${t2}（${y1}）`;
    const c2Name = `${t2}（${y2}）`;

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
          const arr = list
            .map((item) => {
              if (item.data === null) return null;
              let w = toRpx(10);
              let h = toRpx(2);
              let mx = toRpx(10);
              if (item.seriesIndex < 2) {
                h = toRpx(10);
              }
              const style = `display:inline-block;margin:0 ${mx}px 0 0;border-radius:2px;width:${w}px;height:${h}px;background-color:${item.color};vertical-align:middle;`;
              return `<div style="margin-top:${toRpx(
                4,
                true
              )}"><span style="${style}"></span>${item.data}</div>`;
            })
            .filter((item) => item);
          if (!isEmpty(arr)) {
            arr.splice(
              0,
              0,
              `<div style="color:#000;margin-bottom:${toRpx(8, true)}">${
                list[0].axisValue
              }</div>`
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
        bottom: "25%",
      },
      legend: [
        {
          bottom: 0,
          right: "55%",
          itemWidth: 10,
          itemHeight: 10,
          data: [b1Name, b2Name],
          textStyle: {
            color: "#A5AAAF",
            lineHeight: 16,
          },
          orient: "vertical",
        },
        {
          bottom: 0,
          left: "55%",
          itemWidth: 12,
          itemHeight: 2,
          icon: "rect",
          data: [c1Name, c2Name],
          textStyle: {
            color: "#A5AAAF",
            lineHeight: 16,
          },
          orient: "vertical",
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
        },
      ],
      series: [
        {
          name: b1Name,
          type: "bar",
          data: seriesList[0],
          itemStyle: {
            color: "#5CA2FF",
          },
        },
        {
          name: b2Name,
          type: "bar",
          data: seriesList[1],
          itemStyle: {
            color: "#FFD66B",
          },
        },
        {
          name: c1Name,
          type: "line",
          symbol: "none",
          yAxisIndex: 1,
          data: seriesList[2],
          itemStyle: {
            color: "#32CD96",
          },
        },
        {
          name: c2Name,
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
.price-info__charts {
  width: 100%;
  height: 340px;
  margin: auto;
}
</style>
