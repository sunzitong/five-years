<template>
  <div class="home">
    <div class="banner">
      <div class="share-btn" @click="share(curCityName)" v-show="visitSource !== '小程序'">分享</div>
      <img src="../assets/banner_main.jpg" alt />
      <div class="rules-btn" @click="openRulesBtn()">
        <span>活动规则</span>
      </div>
    </div>
    <div class="switch-city" @click="openCityListPopup()">
      <i class="icon01"></i>
      <span>{{ curCityName }}</span>
    </div>
    <div
      v-if="(projectList.length === 0 && !initialRes)"
      class="empty-container"
    >
      啊哦，当前城市没有参与此活动哦
      <br />
      去门店看看其他优惠吧！
    </div>
    <div
      v-else
      class="project-list-box"
    >
      <ul class="project-list">
        <li v-for="project in projectList" :key="project.id" class="list-box">
          <div class="project-img">
            <img
              :src="`${project.projectImg}?x-oss-process=image/resize,s_355/interlace,1/format,jpg`"
              alt
            />
          </div>
          <div class="project-info">
            <h2>{{ project.projectName }}</h2>
            <ul class="coupons-list-label">
              <li
                v-for="(coupons, index) in project.activity.coupons"
                v-show="index <= 3"
                :key="coupons.couponNumber"
                :class="index > 2 ? 'aaa' : ''"
              >
                <em>免</em>
                <i>{{coupons.reduce}}</i>
                <em>天</em>
              </li>
            </ul>
            <div
              class="coupon-btn"
              @click="openCouponPopup(project.activity.coupons,
              project.projectName, project.activity.activityNumber)"
            >点击领券</div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="rulesIsShow" class="rules-box">
      <div class="mask"></div>
      <div class="rules-text">
        <div class="rules-cont">
          <h3>活动规则</h3>
          <p>
            1.用户可通过本次活动页面进入活动，选择当前城市相应门店进入优惠券领取页面；
            <br />2.用户在领取页面登录后可领取相应优惠券；
            <br />3.优惠券使用规则：在可以使用本优惠券的门店进行签约时，租期满12个月可享受减免1个月租金优惠，租期满6个月可享受减免半个月租金优惠，全部优惠将在租期的最后一个月进行减免。
            <br />4.本活动部分门店不参与，具体以门店运营管理人员口径为准。
            <br />5.其他：
            <br />1）冠寓有权对通过技术手段等恶意影响活动公平原则的行为进行鉴定并取消其参加活动的资格。
            <br />2）在法律许可的范围内，冠寓留变更、调整、终止本活动的权利以及调整或变换活动奖品的权利。
            <br />3）因不可抗力事件使本活动不能实现，冠寓不承担责任。 不可抗力指自然灾害、政策管制等不可预见、不可控制或可预见但不可避免事件。
            <br />4）活动最终解释权归冠寓所有。
          </p>
        </div>
        <div class="close-rules-text" @click="closeRulesBtn()">关闭</div>
      </div>
    </div>
    <!-- 城市列表组件 -->
    <cityList
      v-if="cityListIsShow"
      :cityList="cityList"
      :cityName="curCityName"
      @switchCity="switchCity"
    />
    <showToast v-if="showToast.show" :showToast="showToast" />
    <couponList
      v-if="couponListIsShow"
      :couponList="couponList"
      :projectName="projectName"
      @closeEvent="closeCouponListPopup"
      :activityNumber="activityNumber"
      :token="getToken()"
    />
  </div>
</template>

<script>
// @ is an alias to /src

import { judgeSystem, ShowSharePanel, getAppAuthInfo, getAppInfo } from '@guanyu/guanyu-h5-tools';
import { judgeDevice } from '@guanyu/h5-tools';
import couponList from '@/components/couponList.vue';
import showToast from '@/components/showToast.vue';
import cityList from '@/components/cityList.vue';

export default {
  name: 'home',
  components: {
    couponList,
    cityList,
    showToast,
  },
  data() {
    return {
      getCouponIsShow: false,
      cityListIsShow: false,
      couponListIsShow: false,
      rulesIsShow: false,
      couponList: [],
      projectList: [],
      cityList: [],
      curCity: [],
      curCityName: '',
      projectName: '',
      activityNumber: '',
      showToast: {
        show: false,
        msg: '',
      },
      visitSource: '',
      initialRes: true,
    };
  },
  mounted() {
    this.visitSource = judgeDevice();
    // 获取门店信息
    this.cityId = this.$route.query.cityId;
    this.getInitData(this.cityId);
    // 获取城市列表
    this.getCityList();
    // 初始化分享
    this.initailShareData();

    // 获取app或者小程序token信息
    this.getToken();
  },
  methods: {
    // 初始化分享
    initailShareData() {
      if (judgeDevice() === '小程序') {
        // 微信内
        window.wx.miniProgram.postMessage({
          data: {
            title: '你的好友偷偷塞给你一张房租免租券',
            desc: '龙湖冠寓燃爆一夏，最高减免1个月房租',
            imageUrl: 'http://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/F7juw5B4E7g.png',
            path: `${window.location.origin}/fe/hd-rentfree-coupon/?cityId=${this.cityId}`,
          },
        });
      }
    },

    // 获取app或者小程序token信息
    getToken() {
      let token = '';
      if (judgeDevice() === '小程序') {
        token = this.$route.query.sessionId;
      } else if (judgeDevice() === 'APP') {
        const appToken = getAppAuthInfo();
        token = appToken.access_token;
      }
      return token;
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
    share() {
      // const shareTypes = judgeSystem() === 'isIos' ? ['wx_session', 'wx_timeline'] : ['wx_session'];
      const shareTypes = ['wx_session'];
      const appInfo = getAppInfo() || {};
      const { app_version: appVersion = '' } = appInfo;
      const url = encodeURIComponent(
        `${window.location.origin}/fe/hd-rentfree-coupon?cityId=${this.cityId}`
      );
      let shareMiniProgramUrl;
      // android会多解密一次，所以要多encodeURIComponent一次
      if (judgeSystem() === 'isAndroid') {
        if (appVersion) {
          if (this.compareVersion(appVersion, '3.16.0') >= 0) {
            shareMiniProgramUrl = `guanyu://miniProgram?userName=gh_1b7cffb1d9a2&path=${encodeURIComponent(
              `/packageA/pages/bearWeb/bearWeb?item=${url}`
            )}&appId=wx1c1c8c073e2be1fc&type=0`;
          } else {
            shareMiniProgramUrl = `guanyu://miniProgram?userName=gh_1b7cffb1d9a2&path=${encodeURIComponent(
              encodeURIComponent(`/packageA/pages/bearWeb/bearWeb?item=${url}`)
            )}&appId=wx1c1c8c073e2be1fc&type=0`;
          }
        }
      } else {
        shareMiniProgramUrl = `guanyu://miniProgram?userName=gh_1b7cffb1d9a2&path=${encodeURIComponent(
          `/packageA/pages/bearWeb/bearWeb?item=${url}`
        )}&appId=wx1c1c8c073e2be1fc&type=0`;
      }

      ShowSharePanel({
        types: shareTypes,
        title: '你的好友偷偷塞给你一张房租免租券',
        url,
        image: 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/F7juw5B4E7g.png',
        text: '龙湖冠寓燃爆一夏，最高减免1个月房租',
        shareMiniProgramUrl,
      });
    },
    // 获取城市列表
    getCityList() {
      const params = {
        params: {
          isGqh: 0,
        },
      };
      this.$axios.get('/gymwebsite/city/cityList', params).then((res) => {
        if (res.data.code === 1000) {
          this.cityList = res.data.data;
          this.curCity = Array.isArray(this.cityList)
            && this.cityList.filter((item) => {
              return +item.id === +this.$route.query.cityId;
            });
          this.curCityName = this.curCity[0].name;
          window.zhuge.track('免租券活动页', {
            platform: this.visitSource === 'browser' ? '其他' : this.visitSource,
            cityName: this.curCityName,
          });
        }
      });
    },
    // 根据城市获取门店列表数据
    getInitData(id) {
      const params = {
        params: {
          cityId: id, // 城市
        },
      };
      this.Toast = window.vant.Toast.loading({
        message: '加载中...',
        duration: 0,
        forbidClick: true,
      });
      this.$axios.get('/coupon_api/api/discount/project/list', params).then((res) => {
        this.initialRes = false;
        this.Toast.clear();
        if (res.data.code === 0) {
          this.projectList = res.data.data;
          // couponvalue
          this.projectList.forEach((item, index) => {
            if (+item.couponvalue % 10 === 0) {
              this.projectList[index].couponvalue = item.couponvalue / 10;
            }
          });
        }
      }).catch(() => {
        this.initialRes = false;
        this.Toast.clear();
      });
    },
    // 打开城市列表
    openCityListPopup() {
      this.cityListIsShow = true;
    },
    // 切换城市重新获取门店列表数据
    switchCity(city) {
      this.cityListIsShow = false;
      this.cityId = city.id;
      this.curCityName = city.name;
      window.zhuge.track('免租券活动页', {
        platform: this.visitSource === 'browser' ? '其他' : this.visitSource,
        cityName: this.curCityName,
      });
      this.getInitData(city.id);
    },
    // 打开领取优惠券弹窗
    openCouponPopup(coupons, projectName, activityNumber) {
      const { sessionId = '' } = this.$route.query;
      if (judgeDevice() === '小程序' && !sessionId) {
        // 小程序内;
        window.wx.miniProgram.navigateTo({
          url: `/packageA/pages/login/login?webviewUrl=${encodeURIComponent(window.location.href)}`,
        });
        return;
      } else if (judgeDevice() === 'APP') {
        // 领取优惠券前判断是否登录，如未登录则唤起app登录功能
        if (!this.getToken()) {
          window.location.href = 'guanyu://page.gy/login';
          return;
        }
      }
      this.projectName = projectName;
      this.activityNumber = activityNumber;
      this.couponList = coupons;
      this.couponListIsShow = true;
    },
    closeCouponListPopup() {
      this.couponListIsShow = false;
    },
    // 查看活动规则
    openRulesBtn() {
      this.rulesIsShow = true;
    },
    // 关闭活动规则
    closeRulesBtn() {
      this.rulesIsShow = false;
    },
  },
};
</script>

<style scoped lang="less">
@import '../style/reset.css';
@font-face {
  font-family: myFirstFont;
  src: url(../css/Impact.ttf);
  font-weight: bold;
}
.empty-container {
  font-size: 14px;
  line-height: 24px;
  color: #666666;
  margin: 102px auto 0px auto;
  text-align: center;
}
.banner {
  position: relative;
  border-radius: 0 0 12px 12px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
  .share-btn {
    position: absolute;
    right: 11px;
    top: 6px;
    z-index: 20;
    width: 34px;
    height: 34px;
    text-indent: -9999px;
    background: url(../assets/share-btn.png) 0 0 no-repeat;
    background-size: 34px 34px;
  }
  .rules-btn {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 42px;
    padding-bottom: 5px;
    box-sizing: border-box;
    background: linear-gradient(180.52deg, rgba(0, 0, 0, 0) 26.29%, #212042 126.04%);
    text-align: center;
    z-index: 30;
    font-size: 14px;
    color: #ffffff;
    span {
      border-bottom: 1px solid #ffffff;
      vertical-align: -14px;
    }
  }
}
.rules-box {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
  .mask {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 0.6;
    background: #000000;
  }
  .rules-text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -55%);
    box-sizing: border-box;
    padding: 0 35px;
    width: 100%;
    .rules-cont {
      width: 100%;
      box-sizing: border-box;
      padding: 20px 20px 30px 20px;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      height: 494px;
      overflow-y: scroll;
    }
    h3 {
      font-size: 18px;
      color: #333333;
      font-weight: bold;
      line-height: 25px;
      text-align: center;
    }
    p {
      padding-top: 20px;
      font-size: 15px;
      color: #333333;
      line-height: 21px;
    }
    .close-rules-text {
      position: absolute;
      z-index: 200;
      left: 50%;
      bottom: -65px;
      transform: translate(-50%, 0);
      width: 70px;
      height: 70px;
      background: url(../assets/close.png) center bottom no-repeat;
      background-size: 35px 35px;
      text-indent: -9999px;
    }
  }
}
.switch-city {
  text-align: center;
  line-height: 44px;
  .icon01 {
    width: 12px;
    height: 5px;
    background: url(../assets/arrow.png) 0 0 no-repeat;
    background-size: 12px 5px;
    display: inline-block;
    vertical-align: 3px;
    margin-right: 6px;
  }
  span {
    font-size: 18px;
    color: #333333;
  }
}
.project-list-box {
  text-align: left;
  padding-bottom: 20px;
  padding: 0 10px 30px 10px;
  .project-list {
    justify-content: space-between;
    .list-box {
      padding-top: 20px;
      box-sizing: border-box;
      overflow: hidden;
      box-sizing: border-box;
      overflow: hidden;
      height: 125px;
      display: flex;
    }
    .project-img {
      width: 140px;
      height: 105px;
      border-radius: 8px;
      overflow: hidden;
      position: relative;
      background: url(../assets/img-loading.png) center center no-repeat;
      background-size: 100%;
      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
    .project-info {
      flex: 1;
      width: 214px;
      height: 100%;
      position: relative;
      box-sizing: border-box;
      padding-left: 17px;
      h2 {
        width: 100%;
        max-height: 49px;
        overflow: hidden;
        font-size: 17px;
        font-family: PingFang SC;
        color: #333333;
      }
      .coupons-list-label {
        display: flex;
        li {
          width: 50px;
          background: #fff4e4;
          font-size: 12px;
          color: #d17f33;
          // text-align: center;
          margin: 5px 5px 0 0;
          border-radius: 2px;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 22px;
          // line-height: 21px;
          em {
            font-size: 12px;
            color: #d88e4b;
            font-weight: normal;
          }
          i {
            font-family: myFirstFont;
            font-style: normal;
            font-weight: 900;
            font-size: 16px;
            // line-height: 17px;
            margin: -1px 3px 0px 3px;
          }
        }
        .aaa {
          width: 21px;
          height: 21px;
          background: url(../assets/more.png) 0 0 no-repeat;
          background-size: 21px 21px;
          text-indent: -9999px;
        }
      }
      .project-price {
        font-size: 15px;
        line-height: 21px;
        color: #f18d00;
        padding-top: 5px;
        font-family: PingFang SC;
        em {
          font-size: 12px;
          line-height: 17px;
          color: #666666;
        }
      }
      .coupon-btn {
        position: absolute;
        left: 17px;
        bottom: 0;
        font-size: 12px;
        width: 96px;
        height: 24px;
        line-height: 24px;
        color: #ffffff;
        text-align: center;
        background: #fd9902;
        border-radius: 11px;
        overflow: hidden;
        z-index: 10;
      }
    }
  }
}
</style>
