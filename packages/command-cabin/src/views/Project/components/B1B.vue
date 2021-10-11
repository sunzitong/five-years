<template>
  <div class="page__b1b__map">
    <div class="header">
      <div class="left_title">{{ title }}</div>
      <div class="tabs_box">
        <span
          class="tab_btn"
          :class="{ active: currentSort == index }"
          v-for="(el, index) in tabNames"
          :key="index"
          @click="handleClick(index)"
        >
          {{ el }}
        </span>
      </div>
    </div>
    <div class="charts" ref="wrapper"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Watch } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import { Base } from "@/views/Base";
import mitter, { EventName } from "@/utils/mitter";
import { AnyObject } from "@guanyu/shared";

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
  /**
   * 当前月
   */
  @Prop({ default: () => [] }) readonly currentMonth!: number;
  /**
   * 当前年
   */
  @Prop({ default: () => [] }) readonly currentYear!: number;
  @Ref() wrapper!: HTMLDivElement;

  currentSort = 0;
  xTag = 0;
  tabTag = 0;

  handleClick(index: number) {
    this.currentSort = index;
    this.tabTag = index;
  }

  mounted() {
    this.paintChart();
  }

  @Watch("tabTag", { deep: true })
  paintChart() {
    console
      .log
      // this.yLabel0[0],
      // this.yLabel1[0],
      // this.yLabel2[0],
      // this.yLabel3[0]
      // this.xLabel0,
      // this.currentMonth
      ();
    this.xTag = this.xLabel0.indexOf(this.currentMonth);

    if (!this.myChart) {
      this.myChart = echarts.init(this.wrapper);
      mitter.on(EventName.ResizeEcharts, () => {
        myChart.resize();
      });
    }

    const { myChart } = this;
    let option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "line", // 默认为直线，可选为：'line' | 'shadow'
          snap: true,
          lineStyle: {
            type: "solid",
            width: 2,
            color: "#01F5F1",
          },
        },
        renderMode: "html",
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 2,
        padding: [8, 30],
        formatter(params: AnyObject[]) {
          let str = `<div class='tooltip'><div class="tool-title">第`;
          str += `${params[0].axisValue}运营年</div>`;
          if (params[0].axisValue < 2) {
            params.forEach((el) => {
              if (el.seriesName !== "月度运维版") {
                str += `<div class="tool-item"><span></span><span>收入 （${el.seriesName}）</span>   <span>${el.value}</span> <span>万</span></div>`;
              }
            });
          } else {
            params.forEach((el) => {
              if (el.seriesName !== "实际") {
                str += `<div class="tool-item"><span></span><span>收入 （${el.seriesName}）</span>   <span>${el.value}</span> <span>万</span></div>`;
              }
            });
          }
          return str + "</div>";
        },
      },
      legend: {
        left: 0,
        padding: [32, 0],
        itemGap: 16,
        itemWidth: 30,
        itemStyle: { opacity: 0 },
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
        bottom: "8%",
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
          type: "category",
          position: "bottom",
          boundaryGap: false,
          data: this.xLabel0,
          axisLine: {
            lineStyle: {
              width: "2",
              color: new echarts.graphic.LinearGradient(
                1,
                0,
                0,
                0, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                [
                  { offset: 0, color: "rgba(81, 128, 228, 0) " },
                  { offset: 1, color: "rgba(81, 128, 228, 0.6)" },
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
            formatter: (value: any) => {
              return parseInt(value);
            },
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
                { offset: 0, color: "rgba(81, 128, 228, 0) " },
                { offset: 0.3, color: "rgba(81, 128, 228, 0.6)" },
              ]
            ),
            width: 2,
          },
        },
        splitLine: { show: false },
        axisTick: { show: false },
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
          zIndex: 100,
          data: this.yLabel0[this.tabTag],
          lineStyle: { color: "#57A6FB", width: 4 },
          type: "line",
          symbol: "none",
          markLine: {
            symbol: "none",
            type: "dashed",
            color: "rgb(120, 200, 211,0.44)",
            width: 2,
            label: { show: false },
            data: { xAxis: this.month },
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
              [
                { offset: 0.4, color: "rgba(87, 166, 251, 0.2)" },
                { offset: 1, color: "rgba(87, 166, 251, 0)" },
              ]
            ),
          },
        },
        {
          name: "最新过会版",
          data: this.yLabel1[this.tabTag],
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
          data: this.yLabel2[this.tabTag],
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
          data: this.yLabel3[this.tabTag],
          lineStyle: { color: "#57FBB6", width: 4 },
          markLine: {
            // 标记虚线
            symbol: "none",
            label: { show: false },
            lineStyle: {
              type: "dashed",
              color: "rgba(120, 200, 211,0.44)",
              width: 2,
            },
            data: [
              {
                xAxis: this.xTag,
              },
            ],
          },
          markArea: {
            silent: true,
            data: [
              [
                {
                  name: "已发生",
                  xAxis: "0",
                  // yAxis: "100%",
                  label: {
                    show: true,
                    offset: [0, -46],
                    position: "insideTop", // markArea中文字（name）位置
                    color: "#ffff", // markArea中文字（name）颜色
                    fontSize: 36,
                    lineHeight: 36,
                    fill: "#FFFFFF",
                  },
                },
                { xAxis: "2" },
              ],
            ],
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                [
                  { offset: 0, color: "rgba(32, 55, 113,0)" },
                  { offset: 0.8, color: "rgba(32, 55, 113,0.3)" },
                  { offset: 0, color: "rgba(32, 55, 113,0)" },
                ]
              ),
            },
          },
          type: "line",
          symbol: "none",
        },
      ],
    };
    console.log(option);
    option && myChart.setOption(option, true);
  }
}
</script>

<style lang="scss" scoped>
.page__b1b__map {
  width: 100%;
  height: 600px;
}

.active {
  color: #01f5f1;
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

::v-deep {
  .tooltip {
    backdrop-filter: blur(14px);
    background-color: rgba(17, 48, 105, 0.6);
    border: 2px solid transparent;
    border-image: linear-gradient(to bottom, #04879b 40%, #1b4986 80%) 1 1
      stretch;
    border-radius: 6px;
    padding: 14px 40px;
    box-shadow: inset 0px 0px 20px rgba(5, 203, 253, 0.2);

    .tool-title {
      font-size: 30px;
      line-height: 30px;
      letter-spacing: 2.8px;
      color: #ffffff;
      margin-bottom: 8px;
    }

    .tool-item:nth-child(2) span:nth-child(1) {
      background: #57a6fb;
    }
    .tool-item:nth-child(3) span:nth-child(1) {
      background: #f7d14a;
    }
    .tool-item:nth-child(4) span:nth-child(1) {
      background: #a957fb;
    }
    .tool-item:nth-child(5) span:nth-child(1) {
      background: #57fbb6;
    }

    span:nth-child(1) {
      display: inline-block;
      width: 35px;
      height: 4px;
      margin-right: 15px;
    }

    span:nth-child(2) {
      display: inline-block;
      width: 300px;
    }

    span:nth-child(2),
    span:nth-child(4) {
      font-size: 30px;
      line-height: 30px;
      color: #90a4c3;
      margin-right: 10px;
    }
    span:nth-child(3) {
      @extend %value-font;
      font-size: 40px;
      line-height: 40px;
      color: #ffffff;
      font-weight: bold;
    }
  }
}
</style>

function tabTag(tabTag: any) { throw new Error("Function not implemented."); }
