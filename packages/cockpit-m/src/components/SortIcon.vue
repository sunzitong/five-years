<template>
  <div class="sort-icon-wrap" @click="toggleOrderBy">
    <slot name="label"></slot>
    <div class="sort-icon">
      <van-icon name="play" class="sort-icon__top" :color="getColor('ASC')" />
      <van-icon
        name="play"
        class="sort-icon__bottom"
        :color="getColor('DESC')"
      />
    </div>
  </div>
</template>

示例:
<SortIcon v-model="orderBy" @change="orderByChange"></SortIcon>

<script lang="ts">
import { Component, ModelSync, Prop, Vue } from "vue-property-decorator";

export type OrderBy = "ASC" | "DESC";

@Component
export default class SortIcon extends Vue {
  @Prop({ default: "#999999" }) color!: string;
  @Prop({ default: "#1C7AF7" }) activeColor?: string;

  @ModelSync("orderBy", "change")
  orderByValue?: OrderBy;

  getColor(_orderBy: OrderBy) {
    if (this.orderByValue === _orderBy) {
      return this.activeColor;
    }
    return this.color;
  }

  toggleOrderBy() {
    this.orderByValue = this.orderByValue === "ASC" ? "DESC" : "ASC";
  }
}
</script>

<style lang="scss">
.sort-icon-wrap {
  @extend %flex-center;
}
.sort-icon {
  @extend %flex-center;
  flex-flow: column wrap;
  margin-left: 8px;
}
.sort-icon__top {
  transform-origin: center;
  transform: translateY(25%) rotate(-90deg);
}
.sort-icon__bottom {
  transform-origin: center;
  transform: translateY(-25%) rotate(90deg);
}
</style>
