<template>
  <div class="pannel_left">
    <div class="pannel_text">
      累计已开业间数：
      <span>{{ sepNumber(openingNum) }}</span>
    </div>
    <div
      class="app-echarts"
      ref="wrapper"
      style="width: 687px; height: 380px"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import { sepNumber } from "@/utils/tools";
import {
  fetchProjectOpen,
  ProjectOpenReturn,
} from "@/service/bigScreen/mainBoard/construct/projectOpen/";
import dayjs from "dayjs";
import { iwant, Nullable } from "@guanyu/shared";

@Component({
  components: {},
})
export default class B1A extends Vue {
  sepNumber = sepNumber;

  @Ref() wrapper!: HTMLDivElement;
  resData: Partial<ProjectOpenReturn> = {};

  year = dayjs().year();

  openingNum: Nullable<number> = null;

  legendName = ["重资产", "中资产", "轻资产"];

  years: number[] = [];
  data1: number[] = [];
  data2: number[] = [];
  data3: number[] = [];
  totals: number[] = [];

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

  async created() {
    const response = await fetchProjectOpen({
      regionType: "group",
      regionId: 85,
      dataTime: this.year,
    });
    if (response?.status === "ok") {
      this.resData = response.data;

      this.openingNum = this.resData.totalOpenNum;

      this.getSubData();
      this.paintChart();
    }
  }

  paintChart() {
    const myChart = echarts.init(this.wrapper);
    let option = {
      legend: {
        data: this.legendName,
        bottom: 0,
        left: 213,
        icon: "rec",
        itemWidth: 20,
        itemHeight: 20,
        itemGap: 29,
        textStyle: {
          color: "#FFFFFF",
          fontSize: 28,
          lineHeight: 39,
        },
      },
      xAxis: {
        type: "category",
        axisLabel: {
          fontFamily: "PingFang SC",
          fontSize: 30,
          lineHeight: 30,
          color: "#FFFFFF",
        },
        data: this.years,
        axisLine: { show: false },
        axisTick: { show: false },
      },
      yAxis: [
        {
          min: 0,
          //   name: "value",
          splitLine: { show: false },
          axisLabel: {
            show: false,
          },
        },
        {
          min: 0,
          //   name: "total",
          splitLine: { show: false },
          axisLabel: {
            show: false,
          },
        },
      ],
      grid: {
        x: 49,
        y: 0,
        x2: 0,
        y2: 0,
        top: "8%",
        right: "8%",
        bottom: "30%",
      },
      series: [
        {
          name: "总计",
          type: "bar",
          yAxisIndex: 1,
          stack: "two",
          barGap: "-100%",
          position: "insideBottom",
          barWidth: 30,
          distance: 10,
          label: {
            normal: {
              show: true,
              distance: 10,
              position: "top",
              color: "#FFF",
              fontSize: 22,
              lineHeight: 22,
            },
          },
          itemStyle: {
            color: "rgba(128,128,128,0)",
          },
          data: this.totals,
        },
        {
          name: "重资产",
          type: "bar",
          stack: "one",
          yAxisIndex: 0,
          color: "#FFEF69",
          barWidth: 30,
          label: {
            show: true,
            position: "insideTopLeft",
            offset: [-13, -10],
            align: "right",
            formatter: (params: any) => {
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
                color: "#FFEF69",
              },
            },
          },
          data: this.data1,
        },
        {
          name: "中资产",
          type: "bar",
          stack: "one",
          yAxisIndex: 0,
          color: "#57A6FB",
          barWidth: 30,
          label: {
            show: true,
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
          stack: "one",
          yAxisIndex: 0,
          color: "#A957FB",
          barWidth: 30,
          distance: 4,
          label: {
            show: true,
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
.pannel_left {
  width: 676px;
  border-right: 2px dashed #1b4985;

  .pannel_text {
    margin: 30px 0 54px 30px;
    font-family: "PingFang SC";
    font-size: 30px;
    line-height: 30px;
    color: #ffffff;

    span {
      font-family: "DIN Alternate";
      font-weight: bold;
      font-size: 40px;
      line-height: 36px;
      text-align: right;
      color: #01f5f1;
    }
  }
}
</style>
