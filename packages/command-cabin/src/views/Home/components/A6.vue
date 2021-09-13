<template>
  <div class="page__attack_after_throwing__map">
    <div class="text_pannel">
      <!-- 仪表盘组件 -->
      <ProgressCircle
        v-if="yearFlag"
        :styleType="1"
        :rate="yearRate"
        :size="280"
        :strokeWidth="100"
        :strokeSize="185"
        strokeLinecap="round"
        color="#4182C7"
        primary
        style="height: 190px"
      >
        <template v-slot="{ value }">
          <div class="rate-text">
            <div class="value">{{ value }}%</div>
            <div class="desc">
              预算达成率
              <br />
              （全年）
            </div>
          </div>
        </template>
      </ProgressCircle>
      <ProgressCircle
        v-if="!yearFlag"
        :styleType="1"
        :rate="cycleRate"
        :size="280"
        :strokeWidth="100"
        :strokeSize="185"
        strokeLinecap="round"
        color="#4182C7"
        primary
        style="height: 190px"
      >
        <template v-slot="{ value }">
          <div class="rate-text">
            <div class="value">{{ value }}%</div>
            <div class="desc">
              预算达成率
              <br />
              （全周期）
            </div>
          </div>
        </template>
      </ProgressCircle>
      <div class="top_text">净全年利润攻坚贡献值</div>
      <van-row class="text_row">
        <van-col :span="12" class="left_text">当年</van-col>
        <van-col :span="12" class="right_text">
          {{ sepNumber(currentYear) }}万
        </van-col>
      </van-row>
      <van-row class="text_row">
        <van-col :span="12" class="left_text">全周期</van-col>
        <van-col :span="12" class="right_text">
          {{ sepNumber(wholeCycle) }}万
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import ProgressCircle from "@/components/Progress/ProgressCircle.vue";
import dayjs from "dayjs";
import {
  fetchExpansionAwardInfo,
  ExpansionAwardInfoReturn,
} from "@/service/analysis/bigScreen/mainBoard/expandDisk/expansionAwardInfo";
import Base from "@/views/Base";
import { iwant } from "@guanyu/shared";
import _ from "lodash";
import { StoreKey, useStore } from "@/store";

@Component({
  components: { ProgressCircle },
})
export default class A6 extends Base {
  /**
   * 接口返回值
   * /analysis/bigScreen/mainBoard/expandDisk
   */
  resData: Partial<ExpansionAwardInfoReturn> = {};
  /**
   * 显示全年时，此值为true
   */
  yearFlag = true;
  /**
   * 全周期预算达成率
   */
  cycleRate: number | "--" = "--";
  /**
   * 全年预算达成率
   */
  yearRate: number | "--" = "--";
  /**
   * 全年利润攻坚贡献值
   */
  currentYear: number | string = "--";
  /**
   * 全周期利润攻坚贡献值
   */
  wholeCycle: number | string = "--";

  async mounted() {
    const response = await useStore(fetchExpansionAwardInfo, {
      key: StoreKey.HomeExpansionAwardInfo,
    });
    if (response?.status === "ok") {
      this.resData = response.data;

      this.currentYear = _.isNil(this.resData.yearNetIncomeCollected)
        ? "--"
        : iwant.calc(this.resData.yearNetIncomeCollected as number, 1, true);
      this.wholeCycle = _.isNil(this.resData.allNetIncomeCollected)
        ? "--"
        : iwant.calc(this.resData.allNetIncomeCollected as number, 1, true);

      this.cycleRate = _.isNil(this.resData.allNetIncomeCompletionRate)
        ? "--"
        : this.resData.allNetIncomeCompletionRate;
      this.yearRate = _.isNil(this.resData.yearNetIncomeCompletionRate)
        ? "--"
        : this.resData.yearNetIncomeCompletionRate;

      /**
       * 全周期与全年取值循环切换
       */
      setInterval(() => {
        this.yearFlag = !this.yearFlag;
      }, 1000);
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

  margin-bottom: 26px;
}

.text_pannel {
  text-align: center;
}

.text_row {
  margin: 0 30px 0 30px;
  .left_text {
    font-size: 28px;
    line-height: 28px;
    text-align: left;

    margin-bottom: 19px;
  }
  .right_text {
    font-size: 26px;
    line-height: 24px;
    color: #01f5f1;
    text-align: right;

    span {
      font-family: "DIN Alternate";
      font-weight: bold;
      font-size: 40px;
      line-height: 40px;
    }
  }
}

.bottom_text {
  font-size: 26px;
  line-height: 26px;
  color: #01f5f1;

  margin-top: 10px;

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
    line-height: 38px;
    color: #fff;
  }
  .desc {
    color: #65d4fc;
    font-size: 20px;
    line-height: 22px;
    margin-top: 4px;
  }
}
</style>
