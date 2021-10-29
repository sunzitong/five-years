<template>
  <div class="page__springRent">
    <header class="header">
      <aside
        class="share"
        v-if="visitSource === '小程序' || visitSource === 'APP'"
        @click="share"
      >
        分享
      </aside>
      <aside class="tips" v-if="tipsShow">提示</aside>
    </header>
    <main class="main">主内容</main>
  </div>
</template>

<script lang="ts">
import { Component, Inject } from "vue-property-decorator";
import Base from "./Base";
import { ShowSharePanel } from "@guanyu/guanyu-h5-tools";
import { setMiniProgramShare } from "../utils/guanyu";
import { wxShare } from "@guanyu/h5-tools";

@Component
export default class SpringRent extends Base {
  @Inject() visitSource!: string;

  tipsShow = false;
  // 小程序版本 0正式版 1开发版 2体验版
  // 上线需要切换
  miniType = 0;

  mounted() {
    window.zhuge.track("进入_过年返乡宣传页");
    document.title = "过年返乡";
    const constant = {
      debug: false,
      api: `${window.location.origin}/gymwebsite/getJsapiSigna`,
      title: "过年返乡，你的安全我关心",
      link: window.location.href,
      img:
        "https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/app/aQEmVW2zMKLF9ckAZDMGXA.png",
      desc: "出行注意防护，安心回家过年",
      // type: "",
      // dataUrl: "",
      // success: () => {},
    };
    wxShare(constant);
    const mini = {
      title: "过年返乡，你的安全我关心",
      imageUrl:
        "https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/app/aQEmVW2zMKLF9ckAZDMGXA.png",
      path: location.href,
    };
    setMiniProgramShare(mini);
  }

  share() {
    const title = "过年返乡，你的安全我关心";
    const img =
      "https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/app/aQEmVW2zMKLF9ckAZDMGXA.png";
    const text = "过年返乡，你的安全我关心";
    // APP微信好友和朋友圈分享
    if (this.visitSource === "APP") {
      // 上线需要切换
      const urlFriend = "https://m.iguanyu.com/fe/hd-20201111/#/homeBack";
      const shareMiniProgramUrl = `guanyu://miniProgram?userName=gh_1b7cffb1d9a2&path=${encodeURIComponent(
        `/packageA/pages/bearWeb/bearWeb?item=${encodeURIComponent(urlFriend)}`
      )}&appId=wx33f386ec5a676407&type=${this.miniType}`;
      return ShowSharePanel({
        types: ["wx_session", "wx_timeline"],
        title,
        url: urlFriend,
        image: img,
        text,
        shareMiniProgramUrl,
      });
    }
    // 小程序分享
    if (this.visitSource === "小程序") {
      this.tipsShow = !this.tipsShow;
      // return setMiniProgramShare({
      //   title,
      //   imageUrl: img,
      //   path: location.href,
      // });
    }
  }
}
</script>

<style lang="scss">
.page__springRent {
  width: 100%;
  height: 1685px;
  background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/app/JkgLOMctyrWTZKaO-V_kaw.png")
    0 0 no-repeat;
  background-size: 100% 100%;
  overflow: scroll;

  .header {
    // 分享
    .share {
      font-size: 0;
      z-index: 10;
      position: fixed;
      top: 10px;
      right: 10px;
      width: 49.5px;
      height: 51px;
      background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/app/qTxz0zIdn7Xg-JwNnB-K4Q.png")
        0 0 no-repeat;
      background-size: 100% 100%;
    }

    // 提示
    .tips {
      width: 251.5px;
      height: 80px;
      position: fixed;
      top: 60px;
      right: 20px;
      font-size: 0;
      background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/app/Qtm9s-eTnc06kW-vGy46Ew.png")
        0 0 no-repeat;
      background-size: 100% 100%;
    }
  }

  .main {
    font-size: 0;
  }
}
</style>
