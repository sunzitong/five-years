<template>
  <div class="get-popup">
    <div class="mask-bg"></div>
    <div class="main-cont">
      <div class="success-main">
        <div class="success-title">
          <span class="coupon-type">{{couponData.typeValue}}</span>
          <span class="coupon-quota">{{couponData.quota}}</span>
        </div>
        <p class="project-name">{{couponData.peojectName}}</p>
        <p class="success-tips">
          {{couponData.tips}}
        </p>
        <div class="btn-box">
          <span
            class="submit-btn"
            @click="submitBtn()">领取</span>
          <span
            class="cancel-btn"
            @click="cancelBtn()">取消</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'getCoupon',
  props: {
    couponData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    submitBtn() {
      this.$emit('submitEvent');
    },
    cancelBtn() {
      this.$emit('cancelEvent');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.get-popup {
  position: fixed;
  left: 0;
  top: 0;
  box-sizing: border-box;
  z-index: 200;
  width: 100%;
  height: 100%;
  .mask-bg {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #000000;
    opacity: 0.6;
    z-index: 10;
  }
}
.main-cont {
  width: 100%;
  padding: 0 35px;
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
}
.success-main {
  background: #ffffff;
  width: 100%;
  border-radius: 10px;
  padding-top: 110px;
  padding: 110px 20px 0 20px;
  box-sizing: border-box;
  .success-title {
    width: 156px;
    height: 120px;
    position: absolute;
    background: url(../assets/coupon-bg.png) 0 0 no-repeat;
    background-size: 156px 120px;
    top: -20px;
    left: 50%;
    transform: translate(-50%, 0);
    span {
      display: block;
    }
    .coupon-type {
      width: 52px;
      height: 20px;
      font-size: 14px;
      color: #F18D00;
      line-height: 20px;
      margin: 21px 0 0 73px;
      background: #FFE55E;
      border-radius: 4px;
      text-align: center;
    }
    .coupon-quota {
      font-size: 36px;
      color: #ffffff;
      font-weight: bold;
      text-shadow: 0px 1px 2px #F18D00;
      text-align: center;
    }
  }
  .project-name {
    font-size: 15px;
    color: #333333;
  }
  .success-tips {
    font-size: 12px;
    color: #666666;
    line-height: 17px;
    padding-top: 5px;
  }
  .btn-box {
    padding-top: 25px;
    text-align: center;
    .submit-btn, .cancel-btn {
      width: 175px;
      height: 50px;
      font-size: 17px;
      line-height: 50px;
      border-radius: 8px;
      overflow: hidden;
      display: block;
      margin: 0 auto;
    }
    .submit-btn {
      background: #F18D00;
      color: #ffffff;
    }
    .cancel-btn {
      font-size: 15px;
      color: #666666;
    }
  }
}
</style>
