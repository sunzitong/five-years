<template>
  <div class="pie-chart">
    <div class="header">
      <div class="red">
        红
        <span class="value__letter">{{ response.redNum }}</span>
      </div>
      <div class="orange">
        橙
        <span class="value__letter">{{ response.yellowNum }}</span>
      </div>
    </div>
    <div class="chart" ref="pieChart"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Watch } from "vue-property-decorator";
import * as echarts from "echarts";
import { arrayToObject, iwant } from "@guanyu/shared";
import Base from "@/views/Base";
import { SentimentReturn } from "@/service/analysis/bigScreen/mainBoard/managementSituation/sentiment";

@Component
export default class E5B extends Base {
  @Ref() pieChart!: HTMLDivElement;

  /**
   * 父组件传进来的数据
   */
  @Prop({ required: true }) response!: SentimentReturn;

  /**
   * 按照数据类型为索引赋值
   */
  responseMap = {};

  /**
   * 数据更新重绘Echart
   */
  @Watch("response", { deep: true })
  onResponse(response: SentimentReturn) {
    /**
     * 转换数据类型
     */
    const data = iwant.array(response.numsByType).map((item) => {
      return {
        name: item.typeNum,
        value: item.num,
      };
    });
    /**
     * 存储数据
     */
    this.responseMap = arrayToObject(response.numsByType, {
      key: "typeNum",
      value: "num",
    });

    /**
     * 重绘图表
     */
    this.echarts.setOption({
      series: [{ data }],
    });
  }

  /**
   * 渲染bar
   */
  renderPieChart() {
    this.echarts = echarts.init(this.pieChart);
    const option = {
      legend: {
        orient: "vertical",
        right: "10%",
        top: "center",
        icon: "rec",
        itemWidth: 20,
        itemHeight: 20,
        itemGap: 16,
        formatter: (params: any) => {
          console.log(params);
          return `{a|${params}}{b|  ${this.responseMap[params]}%}`;
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
          data: [],
        },
      ],
    };
    option && this.echarts.setOption(option);
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
