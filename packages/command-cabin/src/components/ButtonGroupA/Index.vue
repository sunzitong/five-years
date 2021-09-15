<template>
  <div class="button-group" :class="{ 'button-group--revert': revert }">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ButtonGroupA extends Vue {
  @Prop({ default: false, type: Boolean }) revert!: boolean;
}
</script>

<style lang="scss" scoped>
.button-group {
  display: flex;
  position: relative;
  /* 单选 */
  ::v-deep {
    .van-radio-group {
      position: relative;
    }

    /* 隐藏默认单选icon */
    .van-radio__icon {
      height: 100%;
      .van-icon {
        height: 100%;
        width: 0;
        border: none;
        position: static;
        &::before {
          display: none;
        }
      }
    }

    .van-radio[aria-checked] {
      width: 397px;
      height: 94px;
      margin: 0;
      position: relative;
      overflow: unset;
      /* 背景图 */
      &::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: -2px;
        left: 0;
        width: 102%;
        @extend %bg-img-btn-normal-center;
      }
      /* 首尾背景图 */
      &:nth-child(1),
      &:nth-last-child(1) {
        &::before {
          @extend %bg-img-btn-normal;
          top: -3px;
        }
      }
      &:nth-child(1) {
        &::before {
          transform: scaleX(-1);
        }
      }
      &:nth-last-child(1) {
        &::before {
          transform: scaleX(1);
        }
      }
      /* 文字 */
      .van-radio__label {
        display: flex;
        align-items: center;
        font-size: 50px;
        color: #5180e4;
        margin: auto;
      }
    }
    /* 选中 */
    .van-radio[aria-checked="true"] {
      z-index: 1;
      /* 背景图 */
      &::before {
        @extend %bg-img-btn-active-center;
      }
      /* 阴影 */
      &::after {
        content: "";
        position: absolute;
        height: 100px;
        top: 102%;
        left: 24px;
        right: 16px;
        @extend %bg-img-btn-shadow;
      }
      /* 首尾背景图 */
      &:nth-child(1),
      &:nth-last-child(1) {
        &::before {
          @extend %bg-img-btn-active;
          top: -3px;
        }
      }
      &:nth-child(1) {
        &::after {
          left: 8px;
          right: 16px;
        }
      }
      &:nth-last-child(1) {
        &::after {
          left: 24px;
          right: 0;
        }
      }
      /* 文字 */
      .van-radio__label {
        color: #01f5f1;
      }
    }
  }

  /* 复选 */
  ::v-deep {
    .van-checkbox-group {
      position: relative;
    }

    /* 隐藏默认单选icon */
    .van-checkbox__icon {
      height: 100%;
      .van-icon {
        height: 100%;
        width: 0;
        border: none;
        position: static;
        &::before {
          display: none;
        }
      }
    }

    .van-checkbox[aria-checked] {
      width: 397px;
      height: 94px;
      margin: 0;
      position: relative;
      overflow: unset;
      /* 背景图 */
      &::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: -2px;
        left: 0;
        width: 102%;
        @extend %bg-img-btn-normal-center;
      }
      /* 首尾背景图 */
      &:nth-child(1),
      &:nth-last-child(1) {
        &::before {
          @extend %bg-img-btn-normal;
          top: -3px;
        }
      }
      &:nth-child(1) {
        &::before {
          transform: scaleX(-1);
        }
      }
      &:nth-last-child(1) {
        &::before {
          transform: scaleX(1);
        }
      }
      /* 文字 */
      .van-checkbox__label {
        display: flex;
        align-items: center;
        font-size: 50px;
        color: #5180e4;
        margin: auto;
      }
    }
    /* 选中 */
    .van-checkbox[aria-checked="true"] {
      z-index: 1;
      /* 背景图 */
      &::before {
        @extend %bg-img-btn-active-center;
      }
      /* 阴影 */
      &::after {
        content: "";
        position: absolute;
        height: 100px;
        top: 102%;
        left: 24px;
        right: 16px;
        @extend %bg-img-btn-shadow;
      }
      /* 首尾背景图 */
      &:nth-child(1),
      &:nth-last-child(1) {
        &::before {
          @extend %bg-img-btn-active;
          top: -3px;
        }
      }
      &:nth-child(1) {
        &::after {
          left: 8px;
          right: 16px;
        }
      }
      &:nth-last-child(1) {
        &::after {
          left: 24px;
          right: 0;
        }
      }
      /* 文字 */
      .van-checkbox__label {
        color: #01f5f1;
      }
    }
  }

  /* 翻转 */
  &--revert {
    transform: scaleX(-1);
    ::v-deep {
      .van-checkbox__label,
      .van-radio__label {
        transform: scaleX(-1);
      }
    }
  }
}
</style>
