<template>
  <div class="app-loading">
    <div class="example">
      <div class="sk-wave">
        <div class="sk-wave-rect"></div>
        <div class="sk-wave-rect"></div>
        <div class="sk-wave-rect"></div>
        <div class="sk-wave-rect"></div>
        <div class="sk-wave-rect"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import "spinkit/spinkit.min.css";

@Component
export default class AppLoading extends Vue {}
</script>

<style lang="scss" scoped>
.app-loading {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  font-size: 14px;
  color: #fff;
  z-index: 9999;
  --sk-size: 400px;
  --sk-color: rgba(81, 128, 228, 0.8);
  @extend %flex-center;
}
</style>
