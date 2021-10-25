<template>
  <Spin class="account" :loading="loading" :empty="empty">
    <div class="account__award">
      <span>{{ awards }}</span>
      万元
    </div>
  </Spin>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import { StoreKey, useStore } from "@/store";
import {
  AwardsInfoReturn,
  fetchAwardsInfo,
} from "@/service/analysis/bigScreen/projectBoard/finance/awardsInfo";
import { iwant } from "@guanyu/shared";

@Component
export default class B3 extends Base implements IFetch {
  /**
   * 返回数据
   */
  response: Partial<AwardsInfoReturn> = {};

  /**
   * 奖补到账
   */
  get awards() {
    return this.formatValue(this.response.awards);
  }

  /**
   * 请求数据
   * 自动触发 重复调用
   * @returns response
   */
  async fetch() {
    const response = await useStore(fetchAwardsInfo, {
      key: StoreKey.ProjectAwardsInfo,
      params: {
        phId: this.store.global.project.phId,
      },
    });
    if (response?.status === "ok") {
      this.response = iwant.object(response.data);
    } else {
      this.response = {};
    }
    return response;
  }
}
</script>

<style lang="scss" scoped>
.account {
  height: 150px;
  @extend %flex-center;

  &__award {
    color: #90a4c3;
    font-size: 40px;
    span {
      color: #dbf0ff;
      font-size: 88px;
    }
  }
}
</style>
