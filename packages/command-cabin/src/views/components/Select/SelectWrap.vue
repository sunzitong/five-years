<template>
  <div class="select" :class="{ 'select--active': active }">
    <span class="select__title">{{ title }}</span>
    <div class="select__control">
      <div class="select__value" @click="active = !active">
        <input
          type="text"
          readonly
          :value="value"
          class="select__input"
          placeholder="请选择"
        />
        <div class="select__icon">
          <slot name="icon" :active="active">
            <van-icon name="play" class="select__icon--normal" />
          </slot>
        </div>
      </div>
      <div class="select__content" v-if="active">
        <slot :active="active" :vm="this"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SelectWrap extends Vue {
  @Prop() title!: string;
  @Prop() value!: string;
  active = false;
}
</script>
<style lang="scss" scoped>
.select {
  display: inline-block;
  display: flex;
  align-items: center;
  &__title {
    font-size: 40px;
    color: #fff;
    opacity: 0.9;
    margin-right: 40px;
  }
  &__control {
    position: relative;
    width: 764px;
    height: 90px;
  }
  &__icon {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 24px;
    width: 42px;
    height: 42px;
    margin: auto;
  }
  color: #90a4c3;
  &--active {
    color: #01f5f1;
  }
  &__icon--normal {
    transform: rotate(-90deg);
    transition: 0.4s;
  }
  &--active &__icon--normal {
    transform: rotate(90deg);
  }

  &__value {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  &__input {
    width: 100%;
    height: 100%;
    cursor: pointer;
    background: transparent;
    border: 2px solid rgba(144, 164, 195, 0.8);
    box-sizing: border-box;
    border-radius: 10px;
    font-size: 40px;
    padding: 0 84px 0 50px;
    &::selection {
      background: transparent;
    }
  }

  &__content {
    position: absolute;
    min-width: 100%;
    bottom: calc(100% + 80px);
    left: 0;
  }
}
</style>
