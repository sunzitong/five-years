<template>
  <Spin :loading="loading" :empty="empty">
    <div class="page__maintenance_report__map">
      <div class="whole_pannel">
        <div
          class="chart"
          ref="wrapper"
          style="width: 900px; height: 300px"
        ></div>
      </div>
    </div>
  </Spin>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import { AnyObject, iwant } from "@guanyu/shared";
import {
  fetchRepairStat,
  RepairStatReturn,
} from "@/service/analysis/bigScreen/mainBoard/construct/repairStat";
import { Base, IFetch } from "@/views/Base";
import { StoreKey, useStore } from "@/store";
import mitter, { EventName } from "@/utils/mitter";

@Component
export default class B5 extends Base implements IFetch {
  /**
   * 饼图
   */
  @Ref() wrapper!: HTMLDivElement;
  /**
   * 接口返回值
   * /bigScreen/mainBoard/construct/repairStat
   */
  resData: Partial<RepairStatReturn> = {};

  names = ["水电类", "装修类", "设备类", "其他"]; // name标签

  data: AnyObject[] = []; // 饼图对象数组

  objData1: AnyObject = {}; // name-count键值对对象
  objData2: AnyObject = {}; // name-ratio键值对对象

  reset() {
    this.data = [];
    this.objData1 = {};
    this.objData2 = {};
  }

  buildData(resData: AnyObject) {
    // 构建配置数据
    let i = 0;
    Object.keys(resData).forEach((el1) => {
      let keys = resData[el1];
      let name = this.names[i++];
      this.objData1[name] = keys.count;
      this.objData2[name] = keys.ratio;
      this.data.push({ name: name, value: keys.count, ratio: keys.ratio });
    });
  }

  /**
   * 自动触发 重复调用
   * @returns response
   */
  async fetch() {
    const response = await useStore(fetchRepairStat, {
      key: StoreKey.HomeRepairStat,
      params: {
        orgType: this.store.global.dataLevel,
        orgId: this.store.global.orgTree.orgId,
        year: +this.store.global.yearValue,
      },
    });
    this.reset();
    if (response?.status === "ok") {
      this.resData = iwant.object(response.data);
      this.buildData(this.resData);
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
      legend: {
        orient: "vertical",
        left: "40%",
        top: "3%",
        bottom: "3%",
        icon: "rec",
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 25,
        data: this.names,
        formatter: (params: any) => {
          return `{a|${params}}{b|  ${this.objData1[params]}}{c| ${this.objData2[params]}%}`;
        },
        textStyle: {
          rich: {
            a: {
              color: "#90A4C3",
              fontSize: 40,
              lineHeight: 36,
              width: 110,
              padding: [0, 0, 2, 18],
            },
            b: {
              fontFamily: this.store.env.VALUE_FONT,
              color: "#DBF0FF",
              fontWeight: "bold",
              fontSize: 48,
              lineHeight: 50,
              width: 140,
              align: "right",
            },
            c: {
              fontFamily: this.store.env.VALUE_FONT,
              color: "#DBF0FF",
              fontWeight: "bold",
              fontSize: 48,
              lineHeight: 50,
              width: 220,
              align: "right",
            },
          },
        },
      },
      series: [
        {
          type: "pie",
          avoidLabelOverlap: false,
          radius: [81, 72],
          center: ["20%", "50%"],
          itemStyle: {
            borderRadius: 88,
          },
          color: ["#F7D14A", "#5180E4", "#22CB98", "#AE95F6"],
          label: {
            show: false,
          },
          data: this.data,
        },
      ],
    };
    option && myChart.setOption(option);
  }
}
</script>

<style lang="scss" scoped>
.whole_pannel {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;

  .pannel_values {
    position: relative;
    top: -5px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    color: #01f5f1;
    @extend %value-font;
    font-weight: bold;
    font-size: 34px;

    .values_left,
    .values_right {
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-evenly;
    }

    .values_right {
      margin-left: 39px;
    }
  }
}

.chart {
  width: 300px;
  height: 300px;
  @extend %bg-img-circle-1;
  background-size: 26%;
  background-position: 63px 18px;
}
</style>
