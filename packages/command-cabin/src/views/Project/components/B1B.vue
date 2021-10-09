<template>
  <div class="page__b1b__map">
    <div class="header">
      <div class="left_title">{{ title }}</div>
      <div class="tabs_box">
        <span class="tab_btn" v-for="(el, index) in tabNames" :key="index">
          {{ el }}
        </span>
      </div>
    </div>
    <div class="charts" ref="wrapper"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import { Base } from "@/views/Base";
import mitter, { EventName } from "@/utils/mitter";

@Component({
  components: {},
})
export default class B1B extends Base {
  /**
   * 折线图标题
   */
  @Prop({ default: () => "" }) readonly title!: string;
  /**
   * 折线图标签列表
   */
  @Prop({ default: () => [] }) readonly tabNames!: string[];
  /**
   * 折线图月度横坐标
   */
  @Prop({ default: () => [] }) readonly xLabel0!: number[];
  /**
   * 折线图年度横坐标
   */
  @Prop({ default: () => [] }) readonly xLabel1!: number[];
  /**
   * 折线图月度数据源1
   */
  @Prop({ default: () => [] }) readonly yLabel0!: number[][];
  /**
   * 折线图数据源2
   */
  @Prop({ default: () => [] }) readonly yLabel1!: number[][][];
  /**
   * 折线图数据源3
   */
  @Prop({ default: () => [] }) readonly yLabel2!: number[][][];
  /**
   * 折线图数据源4
   */
  @Prop({ default: () => [] }) readonly yLabel3!: number[][][];
  @Ref() wrapper!: HTMLDivElement;

  mounted() {
    console.log(
      this.yLabel0[0],
      this.yLabel1[0],
      this.yLabel2[0],
      this.yLabel3[0]
    );
    const myChart = echarts.init(this.wrapper);
    let option = {
      tooltip: {
        //触发方式
        trigger: "axis", //坐标
      },
      legend: {
        data: ["投资任务书版", "最新过会版", "月度运维版", "实际"],
        //修改图例组件中的文字颜色
        textStyle: {
          color: ["#57A6FB", "#A957FB", "#F7D14A", "#57FBB6"],
        },
        right: "10%",
      },
      grid: {
        top: "10%",
        // left: '3%%',
        // right: '4%',
        // bottom: '3%',
        //是否显示网格
        // show: true,
        //是否显示刻度标签
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          position: "bottom",
          boundaryGap: false,
          data: this.xLabel0,
          // axisLine: { show: false },
          splitLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: "#90A4C3" },
        },
        // {
        //   type: "category",
        //   boundaryGap: false,
        //   data: this.xLabel1,
        //   // axisLine: { show: false },
        //   // axisTick: { show: false },
        //   axisLabel: { color: "#90A4C3" },
        // },
      ],
      yAxis: {
        type: "value",
        axisLine: { show: true },
        splitLine: { show: false },
        // axisTick: { show: false },
        axisLabel: { color: "#90A4C3" },
      },
      series: [
        {
          name: "投资任务书版",
          data: this.yLabel0[0],
          type: "line",
          areaStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
              [
                { offset: 0, color: "rgba(87, 166, 251, 0.2)" },
                { offset: 1, color: "rgba(87, 166, 251, 0)" },
              ]
            ),
          },
        },
        {
          name: "最新过会版",
          data: this.yLabel1[0],
          type: "line",
          areaStyle: {
            color: "#A957FB",
          },
        },
        {
          name: "月度运维版",
          data: this.yLabel2[0],
          type: "line",
          areaStyle: {
            color: "#F7D14A",
          },
        },
        {
          name: "实际",
          data: this.yLabel3[0],
          type: "line",
          areaStyle: {
            color: "#57FBB6",
          },
        },
      ],
    };
    option && myChart.setOption(option);
    mitter.on(EventName.ResizeEcharts, () => {
      myChart.resize();
    });
  }
}
</script>

<style lang="scss" scoped>
.page__b1b__map {
  width: 100%;
  height: 600px;
}

.header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-end;

  .left_title {
    font-size: 40px;
    line-height: 40px;
    color: #ffffff;
  }
  .tabs_box {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    color: #90a4c3;
    background: rgba(56, 196, 255, 0.2);
    border-radius: 10px;

    .tab_btn {
      text-align: center;
      font-size: 30px;
      line-height: 80px;
      min-width: 160px;
      padding: 0 10px;
      height: 80px;
    }
  }
}

.charts {
  width: 100%;
  height: 512px;
  // background-color: #fff;
  margin-bottom: 35px;
}
</style>
