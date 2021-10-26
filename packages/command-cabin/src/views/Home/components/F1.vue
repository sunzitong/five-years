<template>
  <Spin :loading="loading" :empty="empty">
    <div class="page__e5a__e5b">
      <van-swipe ref="swipe" autoplay="15000" @change="onSwipeChangeHandle">
        <van-swipe-item>
          <F1A :response="response" />
        </van-swipe-item>
        <van-swipe-item>
          <F1B :response="response" />
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">
            <div
              class="item"
              :class="{ current: current === index }"
              v-for="(item, index) of 2"
              @click="handleClick(index)"
              :key="item"
            >
              <div></div>
              <div></div>
            </div>
          </div>
        </template>
      </van-swipe>
    </div>
  </Spin>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import F1A from "./F1A.vue";
import F1B from "./F1B.vue";
import { fetchSentiment } from "@/service/analysis/bigScreen/mainBoard/managementSituation/sentiment";
import { StoreKey, useStore } from "@/store";
import { Swipe } from "vant";
import { iwant } from "@guanyu/shared";

@Component({
  components: {
    F1A,
    F1B,
  },
})
export default class F1 extends Base implements IFetch {
  @Ref() swipe!: Swipe;
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
   * 点击事件
   */
  handleClick(index: number) {
    this.swipe.swipeTo(index);
  }

  /**
   * 请求数据
   * 自动触发 重复调用
   * @returns response
   */
  async fetch() {
    const response = await useStore(fetchSentiment, {
      key: StoreKey.HomeSentiment,
      params: {
        orgType: this.store.global.dataLevel,
        orgId: this.store.global.orgTree.orgId,
        dateScope: this.store.global.dateScope,
        date: this.store.global.dateValue,
      },
    });
    if (response?.status === "ok") {
      this.response = iwant.object(response.data);
      this.empty = false;
    } else {
      this.response = {};
      this.empty = true;
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
