<template>
  <div class="page__a1__map">
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
import { AnyObject } from "@guanyu/shared";

@Component({
  components: {},
})
export default class A1 extends Base {
  /**
   * 饼图
   */
  @Ref() wrapper!: HTMLDivElement;

  pieData: AnyObject[] = [
    // 饼图对象数组
    {
      name: "获取目标",
      value: 80,
    },
    {
      name: "已签约间数",
      value: 20,
    },
  ];

  centerVlue = 80; // 饼图中心值文本

  mounted() {
    this.paintPieChart();
  }

  paintPieChart() {
    const myChart = echarts.init(this.wrapper);
    // myChart.showLoading();
    let option = {
      grid: {
        x: "40%",
      },
      title: {
        //中心数值
        text: this.centerVlue + "%",
        left: "27%",
        top: "30%",
        z: 100,
        textStyle: {
          fontFamily: "DIN Alternate",
          fontWeight: "bold",
          fontSize: 40,
          lineHeight: 36,
          color: "#01F5F1",
        },
      },
      graphic: {
        // 中心文字
        type: "text",
        left: "23%",
        top: "50%",
        z: 100,
        style: {
          text: "拓展完成率",
          textAlign: "center",
          fontFamily: "PingFang SC",
          fontSize: 24,
          lineHeight: 20,
          fill: "#FFFFFF",
        },
      },
      legend: {
        orient: "vertical",
        right: "16%",
        top: "center",
        icon: "rec",
        itemWidth: 20,
        itemHeight: 20,
        itemGap: 35,
        data: this.pieData,
        textStyle: {
          fontFamily: "PingFang SC",
          color: "#FFFFFF",
          fontSize: 28,
          lineHeight: 39,
          // width: 84,
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

<style lang="scss" scoped></style>
