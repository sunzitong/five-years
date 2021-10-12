<template>
  <div class="container">sssss</div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import StepNumber from "@/components/StepNumber/Index.vue";
import CardB from "@/components/CardB/Index.vue";
import Animationend from "@/components/Animationend/Index.vue";

@Component({
  components: {
    StepNumber,
    CardB,
    Animationend,
  },
})
export default class C5 extends Base implements IFetch {
  async fetch() {
    return;
  }
}
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  height: 1858px;
  --dart: #0e173c;
  --light: rgba(14, 23, 60, 0.5);
  background: red;
}
</style>
