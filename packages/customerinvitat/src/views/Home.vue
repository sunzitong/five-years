<template>
  <div class="five-years-container">
    <img class="bg" src="https://goyoo-assets.longfor.com/prod/app/9by7jrFf3OcwhSr2LaLiPA.png" alt="" />
    <img
      class="btn"
      @click="invitationBtn"
      src="https://goyoo-assets.longfor.com/prod/app/nC2pkHuLLdNFSk_my_Fi-g.png"
      alt=""
    />
    <div class="activity-btn" @click="invitationRecord">邀请记录</div>
    <a v-if="GyVirtualPhone" class="advisory-phone" :href="'tel:' + GyVirtualPhone">
      <img
        src="https://goyoo-assets.longfor.com/test/app/b7hbq78Cchg3ujKWzWlkjw.png"
        class="advisory-icon"
        alt=""
      />
    </a>
    <!-- 邀请记录弹窗 -->
    <div class="invit-popup">
      <invitPopup
        v-if="invitationIsShow"
        @closeInvitPopup="closeInvitPopup()"
        :invitationList="invitationList"
      />
    </div>
    <div v-if="guide" class="show_share" @touchmove.prevent @click="hide_show">
      <img class="guide_user" src="https://goyoo-assets.longfor.com/prod/app/AqIny-WHGW1HGWMYRFmSXQ.png" alt />
    </div>
    <toast></toast>
  </div>
</template>

<script>
import toast from '../components/toast';
import InvitPopup from '../components/invitPopup';
import moment from 'moment';
// import zhugeio from "@guanyu/zhugeio";
// import { judgeDevice } from "@guanyu/h5-tools";
import { ShowSharePanel, judgeSystem, getAppInfo } from '@guanyu/guanyu-h5-tools';

export default {
  name: 'home',
  components: {
    toast,
    InvitPopup,
  },
  data() {
    return {
      invitationIsShow: false,
      // token: '608263f898d62fcb',
      token: '',
      toeknGent: '',
      guide: false, // 引导
      InProgram: false, // 是否在小程序内
      activeTime: null, // 活动时间
      shareTypes: null,
      btnStatus: Boolean,
      isFullScreen: false,
      myBonus: '0',
      shareTitle: '跟着老友住冠寓，得神秘大礼包！',
      shareText: '住好房，拿好礼。加入够友圈，神秘大礼包送不停！',
      shareImg: 'https://goyoo-assets.longfor.com/prod/app/c8w58qz9q_qc1PTKGwz8OQ.png',
      isNoTenant: false,
      active: {
        endTime: true,
      },
      invitationList: [],
      encodeUserId: '',
      isInvitationClick: false,
      miniType: 0,
      GyVirtualPhone: this.getQueryVariable('GyVirtualPhone'),
    };
  },
  beforeMount() {
    this.shareTypes = judgeSystem() === 'isIos' ? ['wx_session', 'wx_timeline'] : ['wx_session'];
    // 获取冠寓app token
    this.getAuthInfo();
    // 获取页面基本信息
    this.getMyBonus();
    // 根据用户token获取加密userId
    this.getEncodeUserId();
  },
  mounted() {
    // 根据域名判断环境
    this.judgeEnv();
    //判断是否是全面屏
    // this.judgeBigScreen();
    this.initailShareData(); // 初始化分享
    window.zhuge.track('好友邀请页');
    this.beginTime = new Date().getTime();
    window.GyWebViewCloseFn = () => {
      const endTime = new Date().getTime();
      window.zhuge.track('页面访问时长', {
        页面名称: '好友邀请页',
        停留时长: endTime - this.beginTime,
      });
    };
    window.onbeforeunload = function () {
      const endTime = new Date().getTime();
      window.zhuge.track('页面访问时长', {
        页面名称: '好友邀请页',
        停留时长: endTime - this.beginTime,
      });
    };
  },
  computed: {
    noClick: () => {
      if (this.isFullScreen) {
        this.btnStatus = true;
      }
      if (!this.isInvitationClick) {
        this.btnStatus = false;
      }
    },
  },
  methods: {
    judgeEnv() {
      if (!window.location.href.includes('m.iguanyu.com')) {
        this.miniType = 2;
      }
    },
    judgeBigScreen() {
      //，这里根据返回值 true 或false ,返回true的话 则为全面屏
      const rate = window.screen.height / window.screen.width;
      let limit = window.screen.height == window.screen.availHeight ? 1.8 : 1.65; // 临界判断值
      const userAgent = navigator.userAgent;
      if (userAgent.indexOf('iPhone') >= 0) {
        // window.screen.height为屏幕高度
        //  window.screen.availHeight 为浏览器 可用高度
        if (rate > limit) {
          this.isFullScreen = true;
        }
      }
    },
    // 获取用户token
    getAuthInfo() {
      let tempStr = null;
      let user = navigator.userAgent.toLowerCase();
      // 小程序环境内
      if (user.match(/MicroMessenger/i) == 'micromessenger') {
        this.token = this.getQueryVariable('sessionId');
        return;
      }
      // 麦芽web-view中
      if (user.includes('maiawebkit')) {
        this.token = this.getQueryVariable('token');
        return;
      }
      if (typeof fetchAuthInfo == 'function') {
        this.isIOS = true;
        tempStr = window.fetchAuthInfo();
        if (tempStr != undefined) {
          this.token = tempStr.access_token || '';
        }
      } else if (
        typeof window.gyAndroid != 'undefined' &&
        typeof window.gyAndroid.fetchAuthInfo == 'function'
      ) {
        this.isIOS = false;
        tempStr = JSON.parse(window.gyAndroid.fetchAuthInfo());
        if (tempStr.access_token != undefined) {
          this.token = tempStr.access_token || '';
        }
      }
    },
    // 根据用户token获取加密userId
    getEncodeUserId() {
      //   let user = navigator.userAgent.toLowerCase();
      this.$axios
        .post(`/coupon_api/api/recommend/my/encode_user?token=${this.token}`)
        .then((res) => {
          const { data = {} } = res || {};
          const { code = '', data: response = '' } = data;
          if (code === 0) {
            this.encodeUserId = response;
          } else if (response.code === 401) {
            alert('登陆过期');
          }
        })
        .catch(() => {
          // token异常 跳转到登录页
        });
    },
    // 隐藏遮罩
    hide_show() {
      this.guide = false;
    },
    // 获取地址栏参数
    getQueryVariable(variable) {
      let query = window.location.search.substring(1);
      let vars = query.split('&');
      for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return false;
    },
    // 初始化分享
    initailShareData() {
      let user = navigator.userAgent.toLowerCase();
      if (user.match(/MicroMessenger/i) == 'micromessenger') {
        // 微信内
        window.wx.miniProgram.postMessage({
          data: {
            title: '跟着老友住冠寓，得神秘大礼包！',
            imageUrl:
              'https://goyoo-assets.longfor.com/prod/app/c8w58qz9q_qc1PTKGwz8OQ.png',
            path: `${window.location.origin}/fe/newfriend/?encodeuserId=${this.getQueryVariable(
              'sessionId'
            )}`,
          },
        });
      }
      // if (judgeDevice() === 'APP') {
      //   let urlFriend = encodeURIComponent(`${window.location.origin}/fe/newfriend/?encodeuserId=${this.encodeUserId}`)
      //   showShareButton({
      //     types: this.shareTypes,
      //     title: this.shareTitle,
      //     url: decodeURIComponent(urlFriend),
      //     image: this.shareImg,
      //     text: this.shareText,
      //     shareMiniProgramUrl: `guanyu://miniProgram?userName=gh_1b7cffb1d9a2&path=${encodeURIComponent(`/packageA/pages/bearWeb/bearWeb?item=${urlFriend}`)}&appId=wx1c1c8c073e2be1fc&type=${this.miniType}`,
      //   });
      // }
    },
    // 获取页面基本信息
    getMyBonus() {
      //获取活动详情
      this.$axios
        .get(`/coupon_api/api/recommend?city=北京`)
        .then((res) => {
          const { data = {} } = res || {};
          const { code = '', data: response = '' } = data;
          if (code === 0) {
            this.active = response;
          } else {
            // 活动结束
            this.active.endTime = false;
          }
        })
        .catch(() => {
          // token异常 跳转到登录页
        });
      // 获取奖金数
      this.$axios
        .post(`/coupon_api/api/recommend/my/bonus?token=${this.token}`, this.token)
        .then((res) => {
          const { data = {} } = res || {};
          const { code = '', data: response = '' } = data;
          if (code === 0) {
            this.myBonus = response.data;
          }
        })
        .catch(() => {
          // token异常 跳转到登录页
        });
      // 获取邀请记录
      this.$axios
        .post(`/coupon_api/api/recommend/my?channel=app&token=${this.token}`)
        .then((res) => {
          const { data = {} } = res || {};
          const { code = '', data: response = '' } = data;
          if (code === 0) {
            this.invitationList = response.invitations;
            this.invitationList.map((item) => {
              if (item.checkInTime) {
                item.checkInTime = moment(item.checkInTime).format('YYYY-MM-DD');
              } else {
                item.checkInTime = '--';
              }
            });
          } else if (code === 401) {
            alert('登录异常');
          }
        });
      // 获取是否是租客
      this.$axios
        .post(`/coupon_api/api/recommend/my/is_signed?token=${this.token}`)
        .then((res) => {
          const { data = {} } = res || {};
          const { code = '', data: response = '' } = data;
          if (code === 0) {
            this.isNoTenant = response.data;
            this.isInvitationClick = true;
          }
        })
        .catch(() => {
          this.isInvitationClick = false;
        });
    },
    // 时间转化
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '年';
      var M =
        (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '月' : date.getMonth() + 1) +
        '月';
      var D = date.getDate() + '日';
      return Y + M + D;
    },
    //邀请好友调用app原生分享弹窗
    invitationBtn() {
      window.zhuge.track('好友邀请页-立即邀请好友按钮');
      let user = navigator.userAgent.toLowerCase();
      if (!this.token) {
        window.location.href = 'guanyu://page.gy/login';
      }
      if (user.match(/MicroMessenger/i) == 'micromessenger') {
        // 小程序内
        if (this.getQueryVariable('sessionId') === '') {
          // 没有登录
          window.wx.miniProgram.navigateTo({
            url: `/packageA/pages/login/login?webviewUrl=${encodeURIComponent(
              window.location.href
            )}`,
          });
        } else {
          // 引导用户分享
          this.guide = true;
        }
      }
      window.zhuge.track('好友邀请页-立即邀请好友按钮');
      if (!this.isInvitationClick) {
        return;
      }
      // 是租户并且在活动时间内分享
      if (this.token && this.isNoTenant && this.active.endTime) {
        this.shareFrien();
      } else if (this.token && !this.active.endTime) {
        //活动时间已结束，不能发起分享
        this.$toast('该活动已结束，暂时不能发起邀请', 5000);
      } else if (this.token && !this.isNoTenant) {
        //不是租户，不能发起分享
        this.shareFrien();
      }
    },
    compareVersion(v1, v2) {
      v1 = v1.split('.');
      v2 = v2.split('.');
      const len = Math.max(v1.length, v2.length);

      while (v1.length < len) {
        v1.push('0');
      }
      while (v2.length < len) {
        v2.push('0');
      }

      for (let i = 0; i < len; i++) {
        const num1 = parseInt(v1[i]);
        const num2 = parseInt(v2[i]);

        if (num1 > num2) {
          return 1;
        } else if (num1 < num2) {
          return -1;
        }
      }
      return 0;
    },
    // 分享事件
    shareFrien() {
      let urlFriend = encodeURIComponent(
        `${window.location.origin}/fe/newfriend?encodeuserId=${this.encodeUserId}`
      );

      let user = navigator.userAgent.toLowerCase();

      // 麦芽webview中

      if (user.includes('maiawebkit')) {
        const shareParam = {
          shareUrl: 'https://www.baidu.com',
          shareImg: this.shareImg,
          shareTitle: this.shareTitle,
          shareText: this.shareText,
          miniUserName: 'gh_1b7cffb1d9a2',
          miniPath: `/packageA/pages/bearWeb/bearWeb?item=${urlFriend}`,
          type: 'wxSession',
          miniAppId: '',
          miniType: this.miniType,
        };

        const shareParams = [];

        for (let i in shareParam) {
          shareParams.push(`${i}=${encodeURIComponent(shareParam[i])}`);
        }

        const url = 'longfor://share/share?' + shareParams.join('&');

        window.location.href = url;

        return;
      }

      // 冠寓webview中

      const appInfo = getAppInfo() || {};
      const { app_version = '' } = appInfo;
      let shareMiniProgramUrl;
      // android会多解密一次，所以要多encodeURIComponent一次
      if (judgeSystem() === 'isAndroid') {
        if (app_version) {
          if (this.compareVersion(app_version, '3.16.0') >= 0) {
            shareMiniProgramUrl = `guanyu://miniProgram?userName=gh_1b7cffb1d9a2&path=${encodeURIComponent(
              `/packageA/pages/bearWeb/bearWeb?item=${urlFriend}`
            )}&appId=wx1c1c8c073e2be1fc&type=${this.miniType}`;
          } else {
            shareMiniProgramUrl = `guanyu://miniProgram?userName=gh_1b7cffb1d9a2&path=${encodeURIComponent(
              encodeURIComponent(`/packageA/pages/bearWeb/bearWeb?item=${urlFriend}`)
            )}&appId=wx1c1c8c073e2be1fc&type=${this.miniType}`;
          }
        }
      } else {
        shareMiniProgramUrl = `guanyu://miniProgram?userName=gh_1b7cffb1d9a2&path=${encodeURIComponent(
          `/packageA/pages/bearWeb/bearWeb?item=${urlFriend}`
        )}&appId=wx1c1c8c073e2be1fc&type=${this.miniType}`;
      }

      ShowSharePanel({
        types: this.shareTypes,
        title: this.shareTitle,
        url: urlFriend,
        image: this.shareImg,
        text: this.shareText,
        shareMiniProgramUrl,
      });
    },
    // 展示邀请记录弹窗
    invitationRecord() {
      this.invitationIsShow = true;
      window.zhuge.track('好友邀请页-邀请记录按钮');
    },
    // 关闭邀请记录弹窗
    closeInvitPopup() {
      this.invitationIsShow = false;
    },
  },
};
</script>
<style lang="scss" scope>
@import '../style/reset.css';
@import './Home.scss';
</style>
