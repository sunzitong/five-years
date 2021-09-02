<template>
  <div class="app-fixed-nav" :class="cls">
    <div class="app-fixed-nav__background" ref="wrapper">
      <svg
        class="app-fixed-nav__background__svg"
        width="558"
        height="1260"
        viewBox="0 0 558 1260"
        fill="none"
        transform="scale(1, -1)"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g :filter="`url(#${uuid}_filter0_b)`">
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
            :stroke="`url(#${uuid}_paint0_linearaaa)`"
            stroke-width="4"
          />
        </g>
        <g :clip-path="`url(#${uuid}_clip0)`">
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
            :id="`${uuid}_filter0_b`"
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
            :id="`${uuid}_paint0_linearaaa`"
            x1="557"
            y1="574"
            x2="9.99998"
            y2="574"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#01F2EF" />
            <stop offset="1" stop-opacity="0" />
          </linearGradient>
          <clipPath :id="`${uuid}_clip0`">
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
        <Btn
          @click="toggleNav"
          class="app_fixed-nav__links"
          v-for="item in menus"
          :key="item.title"
        >
          {{ item.title }}
        </Btn>
      </div>
    </div>
    <div @click="toggleNav" class="app-fixed-nav__btn">
      <FixedNavBtn :position="position" text="快捷导航" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import { gsap } from "gsap";
import { uuid } from "@guanyu/shared";
import Btn from "@/components/Btn/index.vue";
import FixedNavBtn from "./components/FixedNavBtn.vue";

@Component({
  components: {
    Btn,
    FixedNavBtn,
  },
})
export default class FixedNav extends Vue {
  /**
   * 导航内容
   */
  @Ref() wrapper!: HTMLDivElement;

  /**
   * 位置导航位置
   */
  @Prop({ default: "left" }) position!: "left" | "right";

  /**
   * 菜单
   */
  menus = [
    { title: "首页", href: "/" },
    { title: "拓展盘面", href: "/" },
    { title: "营造盘面", href: "/" },
    { title: "经营现状", href: "/" },
    { title: "门店", href: "/" },
    { title: "日常巡检", href: "/" },
    { title: "开业巡检", href: "/" },
  ];

  /**
   * 是否显示导航
   */
  visible = false;

  /**
   * 导航动画
   */
  animate = gsap.timeline({ paused: true });

  /**
   * 唯一id
   */
  get uuid() {
    return `app-fixed-nav${uuid()}`;
  }

  /**
   * 添加类名
   */
  get cls() {
    return {
      ["app-fixed-nav__left"]: this.position === "left",
      ["app-fixed-nav__right"]: this.position === "right",
    };
  }

  /**
   * 创建快捷导航动画
   */
  createNavAnimate() {
    const rect = this.wrapper.getBoundingClientRect();
    const links = this.wrapper.querySelectorAll(".app_fixed-nav__links");
    gsap.set(this.wrapper, { x: 0, opacity: 0 });
    gsap.set(links, {
      // 按钮在左，向左移动，按钮在右向左移动
      x: this.position === "right" ? rect.width : -rect.width,
    });
    this.animate.add(
      gsap.to(this.wrapper, {
        opacity: 1,
        // 按钮在左，向左滑动，按钮在右向左滑动
        x: this.position === "right" ? -rect.width : rect.width,
      })
    );
    this.animate.add(
      gsap.to(links, {
        x: 0,
        stagger: 0.08,
      })
    );
  }

  /**
   * 组件挂载
   */
  mounted() {
    this.createNavAnimate();
  }

  /**
   * 切换快捷导航
   */
  toggleNav() {
    this.visible = !this.visible;
    if (this.visible) {
      this.animate.play();
    } else {
      this.animate.reverse();
    }
  }
}
</script>

<style lang="scss" scoped>
.app-fixed-nav {
  position: fixed;
  height: 1260px;
  z-index: 1000;
  bottom: 0;

  &__btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  &__content {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    top: 0;
    bottom: 0;
  }

  &__links {
    margin: 22px 0;
  }

  &__left {
    left: -555px;
    .app-fixed-nav__btn {
      left: 100%;
    }
    .app-fixed-nav__content {
      left: 0;
      right: 70px;
    }
    .app-fixed-nav__background__svg {
      transform: scaleX(1);
    }
  }

  &__right {
    right: -555px;
    .app-fixed-nav__btn {
      right: 100%;
    }
    .app-fixed-nav__content {
      left: 70px;
      right: 0;
    }
    .app-fixed-nav__background__svg {
      transform: scaleX(-1);
    }
  }
}

.app-fixed-nav::v-deep {
  .app_fixed-nav__links {
    margin: 22px 0;
  }
}
</style>
