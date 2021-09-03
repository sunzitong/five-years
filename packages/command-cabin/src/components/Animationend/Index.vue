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
  @Prop({ default: [] }) dataSource!: any[];

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
  @Prop({ default: 20000 }) countDown!: number;

  /**
   * 对数据来源的拷贝
   */
  list: any[] = [];

  /**
   * 是否在运动
   */
  moving = true;

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
    return `height: ${this.height}px`;
  }

  /**
   * 监听数据更新list
   */
  @Watch("dataSource", { deep: true })
  change(val: any) {
    this.list = [...val];
    if (!this.moving) {
      this.move();
    }
  }

  /**
   * 是否暂停
   */
  @Watch("pause")
  onPause(val: boolean) {
    /**
     * 页面加载进来不执行
     * 暂停的时候才走倒计
     */
    if (val) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        // 倒计时结束改为非暂停，然后执行动画
        this.pause = false;
        this.move();
      }, this.countDown);
    }
  }

  /**
   * 动画
   */
  move() {
    // 如果动画暂停返回
    if (!this.moving || this.pause) return false;
    /** 如果没有数据不执行动画 */
    if (Array.isArray(this.list) && this.list.length === 0) {
      this.moving = false;
      return false;
    }
    this.$nextTick(() => {
      const doms = this.$el.querySelectorAll(".aaaa");
      this.moving = true;
      gsap
        .to(doms[0], {
          duration: this.duration,
          scaleY: 0,
          opacity: 0,
        })
        .delay(1)
        .then(() => {
          gsap.set(doms, { scaleY: 1, opacity: 1 });
          this.list.push(this.list.shift());
          this.$nextTick(this.move);
        });
    });
  }

  /**
   * 滚动监听
   */
  scrollHandler() {
    this.pause = true;
  }

  /**
   * 组件渲染
   */
  mounted() {
    /** 更新list */
    this.list = this.dataSource;

    /** 执行动画 */
    this.move();

    /** 容器滚动时暂停动画 */
    this.container.addEventListener("scroll", this.scrollHandler);
  }

  /**
   * 组件卸载
   */
  unmounted() {
    this.container.removeEventListener("scroll", this.scrollHandler);
    this.timeout = null;
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
