<template>
  <svg
    :width="iconSize"
    :height="(iconSize * 217) / 210"
    viewBox="0 0 210 217"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <circle cx="105.5" cy="120.5" r="93.5" fill="#144079" />
      <g>
        <path
          d="M103.459 107.616C104.719 106.998 106.195 107 107.454 107.62L189.191 147.917C191.453 149.032 191.432 152.263 189.157 153.349L107.583 193.795C106.345 194.386 104.907 194.384 103.671 193.79L21.9216 153.016C19.6491 151.924 19.6364 148.693 21.9001 147.583L103.459 107.616Z"
          fill="#423D34"
        />
      </g>
      <g>
        <path
          d="M103.459 85.7284C104.719 85.1107 106.195 85.1125 107.454 85.7331L189.191 126.03C191.453 127.144 191.432 130.376 189.157 131.462L107.583 170.398C106.345 170.989 104.907 170.987 103.671 170.394L21.9216 131.128C19.6491 130.037 19.6364 126.806 21.9001 125.696L103.459 85.7284Z"
          :fill="`url(#${uuid}_paint0_linear)`"
          fill-opacity="0.4"
        />
      </g>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.7366 128.435C18.9216 129.86 19.3622 131.854 21.0514 132.665L102.801 171.931C104.037 172.524 105.475 172.526 106.712 171.935L188.287 132.999C189.981 132.19 190.425 130.193 189.608 128.765C189.322 129.266 188.882 129.696 188.287 129.98L106.712 168.916C105.475 169.507 104.037 169.505 102.801 168.912L21.0514 129.647C20.46 129.362 20.0216 128.933 19.7366 128.435Z"
        :fill="`url(#${uuid}_paint1_diamond)`"
      />
      <path
        d="M5 12.5469H205L159.717 115.188H50.283L5 12.5469Z"
        :fill="`url(#${uuid}_paint2_linear)`"
      />
      <g>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M159.601 113.68C157.753 125.689 134.014 135.189 105 135.189C75.9861 135.189 52.2466 125.689 50.3987 113.68C50.3219 114.179 50.283 114.682 50.283 115.189C50.283 127.902 74.7806 138.208 105 138.208C135.219 138.208 159.717 127.902 159.717 115.189C159.717 114.682 159.678 114.179 159.601 113.68Z"
          fill="white"
        />
      </g>
      <ellipse
        cx="105"
        cy="113.302"
        rx="54.717"
        ry="23.0189"
        :fill="`url(#${uuid}_paint3_radial)`"
      />
      <rect
        x="60.8491"
        y="12.5469"
        width="87.5472"
        height="101.132"
        rx="20"
        fill="#F4B43F"
      />
      <path
        d="M62.3491 27C62.3491 15.6782 71.5273 6.5 82.8491 6.5H126.396C137.718 6.5 146.896 15.6782 146.896 27V84.8868C146.896 96.2086 137.718 105.387 126.396 105.387H82.8491C71.5273 105.387 62.3491 96.2086 62.3491 84.8868V27Z"
        :fill="`url(#${uuid}_paint4_linear)`"
        :stroke="`url(#${uuid}_paint5_linear)`"
        stroke-width="3"
      />
      <rect
        x="67"
        y="11.7925"
        width="75.4717"
        height="89.0566"
        rx="18"
        :fill="`url(#${uuid}_paint6_linear)`"
      />
      <rect
        x="70"
        y="14.8115"
        width="69.434"
        height="76.2264"
        rx="16"
        :fill="`url(#${uuid}_paint7_linear)`"
      />
      <mask
        :id="`${uuid}_mask0`"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="70"
        y="14"
        width="70"
        height="86"
      >
        <rect
          x="70"
          y="14.8115"
          width="69.434"
          height="84.5283"
          rx="17"
          :fill="`url(#${uuid}_paint8_linear)`"
        />
      </mask>
      <g :mask="`url(#${uuid}_mask0)`">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M51.1321 86.8552L93.129 5.40918L99.7012 9.11933L56.4151 92.5473L51.1321 86.8552Z"
          :fill="`url(#${uuid}_paint9_linear)`"
          fill-opacity="0.4"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M71.1321 92.5473L117.28 5.40918L138.947 9.11933L95.6604 92.5473H71.1321Z"
          :fill="`url(#${uuid}_paint10_linear)`"
          fill-opacity="0.4"
        />
      </g>
      <g :filter="`url(#${uuid}_filter3_di)`">
        <path
          d="M88 35L105 45.5V73.5"
          stroke="white"
          stroke-width="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M122 35L105 45.5V82"
          stroke="white"
          stroke-width="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M88.5 53.5H120.5"
          stroke="white"
          stroke-width="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M88.5 66H120.5"
          stroke="white"
          stroke-width="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </g>
    <defs>
      <filter
        :id="`${uuid}_filter3_di`"
        x="78.9993"
        y="29.9995"
        width="52.0014"
        height="65.0007"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.968627 0 0 0 0 0.772549 0 0 0 0 0.270588 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.966594 0 0 0 0 0.890026 0 0 0 0 0.550464 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="shape" result="effect2_innerShadow" />
      </filter>
      <linearGradient
        :id="`${uuid}_paint0_linear`"
        x1="96.6982"
        y1="84.6225"
        x2="99.7171"
        y2="169.528"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#F8D44C" />
        <stop offset="1" stop-color="#F6CB45" />
      </linearGradient>
      <radialGradient
        :id="`${uuid}_paint1_diamond`"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(25.7517 162.774) scale(164.154 637.548)"
      >
        <stop stop-color="white" />
        <stop offset="0.15062" stop-color="#F4B43F" />
        <stop offset="0.263058" stop-color="#F4B43F" />
        <stop offset="0.47314" stop-color="#FBFFFF" />
        <stop offset="0.523441" stop-color="white" />
        <stop offset="0.721688" stop-color="#F4B43F" />
        <stop offset="0.904051" stop-color="#F4B43F" />
        <stop offset="1" stop-color="white" />
      </radialGradient>
      <linearGradient
        :id="`${uuid}_paint2_linear`"
        x1="105"
        y1="12.5469"
        x2="105"
        y2="115.188"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#F8D44C" stop-opacity="0" />
        <stop offset="1" stop-color="#F7D24A" stop-opacity="0.28" />
      </linearGradient>
      <radialGradient
        :id="`${uuid}_paint3_radial`"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(105 113.302) rotate(90) scale(23.0189 54.717)"
      >
        <stop stop-color="#E3C03E" />
        <stop offset="1" stop-color="#F1D358" />
      </radialGradient>
      <linearGradient
        :id="`${uuid}_paint4_linear`"
        x1="104.623"
        y1="5"
        x2="104.623"
        y2="106.132"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FBEC8F" />
        <stop offset="1" stop-color="#F8D55B" />
      </linearGradient>
      <linearGradient
        :id="`${uuid}_paint5_linear`"
        x1="104.623"
        y1="5"
        x2="104.623"
        y2="106.132"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#EFCF52" />
        <stop offset="0.727184" stop-color="#EDCD50" />
        <stop offset="1" stop-color="#FFF3AA" />
      </linearGradient>
      <linearGradient
        :id="`${uuid}_paint6_linear`"
        x1="104.736"
        y1="11.7925"
        x2="104.736"
        y2="100.849"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#F6C443" />
        <stop offset="1" stop-color="#FBEB8A" />
      </linearGradient>
      <linearGradient
        :id="`${uuid}_paint7_linear`"
        x1="104.717"
        y1="14.8115"
        x2="104.717"
        y2="91.0379"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#F5C242" />
        <stop offset="0.0001" stop-color="#FFD469" />
        <stop offset="1" stop-color="#FBEB89" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        :id="`${uuid}_paint8_linear`"
        x1="104.717"
        y1="14.8115"
        x2="104.717"
        y2="99.3398"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#4191D6" />
        <stop offset="1" stop-color="#2F66CF" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        :id="`${uuid}_paint9_linear`"
        x1="99.8113"
        y1="17.0756"
        x2="59.8113"
        y2="86.5096"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FFFDF9" />
        <stop offset="1" stop-color="#E8E2C8" />
      </linearGradient>
      <linearGradient
        :id="`${uuid}_paint10_linear`"
        x1="123.962"
        y1="17.0756"
        x2="83.9623"
        y2="86.5096"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FFF8DD" />
        <stop offset="1" stop-color="#E6E4DC" />
      </linearGradient>
      <clipPath :id="`${uuid}_clip0`">
        <rect width="210" height="217" fill="white" />
      </clipPath>
    </defs>
  </svg>
</template>

<script lang="ts">
import { formatColors } from "@/utils/tools";
import { Component, Prop, Vue } from "vue-property-decorator";
import { uuid } from "@guanyu/shared";

@Component
export default class YearIncome extends Vue {
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
  get uuid() {
    return `icon-${uuid()}`;
  }
}
</script>
