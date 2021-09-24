<template>
  <!-- <Spin :height="830" :loading="loading" :empty="empty"> -->
  <div class="page__d2__map">
    <div class="top_abstract">三费总和</div>
    <div class="top_value_box">
      <span class="top_value">{{ sepNumber(201485) }}</span>
      <span class="top_text">万</span>
      <span class="top_value">{{ 85 }}%</span>
    </div>
    <div class="border_box_group">
      <div class="border_box">
        营销费用
        <span>{{ sepNumber(2000) }}</span>
        万
        <span>{{ 35 }}%</span>
      </div>
      <div class="border_box">
        运营成本
        <span>{{ sepNumber(1553.8) }}</span>
        万
        <span>{{ 66.3 }}%</span>
      </div>
      <div class="border_box">
        管理成本
        <span>{{ sepNumber(2000) }}</span>
        万
        <span>{{ 3 }}%</span>
      </div>
    </div>
    <div class="bottom_text_group">
      <span class="bottom_text">租金成本</span>
      <span class="bottom_value">{{ 1553.8 }}</span>
      <span class="bottom_text">万</span>
      <span class="bottom_value">{{ 12 }}%</span>
    </div>
    <div class="flex_box_group">
      <div class="flex_box">
        <div>入房比</div>
        <div class="flex_value">{{ "1:30" }}</div>
      </div>
      <div class="flex_box">
        <div>元均收入</div>
        <div>
          <span class="flex_value">{{ 7252 }}</span>
          <span>元</span>
        </div>
      </div>
      <div class="flex_box">
        <div>能源费用（收支差）</div>
        <div>
          <span class="flex_value">{{ 23 }}</span>
          <span>万</span>
        </div>
      </div>
    </div>
  </div>
  <!-- </Spin> -->
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base } from "@/views/Base";

@Component({
  components: {},
})
export default class D2 extends Base {}
</script>

<style lang="scss" scoped>
.top_abstract {
  font-size: 40px;
  line-height: 40px;
  color: #90a4c3;

  padding: 66px 0 12px 50px;
}

.top_value_box {
  margin: 0 0 53px 50px;

  .top_value {
    @extend %value__letter;
    font-weight: bold;
    font-size: 66px;
    line-height: 77px;
    color: #dbf0ff;
  }

  .top_text {
    font-size: 36px;
    line-height: 36px;
    color: #90a4c3;
    margin: 0 35px 0 2px;
  }
}

.border_box_group {
  margin: 0 3px 40px 50px;

  .border_box {
    display: flex;
    align-items: center;
    height: 91px;
    width: 100%;
    background: linear-gradient(
      89.96deg,
      rgba(5, 203, 253, 0.1) 0%,
      rgba(0, 127, 249, 0) 100.9%
    );
    backdrop-filter: blur(10px);

    font-size: 36px;
    line-height: 40px;
    color: #8090aa;
    &::before {
      content: "";
      width: 2px;
      height: 100%;
      background: #5180e4;
      box-shadow: 0px 0px 10px #5180e4;
      margin-right: 30px;
    }
    span {
      margin: 0 6px 0 80px;
      width: 150px;
      @extend %value__letter;
      font-weight: bold;
      font-size: 48px;
      line-height: 56px;
      color: #dbf0ff;
      text-align: right;
    }
  }
}

.bottom_text_group {
  margin: 0 0 87px 84px;

  color: #8090aa;

  .bottom_text {
    margin-left: 6px;
    font-size: 36px;
    line-height: 40px;
  }

  .bottom_value {
    @extend %value__letter;
    font-weight: bold;
    font-size: 48px;
    line-height: 56px;
    color: #ff3980;
    margin-left: 23px;
  }
}

.flex_box_group {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  .flex_box {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;

    height: 110px;

    font-style: normal;
    font-size: 36px;
    line-height: 36px;
    color: #8090aa;
    padding-left: 50px;
  }
}

.flex_value {
  @extend %value__letter;
  font-weight: bold;
  font-size: 48px;
  line-height: 56px;
  color: #dbf0ff;
  margin: 0 6px 0 0;
}
.flex_box:nth-child(2):before,
.flex_box:nth-child(3):before {
  display: flex;
  content: "";
  width: 2px;
  height: 100%;
  position: absolute;
  left: 0;
  background: linear-gradient(
    0deg,
    transparent 0%,
    #013e7e 50%,
    transparent 100%
  );
}
</style>
