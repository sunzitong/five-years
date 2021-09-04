<template>
  <div class="box">
    <div class="title">
      资产类型：
      <span class="light">轻资产</span>
    </div>
    <ul class="list">
      <li class="item">
        <div class="label">开业间数</div>
        <div class="value">
          5343
          <span class="unit">间</span>
        </div>
      </li>
      <li class="item">
        <div class="label">开业间数</div>
        <div class="value">
          5343
          <span class="unit">间</span>
        </div>
      </li>
      <li class="item">
        <div class="label">开业间数</div>
        <div class="value">
          5343
          <span class="unit">间</span>
        </div>
      </li>
      <li class="item">
        <div class="label">开业间数</div>
        <div class="value">
          5343
          <span class="unit">间</span>
        </div>
      </li>
      <li class="item">
        <div class="label">开业间数</div>
        <div class="value">
          5343
          <span class="unit">间</span>
        </div>
      </li>
      <li class="item">
        <div class="label">开业间数</div>
        <div class="value">
          5343
          <span class="unit">间</span>
        </div>
        <div class="year">2021/01/01～2030/01/01</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class A1 extends Vue {}
</script>

<style lang="scss" scoped>
$light: #01f5f1;
$gray: #b4b4b4;
$padding-x: 82px;
.box {
  display: flex;
  flex-flow: column nowrap;
  color: #fff;
  font-family: PingFang SC;
  line-height: 1;
  width: 1098px;
  /* height: 560px; */
  .list {
    display: flex;
    flex-wrap: wrap;
  }
  .item {
    width: 50%;
    height: 96px;
    padding-left: $padding-x;
    box-sizing: border-box;
    margin-top: 50px;
  }
}
.light {
  color: $light;
}
.title {
  font-weight: 500;
  font-size: 36px;
  padding-left: $padding-x;
  margin-top: 10px;
}
.label {
  font-size: 30px;
}
.value {
  @extend .value__letter;
  font-size: 60px;
  color: $light;
  margin-top: 6px;
}
.unit {
  font-size: 24px;
  color: $light;
}
.year {
  font-size: 24px;
  color: $gray;
  margin-top: 6px;
}
</style>
