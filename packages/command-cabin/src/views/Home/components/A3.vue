<template>
  <div class="page__a3__map">
    <div class="groop1">
      <div>{{ conversionRate1 }}%</div>
      <div>(转化率)</div>
    </div>
    <div class="groop2">
      <div>{{ conversionRate2 }}%</div>
      <div>(转化率)</div>
    </div>
    <div
      class="app-echarts"
      ref="wrapper"
      style="width: 100%; height: 300px"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import { Base } from "@/views/Base";
import mitter, { EventName } from "@/utils/mitter";

@Component({
  components: {},
})
export default class A3 extends Base {
  @Ref() wrapper!: HTMLDivElement;

  conversionRate1 = 78.1; // 转化率1
  conversionRate2 = 23.0; // 转化率2

  mounted() {
    const myChart = echarts.init(this.wrapper);
    // myChart.showLoading();
    let option = {
      grid: {
        left: "3%",
        right: "3%",
      },
      xAxis: {
        type: "category",
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          fontFamily: "PingFang SC",
          fontSize: 28,
          lineHeight: 30,
          align: "center",
          color: "#FFFFFF",
        },
        data: ["年累立项", "年累过会", "年累签约"],
      },
      yAxis: { show: false },
      series: [
        {
          data: [120, 80, 60],
          type: "bar",
          color: "#57A6FB",
          barWidth: 37,
          barCateGoryGap: 204,
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
.groop1,
.groop2 {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  text-align: center;
  width: 120px;

  div:nth-child(1) {
    @extend %value__letter;
    font-weight: bold;
    font-size: 40px;
    line-height: 36px;
    color: #01f5f1;
    margin-bottom: 4px;
  }

  div:nth-child(2) {
    font-size: 26px;
    line-height: 26px;
    letter-spacing: 2.5px;
    color: #b4b4b4;
  }
}

.groop1 {
  position: absolute;
  top: 70px;
  left: 193px;
}

.groop2 {
  position: absolute;
  top: 70px;
  left: 430px;
}
</style>
