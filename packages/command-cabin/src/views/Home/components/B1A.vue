<template>
  <div class="pannel_left">
    <div class="pannel_text">
      <span>累计已开业间数：</span>
      <span>{{ sepNumber(openingNum) }}</span>
    </div>
    <div
      class="app-echarts"
      ref="wrapper"
      style="width: 100%; height: 425px"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import {
  fetchProjectOpen,
  ProjectOpenReturn,
} from "@/service/analysis/bigScreen/mainBoard/construct/projectOpen";
import { AnyObject, iwant, Nullable } from "@guanyu/shared";
import { Base, IFetch } from "@/views/Base";
import { StoreKey, useStore } from "@/store";
import mitter, { EventName } from "@/utils/mitter";

@Component({
  components: {},
})
export default class B1A extends Base implements IFetch {
  /**
   * 堆叠柱状图
   */
  @Ref() wrapper!: HTMLDivElement;
  /**
   * 接口返回值
   * /bigScreen/mainBoard/construct/projectOpen
   */
  resData: Partial<ProjectOpenReturn> = {};

  openingNum: Nullable<number> = null; // 累计已开业间数

  legendName = ["重资产", "中资产", "轻资产"];

  years: number[] = [];
  data1: number[] = []; // 重资产数据
  data2: number[] = []; // 中资产数据
  data3: number[] = []; // 轻资产数据
  totals: number[] = []; // 三种资产类型之和

  /**
   * 重置数据
   */
  reset() {
    this.years = [];
    this.data1 = [];
    this.data2 = [];
    this.data3 = [];
    this.totals = [];
  }

  /**
   * 处理接口返回值，构建三种资产数组
   */
  getSubData() {
    const list = iwant.array(this.resData.totalOpenList);
    for (const el of list) {
      this.years.push(el.year);
      this.totals.push(el.total);
      el.list.forEach((item) => {
        if (item.transactionModel === "重资产") {
          this.data1.push(item.roomNum);
        } else if (item.transactionModel === "中资产") {
          this.data2.push(item.roomNum);
        } else if (item.transactionModel === "轻资产") {
          this.data3.push(item.roomNum);
        }
      });
    }
  }

  /**
   * 自动触发 重复调用
   * @returns response
   */
  async fetch() {
    const response = await useStore(fetchProjectOpen, {
      key: StoreKey.HomeProjectOpen,
      params: {
        regionType: this.store.global.dataLevel,
        regionId: this.store.global.orgTree.orgId,
      },
    });
    this.reset();
    if (response?.status === "ok") {
      this.resData = iwant.object(response.data);
      this.empty = false;
      this.openingNum = this.resData.totalOpenNum;
      this.getSubData();
      this.paintChart();
    } else {
      this.empty = true;
    }
    return response;
  }

  paintChart() {
    if (!this.myChart) {
      this.myChart = echarts.init(this.wrapper);
      mitter.on(EventName.ResizeEcharts, () => {
        myChart.resize();
      });
    }
    const { myChart } = this;
    let option = {
      tooltip: {
        trigger: "item",
        axisPointer: {
          type: "none", // 默认为直线，可选为：'line' | 'shadow'
        },
        renderMode: "html",
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 2,
        padding: [8, 30],
        // className: "tooltip",
        formatter(params: AnyObject) {
          if (params.seriesName === "总计") {
            return "";
          }
          return `<div class="tooltip"><span>${params.seriesName.slice(
            0,
            1
          )}</span>  <span>${params.value}</span></div>`;
        },
      },
      xAxis: {
        type: "category",
        axisLabel: {
          fontFamily: this.store.env.TEXT_FONT,
          fontSize: 36,
          lineHeight: 36,
          padding: [22, 0, 0, 0],
          color: "#90A4C3",
        },
        data: this.years,
        axisLine: { show: false },
        axisTick: { show: false },
      },
      yAxis: [
        {
          min: 0,
          //   name: "total",
          splitLine: { show: false },
          axisLabel: {
            show: false,
          },
        },
        {
          min: 0,
          //   name: "value_left",
          splitLine: { show: false },
          axisLabel: {
            show: false,
          },
        },
        {
          min: 0,
          //   name: "total_right",
          splitLine: { show: false },
          axisLabel: {
            show: false,
          },
        },
      ],
      grid: {
        top: "13%",
        right: "10%",
        bottom: "8%",
        containLabel: true,
      },
      series: [
        {
          // 总和label，该bar隐藏
          name: "总计",
          type: "bar",
          yAxisIndex: 0,
          z: -2,
          stack: "all", // 不参与堆叠
          barGap: "-50%",
          // position: "insideBottom",
          barWidth: 1,
          label: {
            show: true,
            position: "top",
            color: "#DBF0FF",
            fontSize: 36,
            lineHeight: 42,
            padding: [0, -30, 18, 0],
          },
          itemStyle: {
            color: "rgba(128,128,128,0)",
          },
          data: this.totals,
        },
        {
          name: "重资产",
          type: "bar",
          stack: "left", // 堆叠栈
          yAxisIndex: 1,
          color: "#5180E4",
          barWidth: 15,
          label: {
            show: false,
            position: "insideTopLeft",
            offset: [-13, -10], // label定位
            align: "right",
            formatter: (params: any) => {
              // 富文本构建
              if (!params) return;
              return "{a|" + params.value + "}{one|\n▼}";
            },
            rich: {
              a: {
                position: "insideTopLeft",
                fontSize: 22,
                lineHeight: 22,
                color: "#FFFFFF",
              },
              one: {
                position: "insideTopLeft",
                fontSize: 16,
                lineHeight: 16,
                color: "#F7D14A",
              },
            },
          },
          data: this.data1,
        },
        {
          name: "中资产",
          type: "bar",
          stack: "left",
          yAxisIndex: 1,
          color: "#F7D14A",
          barWidth: 15,
          label: {
            show: false,
            position: "insideTopLeft",
            offset: [-13, -10],
            align: "right",
            formatter: (params: any) => {
              if (!params) return;
              return "{a|" + params.value + "}{two|\n▼}";
            },
            rich: {
              a: {
                position: "insideTopLeft",
                fontSize: 22,
                lineHeight: 22,
                color: "#FFFFFF",
              },

              two: {
                position: "insideTopLeft",
                fontSize: 16,
                lineHeight: 16,
                color: "#57A6FB",
              },
            },
          },
          data: this.data2,
        },
        {
          name: "轻资产",
          type: "bar",
          stack: "left",
          yAxisIndex: 1,
          color: "#B491FD",
          barWidth: 15,
          distance: 4,
          label: {
            show: false,
            position: "insideTopLeft",
            offset: [-13, -10],
            align: "right",
            formatter: (params: any) => {
              if (!params) return;
              return "{a|" + params.value + "}{three|\n▼}";
            },
            rich: {
              a: {
                position: "insideTopLeft",
                fontSize: 22,
                lineHeight: 22,
                color: "#FFFFFF",
              },
              three: {
                position: "insideTopLeft",
                fontSize: 16,
                lineHeight: 16,
                color: "#A957FB",
              },
            },
          },
          data: this.data3,
        },
        {
          name: "重资产",
          type: "bar",
          stack: "right", // 堆叠栈
          yAxisIndex: 2,
          barGap: "-1%",
          color: "#4776DB",
          barWidth: 15,
          label: { show: false },
          data: this.data1,
        },
        {
          name: "中资产",
          type: "bar",
          stack: "right",
          yAxisIndex: 2,
          barGap: "-1%",
          color: "#E6C345",
          barWidth: 15,
          label: { show: false },
          data: this.data2,
        },
        {
          name: "轻资产",
          type: "bar",
          stack: "right",
          yAxisIndex: 2,
          barGap: "-1%",
          color: "#996DF3",
          barWidth: 15,
          distance: 4,
          label: { show: false },
          data: this.data3,
        },
      ],
    };
    option && myChart.setOption(option);
  }
}
</script>

<style lang="scss" scoped>
.pannel_left {
  width: 676px;

  .pannel_text {
    padding: 40px 0 0 50px;
    font-size: 40px;
    line-height: 40px;
    color: #90a4c3;

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;

    span:nth-child(2) {
      padding: 18px 0 45px 0;
      @extend %value-font;
      font-weight: bold;
      font-size: 66px;
      line-height: 60px;
      color: #dbf0ff;
    }
  }
}

::v-deep {
  .tooltip {
    backdrop-filter: blur(20px);
    background-color: rgba(0, 0, 0, 0.5);
    border: 2px solid transparent;
    border-image: linear-gradient(to right, #00d1ff 40%, #50f5ff 80%) 1 1
      stretch;
    border-radius: 4px;
    padding: 8px 40px;
    box-shadow: inset 0px 0px 20px rgba(5, 203, 253, 0.2);

    span:nth-child(1) {
      font-size: 36px;
      line-height: 36px;
      color: #90a4c3;
      margin-right: 10px;
    }
    span:nth-child(2) {
      @extend %value-font;
      font-size: 36px;
      line-height: 42px;
      color: #dbf0ff;
      font-weight: bold;
    }
  }
}
</style>
