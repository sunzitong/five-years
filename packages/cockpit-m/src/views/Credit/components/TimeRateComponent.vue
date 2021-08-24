<template>
  <ProCard title="时点出租率趋势" styleTitle="font-size: 16px;">
    <div
      ref="charts"
      class="charts"
      style="height: 144px; z-index: 1; position: relative"
    ></div>
  </ProCard>
</template>

<script lang="ts">
import Base from "@/views/Base";
import { Component, Ref, Watch } from "vue-property-decorator";
import ProCard from "@/components/ProCard.vue";
import echarts from "@/plugins/echarts";
import { ECharts } from "echarts/core";
import { EChartsOption } from "echarts/types/dist/shared";

const padStart = (str: string) => str.padStart(5, "　");

@Component({
  components: {
    ProCard,
  },
})
export default class TimeRateComponent extends Base {
  @Ref() charts!: HTMLDivElement;

  myCharts!: ECharts;

  /**
   * 时点出租率
   */
  get rentRatio() {
    return this.store.optData?.reachTarget?.rentRatioList ?? [];
  }

  get targetRate() {
    return this.store.optData?.reachTarget?.rentTargetRatio ?? 0;
  }

  mounted() {
    this.myCharts = echarts.init(this.charts);
    this.renderCharts();
  }

  @Watch("rentRatio", { deep: true })
  renderCharts() {
    const { optStage } = this.store?.optData ?? {};
    const xAxis: string[] = []; // 时间
    const ratios: (number | string)[] = []; // 时点出租率
    const targets: number[] = []; // 时点目标
    const offsetNums: number[] = []; // 偏差
    const myTargets: number[] = []; // 我设置的目标值
    this.rentRatio.forEach((item) => {
      xAxis.push(item.dataDate);
      ratios.push(item.ratio === null ? "-" : item.ratio);
      targets.push(item.target);
      offsetNums.push(item.offsetNum);
      myTargets.push(this.targetRate ?? 0);
    });

    const option: EChartsOption = {
      tooltip: {
        trigger: "axis",
        renderMode: "html",
        formatter: (o: any) => {
          // 过虑掉了，爬坡目标
          const params = o.slice(1);
          const thirdName = "偏差";
          const dom = params
            .concat([{ seriesName: thirdName }])
            .map((item: any) => {
              if (item.seriesName === thirdName) {
                const val = offsetNums[o[0].dataIndex];
                const cls = val >= 0 ? "success" : "fail";
                return `<li class="${cls}">
                  ${padStart(item.seriesName)}：${val}%
                </li>`;
              }
              return `<li>${padStart(item.seriesName)}：${item.value}%</li>`;
            });
          const html = `
            <div class="charts-tooltip">
              <ul>
                <li>${padStart("日期")}：${o[0].axisValue}</li>
                ${dom.join("")}
              </ul>
            </div>
          `;
          return html;
        },
        axisPointer: {
          lineStyle: {
            color: "#BABABA",
            width: 2,
            type: "solid",
          },
        },
      },
      legend: {
        show: true,
        bottom: 0,
        itemWidth: 12,
        itemGap: 18,
        itemStyle: {
          opacity: 0,
        },
        formatter: function (name) {
          return name.replace(/\s/g, "");
        },
      },
      grid: {
        top: "4%",
        left: "3%",
        right: "6%",
        bottom: "15%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        triggerEvent: true,
        data: xAxis.map((item) => ({
          value: item,
          textStyle: {
            color: "#64696E",
          },
        })),
        axisLine: {
          lineStyle: {
            color: "#F7F7F7",
          },
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        min: 0,
        max: 100,
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
          name: optStage
            ? optStage === "PREPARE"
              ? "KP目标"
              : "爬坡目标"
            : "目标",
          type: "line",
          smooth: true,
          symbol: "none",
          lineStyle: {
            color: "#DC5564",
            type: "dashed",
            width: 1,
          },
          data: myTargets,
        },
        {
          name: "时点出租率",
          type: "line",
          symbol: "none",
          smooth: true,
          lineStyle: {
            color: "#1C7AF7",
            width: 0.5,
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
          data: ratios,
        },
        {
          // 为了字段对齐
          name: padStart("时点目标"),
          type: "line",
          smooth: true,
          symbol: "  none",
          lineStyle: {
            color: "#FFC327",
            width: 1,
          },
          data: targets,
        },
      ],
    };

    this.myCharts.setOption(option);

    setTimeout(() => {
      const relRatios = ratios.filter((item) => item !== "-");
      this.myCharts.dispatchAction &&
        this.myCharts.dispatchAction({
          type: "showTip",
          seriesIndex: 1, // 显示第几个series
          dataIndex: Math.max(relRatios.length - 1, 0), // 显示第几个数据
        });
    });
  }
}
</script>

<style lang="scss" scoped>
.charts {
  margin: 0 18px;
}

.charts::v-deep {
  .charts-tooltip {
    font-size: 12px;
    color: #232832;
    li {
      white-space: nowrap;
    }
    .success {
      color: #32cd96;
    }
    .fail {
      color: #dc5564;
    }
  }
}
</style>
