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
export default class A1 extends Base {
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
    this.objData1 = arrayToObject(this.pieData1, {
      key: "name",
      value: "value",
    });
    this.objData2 = arrayToObject(this.pieData2, {
      key: "name",
      value: "value",
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
        right: "16%",
        top: "center",
        icon: "rec",
        itemWidth: 20,
        itemHeight: 20,
        itemGap: 35,
        data: this.names,
        formatter: (params: any) => {
          return `{a|${params}:}{b|${this.objData1[params]}}{c|个}{b|${this.objData2[params]}}{c|间}`;
        },
        textStyle: {
          rich: {
            a: {
              color: "#FFFFFF",
              fontSize: 28,
              lineHeight: 39,
              width: 168,
            },
            b: {
              fontFamily: "DIN Alternate",
              color: "#01F5F1",
              fontWeight: "bold",
              fontSize: 34,
              lineHeight: 36,
              align: "right",
              marginLeft: 20,
            },
            c: {
              fontFamily: "DIN Alternate",
              color: "#01F5F1",
              fontSize: 26,
              lineHeight: 26,
              marginLeft: 6,
              align: "right",
            },
          },
        },
      },
      series: [
        {
          type: "pie",
          avoidLabelOverlap: false,
          radius: ["60%", 120],
          center: ["31%", "48%"],
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
}
</style>
