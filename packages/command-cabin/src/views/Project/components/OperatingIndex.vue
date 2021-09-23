<template>
  <Spin :loading="loading" :empty="empty">
    <div class="operatingIndex" v-if="hasData">
      <van-row gutter="10" type="flex" align="center">
        <van-col>
          <Icon
            v-if="monthData.warn"
            type="warning"
            class="animate__animated animate__infinite animate__flash animate__slower"
            :size="54"
          />
        </van-col>
        <van-col>
          <div class="tag-year">
            综合经营指数（{{ monthData.dataDateDesc }}）
          </div>
        </van-col>
      </van-row>
      <van-row gutter="10" type="flex" align="center">
        <van-col>
          <Icon type="warning" color="transparent|transparent" :size="54" />
        </van-col>
        <van-col>
          <span class="score">
            <StepNumber
              :duration="100"
              :precision="1"
              :to="monthData.totalScore"
            />
          </span>
          <span class="tag-year">总分</span>
        </van-col>
      </van-row>
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
import { Base, IFetch } from "@/views/Base";
import StepNumber from "@/components/StepNumber/Index.vue";
import { StoreKey, useStore } from "@/store";
import _ from "lodash";

type MonthData = Partial<BusinessScoreReturn["lastMonthScore"]>;

@Component({
  components: { Icon, StepNumber },
})
export default class OperatingIndex extends Base implements IFetch {
  /**
   * 返回数据
   */
  response: null | BusinessScoreReturn = null;
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
    let dataDateDesc = "";
    if (this.showCurrentMonth) {
      dataDateDesc = `${month}月试算`;
    } else {
      dataDateDesc = `${month}月实际`;
    }
    // 综合经营指数报警
    const warn = response.totalScore && response.totalScore < 90;
    return {
      ...response,
      dataDateDesc,
      warn,
    };
  }

  /**
   * 判断是否有数据
   * true:有
   * false:无
   * current:只有试算
   * last:只有实际
   */
  hasData: boolean | "current" | "last" = false;

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
    const noCurrent = _.isNil(
      _.get(response, "data.currentMonthScore.totalScore")
    );
    const noLast = _.isNil(_.get(response, "data.lastMonthScore.totalScore"));
    if (noCurrent && noLast) {
      this.hasData = false;
    } else if (noCurrent) {
      this.hasData = "last";
    } else if (noLast) {
      this.hasData = "current";
    } else {
      this.hasData = true;
    }
    // 开始切换数据
    clearTimeout(this.timer);
    this.showMonthData();
    return response;
  }

  /**
   * 显示月数据
   */
  showMonthData() {
    // 10秒钟刷新一次数据
    const time = 10 * 1000;
    if (this.hasData === true) {
      this.showCurrentMonth = !this.showCurrentMonth;
    }
    if (this.hasData === "current") {
      this.showCurrentMonth = true;
    }
    if (this.hasData === "last") {
      this.showCurrentMonth = false;
    }
    this.timer = setTimeout(this.showMonthData, time);
  }

  beforeDestroy() {
    clearTimeout(this.timer);
  }
}
</script>

<style lang="scss" scoped>
.operatingIndex {
  width: 500px;
  .tag-year {
    font-size: 36px;
    color: #90a4c3;
  }
  .score {
    font-size: 66px;
    color: #dbf0ff;
  }
}

.fade-enter-active {
  animation: fadeIn 1s;
}
.fade-leave-active {
  animation: fadeOut 1s;
}
</style>
