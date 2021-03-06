<template>
  <Spin :loading="loading" :empty="empty">
    <div class="page__product_quality__map">
      <div class="whole_pannel">
        <div class="item_name">
          <div
            class="item_name_item"
            v-for="(itemName, index) in labels"
            :key="index"
          >
            {{ itemName }}
          </div>
        </div>
        <div
          class="app-echarts"
          style="width: 330px; height: 340px"
          ref="wrapper"
        ></div>
        <div class="item_value">
          <div
            class="item_value_item"
            v-for="(itemValue, index) in values"
            :key="index"
          >
            {{ index === 1 ? itemValue : itemValue + "%" }}
          </div>
        </div>
      </div>
    </div>
  </Spin>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import {
  fetchProductQuality,
  ProductQualityReturn,
} from "@/service/analysis/bigScreen/mainBoard/construct/productQuality";
import { Base, IFetch } from "@/views/Base";
import { iwant, NumberLike } from "@guanyu/shared";
import { StoreKey, useStore } from "@/store";
import mitter, { EventName } from "@/utils/mitter";
import { DateScopes } from "@/service/analysis/commandCabin/publicEnum/enums";

@Component({
  components: {},
})
export default class B4 extends Base implements IFetch {
  /**
   * 条形图
   */
  @Ref() wrapper!: HTMLDivElement;
  /**
   * 接口返回值
   * /bigScreen/mainBoard/construct/productQuality
   */
  resData: Partial<ProductQualityReturn> = {};

  // name标签
  labels = [
    "IPD产品\n封装率",
    "中期停止点\n检查平均得分",
    "移交质量评估\n平均合格率",
  ];

  // 数值标签
  values: NumberLike[] = [0, 0, 0];

  /**
   * 自动触发 重复调用
   * @returns response
   */
  async fetch() {
    const response = await useStore(fetchProductQuality, {
      key: StoreKey.HomeProductQuality,
      params: {
        orgType: this.store.global.dataLevel,
        orgId: this.store.global.orgTree.orgId,
        // 仅年累
        dateScope: DateScopes.YEARLY,
        date: +this.store.global.yearValue,
      },
    });
    if (response?.status === "ok") {
      this.resData = iwant.object(response.data);

      this.values = [];
      for (let key in this.resData) {
        this.values.push(this.resData[key]);
      }
      this.values = [
        iwant.number(this.resData.ipdRatio),
        iwant.number(this.resData.checkScore),
        iwant.number(this.resData.qualityScore),
      ];

      this.paintChart();
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
    let option = {
      grid: {
        top: "0%",
        bottom: "0%",
        left: "0%",
        right: "3%",
        containLabel: true,
      },
      xAxis: { show: false, max: 100 },
      yAxis: {
        type: "category",
        inverse: true,
        axisLine: { show: false },
        splitLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        data: this.labels,
      },
      series: [
        {
          type: "bar",
          stack: "total",
          barWidth: 14,
          showBackground: true,
          backgroundStyle: {
            color: "#172C47",
            // borderRadius: 40,
          },
          barCategoryGap: "30%",
          itemStyle: {
            color: new echarts.graphic.LinearGradient(
              1,
              0,
              0,
              0, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
              [
                { offset: 0, color: "#5180E4" },
                { offset: 1, color: "rgba(81, 128, 228, 0)" },
              ]
            ),
            // borderRadius: 40,
            width: 338,
          },
          label: { show: false },
          data: this.values.map((val) => Math.max(0, +val)),
        },
      ],
    };
    option && myChart.setOption(option);
  }
}
</script>

<style lang="scss" scoped>
.page__product_quality__map {
  padding: 56px 50px 44px 70px;
}
.whole_pannel {
  display: inline-block;
  display: flex;
  flex-flow: row;
  flex-wrap: nowrap;
  justify-content: space-around;

  .item_name {
    white-space: pre-line;
    color: #90a4c3;

    .item_name_item {
      margin: 20px 31px;
      font-size: 36px;
      line-height: 40px;
    }
  }

  .item_value {
    color: #dbf0ff;
    display: inline-block;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    height: 320px;

    .item_value_item {
      margin: 0 24px 0 0px;
      @extend %value-font;
      font-size: 50px;
      line-height: 66px;
    }
  }
}
</style>
