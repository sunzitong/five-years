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
import { EChartsOption } from "echarts/types/dist/shared";

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
   * 折线图横坐标
   */
  @Prop({ default: () => [] }) readonly xLabel!: number[][];
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
  @Prop({ default: () => [] }) readonly monthTag!: number;
  /**
   * 当前年
   */
  @Prop({ default: () => [] }) readonly yearTag!: number;
  /**
   * cost tab所在index
   */
  @Prop({ default: () => -1 }) readonly specialTabIndex!: number;
  /**
   * yIndex设置
   */
  @Prop({ default: () => [] }) readonly yIndex!: number[];
  /**
   * 门店切换标志
   */
  @Prop() readonly ifChange!: boolean;

  @Ref() wrapper!: HTMLDivElement;

  @Prop({ default: 0 }) currentSort!: number;

  xTag = this.monthTag;
  tabTag = 0;
  xLabels: number[] = [];

  handleClick(index: number) {
    this.$emit("update:currentSort", index);
    this.tabTag = index;
    if (this.tabTag === this.specialTabIndex) {
      this.xLabels = this.xLabel[1];
      this.xTag = this.yearTag;
    } else {
      this.xLabels = this.xLabel[0];
      this.xTag = this.monthTag;
    }
    this.paintChart();
  }

  mounted() {
    if (this.specialTabIndex === 0) {
      this.xLabels = this.xLabel[1];
      this.xTag = this.yearTag;
    } else {
      this.xLabels = this.xLabel[0];
    }
    this.paintChart();
  }

  @Watch("ifChange")
  monthTagChanged() {
    this.handleClick(0);
  }

  paintChart() {
    if (!this.myChart) {
      this.myChart = echarts.init(this.wrapper);
      mitter.on(EventName.ResizeEcharts, () => {
        myChart.resize();
      });
    }

    const { myChart } = this;
    let option: EChartsOption = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "line", // 默认为直线，可选为：'line' | 'shadow'
          snap: true,
          lineStyle: {
            type: "dashed",
            width: 2,
            color: "#01F5F1",
          },
        },
        renderMode: "html",
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 2,
        padding: [8, 30],
        formatter: (params: any) => {
          let str = `<div class='tooltip'><div class="tool-title">第`;
          let unit = "";

          if (this.xTag === this.monthTag) {
            str += `${params[0].axisValue}运营月</div>`;
          } else {
            str += `${params[0].axisValue}运营年</div>`;
          }

          if (0 === this.yIndex[this.tabTag]) {
            unit = "%";
          } else if (1 === this.yIndex[this.tabTag]) {
            unit = "万元";
          } else {
            unit = "元";
          }

          params.forEach((el: any) => {
            if (el.axisValue < this.xTag + 1) {
              if (el.seriesName !== "月度运维版") {
                str += `<div class="tool-item tool-item-${
                  el.seriesIndex
                }"><span class="icon"></span><span>${
                  this.tabNames[this.tabTag]
                }（${el.seriesName}）</span>   <span>${
                  el.value ?? "-"
                }</span> <span>${unit}</span></div>`;
              }
            } else {
              if (el.seriesName !== "实际") {
                str += `<div class="tool-item tool-item-${
                  el.seriesIndex
                }"><span class="icon"></span><span>${
                  this.tabNames[this.tabTag]
                }（${el.seriesName}）</span>   <span>${
                  el.value ?? "-"
                }</span> <span>${unit}</span></div>`;
              }
            }
          });

          return str + "</div>";
        },
      },
      legend: {
        left: 0,
        padding: [12, 0],
        itemGap: 16,
        itemHeight: 4,
        itemWidth: 30,
        icon: "roundRect",
        inactiveColor: "#586983",
        data: [
          {
            name: "投资任务书版",
            itemStyle: { color: "#57A6FB" },
          },
          {
            name: "最新过会版",
            itemStyle: { color: "#A957FB" },
          },
          {
            name: "月度运维版",
            itemStyle: { color: "#F7D14A" },
          },
          {
            name: "实际",
            itemStyle: { color: "#57FBB6" },
          },
        ],
        textStyle: {
          color: "#90A4C3",
          fontSize: 36,
          lineHeight: 26,
        },
        right: "10%",
      },
      grid: {
        top: "28%",
        left: "9%",
        right: "6%",
        bottom: "8%",
        //是否显示刻度标签
        containLabel: false,
      },
      xAxis: [
        {
          name: "运营年",
          nameLocation: "middle",
          nameGap: 0,
          nameTextStyle: {
            color: "#8090AA",
            fontSize: 20,
            lineHeight: 24,
            padding:
              this.xTag === this.monthTag ? [19, 0, 0, 1350] : [19, 0, 0, 1440],
          }, // 设置坐标轴名称
          type: "category",
          position: "bottom",
          boundaryGap: false,
          data: this.xLabels,
          axisLine: {
            show: true,
            lineStyle: {
              width: 2,
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
            interval: this.xTag === this.monthTag ? 11 : 0,
            fontFamily: this.store.env.TEXT_FONT,
            color: "#90A4C3",
            margin: 13,
            fontSize: 26,
            lineHeight: 36,
            formatter: (value: any) => {
              if (this.xTag !== this.monthTag) {
                return parseInt(value).toString();
              } else {
                return Math.ceil(value / 12).toString();
              }
            },
          },
        },
      ],
      yAxis: [
        {
          name: "百分比",
          show: 0 === this.yIndex[this.tabTag],
          nameLocation: "end",
          nameGap: 30,
          nameTextStyle: {
            color: "#90A4C3",
            fontSize: 24,
            lineHeight: 26,
            padding: [0, 0, 0, -110],
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
            margin: 20,
            fontSize: 26,
            lineHeight: 36,
            formatter: function (value: number) {
              return value + "%";
            },
          },
        },
        {
          name: "万元",
          show: 1 === this.yIndex[this.tabTag],
          position: "left",
          nameLocation: "end",
          nameGap: 30,
          nameTextStyle: {
            color: "#90A4C3",
            fontSize: 24,
            lineHeight: 26,
            padding: [0, 0, 0, -80],
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
            margin: 20,
            fontSize: 26,
            lineHeight: 36,
          },
        },
        {
          name: "元",
          show: 2 === this.yIndex[this.tabTag],
          position: "left",
          nameLocation: "end",
          nameGap: 30,
          nameTextStyle: {
            color: "#90A4C3",
            fontSize: 24,
            lineHeight: 26,
            padding: [0, 0, 0, -60],
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
            margin: 20,
            fontSize: 26,
            lineHeight: 36,
          },
        },
      ],
      series: [
        {
          name: "投资任务书版",
          yAxisIndex: this.yIndex[this.tabTag],
          data: this.yLabel0[this.tabTag],
          lineStyle: { color: "#57A6FB", width: 4 },
          type: "line",
          symbol: "none",
          itemStyle: { color: "#57A6FB" },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
              [
                { offset: 1, color: "rgba(87, 166, 251, 0)" },
                { offset: 0, color: "rgba(87, 166, 251, 0.2)" },
              ]
            ),
          },
        },
        {
          name: "最新过会版",
          yAxisIndex: this.yIndex[this.tabTag],
          data: this.yLabel1[this.tabTag],
          lineStyle: { color: "#A957FB", width: 4 },
          type: "line",
          symbol: "none",
          itemStyle: { color: "#A957FB" },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
              [
                { offset: 1, color: "rgba(169, 87, 251, 0)" },
                { offset: 0, color: "rgba(169, 87, 251, 0.2)" },
              ]
            ),
          },
        },
        {
          name: "月度运维版",
          yAxisIndex: this.yIndex[this.tabTag],
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
                { offset: 1, color: "rgba(247, 209, 74, 0)" },
                { offset: 0, color: "rgba(247, 209, 74, 0.2)" },
              ]
            ),
          },
        },
        {
          name: "实际",
          yAxisIndex: this.yIndex[this.tabTag],
          data: this.yLabel3[this.tabTag],
          type: "line",
          symbol: "none",
          itemStyle: { color: "#57FBB6" },
          lineStyle: { color: "#57FBB6", width: 4 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
              [
                { offset: 1, color: "rgba(87, 251, 182, 0)" },
                { offset: 0, color: "rgba(87, 251, 182, 0.2)" },
              ]
            ),
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
                    offset: [0, -58],
                    position: "top", // markArea中文字（name）位置
                    color: "#ffff", // markArea中文字（name）颜色
                    fontSize: 36,
                    lineHeight: 36,
                  },
                },
                { xAxis: this.xTag },
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
        },
      ],
    };
    option && myChart.setOption(option, true);

    /**
     * 鼠标离开图标显示提示框
     */
    this.showTooltip();
    myChart.on("globalout", this.showTooltip);
  }

  @Watch("xLabel", { deep: true })
  onPropsChange() {
    this.showTooltip();
  }

  /**
   * 显示提示框
   */
  showTooltip() {
    this.myChart &&
      this.myChart.dispatchAction({
        type: "showTip",
        seriesIndex: 3, // 显示第几个series
        dataIndex: Math.max(this.xTag ?? 0, 0), // 显示第几个数据
      });
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
    top: 0;
    bottom: 0;
    margin: auto 0;
    height: 40px;
    font-size: 40px;
    line-height: 40px;
    text-align: center;
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

    .tool-item {
      border-radius: 5px;

      &-0 {
        .icon {
          background: #57a6fb;
        }
      }
      &-1 {
        .icon {
          background: #a957fb;
        }
      }
      &-2 {
        .icon {
          background: #f7d14a;
        }
      }
      &-3 {
        .icon {
          background: #57fbb6;
        }
      }
      span {
        vertical-align: middle;
      }

      span:nth-child(1) {
        display: inline-block;
        width: 35px;
        height: 4px;
        margin-right: 15px;
      }

      span:nth-child(2) {
        display: inline-block;
        width: 400px;
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
}
</style>
