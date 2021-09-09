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
    </div>
    <div class="app-card__debug" v-if="debug">
      <!-- <p>{{ W }} x {{ H }}</p> -->
      <p>{{ W }} x {{ H - 23 }} | {{ H }}</p>
      <p v-if="$children[1]" style="font-size: 3em">
        {{ $children[1].$options.name }}
      </p>
    </div>
    <div class="app-card__datacycle">
      <span class="mark">
        <slot name="data-cycle"></slot>
      </span>
    </div>
    <div class="app-card__footer" v-if="showFooter">
      <slot name="footer"></slot>
    </div>
    <DataSource v-if="dataSourceInner" :position="dataSourcePosition">
      {{ dataSourceInner }}
    </DataSource>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import CardDecorate from "@/components/CardDecorate/Index.vue";
import Icon from "@/components/Icon/Index.vue";
import DataSource from "@/components/DataSource/Index.vue";

export type SourceType = {
  /**
   * 来源
   */
  from: string;
  /**
   * 更新时间
   */
  time: string;
};

@Component({
  name: "Card",
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
  @Prop({ default: "left bottom" }) dataSourcePosition!: "left bottom";

  W = 0;
  H = 0;

  debug = process.env.NODE_ENV === "development";

  /**
   * 子组件传过来的数据来源
   */
  dataSourceFromChildren = "";

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

  /**
   * 设置数据来源
   */
  get dataSourceInner() {
    /**
     * 如果组件设置了数据来源属性，优先返回props的来源
     * 然后返回子组件调用的数据来源
     */
    return this.dataSource || this.dataSourceFromChildren;
  }

  /**
   * 设置数据来源
   * @param source 来源
   * @param time 时间
   * @returns 数据来源
   */
  setCardDataSource(source: SourceType) {
    const { from, time } = source ?? {};
    if (!from || !time) return;
    this.dataSourceFromChildren = `数据取自${from.toUpperCase()} | 更新时间${time}`;
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

  &__datacycle {
    position: absolute;
    right: 15px;
    bottom: 15px;
    .mark {
      display: inline-block;
      padding: 0 5px;
      background: #10265b;
      border-radius: 10px;
      font-size: 20px;
      color: #777777;
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
