<template>
  <Spin :height="483" :loading="loading" :empty="empty">
    <div class="page__a3__map">
      <div class="groop1">
        <div class="name_position">转化率</div>
        <div class="value">{{ resData.estabTransRatio }}%</div>
        <AnimationForward class="arrow" />
      </div>
      <div class="groop2">
        <div class="name_position">转化率</div>
        <div class="value">{{ resData.meetingTransRatio }}%</div>
        <AnimationForward class="arrow" />
      </div>
      <div
        class="app-echarts"
        ref="wrapper"
        style="width: 700px; height: 400px; margin: 0 80px"
      ></div>
    </div>
  </Spin>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import { Base, IFetch } from "@/views/Base";
import mitter, { EventName } from "@/utils/mitter";
import AnimationForward from "@/components/AnimationForward/Index.vue";
import { AnyObject, iwant } from "@guanyu/shared";
import {
  BusinessOppTransReturn,
  fetchBusinessOppTrans,
} from "@/service/analysis/bigScreen/mainBoard/expandDisk/businessOppTrans";
import { StoreKey, useStore } from "@/store";

@Component({
  components: { AnimationForward },
})
export default class A3 extends Base implements IFetch {
  @Ref() wrapper!: HTMLDivElement;
  resData: Partial<BusinessOppTransReturn> = {};

  dataSet: AnyObject[] = []; // 柱状图数据

  /**
   * 自动触发 重复调用
   * @returns response
   */
  async fetch() {
    const response = await useStore(fetchBusinessOppTrans, {
      key: StoreKey.HomeBusinessOppTrans,
      params: {
        orgType: this.store.global.dataLevel,
        orgId: this.store.global.orgTree.orgId,
      },
    });
    if (response?.status === "ok") {
      this.resData = iwant.object(response.data);
      if (this.resData) {
        this.dataSet = [
          { name: "年累立项", value: this.resData.yearsEstabProjectNum },
          { name: "年累过会", value: this.resData.yearsMeetingProjectNum },
          { name: "年累签约", value: this.resData.yeasSignedProjectNum },
        ];
        this.paintChart();
      }
    } else {
      this.empty = true;
    }
    return response;
  }

  paintChart() {
    if (!this.myChart) {
      this.myChart = echarts.init(this.wrapper);
      mitter.on(EventName.ResizeEcharts, () => {
        myChart.resize();
      });
    }

    const { myChart } = this;
    let option = {
      grid: {
        left: "-10%",
        right: "-8%",
        bottom: "5%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          formatter: (value: number, index: number) => {
            let name = this.dataSet[index].name;
            return (
              "{title1|" +
              name +
              "} {val|\n" +
              this.sepNumber(value) +
              "} {title2|个}"
            );
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
              padding: [36, 0, -18, 0],
            },
            title2: {
              fontFamily: this.store.env.TEXT_FONT,
              color: "#90A4C3",
              fontSize: 36,
              lineHeight: 36,
              padding: [36, 0, -15, 0],
            },
          },
        },
        data: this.dataSet,
      },
      yAxis: { show: false },
      series: [
        {
          data: this.dataSet,
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

  .name_position {
    font-size: 36px;
    line-height: 36px;
    color: #90a4c3;
    margin-bottom: 18px;
  }
  .value {
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
  top: 85px;
  left: 239px;
}

.groop2 {
  position: absolute;
  top: 85px;
  left: 518px;
}
</style>
