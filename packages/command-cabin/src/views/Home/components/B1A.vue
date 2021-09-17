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
import dayjs from "dayjs";
import { AnyObject, iwant, Nullable } from "@guanyu/shared";
import Base from "@/views/Base";
import { StoreKey, useStore } from "@/store";
import mitter, { EventName } from "@/utils/mitter";

@Component({
  components: {},
})
export default class B1A extends Base {
  /**
   * 堆叠柱状图
   */
  @Ref() wrapper!: HTMLDivElement;
  /**
   * 接口返回值
   * /bigScreen/mainBoard/construct/projectOpen
   */
  resData: Partial<ProjectOpenReturn> = {};

  year = dayjs().year();

  openingNum: Nullable<number> = null; // 累计已开业间数

  legendName = ["重资产", "中资产", "轻资产"];

  years: number[] = [];
  data1: number[] = []; // 重资产数据
  data2: number[] = []; // 中资产数据
  data3: number[] = []; // 轻资产数据
  totals: number[] = []; // 三种资产类型之和

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

  async mounted() {
    const response = await useStore(fetchProjectOpen, {
      key: StoreKey.HomeProjectOpen,
      params: {
        regionType: this.store.global.dataLevel,
        regionId: this.store.global.orgTree.orgId,
      },
    });
    if (response?.status === "ok") {
      this.resData = response.data;
      this.$parent.empty = false;

      this.openingNum = this.resData.totalOpenNum;

      this.getSubData();
      this.paintChart();
    } else {
      this.$parent.empty = true;
    }
  }

  paintChart() {
    const myChart = echarts.init(this.wrapper);
    let option = {
      tooltip: {
        trigger: "item",
        axisPointer: {
          type: "none", // 默认为直线，可选为：'line' | 'shadow'
        },
        renderMode: "html",
        backgroundColor: "transparent",
        borderColor: "transparent",
        // // backdropFilter: "blur(30px)",
        // borderColor: new echarts.graphic.LinearGradient(
        //   1,
        //   0,
        //   0,
        //   0, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
        //   [
        //     { offset: 0.8, color: "#00D1FF" },
        //     { offset: 0.4, color: "#50F5FF" },
        //   ]
        // ),
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
        //   textStyle: {
        //     fontSize: 36,
        //     lineHeight: 36,
        //     color: "#90A4C3",
        //     padding: [0, 10, 0, 0],
        //     rich: {
        //       a: {
        //         fontSize: 36,
        //         lineHeight: 36,
        //         color: "#90A4C3",
        //         padding: [0, 10, 0, 0],
        //       },
        //       b: {
        //         fontFamily: "DIN Alternate",
        //         fontSize: 36,
        //         lineHeight: 42,
        //         color: "#DBF0FF",
        //         fontWeight: "bold",
        //       },
        //     },
        //   },
      },
      xAxis: {
        type: "category",
        axisLabel: {
          fontFamily: "PingFang SC",
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
        top: "6%",
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
    mitter.on(EventName.ResizeEcharts, () => {
      myChart.resize();
    });
  }
}
</script>

<style lang="scss" scoped>
.pannel_left {
  width: 676px;

  .pannel_text {
    padding: 40px 0 0 50px;
    font-family: "PingFang SC";
    font-size: 40px;
    line-height: 40px;
    color: #90a4c3;

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;

    span:nth-child(2) {
      padding: 18px 0 45px 0;
      font-family: "DIN Alternate";
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
      font-family: "DIN Alternate";
      font-size: 36px;
      line-height: 42px;
      color: #dbf0ff;
      font-weight: bold;
    }
  }
  // .tooltip::before {
  //   content: "";
  //   position: absolute;
  //   left: -22px;
  //   top: 20px;
  //   width: 0;
  //   height: 0;
  //   border: 10px solid;
  //   border-color: transparent #00d1ff transparent transparent;
  // }
}
</style>
