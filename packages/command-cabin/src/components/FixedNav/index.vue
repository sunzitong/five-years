<template>
  <div class="app-fixed-nav">
    <svg
      width="558"
      height="1260"
      viewBox="0 0 558 1260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_b)">
        <ellipse
          cx="-75.0718"
          cy="629.902"
          rx="632.282"
          ry="629.599"
          fill="#0B1F51"
          fill-opacity="0.6"
        />
        <path
          d="M555.21 629.902C555.21 976.507 273.031 1257.5 -75.0718 1257.5C-423.175 1257.5 -705.354 976.507 -705.354 629.902C-705.354 283.296 -423.175 2.30273 -75.0718 2.30273C273.031 2.30273 555.21 283.296 555.21 629.902Z"
          stroke="url(#paint0_linearaaa)"
          stroke-width="4"
        />
      </g>
      <g clip-path="url(#clip0)">
        <path
          d="M534.998 637.272L544.443 625.111V651.495L534.998 637.272Z"
          fill="#01E0E2"
        />
        <path
          d="M524.211 637.272L544.442 607.658V623.345L542.097 619.24L529.489 637.272L542.097 656.331L544.442 653.105V667.179L524.211 637.272Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_b"
          x="-727.354"
          y="-19.6973"
          width="1304.56"
          height="1299.2"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImage" stdDeviation="10" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linearaaa"
          x1="557"
          y1="574"
          x2="9.99998"
          y2="574"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#01F2EF" />
          <stop offset="1" stop-opacity="0" />
        </linearGradient>
        <clipPath id="clip0">
          <rect
            width="20.2317"
            height="59.5212"
            fill="white"
            transform="translate(524.211 607.658)"
          />
        </clipPath>
      </defs>
    </svg>
    <div class="app-fixed-nav__content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class FixedNav extends Vue {
  /**
   * 位置导航位置
   */
  @Prop({ default: "left" }) position!: "left" | "right";
}
</script>

<style lang="scss" scoped>
.app-fixed-nav {
  position: fixed;
  left: 0;
  bottom: 0;
  &__content {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
