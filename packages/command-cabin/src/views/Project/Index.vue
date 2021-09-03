<template>
  <div class="page__index">
    <A1 />
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Base from "@/views/Base";
import SubWrapper from "@/components/SubWrapper/Index.vue";
import Card from "@/components/Card/Index.vue";
import WhiteSpace from "@/components/WhiteSpace/Index.vue";
import A1 from "./components/A1.vue";

@Component({
  components: {
    SubWrapper,
    Card,
    WhiteSpace,
    A1,
  },
})
export default class Index extends Base {}
</script>

<style lang="scss" scoped></style>
