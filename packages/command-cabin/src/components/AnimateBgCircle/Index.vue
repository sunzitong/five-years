<template>
  <div class="animate-bg-circle animate__animated">
    <div class="circle-border circle-border-1"></div>
    <div class="circle-border circle-border-2"></div>
    <div class="circle-border circle-border-3"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AnimateBgCircle extends Vue {}
</script>

<style lang="scss" scoped>
.animate-bg-circle {
  position: absolute;
  width: 100%;
  height: 100%;
}
.circle-border {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  @extend %bg-img-circle-border;
  background-position: center;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  &-1 {
    animation-name: circle-rotate-1;
    animation-duration: 5s;
    background-size: 100%;
  }
  &-2 {
    animation-name: circle-rotate-2;
    animation-duration: 6s;
    background-size: 96%;
  }
  &-3 {
    animation-name: circle-rotate-3;
    background-size: 92%;
    animation-duration: 3s;
  }
}
@keyframes circle-rotate-1 {
  from {
    transform: rotate(0deg);
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  to {
    transform: rotate(360deg);
    opacity: 1;
  }
}
@keyframes circle-rotate-2 {
  from {
    transform: rotate(120deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  to {
    transform: rotate(-240deg);
    opacity: 0;
  }
}
@keyframes circle-rotate-3 {
  from {
    transform: rotate(-120deg);
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  to {
    transform: rotate(240deg);
    opacity: 1;
  }
}
</style>
