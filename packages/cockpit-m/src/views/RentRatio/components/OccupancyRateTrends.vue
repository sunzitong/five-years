<template>
  <div class="occupancy_rate_trends">
    <ProCard title="近12个月出租率趋势">
      <div ref="rateTrendsChart" class="chart"></div>
    </ProCard>
  </div>
</template>

<script lang="ts">
import Base from "@/views/Base";
import { Component, Ref, Watch } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import { EChartsOption } from "echarts/types/dist/shared";
import ProCard from "@/components/ProCard.vue";
import { iwant } from "@guanyu/shared";
import { toRpx } from "@/utils/tools";

@Component({
  components: {
    ProCard,
  },
})
export default class OccupancyRateTrends extends Base {
  @Ref() readonly rateTrendsChart!: HTMLDivElement;

  get trendList() {
    return this.store.rentData.trend;
  }

  mounted() {
    this.myCharts = echarts.init(this.rateTrendsChart);
    this.renderCharts();
  }

  @Watch("trendList")
  renderCharts(): void {
    const xAxis: string[] = []; //时间
    const aveRent: number[] = []; //平均出租率
    const monthEndRent: number[] = []; //月末时点出租率
    const referenceRent: number[] = []; //出租率参考值

    this.trendList?.forEach((el) => {
      // let xLabel: any = el.dataDate.match(/\d+/g)?.join("/");
      // xAxis.push(xLabel);
      xAxis.push(el.dataDate);
      aveRent.push(el.avg);
      monthEndRent.push(el.monthEnd);
      referenceRent.push(el.consult);
    });

    const option: EChartsOption = {
      tooltip: {
        trigger: "axis",
        renderMode: "html",
        formatter: (params: any) => {
          const styleInner = `display:inline-block;text-align:left;width:9em;`;
          const style = `font-size: ${toRpx(10)}px;line-height: ${toRpx(
            12
          )}px; margin-bottom: ${toRpx(4)}px;color:rgba(35, 40, 50, 1);`;
          const str = `<span style='${style}'>${params[0].axisValueLabel}</span>`;
          const arr = (params as any[]).map((item) => {
            if (item.seriesName === "出租率参考值") return "";
            return `<div style='${style}'><span style="${styleInner}">${
              item.seriesName
            }</span>：${iwant.calc(item.data, 2, true)}%</div>`;
          });
          return str + arr.reverse().join("");
        },
        axisPointer: {
          lineStyle: {
            color: "#BABABA",
            width: 1,
            type: "solid",
          },
        },
      },
      legend: {
        bottom: 0,
        itemWidth: 12,
        itemStyle: {
          opacity: 0,
        },
        itemGap: 18,
        textStyle: { color: "#A5AAAF", fontSize: 10 },
        data: ["出租率参考值", "月末时点出租率", "平均出租率"],
      },
      grid: {
        top: "5%",
        bottom: "11%",
        left: "1%",
        right: "6%",
        borderWidth: 1,
        borderColor: "#F7F7F7",
        containLabel: true,
      },
      xAxis: {
        boundaryGap: false,
        axisLine: {
          show: true,
          lineStyle: {
            color: "#F7F7F7",
            type: "solid",
            width: 2,
          },
        },
        axisLabel: {
          color: "#64696E",
          fontSize: 10,
          interval: 0,
          rotate: 60,
        },
        data: xAxis,
      },
      yAxis: {
        min: 0,
        type: "value",
        axisLabel: {
          color: "#A5AAAF",
          fontSize: 10,
          formatter: "{value}%",
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#F7F7F7",
            type: "solid",
            width: 1,
          },
        },
      },
      series: [
        {
          name: "出租率参考值",
          type: "line",
          symbol: "none",
          lineStyle: {
            color: "#DC5564",
            width: 1,
            type: "dashed",
          },
          data: referenceRent,
        },
        {
          name: "月末时点出租率",
          type: "line",
          symbol: "none",
          lineStyle: {
            color: "#FFC327",
            width: 2,
          },
          data: monthEndRent,
        },
        {
          name: "平均出租率",
          type: "line",
          symbol: "none",
          lineStyle: {
            color: "#1C7AF7",
            width: 2,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(112, 169, 255, 0.53)",
              },
              {
                offset: 1,
                color: "rgba(225, 235, 255, 0)",
              },
            ]),
          },
          data: aveRent,
        },
      ],
    };

    this.myCharts.setOption(option);
  }
}
</script>

<style lang="scss" scoped>
.occupancy_rate_trends {
  &::v-deep {
    .pro__card__title__left {
      font-weight: bold;
      line-height: 24px;
      color: #232832;
    }
  }
}
.chart {
  height: 204px;
  width: 95%;
  margin-left: 18px;
}
</style>
