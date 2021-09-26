<template>
  <svg
    :width="iconSize"
    :height="(iconSize * 87) / 93"
    viewBox="0 0 93 87"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="69.092" cy="37.2653" r="11.2653" fill="#16945C" />
    <ellipse
      rx="23.9388"
      ry="34.148"
      transform="matrix(1 0 0 -1 69.0916 85.4951)"
      fill="#16945C"
    />
    <circle cx="34" cy="16" r="16" fill="#4DC8AA" />
    <mask
      :id="`${uuid}_1`"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="22"
      width="68"
      height="65"
    >
      <path
        d="M0 83C0 85.2091 1.79086 87 4 87H64C66.2091 87 68 85.2091 68 83V22H0V83Z"
        :fill="fill[0]"
      />
    </mask>
    <g :mask="`url(#${uuid}_1)`">
      <path
        d="M68 84.5C68 57.7142 52.7777 36 34 36C15.2223 36 0 57.7142 0 84.5C0 111.286 15.2223 133 34 133C52.7777 133 68 111.286 68 84.5Z"
        :fill="fill[1]"
      />
    </g>
  </svg>
</template>

<script lang="ts">
import { formatColors } from "@/utils/tools";
import { Component, Prop, Vue } from "vue-property-decorator";
import { uuid } from "@guanyu/shared";

@Component
export default class Users extends Vue {
  /**
   * 图标颜色
   */
  @Prop({ default: "#C4C4C4|#4DC8AA" }) color!: string | string[];

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
    return formatColors(this.color, 2);
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
