<template>
  <div class="app-data-source" :class="classNamePosition">
    <Icon type="data-source" />
    <span><slot>数据来自龙头</slot></span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Icon from "@/components/Icon/index.vue";

@Component({
  components: {
    Icon,
  },
})
export default class DataSource extends Vue {
  @Prop({ default: "" }) position!:
    | "left top"
    | "left bottom"
    | "right top"
    | "right bottom";

  /**
   * 位置转化为className
   */
  get classNamePosition() {
    if (!this.position) return "";
    const position = this.position.replace(/\s+/g, "-");
    return `app-data-source--${position}`;
  }
}
</script>

<style lang="scss" scoped>
.app-data-source {
  display: flex;
  font-size: 20px;
  align-items: center;
  color: #b4b4b4;
  > span {
    margin-left: 10px;
  }

  &--left-bottom {
    position: absolute;
    left: 24px;
    bottom: 24px;
  }

  &--left-top {
    position: absolute;
    top: 24px;
    left: 24px;
  }

  &--right-top {
    position: absolute;
    top: -24px;
    right: 24px;
  }

  &--right-bottom {
    position: absolute;
    top: 24px;
    right: 24px;
  }
}
</style>
