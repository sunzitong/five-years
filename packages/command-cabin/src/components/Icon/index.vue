<template>
  <component
    v-bind:is="currentIconComponent"
    :type="type"
    :size="size"
    :color="color"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import AsceAndDesc from "./components/AsceAndDesc.vue";
import DataSource from "./components/DataSource.vue";
import Light from "./components/Light.vue";
import Trangle from "./components/Trangle.vue";
import Call from "./components/Call.vue";
import TurnBack from "./components/TurnBack.vue";
import Touch from "./components/Touch.vue";

@Component({
  components: {
    AsceAndDesc,
    DataSource,
    Light,
    Trangle,
    Call,
    TurnBack,
    Touch,
  },
})
export default class Icon extends Vue {
  /**
   * 图标类型
   * 提升：asce
   * 下降：desc
   * 数据来源：data-source
   * 灯：light
   * 三角形：trangle
   */
  @Prop({ required: true }) type!:
    | "desc"
    | "asce"
    | "data-source"
    | "light"
    | "call"
    | "turn-back"
    | "touch"
    | "trangle";

  /**
   * 图标颜色
   */
  @Prop({ required: true, default: "#01F5F1" }) color!: string;

  /**
   * 图标大小
   */
  @Prop({ default: "medium" }) size!: "large" | "medium" | "small" | number;

  /**
   * 获取动态组件
   */
  get currentIconComponent() {
    const conponents = {
      asce: AsceAndDesc,
      desc: AsceAndDesc,
      light: Light,
      trangle: Trangle,
      call: Call,
      touch: Touch,
      "turn-back": TurnBack,
      "data-source": DataSource,
    };
    return conponents[this.type] ?? null;
  }
}
</script>
