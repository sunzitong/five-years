<template>
  <div class="page__index">
    <A1 />
    <A2 />
    <A3 />
    <A4 />
    <A5 />
    <C5 />
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Base from "@/views/Base";
import SubWrapper from "@/components/SubWrapper/Index.vue";
import Card from "@/components/Card/Index.vue";
import WhiteSpace from "@/components/WhiteSpace/Index.vue";
import A1 from "./components/A1.vue";
import A2 from "./components/A2.vue";
import A3 from "./components/A3.vue";
import A4 from "./components/A4.vue";
import A5 from "./components/A5.vue";
import C5 from "./components/C5.vue";

@Component({
  components: {
    SubWrapper,
    Card,
    WhiteSpace,
    A1,
    A2,
    A3,
    A4,
    A5,
    C5,
  },
})
export default class Project extends Base {}
</script>

<style lang="scss" scoped></style>
