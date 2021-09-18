<template>
  <div class="panel animate__animated animate__fadeInUp" v-show="show"></div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Base from "@/views/Base";
import { DateScopes } from "@/service/analysis/commandCabin/publicEnum";

@Component
export default class TheDateScopes extends Base {
  DateScopes = DateScopes;
}
</script>

<style lang="scss" scoped>
.panel {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 20;
  box-sizing: border-box;
  padding: 32px 60px;
  overflow: hidden;
  color: #90a4c3;
  background: rgba(14, 23, 60, 0.9);
  backdrop-filter: blur(20px);
}
.panel {
  --animate-duration: 200ms;
}
</style>
