<template>
  <div class="wrapper-container">
    <div class="luck-container">
      <div class="header"></div>
      <div class="card">
        <div class="title">{{ nickname }}</div>
        <img :src="luckyInfo.src" class="key-word" crossorigin="anonymous" />
        <div class="desc">{{ `"${luckyInfo.desc}"` }}</div>
        <div class="suitedTodo-container">
          <img :src="suitedTodo" class="icon" />
          <div>{{ luckyInfo.suitedTodo }}</div>
        </div>
        <div class="unsuitedTod-container">
          <img :src="unsuitedTod" class="icon" />
          <div>{{ luckyInfo.unsuitedTod }}</div>
        </div>
        <div
          class="refresh-container"
          @click="createImg"
          id="textid"
          ref="text"
          v-show="visitSource === '小程序'"
        >
          生成图片
        </div>
      </div>
      <div class="bottom-container">
        <!-- <img :src="share_button" class="share-button" /> -->
        <img :src="refresh_button" class="refresh-button" @click="refresh" />
        <img
          :src="gift_button"
          class="gift-button"
          @click="newCustomerGiftJump"
        />
        <img :src="gift_icon" class="gift-icon" @click="newCustomerGiftJump" />
      </div>
      <div class="create-img-wrapper" v-show="showCreateImg">
        <img :src="preViewSrc" class="create-img" />
        <img :src="close_button" class="close-button" @click="closeWrapper" />
      </div>
      <img
        :src="share_button"
        class="share-button"
        data-html2canvas-ignore
        @click="appShare"
        v-show="visitSource === 'APP'"
      />
      <img :src="qrcode" class="qrcode" />
      <img :src="slogan" class="slogan" />
    </div>
    <div class="luck-container clone" id="clone">
      <div class="header"></div>
      <div class="card">
        <div class="title">{{ nickname }}</div>
        <img :src="luckyInfo.src" class="key-word" />
        <div class="desc">{{ `"${luckyInfo.desc}"` }}</div>
        <div class="suitedTodo-container">
          <img :src="suitedTodo" class="icon" />
          <div>{{ luckyInfo.suitedTodo }}</div>
        </div>
        <div class="unsuitedTod-container">
          <img :src="unsuitedTod" class="icon" />
          <div>{{ luckyInfo.unsuitedTod }}</div>
        </div>
        <div class="refresh-container" id="textid" ref="text">
          长按保存图片到相册
        </div>
      </div>
      <img :src="qrcode" class="qrcode" />
      <img :src="slogan" class="slogan" />
    </div>
  </div>
</template>

<script lang="ts">
import qs from "qs";
import { Toast } from "vant";
import { getQueries } from "@/utils/tools";
import { Component, Inject } from "vue-property-decorator";
import html2canvas from "html2canvas";
import Base from "./Base";
import { getCityList } from "@/api";
import suitedTodo from "@/assets/img/suitedTodo-icon.png";
import unsuitedTod from "@/assets/img/unsuitedTod-icon.png";
import gift_button from "@/assets/img/gift-button.png";
import refresh_button from "@/assets/img/refresh-button.png";
import share_button from "@/assets/img/share-button.png";
import close_button from "@/assets/img/close-button.png";
import slogan from "@/assets/img/slogan.png";
import qrcode from "@/assets/img/qrcode.png";
import gift_icon from "@/assets/img/gift-icon.png";
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

@Component
export default class Index extends Base {
  @Inject() visitSource!: string;
  // app和小程序分享
  @Inject() share!: () => void;

  showCreateImg = false;

  preViewSrc = "";

  suitedTodo = suitedTodo;

  unsuitedTod = unsuitedTod;

  refresh_button = refresh_button;

  share_button = share_button;

  gift_button = gift_button;

  close_button = close_button;

  slogan = slogan;

  qrcode = qrcode;

  gift_icon = gift_icon;

  nickname = this.$route.query.nickname || "";

  luckyInfoList = [
    {
      src: du,
      desc: "凭本事单身",
      suitedTodo: "约饭、逛gai、勾搭小姐姐or小哥哥",
      unsuitedTod: "骚扰前任、手机没电，第二杯半价",
    },
    {
      src: pa,
      desc: "不可描述，这题超纲了",
      suitedTodo: "养精蓄锐，做头发，壁咚各种咚",
      unsuitedTod: "优X库试衣间",
    },
    {
      src: shuai,
      desc: "人间妄想本人",
      suitedTodo: "原地C位出道",
      unsuitedTod: "半夜照镜子",
    },
    {
      src: lang,
      desc: "划船不用桨，全靠浪",
      suitedTodo: "蹦迪，度假，网上冲浪",
      unsuitedTod: "猥琐发育",
    },
    {
      src: fo,
      desc: "都行，都好，都可以",
      suitedTodo: "一切随缘，love&peace",
      unsuitedTod: "吃小孩，撕逼",
    },
    {
      src: lu,
      desc: "手有他自己的想法",
      suitedTodo: "撸猫，撸狗，撸啊撸",
      unsuitedTod: "纵X过渡",
    },
    {
      src: ai,
      desc: "愿世界和平",
      suitedTodo: "正能量四处散播Love",
      unsuitedTod: "独处",
    },
    {
      src: pang,
      desc: "我想...不，你不想",
      suitedTodo: "立Flag，自欺欺人",
      unsuitedTod: "吃别人家大米，深夜看吃播",
    },
    {
      src: mei,
      desc: "我怎么能这么好看！",
      suitedTodo: "为所欲为，想X谁就X谁",
      unsuitedTod: "韩式半永久，Tony老师",
    },
    {
      src: zhai,
      desc: "做个肥宅好快乐吖",
      suitedTodo: "追剧，外卖，吃鸡",
      unsuitedTod: "运动步数超过两位数",
    },
    {
      src: ga,
      desc: "最怕空气突然安静",
      suitedTodo: "神秘微笑，谢绝见客",
      unsuitedTod: "土味情话，尬聊",
    },
    {
      src: tian,
      desc: "前方高甜预警",
      suitedTodo: "表白，面基，花式撒狗粮",
      unsuitedTod: "约会不洗头，当众虐狗",
    },
    {
      src: shui,
      desc: "睡7天，床才能真爱",
      suitedTodo: "吃，睡，随时随地花式睡觉",
      unsuitedTod: "卧室不锁门",
    },
    {
      src: shou,
      desc: "变瘦变美变好看",
      suitedTodo: "瘦成人间理想",
      unsuitedTod: "炸鸡，奶茶",
    },
    {
      src: ya,
      desc: "鸭梨山大",
      suitedTodo: "做白日梦，梦里啥都有",
      unsuitedTod: "关你屁事，关我屁事",
    },
  ];

  randomIndex = 0;

  count = 0;

  lock = false;

  luckyInfo = this.luckyInfoList[this.randomIndex];

  mounted() {
    if (this.visitSource === "小程序") {
      this.share();
    }
    this.switchLucky();
    document.title = "双节假期黄历";
    window.zhuge.track("中秋国庆-黄历页");
  }

  // app分享

  appShare() {
    this.share();
  }

  // 跳转到好友邀请
  newCustomerGiftJump() {
    window.zhuge.track("中秋国庆-黄历页-礼包按钮");
    window.location.href = `${
      window.location.origin
    }/fe/gy-new-customer-gift/#/index${qs.stringify(getQueries(), {
      addQueryPrefix: true,
    })}`;
  }

  closeWrapper() {
    this.showCreateImg = false;
  }

  /**
   * 获取城市列表
   */
  async getCityList() {
    const res = await getCityList();
    if (!res) return;
    if (res.status === "ok") {
      /**/
    }
  }

  createImg() {
    window.zhuge.track("中秋国庆-黄历页-生成图片");
    if (this.lock) {
      return;
    }
    Toast.loading({
      duration: 0,
      message: "图片生成中...",
    });

    window.scrollTo(0, 0);

    const cloneElemet = document.querySelector("#clone") as HTMLElement;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    setTimeout(() => {
      html2canvas(cloneElemet, {
        scale: 4,
        onclone(doc) {
          const toastEle = doc.querySelector(".van-toast") as HTMLElement;
          toastEle.style.display = "none";
        },
      }).then(function (canvas) {
        const base64 = canvas.toDataURL("image/jpeg", 0.6);
        that.showCreateImg = true;
        that.preViewSrc = base64;
        Toast.clear();
      });
    }, 1000);
  }

  refresh() {
    window.zhuge.track("中秋国庆-黄历页-再测一次按钮");
    if (this.lock) {
      return;
    }
    this.count = 0;
    this.switchLucky();
  }

  switchLucky() {
    this.lock = true;
    const timer = setTimeout(() => {
      const randomIndex = parseInt(String(Math.random() * 15));
      // 如果随机生成的index和之前一样，则index+ 1, 如果index为14, 则设为0
      if (this.randomIndex === randomIndex) {
        this.randomIndex = +randomIndex + 1 > 14 ? 0 : +randomIndex + 1;
      } else {
        this.randomIndex = randomIndex;
      }
      this.luckyInfo = this.luckyInfoList[this.randomIndex];
      this.count++;
      if (this.count > 10) {
        clearTimeout(timer);
        this.lock = false;
        return;
      }
      this.switchLucky();
    }, 100);
  }
}
</script>

<style lang="scss">
.wrapper-container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
  .luck-container {
    width: 100%;
    height: 100vh;
    // background-image: url("~@/assets/img/bg-lucky.png");
    background-image: url("~@/assets/img/bg-lucky.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    overflow: scroll;

    &.clone {
      position: absolute;
      top: 9999px;
      left: 9999px;
      height: auto;

      .qrcode {
        display: flex;
      }

      .slogan {
        display: flex;
      }
    }

    .header {
      margin-top: 26px;
      width: 100%;
      height: 32.5px;
      background-image: url("~@/assets/img/top.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }

    .card {
      // position: absolute;
      // top: 26px;
      // left: 50%;
      // transform: translate(-50%, 0);
      margin-top: -32.5px;
      width: 374px;
      height: 585px;
      background-image: url("~@/assets/img/card.png");
      // background-image: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/gv421hieTpr0UmVrqJBDOw.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .title {
        margin-top: 67px;
        font-size: 23px;
        height: 23px;
        font-weight: bold;
      }

      .key-word {
        margin-top: 110px;
        height: 111px;
        width: 108px;
      }

      .desc {
        margin-top: 60px;
        font-weight: bold;
        font-size: 20px;
      }

      .suitedTodo-container {
        margin-top: 30px;
        min-width: 245px;
        height: 25px;
        display: flex;
        align-items: center;
        font-size: 14px;
        .icon {
          height: 25px;
          width: 25px;
          margin-right: 6px;
        }
      }

      .unsuitedTod-container {
        margin-top: 10px;
        min-width: 245px;
        height: 25px;
        display: flex;
        align-items: center;
        font-size: 14px;
        .icon {
          height: 25px;
          width: 25px;
          margin-right: 6px;
        }
      }

      .refresh-container {
        margin-top: 14px;
        display: flex;
        align-items: center;
        color: #e19431;
        font-size: 12px;
        .icon {
          height: 10px;
          width: 10px;
          margin-right: 3px;
        }
      }
    }

    .bottom-container {
      display: flex;
      justify-content: space-between;
      // position: absolute;
      // bottom: 32px;
      // left: 0;
      width: 100%;
      padding: 0px 28px;
      box-sizing: border-box;
      margin-bottom: 60px;
      position: relative;
      .refresh-button {
        width: 124px;
        height: 52px;
      }
      .gift-button {
        width: 163px;
        height: 52px;
      }
      .gift-icon {
        height: 68px;
        width: 62px;
        position: absolute;
        top: -13px;
        right: 156px;
        animation: zy 1s 0.15s linear infinite;
      }
    }

    .create-img-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.6);
      z-index: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .create-img {
        width: 80%;
        height: 80%;
        // position: absolute;
        // top: 50%;
        // left: 50%;
        // transform: translate(-50%, -50%);
      }

      .close-button {
        margin-top: 30px;
        height: 35px;
        width: 35px;
      }
    }

    .share-button {
      position: fixed;
      right: 0;
      top: 24px;
      height: 36px;
      width: 56px;
    }

    .qrcode {
      display: none;
      margin: 0 auto;
      margin-top: -26px;
      height: 86px;
      width: 86px;
      // border-radius: 50%;
    }

    .slogan {
      display: none;
      margin: 0 auto;
      margin-top: 4px;
      height: 35px;
      width: 120px;
      margin-bottom: 16px;
    }
  }
}

@-webkit-keyframes zy {
  10% {
    transform: rotate(20deg);
  }
  20% {
    transform: rotate(-15deg);
  }
  30% {
    transform: rotate(5deg);
  }
  40% {
    transform: rotate(-5deg);
  }
  50%,
  100% {
    transform: rotate(0deg);
  }
}
</style>
