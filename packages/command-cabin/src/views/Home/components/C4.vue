<template>
  <div class="continer">
    <div class="china"></div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import StepNumber from "@/components/StepNumber/Index.vue";
import { ResponseData } from "@guanyu/shared";

@Component({
  components: {
    StepNumber,
  },
})
export default class C4 extends Base implements IFetch {
  fetch(): Promise<void | ResponseData<unknown>> {
    throw new Error("Method not implemented.");
  }
}
</script>
<style lang="scss" scoped>
.continer {
  position: relative;
  height: 1858px;
}
.china {
  position: absolute;
  @extend %bg-img-china;
  width: 2607px;
  height: 2098px;
  left: -330px;
  bottom: 0;
}
</style>
