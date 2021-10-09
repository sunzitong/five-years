<template>
  <Spin :height="361" :loading="loading" :empty="empty">
    <div class="page__a1__map">
      <div class="chart" ref="wrapper"></div>
    </div>
  </Spin>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import { Base, IFetch } from "@/views/Base";
import { AnyObject, arrayToObject, iwant } from "@guanyu/shared";
import mitter, { EventName } from "@/utils/mitter";
import {
  BusinessOppReserveReturn,
  fetchBusinessOppReserve,
} from "@/service/analysis/bigScreen/mainBoard/expandDisk/businessOppReserve";
import { StoreKey, useStore } from "@/store";

@Component({
  components: {},
})
export default class A2 extends Base implements IFetch {
  /**
   * 饼图
   */
  @Ref() wrapper!: HTMLDivElement;
  resData: Partial<BusinessOppReserveReturn> = {};

  pieData: AnyObject[] = [];

  objData1: AnyObject = {}; // 饼图name-value键值对对象
  objData2: AnyObject = {}; // 左侧饼图name-room键值对对象

  /**
   * 自动触发 重复调用
   * @returns response
   */
  async fetch() {
    const response = await useStore(fetchBusinessOppReserve, {
      key: StoreKey.HomeBusinessOppReserve,
      params: {
        orgType: this.store.global.dataLevel,
        orgId: this.store.global.orgTree.orgId,
      },
    });
    if (response?.status === "ok") {
      this.resData = iwant.object(response.data);
      this.pieData = [
        // 饼图对象数组
        {
          name: "过会待签约",
          value: this.resData.toSignProjectNum,
          room: this.resData.toSignRommNum,
        },
        {
          name: "立项待上会",
          value: this.resData.toMeetingProjectNum,
          room: this.resData.toMeetingRoomNum,
        },
      ];

      this.objData1 = arrayToObject(this.pieData, {
        key: "name",
        value: "value",
      });
      this.objData2 = arrayToObject(this.pieData, {
        key: "name",
        value: "room",
      });
      this.paintChart();
    } else {
      this.empty = true;
    }
    return response;
  }

  paintChart() {
    const myChart = echarts.init(this.wrapper);
    // myChart.showLoading();
    let option = {
      legend: {
        orient: "vertical",
        left: "5%",
        top: "center",
        icon: "rec",
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 46,
        data: this.names,
        formatter: (params: any) => {
          return `{a|${params}:\n}{b|${this.sepNumber(
            this.objData1[params]
          )}}{c|个}{b|${this.sepNumber(this.objData2[params])}}{c|间}`;
        },
        textStyle: {
          rich: {
            a: {
              color: "#90A4C3",
              fontSize: 36,
              // lineHeight: 36,
              padding: [65, 0, 20, 40],
              width: 140,
            },
            b: {
              fontFamily: this.store.env.VALUE_FONT,
              color: "#DBF0FF",
              fontWeight: "bold",
              fontSize: 48,
              // lineHeight: 36,
              align: "left",
              // width: 100,
              padding: [0, 0, 0, 40],
            },
            c: {
              fontFamily: this.store.env.VALUE_FONT,
              color: "#90A4C3",
              fontSize: 36,
              // lineHeight: 36,
              marginLeft: 6,
              width: 36,
              padding: [0, 1, 0, 6],
              align: "right",
            },
          },
        },
      },
      series: [
        {
          type: "pie",
          itemStyle: {
            borderRadius: 88,
          },
          radius: [81, 74],
          center: ["75%", "50%"],
          color: ["#F7D14A", "#57A6FB"],
          label: {
            show: false,
          },
          data: this.pieData,
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
.chart {
  width: 766px;
  height: 334px;
  @extend %bg-img-circle-1;
  margin: 5px 50px;
  background-position: 457px 34px;
  background-size: 234px;
}
</style>
