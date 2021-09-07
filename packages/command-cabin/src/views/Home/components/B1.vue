<template>
  <div class="page__project_opening__map">
    <div class="whole_pannel">
      <B1A class="on_left" />
      <B1B class="on_right" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import echarts from "@/plugins/echarts";

import B1A from "./B1A.vue";
import B1B from "./B1B.vue";
import Base from "@/views/Base";

console.log(echarts);

@Component({
  components: {
    B1A,
    B1B,
  },
})
export default class B1 extends Base {}
</script>

<style lang="scss" scoped>
.whole_pannel {
  display: flex;
  flex-flow: row nowrap;

  .on_left {
    width: 687px;
    height: 100%;
  }

  .on_right {
    flex: 1;
  }
}
</style>
