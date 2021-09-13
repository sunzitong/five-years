<template>
  <div class="box">
    <div class="title">
      资产类型：
      <span class="light">{{ formatValue(response.transactionModel) }}</span>
    </div>
    <ul class="list">
      <li class="item">
        <div class="label">开业间数</div>
        <div class="value">
          {{ formatValue(sepNumber(response.openRoomNum)) }}
          <span class="unit">间</span>
        </div>
      </li>
      <li class="item">
        <div class="label">底商面积</div>
        <div class="value">
          {{ formatValue(sepNumber(response.businessArea)) }}
          <span class="unit">m²</span>
        </div>
      </li>
      <li class="item">
        <div class="label">一展工位数</div>
        <div class="value">
          {{ formatValue(sepNumber(response.workstationNum)) }}
          <span class="unit">个</span>
        </div>
      </li>
      <li class="item">
        <div class="label">车位个数</div>
        <div class="value">
          {{ formatValue(sepNumber(response.parkingSpaceNum)) }}
          <span class="unit">个</span>
        </div>
      </li>
      <li class="item">
        <div class="label">增值点位</div>
        <div class="value">
          {{ formatValue(sepNumber(response.valueAddedPoint)) }}
          <span class="unit">个</span>
        </div>
      </li>
      <!-- 重资产 -->
      <li class="item">
        <div class="label">获取时间</div>
        <div class="value">
          {{ formatValue(response.acquireTime) }}
        </div>
      </li>
      <!-- 中轻资产 -->
      <li class="item" v-show="false">
        <div class="label">年限</div>
        <div class="value">
          {{ formatValue(sepNumber(response.term)) }}
          <span class="unit">年</span>
        </div>
        <div class="year">
          {{ formatValue(response.projectBeginTime) }}
          ~
          {{ formatValue(response.projectEndTime) }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Base from "@/views/Base";
import {
  ProjectBaseInfoReturn,
  fetchProjectBaseInfo,
} from "@/service/analysis/bigScreen/projectBoard/basicInformation/projectBaseInfo";

@Component
export default class A1 extends Base {
  response: Partial<ProjectBaseInfoReturn> = {};
  async created() {
    const response = await fetchProjectBaseInfo({
      phId: this.store.global.project.phId,
    });
    if (response?.status === "ok") {
      this.response = response.data;
    }
  }
}
</script>

<style lang="scss" scoped>
$light: #01f5f1;
$gray: #b4b4b4;
$padding-x: 82px;
.box {
  display: flex;
  flex-flow: column nowrap;
  color: #fff;
  font-family: PingFang SC;
  line-height: 1;
  width: 1098px;
  /* height: 560px; */
  .list {
    display: flex;
    flex-wrap: wrap;
  }
  .item {
    width: 50%;
    height: 96px;
    padding-left: $padding-x;
    box-sizing: border-box;
    margin-top: 50px;
  }
}
.light {
  color: $light;
}
.title {
  font-weight: 500;
  font-size: 36px;
  padding-left: $padding-x;
  margin-top: 10px;
}
.label {
  font-size: 30px;
}
.value {
  @extend %value__letter;
  font-size: 60px;
  color: $light;
  margin-top: 6px;
}
.unit {
  font-size: 24px;
  color: $light;
}
.year {
  font-size: 24px;
  color: $gray;
  margin-top: 6px;
}
</style>
