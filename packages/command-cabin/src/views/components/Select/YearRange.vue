<template>
  <SelectWrap :value="strValue" :title="$attrs.title">
    <template v-slot="{ vm }">
      <div class="year-range">
        <van-tabs
          v-model="tab"
          title-inactive-color="#90A4C3"
          background="rgba(14, 23, 60, 0.6)"
          title-active-color="#fff"
          :line-width="0"
        >
          <van-tab title="开始年份">
            <van-grid :column-num="3" :border="false" clickable>
              <van-grid-item
                v-for="n in options"
                :key="n"
                :text="`${n}`"
                :class="{
                  active: localValue[0] === n,
                  disabled: localValue[1] && n > localValue[1],
                }"
                @click="setValue(0, n)"
              />
            </van-grid>
          </van-tab>
          <van-tab title="结束年份">
            <van-grid :column-num="3" :border="false">
              <van-grid-item
                v-for="n in options"
                :key="n"
                :text="`${n}`"
                :class="{
                  active: localValue[1] === n,
                  disabled: localValue[0] && n < localValue[0],
                }"
                @click="setValue(1, n)"
              />
            </van-grid>
          </van-tab>
        </van-tabs>
        <van-button class="confirm" block color="#102B60" @click="confirm(vm)">
          确定
        </van-button>
      </div>
    </template>
  </SelectWrap>
</template>

<script lang="ts">
import { Base } from "@/views/Base";
import { Component, Prop } from "vue-property-decorator";
import { default as OriTheOrgTree } from "../OptionPanel/TheOrgTree.vue";
import SelectWrap from "./SelectWrap.vue";

@Component({
  components: { OriTheOrgTree, SelectWrap },
  inheritAttrs: false,
})
export default class YearRange extends Base {
  @Prop() value!: number[];

  /**
   * select组件显示值
   */
  get strValue() {
    return this.value.join("-");
  }

  /**
   * 临时存储值
   */
  localValue: (number | null)[] = [null, null];

  /**
   * tab切换
   */
  tab = 0;

  /**
   * 年选项
   */
  options: number[] = [];

  created() {
    let i = 0;
    while (this.options.length < 12) {
      this.options.push(2016 + i);
      i++;
    }
    this.$set(this.localValue, 0, this.value[0] ?? null);
    this.$set(this.localValue, 1, this.value[1] ?? null);
  }

  confirm(vm: SelectWrap) {
    vm.active = false;
    this.$emit("input", this.localValue);
    this.tab = 0;
  }

  setValue(index: number, value: number) {
    if (this.localValue[index] === value) {
      this.$set(this.localValue, index, null);
    } else {
      this.$set(this.localValue, index, value);
      if (index === 0) {
        setTimeout(() => {
          this.tab = 1;
        }, 400);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.year-range {
  color: #90a4c3;

  &::v-deep {
    .van-tabs__wrap {
      height: 100px;
    }
    .van-tab {
      &--active {
        background: #0d1537;
      }
      &__text {
        font-size: 40px;
        line-height: 40px;
      }
    }

    .van-grid-item {
      height: 100px;
      cursor: pointer;
      user-select: none;
      &__content {
        background: #0d1537;
      }
      &__text {
        font-size: 40px;
        color: #90a4c3;
      }
      /* 选中的颜色 */
      &.active {
        .van-grid-item__text {
          color: #01f5f1;
        }
      }
      &.disabled {
        .van-grid-item__text {
          color: #353e4c;
        }
      }
    }

    .van-button {
      font-size: 40px;
      height: 100px;
      &__text {
        color: #90a4c3;
      }
    }
  }
}
</style>
