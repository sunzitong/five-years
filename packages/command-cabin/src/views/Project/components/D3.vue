<template>
  <Spin :loading="loading" :empty="empty" :height="350">
    <div class="box">
      <ul class="list">
        <li class="item" v-for="(item, index) in response" :key="index">
          <van-circle
            v-model="item.currentRate"
            :rate="item.rate"
            :speed="100"
            layer-color="#14437F"
            :color="item.color"
            :size="200"
            :stroke-width="60"
            stroke-linecap="butt"
            class="chart"
          />
          <div class="chart__text">
            <div class="name">{{ item.name }}</div>
            <div class="value">{{ formatValue(item.rate) }}%</div>
          </div>
          <div
            class="icon animate__animated animate__infinite animate__pulse"
            :style="{ 'animation-delay': index * 0.3 + 's' }"
          >
            <Icon :type="item.icon" :size="25" />
          </div>
        </li>
      </ul>
    </div>
  </Spin>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Icon from "@/components/Icon/Index.vue";
import { Base, IFetch } from "@/views/Base";
import { fetchDeviceOffline } from "@/service/analysis/bigScreen/projectBoard/managementSituation/deviceOffline";
import { iwant } from "@guanyu/shared";
import { StoreKey, useStore } from "@/store";

@Component({
  components: { Icon },
})
export default class D3 extends Base implements IFetch {
  /**
   * 返回数据(格式化后)
   */
  response: {
    name: string;
    icon: string;
    color: string;
    rate: number;
    currentRate: number;
  }[] = [];

  /**
   * 自动触发 重复调用
   * @returns response
   */
  async fetch() {
    const response = await useStore(fetchDeviceOffline, {
      key: StoreKey.ProjectDeviceOffline,
      params: {
        // 门店组织ID
        orgId: this.store.global.project.orgId,
      },
    });
    this.response = [];
    if (response?.status === "ok") {
      const data = iwant.object(response.data);
      this.response.push({
        name: "水",
        icon: "water-drop",
        color: "#5180E4",
        rate: data.waterDeviceOfflineRatio,
        currentRate: 0,
      });
      this.response.push({
        name: "电",
        icon: "lightning",
        color: "#AE95F6",
        rate: data.elecDeviceOfflineRatio,
        currentRate: 0,
      });
      this.response.push({
        name: "门锁",
        icon: "door",
        color: "#F7D14A",
        rate: data.doorDeviceOfflineRatio,
        currentRate: 0,
      });
      this.empty = false;
    } else {
      this.empty = true;
    }
    return response;
  }
}
</script>

<style lang="scss" scoped>
.box {
  height: 220px;
  padding: 10px 0;
}
.list {
  display: flex;
  justify-content: space-between;
  padding: 0 80px;
  margin: 60px 350px;
}
.item {
  position: relative;
  width: 200px;
  height: 200px;
  @extend %bg-img-circle-2;
  .icon {
    @extend %flex-center;
    position: absolute;
    width: 45px;
    height: 45px;
    background: #14437f;
    border-radius: 50%;
    top: 0;
    right: 10px;
  }
  .chart {
    transform: rotate(45deg);
    transform-origin: 50% 50%;
  }
  .chart__text {
    @extend %flex-center;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    flex-flow: column nowrap;
    .name {
      text-align: center;
      font-size: 36px;
      color: #90a4c3;
    }
    .value {
      @extend %value-font;
      font-weight: bold;
      font-size: 48px;
      line-height: 36px;
      color: #dbf0ff;
    }
  }
}
</style>
