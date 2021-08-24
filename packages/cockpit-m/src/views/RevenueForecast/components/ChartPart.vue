<template>
  <div class="chart-part">
    <div class="chart">
      <ProCard title="长租收入月度趋势及预测">
        <div ref="monthlyLongTermChart" class="chart1"></div>
      </ProCard>
    </div>
    <div class="chart">
      <ProCard title="平均出租率和房价趋势及预测">
        <div ref="averageChart" class="chart2"></div>
      </ProCard>
    </div>
  </div>
</template>

<script lang="ts">
import Base from "@/views/Base";
import ProCard from "@/components/ProCard.vue";
import { Component, Prop, Ref, Watch } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import { EChartsOption } from "echarts/types/dist/shared";
import { AnyObject, iwant } from "@guanyu/shared";
import { toRpx } from "@/utils/tools";

@Component({
  components: {
    ProCard,
  },
})
export default class ChartPart extends Base {
  @Prop({ default: () => [] }) readonly chartData!: AnyObject[];

  // 图1：长期收入月度趋势及预测
  @Ref() readonly monthlyLongTermChart!: HTMLDivElement;
  // 图2：平均出租率和房价趋势及预测
  @Ref() readonly averageChart!: HTMLDivElement;

  /** 获取可以等分的最大值 */
  getChartMaxValue(
    array: number[],
    splitNumber = 5,
    start: number,
    space: number
  ) {
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

    maxValue = Math.ceil(maxValue / space) * space;
    let interval = iwant.calc((maxValue - start) / splitNumber);
    interval = interval < 1 ? interval : Math.ceil(interval);

    return {
      max: maxValue,
      interval,
      min: start,
    };
  }

  mounted() {
    this.monthlyChart = echarts.init(this.monthlyLongTermChart);
    this.rendermonthlyCharts();

    this.averageRentChart = echarts.init(this.averageChart);
    this.renderaverageCharts();
  }

  @Watch("chartData")
  rendermonthlyCharts() {
    const xAxis: string[] = []; //时间
    const longTermIncome: (number | "")[] = []; //长租收入
    const IncomeForecast: (number | "")[] = []; //预测长租收入
    iwant.array(this.chartData).forEach((el) => {
      xAxis.push(el.dataDate);
      if (!el.isFuture) {
        longTermIncome.push(el.income);
        IncomeForecast.push("");
      } else {
        longTermIncome.push("");
        IncomeForecast.push(el.income);
      }
    });

    const option: EChartsOption = {
      tooltip: {
        trigger: "axis",
        renderMode: "html",
        formatter: (params: any) => {
          // console.log("params-->", params);
          const styleInner = `display:inline-block;text-align:left;`;
          const style = `font-size: ${toRpx(10)}px;line-height: ${toRpx(
            12
          )}px; margin-bottom: ${toRpx(4)}px;color:rgba(35, 40, 50, 1);`;
          const str = `<span style='${style}'>${params[0].axisValueLabel}</span>`;
          const arr = (params as any[]).map((item) => {
            if (item.data) {
              return `<div style='${style}'><span style="${styleInner}">${
                item.seriesName
              }</span>：${iwant.calc(item.data, 1, true)}</div>`;
            }
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
        itemWidth: 10,
        itemHeight: 10,
        itemStyle: {
          color: "#5CA2FF",
        },
        itemGap: 16,
        textStyle: { color: "#A5AAAF", fontSize: 10 },
        data: [
          { name: "长租收入（万元）", itemStyle: { color: " #5CA2FF" } },
          { name: "预测长租收入（万元）", itemStyle: { color: "#DDF3FF" } },
        ],
      },
      grid: {
        top: "5%",
        bottom: "11%",
        left: "6%",
        right: "8%",
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
        type: "value",
        axisLabel: {
          color: "#A5AAAF",
          fontSize: 10,
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
          name: "长租收入（万元）",
          type: "bar",
          stack: "total",
          barWidth: "6",
          itemStyle: {
            color: "#5CA2FF",
          },
          data: longTermIncome,
        },
        {
          name: "预测长租收入（万元）",
          type: "bar",
          stack: "total",
          barWidth: "6",
          itemStyle: {
            color: "#DDF3FF",
          },
          data: IncomeForecast,
        },
      ],
    };
    this.monthlyChart.setOption(option);
  }

  @Watch("chartData")
  renderaverageCharts() {
    const xAxis: string[] = []; //时间
    const price: (number | "")[] = []; //平均房价
    const priceForecast: (number | "")[] = []; //预测长期收入
    const rentRatio: (number | "")[] = []; //平均出租率
    const rentRatioForecast: (number | "")[] = []; //预测平均出租率
    const yLeftLabel: number[] = []; //左纵坐标
    const yRightLabel: number[] = []; //右纵坐标
    let specPoint: number;
    iwant.array(this.chartData).forEach((el, index) => {
      xAxis.push(el.dataDate);
      if (!el.isFuture) {
        price.push(el.price);
        priceForecast.push("");
        rentRatio.push(el.rentRatio);
        yRightLabel.push(el.rentRatio);
        yLeftLabel.push(el.price);
        if (this.chartData[index + 1]?.isFuture === true) {
          specPoint = index;
          rentRatioForecast.push(el.rentRatio);
        } else {
          rentRatioForecast.push("");
        }
      } else {
        price.push("");
        priceForecast.push(el.price);
        rentRatio.push("");
        rentRatioForecast.push(el.rentRatio);
        yRightLabel.push(el.rentRatio);
        yLeftLabel.push(el.price);
      }
    });

    const option: EChartsOption = {
      tooltip: {
        trigger: "axis",
        renderMode: "html",
        formatter: (params: any) => {
          // console.log("params-->", params);
          const styleInner = `display:inline-block;text-align:left;`;
          const style = `font-size: ${toRpx(10)}px;line-height: ${toRpx(
            12
          )}px; margin-bottom: ${toRpx(4)}px;color:rgba(35, 40, 50, 1);`;
          const str = `<span style='${style}'>${params[0].axisValueLabel}</span>`;
          const arr = (params as any[])
            .filter((item) => item.data !== "")
            .map((item) => {
              if (item.seriesName === "预测平均出租率") {
                if (item.dataIndex === specPoint) {
                  return "";
                } else {
                  return `<div style='${style}'><span style="${styleInner}">${
                    item.seriesName
                  }</span>：${iwant.calc(item.data, 1, true)}%</div>`;
                }
              } else {
                if (
                  item.seriesName === "平均房价" ||
                  item.seriesName === "预测平均房价"
                ) {
                  return `<div style='${style}'><span style="${styleInner}">${
                    item.seriesName
                  }</span>：${iwant.calc(item.data, 1, true)}</div>`;
                } else {
                  return `<div style='${style}'><span style="${styleInner}">${
                    item.seriesName
                  }</span>：${iwant.calc(item.data, 1, true)}%</div>`;
                }
              }
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
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 16,
        textStyle: { color: "#A5AAAF", fontSize: 10 },
        data: [
          { name: "平均房价", itemStyle: { color: " #5CA2FF" } },
          { name: "预测平均房价", itemStyle: { color: "#DDF3FF" } },
          {
            name: "平均出租率",
            itemStyle: {
              color: "#FFC227",
              borderWidth: 2,
              borderColor: "rgba(255, 194, 39, 0.26)",
            },
          },
          { name: "预测平均出租率", itemStyle: { color: "#FFEEC4" } },
        ],
      },
      grid: {
        top: "5%",
        bottom: "11%",
        left: "6%",
        right: "5%",
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
      yAxis: [
        {
          type: "value",
          name: "平均房价",
          ...this.getChartMaxValue(yLeftLabel, 4, 0, 100),
          axisLabel: {
            color: "#A5AAAF",
            fontSize: 10,
          },
          splitLine: { show: false },
        },
        {
          type: "value",
          name: "平均出租率",
          ...this.getChartMaxValue(yRightLabel, 4, 0, 50),
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
      ],
      series: [
        {
          name: "平均房价",
          type: "bar",
          stack: "total",
          yAxisIndex: 0,
          barWidth: "6",
          itemStyle: {
            color: "#5CA2FF",
          },
          data: price,
        },
        {
          name: "预测平均房价",
          type: "bar",
          stack: "total",
          yAxisIndex: 0,
          barWidth: "6",
          itemStyle: {
            color: "#DDF3FF",
          },
          data: priceForecast,
        },
        {
          name: "预测平均出租率",
          type: "line",
          yAxisIndex: 1,
          symbol: "circle", //折线点的图形
          symbolSize: 4, //图形大小
          lineStyle: {
            color: "#FFE5A4",
            type: "dashed",
            width: 1,
          },
          itemStyle: {
            color: "#FFEEC4",
          },
          data: rentRatioForecast,
        },
        {
          name: "平均出租率",
          type: "line",
          yAxisIndex: 1,
          symbol: "circle", //折线点的图形
          symbolSize: 4, //图形大小
          lineStyle: {
            color: "#FFC227",
            width: 1,
          },
          itemStyle: {
            color: "#FFC227",
            borderColor: "rgba(255, 194, 39, 0.26)",
            borderWidth: 2,
          },
          data: rentRatio,
        },
      ],
    };
    this.averageRentChart.setOption(option);
  }
}
</script>

<style lang="scss" scoped>
.chart {
  margin-bottom: 13px;
}

.chart1 {
  height: 241px;
  width: 100%;
}

.chart2 {
  height: 264px;
  width: 100%;
}
</style>
