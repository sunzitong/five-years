<template>
  <svg
    v-if="iconSize"
    :width="50"
    :height="50"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0)">
      <path
        d="M5.75 18.125H3V3H18.125V5.75H5.75V18.125ZM47 47H31.875V44.25H44.25V31.875H47V47Z"
        fill="#DBF0FF"
      />
      <path
        d="M3.00039 43.5582L3.00039 32.902C3.00039 31.7719 3.89844 30.8266 5.02852 30.8051C6.18438 30.7879 7.12539 31.716 7.12539 32.8676L7.12539 37.7488C7.12539 38.0539 7.49492 38.2086 7.71406 37.9938L20.102 25.6059C20.5059 25.202 21.0344 25 21.5586 25C22.0871 25 22.6156 25.202 23.0152 25.6059C23.823 26.4094 23.823 27.7156 23.0152 28.5234L10.6273 40.9113C10.4125 41.1262 10.5629 41.5 10.8723 41.5L15.7191 41.5C16.8492 41.5 17.7945 42.398 17.816 43.5281C17.8332 44.684 16.9051 45.625 15.7535 45.625L5.06289 45.625C3.92422 45.6207 3.00039 44.6969 3.00039 43.5582Z"
        fill="#DBF0FF"
      />
      <path
        d="M45.2809 5.0668V15.723C45.2809 16.8531 44.3828 17.7984 43.2527 17.8199C42.0969 17.8371 41.1559 16.909 41.1559 15.7574V10.8762C41.1559 10.5711 40.7863 10.4164 40.5672 10.6312L28.1793 23.0191C27.7754 23.423 27.2469 23.625 26.7227 23.625C26.1941 23.625 25.6656 23.423 25.266 23.0191C24.4582 22.2156 24.4582 20.9094 25.266 20.1016L37.6539 7.71367C37.8688 7.49883 37.7184 7.125 37.409 7.125L32.5621 7.125C31.432 7.125 30.4867 6.22695 30.4652 5.09687C30.448 3.94101 31.3762 3 32.5277 3L43.2184 3C44.357 3.0043 45.2809 3.92812 45.2809 5.0668Z"
        fill="#DBF0FF"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="44" height="44" fill="white" transform="translate(3 3)" />
      </clipPath>
    </defs>
  </svg>
</template>

<script lang="ts">
import { formatColors } from "@/utils/tools";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class UnFold extends Vue {
  /**
   * 图标颜色
   */
  @Prop({ default: "#DBF0FF" }) color!: string | string[];

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
}
</script>
