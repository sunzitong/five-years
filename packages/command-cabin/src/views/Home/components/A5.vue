<template>
  <Spin :height="470" :loading="loading" :empty="empty">
    <div class="page__a5__map">
      <div class="text_pannel">
        <!-- 饼图 -->
        <div class="chart" ref="wrapper"></div>
        <div class="top_text">全年已到账</div>
        <div class="bottom_text">
          <span>{{ sepNumber(resData.yearSubsidiesCollected) }}</span>
          万
        </div>
      </div>
    </div>
  </Spin>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import ProgressCircle from "@/components/Progress/ProgressCircle.vue";
import {
  fetchExpansionAwardInfo,
  ExpansionAwardInfoReturn,
} from "@/service/analysis/bigScreen/mainBoard/expandDisk/expansionAwardInfo";
import { Base, IFetch } from "@/views/Base";
import { StoreKey, useStore } from "@/store";
import echarts from "@/plugins/echarts";
import { EChartsOption } from "echarts";
import { AnyObject, iwant } from "@guanyu/shared";
import mitter, { EventName } from "@/utils/mitter";

@Component({
  components: { ProgressCircle },
})
export default class A5 extends Base implements IFetch {
  /**
   * 接口返回值
   * /analysis/bigScreen/mainBoard/expandDisk
   */
  @Ref() wrapper!: HTMLDivElement;

  resData: Partial<ExpansionAwardInfoReturn> = {};
  pieData: AnyObject[] = [];

  /**
   * 自动触发 重复调用
   * @returns response
   */
  async fetch() {
    const response = await useStore(fetchExpansionAwardInfo, {
      key: StoreKey.HomeExpansionAwardInfo,
      params: {
        orgType: this.store.global.dataLevel,
        orgId: this.store.global.orgTree.orgId,
        date: +this.store.global.yearValue,
      },
    });
    if (response?.status === "ok") {
      this.resData = iwant.object(response.data);
      this.empty = false;
      this.pieData = [
        // 饼图对象数组
        {
          name: "all",
          value: 100 - iwant.number(this.resData.yearSubsidiesCompletionRate),
        },
        {
          name: "reach",
          value: this.resData.yearSubsidiesCompletionRate,
        },
      ];
      this.paintChart();
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
    // myChart.showLoading();
    let option: EChartsOption = {
      title: {
        //中心数值
        text: `${this.formatValue(this.resData.yearSubsidiesCompletionRate)}%`,
        left: "center",
        top: "53%",
        z: 100,
        textStyle: {
          fontFamily: this.store.env.VALUE_FONT,
          fontWeight: "bold",
          fontSize: 40,
          lineHeight: 48,
          color: "#DBF0FF",
        },
      },
      graphic: {
        // 中心文字
        type: "text",
        left: "center",
        top: "41%",
        z: 100,
        style: {
          text: "完成率",
          textAlign: "center",
          fontFamily: this.store.env.TEXT_FONT,
          fontSize: 24,
          lineHeight: 24,
          fill: "#8090AA",
        },
      },
      xAxis: { show: false },
      yAxis: { show: false },
      series: [
        {
          // 展示数据
          type: "pie",
          radius: [81, 74],
          center: ["50%", "57%"],
          label: {
            show: false,
          },
          itemStyle: {
            borderRadius: 88,
          },
          color: ["#57A6FB", "#F7D14A"],
          data: this.pieData,
        },
      ],
    };
    option && myChart.setOption(option);
  }
}
</script>

<style lang="scss" scoped>
.top_text {
  font-size: 36px;
  line-height: 36px;
  color: #90a4c3;

  margin-bottom: 18px;
}

.text_pannel {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  text-align: center;
}

.bottom_text {
  font-size: 32px;
  line-height: 44px;
  color: #90a4c3;

  span {
    @extend %value-font;
    font-size: 48px;
    line-height: 48px;
    color: #dbf0ff;
  }
}

.chart {
  width: 240px;
  height: 240px;
  @extend %bg-img-circle-1;
  background-size: 100%;

  margin: 0px auto 23px auto;
}
</style>
