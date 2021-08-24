<template>
  <div class="pro__card">
    <div class="pro__card__title">
      <div class="pro__card__title__left">
        <h3 :style="styleTitle">{{ title }}</h3>
        <slot name="titleIcon"></slot>
      </div>
      <div class="pro__card__title__extra">
        <slot name="extra"></slot>
      </div>
    </div>
    <div class="pro__card__body">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class ProCard extends Vue {
  /**
   * 标题
   */
  @Prop({ default: "" }) title!: string;

  /**
   * 样式标题
   */
  @Prop({ default: () => ({}) }) styleTitle!: string | Record<string, any>;
}
</script>
<style lang="scss" scoped>
.pro__card {
  box-sizing: border-box;
  margin-bottom: 10px;
}

.pro__card__title {
  display: flex;
  align-items: center;
  padding: 8px 18px;
  h3 {
    font-family: PingFang SC;
    font-weight: normal;
    font-size: 18px;
    margin-right: 5px;
  }
}

.pro__card__title__left {
  display: flex;
  align-items: center;
  flex: 1;
}

.pro__card__title__extra {
  font-size: 14px;
  a {
    color: #1c7af7;
  }
}
</style>
