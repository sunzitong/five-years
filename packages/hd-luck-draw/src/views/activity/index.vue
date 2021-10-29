<template>
  <div class="page__index">
    <main class="main">
      <!-- 头部区域 -->
      <div class="main-header">
        <!-- 用户信息 -->
        <div class="user-info">
          <div class="user-image">
            <img :src="starUser.img || defaultImg" alt />
          </div>
          <div class="user-message">
            <h3>{{starUser.nn || starUser.pp || '****'}}</h3>
            <p>邀请你为Ta助力获得抽奖资格</p>
          </div>
        </div>
        <!-- 活动相关-->
        <div class="activity-about">
          <p class="end-time">邀请还剩{{`${days}天${hours}`}}小时过期,快来帮忙吧!</p>
          <div class="btn">
            <div class="inviate" @click="toHome()"></div>
            <div class="help" @click="helpFriendComeOn()"></div>
          </div>
        </div>
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
                <p>{{formatDate(item.ht,'MM月dd')}}日前来助力</p>
                <!-- <p>{{dayjs(item.ht).month()+1}}月{{dayjs(item.ht).date()}}日前来助力</p> -->
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
              <br />4、活动最终解释权归冠寓所有。
            </p>
          </div>
        </div>
      </div>
    </main>
    <Success v-if="isShowSuccess" @closeBtn="closeBtn"></Success>
  </div>
</template>

<script lang="ts">
import "../common/common.scss";
import "./index.scss";
import { Toast } from "vant";
import { Component, Inject } from "vue-property-decorator";
import Base from ".././Base";
import { getMyHelpers, getStarUser, getDetail, lotteryJoin } from "@/api";
import to from "await-to-js";
import { getToken, toLogin } from "@/utils/guanyu";
import Success from "@/components/success/index.vue";
import dayjs from "dayjs";
import moment from "moment";
import { formatDate } from "@/utils/tools";
import defaultImg from "../../assets/img/defaultImg.png";

@Component({
  components: {
    Success
  }
})
export default class Index extends Base {
  @Inject() visitSource!: string;
  // app和小程序分享
  @Inject() share!: Function;
  // 格式化时间
  formatDate = formatDate;
  defaultImg = defaultImg;
  dayjs = dayjs;

  // 好友列表
  friendList: Record<string, any> = [];

  // 受邀好友
  starUser: Record<string, any> = {};

  // 活动剩余时间
  days = 0;
  hours = 0;

  // 获取当前用户token

  // 获取用户token
  token = getToken();
  encodeUserId = this.$route.query.encodeUserId;

  // 助力弹窗显示控制
  isShowSuccess = false;

  created() {
    // 被邀请页： 判断如果没有好友的token则跳转邀请页
    const { encodeUserId: frientUserId } = this.$route.query;
    if (!frientUserId) {
      this.$router.push({
        path: "/index"
      });
    }
  }

  mounted() {
    document.title = "冠寓四重奏，由你放“肆“租";
    window.zhuge.track("好友助力页");
    // 获取好友列表
    this.getMyHelpers();
    // 获取活动详情
    this.getDetail();
    // 获取受邀好友
    this.getStarUser();
  }

  /**
   * 获取邀请人信息
   */
  async getStarUser() {
    const [, res] = await to(getStarUser({ encodeUserId: this.encodeUserId }));
    if (!res) return;
    if (res.code === 0) {
      this.starUser = res.data;
    }
  }

  /**
   * 获取好友列表
   */
  async getMyHelpers() {
    const [, res] = await to(getMyHelpers({ encodeUserId: this.encodeUserId }));
    if (!res) return;
    if (res.code === 0) {
      this.friendList = res.data || [];
    }
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
      const { cd } = res.data;
      this.time(cd);
    }
  }

  time(totalSeconds: string) {
    const mmDuration = moment.duration(totalSeconds);
    this.days = parseInt(mmDuration.asDays().toString(), 10);
    this.hours = mmDuration.hours();
  }

  // 跳转发起助力页
  toHome() {
    window.zhuge.track("发起助力按钮");
    this.$router.push({
      path: `./index?sessionId=${this.token}`
    });
  }

  // 帮助好友助力
  async helpFriendComeOn() {
    // 判断是否登录，如未登录则调起登录
    if (!this.token) {
      toLogin();
      return;
    }
    window.zhuge.track("帮他助力按钮");
    const params = {
      encodeUserId: this.encodeUserId, //加密的邀请人的userId
      token: this.token //当前用户token
      //   token: 'dea5c01e9aa77ae8' //当前用户token
    };
    const [, res] = await to(lotteryJoin(params));
    if (!res) return;
    if (res.code === 0) {
      this.isShowSuccess = true;
    } else {
      Toast(res.msg);
    }
  }

  //   关闭助力成功弹窗
  closeBtn() {
    this.isShowSuccess = false;
    this.getMyHelpers();
  }
}
</script>

