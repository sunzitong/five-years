<template>
  <div class="page__project_opening__map">
    <div class="whole_pannel">
      <div class="pannel_left">
        <div class="pannel_text">
          累计已开业间数：
          <span>{{ openingNum }}</span>
        </div>
        <div
          class="app-echarts"
          ref="wrapper"
          style="width: 687px; height: 380px"
        ></div>
      </div>
      <div class="pannel_right">
        <div class="top">
          <div class="pannel_text">
            年开业目标间数：
            <span>{{ targetNum }}</span>
            <div class="pannel_text">
              <div class="left">
                已开业间数：
                <span>{{ targetNum }}</span>
              </div>
              <div class="tight">
                待开业间数：
                <span>{{ targetNum }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import echarts from "@/plugins/echarts";

console.log(echarts);

@Component({
  components: {},
})
export default class Example extends Vue {
  @Ref() wrapper!: HTMLDivElement;

  openingNum = 1218900;
  targetNum = 15432;

  legendName = ["重资产", "中资产", "轻资产"];

  data1 = [3513, 5545, 5545, 5545, 5545];
  data2 = [3513, 6543, 65322, 65322, 65322];
  data3 = [0, 4634, 4634, 4634, 4634];
  //   total = [9832, 89832, 93832, 373832, 473832];

  getTotal() {
    let total = [];
    for (let i = 0; i < this.data1.length; i++) {
      let num = Number(this.data1[i] + this.data2[i] + this.data3[i]);
      total.push(num);
    }
    console.log(this.total);
    return total;
  }

  mounted() {
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
        data: [2017, 2018, 2019, 2020, 2021],
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
          data: this.getTotal(),
        },
        {
          name: "重资产",
          type: "bar",
          stack: "one",
          yAxisIndex: 0,
          color: "#FFEF69",
          barWidth: 30,
          data: this.data1,
        },
        {
          name: "中资产",
          type: "bar",
          stack: "one",
          yAxisIndex: 0,
          color: "#57A6FB",
          barWidth: 30,
          data: this.data2,
        },
        {
          name: "轻资产",
          type: "bar",
          stack: "one",
          yAxisIndex: 0,
          color: "#A957FB",
          barWidth: 30,
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
.whole_pannel {
  display: flex;
  flex-flow: row nowrap;
}
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
      @extend %value__letter;
      font-weight: bold;
      font-size: 40px;
      line-height: 36px;
      text-align: right;
      color: #01f5f1;
    }
  }
}

.pannel_right {
  margin-left: 41px;
}
</style>
