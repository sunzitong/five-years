<template>
  <div class="box">
    <van-row justify="space-around">
      <van-col :span="8">
        <div class="item">
          <van-circle
            v-model="currentRate"
            :rate="rate"
            :speed="50"
            layer-color="#14437F"
            color="#57A6FB"
            :size="140"
            :stroke-width="60"
            stroke-linecap="butt"
            class="chart"
          />
          <div class="chart__text">{{ currentRate }}%</div>
          <div class="icon">
            <Icon type="water-drop" :size="22" />
          </div>
          <div class="name">水</div>
        </div>
      </van-col>
      <van-col :span="8">
        <div class="item">
          <van-circle
            v-model="currentRate"
            :rate="rate"
            :speed="50"
            layer-color="#14437F"
            color="#A957FB"
            :size="140"
            :stroke-width="60"
            stroke-linecap="butt"
            class="chart"
          />
          <div class="chart__text">{{ currentRate }}%</div>
          <div class="icon">
            <Icon type="lightning" :size="22" />
          </div>
          <div class="name">电</div>
        </div>
      </van-col>
      <van-col :span="8">
        <div class="item">
          <van-circle
            v-model="currentRate"
            :rate="rate"
            :speed="50"
            layer-color="#14437F"
            color="#FBEE7E"
            :size="140"
            :stroke-width="60"
            stroke-linecap="butt"
            class="chart"
          />
          <div class="chart__text">{{ currentRate }}%</div>
          <div class="icon">
            <Icon type="door" :size="22" />
          </div>
          <div class="name">门禁</div>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Icon from "@/components/Icon/Index.vue";

@Component({
  components: { Icon },
})
export default class D5 extends Vue {
  currentRate = 0;
  rate = 40;
}
</script>

<style lang="scss" scoped>
.box {
  margin-top: 10px;
}
.item {
  position: relative;
  width: 140px;
  height: 140px;
  margin: auto;
  .icon {
    @extend %flex-center;
    position: absolute;
    width: 45px;
    height: 45px;
    background: #14437f;
    border-radius: 50%;
    top: 0;
    right: 0;
  }
  .chart {
    transform: rotate(30deg);
    transform-origin: 50% 50%;
  }
  .chart__text {
    @extend %flex-center;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    @extend %value__letter;
    font-weight: bold;
    font-size: 40px;
    color: #01f5f1;
  }
  .name {
    margin-top: 24px;
    text-align: center;
    font-family: PingFang SC;
    font-size: 30px;
    color: #fff;
  }
}
</style>
