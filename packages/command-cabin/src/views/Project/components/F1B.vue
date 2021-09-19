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
    <div class="chart-bg" v-if="showBarShadow"></div>
    <div class="chart" ref="pieChart"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Watch } from "vue-property-decorator";
import * as echarts from "echarts";
import { arrayToObject, iwant } from "@guanyu/shared";
import { Base } from "@/views/Base";
import { SentimentReturn } from "@/service/analysis/bigScreen/mainBoard/managementSituation/sentiment";

@Component
export default class F1B extends Base {
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
      value: "ratio",
    });

    /**
     * 重绘图表
     */
    this.echarts.setOption({
      series: [{ data }],
    });
  }

  /**
   * 是否显示阴影
   */
  get showBarShadow() {
    return (this.response?.numsByType ?? []).length !== 0;
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
          return `{a|${params}}{b| ${iwant.calc(
            this.responseMap[params],
            1,
            true
          )}%}`;
        },
        textStyle: {
          rich: {
            a: {
              color: "#90A4C3",
              fontFamily: "DIN Alternate",
              fontSize: 26,
              width: 84,
            },
            b: {
              color: "#DBF0FF",
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
          radius: ["35%", 150],
          center: ["25%", "52%"],
          color: [
            "#F7D14A",
            "#ED8BA3",
            "#55D5F3",
            "#AE95F6",
            "#22CB98",
            "#D05FC5",
            "#3A6FFF",
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
  position: relative;
  margin-top: 50px;
  .header {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    margin: 0 50% 0 0;
    .red,
    .orange {
      min-width: 130px;
      text-align: center;
      font-size: 30px;
      color: #90a4c3;
      span {
        display: block;
        font-size: 40;
        padding: 0 20px;
      }
    }
    .red {
      span {
        color: #ff3980;
      }
    }
    .orange {
      span {
        color: #dbf0ff;
      }
    }
  }
  .chart {
    width: 100%;
    height: 600px;
  }
  .chart-bg {
    position: absolute;
    bottom: 30px;
    left: 50px;
    width: 300px;
    height: 150px;
    @extend %bg-img-bar-shadow;
  }
}
</style>
