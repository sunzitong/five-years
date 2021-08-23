<template>
  <div class="app-card" :class="includeFooterCls">
    <!-- SVG 背景没有footer -->
    <CardDecorateWithFooter
      key="CardDecorateWithFooter"
      v-if="showFooter"
      :size="size"
      :fillOpacity="opacity"
      :showRectBackground="showRectBackground"
    />
    <CardDecorate
      key="CardDecorate"
      v-else
      :size="size"
      :fillOpacity="opacity"
      :showRectBackground="showRectBackground"
    />
    <div class="app-card__head">
      <slot name="title" v-bind="title">
        <h3 class="app-card__title">{{ title }}</h3>
      </slot>
    </div>
    <div class="app-card__body">
      <div class="app-card__content">
        <slot>
          <p>这里是body区域</p>
          <p>这里是body区域</p>
          <p>这里是body区域</p>
          <p>这里是body区域</p>
          <p>这里是body区域</p>
        </slot>
      </div>
    </div>
    <div class="app-card__footer" v-if="showFooter">
      <slot name="footer">
        <a href="javascript::">查看详情→</a>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import CardDecorateWithFooter from "@/components/CardDecorate/WithFooter.vue";
import CardDecorate from "@/components/CardDecorate/index.vue";

@Component({
  components: {
    CardDecorate,
    CardDecorateWithFooter,
  },
})
export default class Card extends Vue {
  /**
   * 标题
   */
  @Prop({ default: "" }) title!: string;

  /**
   * 尺寸
   */
  @Prop({ default: "medium" }) size!: "small" | "medium" | "large";

  /**
   * 是否显示方格背景
   */
  @Prop({ default: true }) showRectBackground!: boolean;

  /**
   * 是否显示页脚
   */
  @Prop({ default: true }) showFooter!: boolean;

  /**
   * 是否显示页脚
   */
  @Prop({ default: 1 }) opacity!: number;

  /**
   * 是否包含footer
   */
  get includeFooterCls() {
    return {
      "app-card__footer--visible": this.showFooter,
    };
  }
}
</script>

<style lang="scss" scoped>
.app-card {
  position: relative;
  min-width: 340px;
  &__head {
    position: relative;
    z-index: 10;
    display: flex;
    height: 70px;
    margin: 0 auto;
  }
  &__title {
    margin: 5px auto auto;
    font-size: 36px;
    color: #fff;
  }

  &__body {
    position: relative;
    padding: 30px 0;
  }

  &__content {
    position: relative;
    color: #fff;
  }

  &__footer {
    height: 60px;
    position: absolute;
    right: 20px;
    bottom: 0;
    width: 210px;
    text-align: center;
    overflow: hidden;
    line-height: 60px;
    color: #fff;
    a {
      color: #fff;
    }
  }

  &__footer--visible {
    .app-card__body {
      padding-bottom: 80px;
    }
  }
}
</style>
