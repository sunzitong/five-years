<template>
  <div id="app">
    <router-view />
    <!-- <AppLoading v-else /> -->
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Provide } from "vue-property-decorator";
import AppLoading from "@/components/AppLoading.vue";
import MixStore from "@/store/MixStore";
import { setMiniProgramShare, showAppShare } from "./utils/guanyu";
import { judgeDevice } from "@guanyu/h5-tools";

@Component({
  name: "app",
  components: {
    AppLoading,
  },
})
export default class App extends Mixins(MixStore) {
  @Provide()
  // 环境 APP 小程序 browser
  visitSource = judgeDevice();

  @Provide()
  share() {
    // 页面标识
    const title = "双节假期黄历";
    const img =
      "https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/q27TKjlYjsHJmKEaAontjQ.png";
    if (this.visitSource === "小程序") {
      return setMiniProgramShare({
        title,
        imageUrl: img,
        path: `${window.location.origin}/fe/gy-nationdal-day-fortune`,
        currentUrl: `${window.location.origin}/fe/gy-nationdal-day-fortune`,
      });
    }
    if (this.visitSource === "APP") {
      // miniProgramUrl
      return showAppShare(
        {
          title,
          image: img,
          url: `${window.location.origin}/fe/gy-nationdal-day-fortune`,
        },
        `${window.location.origin}/fe/gy-nationdal-day-fortune`,
        window.location.origin.includes("m.iguanyu.com") ? 0 : 2
      );
    }
  }
}
</script>
<style lang="scss">
#app {
  min-height: 100vh;
  overflow: scroll;
}
</style>
