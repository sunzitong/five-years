<template>
  <div class="page__login">
    <div class="background">
      <video
        style="width: 100%; height: 100%; object-fit: cover"
        src="/video/loginbg.mov"
        autoplay
        loop
        poster="/img/earth.png"
      ></video>
    </div>
    <div class="content">
      <svg
        width="2070"
        height="2070"
        viewBox="0 0 2070 2070"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_b)">
          <circle
            cx="1036"
            cy="1034"
            r="788.119"
            fill="#113069"
            fill-opacity="0.8"
          />
        </g>
        <g filter="url(#filter1_b)">
          <circle
            cx="1035"
            cy="1035"
            r="1035"
            fill="#153045"
            fill-opacity="0.8"
          />
        </g>
        <circle
          cx="1035.5"
          cy="1034.5"
          r="863.582"
          stroke="#68DFFF"
          stroke-width="4"
          stroke-dasharray="8 8"
        />
        <circle
          cx="1035.5"
          cy="1034.5"
          r="800.601"
          stroke="url(#paint0_linear)"
          stroke-width="52"
        />
        <circle
          cx="1035.5"
          cy="1034.5"
          r="707.982"
          stroke="#68DFFF"
          stroke-width="7"
          stroke-linejoin="round"
          stroke-dasharray="14 14"
        />
        <rect
          x="616.007"
          y="613.696"
          width="840.23"
          height="840.23"
          stroke="#8BF9FC"
          stroke-width="6"
        />
        <path
          d="M1513.43 557.451H1263.37L1293.79 588.828H1480.16V779.943L1513.43 806.566V557.451Z"
          fill="#8BF9FC"
        />
        <path
          d="M1513.43 1508.27H1263.37L1293.79 1476.89H1480.16V1285.78L1513.43 1259.16V1508.27Z"
          fill="#8BF9FB"
        />
        <path
          d="M561.663 557.451H811.729L781.303 588.828H594.942V779.943L561.663 806.566V557.451Z"
          fill="#8BF9FC"
        />
        <path
          d="M561.663 1508.27H811.729L781.303 1476.89H594.942V1285.78L561.663 1259.16V1508.27Z"
          fill="#8BF9FB"
        />
        <defs>
          <filter
            id="filter0_b"
            x="227.88"
            y="225.881"
            width="1616.24"
            height="1616.24"
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
          <filter
            id="filter1_b"
            x="-30"
            y="-30"
            width="2130"
            height="2130"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImage" stdDeviation="15" />
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
            id="paint0_linear"
            x1="1035.5"
            y1="958.037"
            x2="1035.5"
            y2="1861.1"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#8BF9FB" />
            <stop offset="1" stop-color="#6FD5DD" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Base from "@/views/Base";

/**营造盘面详情 */
@Component
export default class Login extends Base {}
</script>

<style lang="scss" scoped>
.page__login {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .background {
    position: relative;
    z-index: 1;
  }

  .content {
    position: fixed;
    right: 20%;
    top: 50%;
    z-index: 10;
    transform: translate(0, -50%);
  }
}
</style>
