<template>
  <div class="page__maintenance_report__map">
    <div
      class="app-echarts"
      ref="wrapper"
      style="width: 100%; height: 500px"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import * as echarts from "echarts";

// console.log(echarts);

@Component({
  components: {},
})
export default class E5 extends Vue {
  @Ref() wrapper!: HTMLDivElement;
  data = {
    redNum: 23, //红色数
    yellowNum: 2323, //橙色数
    numsByCity: [
      {
        cityId: 1, //城市id
        cityName: "北京", //城市名称
        redNum: 23, //红色数
        yellowNum: 2323, //橙色数
      },
    ], //各月红橙舆情条数
    numsByType: [
      {
        typeNum: 1, //类型
        num: 23, //数值
        ratio: 23.23, //占比
      },
    ], //红橙舆情分类分布
  };

  mounted() {
    const myChart = echarts.init(this.wrapper);

    const option = {
      grid: {
        top: "12%",
        right: "8%",
        left: "8%",
        bottom: "12%",
      },
      xAxis: [
        {
          type: "category",
          data: [
            "北京",
            "上海",
            "广西",
            "广州",
            "四川",
            "重庆",
            "天津",
            "河北",
            "河南",
            "湖南",
            "湖北",
            "福建",
            "浙江",
            "江西",
          ],
          axisLine: {
            lineStyle: {
              color: "#FFFFFF",
              fontSize: "18px",
            },
          },
          axisLabel: {
            margin: 20,
            rotate: 60, //x轴倾斜40°
            color: "#fff",
            textStyle: {
              fontSize: 14,
            },
          },
        },
      ],
      yAxis: [
        {
          axisLabel: {
            formatter: "{value}",
            color: "#fff",
            fontSize: "20px",
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "red",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#1B4985",
              type: [15, 10],
              dashOffset: 5,
            },
          },
          axisTick: {
            show: false,
          },
          splitArea: {
            show: false,
          },
        },
      ],
      series: [
        {
          type: "bar",
          data: [60, 87, 140, 60, 80, 112, 22, 46, 87, 64, 120, 78, 38, 98],
          barWidth: "28px",
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "#1A91FF", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#60E0FD", // 100% 处的颜色
                  },
                ],
                false
              ),
              shadowColor: "rgba(0,160,221,1)",
              shadowBlur: 4,
            },
          },
          label: {
            normal: {
              show: true,
              lineHeight: 30,
              position: "end",
              textStyle: {
                color: "#fff",
                fontSize: 18,
              },
            },
          },
        },
        {
          name: "趋势",
          type: "line",
          symbolSize: 10,
          symbol: "rect",
          itemStyle: {
            normal: {
              color: "#EEBC4A",
              borderWidth: "10",
              label: {
                show: true,
                position: "top",
                color: "#EEBC4A",
                fontSize: "18px",
              },
            },
          },
          lineStyle: {
            normal: {
              color: "#EEBC4A",
              shadowColor: "#EEBC4A",
              type: "dotted",
            },
          },
          data: [60, 87, 140, 60, 80, 112, 22, 46, 87, 64, 120, 78, 38, 98],
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
