<template>
  <div class="home">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div
            class="main-cont">
            <img
              src="../assets/1.png"
              alt=""
              class="img01">
            <div
              class="page-text">
              <p class="p1">
                <em>{{data.firstTime}}</em>
                <br>
                是你入住冠寓的第一天sztszt
                <br>
                从此各自的故事中有了彼此
                <br>
                一路温暖相伴
              </p>
            </div>
          </div>
          <div class="page-tips">
            <img src="../assets/pageTips.png" alt="">
          </div>
        </div>
        <div
          class="swiper-slide">
          <div
            class="main-cont">
            <img
              src="../assets/2.png"
              alt=""
              class="img02">
            <i class="logo"></i>
            <div
              class="page-text2">
              <p
                v-if="data.accessLastTime"
                class="p1">
                <em>{{data.accessLastTime}}</em>
                <br>
                也许是很辛苦的一天
                <br>
                但无论多晚
                <br>
                <!-- <em>{{projectNames}}</em> -->
                都有一盏灯光在等你
                <br>“等你回家”比“我爱你”更像情话
              </p>
              <p
                v-else
                class="p1">
                努力拼搏的你
                <br>
                无论多晚归来都有一盏灯在等你
                <br>
                有时候“等你回家”比“我爱你”更像情话
              </p>
            </div>
          </div>
          <div class="page-tips">
            <img src="../assets/pageTips.png" alt="">
          </div>
        </div>
        <div
          v-if="data.projectNames && data.projectNames.length > 1"
          class="swiper-slide">
          <div
            class="main-cont">
            <img
              src="../assets/3.png"
              alt=""
              class="img03">
            <i class="logo"></i>
            <div
              class="page-text">
              <p class="p1">
                <em>{{projectList}}</em>
                <br>
                是你住过相隔最远的门店
                <br>
                奔波往来城市之间
                <br>
                你一定是个很努力向前奔跑的逐梦者
                <br>
                为生活和梦想努力的你，真的很赞
              </p>
            </div>
          </div>
          <div class="page-tips">
            <img src="../assets/pageTips.png" alt="">
          </div>
        </div>
        <div
          v-else
          class="swiper-slide">
          <div
            class="main-cont">
            <img
              src="../assets/4.png"
              alt=""
              class="img04">
            <i class="logo"></i>
            <div
              class="page-text">
              <p class="p1">
                在过去<em>{{data.days}}</em>个夜晚
                <br>
                <em>{{data.area}}㎡</em>的房间一定承载了
                <br>
                你关于未来的想象
                <br>
                坚信有爱和梦想的日子
                <br>
                每一天都充满了力量
              </p>
            </div>
          </div>
          <div class="page-tips">
            <img src="../assets/pageTips.png" alt="">
          </div>
        </div>
        <div class="swiper-slide">
          <div
            class="main-cont">
            <img
              src="../assets/5.png"
              alt=""
              class="img05">
            <i class="logo"></i>
            <div
              class="page-text">
              <p class="p1">
                在你呼叫运营官
                <br>上门服务<em>{{data.serverTimes}}次</em>中
                <br>
                每一次我们都努力
                <br>
                为你做的更好
              </p>
            </div>
          </div>
          <div class="page-tips">
            <img src="../assets/pageTips.png" alt="">
          </div>
        </div>
        <div class="swiper-slide">
          <div
            class="main-cont">
            <img
              src="../assets/6.png"
              alt=""
              class="img06">
            <i class="logo"></i>
            <div
              class="page-text">
              <p class="p1">
                感恩在<em>{{data.days}}天</em>里一直有你
                <br>
                冠寓有幸陪伴你走过一段旅途
                <br>
                我们不说再见
                <br>
                冠寓永远都是你
                <br>
                可以停靠的港湾
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="againIsShow && data.url"
      class="page-tips">
      <a :href="data.url">劳您抬手留下租住评价，我们会努力做到最好></a>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import Swiper from 'swiper/js/swiper.min.js';
import 'swiper/css/swiper.min.css';

export default {
  name: 'home',
  data() {
    return {
      mySwiper: null,
      againIsShow: false,
      data: {},
      projectNames: '',
      projectList: '',
    };
  },
  mounted() {
    // 获取初始数据
    this.getInitData();
    // swiper初始化
    this.swiperInit();
  },
  methods: {
    getInitData() {
      // 获取APP tooken
      let token = {};
      // eslint-disable-next-line camelcase
      token = this.$getAppAuthInfo();
      if (token && token.access_token) {
        token = token.access_token;
      }
      this.$axios.get(`/app-server/api/v1/letter/checkoutLetter?contractId=${this.$route.query.contractId}`, {
        headers: {
          Authorization: token,
          // Authorization: 'DDB6A10A147EB1409AD7E10303F4E954',
        },
      }).then((res) => {
        if (res.data.code === 10000) {
          this.data = res.data.data || {};
          if (res.data.data.projectNames) {
            this.projectList = res.data.data.projectNames.join('、');
          }
        }
      });
    },
    swiperInit() {
      const that = this;
      this.mySwiper = new Swiper('.swiper-container', {
        autoplay: { // 可选选项，自动滑动
          delay: 10000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        direction: 'vertical', // 滑动方向
        on: {
          slideChange() {
            that.againIsShow = false;
            const slideNum = document.querySelectorAll('.swiper-slide').length - 1;
            if (this.activeIndex === slideNum) {
              that.againIsShow = true;
            }
          },
        },
      });
    },
    // 点击跳转到第一帧
    slideToFirst() {
      this.mySwiper.slideTo(0, 0, false);
    },
  },
};
</script>
<style lang="scss">
@import '../style/reset.css';
  .home {
    width: 100%;
    max-width: 860px;
    height: 100%;
    margin: 0 auto;
    position: relative;
    .swiper-container, .swiper-wrapper, .swiper-slide {
      width: 100%;
      height: 100%;
    }
    .main-cont {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(0, -50%);
      width: 100%;
      height: 100%;
      img {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(0, -50%);
        z-index: 10;
        width: 100%;
        height: 100%;
        margin: 0 auto 0;
      }
      .page-text, .page-text2 {
        position: absolute;
        left: 10px;
        z-index: 20;
        padding: 80px 0 0 71px;
        text-align: left;
        font-size: 30px;font-size: 30px;
        line-height: 60px;
        color: #483841;
        font-weight: bold;
        em {
          color: #DA4B5F;
          font-weight: bold;
        }

      }
      .page-text2 {
        p {
          color: #ffffff;
        }
      }
    }
    .page-tips {
      position: absolute;
      left: 50%;
      bottom: 40px;
      transform: translate(-50%, 0);
      z-index: 50;
      width: 100%;
      animation: tipShow 1.6s forwards infinite;
      img {
        width: 37px;
        height: 39px;
      }
      a {
        font-size: 20px;
        color: #ffffff;
        padding: 13px 30px;
        border: 1px solid #ffffff;
        border-radius: 50px;
      }
      @keyframes tipShow {
        0% {
          opacity: 0.3;
        }
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0.3;
        }
      }
    }
  }
</style>
