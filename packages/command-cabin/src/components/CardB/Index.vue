<template>
  <div ref="card" class="app-card-b">
    <CardABackground :fill="fill" :stroke="stroke" :fillOpacity="fillOpacity" />
    <div class="app-card-b__body">
      <div class="app-card-b__content">
        <slot>
          <p style="text-align: center; padding-top: 50px; opacity: 0.2">
            本期暂无数据
          </p>
        </slot>
      </div>
    </div>
    <div class="app-card-b__debug" v-if="debug">
      <p>{{ W }} x {{ H - 23 }} | {{ H }}</p>
      <p v-if="$children[1]" style="font-size: 3em">
        {{ $children[1].$options.name }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import CardABackground from "./CardBBackground.vue";
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
  name: "CardB",
  components: {
    CardABackground,
    Icon,
    DataSource,
  },
})
export default class CardB extends Vue {
  @Ref() card!: HTMLDivElement;

  /**
   * 填充颜色
   */
  @Prop({ default: "#113069" }) fill!: string;

  /**
   * 边框颜色
   */
  @Prop({ default: "#0C265E" }) stroke!: string;

  /**
   * 透明度
   */
  @Prop({ default: 0.6 }) fillOpacity!: number;

  W = 0;
  H = 0;

  debug = process.env.NODE_ENV === "development";

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
$title-color: #5180e4;

.app-card-b {
  position: relative;
  &__body {
    position: relative;
    padding: 15px;
    z-index: 10;
  }

  &__content {
    position: relative;
    color: #fff;
    min-height: 200px;
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
