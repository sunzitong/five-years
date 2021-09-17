<template>
  <div class="operation">
    <van-row>
      <van-col span="12">
        <h4 class="label">平均出租率</h4>
        <div class="">
          <strong>95.3%</strong>
          同比
          <em>43.2%</em>
        </div>
        <div class="pointOfTime">时点 84.2%</div>
      </van-col>
      <van-col span="12">
        <h4 class="label">平均续租率</h4>
        <div class="">
          <strong>95.3%</strong>
          同比
          <span class="icon"><Icon type="desc" /></span>
          <em>43.2%</em>
        </div>
      </van-col>
      <van-col span="24" style="padding-top: 30px">
        <h4 class="label">在租房间平均成交价(元)</h4>
        <div class="">
          <strong>95.3%</strong>
          同比
          <span class="icon"><Icon type="desc" /></span>
          <em>43.2%</em>
        </div>
      </van-col>
    </van-row>
    <div class="line"></div>
    <van-row type="flex" align="bottom">
      <van-col span="24">
        <h4 class="label">同房间价格涨幅</h4>
      </van-col>
      <van-col span="8">
        <span class="icon"><Icon type="desc" /></span>
        <strong>2.1%</strong>
      </van-col>
      <van-col span="8">
        <span class="icon"><Icon type="asce" /></span>
        <em class="asce">2.1%</em>
        新签
      </van-col>
      <van-col span="8">
        <span class="icon"><Icon type="asce" /></span>
        <em class="asce">2.1%</em>
        续租
      </van-col>
    </van-row>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Base from "@/views/Base";
import Icon from "@/components/Icon/Index.vue";

@Component({
  components: {
    Icon,
  },
})
export default class E1B extends Base {
  mounted() {
    /** */
  }
}
</script>

<style lang="scss" scoped>
$light: #01f5f1;

.operation {
  padding: 0 43px;
  .line {
    height: 2px;
    margin: 41px 0 34px;
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
    color: #fff;
  }
  strong,
  em {
    font-style: normal;
    color: $light;
    @extend %value__letter;
  }
  strong {
    font-size: 40px;
  }
  em {
    font-size: 30px;
  }
  .icon {
    margin: 0 10px;
  }
  .asce {
    color: #ff2a76;
  }
  .pointOfTime {
    display: inline-block;
    padding: 0 10px;
    background: #29374b;
    border-radius: 20px;
    color: #fff;
    font-size: 20px;
  }
}
</style>
