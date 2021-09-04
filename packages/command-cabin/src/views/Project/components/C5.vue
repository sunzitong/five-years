<template>
  <div class="box">
    <div class="tag-year">9月试算</div>
    <Icon type="trangle" class="icon-warn" :size="70" />
    <div class="content">
      <div class="chart animate__animated">
        <AnimateBgCircle />
        <van-circle
          v-model="currentRate"
          :rate="rate"
          :speed="50"
          :text="text"
          layer-color="#14437F"
          :stroke-width="240"
          :size="300"
          stroke-linecap="butt"
          :clockwise="false"
        >
          <div class="rate-text">
            <div class="value">{{ currentRate }}</div>
            <div class="desc">总分</div>
          </div>
        </van-circle>
      </div>
      <ul class="list">
        <li class="item">
          <div class="name">信用指数</div>
          <div class="value">65.66</div>
        </li>
        <li class="item">
          <div class="name">渠道效能值</div>
          <div class="value">65.66</div>
        </li>
        <li class="item">
          <div class="name">运营健康度</div>
          <div class="value">65.66</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Icon from "@/components/Icon/Index.vue";
import AnimateBgCircle from "@/components/AnimateBgCircle/Index.vue";

@Component({
  components: { Icon, AnimateBgCircle },
})
export default class C5 extends Vue {
  currentRate = 20;
  rate = 80;
  text = "text";
}
</script>

<style lang="scss" scoped>
$light: #01f5f1;
.box {
  width: 1050px;
  height: 550px;
  font-family: PingFang SC;
  font-size: 30px;
  color: #fff;
  position: relative;
  overflow: hidden;
  margin-top: -60px;
}
.tag-year {
  @extend %flex-center;
  position: absolute;
  top: 34px;
  left: 24px;
  font-size: 24px;
  width: 135px;
  height: 42px;
  background: #24386d;
  border-radius: 6px;
}
.icon-warn {
  position: absolute;
  top: 28px;
  right: 50px;
}
.content {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  .chart {
    position: relative;
    @extend %flex-center;
    width: 424px;
    height: 424px;
    margin: 0 90px 0 160px;
    .rate-text {
      @extend %flex-center;
      flex-flow: column nowrap;
      height: 100%;
      line-height: 1;
      .value {
        @extend .value__letter;
        font-weight: bold;
        font-size: 60px;
      }
      .desc {
        font-size: 30px;
      }
    }
  }
  .list {
    line-height: 1;
    .item {
      margin: 40px 0;
      .name {
        font-size: 30px;
      }
      .value {
        @extend .value__letter;
        font-weight: bold;
        font-size: 60px;
        color: $light;
      }
    }
  }
}
.fade-enter-active {
  animation: fadeIn 1s;
}
.fade-leave-active {
  animation: fadeOut 1s;
}
</style>
