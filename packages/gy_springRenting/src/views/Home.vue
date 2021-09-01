<template>
  <div class="main-cont">
      <div
        v-if="token && data.cd > 0"
        :class="['logged-status', friendList.length <= 1 ? 'new-bg' : '']">
        <div class="progress-box">
          <div class="help-num">
            当前已有<em> {{data.ic}} </em>位好友帮你助力
            <p v-if="data.ic >= 3">
              已获得“抹零券”奖励
            </p>
            <p v-else>
              再邀请<em> {{3 - data.ic}} </em>个好友参与即可获得“抹零券"`
            </p>
          </div>
          <div class="progress-bar">
            <div
              :style="`width: ${barNum * 33.333}%`"
              class="bar-box"></div>
          </div>
          <div
            class="inviting-button"
            @click="invitingBtn()">
            邀请好友来助力
          </div>
          <p class="end-time">
            距离助力结束还有：{{`${dd}天${hh}时${mm}分${ss}秒`}}
          </p>
        </div>
        <div class="friends-list">
          <h2>已助力好友</h2>
          <div
            v-if="friendList.length > 0"
            class="swiper-container my-swiper-style swiper-no-swiping">
            <div class="swiper-wrapper">
              <!-- <div
                class="swiper-slide">
                <div class="slide-box">
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581153517644&di=fb2f686b6cd6dfab91531382939e1d1c&imgtype=2&src=http%3A%2F%2Fimg.aiimg.com%2Fuploads%2Fallimg%2F140315%2F263915-140315194H9.jpg" alt="">
                  <div class="friend-info">
                    <h4>🤪🧐🤓👏👨‍🦱⚽️🤼‍♂️⛰🌋📡🔋🕯</h4>
                    <p>7月前来助力</p>
                  </div>
                </div>
              </div> -->
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
      <div
        v-if="!token"
        class="tourist-status">
        <div class="progress-box">
          <p class="help-num">主人，登录后才可以参加活动呦！</p>
            <div
              class="inviting-button"
              @click="signIn()">
              登录
            </div>
          </div>
      </div>
      <div
        v-if="data.cd <= 0"
        class="end-activity">
        <div class="progress-box">
          <p class="help-num">很抱歉，活动已经结束</p>
          </div>
      </div>
      <div class="activity-rules">
        <h5>活动规则</h5>
        <p>
            活动时间：{{activityInfo.startTimeStr}} - {{activityInfo.endTimeStr}}
            <br>
            <br>
            参与方式：
            <br>
            在活动页发起好友助力，邀请3位好友协助助力成功后即可获得“抹零券”。
            <br>
                    <br>
            抹零券使用规则：
            <br>
             “抹零券”将会绑定在参与活动账户内，成功获得“抹零券”的用户可在“我的”-“优惠券”中查 看所获得的“抹零券”，在签约时选取此优惠卡即可使用折扣。
             “抹零券”具体折扣为：合同实际月房租减免“十位”及“个位”数字（例：合同房租为1999元/ 月，则使用“抹零券”后月租金变为1900元。）
            <br>
             本次活动部分门店不参与，不参与门店房源进行签约时将无法使用此“抹零券”。
              <br>
             本次活动优惠不与其他优惠叠加，具体情况以门店运营人员口径为准。
              <br>
                    <br>
            其他：
            <br>
            1）冠寓有权对通过技术手段等恶意影响活动公平原则的行为进行鉴定并取消其参加活动的资格。
            <br>
            2）在法律许可的范围内，冠寓留变更、调整、终止本活动的权利以及调整或变换活动奖品的权利。
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
  name: 'home',
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
      ss: '',
      mm: '',
      hh: '',
      dd: '',
      avatar,
      mySwiper: null,
    };
  },
  mounted() {
    document.title = '呼朋唤友房租抹零';
    this.token = this.getToken();
    // this.token = '92a63b08d3d29977';
    // 获取活动信息
    this.getActivityDate();
    // 判断有token再请求接口数据
    // if (this.token) {
    //   // 获取助力好友数
    //   this.initFriendList();
    // }
  },
  methods: {
    // 获取活动时间
    getActivityDate() {
      this.$axios.get('/coupon_api/api/help/number').then((res) => {
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
        title: '快来帮我减房租吧',
        text: '快来帮我减房租吧',
        url: 'http://m.iguanyu.com/fe/gy_springRenting/',
        image: 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/CMS/NpMdt766BNc.png',
        shareMiniProgramUrl: `guanyu://miniProgram?userName=gh_1b7cffb1d9a2&path=${encodeURIComponent('/packageA/pages/ac/springRent/assist?scene=')}${encodeURIComponent(token)}&appId=wx1c1c8c073e2be1fc&type=0`,
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
    padding: 740px 24px 46px 24px;
    box-sizing: border-box;
    width: 100%;
    background: #FF6565 url(../assets/main_bg.jpg) 0 0 no-repeat;
    background-size: 100%;
  }
  .logged-status, .tourist-status, .end-activity {
    background: url(../assets/hI_gohlc_o8.png) 0 0 no-repeat;
    background-size: 100%;
    padding: 97px 80px 72px 80px;
    height: 820px;
    .progress-box {
      text-align: center;
      .help-num {
        font-size: 28px;
        color: #FFDE6C;
        line-height: 50px;
        em {
          font-size: 40px;
          color: #ffffff;
          font-family:PingFangSC-Semibold,PingFang SC;
        }
      }
      .progress-bar {
        width: 100%;
        height: 70px;
        overflow: hidden;
        background: #AC483D;
        border: 4px solid #FFDE6C;
        border-radius: 40px;
        margin-top: 60px;
        padding: 5px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        .bar-box {
          width: 100%;
          height: 50px;
          background: linear-gradient(180deg,rgba(255,226,173,1) 0%,rgba(255,184,75,1) 100%);
          border-radius: 36px;
        }
      }
      .inviting-button {
        width: 395px;
        height: 96px;
        background: url(../assets/inviting-button.png) 0 0 no-repeat;
        background-size: 395px;
        margin: 50px auto 0;
        text-indent: -9999px;
        position: relative;
        z-index: 200;
      }
      .end-time{
        font-size: 26px;
        font-weight: bold;
        color:#FFDE6C;
        line-height: 32px;
        margin-top: 20px;
      }
    }
    .friends-list {
      margin-top: 63px;
      .no-friends {
        margin-top: 12px;
        width: 100%;
        background: rgba(146,5,78,0.2);
        text-align: center;
        p {
          font-size: 26px;
          font-weight: bold;
          color: #FFDE6C;
          line-height: 37px;
          padding: 50px 0 56px 0;
        }
      }
      h2 {
        font-size: 32px;
        font-weight: bold;
        color: rgba(255,222,108,1);
        line-height: 45px;
      }
      .my-swiper-style {
        width: 550px;
        margin-top: 10px;
        .swiper-wrapper {
          height: 292px;
        }
        .swiper-slide {
          .slide-box {
            overflow: hidden;
            padding: 30px 20px;
            background: rgba(255,222,108,.2);
            margin-top: 2px;
          }
          img {
            width: 80px;
            height: 80px;
            background: #000000;
            border-radius: 50%;
            float: left;
          }
          .friend-info {
            float: left;
            padding-left: 20px;
            width: 400px;
            h4 {
              font-size: 32px;
              color: #FFDE6C;
              font-weight: bold;
              line-height: 45px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
            p {
              font-size: 26px;
              color: #FFDE6C;
              line-height: 37px;
            }
          }
        }
      }
    }
  }

  .new-bg {
    background: url(../assets/hI_gohlc_o8.png) 0 0 no-repeat;
    background-size: 100% 100%;
    height: 760px;
  }
  .tourist-status, .end-activity {
    padding: 115px 0 147px 0;
    background: url(../assets/tourist-bg.png) 0 0 no-repeat;
    background-size: 100%;
    height: 208px;
    .progress-box {
      .inviting-button {
        background: url(../assets/default-btn.png) 0 0 no-repeat;
        background-size: 395px;
        font-size: 36px;
        font-weight: bold;
        color:#AC483D;
        line-height: 92px;
        text-indent: inherit;
      }
    }
  }
  .end-activity {
    padding: 180px 0 52px 0;
    .progress-box {
      p {
        font-size: 30px!important;
      }
    }
  }
  .activity-rules {
    position: relative;
    margin-top: 46px;
    h5 {
      width: 403px;
      height: 106px;
      background: url(../assets/rules-tit.png) 0 0 no-repeat;
      background-size: 403px 106px;
      position: absolute;
      left: 50%;
      top: -38px;
      transform: translate(-50%, 0);
      z-index: 20;
      text-indent: -9999px;
    }
    p {
      background:linear-gradient(180deg,rgba(255,139,106,1) 0%,rgba(255,105,105,1) 100%);
      border-radius: 34px;
      padding: 96px 40px 48px 40px;
      font-size: 26px;
      font-family:PingFangSC-Regular,PingFang SC;
      color: #FFF2CF;
      line-height: 40px;
      box-shadow:0px 2px 4px 0px rgba(236,48,37,1);
      em {
        vertical-align: 6px;
      }
    }
  }
</style>
