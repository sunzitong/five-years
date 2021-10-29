<template>
  <div>
    <!-- 筹开期 -->
    <ProCard title="筹开目标达成">
      <template v-slot:extra>
        <router-link :to="jumpTo()">查看KP达成排名</router-link>
      </template>
      <TargetComplete
        :explane="reachTarget.explane"
        :cycle="`KP冲刺周期：${reachTarget.cycle}`"
        :complete="reachTarget.complete"
        status="目标出租率"
      >
        <div style="text-align: center">
          <van-circle
            v-model="currentRate"
            :rate="reachTarget.rentTargetRatio"
            size=".46rem"
            :speed="100"
            color="#1C7AF7"
            layer-color="#F3F3F3"
            :stroke-width="60"
            :text="`${currentRate}%`"
          />
        </div>
      </TargetComplete>
    </ProCard>
    <!-- 时点出租率 -->
    <TimeRateComponent />
    <!-- 筹开达成率 -->
    <PrepareComponent />
  </div>
</template>

<script lang="ts">
import Base from "@/views/Base";
import { Component } from "vue-property-decorator";
import ProCard from "@/components/ProCard.vue";
import TargetComplete from "@/components/TargetComplete.vue";

/**
 * 时点出租率
 */
import TimeRateComponent from "./components/TimeRateComponent.vue";

/**
 * 渠道效能值
 */
import PrepareComponent from "./components/PrepareComponent.vue";
import { getQueries } from "@guanyu/shared";

@Component({
  components: {
    ProCard,
    PrepareComponent,
    TimeRateComponent,
    TargetComplete,
  },
})
export default class PagePreparatory extends Base {
  currentRate = 0;

  get reachTarget() {
    const target = this.optData.reachTarget ?? {};

    return {
      /**
       * 目标出租率
       */
      rentTargetRatio: target.rentTargetRatio ?? 0,
      /**
       * 筹开达成率
       */
      prepareReachRatio: target.prepareReachRatio ?? 0,
      /**
       * 是否达成目标
       */
      complete: target.offsetNum >= 0,
      /**
       * 距离目标还剩多少天
       */
      targetLeftDays: target.targetLeftDays ?? "-",
      /**
       * 周期提示
       */
      explane: target.tip ?? "-",
      /**
       * 爬坡周期
       */
      cycle: target.prepareReachPeriod ?? "-",
    };
  }

  get optData() {
    return this.store.optData ?? {};
  }

  jumpTo() {
    const { projectId } = getQueries();
    return `/yearsKP?projectId=${projectId || ""}`;
  }
}
</script>

<style lang="scss"></style>
