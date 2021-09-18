<template>
  <Spin :loading="loading" :empty="empty">
    <div class="box">
      <Icon
        v-if="monthData.warn"
        type="warning"
        class="icon-warn animate__animated animate__infinite animate__flash animate__slower"
        :size="54"
      />
      <div class="content">
        <div class="chart">
          <van-circle
            v-model="currentRate"
            :rate="monthData.totalScore"
            layer-color="#14437F"
            color="#5180E4"
            :size="242"
            :strokeWidth="60"
            :speed="100"
          >
            <div class="rate-text">
              <div class="desc">总分</div>
              <div class="value">{{ currentRate }}</div>
            </div>
          </van-circle>
        </div>
        <div class="right">
          <div class="tag-year">{{ monthData.dataDateDesc }}</div>
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
                <StepNumber
                  :duration="100"
                  :to="monthData.channelEffectScore"
                />
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
    </div>
  </Spin>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Icon from "@/components/Icon/Index.vue";
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
  components: { Icon, StepNumber },
})
export default class D2 extends Base {
  /**
   * 返回数据
   */
  response: null | BusinessScoreReturn = null;
  /**
   * v-model进度
   */
  currentRate = 0;
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
   * 自动触发 重复调用
   * @returns response
   */
  async fetch() {
    const response = await useStore(fetchBusinessScore, {
      key: StoreKey.ProjectBusinessScore,
      params: { phId: this.store.global.project.phId },
    });
    if (response?.status === "ok") {
      this.response = response.data ?? {};
      this.loading = false;
    }
    return response;
  }

  /**
   * 显示月数据
   */
  showMonthData() {
    // 10秒钟刷新一次数据
    const time = 10 * 1000;
    const next = () => {
      this.showCurrentMonth = !this.showCurrentMonth;
      this.currentRate = 0;
      this.timer = setTimeout(next, time);
    };
    this.timer = setTimeout(next, time);
  }

  mounted() {
    this.showMonthData();
  }

  beforeDestroy() {
    clearTimeout(this.timer);
  }
}
</script>

<style lang="scss" scoped>
$light: #dbf0ff;
.box {
  height: 330px;
  font-size: 36px;
  color: #90a4c3;
}
.content {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .chart {
    position: relative;
    @extend %flex-center;
    width: 350px;
    height: 100%;
    margin: 0 60px 0 50px;
    .rate-text {
      @extend %flex-center;
      flex-flow: column nowrap;
      height: 100%;
      line-height: 1;
      .value {
        @extend %value__letter;
        font-weight: bold;
        font-size: 48px;
        color: #dbf0ff;
        margin-top: 8px;
      }
      .desc {
        font-size: 24px;
        line-height: 24px;
        color: #8090aa;
      }
    }
    @extend %bg-img-circle-1;
    background-position-y: -34px;
  }
  .right {
    height: 100%;
  }
  .list {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    line-height: 1;
    height: 178px;
    .item {
      display: flex;
      align-items: center;
      .name {
        width: 232px;
        font-size: 36px;
      }
      .value {
        @extend %value__letter;
        font-weight: bold;
        font-size: 48px;
        color: $light;
      }
    }
  }
}
.tag-year {
  @extend %flex-center;
  width: 144px;
  height: 50px;
  background: #182966;
  border-radius: 4px;
  font-size: 36px;
  color: #90a4c3;
  margin: 37px 0 28px 0;
}
.icon-warn {
  position: absolute;
  top: 20px;
  right: 30px;
}
.fade-enter-active {
  animation: fadeIn 1s;
}
.fade-leave-active {
  animation: fadeOut 1s;
}
</style>
