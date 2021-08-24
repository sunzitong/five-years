<template>
  <div class="tooltip__wrapper">
    <van-popover
      v-model="showSync"
      trigger="click"
      placement="top-start"
      :get-container="() => $el"
      :close-on-click-outside="type === 'popover'"
    >
      <div v-if="type === 'popover'" class="tooltip__popover">
        {{ content }}
      </div>
      <template #reference>
        <van-icon v-bind="assignIconProps" name="info-o" />
      </template>
    </van-popover>
    <van-popup
      v-if="type === 'popup'"
      v-model="showSync"
      :closeable="true"
      :round="true"
      class="tooltip__popup"
      :overlay-style="{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }"
    >
      <div class="popup__wrapper">
        <h3>{{ title }}</h3>
        <div class="content">{{ content }}</div>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Tooltip extends Vue {
  /**
   * 图标属性
   */
  @Prop({ default: () => ({}) }) iconProps!: {
    color: string;
    size: number | string;
  };

  /**
   * 标题
   */
  @Prop({ default: "" }) title!: string;

  /**
   * 内容
   */
  @Prop({ default: "" }) content!: string;

  /**
   * 提示类型
   */
  @Prop({ default: "popup" }) type!: string;

  /**
   * 显示弹窗
   */
  @Prop({ type: Boolean }) show!: boolean;

  showSelf = false;

  get showSync() {
    return this.show || this.showSelf;
  }
  set showSync(value: boolean) {
    this.showSelf = value;
    this.$emit("update:show", value);
  }

  get assignIconProps() {
    return Object.assign({ color: "#4A81ED", size: 18 }, this.iconProps);
  }
}
</script>
<style lang="scss" scoped>
.tooltip__wrapper {
  display: inline-block;
  vertical-align: middle;
  > span {
    font-size: 18px;
  }
}

.popup__wrapper {
  color: #232832;
  line-height: 1.5;
  .content {
    word-break: break-all;
  }
  h3 {
    text-align: center;
    font-size: 16px;
    margin-bottom: 10px;
    min-height: 1em;
  }
  > .content {
    font-size: 14px;
    text-align: left;
  }
}

.tooltip__popover {
  padding: 10px;
  min-width: 20px;
  max-width: 128px;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  color: #232832;
}

.tooltip__popup {
  width: 255px;
  min-height: 100px;
  padding: 15px;
}

::v-deep .van-popover__content {
  border-radius: 2px;
}
</style>
