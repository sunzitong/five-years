<template>
  <svg
    v-if="iconSize"
    :width="iconSize"
    :height="(iconSize * 29) / 51"
    viewBox="0 0 51 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M36 29H0L13.5 13.5C13.353 14.9704 13.9324 18.2829 17.0923 20.9654C17.9622 21.7039 19.1061 22 20.2472 22H37.5C41.366 22 44.5 18.866 44.5 15V13C44.5 6.37258 39.1274 1 32.5 1H22.9854L21.9854 0H36C44.0081 0 50.5 6.49187 50.5 14.5C50.5 22.5081 44.0081 29 36 29Z"
      :fill="`url(#${uuid}_paint0_linear)`"
    />
    <defs>
      <linearGradient
        :id="`${uuid}_paint0_linear`"
        x1="27.75"
        y1="0"
        x2="27.75"
        y2="29"
        gradientUnits="userSpaceOnUse"
      >
        <stop :stop-color="fill[0]" stop-opacity="0.5" />
        <stop offset="1" :stop-color="fill[0]" />
      </linearGradient>
    </defs>
  </svg>
</template>

<script lang="ts">
import { formatColors } from "@/utils/tools";
import { uuid } from "@guanyu/shared";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Back extends Vue {
  /**
   * 图标颜色
   */
  @Prop({ default: "#C8DEFF" }) color!: string | string[];

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
    return formatColors(this.color, 1);
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

  uuid = uuid();
}
</script>
<style lang="scss" scoped></style>
