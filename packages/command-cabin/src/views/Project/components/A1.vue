<template>
  <Spin :loading="loading" style="position: relative; z-index: 1000">
    <A1A />
    <A1B />
    <A1C />
  </Spin>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base } from "@/views/Base";
import A1A from "./A1A.vue";
import A1B from "./A1B.vue";
import A1C from "./A1C.vue";

@Component({ components: { A1A, A1B, A1C } })
export default class A1 extends Base {}
</script>
