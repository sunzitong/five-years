<template>
  <!-- <Spin :height="833" :loading="loading" :empty="empty"> -->
  <div class="page__d1a__map">
    <div class="circle1_group">
      <van-circle
        v-model="currentRate"
        class="circle_setting1"
        :rate="wholeIncomeValue"
        layer-color="#14437F"
        color="#5180E4"
        :size="180"
        :strokeWidth="50"
        :speed="100"
      >
        <div class="rate-text">
          <div class="value">{{ wholeIncomeValue }}%</div>
        </div>
      </van-circle>
      <div class="flex_text_box">
        <div>全业态收入</div>
        <div class="flex_value">
          <span>{{ 72678 }}</span>
          <span>万</span>
        </div>
      </div>
    </div>
    <div class="circle2_group">
      <van-circle
        v-model="currentRate"
        class="circle_setting2"
        :rate="wholeIncomeValue"
        layer-color="#14437F"
        color="#5180E4"
        :size="145"
        :strokeWidth="45"
        :speed="100"
      >
        <div class="rate-text">
          <div class="value">{{ wholeIncomeValue }}%</div>
        </div>
      </van-circle>
      <div class="flex_text_box">
        <div>长租</div>
        <div class="flex_value">
          <span>{{ 72678 }}</span>
          <span>万</span>
        </div>
      </div>
    </div>
    <div class="circle2_group">
      <van-circle
        v-model="currentRate"
        class="circle_setting2"
        :rate="wholeIncomeValue"
        layer-color="#14437F"
        color="#5180E4"
        :size="145"
        :strokeWidth="45"
        :speed="100"
      >
        <div class="rate-text">
          <div class="value">{{ wholeIncomeValue }}%</div>
        </div>
      </van-circle>
      <div class="flex_text_box">
        <div>一展</div>
        <div class="flex_value">
          <span>{{ 72678 }}</span>
          <span>万</span>
        </div>
      </div>
    </div>
    <div class="circle2_group">
      <van-circle
        v-model="currentRate"
        class="circle_setting2"
        :rate="wholeIncomeValue"
        layer-color="#75384E"
        color="#FF3980"
        :size="145"
        :strokeWidth="45"
        :speed="100"
      >
        <div class="rate-text">
          <div class="value special_color">{{ wholeIncomeValue }}%</div>
        </div>
      </van-circle>
      <div class="flex_text_box">
        <div>底商</div>
        <div class="flex_value">
          <span class="special_color">{{ 72678 }}</span>
          <span>万</span>
        </div>
      </div>
    </div>
    <div class="circle2_group">
      <van-circle
        v-model="currentRate"
        class="circle_setting2"
        :rate="wholeIncomeValue"
        layer-color="#14437F"
        color="#5180E4"
        :size="145"
        :strokeWidth="45"
        :speed="100"
      >
        <div class="rate-text">
          <div class="value">{{ wholeIncomeValue }}%</div>
        </div>
      </van-circle>
      <div class="flex_text_box">
        <div>增值+车位</div>
        <div class="flex_value">
          <span>{{ 72678 }}</span>
          <span>万</span>
        </div>
      </div>
    </div>
    <div class="circle3_group">
      <div class="flex_text_box">
        <div>违约金及</div>
        <div>其他收入</div>
        <div class="flex_value">
          <span>{{ 72678 }}</span>
          <span>万</span>
        </div>
      </div>
    </div>
  </div>
  <!-- </Spin> -->
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Base from "@/views/Base";
@Component({
  components: {},
})
export default class D1A extends Base {
  currentRate = 0;
  wholeIncomeValue = 23.1; // 全业态收入
}
</script>

<style lang="scss" scoped>
.page__d1a__map {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  height: 478px;
  margin: 0 63px 0 50px;
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
    font-family: "DIN Alternate";
    @extend %value__letter;
    font-weight: bold;
    font-size: 48px;
    color: #dbf0ff;
    margin-top: 73px;
  }

  .flex_value span:nth-child(1) {
    font-family: "DIN Alternate";
    font-weight: bold;
    font-size: 66px;
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
    font-family: "DIN Alternate";
    @extend %value__letter;
    font-weight: bold;
    font-size: 42px;
    color: #dbf0ff;
    margin-top: 45px;
  }
  .special_color {
    color: #ff3980 !important;
  }
  .flex_text_box {
    margin: 90px 0 0 0;
  }
  .flex_value span:nth-child(1) {
    font-family: "DIN Alternate";
    font-weight: bold;
    font-size: 48px;
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
    font-family: "DIN Alternate";
    font-weight: bold;
    font-size: 48px;
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
  margin-left: -80px;
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

  font-family: "PingFang SC";
  font-size: 40px;
  line-height: 40px;
  color: #90a4c3;
  text-align: center;
  margin: 160px 0 0 0;

  .flex_value {
    margin: 18px 0 0 0;
    font-size: 36px;
    line-height: 48px;
  }
}
</style>
