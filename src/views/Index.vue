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
    <img
      class="share-btn"
      src="https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/_FE2SpPV8jrhx7gKYyeXPQ.png"
      alt=""
      @click="shareBtnClick"
    />
    <van-overlay
      :show="showMiniShareGuideImg"
      @click="showMiniShareGuideImg = false"
    >
      <img
        @click.stop
        class="shareGuideImg"
        src="https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/OO0AfvTKMewa5qeOrcx6rA.png"
        alt=""
      />
    </van-overlay>
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
  showMiniShareGuideImg = false;

  mounted() {
    this.fetchCustomEntry();
    if (this.visitSource === "小程序") {
      this.share();
    }
    if (this.visitSource === "browser") {
      // window.location.href = "weixin://dl/business/?t=nJrHlqp85fm";
      // window.location.href = 'weixin://dl/business/?t=GuezlitC4uf'
    }
    window.zhuge.track("好友邀请页");
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
   * 点击分享按钮
   */
  shareBtnClick() {
    if (this.visitSource === "小程序") {
      this.showMiniShareGuideImg = true;
    }
    this.share();
  }
  /**
   * 跳转到活动
   */
  jumpToAct(item) {
    window.zhuge.track(`冠寓5周年活动首页活动-${item.activityName}-click`);
    const token = getToken();
    // 若该活动需要登录
    if (item.isLogin) {
      // 若没有登录
      if (!token) {
        this.login();
        return;
      }
    }
    // 若活动需要跳转到其他原生小程序页
    if (item.appId) {
      if (this.visitSource === "小程序") {
        window.wx.miniProgram.navigateTo({
          url: `/packageB/pages/miniProgramTransfer/miniProgramTransfer?params=${JSON.stringify(
            {
              appId: item.appId,
              path: item.activityUrl,
            }
          )}`,
        });
      } else if (this.visitSource === "APP") {
        window.location.href = "weixin://dl/business/?t=aWHg2IZDmBp";
      }
      return;
    }
    if (this.visitSource === "小程序") {
      // 若是H5活动, 直接跳转
      window.wx.miniProgram.navigateTo({
        url: `/packageA/pages/bearWeb/bearWeb?item=${encodeURIComponent(
          item.activityUrl
        )}`,
      });
    } else {
      window.location.href = item.activityUrl;
    }
    console.log("item", item);
  }
}
</script>

/* less也支持 */
<style lang="scss" scoped>
.container {
  position: relative;
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .shareGuideImg {
    height: 107px;
    /* width: 261px; */
    position: absolute;
    top: 20px;
    right: 53px;
  }
  .bg {
    width: 100%;
    display: block;
  }
  .share-btn {
    position: absolute;
    top: 34px;
    right: 0px;
    width: 58px;
  }
  .class5 {
    position: absolute;
    // top: 163px;
    top: 43vw;
    width: 102px;
    // left: 79px;
    left: 21vw;
  }
  .class6 {
    position: absolute;
    // top: 358px;
    top: 95vw;
    width: 102px;
    // left: -8px;
    left: -2vw;
  }
  .class7 {
    position: absolute;
    // top: 447px;
    top: 118vw;
    width: 102px;
    // left: 136px;
    left: 36vw;
  }
  .class8 {
    position: absolute;
    // top: 368px;
    top: 99vw;
    width: 102px;
    // right: 4px;
    right: 1vw;
  }
  .class9 {
    position: absolute;
    // top: 241px;
    top: 65vw;
    width: 102px;
    // right: -4px;
    right: 0vw;
  }
}
</style>
