<template>
  <div class="page-revenue-forecast">
    <!-- noticy -->
    <van-notice-bar
      v-if="resData.tip"
      mode="closeable"
      color="#1C7AF7"
      background="#EEF3FD"
      :scrollable="false"
      wrapable
      :text="resData.tip"
    />
    <!-- tabs -->
    <van-tabs animated title-active-color="white" class="tabs">
      <van-tab title="本月收入预测">
        <template #title>
          <div class="tab-title">
            <span class="calender-icon"></span>
            本月收入预测
          </div>
        </template>
        <RevenueForecastPanel :tableData="thisMonthPanel" />
      </van-tab>
      <van-tab title="下月收入预测">
        <RevenueForecastPanel :tableData="nextMonthPanel" />
      </van-tab>
    </van-tabs>
    <!-- calculate -->
    <div class="calculation">
      <div class="details">
        <div class="details-title">门店经营指标</div>
        <div class="details-content">
          <div>
            时点出租率：{{ resData.rentRatio ? resData.rentRatio : "--" }}%
          </div>
          <div>
            平均租金(元)：{{ resData.rentPrice ? resData.rentPrice : "--" }}
          </div>
          <div>
            时点空置间数：{{ resData.stockNum ? resData.stockNum : "--" }}
          </div>
          <div>
            本月剩余到期间数：{{
              resData.leftExpireNum ? resData.leftExpireNum : "--"
            }}
          </div>
        </div>
      </div>
      <div class="detail-inputs">
        <div class="input-part">
          <InputItem
            title="平均续租率"
            v-model="calculateMsg.AveRentRatio"
            unit="%"
            :content="resData.renewRatioNote"
          />
          <InputItem
            title="平均违退率"
            v-model="calculateMsg.AveNonRefundRate"
            unit="%"
            :content="resData.defCheckoutRatioNote"
          />
          <InputItem
            title="日均新签流速"
            v-model="calculateMsg.DailyAveSignFlow"
            :content="resData.newSignDailyNote"
          />
          <InputItem
            title="可售房价平均销售价"
            v-model="calculateMsg.AveSellingPrice"
            unit="元"
            :content="resData.salePriceNote"
          />
        </div>
      </div>
      <div v-zhuge="'收入预测计算器-计算'">
        <van-button block type="primary" color="#1C7AF7" @click="msgCalculate">
          开始计算
        </van-button>
      </div>
      <van-popup
        v-model="showErrMsg"
        :closeable="true"
        :round="true"
        class="tooltip__popup"
        :overlay-style="{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }"
      >
        <div class="content">{{ errMsg }}</div>
      </van-popup>
    </div>
    <!-- charts -->
    <ChartPart v-if="resData.trend" :chartData="resData.trend" />
  </div>
</template>

<script lang="ts">
import Base from "@/views/Base";
import { Component } from "vue-property-decorator";
import { CalcSolution, queryCalcSolution } from "@/service";
import { iwant } from "@guanyu/shared";
import RevenueForecastPanel from "@/views/RevenueForecast/components/RevenueForecastPanel.vue";
import ChartPart from "@/views/RevenueForecast/components/ChartPart.vue";
import InputItem from "@/views/RevenueForecast/components/InputItem.vue";

@Component({
  components: {
    RevenueForecastPanel,
    ChartPart,
    InputItem,
  },
})
export default class RevenueForecast extends Base {
  // 接口数据
  resData: Partial<CalcSolution> = {};

  /**
   * 请求参数
   */
  payload = {
    projectId: "",
    renewRatio: "",
    defCheckoutRatio: "",
    newSignDaily: "",
    salePrice: "",
  };

  // 计算器属性输入值
  calculateMsg: Partial<
    Record<
      | "AveRentRatio"
      | "AveNonRefundRate"
      | "DailyAveSignFlow"
      | "AveSellingPrice",
      string
    >
  > = {};

  showErrMsg = false;
  errMsg = "";

  // 当月预测结果
  get thisMonthPanel() {
    return this.resData.thisMonth;
  }

  // 下月预测结果
  get nextMonthPanel() {
    return this.resData.nextMonth;
  }

  /**
   * 渲染完成
   */
  mounted() {
    this.queryDataSorce();
  }

  async queryDataSorce() {
    const projectId = iwant.string(this.$route.query.projectId);
    if (!projectId) {
      return;
    }
    this.payload.projectId = projectId;
    const response = await queryCalcSolution(this.payload);
    if (response?.status === "ok") {
      this.resData = response.data ?? {};
      // console.log("resData-->", this.resData);

      this.calculateMsg = {
        AveRentRatio: this.resData.renewRatio, //平均续租率（%）
        AveNonRefundRate: this.resData.defCheckoutRatio, //平均违退率（%）
        DailyAveSignFlow: this.resData.newSignDaily, //日均新签流速
        AveSellingPrice: this.resData.salePrice, //可售房间平均销售价（元）
      };
    }
  }

  isValid(val: any, max: number, min: number) {
    if (val === "" || Number(val) < min || Number(val) > max) return false;
    return true;
  }

  // 计算
  msgCalculate() {
    // 校验
    let str = [];
    if (this.calculateMsg !== undefined) {
      if (!this.isValid(this.calculateMsg.AveRentRatio, 100, 0)) {
        str.push("平均续租率");
      }

      if (!this.isValid(this.calculateMsg.AveNonRefundRate, 100, 0)) {
        str.push("平均违退率");
      }

      if (!this.isValid(this.calculateMsg.DailyAveSignFlow, 10000, 0)) {
        str.push("日均新签流速");
      }

      if (!this.isValid(this.calculateMsg.AveSellingPrice, 50000, 0)) {
        str.push("可售房间平均销售价");
      }

      this.errMsg = "请填写正确的" + str.join("、") + "。";
    }

    if (str.length !== 0) {
      // console.log("track01------", this.errMsg);
      this.showErrMsg = true;
    } else {
      // 请求参数设置
      // console.log("track02------");
      this.payload.renewRatio = iwant.string(this.calculateMsg.AveRentRatio);
      this.payload.defCheckoutRatio = iwant.string(
        this.calculateMsg.AveNonRefundRate
      );
      this.payload.newSignDaily = iwant.string(
        this.calculateMsg.DailyAveSignFlow
      );
      this.payload.salePrice = iwant.string(this.calculateMsg.AveSellingPrice);

      // 请求接口
      this.queryDataSorce();
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  margin: 0 12px;
  border-radius: 30px 30px 0 0;

  .tab-title {
    @extend %flex-center;

    .calender-icon {
      @extend %bg-img-revenue-calender-icon;
      margin-right: 8px;
      width: 16px;
      height: 16px;
    }
  }
}

.calculation {
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  overflow: hidden;
  margin: -50px 18px 12px 18px;
  padding: 12px 0 0 0;
  height: 348px;
  z-index: 3;

  background: #ffffff;
  border: 0.5px solid #f4f3f7;
  box-sizing: border-box;
  box-shadow: 0px 0px 14px rgba(226, 232, 240, 0.34);
  border-radius: 8px;
  font-size: 14px;

  .details {
    color: #a5aaaf;
    font-size: 14px;
    padding: 0 12px;

    .details-title {
      font-size: 14px;
      margin-bottom: 6px;
    }

    .details-content {
      display: flex;
      align-content: flex-start;
      flex-flow: row wrap;

      div {
        flex: 50%;
        margin-bottom: 6px;
      }
    }
  }
}

.detail-inputs {
  color: #232832;
  padding: 0 12px;
}

.tooltip__popup {
  width: 255px;
  min-height: 50px;
  padding: 15px;
}

.content {
  margin-right: 18px;
}

::v-deep {
  .van-tab {
    color: #fff;
    opacity: 0.31;

    &.van-tab--active {
      opacity: 1;
      z-index: 3;
    }
  }

  .van-tabs__wrap {
    .van-tabs__nav {
      @extend %bg-img-tab-header-back;
      background-position: 0 4px;
    }
  }

  .van-tabs__line {
    height: 44px;
    width: 61%;
    color: transparent;
    @extend %bg-img-tab-header;
    background-size: 100% 100%;
    background-color: transparent;
  }

  .van-button--normal {
    font-size: 16px;
  }

  .van-notice-bar {
    font-family: "PingFang SC";
    font-size: 13px;
    margin-bottom: 12px;
    padding: 6px 18px;
    line-height: 18px;
  }
}
</style>
