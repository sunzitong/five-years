<template>
  <div class="text_card">
    <div>
      <slot name="cardTitle"></slot>
    </div>
    <div class="card_bottom">
      <slot name="explan"></slot>
      <em class="part_bottom_left" :style="numColor">{{ num }}</em>
      <span class="part_bottom_right">{{ unit }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import Base from "@/views/Base";
import { Component, Prop } from "vue-property-decorator";

@Component({ components: {} })
export default class TextCard extends Base {
  @Prop({ default: 0 }) num!: number;
  @Prop({ default: "" }) unit!: string;
  @Prop({ default: "color: #232832" }) numColor!: string;
}
</script>

<style lang="scss" scoped>
.card_bottom em {
  margin-right: 2px;
}
.part_top {
  color: rgba(35, 40, 50, 0.7);
  font-size: 12px;
  line-height: 17px;
}
.part_bottom_left {
  font-family: DIN Alternate;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 20px;
}
.part_bottom_right {
  font-size: 12px;
  line-height: 17px;
  color: rgba(35, 40, 50, 0.7);
}
</style>
