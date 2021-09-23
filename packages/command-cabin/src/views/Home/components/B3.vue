<template>
  <Spin :height="560" :loading="loading">
    <div class="page__b3__map">
      <van-row class="abstract_text">
        <van-col :span="12">成本风险预警项目</van-col>
        <van-col :span="12">总体成本差异率</van-col>
      </van-row>
      <van-row class="abstract_text">
        <van-col class="span_style1" :span="12">
          {{ projecttNum }}
          <span>个</span>
        </van-col>
        <van-col class="span_style2" :span="12">{{ differRatio }}%</van-col>
      </van-row>
      <div class="whole_chart">
        <div class="item_name">
          <div
            class="item_name_item van-ellipsis"
            v-for="(itemName, index) in labels"
            :key="index"
          >
            {{ itemName }}
          </div>
        </div>
        <!-- <div
          class="app-echarts"
          ref="wrapper"
          style="width: 400px; height: 284px"
        ></div> -->
        <div class="process_container">
          <div class="line_box" v-for="(el, index) in values" :key="index">
            <div class="content" :style="{ width: el + '%' }"></div>
          </div>
        </div>
        <div class="item_value">
          <div
            class="item_value_item"
            v-for="(itemValue, index) in values"
            :key="index"
          >
            {{ itemValue }}%
          </div>
        </div>
      </div>
    </div>
  </Spin>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
// import echarts from "@/plugins/echarts";
import { Base, IFetch } from "@/views/Base";
// import mitter, { EventName } from "@/utils/mitter";
import { StoreKey, useStore } from "@/store";
import {
  CostAnalysisReturn,
  fetchCostAnalysis,
} from "@/service/analysis/bigScreen/mainBoard/construct/costAnalysis";

@Component({
  components: {},
})
export default class B3 extends Base implements IFetch {
  resData: Partial<CostAnalysisReturn> = {};
  /**
   * 条形图
   */
  @Ref() wrapper!: HTMLDivElement;
  projecttNum: number | "--" = "--"; // 成本风险预警项目
  differRatio: number | "--" = "--"; // 总体成本差异率
  labels: string[] = []; // name标签
  values: number[] = []; // 数值标签

  async fetch() {
    const response = await useStore(fetchCostAnalysis, {
      key: StoreKey.HomeCostAnalysis,
      params: {
        regionType: this.store.global.dataLevel,
        regionId: this.store.global.orgTree.orgId,
      },
    });
    if (response?.status === "ok") {
      this.resData = response.data;
      this.projecttNum = this.resData.riskItemNum
        ? this.resData.riskItemNum
        : "--";
      this.differRatio = this.resData.allItemDiff
        ? this.resData.allItemDiff
        : "--";

      this.resData.costAnalysisModelList?.forEach((el) => {
        this.labels.push(el.projectName);
        this.values.push(el.useRate);
      });
      // this.paintChart();
    } else {
      this.empty = true;
    }
    return response;
  }

  //   paintChart() {
  //     const myChart = echarts.init(this.wrapper);
  //     // myChart.showLoading();
  //     let option = {
  //       grid: {
  //         top: "0%",
  //         bottom: "0%",
  //         left: "8%",
  //         right: "8%",
  //         containLabel: true,
  //       },
  //       xAxis: { show: false, max: 100 },
  //       yAxis: {
  //         type: "category",
  //         inverse: true,
  //         axisLine: { show: false },
  //         splitLine: { show: false },
  //         axisTick: { show: false },
  //         axisLabel: { show: false },
  //         data: this.labels,
  //       },
  //       series: [
  //         {
  //           type: "bar",
  //           stack: "total",
  //           barWidth: 14,
  //           barCateGoryGap: "40%",
  //           showBackground: true,
  //           backgroundStyle: {
  //             color: "#172C47",
  //           },
  //           itemStyle: {
  //             color: new echarts.graphic.LinearGradient(
  //               1,
  //               0,
  //               0,
  //               0, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
  //               [
  //                 { offset: 0, color: "#5180E4" },
  //                 { offset: 1, color: "rgba(81, 128, 228, 0)" },
  //               ]
  //             ),
  //             width: 338,
  //           },
  //           label: { show: false },
  //           data: this.values,
  //         },
  //       ],
  //     };
  //     option && myChart.setOption(option);
  //     mitter.on(EventName.ResizeEcharts, () => {
  //       myChart.resize();
  //     });
  //   }
}
</script>

<style lang="scss" scoped>
.page__b3__map {
  padding: 40px 0px 0 0px;
}
.abstract_text {
  font-family: "PingFang SC";
  font-size: 40px;
  line-height: 40px;
  color: #90a4c3;
  padding: 18px 50px 0px 90px;
}
.span_style1 {
  font-family: "DIN Alternate";
  font-weight: bold;
  font-size: 66px;
  line-height: 60px;
  color: #dbf0ff;

  span {
    margin-left: 6px;
    font-size: 36px;
    line-height: 48px;
    font-weight: normal;
  }
}
.span_style2 {
  font-family: "DIN Alternate";
  font-weight: bold;
  font-size: 66px;
  line-height: 60px;
  color: #ff2a76;
}

.whole_chart {
  display: inline-block;
  display: flex;
  flex-flow: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  padding: 66px 50px 49px 80px;

  .item_name {
    color: #90a4c3;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    height: 270px;

    .item_name_item {
      margin: 23px 0;
      font-family: "PingFang SC";
      font-size: 40px;
      line-height: 40px;
      width: 200px;
    }
  }

  .process_container {
    width: 320px;
    height: 284px;
    margin: 0 auto;
    display: flex;
    flex-flow: column;
    flex-wrap: nowrap;
    justify-content: space-around;
    padding: 0 50px 49px 80px;
    .line_box {
      height: 14px;
      background: #172c47;

      .content {
        width: 0;
        height: 100%;
        background: linear-gradient(
          -90deg,
          #5180e4 0%,
          rgba(81, 128, 228, 0) 100%
        );
        transition: 1s;
      }
    }
  }

  .item_value {
    color: #dbf0ff;
    display: inline-block;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    height: 270px;

    .item_value_item {
      margin: 0 24px 0 0px;
      @extend %value__letter;
      font-size: 50px;
      line-height: 66px;
      text-align: right;
    }
  }
}
</style>
