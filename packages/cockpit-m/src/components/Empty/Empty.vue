<template>
  <van-empty
    v-bind="{
      description: '暂无数据',
      image: emptyImage || 'search',
      ...$attrs,
    }"
  >
    <slot></slot>
    <template #image>
      <slot name="image"></slot>
    </template>
    <template #description>
      <slot name="description"></slot>
    </template>
  </van-empty>
</template>

<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";

@Component({
  name: "Empty",
  inheritAttrs: false,
})
export default class Empty extends Vue {
  /**
   * 空数据默认图片
   */
  @Inject() emptyImage!: string;
}
</script>
