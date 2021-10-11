<template>
  <div class="continer"></div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
@Component
export default class C5 extends Base implements IFetch {
  async fetch() {
    return;
  }
}
</script>
<style lang="scss" scoped></style>
