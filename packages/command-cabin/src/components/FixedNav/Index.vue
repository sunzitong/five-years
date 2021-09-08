<template>
  <div class="app-fixed-nav" :class="cls">
    <div class="app-fixed-nav__background" ref="wrapper">
      <div class="app-fixed-nav__filter"></div>
      <svg
        class="app-fixed-nav__background__svg"
        width="558"
        height="1260"
        viewBox="0 0 558 1260"
        fill="none"
        transform="scale(1, -1)"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
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
            :stroke="`url(#${uuid}_paint0_linear)`"
            stroke-width="4"
          />
        </g>
        <path
          d="M534.998 637.272L544.443 625.111V651.495L534.998 637.272Z"
          fill="#01E0E2"
        />
        <path
          d="M524.211 637.272L544.442 607.658V623.345L542.097 619.24L529.489 637.272L542.097 656.331L544.442 653.105V667.179L524.211 637.272Z"
          fill="white"
        />
        <defs>
          <linearGradient
            :id="`${uuid}_paint0_linear`"
            x1="557"
            y1="574"
            x2="9.99998"
            y2="574"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#01F2EF" />
            <stop offset="1" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div class="app-fixed-nav__content">
        <Btn
          @click="toPage(item)"
          class="app_fixed-nav__links"
          v-for="item in menus"
          :key="item.title"
          :animate="$route.path === item.href"
        >
          {{ item.title }}
        </Btn>
      </div>
    </div>
    <div @click="toggleNav" class="app-fixed-nav__btn">
      <FixedNavBtn :position="position" text="快捷导航" />
    </div>
    <div
      v-if="!['home', 'index'].includes($route.meta)"
      @click="$router.go(-1)"
      class="app-fixed-nav__back"
    >
      <FixedNavBtn :position="position" text="返回" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import { gsap } from "gsap";
import { uuid } from "@guanyu/shared";
import FixedNavBtn from "./components/FixedNavBtn.vue";
import Btn from "@/components/Btn/Index.vue";

export type MenuItem = { title: string; href: string };

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
  menus: MenuItem[] = [
    { title: "首页", href: "/home" },
    { title: "拓展盘面", href: "/" },
    { title: "营造盘面", href: "/" },
    { title: "经营现状", href: "/" },
    { title: "门店", href: "/project" },
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
        duration: 0.2,
      })
    );
    this.animate.add(
      gsap.to(links, {
        x: 0,
        stagger: 0.08,
        duration: 0.2,
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
   * 跳转到页面
   */
  toPage(item: MenuItem) {
    this.$router.push(item.href);
    this.toggleNav();
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

  &__back {
    position: absolute;
    bottom: 0;
  }

  &__filter {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1260px;
    border-radius: 100%;
    backdrop-filter: blur(20px);
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
    .app-fixed-nav__back {
      left: 100%;
    }
    .app-fixed-nav__content {
      left: 0;
      right: 70px;
    }
    .app-fixed-nav__background__svg {
      transform: scaleX(1);
    }

    .app-fixed-nav__filter {
      right: 0;
    }
  }

  &__right {
    right: -555px;
    .app-fixed-nav__btn {
      right: 100%;
    }
    .app-fixed-nav__back {
      right: 100%;
    }
    .app-fixed-nav__content {
      left: 70px;
      right: 0;
    }
    .app-fixed-nav__background__svg {
      transform: scaleX(-1);
    }
    .app-fixed-nav__filter {
      left: 0;
    }
  }
}

.app-fixed-nav::v-deep {
  .app_fixed-nav__links {
    margin: 22px 0;
  }
}
</style>
