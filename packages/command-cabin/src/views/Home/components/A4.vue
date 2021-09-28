<template>
  <!-- <Spin :height="362" :loading="loading" :empty="empty"> -->
  <div class="page__a4__map">
    <div class="position">
      <van-row class="legend-group" :gutter="18">
        <van-col>
          <span class="legend"></span>
          <span>洽谈中</span>
        </van-col>
        <van-col>
          <div class="legend"></div>
          <span>已合作</span>
        </van-col>
      </van-row>
    </div>
    <div class="names_box">
      <div class="name_style" v-for="(name, index) in names" :key="index">
        {{ name }}
      </div>
    </div>
    <div
      class="app-echarts"
      ref="wrapper"
      style="width: 700px; height: 180px; margin: 0 80px"
    ></div>
    <div class="bottom_legend">
      <van-row :gutter="18">
        <van-col v-for="(el, index) in ing" :key="index" :span="8">
          <span class="icon"></span>
          <span>{{ el }}</span>
        </van-col>
      </van-row>
      <van-row :gutter="18">
        <van-col v-for="(el, index) in has" :key="index" :span="8">
          <span class="icon"></span>
          <span>{{ el }}</span>
        </van-col>
      </van-row>
    </div>
  </div>
  <!-- </Spin> -->
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { Base } from "@/views/Base";
import echarts from "@/plugins/echarts";
import mitter, { EventName } from "@/utils/mitter";
import { EChartsOption } from "echarts/types/dist/shared";

@Component({
  components: {},
})
export default class A4 extends Base {
  @Ref() wrapper!: HTMLDivElement;

  ing = [1218, 9953, 3000]; // 洽谈中
  has = [554, 69893, 4000]; // 已洽谈
  names = ["国企平台合作", "资金方合作", "总对总战略"];

  getSetting() {
    let res = {
      yAxis: [] as EChartsOption["yAxis"][],
      series: [] as EChartsOption["series"],
    };
    let data = [
      {
        ing: [this.ing[0], 0, 0],
        has: [this.has[0], 0, 0],
      },
      {
        ing: [0, this.ing[1], 0],
        has: [0, this.has[1], 0],
      },
      {
        ing: [0, 0, this.ing[2]],
        has: [0, 0, this.has[2]],
      },
    ];

    for (let i = 0; i < 3; i++) {
      res.yAxis.push({
        show: false,
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        // type: "value",
        scale: true,
        name: `data${i}`,
      });
      if (Array.isArray(res.series)) {
        res.series.push(
          {
            name: "ing",
            type: "bar",
            yAxisIndex: i,
            data: data[i].ing,
            barWidth: 18,
            barGap: 0,
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
          {
            name: "has",
            type: "bar",
            yAxisIndex: i,
            data: data[i].has,
            barWidth: 18,
            barGap: 0,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                [
                  { offset: 0, color: "#F7D14A" },
                  { offset: 1, color: "rgba(81, 128, 228, 0)" },
                ]
              ),
            },
          }
        );
      }
    }
    // console.log(res);

    return res;
  }

  mounted() {
    const myChart = echarts.init(this.wrapper);
    let option = {
      grid: {
        top: "0%",
        left: "-5%",
        right: "-15%",
        bottom: "-8%",
        containLabel: true,
      },
      xAxis: [
        {
          show: false,
          type: "category",
          axisLine: { show: false },
          axisTick: { show: false },
          data: this.names,
        },
      ],
      yAxis: this.getSetting().yAxis,
      series: this.getSetting().series,
    };
    option && myChart.setOption(option);
    mitter.on(EventName.ResizeEcharts, () => {
      myChart.resize();
    });
  }
}
</script>

<style lang="scss" scoped>
.page__a4__map {
  position: relative;
}
.van-col {
  span {
    vertical-align: middle;
  }
}

.legend-group {
  width: 300px;
  font-size: 30px;
  line-height: 36px;
  color: #90a4c3;
  margin: 0 auto;

  .legend {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 16px;
  }
}

.position {
  position: absolute;
  top: -89px;
  right: 80px;
}

.van-col:nth-child(1) .legend {
  background-color: #5180e4;
}
.van-col:nth-child(2) .legend {
  background-color: #f7d14a;
}

.names_box {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  margin: 26px 20px;

  .name_style {
    font-size: 36px;
    line-height: 36px;
    color: #90a4c3;
  }
}

.bottom_legend {
  margin: 10px 120px 12px 120px;

  .icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 16px;
  }

  .van-row {
    width: 800px;
  }

  .van-row:nth-child(1) .icon {
    background-color: #5180e4;
  }
  .van-row:nth-child(2) .icon {
    background-color: #f7d14a;
  }
}
</style>
