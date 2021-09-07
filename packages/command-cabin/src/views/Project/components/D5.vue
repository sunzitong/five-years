<template>
  <div class="box">
    <van-row justify="space-around">
      <van-col :span="8" v-for="(item, index) in response" :key="index">
        <div class="item">
          <van-circle
            v-model="item.currentRate"
            :rate="item.rate * 100"
            :speed="50"
            layer-color="#14437F"
            :color="item.color"
            :size="140"
            :stroke-width="60"
            stroke-linecap="butt"
            class="chart"
          />
          <div class="chart__text">{{ formatValue(item.currentRate) }}%</div>
          <div class="icon">
            <Icon :type="item.icon" :size="22" />
          </div>
          <div class="name">{{ item.name }}</div>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Icon from "@/components/Icon/Index.vue";
import Base from "@/views/Base";
import { fetchDeviceOffline } from "@/service/bigScreen/projectBoard/managementSituation/deviceOffline";
import dayjs from "dayjs";
import { iwant } from "@guanyu/shared";

@Component({
  components: { Icon },
})
export default class D5 extends Base {
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

  async created() {
    const response = await fetchDeviceOffline({
      projectNo: this.store.global.projectId.toString(),
      dataTime: dayjs().format("YYYY-MM-DD"),
    });
    if (response?.status === "ok") {
      const data = iwant.object(response.data);
      this.response.push({
        name: "水",
        icon: "water-drop",
        color: "#57A6FB",
        rate: data.waterDeviceOfflineRatio,
        currentRate: 0,
      });
      this.response.push({
        name: "电",
        icon: "lightning",
        color: "#A957FB",
        rate: data.elecDeviceOfflineRatio,
        currentRate: 0,
      });
      this.response.push({
        name: "门禁",
        icon: "door",
        color: "#FBEE7E",
        rate: data.doorDeviceOfflineRatio,
        currentRate: 0,
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  margin-top: 10px;
}
.item {
  position: relative;
  width: 140px;
  height: 140px;
  margin: auto;
  .icon {
    @extend %flex-center;
    position: absolute;
    width: 45px;
    height: 45px;
    background: #14437f;
    border-radius: 50%;
    top: 0;
    right: 0;
  }
  .chart {
    transform: rotate(30deg);
    transform-origin: 50% 50%;
  }
  .chart__text {
    @extend %flex-center;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    @extend %value__letter;
    font-weight: bold;
    font-size: 40px;
    color: #01f5f1;
  }
  .name {
    margin-top: 24px;
    text-align: center;
    font-family: PingFang SC;
    font-size: 30px;
    color: #fff;
  }
}
</style>
