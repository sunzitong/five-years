<template>
  <div class="page__d3__map">
    <div class="left_circle">
      <div class="left_pic">
        <van-circle
          v-model="currentRate1"
          class="circle_setting"
          :rate="0"
          layer-color="#14437F"
          color="#5180E4"
          :size="160"
          :strokeWidth="50"
          :speed="100"
        >
          <div class="rate-text">
            <div class="value">{{ formatValue(resData.complaintRatio) }}%</div>
          </div>
        </van-circle>
        <div class="bottom_text special_position">投诉率</div>
      </div>
      <div class="right_text">
        <div v-for="n in 3" :key="n">
          <span>TOP{{ n }}：</span>
          <span>
            {{
              formatValue(
                $data._.get(resData, `complaintDetails[${n - 1}].itemName`)
              )
            }}
          </span>
        </div>
      </div>
    </div>
    <div class="right_flex_box">
      <div class="cirle_wrap">
        <van-circle
          v-model="currentRate2"
          class="circle_setting"
          :rate="0"
          layer-color="#14437F"
          color="#5180E4"
          :size="160"
          :strokeWidth="50"
          :speed="100"
        >
          <div class="rate-text">
            <div class="value">
              {{ formatValue(resData.receiveOrderTimelinessRatio) }}%
            </div>
          </div>
        </van-circle>
        <div class="bottom_text">及时接单率</div>
      </div>
      <!-- TODO 隐藏 -->
      <!-- <div class="cirle_wrap">
        <van-circle
          v-model="currentRate3"
          class="circle_setting"
          :rate="0"
          layer-color="#14437F"
          color="#5180E4"
          :size="160"
          :strokeWidth="50"
          :speed="100"
        >
          <div class="rate-text">
            <div class="value">{{ "--" }}%</div>
          </div>
        </van-circle>
        <div class="bottom_text">NPS</div>
      </div>
      <div class="cirle_wrap">
        <van-circle
          v-model="currentRate4"
          class="circle_setting"
          :rate="0"
          layer-color="#14437F"
          color="#5180E4"
          :size="160"
          :strokeWidth="50"
          :speed="100"
        >
          <div class="rate-text">
            <div class="value">{{ "--" }}%</div>
          </div>
        </van-circle>
        <div class="bottom_text">综合满意度</div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base } from "@/views/Base";
import { StoreKey, useStore } from "@/store";
import {
  CustomerInsightReturn,
  fetchCustomerInsight,
} from "@/service/analysis/bigScreen/mainBoard/managementSituation/customerInsight";
import { iwant } from "@guanyu/shared";
import _ from "lodash";

@Component({
  components: {},
})
export default class D3 extends Base {
  _ = _;
  currentRate1 = 0;
  currentRate2 = 0;
  currentRate3 = 0;
  currentRate4 = 0;

  resData: Partial<CustomerInsightReturn> = {};
  async fetch() {
    const response = await useStore(fetchCustomerInsight, {
      key: StoreKey.HomeCustomerInsight,
      params: {
        orgType: this.store.global.dataLevel,
        orgId: this.store.global.orgTree.orgId,
        dateScope: this.store.global.dateScope,
        date: this.store.global.dateValue,
      },
    });
    if (response?.status === "ok") {
      this.resData = iwant.object(response.data);
    } else {
      this.resData = {};
    }
    return response;
  }
}
</script>

<style lang="scss" scoped>
.page__d3__map {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  padding: 36px 50px 66px 50px;

  .left_circle {
    width: 638px;
    margin: 0 80px 0 50px;

    display: flex;
    flex-flow: row nowrap;

    .left_pic {
      padding-right: 80px;
      width: 200px;
      height: 240px;
      @extend %bg-img-circle-1;
      background-position: 0 -11px;
      background-size: 240px 240px;
    }
  }
  .circle_setting {
    position: relative;
    top: 42px;
    left: 40px;
  }
  .value {
    @extend %value-font;
    font-weight: bold;
    font-size: 48px;
    line-height: 48px;
    color: #dbf0ff;
    margin-top: 53px;
  }

  .bottom_text {
    font-size: 36px;
    line-height: 40px;
    color: #90a4c3;
    margin: 73px 0 0 0;
    text-align: center;
  }
  .special_position {
    position: relative;
    width: 240px;
  }

  .right_text {
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    margin: 40px 0 20px 0;
    white-space: nowrap;
    span {
      font-size: 40px;
      line-height: 44px;
    }
    span:nth-child(1) {
      @extend %value-font;
      color: #90a4c3;
    }
    span:nth-child(2) {
      color: #dbf0ff;
    }
  }

  .right_flex_box {
    /* flex: 1; */
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    .cirle_wrap {
      width: 240px;
      height: 240px;
      @extend %bg-img-circle-1;
      background-position: 0 -11px;
      background-size: 240px 240px;
      margin: 0 50px;
    }
  }

  .cirle_wrap {
    @extend %bg-img-circle-1;
  }
}
</style>
