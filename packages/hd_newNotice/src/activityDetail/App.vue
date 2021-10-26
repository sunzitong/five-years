<template>
  <div id="active">
    <div class="activeImg">
      <img :src="storeDetail.coverImgUrl" alt="">
    </div>
    <div class="active-content">
      <div class="active-title">{{storeDetail.title}}</div>
      <div class="active-people">活动人数 {{storeDetail.joinNum}}</div>
      <div class="active-cost">{{storeDetail.chargeTypeName}}</div>
    </div>
    <div class="activity-rules">
      <div class="rules-list">
        <div class="rules-title">活动时间</div>
        <p>{{storeDetail.activityTimeStr}}</p>
      </div>
      <div class="rules-list" @click="signRight">
        <div class="rules-title">活动地点</div>
        <p>{{currentShop}}</p>
        <img v-if="projects.length > 1" class="choice-more" src="../assets/right-shops.png" alt="">
      </div>
    </div>
    <div v-html="storeDetail.content" class="detail-content" id="store-content"></div>
    <div class="right-sign">
      <div class="store-content">
        <div class="share-active" @click="shareModel">
          <img class="share-icon" src="../assets/community_share.png" alt="">
          <div class="share-name">分享活动</div>
        </div>
        <div class="right-now-out">
          <button v-if="signUpButton" class="right-now-common" @click="userSign">立即报名</button>
          <button v-else class="right-now-common noClick">{{storeDetail.signUpStateName}}</button>
        </div>
      </div>
    </div>
    <div class="choice-shops" :style="{'bottom': handleBtn + 'px'}">
      <div class="shop-title">请选择门店参加活动</div>
      <div v-if="signStatus === 'Enrolment'" class="shops-item-box">
        <div v-for="(item, index) in projects" v-bind:key="index"
        :class="shopsId === item.projectId ? 'shops-active' : 'shops-items'"
        @click="choiceShope(item)">{{item.projectName}}</div>
      </div>
      <div v-else class="shops-item-box">
        <div v-for="(item, index) in projects" v-bind:key="index"
        class="shops-items shops-unchoice">已报满 | {{item.projectName}}</div>
      </div>
      <div class="sure-sign" v-if="storeDetail.signUpButton" @click="sureChoice">确定</div>
      <div class="sure-sign sure-no-sign" @click="openApp" v-else>确定</div>
    </div>
    <div v-if="handleChoice" class="box-shadow" @click="hideShopChoice"></div>
    <div class="guide-brower" v-if="openBrower" @touchmove.prevent @click="hideBrower">
      <img class="guid-img" src="../assets/rander.png" alt="">
    </div>
    <SharePopup
      :isShowSharePopup="isShowSharePopup"
      :storeDetail="storeDetail"
      :isShowStyle="isShowStyle"
      @drawSharePosters="drawSharePosters()"
      @cancelShare="cancelShare()"></SharePopup>
    <SharePosters
      v-if="isShowSharePosters"
      :storeDetail="storeDetail"
      :shortUrl="shortUrl"
      @closePoster="closePoster()"></SharePosters>
  </div>
</template>
<script>

import { judgeDevice } from '@guanyu/h5-tools';
import { showShareButton, getAppAuthInfo, ShowSharePanel } from '@guanyu/guanyu-h5-tools';
import SharePopup from '@/components/SharePopup';
import SharePosters from '@/components/SharePosters';
import Vue from 'vue';
import { Toast } from 'vant';
import 'vant/lib/index.css';

import { getActiveDetail, applyJoinActive, getShortUrl } from '../utils/server';

Vue.use(Toast);

export default {
  name: '',
  components: {
    SharePopup,
    SharePosters,
  },
  data() {
    return {
      age: '18',
      storeDetail: {},
      projects: [
        {
          projectId: '116',
          projectName: '重庆源著店',
        },
      ],
      shareContent: '',
      submitLock: true, // 提交锁
      signUpButton: true, // 是否显示立即报名按钮
      signStatus: '', // 报名状态
      openBrower: false, // 是否显示引导遮罩
      handleChoice: false, // 选择门店
      projectName: null, // 门店名称
      handleBtn: -1400,
      imgPadding: null,
      currentShop: '', // 当前活动门店名称
      tpisContent: null, // 弹窗提示
      showMore: false, // 更多门店
      content: {}, // 富文本信息
      shopsId: null, // 选择的门店id
      activeId: null, // 活动id
      isShowSharePopup: false,
      isShowStyle: {
        shareIshow: null,
        fixedIsShow: null,
        shareBoxIsShow: null,
      },
      isShowSharePosters: false,
      shortUrl: '',
    };
  },
  beforeMount() {
    this.activeDetail();
    this.getShortUrl();
  },
  mounted() {
    const screenWidth = document.body.clientWidth;
    this.imgPadding = (Number(screenWidth) / 560 * 100);
  },
  methods: {
    // 根据当前连接获取短连接
    getShortUrl() {
      const url = window.location.href;
      getShortUrl(url).then((res) => {
        if (res.data.code === 1000) {
          this.shortUrl = res.data.data;
        }
      });
    },
    activeDetail() {
      this.activeId = this.getQueryVariable('id');
      // let token = null;
      let token = '';
      if (judgeDevice() === 'APP') {
        token = getAppAuthInfo().access_token;
      }
      if (judgeDevice() === '小程序') {
        token = this.getQueryVariable('sessionId');
      }
      const queryType = this.getQueryVariable('queryType') || '';
      const sendData = {
        id: this.activeId,
        queryType,
      };
      getActiveDetail(sendData, token).then((res) => {
        const { data: { data: detailData = {} } } = res;
        if (res.data.code === 10000) {
          this.storeDetail = detailData;
          this.currentShop = detailData.projects[0].projectName;
          this.projects = detailData.projects;
          this.signUpButton = detailData.signUpButton;
          this.signStatus = detailData.subState;
          this.showMore = detailData.projects.length > 0;
          const re1 = new RegExp('<.+?>', 'g');
          this.shareContent = String(detailData.content).replace(re1, '').slice(0, 20);
          if (judgeDevice() === 'APP' || judgeDevice() === '小程序') {
            this.shareFriend(); // 调用app端右上角分享
          }
          this.miniShare();
        } else {
          // 查询失败
          const defaultData = {
            coverImgUrl: 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/constract/uSAP-kk9t9k.png',
            title: '社区活动标题',
            beginTime: '2020-02-12 16:29:46',
            chargeTypeName: '免费',
            joinNum: 100,
            projects: this.projects,
            content: '活动内容介绍',
          };
          this.storeDetail = defaultData;
        }
      });
    },
    openApp() {
      // 打开app
      if (this.getIsWxClient()) {
        // 微信环境 显示引导弹窗
        this.openBrower = true;
      } else if (judgeDevice() === 'browser') {
        // 浏览器环境
        // 唤醒app 如果没有延时进入下载页面
        const detailUrl = encodeURIComponent(`${window.location.origin}/fe/hd_newNotice/detail.html?id=${this.activeId}`);
        window.location.href = `guanyu://web?url=${detailUrl}`;
        // window.location.href = `guanyu://page.gy/activities/signup?id=${this.activeId}&projectId=${this.shopsId}&projectName=${this.projectName}`;
        setTimeout(() => {
          window.location.href = 'down.html';
        }, 1600);
      }
    },
    choiceShope(item) {
      this.shopsId = item.projectId;
      this.projectName = item.projectName;
      this.currentShop = item.projectName;
    },
    hideShopChoice() {
      // 隐藏城市选择
      this.handleBtn = -1400;
      this.handleChoice = false;
    },
    signRight() {
      // 点击报名
      if (this.storeDetail.projects.length > 1) {
        this.handleChoice = true;
        this.handleBtn = 0;
      }
    },
    sureChoice() {
      // 确定选择门店
      if (this.shopsId) {
        // 表示已经选择门店了
        this.handleJoinActive();
        // window.location.href = `guanyu://page.gy/activities/signup?id=${this.activeId}&projectId=${this.shopsId}&projectName=${this.projectName}`;
      } else if (!this.signUpButton) {
        // 当活动处于不可报名的状态
        this.handleHrfUrl();
      } else {
        this.handleBtn = -1400;
        this.handleChoice = false;
      }
    },
    shareFriend() {
      // 分享给朋友
      // 1、获取用户token
      let token = '';
      if (judgeDevice() === 'APP') {
        token = getAppAuthInfo().access_token;
      }
      if (judgeDevice() === '小程序') {
        token = this.getQueryVariable('sessionId');
      }
      const shareUrl = `${window.location.origin}/fe/hd_newNotice/detail.html?id=${this.activeId}&token=${token}`;
      showShareButton({
        types: [],
        url: shareUrl,
        title: this.storeDetail.title,
        text: this.shareContent,
        image: this.storeDetail.coverImgUrl,
        shareMiniProgramUrl: null,
      });
    },
    shareModel() {
      let type = 2;
      if (window.location.href.includes('m.iguanyu.com')) {
        type = 0;
      }
      if (judgeDevice() === 'APP') {
        const token = getAppAuthInfo().access_token;
        const shareUrl = `${window.location.origin}/fe/hd_newNotice/detail.html?id=${this.activeId}&token=${token}`;
        ShowSharePanel({
          types: ['wx_session'],
          title: this.storeDetail.title,
          url: shareUrl,
          image: this.storeDetail.coverImgUrl,
          text: this.shareContent,
          shareMiniProgramUrl: `guanyu://miniProgram?userName=gh_1b7cffb1d9a2&path=${encodeURIComponent(`packageA/pages/bearWeb/bearWeb?item=${encodeURIComponent(shareUrl)}`)}&appId=wx1c1c8c073e2be1fc&type=${type}`,
        });
        return;
      }
      this.isShowSharePopup = true;
      this.isShowStyle = {
        shareIshow: 'showShare',
        fixedIsShow: 'showFixedBj',
        shareBoxIsShow: 'show',
      };
    },
    // 小程序内分享
    miniShare() {
      window.wx.miniProgram.postMessage({
        data: {
          title: this.storeDetail.title,
          imageUrl: this.storeDetail.coverImgUrl,
          path: window.location.href,
        },
      });
    },
    cancelShare() {
      this.isShowSharePopup = false;
      this.isShowStyle = {
        shareIshow: 'hideShare',
        fixedIsShow: 'hideFixedBj',
        shareBoxIsShow: 'hide',
      };
    },
    drawSharePosters() {
      this.isShowSharePosters = true;
    },
    closePoster() {
      this.isShowSharePosters = false;
    },
    removeTAG(str) {
      return str.replace(/<[^>]+>/g, '').replace(/&nbsp;/ig, '');
    },
    getIsWxClient() {
      const ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) || ua.match(/micromessenger/i)) {
        return true;
      }
      return false;
    },
    getQueryVariable(name) {
      const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
      const r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    },
    handleJoinActive() {
      // 判断是否可以申请报名活动
      if (judgeDevice() !== 'APP' && judgeDevice() !== '小程序') {
        // 不在app内部点击立即报名
        // 直接打开当前活动详情页
        this.handleSignResult();
        return;
      }
      let token = '';
      if (judgeDevice() === 'APP') {
        token = getAppAuthInfo().access_token;
      } else {
        // 如果是在小程序内则从url上取sessionId
        token = this.getQueryVariable('sessionId');
      }
      const sendData = {
        id: this.activeId,
      };
      if (!this.submitLock) return;
      this.submitLock = false;
      applyJoinActive(sendData, token).then((res) => {
        this.submitLock = true;
        if (res.data.code === 10000) {
          if (res.data.data.signUp) {
            // 可以报名
            // 在浏览器中执行不到这里 所以点击确定没有效果
            this.handleSignResult();
          } else {
            Toast(res.data.data.remarks);
            return false;
          }
        }
      }).catch(() => {
        this.submitLock = true;
      });
    },
    hideBrower() {
      // 隐藏引导遮罩
      this.openBrower = false;
    },
    userSign() {
      if (this.getQueryVariable('isPreview')) {
        Toast('预览模式下不可以报名哦');
      }
      const sessionId = this.getQueryVariable('sessionId');
      // 用户报名
      if (judgeDevice() === 'APP') {
        if (!getAppAuthInfo().access_token) {
          // 表示用户在未登录的情况下点击立即报名
          window.location.href = 'guanyu://page.gy/login';
        }
        this.handleJoinActive();
      } else if (judgeDevice() === '小程序') {
        if (!sessionId) {
          window.wx.miniProgram.navigateTo({ url: `/packageA/pages/login/login?webviewUrl=${encodeURIComponent(window.location.href)}` });
        }
        this.handleJoinActive();
      } else {
        this.handleSignResult();
      }
    },
    handleSignResult() {
      // 可以报名
      if (!this.shopsId) {
        // 没有选中门店
        if (this.storeDetail.projects.length > 1) {
          this.signRight();
          return;
        } else {
          this.shopsId = this.storeDetail.projects[0].projectId;
          this.projectName = this.storeDetail.projects[0].projectName;
        }
      }
      this.handleHrfUrl();
    },
    handleHrfUrl() {
      if (judgeDevice() === 'browser') {
        // 浏览器环境
        // 唤醒app 如果没有延时进入下载页面
        const detailUrl = encodeURIComponent(`${window.location.origin}/fe/hd_newNotice/detail.html?id=${this.activeId}`);
        window.location.href = `guanyu://web?url=${detailUrl}`;
        // window.location.href = `guanyu://page.gy/activities/signup?id=${this.activeId}&projectId=${this.shopsId}&projectName=${this.projectName}`;
        setTimeout(() => {
          window.location.href = 'down.html';
        }, 1600);
      } else if (judgeDevice() === 'APP') {
        window.location.href = `guanyu://page.gy/activities/signup?id=${this.activeId}&projectId=${this.shopsId}&projectName=${this.projectName}`;
      } else {
        const sessionId = this.getQueryVariable('sessionId');
        // 进入报名申请页面
        window.location.href = `apply.html?id=${this.activeId}&projectId=${this.shopsId}&projectName=${this.projectName}&sessionId=${sessionId}`;
      }
      this.handleBtn = -1400;
      this.handleChoice = false;
    },
  },
};
</script>
<style lang="less">
body, html{margin: 0px;padding: 0px;}
  .activeImg{
    width: 100%;
    max-height: 464px;
    margin-bottom: -4px;
    position: relative;
    overflow:hidden;
    display: block;
    background-position: center center;
    background-repeat: no-repeat;
    -webkit-background-size:cover;
    -moz-background-size:cover;
    background-size:cover;
    img {
      width: 100%;
    }
  }
  .active-content{
    padding: 17px 15px;
    margin: 0 12px;
    font-family: 'PingFangSC-Medium,PingFang SC';
    background: #ffffff;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    margin-top: -40px;
    position: relative;
    .active-title{
      width: 200px;
      line-height: 28px;
      font-size: 20px;
      color: #333333;
      font-weight: 600;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .active-people{
      position: absolute;
      right: 15px;
      top: 22px;
      font-size: 14px;
      color: #666666;
    }
    .active-cost{
      padding-top: 6px;
      color: #F18D00;
      font-weight: bold;
    }
  }
  .activity-rules {
    padding: 0 18px;
  }
  .rules-list {
    position: relative;
    margin-top: 12px;
    .rules-title {
      font-size: 15px;
      color: #333333;
      font-weight: bold;
    }
    p {
      margin: 0;
      padding: 5px 0 0;
      font-size: 15px;
      color: #666666;
    }
    .choice-more{
      position: absolute;
      width: 13px;
      height: 17px;
      right: -4px;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .active-rules {
    .active-common{
      font-size: 14px;
      height: 20px;
      line-height: 21.7px;
      margin-bottom: 5px;
      padding-left: 20px;
      font-weight: 400;
      font-family: 'PingFangSC-Regular,PingFang SC';
    }
    .active-time{
      color: #666666;
      background: url('../assets/time.png') no-repeat 0 center / 15px 15px;
      font-family: -apple-system,Helvetica,sans-serif;
      font-feature-settings:"tnum" 1;
    }
  }
  .join-shops{
    width: 95%;
    box-shadow:0px 0px 0px 0px rgba(0,0,0,0.08);
    margin: 0 auto;
    padding: 5px 0px 10px 0px;
    border-bottom: 1px solid #F0EDF0;
    position: relative;
    // background: url('../assets/right-shops.png')
    //               no-repeat
    //               right center / 13px 17px;
    font-family: 'PingFangSC-Medium,PingFang SC';
    .shop-title{
      height: 17px;
      line-height: 17px;
      margin: 10px 0px 5px 0px;
      color: #666666;
      font-size: 12px;
    }
    .specific-shps{
      height: 24px;
      line-height: 24px;
      color: #333333;
      font-size: 17px;
      span{
        margin-left: 5px;
      }
    }

  }
  .detail-content{
    font-size: 15px;
    color: #666666;
    line-height: 25px;
    font-family: 'PingFangSC-Regular,PingFang SC';
    padding: 18px 18px 0;
    // margin: 20px auto;
    padding-bottom: 107px;
    word-wrap:break-word;
    p {
      margin: 0;
    }
    img{
      width: 100%;
    }
  }
  .right-sign{
    height: 73px;
    width: 100%;
    position: fixed;
    bottom: 0px;
    background: #FFFFFF;
    padding-bottom: 14px;
    .store-content{
      width: 95%;
      height: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      max-height: 400px;
      overflow: auto;
      .share-active{
        width: 50px;
        height: 50px;
        margin: 17px 10px 3px 0px;
        flex: 2;
        .share-icon{
          width: 27px;
          height: 27px;
          display: block;
          margin: 0 auto;;
        }
        .share-name{
          color: #824921;
          font-size: 12px;
          font-weight: 400;
          text-align: center;
        }
      }
      .right-now-common{
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 17px;
        color: #FFFFFF;
        background: #F18D00;
        border-radius: 8px;
        border: none;
        margin-top: 13px;
        font-weight: 600;
        width: 100%;
        outline: none;
      }
      .noClick{
        background: #CCCCCC;
      }
      .right-now{
        flex: 1;
      }
      .right-now-out{
        flex: 9;
      }
    }
  }
  .box-shadow{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 333;
    background: #333333;
    opacity: 0.6;
  }
  .choice-shops{
    padding: 20px 3% 10px 3%;
    background: #FFFFFF;
    position: fixed;
    bottom: 0px;
    z-index: 444;
    font-family: 'PingFangSC-Medium,PingFang SC';
    width: 94%;
    transition: bottom 0.6s;
    .shop-title{
      height: 24px;
      line-height: 24px;
      font-size: 17px;
      color: #333333;
      font-weight: 500;
      margin: 0px 0px 10px 10px;
    }
    .shops-item-box {
      max-height: 320px;
      overflow-y: scroll;
    }
    .shops-items{
      padding-left: 20px;
      height: 50px;
      line-height: 50px;
      font-size: 15px;
      color: #666666;
      border-radius: 8px;
      background: rgba(249,246,244,1);
      margin: 0 auto 5px;
      border: 2px solid transparent;
    }
    .shops-unchoice{
      color: #CCCCCC;
    }
    .shops-active{
      padding-left: 20px;
      height: 50px;
      line-height: 50px;
      font-size: 15px;
      color: #F18D00;
      border-radius: 8px;
      background: rgba(249,246,244,1);
      margin: 0 auto 5px;
      font-weight: 600;
      border: 2px solid #F18D00;
    }
    .sure-sign{
      height: 50px;
      line-height: 50px;
      font-size: 17px;
      color: #FFFFFF;
      background: #F18D00;
      font-weight: 500;
      border-radius: 8px;
      margin: 25px auto 30px;
      text-align: center
    }
    .sure-no-sign{
      background: #CCCCCC;
    }
  }
  .guide-brower{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 777;
    background: rgba(0,0,0,0.7);
    .guid-img{
      width: 198px;
      height: 85px;
      position: absolute;
      right: 14px;
      top:6px;
    }
  }
  .sign-tips{
    max-width: 80%;
    min-width: 100px;
    text-align: center;
    letter-spacing: 1px;
    font-size: 15px;
    color: #FFFFFF;
    background: rgba(0,0,0,0.7);
    position: fixed;
    padding: 6px 4px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 6px;
  }
</style>
