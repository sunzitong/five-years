<template>
  <svg
    v-if="iconSize"
    class="app-icon__datasource"
    :width="iconSize"
    :height="iconSize"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.5 0H17.5C18.8808 0 20 1.11878 20 2.49881V17.4917C20 18.8718 18.8808 19.9905 17.5 19.9905H2.5C1.11931 19.9905 0 18.8718 0 17.4917V2.49881C0 1.11878 1.11931 0 2.5 0Z"
      :fill="fill[0]"
    />
    <path
      d="M17.5 19.9905H2.5C1.1215 19.9905 0 18.8695 0 17.4917V2.49881C0 1.12097 1.1215 0 2.5 0H17.5C18.8785 0 20 1.12097 20 2.49881V17.4917C20 18.8695 18.8785 19.9905 17.5 19.9905ZM2.5 1.87411C2.15538 1.87411 1.875 2.15435 1.875 2.49881V17.4917C1.875 17.8361 2.15538 18.1164 2.5 18.1164H17.5C17.8446 18.1164 18.125 17.8361 18.125 17.4917V2.49881C18.125 2.15435 17.8446 1.87411 17.5 1.87411H2.5Z"
      :fill="fill[0]"
    />
    <path
      d="M10 15.3032C9.48225 15.3032 9.0625 14.8837 9.0625 14.3662V5.62968C9.0625 5.11218 9.48225 4.69263 10 4.69263C10.5177 4.69263 10.9375 5.11218 10.9375 5.62968V14.3662C10.9375 14.8837 10.5177 15.3032 10 15.3032ZM14.0625 15.3041C13.5448 15.3041 13.125 14.8846 13.125 14.3671V8.22001C13.125 7.70251 13.5448 7.28296 14.0625 7.28296C14.5802 7.28296 15 7.70251 15 8.22001V14.3671C15 14.8846 14.5802 15.3041 14.0625 15.3041ZM5.9375 15.3041C5.41975 15.3041 5 14.8845 5 14.367V10.5669C5 10.0494 5.41975 9.62984 5.9375 9.62984C6.45525 9.62984 6.875 10.0494 6.875 10.5669V14.367C6.875 14.8845 6.45525 15.3041 5.9375 15.3041Z"
      :fill="fill[1]"
    />
  </svg>
</template>

<script lang="ts">
import { formatColors } from "@/utils/tools";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class DataSource extends Vue {
  /**
   * 图标颜色
   */
  @Prop({ default: "#4988FD" }) color!: string | string[];

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
