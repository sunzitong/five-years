<template>
  <svg
    :width="iconSize"
    :height="iconSize"
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0)">
      <path
        d="M19.8925 27.4986C20.441 27.4986 20.8857 27.9432 20.8857 28.4916C20.8857 29.0322 20.4537 29.4719 19.916 29.4844L19.8925 29.4846H15.0029C14.4543 29.4846 14.0097 29.04 14.0097 28.4916C14.0097 27.9511 14.4417 27.5114 14.9794 27.4989L15.0029 27.4986H19.8925ZM21.2295 24.6971C21.7781 24.6971 22.2227 25.1416 22.2227 25.6901C22.2227 26.2306 21.7907 26.6703 21.253 26.6828L21.2295 26.6831H13.6142C13.0657 26.6831 12.621 26.2385 12.621 25.6901C12.621 25.1495 13.0531 24.7098 13.5908 24.6973L13.6142 24.6971H21.2295ZM17.4219 0.000244141C23.73 0.000244141 28.8438 5.11293 28.8438 11.4197C28.8438 15.4081 26.7987 18.9189 23.6997 20.9611L23.6265 21.3059C23.5761 21.5411 23.5093 21.8491 23.4263 22.2298C23.2295 23.1324 22.4368 23.7787 21.5156 23.7927H13.3126C12.3657 23.7927 11.5503 23.1244 11.3647 22.196L11.2732 21.7435C11.1629 21.206 11.0997 20.9318 11.0834 20.9209C8.01845 18.873 6 15.382 6 11.4197C6 5.11293 11.1137 0.000244141 17.4219 0.000244141ZM15.3439 4.4474C11.985 5.07425 10.3261 7.35739 10.1271 10.9587C10.0969 11.5063 10.5164 11.9747 11.0641 12.0049C11.6118 12.0352 12.0803 11.6158 12.1105 11.0682C12.2626 8.31544 13.3324 6.84311 15.7084 6.39968C16.2476 6.29904 16.6031 5.78044 16.5024 5.24132C16.4018 4.70221 15.8831 4.34677 15.3439 4.4474Z"
        :fill="`url(#${liearId})`"
      />
    </g>
    <defs>
      <linearGradient
        :id="liearId"
        x1="17.4219"
        y1="0.000244141"
        x2="17.4219"
        y2="29.4846"
        gradientUnits="userSpaceOnUse"
      >
        <stop :stop-color="fill[0]" />
        <stop offset="1" :stop-color="fill[1]" />
      </linearGradient>
      <clipPath id="clip0">
        <rect
          width="34"
          height="34"
          fill="white"
          transform="translate(0 0.000244141)"
        />
      </clipPath>
    </defs>
  </svg>
</template>

<script lang="ts">
import { formatColors } from "@/utils/tools";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Light extends Vue {
  /**
   * 图标颜色
   */
  @Prop({ default: "#50EF9D|#26B284" }) color!: string | string[];

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

  mounted() {
    console.log(this.fill);
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
   * id不能一致
   */
  get liearId() {
    return `___APP-ICON-LIGHT-__${this.color}`;
  }
}
</script>
