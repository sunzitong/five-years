<template>
  <div class="app-loading">
    <slot></slot>
    <div class="loading" v-if="loading">Loading</div>
    <div class="empty" v-else-if="empty">empty</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Spin extends Vue {
  /**
   * 加载
   */
  @Prop({ default: false }) loading!: boolean;

  /**
   * 是否数据为空
   */
  @Prop({ default: false }) empty!: boolean;
}
</script>

<style lang="scss" scoped>
.app-spin {
  position: relative;
}
</style>
