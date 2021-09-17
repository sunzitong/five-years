<template>
  <div class="page__e5a__e5b">
    <van-swipe autoplay="5000" @change="onSwipeChangeHandle">
      <van-swipe-item>
        <E5A :response="response" />
      </van-swipe-item>
      <van-swipe-item>
        <E5B :response="response" />
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">
          <div
            class="item"
            :class="{ current: current === index }"
            v-for="(item, index) of 2"
            :key="item"
          >
            <div></div>
            <div></div>
          </div>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Base from "@/views/Base";
import E5A from "./E5A.vue";
import E5B from "./E5B.vue";
import { fetchSentiment } from "@/service/analysis/bigScreen/mainBoard/managementSituation/sentiment";
import { StoreKey, useStore } from "@/store";

@Component({
  components: {
    E5A,
    E5B,
  },
})
export default class E5 extends Base {
  /**
   * 返回数据
   */
  response = {};

  current = 0;

  /**
   * 幻灯片改变
   */
  onSwipeChangeHandle(index: number) {
    this.current = index;
  }

  /**
   * 请求数据
   */
  async fetch() {
    const response = await useStore(fetchSentiment, {
      key: StoreKey.HomeSentiment,
      params: {
        dataLevel: this.store.global.dataLevel,
        levelId: this.store.global.orgTree.orgId,
        dateScope: this.store.global.dateScope,
      },
    });
    if (response?.status === "ok") {
      this.response = response.data ?? {};
    }
    return response;
  }
}
</script>

<style lang="scss" scoped>
.custom-indicator {
  display: flex;
  justify-content: center;
  > .item {
    flex: 1;
    max-width: 36px;
    min-width: 36px;
    height: 6px;
    background: rgba(83, 214, 255, 0.3);
  }
  > .current {
    background: #01f5f1;
  }
}
</style>
