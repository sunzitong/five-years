<template>
  <div class="app-spin" :style="formatStyle">
    <div class="loading" v-if="loading">
      <NoData />
      <p>加载中...</p>
    </div>
    <div class="empty" v-else-if="empty">
      <NoData />
      <p>暂无相关数据</p>
    </div>
    <div
      class="spin-content"
      :style="{ visibility: loading || empty ? 'hidden' : null }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { uuid } from "@guanyu/shared";
import { Component, Prop, Vue } from "vue-property-decorator";
import NoData from "./components/NoData.vue";

@Component({
  name: "Spin",
  components: {
    NoData,
  },
})
export default class Spin extends Vue {
  /**
   * 加载
   */
  @Prop({ default: false, type: Boolean }) loading!: boolean;

  /**
   * 是否数据为空
   */
  @Prop({ default: false, type: Boolean }) empty!: boolean;

  /**
   * 高度
   */
  @Prop() height!: number | string;

  get formatStyle() {
    if (this.height !== undefined) {
      if (Number.isNaN(+this.height)) {
        return { height: this.height };
      }
      return { height: this.height + "px" };
    }
    return null;
  }

  uuid = `spin-${uuid()}`;
}
</script>

<style lang="scss" scoped>
.app-spin {
  position: relative;
  .empty,
  .loading {
    position: absolute;
    @extend %flex-center;
    flex-flow: column;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    backdrop-filter: blur(10px);
    font-size: 24px;
    color: #90a4c3;
  }
}
</style>
