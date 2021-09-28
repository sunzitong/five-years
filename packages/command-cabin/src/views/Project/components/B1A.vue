<template>
  <div class="page__b1a__map"></div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { Base } from "@/views/Base";
import { AnyObject } from "@guanyu/shared";
import B1B from "./B1B.vue";

@Component({
  components: { B1B },
})
export default class B1A extends Base {
  /**
   * 折线图标题列表
   */
  @Prop({ default: () => [] }) readonly titles!: string[];
  /**
   * 折线图tabs列表
   */
  @Prop({ default: () => [] }) readonly tabs!: string[][];
  /**
   * 折线图数据源
   */
  @Prop({ default: () => ({}) }) readonly list!: AnyObject;
}
</script>

<style lang="scss" scoped></style>
