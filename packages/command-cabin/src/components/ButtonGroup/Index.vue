<template>
  <div class="button-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Btn extends Vue {
  radio = "1";
}
</script>

<style lang="scss" scoped>
.button-group {
  display: flex;
  position: relative;
  padding: 0 40px;
  ::v-deep {
    .van-radio-group {
      position: relative;
    }
    .van-radio[aria-checked] {
      height: 119px;
      margin: 0;
      /* 按钮首位的箭头 */
      &:nth-child(1)::before,
      &:nth-last-child(1)::after {
        content: "";
        width: 34px;
        height: 100%;
        @extend %bg-img-btn-normal;
        background-size: auto 100%;
        background-position-x: right;
      }
      &:nth-child(1)::before {
        transform: rotate(180deg);
      }
      /* 选中状态的箭头替换图片 */
      &[aria-checked="true"] {
        &:nth-child(1)::before,
        &:nth-last-child(1)::after {
          @extend %bg-img-btn-checked;
          background-size: auto 100%;
          background-position-x: right;
        }
      }
      /* 分隔线 */
      &[aria-checked="false"]:nth-last-child(n + 2)::after {
        content: "";
        width: 4px;
        height: 38px;
        background: #025772;
        margin: 0 -2px;
      }
      /* 字体内容 */
      .van-radio__label {
        @extend %flex-center;
        height: 100%;
        padding: 0 60px;
        margin: 0;
        background: #093167;
        border-top: 3px solid rgba(1, 245, 241, 0.3);
        border-bottom: 3px solid rgba(1, 245, 241, 0.3);
        box-sizing: border-box;
      }
      &:nth-child(1) .van-radio__label {
        padding-left: 40px;
      }
      &:nth-last-child(1) .van-radio__label {
        padding-right: 40px;
      }
      /* 选中时字体内容 */
      &[aria-checked="true"] {
        .van-radio__label {
          background: #0a205b;
          border: 3px solid #01f5f1;
        }
        &:nth-child(1) {
          .van-radio__label {
            border-left: none;
          }
        }
        &:nth-last-child(1) {
          .van-radio__label {
            border-right: none;
          }
        }
      }
    }
    /* 未选中字体颜色 */
    .van-radio[aria-checked="false"] {
      .van-radio__label {
        color: #b4b4b4;
      }
    }
    /* 选中字体颜色 */
    .van-radio[aria-checked="true"] {
      .van-radio__label {
        color: #01f5f1;
      }
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
    /* 改为按钮组两端箭头 */

    .van-radio:nth-child(1) {
      .van-radio__icon {
        &.van-radio__icon--checked {
          .van-icon::before {
            opacity: 1;
          }
        }
        .van-icon::before {
          display: block;
          content: "";
          position: absolute;
          right: -30px;
          width: 43px;
          height: 100%;
          @extend %bg-img-btn-arrow;
          opacity: 0.3;
          left: -30px;
          transform: rotate(180deg);
        }
      }
    }
    .van-radio:nth-last-child(1) {
      .van-radio__icon {
        &.van-radio__icon--checked {
          .van-icon::after {
            opacity: 1;
          }
        }
        .van-icon::after {
          content: "";
          position: absolute;
          right: -30px;
          width: 43px;
          height: 100%;
          @extend %bg-img-btn-arrow;
          opacity: 0.3;
        }
      }
    }
  }
}
</style>
