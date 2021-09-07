<template>
  <div class="box">
    <ul class="list">
      <li class="item">
        <div class="name">资产类型</div>
        <div class="desc">中、轻、重</div>
      </li>
      <li class="item">
        <div class="name">交易对手</div>
        <div class="desc">重庆市三快在线有限公司</div>
      </li>
      <li class="item">
        <div class="name">获取方式</div>
        <div class="desc">招投标、直委、联交所、其他</div>
      </li>
      <li class="item">
        <div class="name">合作模式</div>
        <div class="desc">委托管理（轻），毛坯交付（中）</div>
      </li>
      <li class="item">
        <div class="name">租赁面积</div>
        <div class="desc">公寓</div>
      </li>
      <li class="item">
        <div class="name">土地性质</div>
        <div class="desc">中、重</div>
      </li>
      <li class="item">
        <div class="name">楼体性质</div>
        <div class="desc">中、重</div>
      </li>
      <li class="item">
        <div class="name">证照产权</div>
        <div class="desc">中重</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class A2 extends Vue {}
</script>

<style lang="scss" scoped>
$light: #01f5f1;
$padding-x: 85px;
.box {
  width: 1098px;
  box-sizing: border-box;
  padding: 37px $padding-x;
  font-family: PingFang SC;
  font-size: 34px;
  line-height: 1;
  color: #fff;
  .list {
    .item {
      display: flex;
      justify-content: space-between;
      line-height: 56px;
      box-sizing: border-box;
    }
    .name {
      color: $light;
    }
  }
}
</style>
