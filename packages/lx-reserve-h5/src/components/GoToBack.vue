<template>
  <div class="back" :class="border && 'border'" @click="gotoBack">
    <img :src="verifysrc" alt="" class="back-arrow" />
    <span class="back-title">{{ title }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { stringify } from "qs";
import ARROW from "@/assets/img/arrow.png";
@Component
export default class GoToBack extends Vue {
  @Prop() title!: string;
  @Prop() border!: boolean;

  url = "";
  // 认证图片
  verifysrc: string = ARROW;
  created() {
    const url = stringify(this.$route.query) + this.$route.hash;
    this.url = "/?" + url;
  }
  // 后退
  @Emit()
  gotoBack(): void | boolean {
    // 如果当前页面没有历史记录，则返回首页
    if (window.history.length <= 1) {
      this.$router.push({
        path: `/storeList`,
      });
      return false;
    } else {
      this.$router.back();
    }
  }
}
</script>

<style lang="scss">
.back {
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  background-color: #fff;
  top: 0;
  z-index: 2000;
  .back-arrow {
    width: 6px;
    height: 13px;
    position: absolute;
    left: 25px;
  }
  .back-title {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
  }
}
.back.border {
  box-shadow: inset 0px -0.5px 0px rgba(0, 0, 0, 0.08);
}
</style>
