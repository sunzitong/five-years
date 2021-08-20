<template>
  <div class="app-card">
    <!-- SVG 背景没有footer -->
    <BoxBackground :showRectBackground="showRectBackground" />
    <div class="app-card__head">
      <slot name="title" v-bind="title">
        <h3 class="app-card__title">{{ title }}</h3>
      </slot>
    </div>
    <div class="app-card__body">
      <div class="app-card__content">
        <slot>
          <p>这里是body区域</p>
          <p>这里是body区域</p>
          <p>这里是body区域</p>
          <p>这里是body区域</p>
          <p>这里是body区域</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import BoxBackground from "@/components/BoxBackground/index.vue";

@Component({
  components: {
    BoxBackground,
  },
})
export default class Card extends Vue {
  /**
   * 标题
   */
  @Prop({ default: "" }) title!: string;

  /**
   * 是否显示方格背景
   */
  @Prop({ default: true }) showRectBackground!: boolean;
}
</script>

<style lang="scss" scoped>
.app-card {
  position: relative;
  min-width: 580px;
  &__head {
    position: relative;
    z-index: 10;
    display: flex;
    width: 516px;
    height: 70px;
    margin: 0 auto;
  }
  &__title {
    margin: 5px auto auto;
    font-size: 36px;
    color: #fff;
  }

  &__body {
    position: relative;
    padding: 30px 0;
  }

  &__content {
    position: relative;
    color: #fff;
  }
}
</style>
