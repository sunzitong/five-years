<template>
  <svg
    v-if="iconSize"
    :width="iconSize"
    :height="(iconSize * 29) / 23"
    viewBox="0 0 23 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.4616 28.4357C5.51419 28.4357 0.692383 23.6228 0.692383 17.6878C0.692383 13.728 4.28181 8.03775 11.4616 0.615234C18.6414 8.03867 22.2308 13.7289 22.2308 17.6878C22.2308 23.6228 17.409 28.4357 11.4616 28.4357Z"
      :fill="`url(#${uuid})`"
    />
    <defs>
      <linearGradient
        :id="uuid"
        x1="11.4616"
        y1="0.615234"
        x2="11.4616"
        y2="28.4357"
        gradientUnits="userSpaceOnUse"
      >
        <stop :stop-color="fill[0]" />
        <stop offset="0.433627" :stop-color="fill[1]" />
        <stop offset="1" :stop-color="fill[2]" />
      </linearGradient>
    </defs>
  </svg>
</template>

<script lang="ts">
import { formatColors } from "@/utils/tools";
import { Component, Prop, Vue } from "vue-property-decorator";
import { uuid } from "@guanyu/shared";

@Component
export default class WaterDrop extends Vue {
  /**
   * 图标颜色
   */
  @Prop({ default: "#729EF9|#729EF9|#2153BF" }) color!: string | string[];

  /**
   * 图标大小
   */
  @Prop({ default: "medium" }) size!: "large" | "medium" | "small" | number;

  /**
   * 填充颜色
   */
  get fill() {
    /**
     * 处理特殊场景
     */
    return formatColors(this.color, 3);
  }

  /**
   * 图标大小
   */
  get iconSize() {
    const sizes = {
      large: 40,
      medium: 28,
      small: 14,
    };
    return sizes[this.size] ?? this.size;
  }

  /**
   * 获取uuid
   */
  uuid = `icon-${uuid()}`;
}
</script>
