<template>
  <div class="success-popup">
    <div class="mask-bg"></div>
    <div class="main-cont">
      <div class="success-main">
        <h3>恭喜您！</h3>
        <p class="project-name">
          您已成功领取{{`${couponData.peojectName}${couponData.quota}${couponData.typeValue}`}}
        </p>
        <p class="success-tips">
          {{couponData.tips}}
        </p>
        <div
          class="confirm-btn"
          @click="confirmBtn()">知道了</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'successPopup',
  props: {
    couponData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    confirmBtn() {
      this.$emit('confirmEvent');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.success-popup {
  position: fixed;
  left: 0;
  top: 0;
  box-sizing: border-box;
  z-index: 100;
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
  padding: 20px 20px 0 20px;
  box-sizing: border-box;
  h3 {
    font-size: 18px;
    color: #333333;
    line-height: 25px;
    font-weight: bold;
    text-align: center;
  }
  .project-name {
    font-size: 15px;
    color: #333333;
    line-height: 21px;
    padding-top: 20px;
  }
  .success-tips {
    font-size: 12px;
    color: #666666;
    line-height: 17px;
    padding-top: 5px;
  }
  .confirm-btn {
    font-weight: bold;
    font-size: 17px;
    line-height: 54px;
    color: #F18D00;
    margin-top: 10px;
    text-align: center;
  }
}
</style>
