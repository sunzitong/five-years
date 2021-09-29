<template>
  <div class="app-fixed-nav" :class="cls">
    <div class="app-fixed-nav__background" ref="wrapper">
      <div class="app-fixed-nav__filter"></div>
      <svg
        class="app-fixed-nav__background__svg"
        width="717"
        height="1256"
        viewBox="0 0 717 1256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 1250.37V5.6311C27.8012 1.91749 56.1752 0 85 0C434.044 0 717 281.165 717 628C717 974.835 434.044 1256 85 1256C56.1752 1256 27.8012 1254.08 0 1250.37Z"
          fill="#0B1F51"
          fill-opacity="0.6"
        />
        <path
          d="M85 1254C56.8635 1254 29.1588 1252.17 2 1248.62V7.38414C29.1588 3.83265 56.8635 2 85 2C432.951 2 715 282.282 715 628C715 973.718 432.951 1254 85 1254Z"
          :stroke="`url(#${uuid}_a)`"
          stroke-width="4"
        />
        <path
          d="M703.787 627.614L713.232 615.453V641.837L703.787 627.614Z"
          fill="#5180E4"
        />
        <path
          d="M693 627.614L713.231 598V613.687L710.886 609.582L698.278 627.614L710.886 646.672L713.231 643.447V657.521L693 627.614Z"
          fill="white"
        />
        <defs>
          <linearGradient
            :id="`${uuid}_a`"
            x1="717"
            y1="628"
            x2="-1.35121e-06"
            y2="628"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#5180E4" />
            <stop offset="1" />
          </linearGradient>
        </defs>
      </svg>

      <div @click="toggleNav" class="app-fixed-nav__close"></div>
      <div class="app-fixed-nav__content">
        <Btn
          :size="item.children ? 'medium' : 'large'"
          @click="toPage(item)"
          class="app_fixed-nav__links"
          v-for="item in menus"
          :key="item.title"
          :fill="$route.path === item.href ? `#01F4F0` : '#5180E4'"
          :animate="$route.path === item.href && visible"
        >
          <span
            :style="`color:${$route.path === item.href ? `#01F4F0` : '#fff'};`"
          >
            {{ item.title }}
          </span>
        </Btn>
      </div>
    </div>
    <div @click="toggleNav" class="app-fixed-nav__btn">
      <FixedNavBtn :position="position" text="快捷导航" />
    </div>
    <div @click="back" class="app-fixed-nav__back">
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

export type MenuItemProps = { title: string; href: string; children?: boolean };

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
  menus: MenuItemProps[] = [
    { title: "冠寓指挥中心", href: "/home" },
    { title: "拓展盘面详情", href: "/expansion-the-plate", children: true },
    { title: "营造盘面详情", href: "/build-the-plate", children: true },
    // { title: "经营现状详情", href: "/", children: true },
    { title: "冠寓门店指挥中心", href: "/project" },
    // { title: "门店日常巡检", href: "/", children: true },
    // { title: "门店开业检", href: "/", children: true },
    { title: "返回登录页面", href: "/login" },
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
  uuid = `app-fixed-nav${uuid()}`;

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
  toPage(item: MenuItemProps) {
    if (this.$route.fullPath !== item.href) {
      this.$router.push(item.href);
    }
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

  /**
   * 后退
   */
  back() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.$router.go(-1);
    }, 500);
  }
}
</script>

<style lang="scss" scoped>
.app-fixed-nav {
  position: fixed;
  height: 1256px;
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
    width: 1256px;
    border-radius: 100%;
    backdrop-filter: blur(20px);
  }

  &__content {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-flow: column;
    top: 0;
    bottom: 0;
  }

  &__links {
    margin: 22px 0;
  }

  &__close {
    position: absolute;
    width: 80px;
    height: 80px;
    top: 50%;
    margin-top: -40px;
    cursor: pointer;
  }

  &__left {
    left: -713px;
    .app-fixed-nav__close {
      right: 0;
    }
    .app-fixed-nav__btn {
      left: 100%;
    }
    .app-fixed-nav__back {
      left: 100%;
    }
    .app-fixed-nav__content {
      left: 0;
      right: 210px;
      align-items: flex-end;
    }
    .app-fixed-nav__background__svg {
      transform: scaleX(1);
    }

    .app-fixed-nav__filter {
      right: 0;
    }
  }

  &__right {
    right: -713px;
    .app-fixed-nav__close {
      left: 0;
    }
    .app-fixed-nav__btn {
      right: 100%;
    }
    .app-fixed-nav__back {
      right: 100%;
    }
    .app-fixed-nav__content {
      left: 210px;
      right: 0;
      align-items: flex-start;
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
