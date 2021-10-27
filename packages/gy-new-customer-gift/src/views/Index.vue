<template>
  <div class="wrapper-container">
    <a v-if="env.GyVirtualPhone" class="advisory-phone" :href="'tel:' + env.GyVirtualPhone">
      <img
        src="https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/app/b7hbq78Cchg3ujKWzWlkjw.png"
        class="advisory-icon"
        alt=""
      />
    </a>
    <img src="../assets/img/header.png" alt class="header-img" />
    <div class="content-container">
      <!-- <div class="title">注册即送优惠礼包</div>
      <div class="desc">搬家、购物优惠，样样用得上</div>
      <div class="coupon-container">
        <img src="../assets/img/coupon.png" alt class="coupon-img" />
        <img
          :src="renewalStatus ? couponButton : couponButtonDisabled"
          alt
          class="coupon-button-img"
          @click="renewal"
        />
        <img src="../assets/img/moving-button.png" alt class="moving-button-img" @click="moving" />
      </div> -->
      <div class="title">认证身份即享租房特权</div>
      <div class="desc">租金98折起，全国免费换租，众多权益等你来</div>
      <div class="privilege-container">
        <img src="../assets/img/students.png" alt @click="studentJump" />
        <img src="../assets/img/employee.png" alt @click="employeeJump" />
      </div>
      <div class="title">参与抽奖赢更多租房优惠</div>
      <div class="lottery-container">
        <div
          v-for="(item, index) in prizeInfo"
          :key="index"
          :class="['item', item.active ? 'active' : '']"
          @click="
            () => {
              // 抽奖动画进行中的时候，禁用点击
              if (drawing) {
                return;
              }
              if (index === 4) {
                drawDiscount();
              }
            }
          "
        >
          <img :src="item.imgUrl" alt />
        </div>
      </div>
    </div>
    <img
      src="../assets/img/invite-friends.png"
      alt
      class="invite-friends-img"
      @click="inviteJump"
    />
    <ConfirmModal
      v-if="modalStatus"
      :title="modalTitle"
      :desc="modalDesc"
      :hasOneBtn="hasOneBtn"
      @use="use"
      @close="closeModal"
    />
    <div class="mask" v-if="loading" />
  </div>
</template>

<script lang="ts">
// function identity(arg: any): number {
//     return arg;
// }

// identity('1')

import { Component, Inject } from 'vue-property-decorator';
import { judgeDevice } from '@guanyu/h5-tools';
import qs from 'qs';
import Base from './Base';
import { queryCouponStatus, getMovingCoupon, drawDiscount } from '@/api';
import ConfirmModal from '@/components/ConfirmModal.vue';
import to from 'await-to-js';
import { getToken, toLogin } from '@/utils/guanyu';
import { getQueries, getEnvHost } from '@/utils/tools';
import { Toast } from 'vant';
import couponButton from '@/assets/img/coupon-button.png';
import couponButtonDisabled from '@/assets/img/coupon-button-disabled.png';

@Component({
  name: 'index',
  components: {
    ConfirmModal,
  },
})
export default class Index extends Base {
  @Inject() visitSource!: string;
  // app和小程序分享
  @Inject() share!: Function;

  prizeInfo = [
    {
      imgUrl: require('../assets/img/pic1.png'),
      active: false,
    },
    {
      imgUrl: require('../assets/img/pic2.png'),
      active: false,
    },
    {
      imgUrl: require('../assets/img/pic3.png'),
      active: false,
    },
    {
      imgUrl: require('../assets/img/pic4.png'),
      active: false,
    },
    {
      imgUrl: require('../assets/img/pic5.png'),
      active: false,
    },
    {
      imgUrl: require('../assets/img/pic6.png'),
      active: false,
    },
    {
      imgUrl: require('../assets/img/pic7.png'),
      active: false,
    },
    {
      imgUrl: require('../assets/img/pic8.png'),
      active: false,
    },
    {
      imgUrl: require('../assets/img/pic9.png'),
      active: false,
    },
  ];

  couponButton = couponButton;

  couponButtonDisabled = couponButtonDisabled;

  // 奖品顺序index队列
  prizeIndexSequence = [0, 1, 2, 5, 8, 7, 6, 3];

  // 当前激活的index
  currentIndex = 0;

  // 达到最大速度后的次数
  maxSpeedCount = 0;

  // 最大速度
  maxSpeed = 35;

  // 当前速度，开始的时候即为初始速度
  currentSpeed = 150;

  // 达到最大速度后持续的最大次数
  maxSpeedCountBoundary = 70;

  // 是否开始减速
  iSSpeedDown = false;

  // 是否达到最小速度

  isMinSpeed = false;

  // 开始减速后到达最小速度时的次数
  minSpeedCount = 0;

  // 开始减速后到达最小速度时持续的最大次数
  minSpeedCountBoundary = 10;

  // 抽奖活动状态
  drawDiscountStatus = true;

  // 领券状态
  renewalStatus = true;

  // 抽奖动画是否进行中
  drawing = false;

  // modal状态
  modalStatus = false;

  //modal标题
  modalTitle = '';

  //modal描述
  modalDesc = '';

  //modal是否只有一个按钮
  hasOneBtn = false;

  // 查询用户领取状态的loading
  loading = false;

  origin = 'https://m.iguanyu.com';

  //关闭modal
  closeModal() {
    this.modalStatus = false;
    this.queryCouponStatus();
  }

  //modal功能回调
  use() {
    const visitSource = judgeDevice();
    if (visitSource === '小程序') {
      window.wx.miniProgram.navigateTo({
        url: '/packageA/pages/quickFindHouse/quickFindHouse',
      });
    }
    if (visitSource === 'APP') {
      window.location.href = `guanyu://page.gy/apartments?cityId=${this.env.cityId}`;
    }
    this.modalStatus = false;
    this.queryCouponStatus();
  }

  // 跳转到学生特权
  studentJump() {
    window.zhuge.track('首页冠寓 - 新客礼包 - 毕业生身份认证按钮 - 点击');
    this.login();
    if (!getToken()) {
      return;
    }
    window.location.href = `${
      this.origin
    }/fe/dream-project/#/fe/dream-project/layout/index${qs.stringify(getQueries(), {
      addQueryPrefix: true,
    })}`;
  }

  // 跳转到企业
  employeeJump() {
    window.zhuge.track('首页冠寓 - 新客礼包 - 企业员工身份认证按钮 - 点击');
    this.login();
    if (!getToken()) {
      return;
    }
    window.location.href = `${this.origin}/guanQiHui${qs.stringify(getQueries(), {
      addQueryPrefix: true,
    })}`;
  }

  //跳转到搬家
  moving() {
    this.login();
    if (!getToken()) {
      return;
    }
    window.location.href = `${this.origin}/gyapp/house-moving/homepage${qs.stringify(getQueries(), {
      addQueryPrefix: true,
    })}`;
  }

  // 跳转到好友邀请
  inviteJump() {
    this.login();
    if (!getToken()) {
      return;
    }
    window.location.href = `${this.origin}/fe/customerinvitat${qs.stringify(getQueries(), {
      addQueryPrefix: true,
    })}`;
  }

  mounted() {
    document.title = '新客礼包';
    switch (getEnvHost()) {
      case 'test109': {
        this.origin = 'http://m.test109.iguanyu.com';
        break;
      }
      case 'staging': {
        this.origin = 'http://m.staging.iguanyu.com';
        break;
      }
      default: {
        this.origin = 'https://m.iguanyu.com';
      }
    }
    if (this.visitSource === '小程序') {
      this.share({
        currentUrl: window.location.href,
      });
    }
    if (getToken()) {
      this.queryCouponStatus();
    }
  }

  // 领取搬家券
  async renewal() {
    this.login();
    if (!getToken()) {
      return;
    }
    if (!this.renewalStatus) {
      return;
    }
    Toast.loading({
      duration: 0,
      message: '领取中...',
      forbidClick: true,
    });
    const [, res] = await to(getMovingCoupon());
    if (!res) return;
    const { status, msg = '领取失败' } = res;
    if (status === 'ok') {
      Toast.clear();
      this.modalTitle = '恭喜您成功领取到搬家优惠券';
      this.modalDesc = '使用冠寓搬家服务时即可使用该优惠券';
      this.hasOneBtn = true;
      this.modalStatus = true;
    } else {
      Toast(msg);
    }
  }

  // 请求抽奖接口
  async drawDiscount() {
    this.login();
    if (!getToken()) {
      return;
    }
    if (!this.drawDiscountStatus) {
      Toast('您已经抽过奖啦');
      return;
    }
    this.drawing = true;
    const [, res] = await to(
      drawDiscount({
        city: '全国',
        channel: 'wx_miniprogram',
      })
    );
    if (!res) return;
    const { status, data } = res;
    if (status !== 'ok') {
      this.drawing = false;
      return;
    }
    const { prizeCode } = data;
    this.prizeCode = prizeCode;
    this.draw();
  }

  // 抽奖
  draw() {
    this.prizeInfo = this.prizeInfo.map((item, index) => {
      return {
        ...item,
        active: index === this.prizeIndexSequence[this.currentIndex] ? true : false,
      };
    });
    const timer = setTimeout(() => {
      if (this.currentIndex <= 6) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
      if (this.isMinSpeed && this.currentIndex === (this.prizeCode === 1 ? 0 : 6)) {
        if (this.prizeCode === 1) {
          this.modalTitle = '恭喜您获得了9.8折优惠券';
          this.modalDesc = '签约入住冠寓即可使用该优惠券';
          this.modalStatus = true;
        }
        if (this.prizeCode === 0) {
          this.modalTitle = '很抱歉，大奖与你失之交臂';
          this.modalDesc = '';
          this.hasOneBtn = true;
          this.modalStatus = true;
        }
        clearTimeout(timer);
        this.drawing = false;
        this.currentSpeed = 0;
        this.maxSpeedCount = 0;
        this.iSSpeedDown = false;
        this.isMinSpeed = false;
        this.minSpeedCount = 0;
        return;
      }
      // 当前速度小于等于最大速度
      if (this.currentSpeed > this.maxSpeed && !this.iSSpeedDown) {
        // 按照 +5 的速率递增
        this.currentSpeed -= 5;
      } else if (this.maxSpeedCount <= this.maxSpeedCountBoundary) {
        // 当超过了最大速度则保持最大速度
        this.maxSpeedCount++;
        this.currentSpeed = this.maxSpeed;
      } else {
        this.iSSpeedDown = true;
        //开始减速
        if (this.minSpeedCount <= this.minSpeedCountBoundary) {
          this.minSpeedCount++;
          // 按照 -8 的速率递减
          this.currentSpeed += 15;
        } else {
          // 已经达到最小速度
          this.isMinSpeed = true;
        }
      }
      this.draw();
    }, this.currentSpeed);
  }

  /**
   * 获取城市列表
   */
  // async getCityList() {
  //   const [, res] = await to(getCityList());
  //   if (!res) return;
  //   if (res.status === 'ok') {
  //     /**/
  //   }
  // }

  /**
   * 查询新客礼包状态
   */
  async queryCouponStatus() {
    // Toast.loading({
    //   duration: 0,
    //   message: '查询领取状态...',
    //   forbidClick: true,
    // });
    this.loading = true;
    const [, res] = await to(queryCouponStatus());
    this.loading = false;
    if (!res) return;
    const { status, data = {}, msg = '查询领取状态失败' } = res;
    const { drawDiscountStatus = true, renewalStatus = true } = data;
    if (status === 'ok') {
      Toast.clear();
      this.drawDiscountStatus = drawDiscountStatus;
      this.renewalStatus = renewalStatus;
    } else {
      Toast(msg);
    }
  }

  // 登录
  login(webviewUrl = '') {
    const token = getToken();
    // 未登录
    if (!token) {
      toLogin(webviewUrl);
      return;
    }
  }
}
</script>

<style lang="scss">
.wrapper-container {
  background: #ffffff;
  position: relative;
  .header-img {
    width: 100%;
    height: 330px;
  }
  .content-container {
    padding: 24px 18px 22px 18px;
    border-top-right-radius: 30px;
    margin-top: -96px;
    position: relative;
    background-color: #ffffff;
    .title {
      font-weight: bold;
      font-size: 17px;
      line-height: 24px;
      color: #333333;
    }
    .desc {
      font-size: 14px;
      line-height: 20px;
      color: #666666;
      margin-bottom: 10px;
    }
    .coupon-container {
      position: relative;
      margin-bottom: 24px;
      .coupon-img {
        height: 200px;
        width: 100%;
      }
      .coupon-button-img {
        width: 108px;
        height: 40px;
        position: absolute;
        top: 16px;
        left: 193px;
      }
      .moving-button-img {
        width: 91px;
        height: 26px;
        position: absolute;
        top: 149px;
        left: 197px;
      }
    }

    .privilege-container {
      display: flex;
      justify-content: space-between;
      margin-bottom: 24px;
      img {
        height: 75px;
        // width: 165px;
        width: 48.6%;
      }
    }

    .lottery-container {
      background: #eaeaea;
      border-radius: 8px;
      padding: 10px;
      margin-top: 10px;
      flex-wrap: wrap;
      display: flex;
      margin-bottom: 22px;
      .item {
        height: 80px;
        width: calc(calc(100% - 8px) / 3);
        background: linear-gradient(180deg, #b61bff 0%, #9a1bff 100%);
        border-radius: 4px;
        margin-bottom: 4px;
        &.active {
          background: #e992ff !important;
        }
        img {
          width: 100%;
          height: 100%;
        }
        &:not(:nth-child(3n)) {
          margin-right: 4px;
        }
        &:nth-child(n + 7) {
          margin-bottom: 0px;
        }
      }
    }
  }

  .invite-friends-img {
    height: 170px;
    width: 100%;
  }
}

.confirm-wapper {
  background: rgba(0, 0, 0, 0.6);
  height: 100vh;
  width: 100vw;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;

  .box-container {
    background-color: #ffffff;
    border-radius: 8px;
    width: 305px;

    .top-container {
      padding: 20px 20px 10px;
      min-height: 105px;
      box-sizing: border-box;
      .title {
        font-weight: bold;
        font-size: 18px;
        line-height: 25px;
        text-align: center;
        color: #333333;
        margin-bottom: 20px;
      }
      .desc {
        font-size: 15px;
        line-height: 21px;
        color: #333333;
      }
    }

    .button-container {
      display: flex;
      align-items: center;
      .btn {
        height: 54px;
        font-size: 17px;
        line-height: 54px;
        text-align: center;
        color: #666666;
        flex: 1;
        &.active {
          font-weight: bold;
          color: #f18d00;
        }
      }
      .split-line {
        width: 0.5px;
        height: 24px;
        background-color: #ebebeb;
      }
    }
  }
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 2;
}

.advisory-phone {
  position: fixed;
  display: flex;
  right: 15px;
  bottom: 75px;
  z-index: 1;
}

.advisory-icon {
  height: 65px;
  // width: 104px;
}
// .page__index {
//   .header {
//     font-size: 15px;
//     text-align: center;
//     .share {
//       position: fixed;
//       top: 20px;
//       right: 0;
//       width: 62px;
//       height: 30px;
//       font-size: 0;
//       @extend %bg-img-share;
//     }
//   }
// }
</style>
