<template>
  <div class="box">
    <div class="item">
      <Icon type="room-number" :size="120" />
      <div class="info">
        <div class="title">累计获取房间数(间)</div>
        <div class="num value-font">
          <StepNumber :to="response.getRoomNum" />
        </div>
      </div>
    </div>
    <div class="item">
      <Icon type="number-of-opening-rooms" :size="120" />
      <div class="info">
        <div class="title">累计开业房间数(间)</div>
        <div class="num value-font">
          <StepNumber :to="response.openRoomNum" />
        </div>
      </div>
    </div>
    <div class="item">
      <Icon type="year-income" :size="120" />
      <div class="info">
        <div class="title">年累总收入(收入总额含税)</div>
        <span class="num value-font">
          <StepNumber :to="response.incomeNum" />
        </span>
        万元
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Icon from "@/components/Icon/Index.vue";
import {
  fetchNumYearly,
  NumYearlyReturn,
} from "@/service/analysis/bigScreen/mainBoard/center/numYearly";
import { Base, IFetch } from "@/views/Base";
import StepNumber from "@/components/StepNumber/Index.vue";
import { StoreKey, useStore } from "@/store";

@Component({
  components: {
    Icon,
    StepNumber,
  },
})
export default class C1 extends Base implements IFetch {
  /**
   * 返回数据
   */
  response: Partial<NumYearlyReturn> = {};

  /**
   * 自动触发 重复调用
   * @returns response
   */
  async fetch() {
    const response = await useStore(fetchNumYearly, {
      key: StoreKey.HomeNumYearly,
    });
    if (response?.status === "ok") {
      this.response = response.data ?? {};
    }
    return response;
  }
}
</script>
<style lang="scss" scoped>
.box {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  font-size: 40px;
  color: #90a4c3;
  margin: 70px 60px 0;
}
.item {
  display: flex;
}
.info {
  margin-left: 30px;
  .num {
    font-size: 90px;
  }
}
.item {
  &:nth-child(1) .num {
    color: #5180e4;
  }
  &:nth-child(2) .num {
    color: #ae95f6;
  }
  &:nth-child(3) .num {
    color: #f7d14a;
  }
}
</style>
