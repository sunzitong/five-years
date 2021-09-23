<template>
  <SelectWrap :value="options[value]" :title="$attrs.title">
    <template v-slot="{ vm }">
      <ul class="options__list animate__animated animate__fadeInUp">
        <li
          class="options__item"
          v-for="(item, name) in options"
          :key="name"
          :class="{ active: name === value }"
          @click="confirm(vm, name)"
        >
          {{ item }}
        </li>
      </ul>
    </template>
  </SelectWrap>
</template>

<script lang="ts">
import { Base } from "@/views/Base";
import { AnyObject } from "@guanyu/shared";
import { Component, Prop } from "vue-property-decorator";
import { default as OriTheOrgTree } from "../OptionPanel/TheOrgTree.vue";
import SelectWrap from "./SelectWrap.vue";

@Component({
  components: { OriTheOrgTree, SelectWrap },
  inheritAttrs: false,
})
export default class Options extends Base {
  @Prop({ default: "" }) value!: string;

  @Prop({ default: {} }) options!: AnyObject;

  confirm(vm: SelectWrap, name: string) {
    this.$emit("input", name);
    vm.active = false;
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
    &.active {
      background: #102b60;
      color: #01f5f1;
    }
  }
}
</style>
