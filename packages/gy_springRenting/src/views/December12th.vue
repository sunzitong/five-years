<template>
  <div class="main-cont">
    <div v-if="token" :class="['logged-status', friendList.length <= 1 ? 'new-bg' : '']">
      <div class="progress-box">
        <div class="clock-container">
          <div>{{ dd }}</div>
          <div>{{ hh }}</div>
          <div>{{ mm }}</div>
          <div>{{ ss }}</div>
        </div>
        <div class="help-num">
          <!-- 当前已有<em> {{data.ic}} </em>位好友帮你助力 -->
          当前已有<em>{{ data.ic }}</em
          >位好友帮你助力
          <p v-if="data.ic >= 3">已成功解锁15天免租券<br />及惊喜大礼包点击下方领取!</p>
          <p v-else>
            <!-- 再邀请<em> {{3 - data.ic}} </em>个好友参与即可获得“抹零券" -->
            再邀请<em>{{ 3 - data.ic }}</em
            >个好友参与即可解锁15天免租券<br />及惊喜大礼包
          </p>
        </div>
        <div class="progress-bar">
          <div :style="`width: ${barNum * 33.333}%`" class="bar-box"></div>
        </div>
        <div v-if="data.cd > 0" class="inviting-button" @click="invitingBtn()">
          邀请好友来助力
        </div>
        <!-- 活动结束 -->
        <div v-else class="end-activity"></div>
        <div v-show="barNum >= 3" class="coupon-container">
          <div class="text">领取优惠券</div>
          <div class="coupon-list-container">
            <img
              alt=""
              src="https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/NHGjXAJGulmXKv6EHVVahA.png"
              @click="
                jumpH5(
                  'https://gsactivity.diditaxi.com.cn/gulfstream/activity/v3/giftpackage/index?g_channel=825cbf55362972c58dda885f6c736140&lang=zh-CN'
                )
              "
            />
            <img
              alt=""
              src="https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/llTbssl105xSlHce5w0RSA.png"
              @click="
                jumpH5(
                  'https://efqi-sf-self-creation.weixinjia.net/mobile/index?channel=2&aid=eFqiWUkXVtJqweXruGwKwhC5AoUUpXHQ'
                )
              "
            />
            <img
              alt=""
              src="https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/_vql8H3tGpthPOH1i5clvw.png"
              @click="
                jumpH5(
                  'https://act.huolala.cn/rs/201903/act_user_ling/index.html?uuid=0ypl4e'
                )
              "
            />
          </div>
        </div>
        <div class="friends-list">
          <h2>已助力好友</h2>
          <div
            v-if="friendList.length > 0"
            class="swiper-container my-swiper-style swiper-no-swiping"
          >
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(friend, index) in friendList" :key="index">
                <div class="slide-box">
                  <img :src="friend.img ? friend.img : avatar" alt="" />
                  <div class="friend-info">
                    <h4>{{ friend.nn }}</h4>
                    <p>{{ $moment(friend.ht).format('MM月DD日') }}前来助力</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="no-friends">
            <p>
              暂时还没有小伙伴为你助力
              <br />
              快去邀请好友来助力吧！
            </p>
          </div>
        </div>
      </div>
      <!-- 好友列表 -->
    </div>
    <!-- 未登录 -->
    <div v-if="!token" class="tourist-status">
      <div class="progress-box">
        <div class="auth"></div>
        <p class="help-num">主人，绑定手机号才可以发起助力哟！</p>
        <div class="inviting-button" @click="signIn()">绑定手机号</div>
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
      <p class="mt20">{{ activityInfo.startTimeStr }} 至 {{ activityInfo.endTimeStr }}</p>
      <h4 class="mt50">活动细则</h4>
      <p class="mt20">
        1. 通过页面中“邀请好友来助力”按钮,发送给微信好友;<br />
        2. 3个好友帮忙助力成功即可解锁15天免租券和其他3个优惠礼券;<br />
        3. 15天免租券限签约3-6月方可使用；部分冠寓门店不可使用，具体详询门店;<br />
        4. 15天免租券查看方式：以领券手机登录冠寓APP，进入“我的 - 优惠券”查看即可;<br />
        5. 货拉拉无忧搬家券查看方式：以领券手机登录货拉拉APP，进入“我的 - 优惠券”查看即可;<br />
        6. 顺丰快运优惠礼券查看方式：微信关注“顺丰快运”公众号，进入“个人中心”查看即可;<br />
        7. 滴滴拼车专属红包查看方式：以领券手机登录滴滴APP，进入“我的 - 钱包 - 券”查看即可;<br />
        8. 该活动不可参与其他活动叠加，15天免租券最终解释权归属龙湖冠寓。
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
  components: {},
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
    window.zhuge.track('进入_2020双12-好友助力');
    document.title = '15天免费住';
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
      this.$axios.get('/coupon_api/api/help/number?type=3').then((res) => {
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
        autoplay:
          friensNum.length > 2
            ? {
              delay: 3000,
              stopOnLastSlide: false,
              disableOnInteraction: false,
            }
            : false, // 可选选项，自动滑动
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
      this.$axios
        .post('/coupon_api/api/help/my', {
          ...params,
        })
        .then((res) => {
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
      this.$axios
        .post('/coupon_api/api/help/my_helpers', {
          ...params,
        })
        .then((res) => {
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
    jumpH5(url) {
      window.location.href = url;
    },
    // 唤起app分享面板
    miniProgramShare(token) {
      this.$ShowSharePanel({
        types: ['wx_session'],
        title: '15天免租券，等你来助力！',
        text: '15天免租券，等你来助力！',
        url: 'http://m.test109.iguanyu.com/fe/gy_springRenting/#/december12th',
        image: 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/LeqMpaaZ-jL_NlOfsRnkJA.png',
        shareMiniProgramUrl: `guanyu://miniProgram?userName=gh_1b7cffb1d9a2&path=${encodeURIComponent(
          '/packageB/pages/december12th/assist?scene='
        )}${encodeURIComponent(token)}&appId=wx1c1c8c073e2be1fc&type=0`,
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
      this.$axios
        .post('/coupon_api/api/help/start', {
          ...params,
        })
        .then((res) => {
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
  padding-top: 1171px;
  padding-bottom: 150px;
  box-sizing: border-box;
  width: 100%;
  background: #3e19b5
    url('https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/htnVOhkldNE-wvwzjhzewA.png') 0 0
    no-repeat;
  background-size: 100%;
}

.logged-status {
  background: url('https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/Xlom6wkj7Mn29w8QBHk0SQ.png')
    0 0 no-repeat;
  margin: 0 auto;
  width: 730px;
  background-repeat: no-repeat;
  background-size: contain;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  // 当前助力信息
  .progress-box {
    margin: 202px auto 0;
    width: 714px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 50px 20px 75px;
    box-sizing: border-box;

    .coupon-container {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;

      .text {
        margin-top: 38px;
        font-size: 28px;
        letter-spacing: 1px;
        color: #001d9b;
        line-height: 40px;
      }

      .coupon-list-container {
        margin-top: 24px;
        width: 678px;
        display: flex;
        justify-content: space-between;

        img {
          height: 150px;
          width: 214px;
        }
      }
    }

    .clock-container {
      position: absolute;
      width: 100%;
      color: #2c108b;
      font-size: 48px;
      display: flex;
      top: 103px;

      div {
        position: absolute;
        top: 0;
        width: 68px;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      :nth-child(1) {
        left: 82px;
      }

      :nth-child(2) {
        left: 227px;
      }

      :nth-child(3) {
        margin-left: 400px;
      }

      :nth-child(4) {
        margin-left: 539px;
      }
    }

    .help-num {
      // width: 85%;
      width: 100%;
      white-space: wrap;
      font-size: 30px;
      font-weight: bold;
      color: #001d9b;
      line-height: 42px;
      letter-spacing: 1px;

      em {
        font-size: 48px;
        color: #ff7f00;
        font-weight: bold;
        letter-spacing: 3px;
        line-height: 67px;
      }

      p {
        margin-top: 8px;
      }
    }

    // 进度条
    .progress-bar {
      width: 100%;
      overflow: hidden;
      background: #05003e;
      border: 4px solid #0b83ff;
      border-radius: 40px;
      margin-top: 60px;
      // padding: 5px;
      box-sizing: border-box;
      display: flex;
      align-items: center;

      .bar-box {
        // width: 100%;
        border-radius: 35px;
        margin: 2px;
        height: 23px;
        background: url(https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/k7H_DXmnH7mLURAFQoR89A.png)
          0 0 no-repeat;
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
      background: url('https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/1PEjaieZcPWiznX6ND7lLQ.png')
        0 0 no-repeat;
      background-size: 100%;
      font-size: 30px;
      line-height: 42px;
      letter-spacing: 1px;
      font-weight: bold;
      color: #7b2200;
    }

    // 活动结束时间
    .end-time {
      font-size: 24px;
      font-weight: normal;
      color: #001d9b;
      line-height: 33px;
      margin-top: 47px;

      em {
        margin-left: 5px;
        margin-right: 5px;
        display: inline-block;
        width: 48px;
        line-height: 48px;
        background-color: #dbfaff;
      }
    }
  }

  // 好友列表
  .friends-list {
    width: 100%;
    background: #e5eaff;
    margin-top: 41px;

    h2 {
      display: flex;
      padding-left: 30px;
      padding-top: 16px;
      line-height: 42px;
      font-size: 30px;
      letter-spacing: 1px;
      font-weight: bold;
      color: #001d9b;
    }

    .no-friends {
      margin-top: 12px;
      width: 100%;
      text-align: center;

      p {
        font-size: 24px;
        line-height: 33px;
        letter-spacing: 1px;
        color: #001d9b;
        font-weight: normal;
        padding: 55px 0 90px;
      }
    }

    .my-swiper-style {
      // width: 550px;
      margin-top: 10px;

      .swiper-wrapper {
        min-height: 146px;
        max-height: 292px;
        // flex-direction: column;
      }

      .swiper-slide {
        .slide-box {
          overflow: hidden;
          padding: 30px 30px;
          background: #e5eaff;
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
          text-align: left;
          float: left;
          padding-left: 20px;
          width: 400px;

          h4 {
            font-size: 30px;
            color: #001d9b;
            font-weight: bold;
            line-height: 42px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            letter-spacing: 1px;
          }

          p {
            font-size: 26px;
            color: #2a4eeb;
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
// .new-bg {
//   background: url('https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/w3DRuCot8TTzo9_vvbwomw.png')
//     0 0 no-repeat;
//   background-size: 100%;
//   height: 810px;
// }

// 未登录
.tourist-status {
  // padding: 97px 80px 72px 80px;
  background: url('https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/rmX0Zoru3q-QvEMnt9x8lw.png')
    0 0 no-repeat;
  background-size: 100%;
  position: relative;
  width: 730px;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;

  .progress-box {
    margin: 202px 0px auto;
    width: 714px;
    display: flex;
    background: #ffffff;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px 0px 75px;

    .auth {
      padding-bottom: 65px;
      width: 200px;
      height: 200px;
      background: url('https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/Dpa61zIJ6_bKo5r5Zdnb5w.png')
        0 0 no-repeat;
      background-size: 100%;
    }

    .inviting-button {
      margin: 40px auto 0px;
      width: 407px;
      height: 92px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: url('https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/1PEjaieZcPWiznX6ND7lLQ.png')
        0 0 no-repeat;
      background-size: 100%;
      font-size: 30px;
      font-weight: bold;
      color: #7b2200;
      line-height: 42px;
      text-indent: inherit;
    }

    .help-num {
      font-size: 30px;
      font-weight: bold;
      color: #001d9b;
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
  background: url('https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/gRwUuHJXe1hL1tHlCuZQDQ.png')
    0 0 no-repeat;
  background-size: 100%;
  font-size: 30px;
  font-weight: bold;
  color: #ffffff;
  line-height: 42px;
  text-indent: inherit;
}

// 活动规则
.activity-rules {
  position: relative;
  margin: 78px 30px 0;
  padding: 84px 11px 36px 28px;
  background: linear-gradient(180deg, #6a70ff 0%, #8d69ff 100%);
  box-shadow: 0px 2px 4px 0px #2527ec;
  border-radius: 24px;

  .activity-title {
    position: absolute;
    top: -37px;
    left: 50%;
    transform: translatex(-50%);
    width: 402px;
    height: 90px;
    background: url('https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/A-feQk8nNxWp5XKcEUimgA.png')
      0 0 no-repeat;
    background-size: 100%;
  }

  h4 {
    line-height: 50px;
    font-size: 36px;
    font-weight: bold;
    color: #ffffff;
  }

  p {
    font-size: 32px;
    font-weight: normal;
    color: #e1f1ff;
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
