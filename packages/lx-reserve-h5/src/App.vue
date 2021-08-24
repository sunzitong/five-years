<template>
  <div id="app">
    <router-view
      v-if="act.status === 'success' || act.status === 'fail' || env.err"
    />
    <AppLoading v-else />
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
    const title = "冠寓四重奏，由你放“肆“租：最高立减1个月房租";
    const img =
      "https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/oNuSnxNLKKU.png";
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
        },
        location.href,
        2
      );
    }
  }
}
</script>
<style lang="scss">
#app {
  min-height: 100vh;
  background-color: #f7f8fa;
}
</style>
