<template>
  <div class="page__central_award_supplement__map">
    <div class="text_pannel">
      <!-- 仪表盘组件 -->
      <ProgressCircle
        :styleType="1"
        :rate="50"
        :size="280"
        :strokeWidth="100"
        :strokeSize="185"
        strokeLinecap="round"
        color="#F7D14A"
        primary
        style="height: 190px; margin-bottom: 16px"
      >
        <template v-slot="{ value }">
          <div class="rate-text">
            <div class="value">{{ value }}%</div>
            <div class="desc">预算达成率</div>
          </div>
        </template>
      </ProgressCircle>
      <div class="top_text">全年已到账</div>
      <div class="bottom_text">
        <span>{{ sepNumber(resData.yearSubsidiesCollected) }}</span>
        万
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import ProgressCircle from "@/components/Progress/ProgressCircle.vue";
import {
  fetchExpansionAwardInfo,
  ExpansionAwardInfoReturn,
} from "@/service/analysis/bigScreen/mainBoard/expandDisk/expansionAwardInfo";
import Base from "@/views/Base";
import { StoreKey, useStore } from "@/store";

@Component({
  components: { ProgressCircle },
})
export default class A5 extends Base {
  /**
   * 接口返回值
   * /analysis/bigScreen/mainBoard/expandDisk
   */
  resData: Partial<ExpansionAwardInfoReturn> = {};

  async mounted() {
    const response = await useStore(fetchExpansionAwardInfo, {
      key: StoreKey.HomeExpansionAwardInfo,
    });
    if (response?.status === "ok") {
      this.resData = response.data;
    }
  }
}
</script>

<style lang="scss" scoped>
.top_text {
  font-family: "PingFang SC";
  font-size: 30px;
  line-height: 26px;
  color: #ffffff;

  margin-bottom: 10px;
}

.text_pannel {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  text-align: center;
}

.bottom_text {
  font-size: 26px;
  line-height: 26px;
  color: #01f5f1;

  span {
    font-family: "DIN Alternate";
    font-size: 40px;
    line-height: 36px;
  }
}

/* 仪表盘 */
.rate-text {
  .value {
    @extend %value__letter;
    font-weight: bold;
    font-size: 38px;
    line-height: 40px;
    color: #fff;
  }
  .desc {
    color: #f2b040;
    font-size: 20px;
  }
}
</style>
