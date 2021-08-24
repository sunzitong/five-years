<template>
  <div style="padding-bottom: 20px">
    <div ref="charts" class="charts" v-show="hasData"></div>
    <Empty v-if="!hasData" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import { ECharts } from "echarts/core";
import { EChartsOption } from "echarts/types/dist/shared";
import { toRpx } from "@/utils/tools";
import { iwant } from "@guanyu/shared";
import { MarketingCost } from "@/service";

@Component
export default class ChannelAnalysisComponent extends Vue {
  @Ref() charts!: HTMLDivElement;

  @Prop({ default: () => [] }) value!: MarketingCost["channel"];

  @Prop({ default: "" }) text!: string;

  @Prop({ default: "" }) subtext!: string;

  myCharts!: ECharts;

  get hasData() {
    return (this.value ?? []).length;
  }

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
    const pipAttrs = {
      chartWidth: this.myCharts.getWidth(),
      chartHeight: this.myCharts.getHeight(),
      width: toRpx(100),
      height: toRpx(100),
      legendHeight: toRpx(90),
    };

    const data = iwant.array(this.value).map((item) => {
      return {
        name: item.channelDesc,
        value: item.ratio,
      };
    });

    const mapValue = iwant.array(this.value).reduce((prev, curr) => {
      prev[curr.channelDesc] = curr;
      return prev;
    }, {});

    console.log(mapValue);

    const option: EChartsOption = {
      color: ["#5CA2FF", "#8DE9B1", "#FFD66B", "#FF8590", "#E8DBFB", "#D2D2D7"],
      grid: {
        containLabel: true,
        top: "8%",
        left: "0%",
        right: "2%",
        bottom: toRpx(25),
      },
      title: {
        text: this.text,
        subtext: this.subtext,
        left: toRpx(56),
        top: "center",
        textAlign: "center",
        textVerticalAlign: "middle",
        width: toRpx(100),
        textStyle: {
          fontSize: toRpx(12),
        },
        subtextStyle: {
          fontSize: toRpx(10),
          color: "#A5AAAF",
        },
      },
      legend: {
        left: toRpx(130),
        top: "center",
        itemHeight: toRpx(10),
        itemWidth: toRpx(10),
        itemGap: toRpx(14),
        orient: "vertical",
        formatter(v) {
          const num = mapValue[v]?.num ?? "--";
          const ratio = mapValue[v]?.ratio ?? "--";
          return `{name|${v}}{percentage|${ratio}%}{price|${num}}`;
        },
        textStyle: {
          fontSize: 12,
          color: "#A5AAAF",
          rich: {
            name: {
              width: toRpx(82),
            },
            price: {
              width: toRpx(50),
              align: "right",
              color: "#232832",
            },
            percentage: {
              align: "right",
              width: toRpx(50),
              color: "#232832",
            },
          },
        },
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          top: (pipAttrs.chartHeight - pipAttrs.height) / 2,
          left: toRpx(10),
          width: pipAttrs.width,
          height: pipAttrs.height,
          radius: ["60%", "100%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: false,
              fontSize: "40",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data,
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
  height: 160px;
  z-index: 1;
  position: relative;
}
</style>
