<template>
  <ul class="item-layout">
    <li
      class="item-layout__li"
      v-for="(item, index) of data"
      :key="item.key || index + 1"
    >
      <slot :item="item" :index="index + 1"></slot>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ItemLayout extends Vue {
  @Prop({ default: () => [] }) data!: Record<string, any>[];
}
</script>

<style lang="scss" scoped>
.item-layout {
  margin: 0 18px;
}

.item-layout__li {
  margin-bottom: 8px;
  padding: 8px 12px;
  background: #ffffff;
  border: 0.5px solid #f4f3f7;
  background: linear-gradient(90deg, #f7faff 0%, #d8e6fe 100%);
  box-sizing: border-box;
  box-shadow: 0px 0px 14px rgba(240, 226, 226, 0.34);
  border-radius: 2px;
}
</style>
