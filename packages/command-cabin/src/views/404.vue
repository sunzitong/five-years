<template>
  <div class="err">
    <h1>404</h1>
    <p class="text">抱歉，找不到页面了</p>
    <BackHome />
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import BackHome from "@/components/BackHome.vue";
import { Base } from "./Base";

@Component({
  components: {
    BackHome,
  },
})
export default class NotFound extends Base {
  created() {
    this.env.err = "404";
  }
  beforeDestroy() {
    this.env.err = "";
  }
}
</script>

<style lang="scss" scoped>
.err {
  @extend %flex-center;
  height: 100vh;
  flex-flow: column;
  color: #999;
}
.text {
  color: #ccc;
}
</style>
