<template>
  <div class="box">
    <ul class="list">
      <li class="item">
        <div class="name">资产类型</div>
        <div class="desc">{{ formatValue(response.transactionModel) }}</div>
      </li>
      <li class="item">
        <div class="name">交易对手</div>
        <div class="desc">{{ formatValue(response.transactionOpponent) }}</div>
      </li>
      <li class="item">
        <div class="name">获取方式</div>
        <div class="desc">{{ formatValue(response.acquireManner) }}</div>
      </li>
      <li class="item">
        <div class="name">合作模式</div>
        <div class="desc">{{ formatValue(response.cooperationModel) }}</div>
      </li>
      <li class="item">
        <div class="name">租赁面积</div>
        <div class="desc">
          {{ formatValue(sepNumber(response.rentalArea)) }}
        </div>
      </li>
      <li class="item">
        <div class="name">土地性质</div>
        <div class="desc">{{ formatValue(response.landProperty) }}</div>
      </li>
      <li class="item">
        <div class="name">楼体性质</div>
        <div class="desc">{{ formatValue(response.buildingProperty) }}</div>
      </li>
      <li class="item">
        <div class="name">证照产权</div>
        <div class="desc">{{ response.licensePropertyRight }}</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  ProjectBaseInfoReturn,
  fetchProjectBaseInfo,
} from "@/service/analysis/bigScreen/projectBoard/basicInformation/projectBaseInfo";
import { StoreKey, useStore } from "@/store";
import Base from "@/views/Base";
import { iwant } from "@guanyu/shared";
import { Component } from "vue-property-decorator";

@Component
export default class A1C extends Base {
  response: Partial<ProjectBaseInfoReturn> = {};
  async created() {
    const response = await useStore(fetchProjectBaseInfo, {
      key: StoreKey.ProjectBaseInfo,
      params: { phId: this.store.global.project.phId },
    });
    if (response?.status === "ok") {
      this.response = iwant.object(response.data);
    }
  }
}
</script>

<style lang="scss" scoped>
$padding-x: 100px;
.box {
  padding: 0 26px;
  font-family: PingFang SC;
  font-size: 40px;
  line-height: 1;
  color: #90a4c3;
  .list {
    box-sizing: border-box;
    height: 516px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    background: rgba(65, 105, 158, 0.1);
    padding: 14px 0 14px $padding-x;
    .item {
      display: flex;
      justify-content: space-between;
      line-height: 56px;
      box-sizing: border-box;
      .name {
        flex: 3;
      }
      .desc {
        flex: 2;
      }
    }
  }
}
</style>
