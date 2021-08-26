<template>
  <div class="page__index">
    <main class="main">
      <div v-if="!token" class="login-out-status" @click="login()">
        <div class="login-btn"></div>
        <p>主人,绑定手机号才可以发起抽奖哦!</p>
      </div>
      <!-- 大转盘区域 -->
      <div v-else class="main-box">
        <lucky-wheel
          :total="total"
          :change="change"
          :newUrl="newUrl"
          :wheelUrl="wheelUrl"
          :prizeInfo="prizeInfo"
          :prizeIdFn="prizeIdFn1"
          :count="count"
          @endPrize="prizeEnd"
          @gameOver="gameOver"
        />

        <!-- 邀请助力区域 -->
        <div class="main-inviate">
          <h3 class="p1" @click="toPrize">我的奖品</h3>
          <div class="inviate-btn" @click="wxShare"></div>
          <p class="p2">每有一位好友助力可获得1次抽奖机会</p>
        </div>
        <!-- 内容区域 -->
        <div class="main-content">
          <!-- 好友助力信息 -->
          <div class="friend-info">
            <div class="friend-title"></div>
            <ul v-if="friendList.length > 0" class="friend-list">
              <li v-for="(item, index) in friendList" :key="index">
                <div class="friend-image">
                  <img :src="item.img || defaultImg" alt />
                </div>
                <div class="friend-message">
                  <h3>{{item.nn}}</h3>
                  <p>{{formatDate(item.ht, 'MM月dd')}}日前来助力</p>
                </div>
              </li>
            </ul>
            <div v-else class="no-one">还没有好友来助力哦!</div>
          </div>
          <!-- 活动规则 -->
          <div class="activity-rules">
            <div class="rules-title"></div>
            <div class="rules-description">
              <p>
                1、冠寓有权对通过技术手段等恶意影响活动公平原则的行为进行鉴定并取消其参加活动的资格。
                <br />2、在法律许可的范围内，冠寓保留变更、调整、终止本活动的权利以及调整或变换活动奖品的权利。
                <br />3、因不可抗力事件使本活动不能实现，冠寓不承担责任。不可抗力指自然灾害、政策管制等不可预见、不可控制或可预见但不可避免事件。
                <br />4、活动截止日期为2020年9月30日，活动最终解释权归冠寓所有。
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
    <prize :prizeObj="prizeObj" v-if="isShowPrize" @closeBtn="closeBtn"></prize>
    <shareTip v-if="isShowShareTip" @closeShareTip="closeShareTip"></shareTip>
  </div>
</template>

<script lang="ts">
import "../common/common.scss";
import "./index.scss";
import { Component, Inject } from "vue-property-decorator";
import Base from ".././Base";
import { getDetail, getCurPrize, getMyHelpers, lotteryShare } from "@/api";
import to from "await-to-js";
import { getToken, toLogin } from "@/utils/guanyu";
import { formatDate } from "@/utils/tools";
import luckyWheel from "@/components/lucky/index.vue";
import prize from "@/components/prize/index.vue";
import shareTip from "@/components/shareTip/index.vue";

import defaultImg from "../../assets/img/defaultImg.png";

@Component({
  components: {
    luckyWheel,
    prize,
    shareTip
  }
})
export default class Index extends Base {
  @Inject() visitSource!: string;
  // app和小程序分享
  @Inject() share!: Function;
  defaultImg = defaultImg;
  // 格式化时间
  prizeObj = {};
  isShowPrize = false;
  isShowShareTip = false;
  formatDate = formatDate;
  total = 6; //转盘的奖品数目
  change = 10000; //允许抽奖的次数
  newUrl = "http://www.longfor.com/";
  wheelUrl = [
    //require("../../assets/img/luck/图片3.jpg"),
    // require("../../assets/img/luck/bg_1.png")
  ];
  prizeInfo = [
    {
      icon: require("../../assets/img/luck/prize_1.png"),
      name: "华为P40", // 奖品名称
      isPrize: 1, // 该奖项是否为奖品
      id: 1,
      prizeDes: "华为P40"
    },
    {
      icon: require("../../assets/img/luck/prize_2.png"),
      name: "龙湖冠寓 98折租房券",
      isPrize: 1,
      id: 3,
      prizeDes: "龙湖冠寓 98折租房券"
    },
    {
      icon: require("../../assets/img/luck/prize_3.png"),
      name: "爱奇艺月卡",
      isPrize: 1,
      id: 4,
      prizeDes: "爱奇艺月卡"
    },
    {
      icon: require("../../assets/img/luck/prize_4.png"),
      name: "屈臣氏 豪气大礼包",
      isPrize: 1,
      id: 7,
      prizeDes: "屈臣氏 豪气大礼包"
    },
    {
      icon: require("../../assets/img/luck/prize_5.png"),
      name: "Kindle电子书",
      isPrize: 1,
      id: 6,
      prizeDes: "Kindle电子书"
    },
    {
      icon: require("../../assets/img/luck/prize_6.png"),
      name: "谢谢参与",
      isPrize: 0,
      id: 2,
      prizeDes: "谢谢参与"
    }
  ]; //抽中奖品id
  prizeIdFn = this.prizeIdFn1;
  // 抽奖次数
  count = 1;
  // 好友列表
  friendList: Record<string, any> = [];

  // 判断登录状态
  token = getToken();
  encodeUserId = "";

  mounted() {
    document.title = "冠寓四重奏，由你放“肆“租";
    // 获取活动详情
    this.getDetail();
    window.zhuge.track("抽奖活动发起页");
  }

  // 获取活动详情
  async getDetail() {
    const params = {
      channel: this.visitSource === "小程序" ? "wx_miniprogram" : "APP"
    };
    const [, res] = await to(getDetail(params));
    if (!res) return;
    if (res.code === 0) {
      // 活动剩余时间
      const { count, encodeUserId } = res.data || {};
      this.count = count;
      this.encodeUserId = encodeUserId;
      // 获取好友列表
      this.getMyHelpers({ encodeUserId });
      if (this.visitSource === "小程序") {
        this.share(this.encodeUserId);
      }
    }
  }

  // 增加分享次数
  async lotteryShare() {
    const [, res] = await to(lotteryShare());
    if (!res) return;
    if (res.code === 0) {
      this.getDetail();
    }
  }

  // 分享
  wxShare() {
    // 判断是否登录，如未登录则调起登录
    if (!this.token) {
      toLogin();
      return;
    }
    window.zhuge.track('邀请好友助力按钮');
    // 判断是否在微信小程序环境，如果是则弹窗提示右上角分享
    if (this.visitSource === "小程序") {
      this.isShowShareTip = true;
    }
    this.share(this.encodeUserId);
    // 每分享一次则增加一次分享次数
    this.lotteryShare();
  }

  toPrize() {
    this.$router.push({ path: "./myPrize" });
  }

  // 获取好友列表
  async getMyHelpers(params: Record<string, any>) {
    const [, res] = await to(getMyHelpers(params));
    if (!res) return;
    if (res.code === 0) {
      this.friendList = res.data || [];
    }
  }

  // 获取抽中奖品
  async getCurPrize() {
    window.zhuge.track("开始抽奖按钮");
    const params = {
      city: "全国",
      channel: this.visitSource === "小程序" ? "wx_miniprogram" : "APP"
    };
    //   获取抽中奖品
    const [, res] = await to(getCurPrize(params));
    if (!res) return;
    if (res.code === 0) {
      const prizeId = res.data.prizeCode;
      this.getDetail();
      return prizeId;
      /**/
    }
  }

  async prizeIdFn1() {
    const id = await this.getCurPrize();
    this.prizeObj =
      this.prizeInfo.filter(item => {
        return +id === item.id;
      })[0] || {};
    return id;
  }

  prizeEnd(flag: boolean) {
    let clickNum = this.total;
    if (flag) {
      clickNum--;
      console.log("clickNum:", clickNum);
    }
  }

  gameOver() {
    this.isShowPrize = true;
  }

  closeBtn() {
    this.isShowPrize = false;
  }

  closeShareTip() {
    this.isShowShareTip = false;
  }

  login() {
    if (!this.token) {
      toLogin();
      return;
    }
  }
}
</script>

