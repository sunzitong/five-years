<template>
  <div class="operation">
    <div class="line"></div>
    <van-row>
      <van-col span="12">
        <h4 class="label">平均出租率(开业三月以上)</h4>
        <div class="">
          <strong>{{ resData.avgRentRatio }}%</strong>
          <span class="after">环比</span>
          <strong
            :class="{
              desc: resData.rentRatioYoy < 0,
              asce: resData.rentRatioYoy >= 0,
            }"
          >
            {{ resData.rentRatioYoy }}%
          </strong>
          <span class="icon">
            <Icon v-bind="getIconConfig(resData.rentRatioYoy)" size="62" />
          </span>
          <span class="pointOfTime">时点 {{ resData.pointRentRatio }}%</span>
        </div>
      </van-col>
      <van-col span="12">
        <h4 class="label">平均续租率</h4>
        <div class="">
          <strong>{{ resData.avgRenewRatio }}%</strong>
          <span class="after">环比</span>
          <strong
            :class="{
              desc: resData.renewRatioYoy < 0,
              asce: resData.renewRatioYoy >= 0,
            }"
          >
            {{ resData.renewRatioYoy }}%
          </strong>
          <span class="icon">
            <Icon v-bind="getIconConfig(resData.renewRatioYoy)" size="62" />
          </span>
        </div>
      </van-col>
    </van-row>
    <van-row>
      <van-col span="12" style="padding-top: 30px">
        <h4 class="label">在租房间平均成交价(元)</h4>
        <div class="">
          <strong>{{ resData.avgPrice }}</strong>
          <span class="after">同比</span>
          <strong
            :class="{
              desc: resData.avgPriceYoy < 0,
              asce: resData.avgPriceYoy >= 0,
            }"
          >
            {{ resData.avgPriceYoy }}%
          </strong>
          <span class="icon">
            <Icon v-bind="getIconConfig(resData.avgPriceYoy)" size="62" />
          </span>
        </div>
      </van-col>
      <van-col hidden span="6" style="padding-top: 30px">
        <h4 class="label">同房间价格涨幅</h4>
        <div class="">
          <strong>--%</strong>
          <span class="icon">
            <Icon type="asce" color="#22cb98" size="62" />
          </span>
        </div>
      </van-col>
      <van-col hidden span="6" style="padding-top: 30px">
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
import {
  fetchIncome,
  IncomeReturn,
} from "@/service/analysis/bigScreen/projectBoard/managementSituation/income";
import { StoreKey, useStore } from "@/store";

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
      color: num >= 0 ? "#ff3980" : "#22cb98",
    };
  }

  async fetch() {
    const response = await useStore(fetchIncome, {
      key: StoreKey.ProjectIncome,
      params: {
        projectId: this.store.global.project.projectId,
        dateScope: this.store.global.dateScope,
      },
    });
    if (response?.status === "ok") {
      this.resData = response.data;
    } else {
      this.empty = true;
    }
    return response;
  }
}
</script>

<style lang="scss" scoped>
$light: rgba(219, 240, 255, 1);
$desc: #22cb98;
$asce: #ff2a76;

.operation {
  padding: 0 43px;
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

  .after {
    color: #90a4c3;
    font-size: 36px;
    line-height: 48px;
    margin: 0 44px 0 6px;
  }

  strong {
    font-style: normal;
    font-size: 66px;
    color: $light;
    @extend %value-font;
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

  .icon {
    margin: 0 10px;
  }

  .pointOfTime {
    display: inline-block;
    padding: 8px 26px;
    background: #182966;
    border-radius: 45px;
    color: #90a4c3;
    font-size: 30px;
    line-height: 30px;
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
