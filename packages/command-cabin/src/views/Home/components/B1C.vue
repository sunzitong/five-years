<template>
  <div class="page__maintenance_report__map">
    <div ref="charts" class="chart"></div>
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
export default class B1C extends Base {
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
  bgColor = ["#172C47", "#4C452D", "#2A223B"];

  get sortPieData() {
    const names = ["重", "中", "轻"];
    return this.pieData.sort((a, b) =>
      names.indexOf(a.name[0]) > names.indexOf(b.name[0]) ? 1 : -1
    );
  }

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

    for (let i = 0; i < this.sortPieData.length; i++) {
      res.series.push({
        // 展示数据
        type: "pie",
        clockwise: true, //顺时加载
        emphasis: { scale: false }, //鼠标移入变大
        radius: [101 - i * 11, 90 - i * 11],
        center: ["25%", "50%"],
        itemStyle: {
          label: { show: false },
          labelLine: { show: false },
          borderWidth: 13,
        },
        labelLine: {
          length: 10,
          length2: 40,
        },
        label: {
          show: false,
          //   normal: {
          //     position: "outer",
          //     formatter: () => {
          //       return (
          //         "{title|" +
          //         this.sortPieData[i].name +
          //         "} {value|" +
          //         this.sortPieData[i].value +
          //         "%}"
          //       );
          //     },
          //     borderWidth: 200,
          //     // borderRadius: 4,
          //     padding: [0, 0],
          //     rich: {
          //       title: {
          //         fontFamily: "PingFang SC",
          //         color: "#90A4C3",
          //         fontSize: 36,
          //         // lineHeight: 42,
          //       },
          //       value: {
          //         fontFamily: "DIN Alternate",
          //         fontWeight: "bold",
          //         fontSize: 10,
          //         // lineHeight: 42,
          //         color: "#DBF0FF",
          //       },
          //     },
          //   },
        },
        data: [
          {
            name: this.sortPieData[i].name,
            value: this.sortPieData[i].value,
            itemStyle: {
              color: this.color[i],
            },
          },
          {
            // 阴影
            name: "",
            value: this.sum - this.sortPieData[i].value,
            itemStyle: {
              color: this.bgColor[i],
              borderWidth: 0,
            },
            tooltip: { show: false },
            emphasis: { scale: false },
          },
        ],
      });
      res.yAxis.push(this.sortPieData[i].value);
    }

    return res;
  }

  @Watch("sortPieData", { deep: true })
  paintChart() {
    const res = this.buildConfiguration();
    if (!this.myChart) {
      this.myChart = echarts.init(this.charts);
      mitter.on(EventName.ResizeEcharts, () => {
        this.myChart.resize();
      });
    }
    const { myChart } = this;
    // myChart.showLoading();
    let option = {
      legend: {
        show: true,
        orient: "vertical",
        left: "53%",
        top: "center",
        icon: "rec",
        formatter: (name: any) => {
          let num = 0;
          this.sortPieData.forEach((el) => {
            if (el.name === name) {
              num = el.value;
            }
          });
          return "{title|" + name.slice(0, 1) + "} {value|" + num + "%}";
        },
        textStyle: {
          rich: {
            title: {
              fontFamily: "PingFang SC",
              color: "#90A4C3",
              fontSize: 36,
              lineHeight: 36,
              padding: [0, 10, 0, 12],
            },
            value: {
              fontFamily: "DIN Alternate",
              fontWeight: "bold",
              fontSize: 42,
              lineHeight: 42,
              color: "#DBF0FF",
            },
          },
        },
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 40,
        // padding: [0, 18, 0, 0],
        data: this.sortPieData,
      },
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
  }
}
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
  @extend %bg-img-circle-3;
  background-position: 17px 14px;
  background-size: 201px;
}
</style>
