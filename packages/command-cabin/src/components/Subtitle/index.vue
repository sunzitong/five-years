<template>
  <div class="app-subtitle">
    <div class="app-subtitle__title">
      <slot>
        <span>{{ title }}</span>
      </slot>
    </div>
    <div class="app-subtitle__extra">
      <slot name="extra">详情</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class Subtitle extends Vue {
  /**
   * 标题
   */
  @Prop({ default: "" }) title!: string;
}
</script>

<style lang="scss" scoped>
.app-subtitle {
  position: relative;
  height: 100px;
  @extend %bg-img-subtitle-bg;
  background-position: left center;
  background-size: 1358px 99px;
  background-color: #000A26;

  &__title {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    color: #fff;
  }

  &__extra {
    position: absolute;
    right: 40px;
    top: 50%;
    color: #fff;
    transform: translateY(-50%);
    font-size: 26px;

    a {
      color: #fff;
    }
  }
}
</style>
