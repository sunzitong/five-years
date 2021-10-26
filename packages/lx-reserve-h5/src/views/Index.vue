<template>
  <div class="page__index">
    <header class="header">
      <aside class="share" v-if="visitSource === 'APP'" @click="share">
        分享
      </aside>
    </header>
    <main class="main"></main>
  </div>
</template>

<script lang="ts">
import { Component, Inject } from "vue-property-decorator";
import Base from "./Base";
import { getCityList } from "@/api";
import { getToken, toLogin } from "@/utils/guanyu";

@Component
export default class Index extends Base {
  @Inject() visitSource!: string;
  // app和小程序分享
  @Inject() share!: () => void;

  mounted() {
    document.title = "冠寓四重奏，由你放“肆“租";
    if (this.visitSource === "小程序") {
      this.share();
    }
  }

  /**
   * 获取城市列表
   */
  async getCityList() {
    const res = await getCityList();
    if (!res) return;
    if (res.status === "ok") {
      /**/
    }
  }

  login() {
    const token = getToken();
    // 未登录
    if (!token) {
      toLogin();
      return;
    }
  }
}
</script>

<style lang="scss">
.page__index {
  .header {
    font-size: 15px;
    text-align: center;
    .share {
      position: fixed;
      top: 20px;
      right: 0;
      width: 62px;
      height: 30px;
      font-size: 0;
      @extend %bg-img-share;
    }
  }
}
</style>
