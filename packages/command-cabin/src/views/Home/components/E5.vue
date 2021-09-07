<template>
  <div class="page__maintenance_report__map">
    <div
      class="app-echarts"
      ref="barChart"
      style="width: 100%; height: 500px"
    ></div>
    <div class="pie-chart">
      <div class="header">
        <div class="red">
          红
          <span class="value__letter">12</span>
        </div>
        <div class="orange">
          橙
          <span class="value__letter">23</span>
        </div>
      </div>
      <div class="chart" ref="pieChart"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import * as echarts from "echarts";
import { ECOption } from "@/plugins/echarts";
import { arrayToObject } from "@guanyu/shared";
import Base from "@/views/Base";

@Component
export default class E5 extends Base {
  @Ref() barChart!: HTMLDivElement;

  /**
   * 定时器
   */
  barTimer: null | number = null;

  /**
   * 组件卸载
   */
  unmounted() {
    if (this.barTimer) clearTimeout(this.barTimer);
    this.barTimer = null;
  }

  mounted() {
    this.renderBarChart();
    this.renderPieChart();
  }

  renderBarChart() {
    const myChart = echarts.init(this.barChart);
    const option: ECOption = {
      grid: {
        top: "12%",
        right: "5%",
        left: "8%",
        bottom: "12%",
      },
      tooltip: {
        show: true,
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        showContent: false,
      },
      dataZoom: [
        {
          type: "inside",
          zoomLock: true,
          start: 1,
          end: 50,
        },
        {
          type: "slider",
          show: false,
        },
      ],
      xAxis: [
        {
          type: "category",
          data: [
            "北京",
            "上海",
            "广西",
            "广州",
            "四川",
            "重庆",
            "天津",
            "河北",
            "河南",
            "湖南",
            "湖北",
            "福建",
            "浙江",
            "江西",
            "北京1",
            "上海1",
            "广西1",
            "广州1",
            "四川1",
            "重庆1",
            "天津1",
            "河北1",
            "河南1",
            "湖南1",
            "湖北1",
            "福建1",
            "浙江1",
            "江西1",
          ],
          axisLine: {
            lineStyle: {
              color: "rgba(0,0,0,0)",
            },
          },
          axisLabel: {
            margin: 20,
            rotate: 60, //x轴倾斜40°
            color: "#fff",
            fontSize: 14,
          },
        },
      ],
      yAxis: [
        {
          axisLabel: {
            formatter: "{value}",
            color: "#fff",
            fontSize: 20,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "red",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#1B4985",
              type: [15, 10],
              dashOffset: 5,
            },
          },
          axisTick: {
            show: false,
          },
          splitArea: {
            show: false,
          },
        },
      ],
      series: [
        {
          type: "bar",
          data: [
            60,
            87,
            140,
            60,
            80,
            112,
            22,
            46,
            87,
            64,
            120,
            78,
            38,
            98,
            60,
            87,
            140,
            60,
            80,
            112,
            22,
            46,
            87,
            64,
            120,
            78,
            38,
            98,
          ],
          stack: "a",
          barWidth: 20,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "#1A91FF", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#60E0FD", // 100% 处的颜色
                },
              ],
              false
            ),
          },
          label: {
            show: true,
            color: "#fff",
            fontSize: 18,
          },
        },
        {
          type: "bar",
          stack: "a",
          data: [
            20,
            2,
            2,
            20,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            20,
            2,
            2,
            2,
            2,
          ],
          barWidth: 20,
          itemStyle: {
            color: "#EEBC4A",
          },
          label: {
            show: true,
            align: "center",
            color: "#fff",
            fontSize: 18,
          },
        },
      ],
    };
    option && myChart.setOption(option);
    let index = 1;
    const nextLoop = () => {
      index += 1;
      const opt: any = myChart.getOption();
      if (opt.dataZoom[0]?.end >= 100) {
        index = 0;
        myChart.setOption({ animation: false });
      } else {
        myChart.setOption({ animation: true });
      }
      myChart.setOption({
        dataZoom: [
          {
            start: index,
            end: Math.min(index + 51, 100),
          },
        ],
      });
      this.barTimer = setTimeout(nextLoop, 1000);
    };
    this.barTimer = setTimeout(nextLoop, 1000);
    /**
     * 数据缩放事件
     */
    myChart.on("datazoom", (e) => {
      index = Math.floor(e.batch[0].start);
      if (this.barTimer) {
        clearTimeout(this.barTimer);
        this.barTimer = setTimeout(nextLoop, 5000);
      }
    });
  }

  @Ref() pieChart!: HTMLDivElement;

  renderPieChart() {
    const pieData = [
      {
        name: "01",
        value: "43",
      },
      {
        name: "02",
        value: "53",
      },
      {
        name: "03",
        value: "43",
      },
      {
        name: "04",
        value: "43",
      },
      {
        name: "05",
        value: "43",
      },
      {
        name: "06",
        value: "43",
      },
      {
        name: "07",
        value: "43",
      },
    ];
    const pieObjData = arrayToObject(pieData, {
      key: "name",
      value: "value",
    });
    const myChart = echarts.init(this.pieChart);
    let option = {
      legend: {
        orient: "vertical",
        right: "10%",
        top: "center",
        icon: "rec",
        itemWidth: 20,
        itemHeight: 20,
        itemGap: 16,
        data: pieData,
        formatter: (params: any) => {
          return `{a|${params}}{b|  ${pieObjData[params]}%}`;
        },
        textStyle: {
          rich: {
            a: {
              color: "#BFC0C1",
              fontFamily: "DIN Alternate",
              fontSize: 26,
              width: 84,
            },
            b: {
              color: "#01F5F1",
              fontFamily: "DIN Alternate",
              fontSize: 34,
              align: "right",
              width: 120,
              marginLeft: 84,
            },
          },
        },
      },
      series: [
        {
          type: "pie",
          avoidLabelOverlap: false,
          radius: ["35%", 130],
          center: ["25%", "52%"],
          color: [
            "#FF2A76",
            "#F4BD44",
            "#E49981",
            "#4988FD",
            "#67E1FB",
            "#55E49E",
            "#F9D399",
          ],
          label: {
            show: false,
          },
          data: pieData,
        },
      ],
    };
    option && myChart.setOption(option);
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  }
}
</script>

<style lang="scss" scoped>
$light: #01f5f1;
.pie-chart {
  margin-top: 50px;
  .header {
    display: flex;
    margin: 0 50% -40px 0;
    .red,
    .orange {
      font-size: 30px;
      span {
        font-size: 40;
        color: $light;
      }
    }
    .red {
      margin: 0 42px 0 auto;
    }

    .orange {
      margin: 0 auto 0 42px;
    }
  }
  .chart {
    width: 100%;
    height: 400px;
  }
}
</style>
