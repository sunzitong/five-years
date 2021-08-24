<template>
  <component
    v-bind:is="currentIconComponent"
    :type="type"
    :size="size"
    :color="color"
  />
</template>

<script lang="ts">
import { Component, Prop, Provide, Vue } from "vue-property-decorator";
import { formatColorStr } from "@/utils/tools";
import AsceAndDesc from "./components/AsceAndDesc.vue";
import DataSource from "./components/DataSource.vue";
import Light from "./components/Light.vue";
import Trangle from "./components/Trangle.vue";
import Call from "./components/Call.vue";
import TurnBack from "./components/TurnBack.vue";
import TouchVersion from "./components/TouchVersion.vue";
import SearchVersion from "./components/SearchVersion.vue";

@Component({
  components: {
    AsceAndDesc,
    DataSource,
    Light,
    Trangle,
    Call,
    TurnBack,
    TouchVersion,
    SearchVersion,
  },
})
export default class Icon extends Vue {
  /**
   * 工具函数
   */
  @Provide() formatColorStr = formatColorStr;

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
    | "touch-version"
    | "search-version"
    | "trangle";

  /**
   * 图标颜色
   */
  @Prop() color!: string;

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
      "touch-version": TouchVersion,
      "search-version": SearchVersion,
      "turn-back": TurnBack,
      "data-source": DataSource,
    };
    return conponents[this.type] ?? null;
  }
}
</script>
