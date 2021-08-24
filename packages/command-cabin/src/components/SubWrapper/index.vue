<template>
  <div class="app-subwrapper">
    <div class="app-subwrapper__header">
      <div class="app-subwrapper__title">
        {{ title }}
      </div>
      <div class="app-subwrapper__extra">
        <slot name="extra">详情</slot>
      </div>
    </div>
    <div class="app-subwrapper__body">
      <slot>
        <span>{{ title }}</span>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class SubWrapper extends Vue {
  /**
   * 标题
   */
  @Prop({ default: "" }) title!: string;

  mounted() {
    console.log(this.title);
  }
}
</script>

<style lang="scss" scoped>
.app-subwrapper {
  &__header {
    position: relative;
    height: 100px;
    @extend %bg-img-subtitle-bg;
    background-position: left center;
    background-size: 1358px 99px;
    background-color: rgba(1, 22, 86, 1);
  }

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

  &__body {
    padding: 30px 40px 0;
    overflow: hidden;
    background: linear-gradient(
      180deg,
      rgba(1, 22, 86, 0.5) 0%,
      rgba(1, 22, 86, 0.61) 100%
    );
    // background: linear-gradient(180deg, #f50 0%, rgba(1, 22, 86, 0.61) 100%);
  }
}
</style>
