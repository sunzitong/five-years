<template>
  <div class="coupon-box">
    <div class="mask" @click="closePopup()" @touchmove.prevent.stop="touchMove()"></div>
    <div :class="couponList.length > 3 ? 'coupon-list-box lockHeight' : 'coupon-list-box'">
    <!-- <div :class="couponList.length > 3 ? 'coupon-list-box' : 'coupon-list-box'"> -->
      <h3>请选择优惠券</h3>
      <ul class="coupon-list">
        <li
          v-for="coupons in couponList"
          :key="coupons.couponNumber"
          :class="coupons.relationAmount - coupons.receiveAmount > 0 ?  '' : 'disabled'"
        >
          <span class="explain-text">签约租期≥{{coupons.leaseTerm}}个月</span>
          <h4>免租{{coupons.reduce}}天</h4>
          <div
            class="receive-coupons-btn"
            @click="receiveCoupons(coupons)"
          >{{coupons.relationAmount - coupons.receiveAmount > 0 ? '领取' : '已领完'}}</div>
        </li>
      </ul>
    </div>
    <!-- 优惠券领取成功弹窗 -->
    <successPopup
      v-if="successPopUpIsShow"
      :projectName="projectName"
      @confirmEvent="confirmEvent()"
    />
    <showToast v-if="showToast.show" :showToast="showToast" />
  </div>
</template>

<script>
import successPopup from '@/components/successPopup.vue';
import showToast from '@/components/showToast.vue';

export default {
  name: 'couponList',
  props: {
    couponList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    projectName: {
      type: String,
      default: () => {
        return '';
      },
    },
    activityNumber: {
      type: Number,
      default: () => {
        return 0;
      },
    },
    token: {
      type: String,
      default: () => {
        return '';
      },
    },
  },
  data() {
    return {
      successPopUpIsShow: false,
      showToast: {
        show: false,
        msg: '',
      },
    };
  },
  components: {
    successPopup,
    showToast,
  },
  methods: {
    // 领取优惠券
    receiveCoupons(data) {
      // 判断是否可领取优惠券
      if (data.relationAmount - data.receiveAmount <= 0) return;
      const params = {
        activityNumber: this.activityNumber,
        couponNumber: data.couponNumber, // 券编号
        channel: 'app', // wap:M站  app:小程序或app
        token: this.token,
      };
      this.$axios.post('/coupon_api/api/discount/receive', params).then((res) => {
        if (res.data.code === 0) {
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
    // 关闭领取成功弹窗
    confirmEvent() {
      this.successPopUpIsShow = false;
    },
    closePopup() {
      this.$emit('closeEvent');
    },
    touchMove() {
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.coupon-box {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
  .mask {
    background: #000000;
    opacity: 0.6;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
  }

  .coupon-list-box {
    background: #ffffff;
    position: relative;
    z-index: 200;
    padding: 20px 0;
    height: 100%;
    overflow: auto;
    &.lockHeight {
      height: 355px;
    }
    h3 {
      font-size: 17px;
      color: #333333;
      text-align: center;
    }
  }
  .coupon-list {
    padding: 0 20px;
    li {
      background: url(../assets/coupon-list-bj.png) 0 0 no-repeat;
      height: 83px;
      margin-top: 20px;
      border-radius: 10px;
      overflow: hidden;
      box-sizing: border-box;
      padding: 13px 20px;
      position: relative;
      width: 100%;
      background-size: 100% 100%;
      .explain-text {
        font-size: 14px;
        color: #ffffff;
      }
      h4 {
        font-size: 24px;
        color: #ffffff;
        font-weight: bold;
      }
      .receive-coupons-btn {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translate(0, -50%);
        width: 100px;
        height: 41px;
        font-size: 15px;
        color: #ffffff;
        border-radius: 50px;
        text-align: center;
        background: #ff810d;
        line-height: 41px;
      }
      &.disabled {
        background: url(../assets/coupon-list-disabled.png) 0 0 no-repeat;
        .receive-coupons-btn {
          background: none;
          color: #999999;
        }
      }
    }
  }
}
</style>
