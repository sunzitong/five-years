<template>
  <div id="app">
    <router-view v-if="isReady" />
    <AppLoading v-else />
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Provide } from "vue-property-decorator";
import AppLoading from "@/components/AppLoading.vue";
import MixStore from "@/store/MixStore";
import { setMiniProgramShare, showAppShare } from './utils/guanyu';
import { judgeDevice } from '@guanyu/h5-tools';

@Component({
  name: "app",
  components: {
    AppLoading
  }
})
export default class App extends Mixins(MixStore) {
  get isReady() {
    return this.env.cityName &&
      (this.act.status === 'success' || this.act.status === 'fail') ||
      this.env.err;
  }

  @Provide()
  // 环境 APP 小程序 browser
  visitSource = judgeDevice()

  mounted() {
    console.log(location.href);
    console.log('上线修改: 小程序版本 活动编号 drop-console');
  }

  @Provide()
  share() {
    // 页面标识
    const meta = this.$route.meta;
    const title = "冠寓四重奏，由你放“肆“租：最高立减1个月房租";
    let img = "";
    if (meta === 'index') {
      img = "https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/oNuSnxNLKKU.png"
    }
    if (meta === 'act-rent') {
      img = "https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/wrxnxU6y-Zw.png"
    }
    if (this.visitSource === '小程序') {
      return setMiniProgramShare({
        title,
        imageUrl: img,
        path: location.href
      })
    }
    if (this.visitSource === 'APP') {
      // miniProgramUrl
      return showAppShare({
        title,
        image: img,
        url: location.href
      }, location.href, 0)
    }
  }
}
</script>
<style lang="scss">
#app {
  min-height: 100vh;
}
.share {
  position: fixed;
  top: 20px;
  right: 0;
  width: 62px;
  height: 30px;
  font-size: 0;
}
.page-index .share {
  @extend %bg-img-share1;
}
.page-rent .share {
  @extend %bg-img-share2;
}
</style>
