<template>
  <div class="option-panel animate__animated animate__fadeInUp" v-show="show">
    <ul class="list">
      <li
        class="item"
        v-for="(item, index) in options"
        :key="item.value"
        @mouseenter="scrollSubList(index)"
      >
        {{ item.name }}
        <van-icon name="arrow" />
        <ul class="sub-list">
          <li
            class="sub-item"
            v-for="value of item.children"
            :key="value"
            @click="setValue(item.value, value)"
          >
            {{ value }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { Base } from "@/views/Base";
import { DateScopes } from "@/service/analysis/commandCabin/publicEnum/enums";
import dayjs from "dayjs";

@Component
export default class TheDateScopes extends Base {
  DateScopes = DateScopes;
  @Prop({ default: true, type: Boolean }) show!: false;

  options = [
    { name: "年累计", value: DateScopes.YEARLY, children: [] as string[] },
    { name: "月累计", value: DateScopes.MONTHLY, children: [] as string[] },
  ];

  created() {
    // 年累: 从2021开始
    const now = dayjs(this.store.env.NOW).startOf("M");
    {
      let start = 2021;
      while (start <= now.year()) {
        this.options[0].children.push(`${start}`);
        start++;
      }
    }
    // 月累: 从2021-01开始
    {
      let start = dayjs("2021");
      while (!start.isAfter(now, "M")) {
        this.options[1].children.push(start.format("YYYY-MM"));
        start = start.add(1, "M");
      }
    }
  }

  /**
   * 选项滚动到底部
   */
  scrollSubList(index: number) {
    this.$nextTick(() => {
      const item = this.$el.querySelectorAll(".sub-list")[index];
      if (item) {
        item.scrollTop = item.scrollHeight;
      }
    });
  }

  /**
   * 更新全局时间
   */
  setValue(scope: DateScopes, value: string) {
    this.store.global.dateScope = scope;
    this.store.global.dateValue = value;
    if (scope === DateScopes.YEARLY) {
      this.store.global.yearValue = value;
    }
    if (scope === DateScopes.MONTHLY) {
      this.store.global.monthValue = value;
    }
    this.$emit("update:show", false);
  }
}
</script>

<style lang="scss" scoped>
.option-panel {
  color: #90a4c3;
  background: rgba(14, 23, 60, 0.9);
  backdrop-filter: blur(10px);
  font-size: 40px;
}
.option-panel {
  --animate-duration: 100ms;
}
.list {
  width: 400px;
  .item {
    @extend %flex-center;
    width: 100%;
    height: 100px;
    cursor: pointer;
    &.active,
    &:hover {
      color: #01f5f1;
    }
    &:hover {
      .sub-list {
        display: block;
      }
    }
    position: relative;
  }
}
.sub-list {
  display: none;
  position: absolute;
  left: 100%;
  bottom: 0;
  width: 400px;
  background: red;
  text-align: center;
  color: #90a4c3;
  max-height: 600px;
  overflow: auto;
  background: transparent;
  padding-left: 2px;
  .sub-item {
    @extend %flex-center;
    width: 100%;
    height: 100px;
    background: rgba(14, 23, 60, 0.9);
    &.active,
    &:hover {
      color: #01f5f1;
      background: #162c5b;
    }
  }
}
</style>
