<template>
  <div class="operation">
    <div class="line"></div>
    <van-row>
      <van-col :span="14">
        <h4 class="label">平均出租率(开业三月以上正常经营门店)</h4>
        <div class="row_style">
          <strong class="strong_value">
            {{ formatValue(resData.avgRentRatio) }}%
          </strong>
          <span class="after">环比</span>
          <span class="icon">
            <Icon v-bind="getIconConfig(resData.rentRatioYoy)" size="62" />
          </span>
          <strong
            class="value_font_size"
            :class="{
              desc: resData.rentRatioYoy < 0,
              asce: resData.rentRatioYoy >= 0,
            }"
          >
            {{ formatValue(resData.rentRatioYoy) }}%
          </strong>
          <span class="pointOfTime">
            时点 {{ formatValue(resData.pointRentRatio) }}%
          </span>
        </div>
      </van-col>
      <van-col :span="10">
        <h4 class="label">平均续租率</h4>
        <div class="row_style">
          <strong class="strong_value">
            {{ formatValue(resData.avgRenewRatio) }}%
          </strong>
          <span class="after">环比</span>
          <span class="icon">
            <Icon v-bind="getIconConfig(resData.renewRatioYoy)" size="62" />
          </span>
          <strong
            class="value_font_size"
            :class="{
              desc: resData.renewRatioYoy < 0,
              asce: resData.renewRatioYoy >= 0,
            }"
          >
            {{ formatValue(resData.renewRatioYoy) }}%
          </strong>
        </div>
      </van-col>
    </van-row>
    <van-row>
      <van-col :span="14" style="padding-top: 30px">
        <h4 class="label">在租房间成交均价(元)</h4>
        <div class="row_style">
          <strong class="strong_value">
            {{ formatValue(resData.avgPrice) }}
          </strong>
          <span class="after">同比</span>
          <span class="icon">
            <Icon v-bind="getIconConfig(resData.avgPriceYoy)" size="62" />
          </span>
          <strong
            class="value_font_size"
            :class="{
              desc: resData.avgPriceYoy < 0,
              asce: resData.avgPriceYoy >= 0,
            }"
          >
            {{ formatValue(resData.avgPriceYoy) }}%
          </strong>
        </div>
      </van-col>
      <van-col hidden :span="5" style="padding-top: 30px">
        <h4 class="label">同房间价格涨幅</h4>
        <div class="row_style">
          <strong>--%</strong>
          <span class="icon">
            <Icon type="asce" color="#22cb98" size="62" />
          </span>
        </div>
      </van-col>
      <van-col hidden :span="5" style="padding-top: 30px">
        <div class="simple">
          <span class="label">新签上涨:</span>
          <strong>--%</strong>
        </div>
        <div class="simple">
          <span class="label desc">续租下降:</span>
          <strong class="desc">--%</strong>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import Icon from "@/components/Icon/Index.vue";
import { StoreKey, useStore } from "@/store";
import {
  fetchIncome,
  IncomeReturn,
} from "@/service/analysis/bigScreen/mainBoard/managementSituation/income";
import { iwant } from "@guanyu/shared";

@Component({
  components: {
    Icon,
  },
})
export default class D1B extends Base implements IFetch {
  resData: Partial<IncomeReturn> = {};
  currentRate = 0;

  /**
   * 获取icon配置
   */
  getIconConfig(num: number) {
    return {
      type: num >= 0 ? "asce" : "desc",
      color: num >= 0 ? "#22cb98" : "#ff3980",
    };
  }

  async fetch() {
    const response = await useStore(fetchIncome, {
      key: StoreKey.HomeIncome,
      params: {
        orgType: this.store.global.dataLevel,
        orgId: this.store.global.orgTree.orgId,
        dateScope: this.store.global.dateScope,
        date: this.store.global.dateValue,
      },
    });
    if (response?.status === "ok") {
      this.resData = iwant.object(response.data);
      this.empty = false;
    } else {
      this.resData = {};
      this.empty = true;
    }
    return response;
  }
}
</script>

<style lang="scss" scoped>
$light: rgba(219, 240, 255, 1);
$desc: #ff2a76;
$asce: #22cb98;

.row_style {
  display: flex;
  align-items: center;
}

.operation {
  padding: 0 42px 0 70px;
  .line {
    height: 2px;
    margin: 0 0 30px 0;
    background-image: linear-gradient(
      to right,
      #4d609d 0%,
      #4d609d 50%,
      transparent 50%
    );
    background-size: 20px 2px;
    background-repeat: repeat-x;
  }

  .label {
    font-size: 30px;
    font-weight: normal;
    color: rgba(144, 164, 195, 1);
  }

  .strong_value {
    width: 200px;
  }

  .after {
    color: #90a4c3;
    font-size: 36px;
    line-height: 48px;
    margin: 0 10px 0 100px;
  }

  strong {
    font-style: normal;
    font-size: 66px;
    color: $light;
    @extend %value-font;
  }

  .value_font_size {
    font-size: 48px;
    line-height: 60px;
  }

  .simple {
    display: flex;
    align-items: center;
    padding-left: 27px;
    line-height: 58px;
    border-left: 2px solid #5180e4;
    background: linear-gradient(
      89.96deg,
      rgba(5, 203, 253, 0.1) 0%,
      rgba(0, 127, 249, 0) 100.9%
    );
    strong {
      margin-left: 10px;
      font-size: 40px;
    }
  }

  .pointOfTime {
    display: inline-block;
    padding: 2px 26px;
    background: #182966;
    border-radius: 100px;
    color: #90a4c3;
    font-size: 42px;
    margin-left: 40px;
  }

  .desc {
    color: $desc;
    margin-left: 18px;
  }
  .asce {
    color: $asce;
    margin-left: 18px;
  }
}
</style>
