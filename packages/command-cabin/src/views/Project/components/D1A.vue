<template>
  <Spin :height="478" :loading="loading" :empty="empty">
    <div class="page__d1a__map">
      <div class="circle1_group">
        <van-circle
          v-model="currentRate"
          class="circle_setting1"
          :rate="this.resData.totalFinishLimit"
          :layer-color="resData.totalFinishLimit >= 0 ? '#14437F' : '#75384E'"
          :color="resData.totalFinishLimit >= 0 ? '#5180E4' : '#FF3980'"
          :size="180"
          :strokeWidth="50"
          :speed="100"
        >
          <div class="rate-text">
            <div
              class="value"
              :class="{
                desc: resData.totalFinishLimit < 0,
                asce: resData.totalFinishLimit >= 0,
              }"
            >
              {{ resData.totalFinishLimit }}%
            </div>
          </div>
        </van-circle>
        <div class="flex_text_box">
          <div>全业态收入</div>
          <div class="flex_value">
            <span
              :class="{
                desc: resData.totalFinishLimit < 0,
                asce: resData.totalFinishLimit >= 0,
              }"
            >
              {{ sepNumber(resData.totalIncome) }}
            </span>
            <span>万</span>
          </div>
        </div>
      </div>
      <div class="circle2_group">
        <van-circle
          v-model="currentRate"
          class="circle_setting2"
          :rate="resData.guanyuFinishLimit"
          :layer-color="resData.guanyuFinishLimit >= 0 ? '#14437F' : '#75384E'"
          :color="resData.guanyuFinishLimit >= 0 ? '#5180E4' : '#FF3980'"
          :size="145"
          :strokeWidth="45"
          :speed="100"
        >
          <div class="rate-text">
            <div
              class="value"
              :class="{
                desc: resData.guanyuFinishLimit < 0,
                asce: resData.guanyuFinishLimit >= 0,
              }"
            >
              {{ resData.guanyuFinishLimit }}%
            </div>
          </div>
        </van-circle>
        <div class="flex_text_box">
          <div>长租</div>
          <div class="flex_value">
            <span
              :class="{
                desc: resData.guanyuFinishLimit < 0,
                asce: resData.guanyuFinishLimit >= 0,
              }"
            >
              {{ sepNumber(resData.guanyuIncome) }}
            </span>
            <span>万</span>
          </div>
        </div>
      </div>
      <div class="circle2_group">
        <van-circle
          v-model="currentRate"
          class="circle_setting2"
          :rate="resData.coWorkingFinishLimit"
          :layer-color="
            resData.coWorkingFinishLimit >= 0 ? '#14437F' : '#75384E'
          "
          :color="resData.coWorkingFinishLimit >= 0 ? '#5180E4' : '#FF3980'"
          :size="145"
          :strokeWidth="45"
          :speed="100"
        >
          <div class="rate-text">
            <div
              class="value"
              :class="{
                desc: resData.coWorkingFinishLimit < 0,
                asce: resData.coWorkingFinishLimit >= 0,
              }"
            >
              {{ resData.coWorkingFinishLimit }}%
            </div>
          </div>
        </van-circle>
        <div class="flex_text_box">
          <div>一展</div>
          <div class="flex_value">
            <span
              :class="{
                desc: resData.coWorkingFinishLimit < 0,
                asce: resData.coWorkingFinishLimit >= 0,
              }"
            >
              {{ sepNumber(resData.coWorkingIncome) }}
            </span>
            <span>万</span>
          </div>
        </div>
      </div>
      <div class="circle2_group">
        <van-circle
          v-model="currentRate"
          class="circle_setting2"
          :rate="resData.commerceFinishLimit"
          :layer-color="
            resData.commerceFinishLimit >= 0 ? '#14437F' : '#75384E'
          "
          :color="resData.commerceFinishLimit >= 0 ? '#5180E4' : '#FF3980'"
          :size="145"
          :strokeWidth="45"
          :speed="100"
        >
          <div class="rate-text">
            <div
              class="value"
              :class="{
                desc: resData.commerceFinishLimit < 0,
                asce: resData.commerceFinishLimit >= 0,
              }"
            >
              {{ resData.commerceFinishLimit }}%
            </div>
          </div>
        </van-circle>
        <div class="flex_text_box">
          <div>底商</div>
          <div class="flex_value">
            <span
              :class="{
                desc: resData.commerceFinishLimit < 0,
                asce: resData.commerceFinishLimit >= 0,
              }"
            >
              {{ sepNumber(resData.commerceIncome) }}
            </span>
            <span>万</span>
          </div>
        </div>
      </div>
      <div class="circle2_group">
        <van-circle
          v-model="currentRate"
          class="circle_setting2"
          :rate="resData.incrementAndParkFinishLimit"
          :layer-color="
            resData.incrementAndParkFinishLimit >= 0 ? '#14437F' : '#75384E'
          "
          :color="
            resData.incrementAndParkFinishLimit >= 0 ? '#5180E4' : '#FF3980'
          "
          :size="145"
          :strokeWidth="45"
          :speed="100"
        >
          <div class="rate-text">
            <div
              class="value"
              :class="{
                desc: resData.incrementAndParkFinishLimit < 0,
                asce: resData.incrementAndParkFinishLimit >= 0,
              }"
            >
              {{ resData.incrementAndParkFinishLimit }}%
            </div>
          </div>
        </van-circle>
        <div class="flex_text_box">
          <div>增值+车位</div>
          <div class="flex_value">
            <span
              :class="{
                desc: resData.incrementAndParkFinishLimit < 0,
                asce: resData.incrementAndParkFinishLimit >= 0,
              }"
            >
              {{ sepNumber(resData.incrementAndParkIncome) }}
            </span>
            <span>万</span>
          </div>
        </div>
      </div>
      <div class="circle3_group">
        <div class="flex_text_box">
          <div>违约金及</div>
          <div>其他收入</div>
          <div class="flex_value">
            <span>{{ sepNumber(resData.contractSporadicIncome) }}</span>
            <span>万</span>
          </div>
        </div>
      </div>
    </div>
  </Spin>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import { StoreKey, useStore } from "@/store";
import {
  fetchIncome,
  IncomeReturn,
} from "@/service/analysis/bigScreen/projectBoard/managementSituation/income";
import { iwant } from "@guanyu/shared";
@Component
export default class D1A extends Base implements IFetch {
  resData: Partial<IncomeReturn> = {};
  currentRate = 0;

  async fetch() {
    const response = await useStore(fetchIncome, {
      key: StoreKey.ProjectIncome,
      params: {
        projectId: this.store.global.project.projectId,
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
$desc: #22cb98;
$asce: #ff2a76;

.page__d1a__map {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  height: 478px;
  margin: 0 63px 0 50px;
}
.rate-text {
  height: 100%;
  @extend %flex-center;
}
.circle1_group {
  width: 280px;
  height: 340px;
  @extend %bg-img-circle-4;
  background-position: -6px 29px;
  background-size: 290px 290px;

  .circle_setting1 {
    position: relative;
    top: 97px;
    left: 48px;
    height: 300px;
  }
  .value {
    @extend %value-font;
    @extend %value-font;
    font-weight: bold;
    font-size: 41px;
    color: #dbf0ff;
  }

  .flex_value span:nth-child(1) {
    @extend %value-font;
    font-weight: bold;
    font-size: 41px;
    line-height: 60px;
    color: #dbf0ff;
    margin-right: 6px;
  }
}
.circle2_group {
  margin: 89px 0 30px 0;
  width: 210px;
  height: 210px;
  @extend %bg-img-circle-1;
  background-size: 210px 210px;

  .circle_setting2 {
    position: relative;
    top: 44px;
    left: 32px;
    height: 200px;
  }

  .value {
    @extend %value-font;
    @extend %value-font;
    font-weight: bold;
    font-size: 33px;
    color: #dbf0ff;
  }
  .flex_text_box {
    margin: 90px 0 0 0;
  }
  .flex_value span:nth-child(1) {
    @extend %value-font;
    font-weight: bold;
    font-size: 33px;
    line-height: 56px;
    color: #dbf0ff;
    margin-right: 6px;
  }
}
.circle3_group {
  position: relative;
  margin: 89px 0 30px 0;
  width: 200px;
  height: 200px;
  @extend %bg-img-circle-5;

  .flex_text_box {
    margin: 230px 0 0 0;
  }
  .flex_value span:nth-child(1) {
    @extend %value-font;
    font-weight: bold;
    font-size: 41px;
    line-height: 56px;
    color: #dbf0ff;
    margin-right: 6px;
  }
}
.circle3_group::before {
  display: flex;
  content: "";
  width: 2px;
  height: 270px;
  margin-left: -35px;
  position: absolute;
  left: 0;
  background: linear-gradient(
    0deg,
    transparent 0%,
    #013e7e 50%,
    transparent 100%
  );
}

.flex_text_box {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  font-size: 40px;
  line-height: 40px;
  color: #90a4c3;
  text-align: center;
  margin: 170px 0 0 0;

  .flex_value {
    margin: 18px 0 0 0;
    font-size: 36px;
    line-height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
