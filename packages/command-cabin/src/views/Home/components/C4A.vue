<template>
  <div class="c4a-continer">
    <CardB>222</CardB>
    <Icon type="fold" :size="50" />
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import Icon from "@/components/Icon/Index.vue";
import CardB from "@/components/CardB/Index.vue";
@Component({
  components: { Icon, CardB },
})
export default class C5 extends Base implements IFetch {
  async fetch() {
    return;
  }
}
</script>
<style lang="scss" scoped>
.c4a-continer {
  width: 1644px;
  position: absolute;
  bottom: 180px;
}
</style>
