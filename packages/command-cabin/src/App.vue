<template>
  <div id="app">
    <AppHeader />
    <router-view :class="{ 'show-shadow': showShadow }" />
    <!-- 若有初始化的请求 可以设置在未完成时页面转圈 -->
    <AppLoading v-if="false" />
    <FixedNav />
    <FixedNav position="right" />
    <!-- 控制缩放 -->
    <div
      v-if="env.NODE_ENV === 'development'"
      :style="{ transform: 'scale(' + 1 / scale + ')' }"
      class="screen-resize"
    >
      {{ showShadow ? "已显示内容边框" : "已隐藏内容边框" }}
      <van-switch v-model="showShadow" :size="20" />
      {{ resize ? "已启用自动缩放" : "已显示网页原始大小" }}
      <van-switch v-model="resize" @change="resizeHandle" :size="20" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import AppLoading from "@/components/AppLoading.vue";
import MixStore from "@/store/MixStore";
import FixedNav from "@/components/FixedNav/Index.vue";
import AppHeader from "@/components/Header/Index.vue";

@Component({
  name: "app",
  components: {
    AppLoading,
    FixedNav,
    AppHeader,
  },
})
export default class App extends Mixins(MixStore) {
  resize = !!sessionStorage.getItem("resize");

  showShadow = false;

  scale = 1;

  resizeHandle() {
    const app = this.$root.$el as HTMLDivElement;
    if (!this.resize) {
      app.style.removeProperty("transform");
      document.body.style.removeProperty("width");
      document.body.style.removeProperty("height");
      this.scale = 1;
    } else {
      const fixWidth = 7680;
      const fixHeight = 3240;
      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;
      const sx = winWidth / fixWidth;
      const sy = winHeight / fixHeight;
      if (sx <= sy) {
        app.style.setProperty(
          "transform",
          `translateY(${(winHeight - fixHeight * sx) / 2}px) scale(${sx})`
        );
        this.scale = sx;
      } else {
        app.style.setProperty(
          "transform",
          `translateX(${(winWidth - fixWidth * sy) / 2}px) scale(${sy})`
        );
        this.scale = sy;
      }
      document.body.style.setProperty("width", "100vw");
      document.body.style.setProperty("height", "100vh");
    }
    if (this.resize) {
      sessionStorage.setItem("resize", "resize");
    } else {
      sessionStorage.removeItem("resize");
    }
  }

  contentMenuHandle(e: MouseEvent) {
    e.preventDefault();
    return false;
  }

  created() {
    // 7680 x 3240
    window.addEventListener("resize", this.resizeHandle);
    if (process.env.NODE_ENV !== "development") {
      document.addEventListener("contextmenu", this.contentMenuHandle);
    }
  }
  mounted() {
    this.resizeHandle();
  }
  destroyed() {
    window.removeEventListener("resize", this.resizeHandle);
    if (process.env.NODE_ENV !== "development") {
      document.removeEventListener("contextmenu", this.contentMenuHandle);
    }
  }
}
</script>
<style lang="scss">
#app {
  width: 7680px;
  height: 3240px;
  transform-origin: 0 0;
  overflow: hidden;
  background: #00023c;
  font-family: "PingFang SC";
}
/* 数字字体文件 */
.value__letter {
  @extend %value__letter;
}
.screen-resize {
  @extend %flex-center;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  transform-origin: 100% 0;
  color: #fff;
  background: #0f3f7d;
  box-shadow: #fff -2px 2px 10px 0px;
  font-size: 16px;
}
.show-shadow .app-card__content > * {
  box-shadow: 0 0 10px #fff;
}
</style>
