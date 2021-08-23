<template>
  <div id="app">
    <router-view />
    <!-- 若有初始化的请求 可以设置在未完成时页面转圈 -->
    <AppLoading v-if="false" />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import AppLoading from "@/components/AppLoading.vue";
import MixStore from "@/store/MixStore";
import Resize from "@/components/Resize/index.vue";

@Component({
  name: "app",
  components: {
    AppLoading,
    Resize,
  },
})
export default class App extends Mixins(MixStore) {
  resizeHandle() {
    const app = this.$root.$el as HTMLDivElement;
    const fixWidth = 7680;
    const fixHeight = 3240;
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const sx = winWidth / fixWidth;
    const sy = winHeight / fixHeight;
    console.log(sx, sy);
    if (sx <= sy) {
      app.style.setProperty(
        "transform",
        `translateY(${(winHeight - fixHeight * sx) / 2}px) scale(${sx})`
      );
    } else {
      app.style.setProperty(
        "transform",
        `translateX(${(winWidth - fixWidth * sy) / 2}px) scale(${sy})`
      );
    }
  }
  created() {
    // 7680 x 3240
    window.removeEventListener("resize", this.resizeHandle);
    window.addEventListener("resize", this.resizeHandle);
  }
  mounted() {
    this.resizeHandle();
  }
}
</script>
<style lang="scss">
#app {
  width: 7680px;
  height: 3240px;
  background: red;
  transform-origin: 0 0;
  overflow: hidden;
}
</style>
