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

@Component
export default class E5 extends Vue {
  @Ref() wrapper!: HTMLDivElement;

  /**
   * 定时器
   */
  timer: null | number = null;

  mounted() {
    const myChart = echarts.init(this.wrapper);
    const option = {
      grid: {
        top: "12%",
        right: "5%",
        left: "8%",
        bottom: "12%",
      },
      tooltip: {
        show: false,
      },
      dataZoom: [
        {
          type: "inside",
          zoomLock: true,
          start: 1,
          end: 50,
        },
        {
          type: "slider",
          show: false,
        },
      ],
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
            "北京1",
            "上海1",
            "广西1",
            "广州1",
            "四川1",
            "重庆1",
            "天津1",
            "河北1",
            "河南1",
            "湖南1",
            "湖北1",
            "福建1",
            "浙江1",
            "江西1",
          ],
          axisLine: {
            lineStyle: {
              color: "rgba(0,0,0,0)",
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
            fontSize: 20,
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
          data: [
            60,
            87,
            140,
            60,
            80,
            112,
            22,
            46,
            87,
            64,
            120,
            78,
            38,
            98,
            60,
            87,
            140,
            60,
            80,
            112,
            22,
            46,
            87,
            64,
            120,
            78,
            38,
            98,
          ],
          stack: true,
          barWidth: 20,
          itemStyle: {
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
          },
          label: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: 18,
            },
          },
        },
        {
          type: "bar",
          stack: true,
          data: [
            20,
            2,
            2,
            20,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            2,
            20,
            2,
            2,
            2,
            2,
          ],
          barWidth: 20,
          itemStyle: {
            color: "#EEBC4A",
          },
          label: {
            show: true,
            align: "center",
            textStyle: {
              color: "#fff",
              fontSize: 18,
            },
          },
        },
      ],
    };
    option && myChart.setOption(option);
    let index = 1;
    const nextLoop = () => {
      index += 1;
      const opt: any = myChart.getOption();
      if (opt.dataZoom[0]?.end >= 100) {
        index = 0;
        myChart.setOption({ animation: false });
      } else {
        myChart.setOption({ animation: true });
      }
      myChart.setOption({
        dataZoom: [
          {
            start: index,
            end: Math.min(index + 51, 100),
          },
        ],
      });
      this.timer = setTimeout(nextLoop, 1000);
    };
    this.timer = setTimeout(nextLoop, 1000);

    /**
     * 数据缩放事件
     */
    myChart.on("datazoom", (e) => {
      index = Math.floor(e.batch[0].start);
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = setTimeout(nextLoop, 5000);
      }
    });
  }

  /**
   * 组件卸载
   */
  unmounted() {
    if (this.timer) clearTimeout(this.timer);
    this.timer = null;
  }
}
</script>

<style lang="scss" scoped></style>
