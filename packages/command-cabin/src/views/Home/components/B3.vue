js
<template>
  <div class="page__b3__map">
    <van-row class="abstract_text">
      <van-col :span="12">成本风险预警项目</van-col>
      <van-col class="span_style1">
        {{ projecttNum }}
        <span>个</span>
      </van-col>
    </van-row>
    <van-row class="abstract_text">
      <van-col :span="12">总体成本差异率</van-col>
      <van-col class="span_style2">{{ differRatio }}%</van-col>
    </van-row>
    <div class="whole_chart">
      <div class="item_name">
        <div
          class="item_name_item van-ellipsis"
          v-for="(itemName, index) in labels"
          :key="index"
        >
          {{ itemName }}
        </div>
      </div>
      <div
        class="app-echarts"
        ref="wrapper"
        style="width: 270px; height: 217px"
      ></div>
      <div class="item_value">
        <div
          class="item_value_item"
          v-for="(itemValue, index) in values"
          :key="index"
        >
          {{ itemValue }}%
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import Base from "@/views/Base";

@Component({
  components: {},
})
export default class B3 extends Base {
  /**
   * 条形图
   */
  @Ref() wrapper!: HTMLDivElement;

  projecttNum = 4; // 成本风险预警项目
  differRatio = -15; // 总体成本差异率

  // name标签
  labels = [
    "回龙观",
    "大学城",
    "南二环",
    "望京北路",
    // "麦旋风",
    // "苹果派",
  ];

  // 数值标签
  values = [7.2, 44.7, 100, 76];

  mounted() {
    const myChart = echarts.init(this.wrapper);
    // myChart.showLoading();
    let option = {
      grid: {
        x: 0,
        y: 0,
        x2: 0,
        y2: -20,
        left: "0%",
        right: "0%",
        containLabel: true,
      },
      xAxis: { show: false, max: 100 },
      yAxis: {
        type: "category",
        inverse: true,
        axisLine: { show: false },
        splitLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        data: this.labels,
      },
      series: [
        {
          type: "bar",
          stack: "total",
          barWidth: 37,
          barCateGoryGap: 23,
          showBackground: true,
          backgroundStyle: {
            color: "#143F79",
          },
          itemStyle: {
            color: "#57A6FB",
            width: 338,
          },
          label: { show: false },
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
.page__b3__map {
  margin-top: 40px;
}
.abstract_text {
  font-family: "PingFang SC";
  font-size: 30px;
  line-height: 30px;
  color: #ffffff;
  margin: 18px 0 18px 18px;
}
.span_style1 {
  font-family: "DIN Alternate";
  font-weight: bold;
  font-size: 40px;
  line-height: 36px;
  color: #01f5f1;

  span {
    margin-left: 6px;
    font-size: 26px;
    line-height: 26px;
    font-weight: normal;
  }
}
.span_style2 {
  font-family: "DIN Alternate";
  font-weight: bold;
  font-size: 40px;
  line-height: 36px;
  color: #ff2a76;
}

.whole_chart {
  display: inline-block;
  display: flex;
  flex-flow: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  margin-top: 76px;

  .item_name {
    color: #fff;

    .item_name_item {
      margin: 20px 0;
      font-family: "PingFang SC";
      font-size: 28px;
      line-height: 32px;
      width: 200px;
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
      text-align: right;
    }
  }
}
</style>
