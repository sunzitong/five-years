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
export default class NoRenewReasonTrendComponent extends Vue {
  @Ref() charts!: HTMLDivElement;

  @Prop({ default: () => [] }) value!: RenewRatio["noRenewReasonTrend"];

  myCharts!: ECharts;

  mounted() {
    this.myCharts = echarts.init(this.charts);
    this.renderCharts();
  }

  @Watch("value")
  renderCharts() {
    type Previous = { xAxis: string[]; group: number[]; city: number[] };
    const data: Previous = { xAxis: [], group: [], city: [] };

    this.value.forEach((item) => {
      data.xAxis.push(item.reason);
      data.group.push(item.groupRatio);
      data.city.push(item.ratio);
    });

    const option: EChartsOption = {
      tooltip: {
        trigger: "axis",
        formatter: (value: any) => {
          const [a] = value;
          return `
            ${a.axisValueLabel.replace("\n", "")}<br />
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
          fontSize: 10,
        },
      },
      grid: {
        containLabel: true,
        top: "3%",
        left: "2%",
        right: "2%",
        bottom: "35",
      },
      legend: {
        data: ["全国", "门店"],
        bottom: 0,
        textStyle: {
          fontSize: toRpx(10),
        },
      },
      xAxis: [
        {
          type: "category",
          data: data.xAxis,
          axisLabel: {
            color: "#64696E",
            rotate: 60,
            align: "right",
            verticalAlign: "top",
            fontSize: toRpx(10),
            formatter(value: any) {
              return value.replace(/(.{4})/g, "$1\n");
            },
          },
          axisPointer: {
            type: "shadow",
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
        // min: 0,
        // max: 100,
        // interval: 20,
        splitNumber: 5,
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
          name: "全国",
          type: "bar",
          data: data.group,
          color: "#5CA2FF",
          itemStyle: {
            borderRadius: [toRpx(2), toRpx(2), 0, 0],
          },
        },
        {
          name: "门店",
          type: "bar",
          data: data.city,
          color: "#FFD66B",
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
  height: 200px;
  z-index: 1;
  position: relative;
}
</style>
