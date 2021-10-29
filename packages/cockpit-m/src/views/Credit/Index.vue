<template>
  <div class="page__credit" v-if="optData">
    <HeaderCard />
    <main class="main">
      <!-- 运营期 -->
      <PageOperation v-if="optData.optStage === 'STEADY'" />
      <!-- 爬坡期 -->
      <PageClimbing v-if="optData.optStage === 'CLIMBING'" />
      <!-- 筹开期 -->
      <PagePreparatory v-if="optData.optStage === 'PREPARE'" />
      <!-- 暂无数据 -->
      <van-empty
        :image="emptyImage || 'search'"
        v-if="optData.optStage === null"
        description="未查询到相关数据"
      />
    </main>
  </div>
</template>

<script lang="ts">
import Base from "@/views/Base";
import { Component, Inject } from "vue-property-decorator";
import HeaderCard from "./components/HeaderCard.vue";
/**
 * 运营期
 */
import PageOperation from "./PageOperation.vue";
/**
 * 爬坡期
 */
import PageClimbing from "./PageClimbing.vue";
/**
 * 筹开期
 */
import PagePreparatory from "./PagePreparatory.vue";

import { queryOptAndSaleIndexNum } from "@/service";

@Component({
  components: {
    HeaderCard,
    PageOperation,
    PageClimbing,
    PagePreparatory,
  },
})
export default class Credit extends Base {
  @Inject() emptyImage!: string;
  /**
   * 请求参数
   */
  payload = {
    dataDate: "",
    projectId: "",
  };

  /**
   * 接口返回数据
   */
  get optData() {
    return this.store.optData ?? {};
  }

  /**
   * 渲染完成
   */
  mounted() {
    this.queryData();

    /**
     * 小冠原生 picker 变更
     * onPickerChange
     */
    this.getAppPickerValue((e) => {
      this.payload.dataDate = e;
      this.queryData();
      return true;
    });
  }

  /**
   * 综合指数
   */
  async queryData() {
    const { projectId } = this.$route.query;
    if (!projectId || Array.isArray(projectId)) {
      return;
    }
    this.payload.projectId = projectId;
    const response = await queryOptAndSaleIndexNum(this.payload);
    if (response?.status === "ok") {
      this.store.optData = response.data ?? {};
      const { startDataDate, endDataDate } = this.store.optData;

      /**
       * 设置Picker默认值
       */
      this.setAppPickerDefaultValue({
        startDate: this.payload.dataDate || endDataDate,
        type: "other",
      });

      /**
       * 设置picker区间值
       */
      this.setAppPickerRange({
        startDate: startDataDate,
        endDate: endDataDate,
      });
    } else {
      this.optData.optStage = null;
    }
  }
}
</script>

<style lang="scss">
.page__credit {
  overflow: hidden;
  .pro__table__tbody {
    > tr > td:last-child {
      font-weight: bold;
    }
  }
}
</style>
