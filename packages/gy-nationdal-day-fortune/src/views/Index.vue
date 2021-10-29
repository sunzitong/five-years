<template>
  <div class="index-container">
    <div class="content">
      <div class="name-container">
        <input v-model="nickname" placeholder="请输入姓名" maxlength="10" />
      </div>
      <img :src="button" alt class="button" @click="goToLuckyInfo" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Inject } from "vue-property-decorator";
import Base from "./Base";
import { Toast } from "vant";
import button from "@/assets/img/button.png";

import du from "@/assets/img/du.png";
import pa from "@/assets/img/pa.png";
import shuai from "@/assets/img/shuai.png";
import lang from "@/assets/img/lang.png";
import fo from "@/assets/img/fo.png";
import lu from "@/assets/img/lu.png";
import ai from "@/assets/img/ai.png";
import pang from "@/assets/img/pang.png";
import mei from "@/assets/img/mei.png";
import zhai from "@/assets/img/zhai.png";
import ga from "@/assets/img/ga.png";
import tian from "@/assets/img/tian.png";
import shui from "@/assets/img/shui.png";
import shou from "@/assets/img/shou.png";
import ya from "@/assets/img/ya.png";
import bg_lucky from "@/assets/img/bg-lucky.png";
import card from "@/assets/img/card.png";

@Component
export default class Index extends Base {
  @Inject() visitSource!: string;
  // app和小程序分享
  @Inject() share!: () => void;

  name = "";
  button = button;
  nickname = "";

  luckyInfoList = [
    {
      src: du,
    },
    {
      src: pa,
    },
    {
      src: shuai,
    },
    {
      src: lang,
    },
    {
      src: fo,
    },
    {
      src: lu,
    },
    {
      src: ai,
    },
    {
      src: pang,
    },
    {
      src: mei,
    },
    {
      src: zhai,
    },
    {
      src: ga,
    },
    {
      src: tian,
    },
    {
      src: shui,
    },
    {
      src: shou,
    },
    {
      src: ya,
    },
    {
      src: bg_lucky,
    },
    {
      src: card,
    },
  ];

  mounted() {
    document.title = "双节假期黄历";
    if (this.visitSource === "小程序") {
      this.share();
    }
    this.preLoadImages();
    window.zhuge.track("中秋国庆-活动主页");
  }

  goToLuckyInfo() {
    window.zhuge.track("中秋国庆-活动主页-测试按钮");
    if (!this.nickname) {
      Toast("亲，要输入名称才能测运势哦！");
      return;
    }
    this.$router.push({
      path: `/luckyInfo?nickname=${this.nickname}`,
    });
  }

  preLoadImages() {
    this.luckyInfoList.forEach((item) => {
      const imgae = new Image();
      imgae.src = item.src;
    });
  }
}
</script>

<style lang="scss">
.index-container {
  width: 100%;
  height: 100vh;
  background-image: url("~@/assets/img/bg-cover.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .content {
    width: 100%;
    height: 100vh;
    background-image: url("~@/assets/img/bg.png");
    background-repeat: no-repeat;
    background-size: 100% auto;
    position: relative;

    .name-container {
      width: 263px;
      height: 98px;
      background-image: url("~@/assets/img/name.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: absolute;
      bottom: 120px;
      left: 50%;
      transform: translate(-50%, 0);
      display: flex;
      justify-content: center;
      align-items: center;

      input {
        border: none;
        line-height: 25px;
        width: 180px;
        text-align: center;
        font-size: 18px;
        &::-webkit-input-placeholder {
          color: #999999;
          font-size: 18px;
        }
      }
    }

    .button {
      width: 247px;
      height: 50px;
      bottom: 55px;
      left: 50%;
      transform: translate(-52%, 0);
      position: absolute;
    }
  }
}
</style>
