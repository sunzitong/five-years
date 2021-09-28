<template>
  <SelectWrap
    :value="valueString"
    :title="$attrs.title"
    @close="onClose"
    :placeholder="$attrs.placeholder"
  >
    <template v-slot="{ vm }">
      <ul class="options__list animate__animated animate__fadeInUp">
        <li
          class="options__item"
          v-for="(item, name) in options"
          :key="name"
          :class="{ active: localValue.includes(name) }"
          @click="select(vm, name)"
        >
          <van-icon name="success" v-if="multiple" class="icon" />
          {{ item }}
        </li>
      </ul>
    </template>
  </SelectWrap>
</template>

<script lang="ts">
import { Base } from "@/views/Base";
import { AnyObject } from "@guanyu/shared";
import { Component, Prop, Watch } from "vue-property-decorator";
import { default as OriTheOrgTree } from "../OptionPanel/TheOrgTree.vue";
import SelectWrap from "./SelectWrap.vue";

@Component({
  components: { OriTheOrgTree, SelectWrap },
  inheritAttrs: false,
})
export default class Options extends Base {
  @Prop({ default: "" }) value!: string | string[];

  /**
   * 多选
   */
  @Prop({ default: false, type: Boolean }) multiple!: boolean;

  @Prop({ default: {} }) options!: AnyObject;

  localValue: string[] = [];

  get valueString() {
    const val: string[] = [];
    this.localValue.forEach((local) => {
      val.push(this.options[local]);
    });
    return val.join(",");
  }

  onClose() {
    if (this.multiple) {
      this.confirm();
    }
  }

  @Watch("value", { deep: true, immediate: true })
  valueChanged() {
    if (Array.isArray(this.value)) {
      this.localValue = this.value;
    } else {
      this.localValue = this.value ? [this.value] : [];
    }
  }

  select(vm: SelectWrap, name: string) {
    if (this.multiple) {
      if (this.localValue.includes(name)) {
        this.localValue = this.localValue.filter((val) => val != name);
      } else {
        this.localValue.push(name);
      }
    } else {
      this.localValue = [name];
      this.confirm(vm);
    }
  }

  confirm(vm?: SelectWrap) {
    if (this.multiple) {
      this.$emit("input", this.localValue);
    } else {
      this.$emit("input", this.localValue[0]);
    }
    if (vm) {
      vm.active = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.options {
  &__list {
    --animate-duration: 100ms;
    background: rgba(14, 23, 60, 0.9);
    backdrop-filter: blur(20px);
    font-size: 40px;
    color: #90a4c3;
    user-select: none;
  }
  &__item {
    line-height: 100px;
    padding: 0 54px;
    cursor: pointer;
    &.active,
    &:hover {
      background: #102b60;
    }
    .icon {
      opacity: 0;
    }
    &.active {
      .icon {
        opacity: 1;
      }
      color: #01f5f1;
    }
  }
}
</style>
