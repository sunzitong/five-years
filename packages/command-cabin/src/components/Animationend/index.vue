<template>
  <div
    class="app-animated hidden-scrollbar"
    style="height: 100px; overflow-y: scroll"
  >
    <ul class="animate-list">
      <li
        v-for="(item, index) in list"
        :class="{ aaa: index === 0 }"
        :key="`${item.id}`"
      >
        {{ item.id }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { gsap } from "gsap";

@Component({
  components: {},
})
export default class Animationed extends Vue {
  @Prop({ default: [] }) dataSource!: any[];

  list: any[] = [];

  @Watch("dataSource", { deep: true })
  change(val: any) {
    this.list = val;
  }

  move() {
    this.$nextTick(() => {
      gsap
        .to(this.$el.querySelector(".aaa"), {
          overflow: "hidden",
          duration: 1,
          scaleY: 0,
          opacity: 0,
        })
        .delay(1)
        .then(() => {
          this.list.push(this.list.shift());
          this.$nextTick(() => {
            gsap
              .to(this.$el.querySelectorAll("li"), {
                scaleY: 1,
                opacity: 1,
                duration: 0,
              })
              .then(() => {
                this.move();
              });
          });
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
.animate-list {
  height: 200px;
  overflow: hidden;
}
</style>
