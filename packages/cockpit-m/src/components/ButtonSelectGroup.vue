<template>
  <div class="radio-button-group">
    <div class="radio-button-group-title">{{ title }}</div>
    <div class="radio-button-group-container">
      <van-grid column-num="3" :border="false">
        <van-grid-item v-for="item of optionsData" :key="item.name">
          <van-button
            block
            style="height: 30px; padding: 0"
            @click="toggle(item)"
            :style="{ color: item.checked ? '#1C7AF7' : '#A5AAAF' }"
            :color="item.checked ? '#DDE7FC' : '#F5F5F5'"
            :disabled="item.disabled"
          >
            {{ item.text }}
          </van-button>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script lang="ts">
import { iwant } from "@guanyu/shared";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

interface ButtonSelectGroupOptionProps {
  name: string;
  text: string;
  disabled?: boolean;
  color?: string;
  checked?: boolean;
  "checked-color"?: string;
}

@Component
export default class ButtonSelectGroupGroup extends Vue {
  /**
   * 标题
   */
  @Prop({ default: "" }) title!: string;

  /**
   * 表单配置
   */
  @Prop({ default: () => [] }) options!: ButtonSelectGroupOptionProps[];

  /**
   * 是否单选
   */
  @Prop({ default: false }) multiple!: boolean;

  /**
   * 最多选择几个
   */
  @Prop({ default: Infinity }) maxSelected!: number;

  /**
   * 值
   */
  @Prop() value!: number | string | (string | number)[];

  optionsData: ButtonSelectGroupOptionProps[] = [];

  @Watch("options", { immediate: true })
  @Watch("value", { immediate: true })
  watchOptions() {
    /**
     * 多选
     */
    const options = iwant.array(this.options);
    if (this.multiple) {
      const relValue = iwant.array(this.value).slice(0, this.maxSelected);
      this.optionsData = options.map((item) => {
        return {
          checked: relValue.includes(item.name),
          disabled: false,
          ...item,
        };
      });
      return;
    }

    /**
     * 单选
     */
    this.optionsData = options.map((item) => {
      return {
        checked: this.value === item.name,
        disabled: false,
        ...item,
      };
    });
  }

  /**
   * 点击事件
   */
  toggle(item: any) {
    /**
     * 禁用
     */
    if (item.disabled) return;

    /**
     * 设置为单选时
     * :multiple="false"
     */
    if (!this.multiple) {
      this.optionsData.forEach((radio) => {
        radio.checked = radio.name === item.name ? !radio.checked : false;
      });
      this.$emit("input", item.name);
      this.$emit("on-change", item.name);
      return;
    }

    /**
     * 设置为多选时
     * :multiple="true"
     */
    item.checked = !item.checked;

    const relValue = this.optionsData
      .filter((item) => item.checked)
      .map((item) => item.name);

    if (relValue.length > this.maxSelected) {
      item.checked = false;
      return;
    }

    this.$emit("input", relValue);
    this.$emit("on-change", relValue);
  }
}
</script>

<style lang="scss" scoped>
.radio-button-group {
  overflow: hidden;
  margin-bottom: 10px;
}

.radio-button-group-title {
  font-size: 16px;
  line-height: 1.5;
}

.radio-button-group-container {
  margin-left: -6px;
  margin-right: -6px;
  padding: 5px 0;
}

.radio-button-group::v-deep {
  .van-grid-item__content {
    padding: 5px 6px;
  }
}
</style>
