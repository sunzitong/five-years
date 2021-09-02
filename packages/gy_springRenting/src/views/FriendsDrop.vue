<template>
  <div class="main-cont">
    <div
      v-if="token"
      :class="['logged-status', friendList.length <= 1 ? 'new-bg' : '']">
      <div class="progress-box">
        <div class="help-num">
          <!-- 当前已有<em> {{data.ic}} </em>位好友帮你助力 -->
          当前已有<em>{{data.ic}}</em>位好友帮你助力
          <p v-if="data.ic >= 3">
            已获得免租券奖励
          </p>
          <p v-else>
            <!-- 再邀请<em> {{3 - data.ic}} </em>个好友参与即可获得“抹零券" -->
            再邀请<em>{{3 - data.ic}}</em>个好友参与即可领取15天免租券
          </p>
        </div>
        <div class="progress-bar">
          <div
            :style="`width: ${barNum * 33.333}%`"
            class="bar-box"></div>
        </div>
        <div
          v-if="data.cd > 0"
          class="inviting-button"
          @click="invitingBtn()">
          邀请好友来助力串门
        </div>
        <!-- 活动结束 -->
        <div v-else class="end-activity"></div>
        <p class="end-time">
          <!-- 距离助力结束还有：{{`${dd}天${hh}时${mm}分${ss}秒`}} -->
          距离助力结束还有：<em>{{`${dd}`}}</em>天<em>{{`${hh}`}}</em>时<em>{{`${mm}`}}</em>分<em>{{`${ss}`}}</em>秒
          <!-- 距离助力结束还有：1天01时01分01秒 -->
        </p>
      </div>
      <!-- 好友列表 -->
      <div class="friends-list">
        <h2>已助力好友</h2>
        <div
          v-if="friendList.length > 0"
          class="swiper-container my-swiper-style swiper-no-swiping">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(friend, index) in friendList"
              :key="index">
              <div class="slide-box">
                <img :src="friend.img ? friend.img : avatar" alt="">
                <div class="friend-info">
                  <h4>{{friend.nn}}</h4>
                  <p>{{$moment(friend.ht).format("MM月DD日")}}前来助力</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="no-friends">
          <p>
            暂时还没有小伙伴为你助力
            <br>
            快去邀请好友来助力吧！
          </p>
        </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div
      v-if="!token"
      class="tourist-status">
      <div class="progress-box">
        <div class="auth"></div>
        <p class="help-num">主人，绑定手机号才可以发起助力哟！</p>
          <div
            class="inviting-button"
            @click="signIn()">
            绑定手机号
          </div>
        </div>
    </div>
    <!-- 活动结束 -->
    <!-- <div
      v-show="data.cd <= 0"
      class="end-activity">
      很抱歉，活动已结束！
    </div> -->
    <!-- 活动规则 -->
    <div class="activity-rules">
      <div class="activity-title"></div>
      <h4>活动有效期</h4>
      <p class="mt20">{{activityInfo.startTimeStr}} 至 {{activityInfo.endTimeStr}}</p>
      <h4 class="mt50">活动细则</h4>
      <p class="mt20">
        1. 通过页面中“邀请好友来助力串门”按钮,发送给微信好友;<br>
        2. 3个好友帮忙助力串门即可解锁15天免租券;<br>
        3. 以领券手机号登录冠寓APP或小程序，进入“我的——优惠券”查看；<br>
        4. 15天免租券限签约≥3个月方可使用；部分冠寓门店不可使用，具体详询门店；<br>
        5. 该活动不可参与其他活动叠加，15天免租券最终解释权归属龙湖冠寓。
      </p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import Swiper from 'swiper/js/swiper.min.js';
import 'swiper/css/swiper.min.css';

// 好友默认头像图片
import avatar from '../assets/avatar.png';

export default {
  name: 'friendsDrop',
  components: {

  },
  data() {
    return {
      friendList: [],
      data: {},
      token: '',
      activityInfo: {},
      barNum: '',
      daojishi: '',
      ss: 0,
      mm: 0,
      hh: 0,
      dd: 0,
      avatar,
      mySwiper: null,
    };
  },
  mounted() {
    window.zhuge.track('进入_2020双11-好友助力');
    document.title = '好友串门助力免租行动';
    this.token = this.getToken();
    // this.token = '024CFBDD88DBF92EC7879A7E959643BA';
    // this.token = '92a63b08d3d29977';
    // 获取活动信息
    this.getActivityDate();
    // 判断有token再请求接口数据
    // if (this.token) {
    //   // 获取助力好友数
    //   this.initFriendList();
    // }
    // this.initSwiper(this.friendList)
  },

  methods: {
    // 获取活动时间
    getActivityDate() {
      this.$axios.get('/coupon_api/api/help/number?type=2').then((res) => {
        if (res.data.code === 0) {
          this.activityInfo = res.data.data;
          if (res.data.data.an && this.token) {
            this.initData(res.data.data.an);
            this.initFriendList(res.data.data.an);
          }
        }
      });
    },
    convertTime(totalSeconds) {
      const mmDuration = this.$moment.duration(totalSeconds * 1000);
      this.dd = parseInt(mmDuration.asDays(), 10);
      this.hh = mmDuration.hours();
      this.mm = mmDuration.minutes();
      this.ss = mmDuration.seconds();
    },
    countDown(totalSeconds) {
      let ts = totalSeconds;
      const timer = setInterval(() => {
        ts -= 1;
        this.convertTime(ts);
        if (ts === 0) {
          this.data.cd = 0;
          clearInterval(timer);
        }
      }, 1000);
    },
    // 初始化swiper
    initSwiper(friensNum) {
      // eslint-disable-next-line no-unused-vars
      this.mySwiper = new Swiper('.swiper-container', {
        speed: 600,
        autoplay: friensNum.length > 2 ? {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        } : false, // 可选选项，自动滑动
        loop: friensNum.length > 2,
        roundLengths: true,
        direction: 'vertical',
        slidesPerView: 2,
        observer: true,
        observeParents: true,
      });
    },
    // 初始化页面数据
    initData(activityNumber) {
      const params = {
        an: activityNumber, // 助力活动编号
        t: this.token,
      };
      this.$axios.post('/coupon_api/api/help/my', {
        ...params,
      }).then((res) => {
        if (res.data.code === 0) {
          this.data = res.data.data;
          if (this.data.cd > 0) {
            this.countDown(this.data.cd);
          }
          if (this.data.ic >= 5) {
            this.barNum = 5;
          } else {
            this.barNum = this.data.ic;
          }
        }
      });
    },
    // 请求已助力的好友列表
    initFriendList(activityNumber) {
      const params = {
        n: activityNumber,
        t: this.token,
      };
      this.$axios.post('/coupon_api/api/help/my_helpers', {
        ...params,
      }).then((res) => {
        if (res.data.code === 0) {
          this.friendList = res.data.data;
          setTimeout(() => {
            // 好友列表轮播初始化
            this.initSwiper(this.friendList);
          }, 100);
        }
      });
    },
    // 获取token
    getToken() {
      // 获取APP tooken
      let token = {};
      // eslint-disable-next-line camelcase
      token = this.$getAppAuthInfo();
      if (token && token.access_token) {
        return token.access_token;
      }
    },
    // 唤起app登录
    signIn() {
      window.location.href = 'guanyu://page.gy/login';
    },
    // 唤起app分享面板
    miniProgramShare(token) {
      this.$ShowSharePanel({
        types: ['wx_session'],
        title: '召唤好友串门 助力减免房租',
        text: '召唤好友串门 助力减免房租',
        url: 'http://m.test109.iguanyu.com/fe/gy_springRenting/#/friendsDrop',
        image: 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/wVH680uPToz_fgKeKkEgNA.png',
        shareMiniProgramUrl: `guanyu://miniProgram?userName=gh_1b7cffb1d9a2&path=${encodeURIComponent('/packageB/pages/springRent/assist?scene=')}${encodeURIComponent(token)}&appId=wx1c1c8c073e2be1fc&type=0`,
      });
    },
    // 邀请好友助力
    invitingBtn() {
      const params = {
        an: this.activityInfo.an, // 助力活动编号
        city: '全国', // 城市名称
        t: this.token, // 用户凭证
      };
      // const params = {};
      this.$axios.post('/coupon_api/api/help/start', {
        ...params,
      }).then((res) => {
        if (res.data.code === 0) {
          this.miniProgramShare(res.data.data.s);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
  @import '../style/reset.css';
  .main-cont {
    padding-top: 942px;
    padding-bottom: 150px;
    box-sizing: border-box;
    width: 100%;
    background: #6608FF url('https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/51JDbIeH9AS-x1nxRcTs4w.png') 0 0 no-repeat;
    background-size: 100%;
  }

  .logged-status {
    background: url('https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/w3DRuCot8TTzo9_vvbwomw.png') 0 0 no-repeat;
    background-size: 100% 100%;
    padding: 97px 80px 72px 80px;

    // 当前助力信息
    .progress-box {
      padding-top: 85px;
      text-align: center;

      .help-num {
        white-space:nowrap;
        font-size: 30px;
        font-weight: bold;
        color: #001D9B;
        line-height: 42px;
        letter-spacing: 1px;

        em {
          font-size: 48px;
          color: #FF7F00;
          font-weight: bold;
          letter-spacing: 3px;
          line-height: 67px;
        }
      }

      // 进度条
      .progress-bar {
        width: 100%;
        height: 23px;
        overflow: hidden;
        background: #05003E;
        border: 4px solid #0B83FF;
        border-radius: 40px;
        margin-top: 60px;
        // padding: 5px;
        box-sizing: border-box;
        display: flex;
        align-items: center;

        .bar-box {
          // width: 100%;
          height: 23px;
          background: url(https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/k7H_DXmnH7mLURAFQoR89A.png) 0 0 no-repeat;
          background-size: cover;
        }
      }

      // 邀请好友按钮
      .inviting-button {
        margin: 40px auto 0px;
        width: 407px;
        height: 92px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: url('https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/eTNug9yLp_DMDwA0Z51z3g.png') 0 0 no-repeat;
        background-size: 100%;
        font-size: 30px;
        line-height: 42px;
        letter-spacing: 1px;
        font-weight: bold;
        color: #FFFFFF;
      }

      // 活动结束时间
      .end-time{
        font-size: 24px;
        font-weight: normal;
        color:#001D9B;
        line-height: 33px;
        margin-top: 47px;

        em {
          margin-left: 5px;
          margin-right: 5px;
          display: inline-block;
          width: 48px;
          line-height: 48px;
          background-color: #DBFAFF;
        }
      }
    }

    // 好友列表
    .friends-list {
      background: #E5EAFF;
      margin-top: 41px;

      h2 {
        padding-left: 30px;
        padding-top: 16px;
        line-height: 42px;
        font-size: 30px;
        letter-spacing: 1px;
        font-weight: bold;
        color: #001D9B;
      }

      .no-friends {
        margin-top: 12px;
        width: 100%;
        text-align: center;

        p {
          font-size: 24px;
          line-height: 33px;
          letter-spacing: 1px;
          color: #001D9B;
          font-weight: normal;
          padding: 55px 0 90px;
        }
      }

      .my-swiper-style {
        width: 550px;
        margin-top: 10px;

        .swiper-wrapper {
          min-height: 146px;
          max-height: 292px;
          // flex-direction: column;
        }

        .swiper-slide {
          .slide-box {
            overflow: hidden;
            padding: 30px 20px;
            background: #E5EAFF;
            margin-top: 2px;
          }

          img {
            width: 80px;
            height: 80px;
            background: #000000;
            border-radius: 50%;
            float: left;
          }

          // 好友信息
          .friend-info {
            float: left;
            padding-left: 20px;
            width: 400px;

            h4 {
              font-size: 30px;
              color: #001D9B;
              font-weight: bold;
              line-height: 42px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              letter-spacing: 1px;
            }

            p {
              font-size: 26px;
              color: #2A4EEB;
              line-height: 37px;
              font-weight: normal;
              height: 37px;
              line-height: 37px;
            }
          }
        }
      }
    }
  }

  // 没有助力好友
  .new-bg {
    background: url('https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/w3DRuCot8TTzo9_vvbwomw.png') 0 0 no-repeat;
    background-size: 100%;
    height: 810px;
  }

  // 未登录
  .tourist-status {
    padding: 97px 80px 72px 80px;
    background: url('https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/5V2WLOzCJi0Qp--2tEtHZA.png') 0 0 no-repeat;
    background-size: 100%;
    height: 600px;

    .progress-box {
      padding-top: 125px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .auth {
        padding-bottom: 65px;
        width: 200px;
        height: 200px;
        background: url('https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/Dpa61zIJ6_bKo5r5Zdnb5w.png') 0 0 no-repeat;
        background-size: 100%;
      }

      .inviting-button {
        margin: 40px auto 0px;
        width: 407px;
        height: 92px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: url('https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/eTNug9yLp_DMDwA0Z51z3g.png') 0 0 no-repeat;
        background-size: 100%;
        font-size: 30px;
        font-weight: bold;
        color: #FFFFFF;
        line-height: 42px;
        text-indent: inherit;
      }

      .help-num {
        font-size: 30px;
        font-weight: bold;
        color: #001D9B;
        line-height: 42px;
        letter-spacing: 1px;
      }
    }
  }

  // 活动结束
  .end-activity {
    margin: 40px auto 0px;
    width: 407px;
    height: 92px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/gRwUuHJXe1hL1tHlCuZQDQ.png") 0 0 no-repeat;
    background-size: 100%;
    font-size: 30px;
    font-weight: bold;
    color: #FFFFFF;
    line-height: 42px;
    text-indent: inherit;
  }

  // 活动规则
  .activity-rules {
    position: relative;
    margin: 62px 30px 0;
    padding: 84px 11px 36px 28px;
    background: linear-gradient(180deg, #6AA6FF 0%, #6B69FF 100%);
    box-shadow: 0px 2px 4px 0px #2527EC;
    border-radius: 24px;

    .activity-title {
      position: absolute;
      top: -37px;
      left: 50%;
      transform: translatex(-50%);
      width: 402px;
      height: 90px;
      background: url('https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/0Ha7ko51XljYafOHJ0tDPA.png') 0 0 no-repeat;
      background-size: 100%;
    }

    h4 {
      line-height: 50px;
      font-size: 36px;
      font-weight: bold;
      color: #FFFFFF;
    }

    p {
      font-size: 32px;
      font-weight: normal;
      color: #E1F1FF;
      line-height: 55px;
    }

    .mt50 {
      margin-top: 50px;
    }

    .mt20 {
      margin-top: 20px;
    }
  }
</style>
