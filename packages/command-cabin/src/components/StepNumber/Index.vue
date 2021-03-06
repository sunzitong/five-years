<template>
  <span>
    <slot :value="currentValue">{{ currentValue }}</slot>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { stepNumber, sepNumber, formatValue } from "@/utils/tools";
import _ from "lodash";
import { iwant } from "@guanyu/shared";

@Component
export default class StepNumber extends Vue {
  /**
   * 目标值
   */
  @Prop({ required: true }) to!: number;
  /**
   * 起始值 不填则沿用上次的值
   */
  @Prop({ required: false, default: null }) from!: number | null;
  /**
   * 变化时长 ms
   */
  @Prop({ default: 1000 }) duration!: number;
  /**
   * 小数精度 默认以最终数字小数位为准
   */
  @Prop({ type: Number }) precision!: number;
  /**
   * v-model
   */
  @Prop() value!: number;

  // 绑定值
  currentValue: unknown = formatValue();

  @Watch("to", { immediate: true })
  changed(val: unknown, oldVal: unknown) {
    if (!_.isNumber(val) || _.isNaN(val)) {
      this.callback(null);
      return;
    }
    let from = 0;
    if (this.from === null) {
      from = iwant.number(oldVal, 0);
    } else {
      from = this.from;
    }
    // 清除上次未完成的值
    if (this.ins) {
      this.ins.clear();
    }
    this.ins = stepNumber(
      {
        to: val,
        from,
        duration: this.duration,
        precision: this.precision,
      },
      this.callback
    );
  }

  callback(n: number | null) {
    this.currentValue = sepNumber(n);
    this.$emit("input", n);
  }
}
</script>
