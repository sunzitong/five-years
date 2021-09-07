<template>
  <div class="page__attack_after_throwing__map">
    <div class="text_pannel">
      <!-- 仪表盘组件 -->
      <ProgressCircle
        :styleType="1"
        :rate="50"
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
import { Component, Ref, Vue } from "vue-property-decorator";
import ProgressCircle from "@/components/Progress/ProgressCircle.vue";
import { sepNumber } from "@/utils/tools";
import dayjs from "dayjs";
import {
  fetchExpandDisk,
  ExpandDiskReturn,
} from "@/service/analysis/bigScreen/mainBoard/expandDisk";

@Component({
  components: { ProgressCircle },
})
export default class A6 extends Vue {
  @Ref() wrapper!: HTMLDivElement;
  resData: Partial<ExpandDiskReturn> = {};

  year = dayjs().year();

  sepNumber = sepNumber;

  get currentYear() {
    return this.resData.yearNetIncomeCompletionRate;
  }
  get wholeCycle() {
    return this.resData.allCollectedNetIncome;
  }

  async mounted() {
    const response = await fetchExpandDisk({ year: this.year });
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
