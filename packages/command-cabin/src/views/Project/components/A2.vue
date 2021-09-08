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
  BasicInformationReturn,
  fetchBasicInformation,
} from "@/service/analysis/bigScreen/projectBoard/basicInformation";
import Base from "@/views/Base";
import dayjs from "dayjs";
import { Component } from "vue-property-decorator";

@Component
export default class A2 extends Base {
  response: Partial<BasicInformationReturn> = {};
  async created() {
    const response = await fetchBasicInformation({ year: dayjs().year() });
    if (response?.status === "ok") {
      this.response = response.data;
    }
  }
}
</script>

<style lang="scss" scoped>
$light: #01f5f1;
$padding-x: 85px;
.box {
  width: 1098px;
  box-sizing: border-box;
  padding: 10px $padding-x;
  font-family: PingFang SC;
  font-size: 34px;
  line-height: 1;
  color: #fff;
  .list {
    .item {
      display: flex;
      justify-content: space-between;
      line-height: 56px;
      box-sizing: border-box;
    }
    .name {
      color: $light;
    }
  }
}
</style>
