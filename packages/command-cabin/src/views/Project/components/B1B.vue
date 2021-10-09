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

    if (!this.myChart) {
      this.myChart = echarts.init(this.wrapper);
      mitter.on(EventName.ResizeEcharts, () => {
        myChart.resize();
      });
    }

    const { myChart } = this;
    let option = {
      graphic: {
        // 区域内文字
        type: "text",
        left: 270,
        top: "28%",
        z: 100,
        style: {
          text: "已发生",
          textAlign: "center",
          fontSize: 36,
          lineHeight: 36,
          fill: "#FFFFFF",
        },
      },
      tooltip: {
        //触发方式
        trigger: "axis", //坐标
      },
      legend: {
        left: 0,
        padding: [32, 0],
        itemGap: 16,
        itemWidth: 30,
        itemStyle: { opacity: 0 },
        // itemHeight: 4,
        // color: ["#57A6FB", "#A957FB", "#F7D14A", "#57FBB6"],
        data: [
          {
            name: "投资任务书版",
            itemStyle: { opacity: 0 },
            lineStyle: { color: "#57A6FB" },
          },
          {
            name: "最新过会版",
            itemStyle: { opacity: 0 },
            lineStyle: { color: "#A957FB" },
          },
          {
            name: "月度运维版",
            itemStyle: { opacity: 0 },
            lineStyle: { color: "#F7D14A" },
          },
          {
            name: "实际",
            itemStyle: { opacity: 0 },
            lineStyle: { color: "#57FBB6" },
          },
        ],
        lineStyle: {
          width: 4,
        },
        textStyle: {
          color: "#90A4C3",
          fontSize: 36,
          lineHeight: 26,
        },
        right: "10%",
      },
      grid: {
        top: "28%",
        left: "3%",
        right: "6%",
        bottom: "3%",
        //是否显示刻度标签
        containLabel: true,
      },
      xAxis: [
        {
          name: "运营年",
          nameLocation: "end",
          nameTextStyle: {
            color: "#90A4C3",
            fontSize: 24,
            lineHeight: 26,
            padding: [21, 0, 0, 0],
          }, // 设置坐标轴名称
          // type: "value",
          // minInterval: 1, // 只显示整数
          type: "category",
          position: "bottom",
          boundaryGap: false,
          data: this.xLabel0,
          splitNumer: 3,
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "rgba(120, 200, 211, 0.44)",
              width: 2,
            }, // 分割线
          },
          // splitNumber: 2,
          splitArea: {
            show: true,
            areaStyle: {
              color: [
                new echarts.graphic.LinearGradient(
                  0,
                  1,
                  0,
                  0, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                  [
                    { offset: 0, color: "rgba(32, 55, 113, 0) " },
                    { offset: 0.8, color: "rgba(32, 55, 113, 0.3)" },
                    { offset: 1, color: "rgba(32, 55, 113, 0)" },
                  ]
                ),
                "transparent",
                "transparent",
              ],
            }, // 分割区域
          },
          axisLine: {
            lineStyle: {
              width: "2",
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                [
                  { offset: 0, color: "rgba(32, 55, 113, 0) " },
                  { offset: 0.5, color: "rgba(32, 55, 113, 0.24)" },
                  { offset: 1, color: "rgba(32, 55, 113, 0)" },
                ]
              ),
            },
          }, // 轴线
          axisTick: { show: false },
          axisLabel: {
            fontFamily: this.store.env.TEXT_FONT,
            color: "#90A4C3",
            margin: 13,
            fontSize: 26,
            lineHeight: 36,
            // formatter: (value: any) => {
            //   return parseInt(value);
            // },
          },
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
        name: "百分比",
        nameLocation: "end",
        nameTextStyle: {
          color: "#90A4C3",
          fontSize: 24,
          lineHeight: 26,
          padding: [21, 0, 0, 0],
        },
        type: "value",
        axisLine: {
          show: true,
          lineStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
              [
                { offset: 0, color: "rgba(32, 55, 113, 0) " },
                { offset: 0.5, color: "rgba(32, 55, 113, 0.24)" },
                { offset: 1, color: "rgba(32, 55, 113, 0)" },
              ]
            ),
          },
        },
        splitLine: { show: false },
        // axisTick: { show: false },
        axisLabel: {
          fontFamily: this.store.env.TEXT_FONT,
          color: "#90A4C3",
          margin: 13,
          fontSize: 26,
          lineHeight: 36,
          formatter: function (value: number) {
            return value + "%";
          },
        },
      },
      series: [
        {
          name: "投资任务书版",
          data: this.yLabel0[0],
          lineStyle: { color: "#57A6FB", width: 4 },
          type: "line",
          symbol: "none",
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
          lineStyle: { color: "#A957FB", width: 4 },
          type: "line",
          symbol: "none",
          areaStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
              [
                { offset: 0, color: "rgba(169, 87, 251, 0.2)" },
                { offset: 1, color: "rgba(169, 87, 251, 0)" },
              ]
            ),
          },
        },
        {
          name: "月度运维版",
          data: this.yLabel2[0],
          lineStyle: { color: "#F7D14A", width: 4 },
          type: "line",
          symbol: "none",
          areaStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
              [
                { offset: 0, color: "rgba(247, 209, 74, 0.2)" },
                { offset: 1, color: "rgba(247, 209, 74, 0)" },
              ]
            ),
          },
        },
        {
          name: "实际",
          data: this.yLabel3[0],
          lineStyle: { color: "#57FBB6", width: 4 },
          type: "line",
          symbol: "none",
          areaStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
              [
                { offset: 0, color: "rgba(87, 251, 182, 0.2)" },
                { offset: 1, color: "rgba(87, 251, 182, 0)" },
              ]
            ),
          },
        },
      ],
    };
    option && myChart.setOption(option);
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
