<template>
  <div class="app-footer-background">
    <svg
      width="7680"
      height="132"
      viewBox="0 0 7680 132"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.8"
        d="M3838 586.5C5012.75 586.5 6076.33 554.208 6846.24 501.993C7231.18 475.887 7542.78 444.797 7758.17 410.259C7865.85 392.994 7949.62 374.848 8006.52 355.99C8034.95 346.568 8056.85 336.911 8071.7 326.992C8086.41 317.169 8095 306.546 8095 295C8095 283.454 8086.41 272.831 8071.7 263.008C8056.85 253.089 8034.95 243.432 8006.52 234.01C7949.62 215.152 7865.85 197.006 7758.17 179.741C7542.78 145.203 7231.18 114.113 6846.24 88.0066C6076.33 35.7925 5012.75 3.5 3838 3.5C2663.24 3.5 1599.67 35.7925 829.765 88.0066C444.823 114.113 133.225 145.203 -82.1746 179.741C-189.852 197.006 -273.618 215.152 -330.518 234.01C-358.947 243.432 -380.85 253.089 -395.703 263.008C-410.413 272.831 -419 283.454 -419 295C-419 306.546 -410.413 317.169 -395.703 326.992C-380.85 336.911 -358.947 346.568 -330.518 355.99C-273.618 374.848 -189.852 392.994 -82.1746 410.259C133.225 444.797 444.823 475.887 829.765 501.993C1599.67 554.208 2663.24 586.5 3838 586.5Z"
        :fill="`url(#${uuid}_paint0_linear)`"
        :stroke="`url(#${uuid}_paint1_linear)`"
        stroke-width="6"
      />
      <defs>
        <linearGradient
          :id="`${uuid}_paint0_linear`"
          x1="3838"
          y1="6.5"
          x2="3838"
          y2="131.251"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#060745" />
          <stop offset="1" stop-color="#02226A" />
        </linearGradient>
        <linearGradient
          :id="`${uuid}_paint1_linear`"
          x1="3838"
          y1="6.5"
          x2="3838"
          y2="42.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#01F5F1" />
          <stop offset="1" stop-color="#01F5F1" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { uuid } from "@guanyu/shared";

@Component({
  components: {},
})
export default class FooterBackground extends Vue {
  uuid = `footer-background-${uuid()}`;
}
</script>

<style lang="scss" scoped>
.app-footer-background {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  svg {
    vertical-align: middle;
  }
}
</style>
