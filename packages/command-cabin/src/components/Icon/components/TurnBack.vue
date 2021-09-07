<template>
  <svg
    :width="iconSize"
    :height="iconSize"
    viewBox="0 0 121 121"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse
      cx="63.0807"
      cy="62.7174"
      rx="34.1686"
      ry="34.1686"
      :fill="fill[1]"
    />
    <path
      d="M60.459 7.19678C31.6777 7.19678 8.11133 30.6108 8.11133 59.5444C8.11133 88.3257 31.5137 111.88 60.4473 111.88C89.3809 111.88 112.783 88.478 112.783 59.5444C112.795 30.7632 89.3926 7.19678 60.459 7.19678ZM89.709 81.4116C89.6973 82.1499 89.0879 82.7476 88.3379 82.7476C87.6816 82.7476 87.1309 82.2905 87.002 81.6577C86.9785 81.5757 86.0879 77.5327 82.2676 73.5601C77.4043 68.4976 69.8691 65.7202 60.4238 65.4741V76.4663C60.4238 76.9819 60.1309 77.439 59.6738 77.6733C59.2168 77.9077 58.666 77.8608 58.2441 77.5679L32.0176 58.7593C31.9004 58.6772 31.7949 58.5718 31.7129 58.4546C31.2793 57.8452 31.4199 57.0132 32.0176 56.5796L58.2441 37.7007C58.666 37.396 59.2168 37.3608 59.6738 37.5835C60.1309 37.8179 60.4121 38.2749 60.4238 38.7905V50.4624C63.1426 50.5679 65.8496 50.978 68.4746 51.6694C73.9121 53.0991 78.4355 55.5835 81.9043 59.0757C87.248 64.4194 89.873 71.9429 89.709 81.4116Z"
      :fill="fill[0]"
    />
  </svg>
</template>

<script lang="ts">
import { formatColors } from "@/utils/tools";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TurnBack extends Vue {
  /**
   * 图标颜色
   */
  @Prop({ default: "#00A1FF" }) color!: string | string[];

  /**
   * 图标大小
   */
  @Prop({ default: "medium" }) size!: "large" | "medium" | "small" | number;

  /**
   * 填充颜色
   */
  get fill() {
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
}
</script>
