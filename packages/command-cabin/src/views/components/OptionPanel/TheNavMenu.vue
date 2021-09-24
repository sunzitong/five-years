<template>
  <div class="option-panel animate__animated animate__fadeInUp" v-show="show">
    <ul class="list">
      <template v-for="(item, index) in options">
        <li
          :key="index"
          class="item"
          :class="{ active: $route.path === item.value }"
          @click="toRoute(item.value)"
          :style="{ paddingLeft: item.level * 60 + 54 + 'px' }"
        >
          {{ item.name }}
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { Base } from "@/views/Base";
import { DateScopes } from "@/service/analysis/commandCabin/publicEnum";

@Component
export default class TheNavMenu extends Base {
  DateScopes = DateScopes;
  @Prop({ default: true, type: Boolean }) show!: false;

  options = [
    {
      name: "冠寓指挥中心",
      value: "/home",
      level: 0,
    },
    { name: "拓展盘面详情", value: "", level: 1 },
    { name: "营造盘面详情", value: "/build-the-plate", level: 1 },
    { name: "经营现状详情", value: "", level: 1 },
    {
      name: "冠寓门店指挥中心",
      value: "/project",
      level: 0,
    },
    { name: "门店日常巡检", value: "", level: 1 },
    { name: "门店开业检", value: "", level: 1 },
    {
      name: "返回登录页面",
      value: "/login",
      level: 0,
    },
  ];

  toRoute(value: string) {
    if (value && this.$route.fullPath !== value) {
      this.$router.push(value);
    }
    this.$emit("update:show", false);
  }
}
</script>

<style lang="scss" scoped>
.option-panel {
  color: #90a4c3;
  background: rgba(14, 23, 60, 0.9);
  backdrop-filter: blur(20px);
  font-size: 40px;
}
.option-panel {
  --animate-duration: 100ms;
}
.list {
  min-width: 400px;
  .item {
    display: flex;
    align-items: center;
    padding: 0 100px;
    box-sizing: border-box;
    width: 100%;
    height: 100px;
    cursor: pointer;
    &.active,
    &:hover {
      background: #162c5b;
    }
    &.active {
      color: #01f5f1;
      &::before {
        background: #01f5f1;
      }
    }
    &::before {
      content: "";
      width: 14px;
      height: 14px;
      background: transparent;
      border-radius: 50%;
      margin-right: 32px;
    }
  }
}
</style>
