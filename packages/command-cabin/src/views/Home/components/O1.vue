<template>
  <div class="box">
    <div class="item">
      <Icon type="brand" :size="40" />
      <div class="info">
        <div class="title">品牌指数</div>
        <div class="num value-font">
          NO.
          {{ formatValue(response.brandPointNum) }}
        </div>
      </div>
    </div>
    <div class="item">
      <Icon type="users" :size="40" />
      <div class="info">
        <div class="title">累计服务用户数</div>
        <div class="num value-font">
          <StepNumber :to="response.servedPersonNum" />
        </div>
      </div>
    </div>
    <div class="item">
      <Icon type="income" :size="40" />
      <div class="info">
        <div class="title">累计租户</div>
        <div class="num value-font">
          <StepNumber :to="response.tenantNum" />
        </div>
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
import { iwant } from "@guanyu/shared";

@Component({
  components: {
    Icon,
    StepNumber,
  },
})
export default class O1 extends Base implements IFetch {
  /**
   * 返回数据
   */
  response: NumYearlyReturn = {
    /** 房间间数 */
    getRoomNum: 0,
    /** 累计开业房间间数 */
    openRoomNum: 0,
    /** 年累计收 */
    incomeNum: 0,
    /** 品牌指数 */
    brandPointNum: 0,
    /** 累计服务用户数 */
    servedPersonNum: 0,
    /** 累计租户 */
    tenantNum: 0,
  };

  /**
   * 自动触发 重复调用
   * @returns response
   */
  async fetch() {
    const response = await useStore(fetchNumYearly, {
      key: StoreKey.HomeNumYearly,
      params: {
        orgType: this.store.global.dataLevel,
        orgId: this.store.global.orgTree.orgId,
      },
    });
    if (response?.status === "ok") {
      this.response = Object.assign(this.response, iwant.object(response.data));
    }
    return response;
  }
}
</script>
<style lang="scss" scoped>
.box {
  width: 968px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  font-size: 36px;
  color: #90a4c3;
  position: absolute;
  top: 42px;
  right: 100px;
  z-index: 10;
}
.item {
  display: flex;
}
.info {
  margin-left: 25px;
  .num {
    font-size: 66px;
    color: #dbf0ff;
  }
}
</style>
