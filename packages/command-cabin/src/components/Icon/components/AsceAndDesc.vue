<template>
  <svg
    :class="cls"
    :width="iconSize"
    :height="iconSize / 2"
    viewBox="0 0 28 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.8944 0.414886H26.3264C26.6087 0.414886 27.1076 0.70425 27.3001 0.907785C27.3979 0.958187 27.2245 0.83019 27.3001 0.907785C27.5047 1.11447 27.8586 1.58716 27.8364 1.87745L27.8344 8.32871C27.8344 8.88719 27.3797 9.34174 26.8213 9.34174C26.263 9.34174 25.8084 8.88715 25.8084 8.32871V4.21511L16.5367 13.2947C16.3452 13.4806 16.0942 13.585 15.8281 13.585C15.7817 13.585 15.7353 13.5819 15.7051 13.5764C15.4471 13.5437 15.2656 13.464 15.1134 13.338L7.95153 7.40035L1.87928 13.2967C1.51946 13.651 0.795662 13.6354 0.446896 13.2776C0.0577887 12.8769 0.0688785 12.2348 0.469076 11.8447L7.17229 5.33595C7.31749 5.19583 7.49688 5.10011 7.66625 5.07288C7.77008 5.05073 7.83758 5.04366 7.90614 5.04366C8.14404 5.04366 8.38294 5.12833 8.56134 5.27549L15.7474 11.2348L24.7277 2.43901H18.8944C18.3369 2.43901 17.8824 1.98639 17.8824 1.42795C17.8824 0.869502 18.3369 0.414886 18.8944 0.414886Z"
      :fill="fill"
    />
  </svg>
</template>

<script lang="ts">
import { formatColors } from "@/utils/tools";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AsceAndDesc extends Vue {
  /**
   * 图标类型
   * 提升：asce
   * 下降：desc
   */
  @Prop({ default: "asce" }) type!: "desc" | "asce";

  /**
   * 图标颜色
   */
  @Prop({ default: "#01F5F1" }) color!: string;

  /**
   * 图标大小
   */
  @Prop({ default: "medium" }) size!: "large" | "medium" | "small" | number;

  /**
   * 填充颜色
   */
  get fill() {
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

  /**
   * 图标className
   */
  get cls() {
    return {
      "app-icon--desc": this.type === "desc",
      "app-icon--asce": this.type === "asce",
    };
  }
}
</script>

<style lang="scss" scoped>
.app-icon {
  &--asce {
    transform: matrix(1, 0, 0, 1, 0, 0);
  }
  &--desc {
    transform: matrix(1, 0, 0, -1, 0, 0);
  }
}
</style>
