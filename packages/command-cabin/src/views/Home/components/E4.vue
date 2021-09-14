<template>
  <div class="page__maintenance_report__map">
    <div class="chart">
      <div v-for="(item, index) in data" v-bind:key="index" class="chart-item">
        <div
          class="chart-icon animate__animated animate__infinite animate__pulse"
          :style="{ 'animation-delay': index * 0.3 + 's' }"
        >
          <Icon :type="item.icon" size="22" />
        </div>
        <van-circle
          v-model="item.currentRate"
          :rate="item.value"
          :speed="50"
          :color="item.color"
          layer-color="#14437F"
          :stroke-width="70"
          :size="160"
          stroke-linecap="round"
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
import { Component } from "vue-property-decorator";
import Icon from "@/components/Icon/Index.vue";
import Base from "@/views/Base";
import { fetchDeviceOffline } from "@/service/analysis/bigScreen/mainBoard/managementSituation/deviceOffline";
import { iwant } from "@guanyu/shared";
import { StoreKey, useStore } from "@/store";

@Component({
  components: {
    Icon,
  },
})
export default class E4 extends Base {
  data: {
    name: string;
    value: number;
    currentRate: number;
    color: string;
    icon: string;
  }[] = [];

  async created() {
    const response = await useStore(fetchDeviceOffline, {
      key: StoreKey.HomeDeviceOffline,
      params: {
        orgType: this.store.global.dataLevel,
        orgId: this.store.global.orgTree.orgId,
      },
    });
    if (response?.status === "ok") {
      const data = iwant.object(response.data);
      this.data = [
        {
          name: "水",
          value: data.waterDeviceOfflineRatio * 100,
          currentRate: 0,
          color: "#5180E4",
          icon: "water-drop",
        },
        {
          name: "电",
          value: data.elecDeviceOfflineRatio * 100,
          currentRate: 0,
          color: "#AE95F6",
          icon: "lightning",
        },
        {
          name: "门禁",
          value: data.doorDeviceOfflineRatio * 100,
          currentRate: 0,
          color: "#F7D14A",
          icon: "door",
        },
      ];

      this.setCardDataSource({ from: data.dataSource, time: data.updateTime });
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
