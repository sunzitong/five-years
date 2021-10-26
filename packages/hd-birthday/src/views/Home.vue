<template>
  <div class="page-home">
    <!-- 祝福页 -->
    <div class="home" v-show="HomeIsShow">
      <a :href='holidayBlessings.url' :class="shouldShow ? 'showing' : 'showing hidding'" v-if="holidayBlessings">
        <p>{{holidayBlessings.title}}</p>
      </a>
      <div class="banner-cont">
        <img src="../assets/banner.jpg" alt />
      </div>
      <div class="main-cont">
        <div class="countdown">
          <p>
            <i>距离生日还有</i>
            <!-- 判断 -->
            <em>{{days > 0 ? days : 0}}</em> <i>天</i>
            <em>{{hours > 0 ? hours : 0}}</em> <i>时</i>
            <em>{{minutes > 0 ? minutes : 0}}</em> <i>分</i>
            <em>{{seconds > 0 ? seconds : 0}}</em> <i>秒</i>
          </p>
          <div class="invite-btn" @click="wxShare">马上邀请好友为爱充电</div>
        </div>

        <div class="friend-list-box">
          <h2>为爱充电的好友们</h2>
          <div
            v-if="Array.isArray(friendInfo) && friendInfo.length <= 0"
            class="nothing-text"
          >暂时还没有好友送你爱的红包包，快发送邀请告诉他们，本寿星要过生日了！</div>
          <div v-else class="line" :style="`height: ${friendInfo.length > 4 ? '292px' : (friendInfo.length * 74 - 4 + 'px')}`">
            <div class="swiper-container friend-box">
              <div class="swiper-wrapper" :style="`height: ${friendInfo.length > 4 ? '296px' : (friendInfo.length * 74 + 'px')}`">
                <div
                  v-for="(item, index) in friendInfo"
                  :key="index"
                  class="swiper-slide frient-list">
                    <div class="head-img">
                      <img :src="item.icon" alt />
                    </div>
                    <div class="friend-info">
                      <h3>{{item.userName}}</h3>
                      <p>{{item.operationTime}}</p>
                    </div>
                    <div class="right-cont">
                      <h3 class="money">{{item.money}}</h3>
                      <p class="label">{{item.benediction}}</p>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div class="activity-rules">
          <h5>活动规则</h5>
          <div class="rules-box">
            <div class="rules-cont">
              <span>活动时间：</span>
              <p>活动前3天零点开始——生日当天二十四点结束</p>
            </div>
            <div class="rules-cont">
              <span>参与方式：</span>
              <p>在生日活动页点击撒娇赚红包，分享给好友邀请其向您赠送生日红包</p>
            </div>
            <div class="rules-cont">
              <span>红包去向：</span>
              <p>好友通过您分享的链接定向发出的红包金额，将作为能源费自动充入您租住冠寓房间的电费中，您可在冠寓APP->电费充值->充值记录页面查看。若退房时账户所充电费尚有余额，将由冠寓门店退还。</p>
            </div>
            <div class="rules-cont">
              <span>特别说明：</span>
              <p>请您确保受邀好友具有完全的民事行为能力；好友向您发出的红包将视为不可撤销的赠予，已发出的红包金额不能要求索回。</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 弹窗页 -->
      <ProjectModal
        :roomData='roomData'
        :userInfo='userInfo'
        :token='token'
        v-if="roomData.length>1"
        :show.sync='ProjectModalIsShow' />
    </div>
  <!-- 生日卡片页 -->
  <BirthdatCard
    :BrithdayIsShow='BrithdayIsShow'
    :userInfo='userInfo'
    :birthdayInfo='birthdayInfo'
    :roomData='roomData'
    :share='share'
    @ShowBirthday='ShowBirthday()' />
  <!-- 活动结束页 -->
  <ActivityEnd
    :userInfo='userInfo'
    v-if='ActivityEndIsShow' />
  </div>
</template>

<script>
  import {
    ShowSharePanel,
    getAppAuthInfo
  } from '@guanyu/guanyu-h5-tools'
  // @ is an alias to /src
  import './index.less'
  import BirthdatCard from '@/components/birthdatCard/Brithday'
  import ActivityEnd from '@/components/activityEnd/ActivityEnd'
  import ProjectModal from '@/components/projectModal/ProjectModal'
  // import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  // import 'swiper/swiper.less'
  // // If you use Swiper 6.0.0 or higher
  // import 'swiper/swiper-bundle.css'
  import Swiper from 'swiper/swiper-bundle.js'
  import 'swiper/swiper.less'
  export default {
    name: 'home',
    data() {
      return {
        initData: {},
        // 显示页面类型
        pageType: '',
        // 生日相关信息
        birthdayInfo: {},
        // 节日相关信息
        holidayBlessings: {},
        // 用户相关信息
        userInfo: {},
        // 好友相关信息
        friendInfo: [],
        // 门店数据
        roomData: [],
        days: '',
        hours: '',
        minutes: '',
        seconds: '',
        token: '',
        // 是否可以分享
        share: false,
        // 首页是否显示
        HomeIsShow: false,
        // 生日贺卡页是否显示
        BrithdayIsShow: false,
        // 活动结束页是否展示
        ActivityEndIsShow: false,
        // 弹窗是否展示
        ProjectModalIsShow: false,
        // 节日活动入口是否展示
        holidayIsShow: false,
        mySwiper: null,
        // 记录上一次滚动结束后的滚动距离
        oldScrollTop: 0,
        scrollTop: 0,
        shouldShow: true,
        miniType: 0
      }
    },
    components: {
      // 贺卡页
      BirthdatCard,
      // 活动结束页
      ActivityEnd,
      // 弹窗
      ProjectModal
    },
    watch: {
      scrollTop(newValue, oldValue) {
        // 必须使用延时器，否则每次newValue和window.scrollY都相等，无法判断，20ms刚好大于watch的侦听周期，故延时20ms
        setTimeout(() => {
          if (newValue == window.scrollY) {
            // 延时执行后当newValue等于window.scrollY，代表滚动结束
            this.shouldShow = true
            console.log('滚动结束')
            // 每次滚动结束后都要给oldScrollTop赋值
            this.oldScrollTop = newValue
          }
        }, 20)
        // 每次滚动开始时oldScrollTop与oldValue相等
        if (this.oldScrollTop == oldValue) {
          this.shouldShow = false
          console.log('滚动开始')
        }
      }
    },
    beforeDestroy() {
      // 离开当前组件别忘记移除事件监听
      window.removeEventListener('scroll')
    },
    mounted() {
      console.log('href:', location.href)
      this.handleScroll()
      // 获取token
      this.token = this.$route.query.token || (getAppAuthInfo() || {}).access_token
      // 获取祝福页数据
      this.getInitData()
      // 获取可充值房间列表数据
      this.getRoomData()
      this.judgeEnv()
    },
    methods: {
      // 判断处于那个环境
      judgeEnv() {
        if (!window.location.href.includes('m.iguanyu.com')) {
          this.miniType = 2
          console.log(this.miniType)
        }
      },
      // 处理滑动
      handleScroll() {
        window.addEventListener('scroll', () => {
          this.scrollTop = window.scrollY
        })
      },
      // 初始化swiper
      initSwiper(friensNum) {
        const _this = this
        console.log('friendInfo:', this.friendInfo)
        // eslint-disable-next-line no-unused-vars
        this.mySwiper = new Swiper('.swiper-container', {
          speed: 600,
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false
          }, // 可选选项，自动滑动
          loop: true,
          roundLengths: true,
          direction: 'vertical',
          slidesPerView: Array.isArray(_this.friendInfo) && _this.friendInfo.length > 4 ? 4 : _this.friendInfo.length,
          observer: true,
          observeParents: true
        })
      },
      // 获取祝福页数据
      getInitData() {
        // token更换
        const { birthDay } = this.$route.query
        this.$axios.defaults.headers.common['Authorization'] = this.token
        this.$axios.get(`/app-server/api/1/birthday/benediction?birthdayTime=${birthDay}`).then((res) => {
          //  setInterval(this.conutDown, 1000)
          if (res.data.code === 10000) {
            this.initData = res.data.data || {}
            this.pageType = this.initData.pageType || ''
            this.birthdayInfo = this.initData.birthdayInfo || {}
            this.holidayBlessings = this.initData.holidayBlessings
            this.userInfo = this.initData.userInfo || {}
            this.share = this.initData.share
            this.friendInfo = this.initData.friendInfo || []
            // 倒计时
            this.countDown((this.birthdayInfo.birthdayTime - this.birthdayInfo.nowTime) / 1000)
            // if (this.pageType === 'END') {
            //   this.HomeIsShow = false
            //   this.ActivityEndIsShow = true
            // }
            // if (this.pageType === 'GREETING_CARD') {
            //   this.HomeIsShow = false
            //   this.BrithdayIsShow = true
            // }
            // if (this.pageType === 'BENEDICTION') {
            //   this.HomeIsShow = true
            // }
            // if (this.holidayBlessings != null) {
            //   this.holidayBlessings = true
            // }
            const map = {
              // 显示结束页
              END: () => {
                this.ActivityEndIsShow = true
                window.zhuge.track('活动结束-扫码页')
              },
              // 显示首页
              BENEDICTION: () => {
                this.HomeIsShow = true
              },
              // 显示贺卡页
              GREETING_CARD: () => {
                this.BrithdayIsShow = true
              }
            }
            map[this.pageType] && map[this.pageType]()
            setTimeout(() => {
              this.initSwiper(this.friendInfo)
            }, 100)
          }
        })
      },
      // 获取可充值房间列表数据
      getRoomData() {
        // token更换
        this.$axios.defaults.headers.common['Authorization'] = this.token
        this.$axios.get('/app-server/api/v1/birthday/roomList').then((res) => {
          if (res.data.code === 10000) {
            this.roomData = res.data.data || []
          }
        })
      },
      // 倒计时修改
      convertTime(totalSeconds) {
        const mmDuration = this.$moment.duration(totalSeconds * 1000)
        this.days = parseInt(mmDuration.asDays(), 10)
        this.hours = mmDuration.hours()
        this.minutes = mmDuration.minutes()
        this.seconds = mmDuration.seconds()
      },
      countDown(totalSeconds) {
        let ts = totalSeconds
        const timer = setInterval(() => {
          ts -= 1
          this.convertTime(ts)
          if (ts === 0) {
            this.data.cd = 0
            clearInterval(timer)
          }
        }, 1000)
      },
      // 微信分享
      wxShare() {
        const { birthDay, userId } = this.$route.query
        if (this.roomData.length <= 1) {
          const roomId = this.roomData[0].roomId
          ShowSharePanel({
            types: ['wx_session'],
            title: `【龙湖冠寓】${this.userInfo.userName}寿星宝宝要过生日了，Ta发来一条撒娇`,
            text: '寿星宝宝有个小需求，快来看看满足ta吧',
            url: window.location.href,
            image: 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/ciRWx0WzMz4.png',
            shareMiniProgramUrl: `guanyu://miniProgram?userName=gh_1b7cffb1d9a2&path=${encodeURIComponent(`/packageA/pages/birthday/birthday?userId=${encodeURIComponent(userId)}&birthDay=${encodeURIComponent(birthDay)}&roomId=${encodeURIComponent(roomId)}&token=${encodeURIComponent(this.token)}`)}&appId=wx1c1c8c073e2be1fc&type=${this.miniType}`
          })
          window.zhuge.track('生日红包活动页-邀请好友微信分享按钮')
        } else {
          this.ProjectModalIsShow = true
        }
      },
      // 贺卡页跳回首页
      ShowBirthday(data) {
        this.BrithdayIsShow = data
        this.HomeIsShow = true
      }
    }
  }
</script>
