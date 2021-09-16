<template>
  <div>
    <A1A />
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Base from "@/views/Base";
import A1A from "./A1A.vue";

@Component({ components: { A1A } })
export default class A1 extends Base {}
</script>
