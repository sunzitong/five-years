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
  height: 1600px;
  margin: 40px;
  background: linear-gradient(
    90deg,
    rgba(1, 15, 65, 0.5) 0%,
    rgba(8, 16, 44, 0.5) 50.26%,
    rgba(4, 18, 68, 0.5) 99.48%
  );
  border: 1px solid #0c265e;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    background: linear-gradient(
      90deg,
      rgba(1, 245, 241, 0) 0%,
      rgba(48, 116, 206, 1) 50%,
      rgba(1, 245, 241, 0) 100%
    );
  }
}
</style>
