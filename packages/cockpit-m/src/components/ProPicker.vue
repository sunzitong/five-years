<template>
  <div class="pro-picker">
    <div @click="showPicker = true" class="pro-picker__label" v-if="showValue">
      <div class="pro-picker__value">
        <slot name="value" :value="value">
          {{ value }}
        </slot>
      </div>
      <van-icon name="arrow-down" />
    </div>
    <van-popup
      v-model="showPicker"
      position="bottom"
      close-on-popstate
      :get-container="() => $el"
    >
      <slot name="picker" v-bind="{ confirm, cancel }">
        <van-picker
          show-toolbar
          v-bind="pickerProps"
          @confirm="confirm"
          @cancel="cancel"
        />
      </slot>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class ProPicker extends Vue {
  @Prop() value!: any;
  @Prop() pickerProps!: any;
  @Prop({ default: true }) showValue!: boolean;

  @Watch("pickerProps", { immediate: true })
  propsChanged(props: any) {
    if (!props || this.value) return;
    this.$emit("input", props.columns?.[props.defaultIndex || 0]);
  }

  // 显示picker
  showPicker = false;
  cancel() {
    this.showPicker = false;
  }
  confirm(data: any) {
    this.$emit("input", data);
    this.$emit("change", data);
    this.cancel();
  }
  // 供外部调用
  toggle(show: boolean) {
    this.showPicker = show;
  }
}
</script>

<style lang="scss" scoped>
.pro-picker {
  display: inline-flex;
  font-size: 14px;
  line-height: 20px;
  color: #1c7af7;
  &__label {
    @extend %flex-center;
  }
  &__value {
    margin-right: 4px;
  }
}
</style>
