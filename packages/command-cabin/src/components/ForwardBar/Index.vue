<template>
  <div class="forward-bar">
    <span :style="{ opacity: i * (1 / size) }" v-for="i in size" :key="i">
      <van-icon
        name="arrow"
        color="#193C5B"
        :size="34"
        class="animate__animated animate__fadeInLeft animate__infinite"
        :style="{
          animationDelay: i * 100 + 'ms',
        }"
      />
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class ForwardBar extends Vue {
  @Prop({ default: 10, type: Number }) size!: number;
}
</script>

<style lang="scss" scoped>
.forward-bar {
  display: flex;
  letter-spacing: -22px;
  opacity: 0.8;
}
.animate__animated {
  animation-duration: 4s;
}
</style>
