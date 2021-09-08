<template>
  <div class="page__product_quality__map">
    <div class="whole_pannel">
      <div class="item_name">
        <div
          class="item_name_item"
          v-for="(itemName, index) in labels"
          :key="index"
        >
          {{ itemName }}
        </div>
      </div>
      <div
        class="app-echarts"
        style="width: 280px; height: 270px"
        ref="wrapper"
      ></div>
      <div class="item_value">
        <div
          class="item_value_item"
          v-for="(itemValue, index) in values"
          :key="index"
        >
          {{ itemValue }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import {
  fetchProductQuality,
  ProductQualityReturn,
} from "@/service/bigScreen/mainBoard/construct/productQuality";
import dayjs from "dayjs";
import Base from "@/views/Base";

@Component({
  components: {},
})
export default class B4 extends Base {
  /**
   * 条形图
   */
  @Ref() wrapper!: HTMLDivElement;
  /**
   * 接口返回值
   * /bigScreen/mainBoard/construct/productQuality
   */
  resData: Partial<ProductQualityReturn> = {};
  year = dayjs().year();

  // name标签
  labels = [
    "IPD产品\n封装率",
    "中期停止点\n检查平均得分",
    "移交质量评估\n平均合格率",
  ];

  // 数值标签
  values = [0, 0, 0];

  async created() {
    const response = await fetchProductQuality({
      regionType: "CITY",
      regionId: 85,
      dataTime: this.year,
    });
    if (response?.status === "ok") {
      this.resData = response.data;

      this.values = [];
      for (let key in this.resData) {
        this.values.push(this.resData[key]);
      }

      this.paintChart();
    }
  }

  paintChart() {
    const myChart = echarts.init(this.wrapper);
    // myChart.showLoading();
    let option = {
      grid: {
        x: 0,
        y: 0,
        x2: 0,
        y2: -20,
        left: "0%",
        right: "5%",
        containLabel: true,
      },
      xAxis: { show: false, max: 100 },
      yAxis: {
        type: "category",
        inverse: true,
        axisLine: { show: false },
        splitLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          show: false,
          width: 64,
          interval: 0,
          margin: 31,
          left: -200,
          color: "#FFFFFF",
          fontSize: 28,
          lineHeight: 32,
        },
        data: this.labels,
      },
      series: [
        {
          type: "bar",
          stack: "total",
          barWidth: 8,
          showBackground: true,
          backgroundStyle: {
            color: "#143F79",
            borderRadius: 40,
          },
          itemStyle: {
            color: "#57A6FB",
            borderRadius: 40,
            width: 338,
          },
          label: {
            show: false,
            color: "#01F5F1",
            fontSize: 34,
            lineHeight: 36,
          },
          data: this.values,
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
.whole_pannel {
  display: inline-block;
  display: flex;
  flex-flow: row;
  flex-wrap: nowrap;
  justify-content: space-around;

  .item_name {
    white-space: pre-line;
    color: #fff;

    .item_name_item {
      margin: 20px 31px;
      font-family: "PingFang SC";
      font-size: 28px;
      line-height: 32px;
    }
  }

  .item_value {
    color: #01f5f1;
    display: inline-block;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;

    .item_value_item {
      margin: 0 24px 0 0px;
      @extend %value__letter;
      font-size: 34px;
      line-height: 36px;
    }
  }
}
</style>
