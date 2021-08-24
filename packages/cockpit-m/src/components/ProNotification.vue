<template>
  <van-notice-bar
    class="pro__notification"
    :scrollable="false"
    v-bind="noticebar"
    :style="notice.style"
  >
    <slot></slot>
  </van-notice-bar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class ProNotification extends Vue {
  /**
   * 通知类型
   */
  @Prop({ default: "GREEN" }) theme!: "RED" | "GREEN" | "YELLOW";

  @Prop() noticebar!: Record<
    | "mode"
    | "text"
    | "color"
    | "background"
    | "left-icon"
    | "delay"
    | "speed"
    | "scrollable"
    | "wrapable",
    any
  >;

  /** 通知数据 */
  get notice() {
    const map = {
      red: {
        style: `
          color: #FF001C;
          background-color: #fee3e5;
        `,
      },
      green: {
        style: `
          color: #45C698;
          background-color: #eaf8f3;
        `,
      },
      yellow: {
        style: `
          color: #FF7A00;
          background-color: #fff8e7;
        `,
      },
      default: { style: "" },
    };

    if (typeof this.theme === "string") {
      return map[this.theme.toLowerCase()] ?? map.default;
    }

    return map.default;
  }
}
</script>
<style lang="scss" scoped>
.pro__notification {
  margin-bottom: 12px;
  height: 30px;
  &::v-deep {
    .van-notice-bar__content {
      min-width: 100%;
      text-align: center;
      font-size: 13px;
    }
  }
}
</style>
