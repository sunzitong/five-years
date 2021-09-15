<template>
  <div class="box" v-if="monthData">
    <div class="tag-year">{{ monthData.dataDateDesc }}</div>
    <Icon
      v-if="monthData.warn"
      type="trangle"
      class="icon-warn animate__animated animate__infinite animate__flash animate__slower"
      :size="70"
    />
    <div class="content">
      <div class="chart">
        <ProgressCircle
          :styleType="2"
          :rate="monthData.totalScore"
          :size="400"
          :strokeWidth="210"
          :strokeSize="280"
        >
          <template v-slot="{ value }">
            <div class="rate-text">
              <div class="value">{{ value }}</div>
              <div class="desc">总分</div>
            </div>
          </template>
        </ProgressCircle>
      </div>
      <ul class="list">
        <li class="item">
          <div class="name">信用指数</div>
          <div class="value">
            <StepNumber :duration="100" :to="monthData.creditScore" />
          </div>
        </li>
        <li class="item">
          <div class="name">渠道效能值</div>
          <div class="value">
            <StepNumber :duration="100" :to="monthData.channelEffectScore" />
          </div>
        </li>
        <li class="item">
          <div class="name">运营健康度</div>
          <div class="value">
            <StepNumber :duration="100" :to="monthData.healthyScore" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Icon from "@/components/Icon/Index.vue";
import ProgressCircle from "@/components/Progress/ProgressCircle.vue";
import dayjs from "dayjs";
import {
  BusinessScoreReturn,
  fetchBusinessScore,
} from "@/service/analysis/bigScreen/projectBoard/finance/businessScore";
import Base from "@/views/Base";
import StepNumber from "@/components/StepNumber/Index.vue";
import { StoreKey, useStore } from "@/store";

type MonthData = Partial<BusinessScoreReturn["lastMonthScore"]>;

@Component({
  components: { Icon, ProgressCircle, StepNumber },
})
export default class C5 extends Base {
  /**
   * 返回数据
   */
  response: null | BusinessScoreReturn = null;

  /**
   * 定时器
   */
  timer: number | null = null;

  /**
   * 显示当月数据
   */
  showCurrentMonth = true;

  /**
   * 当前展示数据
   */
  get monthData() {
    const key = this.showCurrentMonth ? "currentMonthScore" : "lastMonthScore";
    const response: MonthData = this.response?.[key] ?? {};
    // 转换日期为月
    const month = dayjs(response.dataDate).format("M");
    // 如果当前月去掉试算
    const dataDateDesc = `${month}${this.showCurrentMonth ? "月" : "月试算"}`;
    // 综合经营指数报警
    const warn = response.totalScore && response.totalScore < 90;
    return {
      ...response,
      dataDateDesc,
      warn,
    };
  }

  /**
   * 组件创建
   */
  async created() {
    const response = await useStore(fetchBusinessScore, {
      key: StoreKey.ProjectBusinessScore,
      params: { phId: this.store.global.project.phId },
    });
    if (response?.status === "ok") {
      this.response = response.data ?? {};
    }
  }

  /**
   * 显示月数据
   */
  showMonthData() {
    // 10秒钟刷新一次数据
    const time = 10 * 1000;
    const next = () => {
      this.showCurrentMonth = !this.showCurrentMonth;
      this.timer = setTimeout(next, time);
    };
    this.timer = setTimeout(next, time);
  }

  mounted() {
    this.showMonthData();
  }

  beforeDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
</script>

<style lang="scss" scoped>
$light: #01f5f1;
.box {
  width: 1050px;
  height: 550px;
  font-family: PingFang SC;
  font-size: 30px;
  color: #fff;
  position: relative;
  overflow: hidden;
  margin-top: -60px;
}
.tag-year {
  @extend %flex-center;
  position: absolute;
  top: 34px;
  left: 24px;
  font-size: 24px;
  width: 135px;
  height: 42px;
  background: #24386d;
  border-radius: 6px;
}
.icon-warn {
  position: absolute;
  top: 28px;
  right: 50px;
}
.content {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  .chart {
    position: relative;
    @extend %flex-center;
    width: 424px;
    height: 424px;
    margin: 0 90px 0 160px;
    .rate-text {
      @extend %flex-center;
      flex-flow: column nowrap;
      height: 100%;
      line-height: 1;
      .value {
        @extend %value__letter;
        font-weight: bold;
        font-size: 60px;
      }
      .desc {
        font-size: 30px;
      }
    }
  }
  .list {
    line-height: 1;
    .item {
      margin: 40px 0;
      .name {
        font-size: 30px;
      }
      .value {
        @extend %value__letter;
        font-weight: bold;
        font-size: 60px;
        color: $light;
      }
    }
  }
}
.fade-enter-active {
  animation: fadeIn 1s;
}
.fade-leave-active {
  animation: fadeOut 1s;
}
</style>
