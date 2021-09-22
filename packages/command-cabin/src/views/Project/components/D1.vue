<template>
  <!-- <Spin :height="833" :loading="loading" :empty="empty"> -->
  <div class="page__d1__map">
    <D1A />
    <D1B />
  </div>
  <!-- </Spin> -->
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base } from "@/views/Base";
import D1A from "./D1A.vue";
import D1B from "./D1B.vue";

@Component({
  components: {
    D1A,
    D1B,
  },
})
export default class D1 extends Base {}
</script>

<style lang="scss" scoped></style>
