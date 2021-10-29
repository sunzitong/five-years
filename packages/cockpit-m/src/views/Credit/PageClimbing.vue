<template>
  <div>
    <!-- 爬坡期 -->
    <ProCard title="爬坡目标达成" v-if="optData">
      <TargetComplete
        :explane="reachTarget.explane"
        :cycle="`爬坡周期：${reachTarget.cycle}`"
        status="目标倒计时"
        :complete="reachTarget.complete"
      >
        <div class="count">
          <div class="day">{{ reachTarget.targetLeftDays }}</div>
          <div class="unit">天</div>
        </div>
      </TargetComplete>
    </ProCard>
    <!-- 时点出租率 -->
    <TimeRateComponent />
    <!-- 渠道效能值 -->
    <ChannelComponent />
    <!-- 运营健康值 -->
    <OperationalComponent />
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
import ChannelComponent from "./components/ChannelComponent.vue";

/**
 * 运营健康度
 */
import OperationalComponent from "./components/OperationalComponent.vue";

@Component({
  components: {
    ProCard,
    ChannelComponent,
    OperationalComponent,
    TimeRateComponent,
    TargetComplete,
  },
})
export default class PageClimbing extends Base {
  get reachTarget() {
    const target = this.optData.reachTarget ?? {};
    return {
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
}
</script>

<style lang="scss">
.count {
  position: relative;
  width: 62px;
  height: 37px;
  @extend %bg-img-count-background;

  .day {
    position: absolute;
    right: 20px;
    top: 5px;
    font-family: DIN Alternate;
    font-style: normal;
    font-weight: bold;
    font-size: 26px;

    color: #ffffff;
  }
  .unit {
    position: absolute;
    right: 5px;
    bottom: 0;
    color: #fff;
  }
}
</style>
