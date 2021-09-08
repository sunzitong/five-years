<template>
  <div class="page__maintenance_report__map">
    <div class="chart">
      <div v-for="(item, index) in data" v-bind:key="index" class="chart-item">
        <div
          class="chart-icon animate__animated animate__infinite animate__pulse"
          :style="{ 'animation-delay': index * 0.3 + 's' }"
        >
          <Icon :type="iconArr[index]" size="22" />
        </div>
        <van-circle
          v-model="item.currentRate"
          :rate="item.value"
          :speed="100"
          :color="colors[index]"
          layer-color="#14437F"
          :stroke-width="70"
          :size="160"
          stroke-linecap="butt"
          :clockwise="true"
          class="chart-circle"
        >
          <div class="rate-text">
            <div class="value">{{ item.currentRate }}%</div>
            <div class="desc">{{ item.name }}</div>
          </div>
        </van-circle>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import Icon from "@/components/Icon/Index.vue";
import Base from "@/views/Base";
import {
  DeviceOfflineReturn,
  fetchDeviceOffline,
} from "@/service/bigScreen/mainBoard/managementSituation/deviceOffline";
import dayjs from "dayjs";
import { sepNumber } from "@/utils/tools";
import { AnyObject } from "@guanyu/shared";

@Component({
  components: {
    Icon,
  },
})
export default class E4 extends Base {
  @Ref() wrapper!: HTMLDivElement;

  resData: Partial<DeviceOfflineReturn> = {};
  year = dayjs().year();

  sepNumber = sepNumber;

  // data = [
  //   {
  //     name: "水",
  //     value: 10,
  //     currentRate: 0,
  //   },
  //   {
  //     name: "电",
  //     value: 100.01,
  //     currentRate: 0,
  //   },
  //   {
  //     name: "门禁",
  //     value: 50,
  //     currentRate: 0,
  //   },
  // ];

  data: AnyObject[] = [];

  colors = ["#59D1FE", "#8E3AFF", "#EEBC4A"];
  iconArr = ["water-drop", "lightning", "door"];

  async created() {
    const response = await fetchDeviceOffline({
      regionType: "CITY",
      regionId: 85,
      dataTime: this.year,
    });
    if (response?.status === "ok") {
      this.resData = response.data;

      this.data = [
        {
          name: "水",
          value: sepNumber(this.resData.waterDeviceOfflineRatio),
          currentRate: 0,
        },
        {
          name: "电",
          value: sepNumber(this.resData.elecDeviceOfflineRatio),
          currentRate: 0,
        },
        {
          name: "门禁",
          value: sepNumber(this.resData.doorDeviceOfflineRatio),
          currentRate: 0,
        },
      ];

      console.log(2324, this.resData, this.data);
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  display: flex;
  justify-content: space-around;
  padding-top: 50px;
  .chart-item {
    position: relative;
    z-index: 1;
    .chart-icon {
      width: 45px;
      height: 45px;
      box-sizing: border-box;
      background: #14437f;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 100;
    }
    .rate-text {
      transform: rotate(-45deg);
      @extend %flex-center;
      flex-flow: column nowrap;
      height: 100%;
      line-height: 1;
      .value {
        @extend %value__letter;
        font-weight: bold;
        font-size: 32px;
      }
      .desc {
        font-size: 24px;
        margin-top: 8px;
      }
    }
  }
}
.chart-circle {
  transform: rotate(45deg);
}
</style>
