<template>
  <div class="input-part">
    <span class="left">{{ title }}</span>
    <van-cell-group>
      <van-field
        :value="value"
        @input="$listeners.input"
        type="number"
        placeholder="请输入..."
      />
    </van-cell-group>
    <span class="unit">{{ unit }}</span>

    <Tooltip :title="title" :content="content" style="margin-left: 4px" />
  </div>
</template>

<script lang="ts">
import Base from "@/views/Base";
import { Component, Prop } from "vue-property-decorator";
import Tooltip from "@/components/Tooltip.vue";

@Component({
  components: {
    Tooltip,
  },
})
export default class InputItem extends Base {
  /**
   * 标题
   */
  @Prop({ default: () => "" }) readonly title!: string;
  /**
   * 弹窗内容
   */
  @Prop({ default: () => "" }) readonly content!: string;
  /**
   * input输入内容
   */
  @Prop() readonly value!: number;
  /**
   * 单位
   */
  @Prop({ default: () => "" }) readonly unit!: string;

  changeValue(e: any) {
    console.log(e.target.value, typeof e.target.value);
    this.$emit("input", e.target.value ? +e.target.value : undefined);
  }
}
</script>

<style lang="scss" scoped>
.input-part {
  display: flex;
  flex-flow: row;
  align-items: center;
  height: 36px;
  margin-bottom: 8px;

  span.left {
    flex: 56%;
  }
  span.unit {
    width: 6%;
  }
}

::v-deep {
  .van-cell-group {
    width: 50%;
    margin-right: 8px;

    border: 1px solid #eaeaea;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 3px;
    outline: none;
    text-align: center;
  }

  .van-cell-group::after {
    border-color: transparent;
  }
  .van-field__control {
    text-align: center;
    font-size: 14px;
    color: #000000;
  }
}
</style>
<style lang="scss">
#app .input-part .van-cell {
  padding: 0;
}
</style>
