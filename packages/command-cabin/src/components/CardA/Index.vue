<template>
  <div ref="card" class="app-card-a">
    <CardABackground
      :showHeader="!!title"
      :fill="fill"
      :fillOpacity="opacity"
    />
    <div class="app-card-a__head" v-if="!!title">
      <slot name="title" v-bind="title">
        <h3 class="app-card-a__title">
          {{ title }}
        </h3>
      </slot>
    </div>
    <div class="app-card-a__body">
      <div class="app-card-a__content">
        <slot>
          <p style="text-align: center; padding-top: 50px; opacity: 0.2">
            本期暂无数据
          </p>
        </slot>
      </div>
    </div>
    <div class="app-card-a__debug" v-if="$root.env.DEBUG">
      <p>{{ W }} x {{ H - 23 }} | {{ H }}</p>
      <p v-if="$children[1]" style="font-size: 3em">
        {{ $children[1].$options.name }}
      </p>
    </div>
    <div class="app-card-a__datacycle">
      <span class="mark">
        <slot name="data-cycle"></slot>
      </span>
    </div>
    <div class="app-card-a__extra">
      <slot name="extra"></slot>
      <div v-if="!!dataSourceInner">
        <DataSource>
          {{ dataSourceInner }}
        </DataSource>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import CardABackground from "./CardABackground.vue";
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
  name: "CardA",
  components: {
    CardABackground,
    Icon,
    DataSource,
  },
})
export default class CardA extends Vue {
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
  @Prop({ default: 0.5 }) opacity!: number;

  /**
   * 数据来源
   */
  @Prop({ default: "" }) dataSource!: string;

  /**
   * 数据来源
   */
  @Prop({ default: "#010F41" }) fill!: string;

  W = 0;
  H = 0;

  /**
   * 子组件传过来的数据来源
   */
  dataSourceFromChildren = "";

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
    let s = "";
    let t = "";
    if (from) {
      s = `数据取自${from.toUpperCase()}`;
    }
    if (time) {
      t = ` | 更新时间${time}`;
    }
    this.dataSourceFromChildren = `${s}${t}`;
  }

  mounted() {
    if (this.$root.env.DEBUG) {
      const { width, height } = getComputedStyle(this.card);
      this.W = parseFloat(width);
      this.H = parseFloat(height);
    }
  }
}
</script>

<style lang="scss" scoped>
$title-color: #5180e4;

.app-card-a {
  position: relative;
  &__head {
    position: relative;
    z-index: 10;
    display: flex;
    height: 92px;
    margin: 0 auto;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      height: 1px;
      bottom: 0;
      background: linear-gradient(
        90deg,
        rgba(83, 214, 255, 0.05) 0%,
        rgba(81, 128, 228, 0.5) 49.92%,
        rgba(83, 214, 255, 0.05) 100%
      );
    }
  }
  &__title {
    padding: 0 52px;
    line-height: 92px;
    font-size: 40px;
    color: $title-color;
    text-align: center;
    background: linear-gradient(
      180deg,
      rgba(83, 214, 255, 0) 0%,
      rgba(81, 128, 228, 0.1) 100%
    );
    border-bottom: 2px solid $title-color;
  }

  &__body {
    position: relative;
    z-index: 10;
  }

  &__content {
    position: relative;
    color: #fff;
  }

  &__extra {
    position: absolute;
    top: 34px;
    right: 20px;
    z-index: 11;
    display: flex;
  }

  &__datacycle {
    position: absolute;
    right: 0;
    bottom: 0;
    .mark {
      display: inline-block;
      padding: 0 5px;
      background: #10265b;
      border-radius: 4px;
      font-size: 20px;
      color: #90a4c3;
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
