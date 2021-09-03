<template>
  <div class="box">
    <div class="tag">9月试算</div>
    <Icon type="trangle" class="icon" :size="70" />
    <div class="content">
      <van-circle
        v-model="currentRate"
        :rate="rate"
        :speed="10"
        :text="text"
        layer-color="#14437F"
        :stroke-width="240"
        :size="300"
        stroke-linecap="butt"
      >
        <div class="rate-text">
          <div class="value">{{ currentRate }}</div>
          <div class="desc">总分</div>
        </div>
      </van-circle>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Icon from "@/components/Icon/Index.vue";

@Component({
  components: { Icon },
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
  height: 528px;
  font-family: PingFang SC;
  font-size: 30px;
  color: #fff;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 10px #fff;
}
.tag {
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
.icon {
  position: absolute;
  top: 28px;
  right: 50px;
}
.content {
  .rate-text {
    @extend %flex-center;
    flex-flow: column nowrap;
    height: 100%;
    line-height: 1;
    .value {
      font-family: DIN Alternate;
      font-weight: bold;
      font-size: 60px;
    }
    .desc {
      font-size: 30px;
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
