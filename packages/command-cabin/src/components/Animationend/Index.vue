<template>
  <div class="app-animated">
    <div
      ref="container"
      class="app-animated__list hidden-scrollbar"
      :style="listStyle"
    >
      <slot :list="list"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Ref } from "vue-property-decorator";
import { gsap } from "gsap";
import { iwant } from "@guanyu/shared";

@Component({
  components: {},
})
export default class Animationed extends Vue {
  /**
   * 滚动容器
   */
  @Ref() container!: HTMLDivElement;

  /**
   * 数据来源
   */
  @Prop({ default: () => [] }) dataSource!: any[];

  /**
   * 动画时间
   */
  @Prop({ default: 1 }) duration!: number;

  /**
   * 容器的高度
   */
  @Prop({ default: 200 }) height!: number;

  /**
   * 倒计时
   */
  @Prop({ default: 60000 }) countDown!: number;

  /**
   * 是否开启动画
   */
  @Prop({ default: Number.MAX_VALUE, required: true }) scrollMinCount!: number;

  /**
   * 对数据来源的拷贝
   */
  list: any[] = [];

  /**
   * 是否在运动
   */
  moving = false;

  /**
   * 是否暂停
   */
  pause = false;

  /**
   * 倒计时
   */
  timeout: null | number = null;

  /**
   * 滚动容器的样式
   */
  get listStyle() {
    return `max-height: ${this.height}px`;
  }

  /**
   * 监听数据更新list
   */
  @Watch("dataSource", { deep: true, immediate: true })
  change(val: any) {
    this.list = [...iwant.array(val)];
    this.move();
  }

  /**
   * 动画
   */
  move() {
    // 如果动画暂停返回
    if (this.moving || this.pause) return false;
    /** 如果没有数据不执行动画 */
    if (this.list.length <= this.scrollMinCount) {
      this.moving = false;
      return false;
    }
    this.moving = true;
    this.$nextTick(() => {
      const doms = this.$el.querySelectorAll<HTMLDivElement>("[animated]");
      // const h = doms[0].getBoundingClientRect().height;
      // const h = parseInt(getComputedStyle(doms[0]).height);
      const h = doms[0]?.offsetHeight ?? 0;
      gsap
        .to(doms, { duration: this.duration, y: -h })
        .delay(2)
        .then(() => {
          gsap.set(doms, { y: 0 });
          if (this.list.length > this.scrollMinCount) {
            this.list.push(this.list.shift());
          }
          this.moving = false;
          this.$nextTick(this.move);
        });
    });
  }

  /**
   * 滚动监听
   */
  scrollHandler() {
    this.pause = true;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      // 倒计时结束改为非暂停，然后执行动画
      this.pause = false;
      this.move();
    }, this.countDown);
  }

  /**
   * 组件渲染
   */
  mounted() {
    /** 执行动画 */
    this.move();

    /** 容器滚动时暂停动画 */
    this.container.addEventListener("click", this.scrollHandler);
    this.container.addEventListener("scroll", this.scrollHandler);
  }

  /**
   * 组件卸载
   */
  beforeDestroy() {
    this.container.removeEventListener("click", this.scrollHandler);
    this.container.removeEventListener("scroll", this.scrollHandler);
    this.timeout = null;
  }
}
</script>

<style lang="scss">
.app-animated {
  &__list {
    overflow-y: scroll;
  }
}
</style>
