<template>
  <div class="app-fixed-nav-btn" :class="cls">
    <svg
      width="87"
      height="386"
      viewBox="0 0 87 386"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5402 381.878C8.5336 385.156 2.51807 382.306 2.51807 377.129L2.51805 10.4364C2.51805 7.65894 4.30808 5.44055 6.67367 4.62485C7.89555 4.20352 9.17587 4.39795 10.5959 5.06137C12.0409 5.73648 13.4662 6.8201 14.8949 7.96017L75.0528 55.9649C75.8186 56.576 76.6329 57.1287 77.4138 57.6463C77.5708 57.7504 77.7259 57.8527 77.8792 57.9538C78.5046 58.3664 79.1007 58.7596 79.6769 59.1742C81.109 60.2047 82.2166 61.2314 82.8678 62.53C83.2872 63.3664 83.5181 64.3034 83.5181 65.2794L83.5181 95.0456C83.5181 98.7633 81.6906 102.244 78.6301 104.354C74.7576 107.025 72.4453 111.428 72.4453 116.133L72.4453 271.973C72.4453 276.677 74.7576 281.08 78.6301 283.751C81.6906 285.862 83.5181 289.342 83.5181 293.06L83.5181 320.898C83.5181 322.738 82.6919 324.481 81.2675 325.647L12.5402 381.878Z"
        :fill="`url(#${uuid}_paint0_linear)`"
        :stroke="`url(#${uuid}_paint1_linear)`"
        stroke-width="3"
      />
      <path
        d="M3.34428e-07 9.46138C5.28293e-08 3.01914 7.486 -0.528293 12.472 3.55118L81.1993 59.7826C82.9719 61.2329 84 63.4024 84 65.6928L84 93.5306C84 97.7415 81.9301 101.683 78.4636 104.074C78.3623 104.144 78.2621 104.215 78.1631 104.288"
        :stroke="`url(#${uuid}_paint2_linear)`"
        stroke-width="2.29091"
      />
      <path
        d="M1 377.123C1 383.565 8.486 387.113 13.472 383.033L82.1993 326.802C83.9719 325.352 85 323.182 85 320.892L85 293.054C85 288.843 82.9301 284.901 79.4636 282.51C79.3623 282.44 79.2621 282.369 79.1631 282.297"
        :stroke="`url(#${uuid}_paint3_linear)`"
        stroke-width="2.29091"
      />
      <defs>
        <linearGradient
          :id="`${uuid}_paint0_linear`"
          x1="1.01805"
          y1="-6.21429"
          x2="85.018"
          y2="-6.2143"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#012267" />
          <stop offset="1" stop-color="#060031" />
        </linearGradient>
        <linearGradient
          :id="`${uuid}_paint1_linear`"
          x1="34.4272"
          y1="375.998"
          x2="35.5181"
          y2="15.7798"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0131516" stop-color="#01E7E7" stop-opacity="0" />
          <stop
            offset="0.499477"
            stop-color="#00F5FF"
            stop-opacity="0.593858"
          />
          <stop offset="1" stop-color="#01E7E7" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          :id="`${uuid}_paint2_linear`"
          x1="9.16364"
          y1="13.456"
          x2="93.5455"
          y2="112.729"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#01F5F1" stop-opacity="0" />
          <stop
            offset="0.265077"
            stop-color="#01F5F1"
            stop-opacity="0.494147"
          />
          <stop offset="0.660232" stop-color="#01F5F1" />
          <stop offset="0.852647" stop-color="#01F5F1" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          :id="`${uuid}_paint3_linear`"
          x1="10.1636"
          y1="373.128"
          x2="94.5454"
          y2="273.856"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#01F5F1" stop-opacity="0" />
          <stop
            offset="0.265077"
            stop-color="#01F5F1"
            stop-opacity="0.494147"
          />
          <stop offset="0.660232" stop-color="#01F5F1" />
          <stop offset="0.852647" stop-color="#01F5F1" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
    <div class="app-fixed-nav-btn__text">
      <span v-for="letter in text" :key="letter">{{ letter }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Btn from "@/components/Btn/index.vue";
import { uuid } from "@guanyu/shared";

@Component({
  components: {
    Btn,
  },
})
export default class FixedNavBtn extends Vue {
  /**
   * 按钮文本
   */
  @Prop({ default: "导航" }) text!: string;

  /**
   * 位置导航位置
   */
  @Prop({ default: "left" }) position!: "left" | "right";

  /**
   * 唯一id
   */
  get uuid() {
    return `app-fixed-nav-btn-${uuid()}`;
  }

  /**
   * 添加类名
   */
  get cls() {
    return {
      ["app-fixed-nav-btn__left"]: this.position === "left",
      ["app-fixed-nav-btn__right"]: this.position === "right",
    };
  }
}
</script>

<style lang="scss" scoped>
.app-fixed-nav-btn {
  cursor: pointer;
  display: flex;
  &__left {
    > svg {
      transform: scaleX(1);
    }
  }
  &__right {
    > svg {
      transform: scaleX(-1);
    }
  }
  &__text {
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    transform: translate(-50%, -50%);
    display: flex;
    flex-flow: column;
    color: #fff;
  }

  &__left {
    svg {
      margin-left: -5px;
    }
    .app-fixed-nav-btn__text {
      margin-left: -8px;
    }
  }

  &__right {
    svg {
      margin-right: -5px;
    }
    .app-fixed-nav-btn__text {
      margin-left: 8px;
    }
  }
}
</style>
