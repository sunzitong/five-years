<template>
  <div class="page__a1__map">
    <van-row justify="space-between" type="flex" class="top_text">
      <van-col :span="12">机会总数</van-col>
      <van-col :span="6" class="value_col">
        <span>{{ sepNumber(chanceNum) }}</span>
        <span>个</span>
      </van-col>
      <van-col :span="6" class="value_col">
        <span>{{ sepNumber(ChanceRoom) }}</span>
        <span>间</span>
      </van-col>
    </van-row>
    <div
      class="app-echarts"
      ref="wrapper"
      style="width: 100%; height: 250px"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import Base from "@/views/Base";
import { AnyObject, arrayToObject } from "@guanyu/shared";

@Component({
  components: {},
})
export default class A2 extends Base {
  /**
   * 饼图
   */
  @Ref() wrapper!: HTMLDivElement;

  chanceNum = 2300; // 机会总数
  ChanceRoom = 19000;

  pieData: AnyObject[] = [
    // 饼图对象数组
    {
      name: "过会待签约",
      value: 105,
      room: 6230,
    },
    {
      name: "立项待上会",
      value: 105,
      room: 6230,
    },
  ];

  objData1: AnyObject = {}; // 饼图name-value键值对对象
  objData2: AnyObject = {}; // 左侧饼图name-room键值对对象

  mounted() {
    this.objData1 = arrayToObject(this.pieData, {
      key: "name",
      value: "value",
    });
    this.objData2 = arrayToObject(this.pieData, {
      key: "name",
      value: "room",
    });
    this.paintPieChart();
  }

  paintPieChart() {
    const myChart = echarts.init(this.wrapper);
    // myChart.showLoading();
    let option = {
      grid: {
        x: "40%",
      },
      legend: {
        orient: "vertical",
        right: "5%",
        top: "center",
        icon: "rec",
        itemWidth: 20,
        itemHeight: 20,
        itemGap: 35,
        data: this.names,
        formatter: (params: any) => {
          return `{a|${params}:}{b|${this.sepNumber(
            this.objData1[params]
          )}}{c|个}{b|${this.sepNumber(this.objData2[params])}}{c|间}`;
        },
        textStyle: {
          rich: {
            a: {
              color: "#FFFFFF",
              fontSize: 28,
              lineHeight: 39,
              width: 140,
            },
            b: {
              fontFamily: "DIN Alternate",
              color: "#01F5F1",
              fontWeight: "bold",
              fontSize: 34,
              lineHeight: 36,
              align: "right",
              width: 100,
            },
            c: {
              fontFamily: "DIN Alternate",
              color: "#01F5F1",
              fontSize: 26,
              lineHeight: 26,
              width: 30,
              align: "right",
            },
          },
        },
      },
      series: [
        {
          type: "pie",
          avoidLabelOverlap: false,
          radius: ["40%", 90],
          center: ["18%", "48%"],
          color: ["#F7D14A", "#57A6FB"],
          label: {
            show: false,
          },
          data: this.pieData,
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
.top_text {
  border-bottom: 1px solid #1b4985;
  font-family: "PingFang SC";
  font-size: 30px;
  line-height: 30px;
  color: #ffffff;

  padding: 28px 0 28px 0;
  margin: 0 30px 0px 30px;

  .value_col span:nth-child(1) {
    font-family: "DIN Alternate";
    color: #01f5f1;
    font-weight: bold;
    font-size: 34px;
    line-height: 36px;
  }

  .value_col span:nth-child(2) {
    font-family: "DIN Alternate";
    color: #01f5f1;
    font-size: 26px;
    line-height: 26px;
    margin-left: 6px;
  }
}
</style>
