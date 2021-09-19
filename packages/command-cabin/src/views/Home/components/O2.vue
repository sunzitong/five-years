<template>
  <div class="page__e2__map">
    <div class="container_box">
      <div class="e2_left">费效比：</div>
      <div class="e2_right">
        成本使用进度：
        <E2B />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base } from "@/views/Base";
import E2B from "./O2B.vue";

@Component({
  components: {
    E2B,
  },
})
export default class E2 extends Base {
  //   mounted() {}
}
</script>

<style lang="scss" scoped>
.container_box {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 45px;

  font-family: "PingFang SC";
  font-size: 30px;
  line-height: 34px;

  .e2_left {
    width: 40%;
  }
}
</style>
