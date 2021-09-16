<template>
  <div class="container">
    <img
      class="bg"
      src="https://goyoo-assets.longfor.com/prod/app/55cC0WCB5wQTFc_JA5p0EQ.png"
      alt=""
    />
    <img
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
    />
  </div>
</template>

<script lang="ts">
import { Component, Inject, Watch } from "vue-property-decorator";
import Base from "./Base";
import { Demo, getDemo, getWxSign } from "@/service";
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

  mounted() {
    // location.href = "weixin://dl/business/?t=KxfMsOWV3Yv";
    document.title = "冠寓";
    this.getWxSign();
    console.log("this.visitSource", this.visitSource);
    if (this.visitSource === "小程序") {
      this.share();
    }
  }

  show = false;

  @Watch("finished")
  watchFinished(val: boolean) {
    if (val) {
      this.$toast("监听到加载完了");
    }
  }
  /**
   * 计算属性
   */
  get finished() {
    return this.pageNum > 5;
  }
  set finished(_val) {
    this.pageNum = 100;
  }
  loading = false;
  pageNum = 1;
  list: Demo[] = [];
  /**
   * 获取数据
   */
  async getDemo() {
    const res = await getDemo();
    if (res?.status === "ok") {
      this.list.push(...res.data);
      this.pageNum++;
    } else {
      this.$dialog.alert({
        message: `
        接口出错了，请使用本地mock
        <code>cd ./mock/</code>
        <code>npm i</code>
        <code>cd ..</code>
        <code>npm run dev</code>
        `,
        theme: "round-button",
        allowHtml: true,
      });
      this.finished = true;
    }
    // 加载状态结束
    this.loading = false;
  }

  /**
   * 获取数据
   */
  async getWxSign() {
    const res = await getWxSign({
      url: location.href.split("#")[0],
    });
    if ((res as any)?.code == "1000") {
      window.wx.config({
        debug: false, // 是否开启调试模式
        appId: (res as any)?.data?.appId,
        timestamp: (res as any)?.data?.timestamp,
        nonceStr: (res as any)?.data?.nonceStr,
        signature: (res as any)?.data?.signature,
        jsApiList: ["chooseImage", "previewImage"],
        openTagList: [
          "wx-open-launch-weapp", //跳转小程序
        ],
      });
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
  .zhuli {
    position: absolute;
    top: 163px;
    width: 102px;
    left: 79px;
  }
  .yaoqing {
    position: absolute;
    top: 358px;
    width: 102px;
    left: -8px;
  }
  .xingyun {
    position: absolute;
    top: 447px;
    width: 102px;
    left: 136px;
  }
  .haoyou {
    position: absolute;
    top: 368px;
    width: 102px;
    right: 4px;
  }
  .longzhu {
    position: absolute;
    top: 241px;
    width: 102px;
    right: -4px;
  }
}
</style>
