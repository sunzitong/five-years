<template>
  <div class="page__e5a__e5b">
    <E5A />
    <E5B />
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Base from "@/views/Base";
import E5A from "./E5A.vue";
import E5B from "./E5B.vue";

@Component({
  components: {
    E5A,
    E5B,
  },
})
export default class E5 extends Base {}
</script>

<style lang="scss" scoped></style>
