<template>
  <div id="app">
    <router-view />
    <!-- 若有初始化的请求 可以设置在未完成时页面转圈 -->
    <AppLoading v-if="false" />
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
  /**
   * Provide会透传给所有自级组件
   * 环境: APP 小程序 browser
   */
  visitSource = judgeDevice();

  /**
   * Provide会透传给所有自级组件
   * 用Inject接收
   */
  @Provide()
  share(url: string) {
    const title = "冠寓五周年,快来助我赚珑珠!";
    const img =
      "https://goyoo-assets.longfor.com/prod/app/H_CvGHPIaeZkvNegO0Glbw.png";
    if (this.visitSource === "小程序") {
      return setMiniProgramShare({
        title,
        imageUrl: img,
        path: url,
      });
    }
    if (this.visitSource === "APP") {
      /**
       * 调用app的分享 分享目标到小程序 miniProgramUrl1
       */
      return showAppShare(
        {
          title,
          image: img,
          url: url,
        },
        url,
        0,
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
