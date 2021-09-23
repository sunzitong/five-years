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
import VersionTouch from "./components/VersionTouch.vue";
import VersionSearch from "./components/VersionSearch.vue";
import VersionMetting from "./components/VersionMetting.vue";
import Camera from "./components/Camera.vue";
import WaterDrop from "./components/WaterDrop.vue";
import Lightning from "./components/Lightning.vue";
import Door from "./components/Door.vue";
import Arrow from "./components/Arrorw.vue";
import Funnel from "./components/Funnel.vue";
import Flag from "./components/Flag.vue";
import Map from "./components/Map.vue";
import Corner from "./components/Corner.vue";
import Brand from "./components/Brand.vue";
import Users from "./components/Users.vue";
import Income from "./components/Income.vue";
import RoomNumber from "./components/RoomNumber.vue";
import NumberOfOpeningRooms from "./components/NumberOfOpeningRooms.vue";
import YearIncome from "./components/YearIncome.vue";
import Energy from "./components/Energy.vue";
import Warning from "./components/Warning.vue";
import Security from "./components/Security.vue";
import Checked from "./components/Checked.vue";
import ArrowBold from "./components/ArrorwBold.vue";
import Back from "./components/Back.vue";

const conponents = {
  asce: AsceAndDesc,
  desc: AsceAndDesc,
  light: Light,
  trangle: Trangle,
  call: Call,
  camera: Camera,
  lightning: Lightning,
  door: Door,
  funnel: Funnel,
  flag: Flag,
  map: Map,
  brand: Brand,
  users: Users,
  income: Income,
  warning: Warning,
  checked: Checked,
  security: Security,
  back: Back,
  "year-income": YearIncome,
  "number-of-opening-rooms": NumberOfOpeningRooms,
  "room-number": RoomNumber,
  "corner-top": Corner,
  "corner-left": Corner,
  "corner-right": Corner,
  "corner-bottom": Corner,
  "arrow-top": Arrow,
  "arrow-left": Arrow,
  "arrow-right": Arrow,
  "arrow-bottom": Arrow,
  "water-drop": WaterDrop,
  "version-touch": VersionTouch,
  "version-search": VersionSearch,
  "version-metting": VersionMetting,
  "turn-back": TurnBack,
  "data-source": DataSource,
  energy: Energy,
  "arrow-bold-top": ArrowBold,
  "arrow-bold-right": ArrowBold,
  "arrow-bold-bottom": ArrowBold,
  "arrow-bold-left": ArrowBold,
};

@Component({
  components: {
    AsceAndDesc,
    DataSource,
    Light,
    Trangle,
    Call,
    TurnBack,
    VersionTouch,
    VersionSearch,
    VersionMetting,
    Camera,
    WaterDrop,
    Lightning,
    Door,
    Arrow,
    Funnel,
    Flag,
    Map,
    Corner,
    Brand,
    Users,
    Income,
    RoomNumber,
    NumberOfOpeningRooms,
    YearIncome,
    Energy,
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
  @Prop({ required: true }) type!: keyof typeof conponents;

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
    return conponents[this.type] ?? null;
  }
}
</script>
