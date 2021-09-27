<template>
  <!-- <Spin :height="483" :loading="loading" :empty="empty"> -->
  <div class="page__a3__map">
    <div class="groop1">
      <div>转化率</div>
      <div>{{ conversionRate1 }}%</div>
      <AnimationForward class="arrow" />
    </div>
    <div class="groop2">
      <div>转化率</div>
      <div>{{ conversionRate2 }}%</div>
      <AnimationForward class="arrow" />
    </div>
    <div
      class="app-echarts"
      ref="wrapper"
      style="width: 700px; height: 400px; margin: 0 80px"
    ></div>
  </div>
  <!-- </Spin> -->
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import { Base } from "@/views/Base";
import mitter, { EventName } from "@/utils/mitter";
import AnimationForward from "@/components/AnimationForward/Index.vue";
import { AnyObject } from "@guanyu/shared";

@Component({
  components: { AnimationForward },
})
export default class A3 extends Base {
  @Ref() wrapper!: HTMLDivElement;

  conversionRate1 = 100.0; // 转化率1
  conversionRate2 = 23.0; // 转化率2
  resData = [
    { name: "年累立项", value: 120 },
    { name: "年累过会", value: 80 },
    { name: "年累签约", value: 60 },
  ];

  mounted() {
    const myChart = echarts.init(this.wrapper);
    let option = {
      grid: {
        left: "-10%",
        right: "-8%",
        bottom: "0%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          fontFamily: this.store.env.TEXT_FONT,
          lineHeight: 40,
          align: "center",
          color: "#FFFFFF",
          formatter: (value: number) => {
            let name = "";
            this.resData.forEach((el: AnyObject) => {
              console.log(value);
              if (value == el.value) {
                name = el.name;
              }
            });
            console.log(111, name, value);
            return "{title1|" + name + "} {val|\n" + value + "} {title2|个}";
          },
          rich: {
            title1: {
              fontFamily: this.store.env.TEXT_FONT,
              color: "#90A4C3",
              fontSize: 40,
              lineHeight: 36,
              padding: [36, 0, 18, 0],
            },
            val: {
              fontFamily: this.store.env.VALUE_FONT,
              fontWeight: "bold",
              fontSize: 48,
              lineHeight: 36,
              color: "#DBF0FF",
              padding: [36, 0, 0, 0],
            },
            title2: {
              fontFamily: this.store.env.TEXT_FONT,
              color: "#90A4C3",
              fontSize: 36,
              lineHeight: 36,
              padding: [36, 0, 0, 0],
            },
          },
        },
        data: this.resData,
      },
      yAxis: { show: false },
      series: [
        {
          data: this.resData,
          type: "bar",
          color: "#57A6FB",
          barWidth: 24,
          barCateGoryGap: 204,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
              [
                { offset: 0, color: "#5180E4" },
                { offset: 1, color: "rgba(81, 128, 228, 0)" },
              ]
            ),
          },
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
.page__a3__map {
  position: relative;
}
.groop1,
.groop2 {
  z-index: 1;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  width: 200px;

  div:nth-child(1) {
    font-size: 36px;
    line-height: 36px;
    color: #90a4c3;
    margin-bottom: 18px;
  }
  div:nth-child(2) {
    @extend %value-font;
    font-weight: bold;
    font-size: 48px;
    line-height: 48px;
    color: #dbf0ff;
    margin-bottom: 30px;
  }
}

.groop1 {
  position: absolute;
  top: 80px;
  left: 239px;
}

.groop2 {
  position: absolute;
  top: 80px;
  left: 518px;
}
</style>
