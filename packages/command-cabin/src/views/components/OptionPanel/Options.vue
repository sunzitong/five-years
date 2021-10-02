<template>
  <div class="option-panel animate__animated animate__fadeInUp" v-show="show">
    <ul class="list">
      <li
        class="item"
        v-for="(item, key) in options"
        :key="key"
        :class="{ active: value === key }"
        @click="setValue(key)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { Base } from "@/views/Base";
import { DateScopes } from "@/service/analysis/commandCabin/publicEnum/enums";

@Component
export default class Options extends Base {
  @Prop({ default: true, type: Boolean }) show!: false;

  @Prop({
    default: () => {
      /**/
    },
  })
  options!: any;

  @Prop() value!: any;

  setValue(value: DateScopes) {
    this.$emit("update:show", false);
    this.$emit("input", value);
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
  width: 400px;
  .item {
    @extend %flex-center;
    width: 100%;
    height: 100px;
    cursor: pointer;
    &.active {
      color: #01f5f1;
    }
  }
}
</style>
