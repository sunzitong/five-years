<template>
  <div class="app-box" :class="showFooterClass">
    <div class="app-box__head">
      <slot name="title" v-bind="title">
        <h3 class="app-box__title">{{ title }}</h3>
      </slot>
    </div>
    <div class="app-box__body">
      <div class="app-box__background">
        <div class="top">
          <div class="left"></div>
          <div class="center"></div>
          <div class="right"></div>
        </div>
        <div class="bottom"></div>
      </div>
      <div v-if="background" class="app-box__lattices"></div>
      <div class="app-box__content">
        <slot>
          <p>这里是body区域</p>
          <p>这里是body区域</p>
          <p>这里是body区域</p>
          <p>这里是body区域</p>
          <p>这里是body区域</p>
          <p>这里是body区域</p>
          <p>这里是body区域</p>
        </slot>
      </div>
    </div>
    <div class="app-box__footer" v-if="showFooter">
      <div class="left-content"></div>
      <div class="right-content">
        <div class="l"></div>
        <div class="content">
          <div class="visible-hidden">
            <slot name="footer"></slot>
          </div>
        </div>
        <div class="r"></div>
      </div>
      <div class="rel-content"><slot name="footer"></slot></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class Box extends Vue {
  /**
   * 盒子标题
   */
  @Prop({ default: "" }) title!: string;

  /**
   * 盒子尺寸
   */
  @Prop({ default: "medium" }) size!: "small" | "medium" | "large";

  /**
   * 是否显示底部
   */
  @Prop({ default: true }) showFooter!: boolean;

  /**
   * 是否显示方格背景
   */
  @Prop({ default: true }) background!: boolean;

  /**
   * 显示footer时添加className
   * 用来控制底部padding
   */
  get showFooterClass() {
    return {
      "app-box--showfooter": this.showFooter,
    };
  }
}
</script>

<style lang="scss" scoped>
%box-body-bg {
  background-position: top center;
  background-size: 616px 504px;
}

$box-opacity: 0.6;
$box-background-color: #113069;
$box-border-radius: 20px;

.app-box {
  min-width: 580px;
  &__head {
    position: relative;
    z-index: 10;
    display: flex;
    width: 516px;
    height: 70px;
    margin: 0 auto;
    @extend %bg-img-box-head-bg;
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
    opacity: $box-opacity;
    .top {
      display: flex;
    }
    .left,
    .right {
      flex: 1;
      margin-top: 2px;
      border-top: 2px solid #1b4986;
      background-color: $box-background-color;
    }
    .left {
      border-top-left-radius: $box-border-radius;
    }
    .right {
      border-top-right-radius: $box-border-radius;
    }
    .center {
      height: 70px;
      width: 576px;
      @extend %bg-img-box-body-bg;
      @extend %box-body-bg;
    }
    .bottom {
      position: absolute;
      top: 70px;
      left: 0;
      right: 0;
      bottom: 0;
      background: $box-background-color;
      border-bottom-left-radius: $box-border-radius;
      border-bottom-right-radius: $box-border-radius;
    }
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
  &__footer {
    position: relative;
    display: flex;
    height: 90px;
    .left-content {
      opacity: $box-opacity;
      flex: 1;
      background-color: $box-background-color;
      border-bottom-left-radius: $box-border-radius;
    }
    .right-content {
      opacity: $box-opacity;
      display: flex;
      .l {
        width: 80px;
        @extend %bg-img-box-footer-bg;
        background-size: 300px 270px;
        background-position: 0 0;
      }
      .r {
        width: 50px;
        @extend %bg-img-box-footer-bg;
        background-size: 300px 270px;
        background-position: right bottom;
      }
      .content {
        flex: 1;
        font-size: 26px;
        @extend %bg-img-box-footer-bg;
        background-size: 300px 270px;
        background-position: 0 -90px;
        background-repeat: repeat-x;
      }
      .visible-hidden {
        visibility: hidden;
      }
    }
    .rel-content {
      a {
        color: #fff;
      }
      color: #fff;
      position: absolute;
      right: 40px;
      bottom: 10px;
      font-size: 26px;
    }
  }

  &--showfooter {
    .app-box__body {
      padding-bottom: 0;
    }
    .app-box__background {
      .bottom {
        border-radius: 0;
      }
    }
  }
}
</style>
