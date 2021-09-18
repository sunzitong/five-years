<template>
  <Spin class="page__F1A__F1B">
    <F1B :response="response" />
    <!-- <van-swipe autoplay="5000" @change="onSwipeChangeHandle">
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
            :key="item"
          >
            <div></div>
            <div></div>
          </div>
        </div>
      </template>
    </van-swipe> -->
  </Spin>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Base from "@/views/Base";
import F1A from "./F1A.vue";
import F1B from "./F1B.vue";
import Spin from "@/components/Spin/Index.vue";
import { fetchSentiment } from "@/service/analysis/bigScreen/projectBoard/managementSituation/sentiment";
import { StoreKey, useStore } from "@/store";

@Component({
  components: {
    F1A,
    F1B,
    Spin,
  },
})
export default class F1 extends Base {
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
  /**
   * 自动触发 重复调用
   * @returns response
   */
  async fetch() {
    const response = await useStore(fetchSentiment, {
      key: StoreKey.ProjectSentiment,
      params: {
        dateScope: this.store.global.dateScope,
        projectId: this.store.global.project.projectId,
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
.page__F1A__F1B {
  width: 100%;
  height: 600px;
}
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
