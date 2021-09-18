<template>
  <!-- <Spin :height="833" :loading="loading" :empty="empty"> -->
  <div class="page__d1a__map">
    <div class="circle1_group">
      <div class="flex_text_box">
        <div>全业态收入</div>
        <div>
          <span>{{ 72678 }}</span>
          <span>万</span>
        </div>
      </div>
    </div>
    <div class="circle2_group">
      <div class="flex_text_box">
        <div>长租</div>
        <div>
          <span>{{ 72678 }}</span>
          <span>万</span>
        </div>
      </div>
    </div>
    <div class="circle2_group">
      <div class="flex_text_box">
        <div>一展</div>
        <div>
          <span>{{ 72678 }}</span>
          <span>万</span>
        </div>
      </div>
    </div>
    <div class="circle2_group">
      <div class="flex_text_box">
        <div>底商</div>
        <div>
          <span>{{ 72678 }}</span>
          <span>万</span>
        </div>
      </div>
    </div>
    <div class="circle2_group">
      <div class="flex_text_box">
        <div>全业态收入</div>
        <div>
          <span>{{ 72678 }}</span>
          <span>万</span>
        </div>
      </div>
    </div>
    <div class="circle3_group">
      <div class="flex_text_box">
        <div>违约金及其他收入</div>
        <div>
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
export default class D1A extends Base {}
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
  width: 300px;
  height: 300px;
  @extend %bg-img-circle-3;
}
.circle2_group {
  margin: 89px 0 30px 0;
  width: 200px;
  height: 200px;
  @extend %bg-img-circle-1;
}
.circle3_group {
  position: relative;
  margin: 89px 0 30px 0;
  width: 200px;
  height: 200px;
  @extend %bg-img-circle-5;
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
</style>
