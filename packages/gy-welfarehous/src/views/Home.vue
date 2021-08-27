<template>
  <div class="home">
    <div class="banner">
      <div
        class="share-btn"
        @click="share(cityName)">分享</div>
      <img src="../assets/banner_main.jpg" alt="">
    </div>
    sztszt
    <div
      class="switch-city"
      @click="openCityListPopup()">
      <i class="icon01"></i>
      <span>{{ cityName }}</span>
    </div>
    <div :class="['project-list-box', projectList.length < 4 ? 'project-list-other-style' : '']">
      <ul class="project-list">
        <li
          v-for="project in projectList"
          :key="project.id">
          <div class="project-img">
            <img :src="`${project.projectImageUrl}?x-oss-process=image/resize,s_355/interlace,1/format,jpg`" alt="">
          </div>
          <div class="project-info">
            <h2>{{ project.projectName }}</h2>
            <p class="project-price">
              {{`￥${project.projectPrice}`}}
              <em>/月</em>
            </p>
            <div
              class="coupon-btn"
              @click="openCouponPopup({
                type: project.type,
                couponNumber: project.couponNumber,
                couponvalue: project.couponvalue,
                projectName: project.projectName
              })">
              领{{project.couponvalue}}折券
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 领取优惠券弹窗 -->
    <getCoupon
      v-if="getCouponIsShow"
      :couponData="couponData"
      @submitEvent='getCoupon'
      @cancelEvent='closePopup' />
    <!-- 优惠券领取成功弹窗 -->
    <successPopup
      v-if="successPopUpIsShow"
      :couponData="couponData"
      @confirmEvent="confirmEvent()" />
    <!-- 城市列表组件 -->
    <cityList
      v-if="cityListIsShow"
      :cityListData="cityListData"
      :cityName='cityName'
      @switchCity="switchCity" />
    <showToast
      v-if="showToast.show"
      :showToast="showToast" />
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import { getAppAuthInfo, ShowSharePanel } from '@guanyu/guanyu-h5-tools';
import getCoupon from '@/components/getCoupon.vue';
import successPopup from '@/components/successPopup.vue';
import showToast from '@/components/showToast.vue';
import cityList from '@/components/cityList.vue';

export default {
  name: 'home',
  components: {
    getCoupon,
    successPopup,
    cityList,
    showToast,
  },
  data() {
    return {
      getCouponIsShow: false,
      successPopUpIsShow: false,
      cityListIsShow: false,
      projectList: [],
      cityListData: [],
      cityName: '',
      couponData: {
        type: '优惠券',
        quota: '88折',
        peojectName: '门店名称',
        tips: '本优惠券适用于本门店部分房间，参与活动房间数量有限，先到先得！',
      },
      showToast: {
        show: null,
        msg: '已经领取',
      },
    };
  },
  mounted() {
    // 获取城市列表
    this.getCityListData();
    window.zhuge.track('复工福利房', {
      cityname: this.$route.query.cityName,
    });
    this.beginTime = new Date().getTime();
    window.GyWebViewCloseFn = () => {
      const endTime = new Date().getTime();
      window.zhuge.track('页面访问时长', {
        页面名称: '复工福利房',
        停留时长: endTime - this.beginTime,
      });
    };
    window.onbeforeunload = () => {
      const endTime = new Date().getTime();
      window.zhuge.track('页面访问时长', {
        页面名称: '复工福利房',
        停留时长: endTime - this.beginTime,
      });
    };
  },
  methods: {
    // 唤起app分享
    share(cityName) {
      ShowSharePanel({
        types: ['wx_session'],
        title: '复工福利房，品质房源88折起',
        text: '复工福利房，品质房源88折起',
        url: '//m.test109.iguanyu.com/fe/gy-welfarehous/',
        image: 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/b8j9LM6Ghww.jpg',
        shareMiniProgramUrl: `guanyu://miniProgram?userName=gh_1b7cffb1d9a2&path=${encodeURIComponent('/packageA/pages/ac/welfareHouse/index?scene=')}${encodeURIComponent(cityName)}&appId=wx1c1c8c073e2be1fc&type=0`,
      });
    },
    // 获取活动城市
    getCityListData() {
      const params = {
        activityNumber: 202003284436,
      };
      axios.post('/coupon_api/api/activity/city/list', params).then((res) => {
        if (res.data.code === 0) {
          this.cityListData = res.data.data;
          this.cityName = this.$route.query.cityName || res.data.data[0];
          // 获取初始城市活动信息
          this.getInitData(this.cityName);
        }
      });
    },
    // 根据城市获取门店列表数据
    getInitData(city) {
      const params = {
        activityNumber: 202003284436, // 活动编号
        city, // 城市
      };
      axios.post('/coupon_api/api/activity/project/list', params).then((res) => {
        if (res.data.code === 0) {
          this.projectList = res.data.data;
          // couponvalue
          this.projectList.forEach((item, index) => {
            if (+item.couponvalue % 10 === 0) {
              this.projectList[index].couponvalue = item.couponvalue / 10;
            }
          });
        }
      });
    },
    // 打开城市列表
    openCityListPopup() {
      this.cityListIsShow = true;
    },
    // 切换城市重新获取门店列表数据
    switchCity(city) {
      this.cityListIsShow = false;
      this.cityName = city;
      this.getInitData(city);
    },
    // 打开领取优惠券弹窗
    openCouponPopup({ type, couponNumber, couponvalue, projectName }) {
      // 领取优惠券前判断是否登录，如未登录则唤起app登录功能
      const token = getAppAuthInfo();
      if (!token.access_token) {
        window.location.href = 'guanyu://page.gy/login';
        return;
      }
      this.couponData = {
        type,
        typeValue: '优惠券',
        couponNumber,
        quota: `${couponvalue}折`,
        peojectName: projectName,
        tips: '本优惠券适用于本门店部分房间，参与活动房间数量有限，先到先得！',
      };
      this.getCouponIsShow = true;
    },
    // 关闭领取优惠券弹窗
    closePopup() {
      this.getCouponIsShow = false;
    },
    // 成功领取优惠券按钮事件
    confirmEvent() {
      this.successPopUpIsShow = false;
    },
    // 领取优惠券
    getCoupon() {
      // 获取APP tooken
      let token = {};
      token = getAppAuthInfo();
      if (token && token.access_token) {
        token = token.access_token;
      }
      const params = {
        activityNumber: 202003284436,
        channel: 'app',
        couponNumber: this.couponData.couponNumber,
        couponType: this.couponData.type,
        token, // 787adfe742265ed0
      };
      axios.post('/coupon_api/api/coupon/receive', params).then((res) => {
        if (res.data.code === 0) {
          this.couponData.tips = '您可在 冠寓APP-我的-优惠券 中查询优惠券 本优惠券适用于本门店部分房间，参与活动房间数量有限，先到先得！';
          this.getCouponIsShow = false;
          this.successPopUpIsShow = true;
        } else {
          this.showToast.show = true;
          this.showToast.msg = res.data.msg;
          setTimeout(() => {
            this.showToast.show = false;
          }, 3000);
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
@import '../style/reset.css';
.banner {
  position: relative;
  img {
    width: 100%;
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
  .project-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px 0 0;
    justify-content: space-between;
    li {
      padding-top: 20px;
      width: 50%;
      box-sizing: border-box;
      padding: 20px 0 0 10px;
      overflow: hidden;
      box-sizing: border-box;
    }
    .project-img {
      width: 100%;
      height: 0;
      padding-bottom: 75%;
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
      position: relative;
      padding-top: 5px;
      h2 {
        width: 100%;
        height: 21px;
        white-space: nowrap;
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 15px;
        line-height: 21px;
        color: #333333;
      }
      .project-price {
        font-size: 15px;
        line-height: 21px;
        color: #F18D00;
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
        right: 4px;
        bottom: 0;
        font-size: 12px;
        width: 65px;
        height: 21px;
        line-height: 21px;
        color: #ffffff;
        text-align: center;
        background: #F18D00;
        border-radius: 11px;
        overflow: hidden;
        z-index: 10;
      }
    }
  }
}
.project-list-other-style {
  .project-list {
    display: block;
    li {
      width: 100%;
    }
    .project-img {
      // height: 238px;
      padding-bottom: 67%;
    }
    .project-info {
      padding-top: 10px;
    }
  }
}
</style>
