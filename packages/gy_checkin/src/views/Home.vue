<template>
  <div class="home">
    <div
      v-if="loadingIsShow"
      class="loading-box">
      <img src="../assets/loading.gif" alt="">
    </div>
    <div
      id="swiper1"
      class="swiper-container">
      <div class="swiper-wrapper">
        <div
          v-if="isProject"
          class="swiper-slide">
          <div
            class="main-cont"
            :style="{'height': `${mainContHeight}px`}">
            <img
              src="../assets/01.png"
              alt=""
              class="img-bj"
              ref="imgRef">
            <i class="logo"></i>
            <div
              class="page-text1">
              <h2>TO  {{data.userName}}</h2>
              <p class="p1">
                如果人生是一场奇遇sztszt
                <br>
                你带着阳光走来
                <br>
                成就了一段故事的序幕
              </p>
              <p class="p2">
                人生工作生活的每一次辗转
                <br>
                都会在某个地方短暂停留
                <br>
                这一次，感谢选择冠寓
                <br>
                成为你在这个城市的港湾
                <br>
                用房间的灯火照亮每个夜晚
                <br>
                愿晚归的你早点回家
              </p>
              <p class="p3">
                面对即将开启的美好新生活
                <br>
                请允许我带你了解冠寓
              </p>
            </div>
          </div>
          <div class="page-tips">
            <img src="../assets/pageTips.png" alt="">
          </div>
        </div>
        <div
          v-if="isProject && (traffic || facilities)"
          class="swiper-slide">
          <div
            class="main-cont"
            :style="{'height': `${mainContHeight}px`}">
            <img
              src="../assets/08.png"
              alt=""
              class="img-bj">
            <i class="logo"></i>
            <div
              class="page-text8">
              <p class="p1">
                {{traffic.serviceContent}}
              </p>
            </div>
            <div
              class="page-text9">
              <p class="p1">
                {{facilities.serviceContent}}
              </p>
            </div>
          </div>
          <div class="page-tips">
            <img src="../assets/pageTips.png" alt="">
          </div>
        </div>
        <div class="swiper-slide">
          <div
            class="main-cont"
            :style="{'height': `${mainContHeight}px`}">
            <img
              src="../assets/02.png"
              alt=""
              class="img-bj">
            <i class="logo"></i>
            <div
              class="page-text2">
              <h2>运营官服务：</h2>
              <p class="p1">
                幽默风趣的运营官，是你从入住到退租期间最棒的管家。他们将为你提供专业有温度的租房解决方案。页面后会有他们联系方式，可以随时找到他们哟！
              </p>
            </div>
          </div>
          <div class="page-tips">
            <img src="../assets/pageTips.png" alt="">
          </div>
        </div>
        <div class="swiper-slide">
          <div
            class="main-cont"
            :style="{'height': `${mainContHeight}px`}">
            <img
              data-src="https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/dqa5WE7XVFg.png"
              alt=""
              class="img-bj swiper-lazy">
            <i class="logo"></i>
            <div
              class="page-text3">
              <h2>在线报修服务：</h2>
              <p class="p1">
                APP在线报修是你生活的贴心助手，在下班回家的第一刻，全能维修师傅将为你提供专业的上门维修服务。报修路径：“冠寓APP—我的—在线报修”
              </p>
            </div>
          </div>
          <div class="page-tips">
            <img src="../assets/pageTips.png" alt="">
          </div>
        </div>
        <div class="swiper-slide">
          <div
            class="main-cont"
            :style="{'height': `${mainContHeight}px`}">
            <img
              data-src="https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/lBhCnLNr2nQ.png"
              alt=""
              class="img-bj swiper-lazy">
            <i class="logo"></i>
            <div
              class="page-text4">
              <h2>水电缴费服务：</h2>
              <p class="p1">
                智能生活小帮手，第一时间获知你的水电费消费记录，为你提供便捷的水电费线上缴费服务。查询路径：“冠寓APP—我的—水电费明细”
              </p>
            </div>
          </div>
          <div class="page-tips">
            <img src="../assets/pageTips.png" alt="">
          </div>
        </div>
        <div class="swiper-slide">
          <div
            class="main-cont"
            :style="{'height': `${mainContHeight}px`}">
            <img
              data-src="https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/Yv3aWYttxW0.png"
              alt=""
              class="img-bj swiper-lazy">
            <i class="logo"></i>
            <div
              class="page-text5">
              <h2>电器使用说明： </h2>
              <p class="p1">
                一键解锁屋内电器的使用、保养技能，助力便捷生活，智能生活的小秘密都藏在这里 。
              </p>
            </div>
          </div>
          <div class="page-tips">
            <img src="../assets/pageTips.png" alt="">
          </div>
        </div>
        <div class="swiper-slide">
          <div
            class="main-cont"
            :style="{'height': `${mainContHeight}px`}">
            <img
              data-src="https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/uXP5d9t56rA.png"
              alt=""
              class="img-bj swiper-lazy">
            <i class="logo"></i>
            <div
              class="page-text6">
              <h2>邻里相处服务： </h2>
              <p class="p1">
                和谐友爱的冠寓社区值得每个人共同守护，请冠头们遵守邻里公约，彼此尊重，打造生活的美好记忆 。
              </p>
            </div>
          </div>
          <div class="page-tips">
            <img src="../assets/pageTips.png" alt="">
          </div>
        </div>
        <div class="swiper-slide">
          <div
            class="main-cont"
            :style="{'height': `${mainContHeight}px`}">
            <img
              data-src="https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/SBIhhwI81Zg.png"
              alt=""
              class="img-bj swiper-lazy">
            <i class="logo"></i>
            <div
              class="page-text6">
              <h2>安全小贴士：</h2>
              <p class="p1">
                为了更安全、舒心的居住环境，享受美好的生活，学习一些日常安全常识，防患于未然还是很有必要哒！
              </p>
              <div
                class="open-tips"
                @click="showTips()">
                <img src="../assets/openTipBg.png" alt="">
              </div>
            </div>
          </div>
          <div class="page-tips">
            <img src="../assets/pageTips.png" alt="">
          </div>
        </div>
        <div class="swiper-slide">
          <div
            class="main-cont"
            :style="{'height': `${mainContHeight}px`}">
            <img
              data-src="https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/xwIT237b2i0.png"
              alt=""
              class="img-bj swiper-lazy">
            <i class="logo"></i>
            <div
              class="page-text7">
              <h2>关于冠寓： </h2>
              <p class="p1">
                欢迎入住温暖而明亮的冠寓小窝，开启你的自在生活。这里有独立安全的公寓环境，满足娱乐、娱乐需求的超大公区，以及贴心友爱的运营官。有温度的青年社区，等你一起共筑 。
              </p>
            </div>
          </div>
          <div
            v-if="isProject"
            class="page-tips"
            id="ddd">
            <img src="../assets/pageTips.png" alt="">
          </div>
        </div>
        <div
          v-if="isProject"
          class="swiper-slide">
          <div
            class="main-cont"
            :style="{'height': `${mainContHeight}px`}">
            <img
              data-src="https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/UqZGUuNlRWw.png"
              alt=""
              class="img-bj swiper-lazy">
            <i class="logo"></i>
            <div
              class="page-text10">
              <p class="p1">
                欢迎入住
                <br>
                温暖而明亮的冠寓小窝
                <br>
                开启你的自在生活
              </p>
            </div>
            <div
              :class="['house-keeper',
              data.operates && data.operates.length <=2 ? 'full-style' : '']">
              <ul>
                <li
                  v-for="operates in data.operates"
                  :key="operates.letterId">
                  <img
                    src="../assets/border2.png"
                    alt="">
                  <div class="kepper-info">
                    <img
                      :src="operates.operateImg"
                      alt="">
                    <div class="kepper-name">
                      {{operates.operateName}}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="wifi-and-phone">
              <p>WiFi：{{wifi.serviceContent}}</p>
              <p class="phone">{{data.projectName}}：400-000-1100</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="fixed-box"
      v-show="tipsIsShow"></div>
    <div
      class="pop-up"
      v-show="tipsIsShow"
    >
      <div
        class="close-btn"
        @click="closePopup()"></div>
      <div
        id="swiper2"
        class="swiper-container">
        <div class="swiper-wrapper">
          <div
            v-for="s2 in s2List"
            :key="s2.key"
            class="swiper-slide">
            <div
              class="main-cont">
              <img
                :data-src="s2.value"
                alt=""
                class="img-bj swiper-lazy"
                ref="s2ImgRef">
            </div>
            <div
              v-if="s2.key !== s2List.length"
              class="page-tips">
              <img src="../assets/s2PageTip.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="againIsShow"
      class="page-tips"
      @click="slideToFirst()">
      <img
        src="../assets/again.png"
        alt=""
        class="again-btn">
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
      mainContHeight: '',
      s2MainContHeight: '',
      traffic: '',
      facilities: '',
      wifi: '',
      curPage: '',
      isPreview: false,
      isProject: true,
      tipsIsShow: false,
      loadingIsShow: true,
      s2List: [
        { key: 1, value: '//guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/zAEOOIJfkow.png' },
        { key: 2, value: '//guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/E4KDRwmUlU8.png' },
        { key: 3, value: '//guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/0rx5DUNQpBo.png' },
      ],
    };
  },
  watch: {
    $route: 'getPath',
  },
  mounted() {
    this.swiper2init();
    // 获取图片高度
    this.getImgHeight();
    this.isPreview = this.getIsPreview();
    // 获取初始数据
    this.getInitData();
  },
  methods: {
    // 监听路由变化并切换swiper
    getPath() {
      this.mySwiper.slideTo(this.$route.query.page, 1000, false);
    },
    getImgHeight() {
      const img = this.$refs.imgRef;
      img.onload = () => {
        this.mainContHeight = img.height;
      };
    },
    // 判断是否为预览状态
    getIsPreview() {
      if (Object.keys(this.$route.query).indexOf('isPreview') >= 0) {
        return true;
      }
      return false;
    },
    // 展示安全贴士
    showTips() {
      this.tipsIsShow = true;
    },
    closePopup() {
      this.tipsIsShow = false;
    },
    getInitData() {
      // 获取APP tooken
      let token = {};
      // eslint-disable-next-line camelcase
      token = this.$getAppAuthInfo();
      if (token && token.access_token) {
        token = token.access_token;
      }
      // console.log('token:', token);
      // 请求地址，默认为请求正常接口数据

      // let requestUrl = '/app-server/api/v1/letter/checkinLetter?contractId=195648';
      let requestUrl = `/app-server/api/v1/letter/checkinLetter?contractId=${this.$route.query.contractId}`;
      let params = {};
      let type = 'get';
      let newId = '';
      if (this.$route.query.id) {
        const { id } = this.$route.query;
        newId = id;
      }
      // 预览时请求预览接口
      if (this.isPreview) {
        requestUrl = '/cms-server/letter/queryone';
        params = {
          id: newId,
        };
        type = 'post';
      }
      this.$axios(
        {
          method: type,
          url: requestUrl,
          headers: {
            Authorization: token,
            // Authorization: '05396A90B7E75D41B88FD9EDB79F852F',
            // Authorization: '559358ABD47C5AC4A14972074E04337E',
            // Authorization: '85F00ECE1BB33AE3B6108E39A16997CD',
          },
          data: { ...params },
          // id: 1,
        }).then((res) => {
        if (res.data.code === 10000 || res.data.status === 'ok') {
          this.loadingIsShow = false;
          // console;
          this.data = res.data.data || {};
          if (!res.data.data) {
            this.isProject = false;
          }
          if (this.data.serviceInfos) {
            this.data.serviceInfos.forEach((item) => {
              switch (item.serviceType) {
                case 'TRAFFIC':
                  this.traffic = item;
                  break;
                case 'FACILITIES':
                  this.facilities = item;
                  break;
                case 'WIFI':
                  this.wifi = item;
                  break;
                default:
                  break;
              }
            });
          }
          setTimeout(() => {
            // swiper初始化
            this.swiperInit();
          }, 0);
        }
      });
    },
    swiperInit() {
      const that = this;
      const isStopAutoplat = this.isPreview;
      this.mySwiper = new Swiper('#swiper1', {
        autoplay: isStopAutoplat ? false : { // 可选选项，自动滑动
          delay: 10000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        lazy: {
          loadPrevNext: true,
        },
        initialSlide: this.$route.query.page,
        direction: 'vertical', // 滑动方向
        observer: true,
        observeParents: true,
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
    swiper2init() {
      // eslint-disable-next-line no-unused-vars
      const mySwiper2 = new Swiper('#swiper2', {
        direction: 'vertical', // 滑动方向
        observer: true,
        observeParents: true,
        lazy: {
          loadPrevNext: true,
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
    .loading-box {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 300;
      border-radius: 50%;
      overflow: hidden;
      width: 90px;
      height: 90px;
      img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 160px;
        height: 160px;
      }
    }
    .swiper-container, .swiper-wrapper, .swiper-slide {
      width: 100%;
      height: 100%;
    }
    .swiper-slide {
      background: #f8cdbd url('../assets/bj1.jpg') center center no-repeat;
      background-size: 100% 100%;
      overflow: hidden;
    }
    .main-cont {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(0, -50%);
      width: 100%;
      height: 100%;
      background: url('../assets/bj.jpg') center center no-repeat;
      background-size: 100%;
      .img-bj {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(0, -50%);
        z-index: 10;
        width: 100%;
        margin: 0 auto 0;
      }
      .page-text1 {
        position: absolute;
        left: 10px;
        z-index: 20;
        padding: 152px 0 0 128px;
        text-align: left;
        h2 {
          font-size: 20px;
          line-height: 30px;
          color: #62442E;
        }
        p {
          font-size: 20px;
          color: #62442E;
          padding-top: 18px;
        }
      }
      .open-tips {
        margin-top: 17px;
        img {
          width: 293px;
          height: 50px;
        }
      }
    }

    .logo {
      position: absolute;
      right: 56px;
      top: 108px;
      z-index: 20;
      width: 218px;
      height: 132px;
      background: url('../assets/postmark.png') 0 0 no-repeat;
      background-size: 100%;
    }
    .page-text2, .page-text3, .page-text4, .page-text5, .page-text6, .page-text7 {
      position: relative;
      z-index: 20;
      padding: 216px 116px 0 116px;
      text-align: left;
      h2 {
        font-size: 24px;
        line-height: 30px;
        color: #62442E;
        font-weight: bold;
      }
      p {
        font-size: 22px;
        color: #62442E;
        padding-top: 18px;
      }
    }
    .page-text8, .page-text9 {
      position: absolute;
      z-index: 100;
      overflow: hidden;
      text-align: left;
      p {
        width: 100%;
        height: 100%;
        overflow: hidden;
        font-size: 21px;
        color: #683A18;
        font-weight: 40;
      }
    }
    .page-text8 {
      width: 378px;
      height: 233px;
      background: url('../assets/msg1.png') 0 0 no-repeat;
      background-size: 378px 233px;
      left: 80px;
      top: 190px;
      box-sizing: border-box;
      padding: 20px 30px 58px 30px;
    }
    .page-text9 {
      width: 374px;
      height: 228px;
      background: url('../assets/msg2.png') 0 0 no-repeat;
      background-size: 374px 228px;
      right: 78px;
      bottom: 214px;
      box-sizing: border-box;
      padding: 53px 30px 20px 28px;
    }
    .page-text10 {
      position: relative;
      z-index: 10;
      font-size: 26px;
      color: #62442E;
      font-weight: 400;
      line-height: 48px;
      text-align: left;
      padding: 187px 0 0 105px;
    }
    .house-keeper {
      max-height: 664px;
      overflow-y: scroll;
      position: relative;
      z-index: 10;
      padding: 5px 106px 0 106px;
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li {
          width: 48%;
          height: 309px;
          overflow: hidden;
          position: relative;
          margin-top: 20px;
        }
        img {
            width: 100%;
            height: 100%;
            // position: relative;
            // z-index: 30;
        }
        .kepper-info {
          position: absolute;
          left: 1px;
          top: 0;
          width: 99.6%;
          height: 308px;
          z-index: 20;
          border-radius: 2px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
          .kepper-name {
            position: absolute;
            width: 100%;
            left: 0;
            bottom: 0;
            z-index: 20;
            text-align: right;
            line-height: 64px;
            padding-right: 20px;
            box-sizing: border-box;
            height: 64px;
            background: rgba(130, 73, 32, 0.5);
            font-size: 24px;
            color: #ffffff;
          }
        }
      }
    }
    .full-style {
      ul {
        li {
          width: 100%;
          height: 309px;
        }
      }
    }
    .wifi-and-phone {
      position: relative;
      z-index: 10;
      text-align: right;
      padding-right: 110px;
      padding-top: 34px;
      p {
        font-size: 24px;
        color: #62442E;
        font-weight: 400;
        line-height: 24px;
        padding-top: 8px;
      }
      .phone {
        padding-top: 20px;
      }
    }
    .page-tips {
      position: absolute;
      left: 50%;
      bottom: 40px;
      transform: translate(-50%, 0);
      z-index: 50;
      animation: tipShow 1.6s forwards infinite;
      img {
        width: 388px;
        height: 56px;
      }
      .again-btn {
        width: 238px;
        height: 59px;
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
  .fixed-box {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 200;
    width: 100%;
    height: 100%;
    background: rgba(53, 53, 53, 0.6);
  }
  .pop-up {
    width: 580px!important;
    height: 1000px!important;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 200;
    transform: translate(-50%, -50%);
    text-align: left;
    #swiper2 {
      background: #f8cdbd;
      border-radius: 9px;
      overflow: hidden;
    }
    .close-btn {
      width: 54px;
      height: 53px;
      right: 0;
      top: -73px;
      position: absolute;
      background: url('../assets/close.png') 0 0 no-repeat;
      background-size: 54px 53px;
    }
    img {
      position: relative;
      z-index: 200;
    }
    .page-tips {
      bottom: 10px;
      img {
        width: 34px;
        height: 34px;
      }
    }
  }
</style>
