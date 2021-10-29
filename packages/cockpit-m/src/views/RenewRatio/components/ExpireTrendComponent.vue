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

@Component
export default class ExpireTrendComponent extends Vue {
  @Ref() charts!: HTMLDivElement;

  @Prop({ default: () => [] }) value!: RenewRatio["expireTrend"];

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
      data.group.push(item.num);
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
                return `${item.seriesName}：${item.value}间`;
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
      yAxis: {
        type: "value",
        axisLabel: {
          fontSize: toRpx(10),
        },
        splitLine: {
          lineStyle: {
            width: 1,
            color: "#F7F7F7",
          },
        },
      },
      series: [
        {
          name: "到期",
          type: "bar",
          label: {
            show: true,
            position: "top",
            fontSize: toRpx(10),
          },
          data: data.group,
          color: "#5CA2FF",
          itemStyle: {
            borderRadius: [toRpx(2), toRpx(2), 0, 0],
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
  height: 180px;
  z-index: 1;
  position: relative;
}
</style>
