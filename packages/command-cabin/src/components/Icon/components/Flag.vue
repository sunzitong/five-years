<template>
  <svg
    :width="iconSize"
    :height="(iconSize * 43) / 38"
    viewBox="0 0 38 43"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23 1.97848C17.375 -1.02121 11 -0.271261 8 1.97848V22.9788C9.375 21.7288 14 19.9038 21.5 22.6038C29 25.3038 35.125 22.9788 37.25 21.4788V0.853793C30.95 3.85379 25.125 2.85358 23 1.97848Z"
      :fill="fill[0]"
    />
    <path
      d="M22.2216 5.69326C22.3224 5.44231 22.6776 5.44231 22.7784 5.69325L24.3695 9.65547C24.4124 9.76233 24.5127 9.8352 24.6276 9.84299L28.8876 10.1318C29.1574 10.1501 29.2671 10.488 29.0596 10.6614L25.783 13.399C25.6947 13.4728 25.6563 13.5907 25.6844 13.7024L26.7261 17.8431C26.7921 18.1054 26.5047 18.3142 26.2757 18.1704L22.6595 15.9001C22.562 15.8389 22.438 15.8389 22.3405 15.9001L18.7243 18.1704C18.4953 18.3142 18.2079 18.1054 18.2739 17.8431L19.3156 13.7024C19.3437 13.5907 19.3053 13.4728 19.217 13.399L15.9404 10.6614C15.7329 10.488 15.8426 10.1501 16.1124 10.1318L20.3724 9.84299C20.4873 9.8352 20.5876 9.76233 20.6305 9.65547L22.2216 5.69326Z"
      :fill="fill[1]"
    />
    <path
      d="M0 5.25C0 4.14543 0.895431 3.25 2 3.25H4.5V41C4.5 42.1046 3.60457 43 2.5 43H2C0.89543 43 0 42.1046 0 41V5.25Z"
      :fill="fill[0]"
    />
  </svg>
</template>

<script lang="ts">
import { formatColors } from "@/utils/tools";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Flag extends Vue {
  /**
   * 图标颜色
   */
  @Prop({ default: "#00A1FF|#D4E7FF|" }) color!: string | string[];

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
}
</script>
