<template>
  <div class="container">
    <img
      v-for="item in data"
      :src="item.imageUrl"
      :key="item.id"
      alt=""
      :class="`class${item.id}`"
      @click="jumpToAct(item)"
    />
    <img
      class="bg"
      src="https://goyoo-assets.longfor.com/prod/app/55cC0WCB5wQTFc_JA5p0EQ.png"
      alt=""
    />
    <!-- <img
      class="zhuli"
      src="https://goyoo-assets.longfor.com/prod/app/DjLnomrQVYdqfz4jzJD4lA.png"
      alt=""
    />
    <img
      class="yaoqing"
      src="https://goyoo-assets.longfor.com/prod/app/oLLtG5L-v-fWR2Q2NiBzrg.png"
      alt=""
    />
    <img
      class="xingyun"
      src="https://goyoo-assets.longfor.com/prod/app/4oS4vwv3eMGsBoZlg2U0fQ.png"
      alt=""
    />
    <img
      class="haoyou"
      src="https://goyoo-assets.longfor.com/prod/app/h6QGFTyRchWrhQkqqK1wcw.png"
      alt=""
    />
    <img
      class="longzhu"
      src="https://goyoo-assets.longfor.com/prod/app/tTcXWatt8H9ueQQfp-P9Vg.png"
      alt=""
    /> -->
  </div>
</template>

<script lang="ts">
import { Component, Inject, Watch } from "vue-property-decorator";
import Base from "./Base";
import { Demo, getDemo, getWxSign, fetchCustomEntry } from "@/service";
import { getToken, toLogin } from "@/utils/guanyu";

@Component
export default class Index extends Base {
  /**
   * 运行环境
   * 来源 App.vue中定义
   */
  @Inject() visitSource!: string;

  /**
   * 分享方法
   * 来源 App.vue中定义
   */
  @Inject() share!: () => void;
  $dialog: any;
  data: any = [];

  mounted() {
    // location.href = "weixin://dl/business/?t=KxfMsOWV3Yv";
    document.title = "冠寓";
    this.fetchCustomEntry();
    console.log("this.visitSource", this.visitSource);
    if (this.visitSource === "小程序") {
      this.share();
    }
  }
  /**
   * 获取活动入口
   */
  async fetchCustomEntry() {
    const res = await fetchCustomEntry({
      activityNumber: "202109137856",
    });
    if (!res) return;
    const { status, data } = res;
    if (status === "ok") {
      this.data = data;
    }
  }
  /**
   * 调用App和小程序登录
   */
  login() {
    const token = getToken();
    // 未登录
    if (!token) {
      toLogin();
      return;
    }
  }
  /**
   * 跳转到活动
   */
  jumpToAct(item) {
    // 若该活动需要登录
    if (item.isLogin) {
      this.login();
    }
    // 若活动需要跳转到其他原生小程序页
    if (item.appId) {
      if (this.visitSource === "小程序") {
        window.wx.miniProgram.navigateTo({
          url: `/packageB/pages/miniProgramTransfer/miniProgramTransfer?params=${JSON.stringify({
            appId: item.appId,
            path: item.appId,
          })}`,
        });
      }
      return;
    }
    // 若是H5活动, 直接跳转
    window.location.href = item.activityUrl;
    console.log("item", item);
  }
  handleGoPage() {
    console.log(this.visitSource, "this.visitSource ");
    if (this.visitSource === "小程序") {
      window.wx.miniProgram.navigateTo({
        url: "/pages/index/demo",
      });
    } else {
      // location.href = "weixin://dl/business/?t=UWD6sWSZ2Ro";
      // location.href = "weixin://dl/business/?t=l2yNlq5JVed";
      location.href = "weixin://dl/business/?t=KxfMsOWV3Yv";
    }
  }
}
</script>

/* less也支持 */
<style lang="scss" scoped>
.container {
  position: relative;
  .bg {
    width: 100%;
    display: block;
  }
  .class5 {
    position: absolute;
    top: 163px;
    width: 102px;
    left: 79px;
  }
  .class6 {
    position: absolute;
    top: 358px;
    width: 102px;
    left: -8px;
  }
  .class7 {
    position: absolute;
    top: 447px;
    width: 102px;
    left: 136px;
  }
  .class8 {
    position: absolute;
    top: 368px;
    width: 102px;
    right: 4px;
  }
  .class9 {
    position: absolute;
    top: 241px;
    width: 102px;
    right: -4px;
  }
}
</style>
