<template>
  <div>
    <Empty v-if="noData" />
    <div ref="charts" class="main-info__charts" v-else></div>
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
export default class MainInfoCharts extends Vue {
  @Ref() charts!: HTMLDivElement;
  @Prop({ default: () => [] }) dataSource!: ModifyPrice["mainInfo"];
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
    const seriesData = this.dataSource.map((item) => +item.num);

    const option: EChartsOption = {
      tooltip: {
        show: true,
        trigger: "axis",
        formatter: "{b} {c}%",
        textStyle: {
          color: "#232832",
          fontSize: toRpx(10),
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
        bottom: "5%",
      },
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
        min: 0,
        // max: 100,
        type: "value",
        axisLabel: {
          formatter: "{value}%",
        },
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
          data: seriesData,
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
      ],
    };

    this.myCharts.setOption(option);
  }
}
</script>
<style lang="scss" scoped>
.main-info__charts {
  width: 100%;
  height: 170px;
  margin: auto;
}
</style>
