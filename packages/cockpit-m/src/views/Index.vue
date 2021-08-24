<template>
  <div class="page__index">
    <header class="header">
      <aside></aside>
    </header>
    <main class="main">首页</main>
  </div>
</template>

<script lang="ts">
import Base from "@/views/Base";
import { Component } from "vue-property-decorator";
import { getToken, toLogin } from "@/utils/guanyu";

@Component
export default class Index extends Base {
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

<style lang="scss" scoped>
.header {
  font-size: 15px;
  text-align: center;
}
.share {
  position: fixed;
  top: 20px;
  right: 0;
  width: 62px;
  height: 30px;
  font-size: 0;
  @extend %bg-img-share;
}
</style>
