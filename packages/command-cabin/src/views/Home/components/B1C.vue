<template>
  <div class="page__maintenance_report__map">
    <div ref="charts" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Watch } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import Base from "@/views/Base";
import { AnyObject } from "@guanyu/shared";
import mitter, { EventName } from "@/utils/mitter";

@Component({
  components: {},
})
export default class Example extends Base {
  /**
   * 饼图
   */
  @Ref() charts!: HTMLDivElement;
  /**
   * 饼图name-value键值对对象
   */
  @Prop({ default: () => [] }) readonly pieData!: AnyObject[];
  /**
   * 重中轻之和
   */
  @Prop({ default: () => 0 }) readonly sum!: number;

  names = ["重资产", "中资产", "轻资产"];
  color = ["#5180E4", "#F7D14A", "#B491FD"];

  mounted() {
    this.paintChart();
  }

  /**
   * 遍历生成图形配置所需的配置项
   */
  buildConfiguration() {
    let res: AnyObject = {
      series: [],
      yAxis: [],
    };

    for (let i = 0; i < this.pieData.length; i++) {
      res.series.push({
        // 展示数据
        type: "pie",
        clockwise: true, //顺时加载
        emphasis: { scale: false }, //鼠标移入变大
        radius: [112 - i * 11, 101 - i * 11],
        center: ["25%", "50%"],
        itemStyle: {
          label: { show: false },
          labelLine: { show: false },
          borderWidth: 13,
        },
        labelLine: {
          normal: {
            length: 10,
            length2: 40,
          },
        },
        label: {
          normal: {
            position: "outer",
            formatter: (name: any) => {
              return (
                "{title|" +
                this.pieData[i].name +
                "} {value|" +
                this.pieData[i].value +
                "%}"
              );
            },
            borderWidth: 200,
            // borderRadius: 4,
            padding: [0, 0],
            rich: {
              title: {
                fontFamily: "PingFang SC",
                color: "#90A4C3",
                fontSize: 10,
                // lineHeight: 42,
              },
              value: {
                fontFamily: "DIN Alternate",
                fontWeight: "bold",
                fontSize: 10,
                // lineHeight: 42,
                color: "#DBF0FF",
              },
            },
          },
        },
        data: [
          {
            name: this.pieData[i].name,
            value: this.pieData[i].value,
            itemStyle: {
              color: this.color[i],
            },
          },
          {
            // 阴影
            name: "",
            value: this.sum - this.pieData[i].value,
            itemStyle: {
              color: "rgba(0,0,0,0)",
              borderWidth: 0,
            },
            tooltip: { show: false },
            emphasis: { scale: false },
          },
        ],
      });
      res.yAxis.push(this.pieData[i].value);
    }

    return res;
  }

  @Watch("pieData", { deep: true })
  paintChart() {
    const res = this.buildConfiguration();

    const myChart = echarts.init(this.charts);
    // myChart.showLoading();
    let option = {
      grid: {
        top: "center",
        left: "0%",
        containlabel: false,
      },
      xAxis: { show: false },
      yAxis: [
        {
          type: "category",
          asisTick: { show: true },
          axisLabel: { show: true },
          axisLine: { show: false },
          data: res.yAxis,
        },
      ],
      series: res.series,
    };
    option && myChart.setOption(option);
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  }
}
</script>

<style lang="scss" scoped></style>
