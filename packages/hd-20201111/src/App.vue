<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Provide } from "vue-property-decorator";
import MixStore from "@/store/MixStore";
import { setMiniProgramShare, showAppShare } from "./utils/guanyu";
import { judgeDevice } from "@guanyu/h5-tools";
import { getEnvHost } from "./utils/tools";

@Component({
  name: "app",
})
export default class App extends Mixins(MixStore) {
  @Provide()
  // 环境 APP 小程序 browser
  visitSource = judgeDevice();

  @Provide()
  share() {
    // 页面标识
    const title = "特价房大赏 一口价省心住";
    const img =
      "https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/app/pGSZyipmznMViL-nOA1H6g.png";
    const text = "狂欢秒杀房、邀好友双双有礼、15天免租活动，重磅福利等你抢！";
    if (this.visitSource === "小程序") {
      return setMiniProgramShare({
        title,
        imageUrl: img,
        path: location.href,
      });
    }
    if (this.visitSource === "APP") {
      // miniProgramUrl
      return showAppShare(
        {
          title,
          image: img,
          url: location.href,
          text: text,
        },
        location.href,
        getEnvHost() === "production" ? 0 : 2
      );
    }
  }
}
</script>
<style lang="scss">
#app {
  min-height: 100vh;
}
</style>
