<template>
  <div class="app-animated">
    <div class="app-animated__list hidden-scrollbar">
      <slot :list="list"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { gsap } from "gsap";

@Component({
  components: {},
})
export default class Animationed extends Vue {
  /**
   * 数据来源
   */
  @Prop({ default: [] }) dataSource!: any[];

  /**
   * 动画时间
   */
  @Prop({ default: 1 }) duration!: number;

  /**
   * 对数据来源的拷贝
   */
  list: any[] = [];

  /**
   * 监听数据更新list
   */
  @Watch("dataSource", { deep: true })
  change(val: any) {
    this.list = [...val];
  }

  /**
   * 动画
   */
  move() {
    this.$nextTick(() => {
      const doms = this.$el.querySelectorAll(".aaaa");
      if (Array.isArray(this.list) && this.list.length === 0) {
        return false;
      }
      gsap.set(doms, { scaleY: 1, opacity: 1 });
      gsap
        .to(doms[0], {
          duration: this.duration,
          scaleY: 0,
          opacity: 0,
        })
        .delay(1)
        .then(() => {
          this.list.push(this.list.shift());
          this.$nextTick(this.move);
        });
    });
  }

  mounted() {
    this.list = this.dataSource;
    this.move();
  }
}
</script>

<style lang="scss">
.app-animated {
  &__list {
    height: 200px;
    overflow-y: scroll;
  }
}
</style>
