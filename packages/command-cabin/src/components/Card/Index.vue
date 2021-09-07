<template>
  <div ref="card" class="app-card" :class="includeFooterCls">
    <CardDecorate
      key="CardDecorate"
      :size="size"
      :type="cardType"
      :showFooter="showFooter"
      :fillOpacity="opacity"
      :showRectBackground="showRectBackground"
    />
    <div class="app-card__head" v-if="!!title">
      <slot name="title" v-bind="title">
        <h3 class="app-card__title">
          {{ title }}
        </h3>
      </slot>
    </div>
    <div class="app-card__body">
      <div class="app-card__content">
        <slot>
          <p style="text-align: center; padding-top: 50px; opacity: 0.2">
            本期暂无数据
          </p>
        </slot>
      </div>
      <DataSource v-if="dataSource" :position="dataSourcePosition">
        {{ dataSource }}
      </DataSource>
    </div>
    <div class="app-card__debug" v-if="debug">
      <!-- <p>{{ W }} x {{ H }}</p> -->
      <p>{{ W }} x {{ H - 23 }} | {{ H }}</p>
      <p v-if="$children[1]" style="font-size: 2em">
        {{ $children[1].$options.name }}
      </p>
    </div>
    <div class="app-card__footer" v-if="showFooter">
      <slot name="footer">
        <a href="javascript::">查看详情→</a>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import CardDecorate from "@/components/CardDecorate/Index.vue";
import Icon from "@/components/Icon/Index.vue";
import DataSource from "@/components/DataSource/Index.vue";

@Component({
  components: {
    CardDecorate,
    Icon,
    DataSource,
  },
})
export default class Card extends Vue {
  @Ref() card!: HTMLDivElement;
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
  @Prop({ default: false }) showRectBackground!: boolean;

  /**
   * 是否显示页脚
   */
  @Prop({ default: false }) showFooter!: boolean;

  /**
   * 是否显示页脚
   */
  @Prop({ default: 1 }) opacity!: number;

  /**
   * 数据来源
   */
  @Prop({ default: "" }) dataSource!: string;

  /**
   * 数据来源位置
   */
  @Prop({ default: "" }) dataSourcePosition!: "right top";

  W = 0;
  H = 0;

  debug = process.env.NODE_ENV === "development";

  /**
   * 是否包含footer
   */
  get includeFooterCls() {
    return {
      "app-card__footer--visible": this.showFooter,
    };
  }

  /**
   * 卡片类型
   */
  get cardType() {
    if (!this.title) {
      return "box-rect";
    }
    return "box";
  }

  mounted() {
    if (this.debug) {
      const { width, height } = getComputedStyle(this.card);
      this.W = parseFloat(width);
      this.H = parseFloat(height);
    }
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
    padding: 24px 0;
    z-index: 10;
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

  &__debug {
    position: absolute;
    pointer-events: none;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: rgba(255, 255, 255, 0.2);
    text-align: center;
  }
}
</style>
