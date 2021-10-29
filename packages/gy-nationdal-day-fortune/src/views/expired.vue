<template>
  <div class="expired-container">
    <div class="img-container">
      <img :src="expired" alt class="expried-img" />
      美好的假期一去不回
      <br />
      没关系！还有好礼送给你！
    </div>

    <div class="bottom-container">
      <div class="btn" @click="newCustomerGiftJump">冠寓好礼相送快来拿</div>
    </div>
  </div>
</template>

<script lang="ts">
import qs from "qs";
import { getQueries } from "@/utils/tools";
import { Component, Inject } from "vue-property-decorator";
import expired from "@/assets/img/expired.png";
import Base from "./Base";

@Component
export default class Index extends Base {
  @Inject() visitSource!: string;
  // app和小程序分享
  @Inject() share!: () => void;

  expired = expired;

  mounted() {
    window.zhuge.track("中秋国庆-结束页");
    if (this.visitSource === "小程序") {
      this.share();
    }
    document.title = "双节假期黄历";
    
  }

  // 跳转到好友邀请
  newCustomerGiftJump() {
    window.zhuge.track("中秋国庆-结束页-礼包按钮");
    window.location.href = `${
      window.location.origin
    }/fe/gy-new-customer-gift/#/index${qs.stringify(getQueries(), {
      addQueryPrefix: true,
    })}`;
  }
}
</script>

<style lang="scss">
.expired-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: #ffffff;
  .img-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    color: #999999;
    font-size: 15px;
    line-height: 27px;
    text-align: center;
    .expried-img {
      margin-top: 154px;
      margin-bottom: 28px;
      width: 143px;
      height: 158px;
    }
  }
  .bottom-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    .btn {
      font-size: 17px;
      font-weight: bold;
      color: #ffffff;
      height: 50px;
      width: 355px;
      background: #f18d00;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
