<template>
  <Spin :height="361" :loading="loading" :empty="empty">
    <div class="page__a1__map">
      <div class="half_part left">
        <div>过会待签约</div>
        <div class="margin">
          <span class="value">{{ sepNumber(resData.toSignProjectNum) }}</span>
          <span>个</span>
        </div>
        <div>
          <span class="value">{{ sepNumber(resData.toSignRommNum) }}</span>
          <span>间</span>
        </div>
      </div>
      <div class="half_part right">
        <div>立项待上会</div>
        <div class="margin">
          <span class="value">
            {{ sepNumber(resData.toMeetingProjectNum) }}
          </span>
          <span>个</span>
        </div>
        <div>
          <span class="value">{{ sepNumber(resData.toMeetingRoomNum) }}</span>
          <span>间</span>
        </div>
      </div>
    </div>
  </Spin>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import { iwant } from "@guanyu/shared";
import {
  BusinessOppReserveReturn,
  fetchBusinessOppReserve,
} from "@/service/analysis/bigScreen/mainBoard/expandDisk/businessOppReserve";
import { StoreKey, useStore } from "@/store";

@Component({
  components: {},
})
export default class A2 extends Base implements IFetch {
  resData: Partial<BusinessOppReserveReturn> = {};

  /**
   * 自动触发 重复调用
   * @returns response
   */
  async fetch() {
    const response = await useStore(fetchBusinessOppReserve, {
      key: StoreKey.HomeBusinessOppReserve,
      params: {
        orgType: this.store.global.dataLevel,
        orgId: this.store.global.orgTree.orgId,
      },
    });
    if (response?.status === "ok") {
      this.resData = iwant.object(response.data);
    } else {
      this.empty = true;
    }
    return response;
  }
}
</script>

<style lang="scss" scoped>
.page__a1__map {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 75px 140px;

  font-size: 36px;
  line-height: 36px;
  color: #90a4c3;

  .half_part {
    position: relative;
    &::before {
      position: absolute;
      left: -38px;
      top: 11px;
      content: "";
      width: 12px;
      height: 12px;
    }

    .value {
      @extend %value-font;
      font-weight: bold;
      font-size: 48px;
      line-height: 36px;
      color: #dbf0ff;
      margin-right: 6px;
    }

    .margin {
      margin: 50px 0;
    }
  }
}

.left::before {
  background-color: rgba(247, 209, 74, 1);
}
.right::before {
  background-color: rgba(81, 128, 228, 1);
}
</style>
