<template>
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
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import * as echarts from "echarts";
import { ECOption } from "@/plugins/echarts";
import { arrayToObject } from "@guanyu/shared";
import Base from "@/views/Base";

@Component
export default class E5B extends Base {
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

  mounted() {
    this.renderPieChart();
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
