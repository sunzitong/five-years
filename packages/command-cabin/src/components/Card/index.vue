<template>
  <div class="app-box">
    <BoxBackground />
    <div class="app-box__head">
      <slot name="title" v-bind="title">
        <h3 class="app-box__title">{{ title }}</h3>
      </slot>
    </div>
    <div class="app-box__body">
      <div v-if="background" class="app-box__lattices"></div>
      <div class="app-box__content">
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
   * 盒子标题
   */
  @Prop({ default: "" }) title!: string;

  /**
   * 是否显示方格背景
   */
  @Prop({ default: true }) background!: boolean;
}
</script>

<style lang="scss" scoped>
$box-opacity: 0.6;
.app-box {
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

  &__background {
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
  }

  &__lattices {
    position: absolute;
    top: 70px;
    left: 20px;
    right: 20px;
    bottom: 0;
    opacity: $box-opacity;
    background-size: 100% 100%, 62px 62px;
    background-repeat: no-repeat, repeat;
    background-position: -2px -2px;
    background-image: linear-gradient(
        0,
        rgba(5, 71, 143, 0.04) 0%,
        rgba(1, 77, 159, 0.4) 50%,
        rgba(5, 71, 143, 0.04) 80%
      ),
      url("~@/assets/img/box-lattices.png");
  }

  &__body {
    position: relative;
    margin-top: -48px;
    padding-top: 85px;
    padding-bottom: 30px;
  }

  &__content {
    position: relative;
    color: #fff;
  }
}
</style>
