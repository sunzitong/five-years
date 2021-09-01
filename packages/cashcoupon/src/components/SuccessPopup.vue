<template>
  <div class="successCompont">
    <div class="fixed"></div>
    <div class="success-cont">
      <div class="responText">{{status}}</div>
      <h3 class="project-name">{{shopName}}</h3>
      <p class="coupon-amount"><span class="PriceGet">{{drawPrice}}</span> <span class="PriceNow">元现金券</span></p>
      <div
        class="goto-app"
        @click="gotoApp">
        去冠寓app使用
      </div>
      <div
      class="close-popup"
      @click="closePopup">关闭</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SuccessPopup',
  props: {
    status: String,
    shopName: String,
    drawPrice: String,
  },
  data() {
    return {

    };
  },
  mounted() {
    console.log('popMsg:', this.msg);
  },
  methods: {
    // 关闭领取成功弹窗
    closePopup() {
      this.$emit('successPopupClose');
      console.log('关闭弹窗');
    },

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .successCompont {
    .fixed {
      position: fixed;
      z-index: 10;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
    }
    .success-cont {
      width: 290px;
      position: fixed;
      z-index: 20;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background: #ffffff url(../assets/successbg.png) 0 0 no-repeat;
      background-size: 290px 207px;
      border-radius: 10px;
      padding: 29px 16px 15px 16px;
      box-sizing: border-box;
      .responText{
        font-size: 21px;
        color: #703C0F;
        line-height: 30px;
        font-weight: 600;
        font-family: 'PingFangSC-Semibold,PingFang SC';
      }
      h3 {
        font-size: 15px;
        color: #703C0F;
        line-height: 21px;
        padding-top: 3px;
        font-family:PingFangSC-Regular,PingFang SC;
      }
      .coupon-amount {
        padding-top: 19px;
        color: #703C0F;
        line-height: 35px;
        font-weight: 600;
        font-family: 'PingFangSC-Semibold,PingFang SC';
        .PriceNow{
          color: #703C0F;
          line-height: 21px;
          font-style: normal;
          font-size: 15px;
        }
        .PriceGet{
          font-size: 25px;
        }
      }
      .goto-app {
        margin-top: 95px;
        width: 100%;
        height: 61px;
        background: url(../assets/gotoapp.png) 0 0 no-repeat;
        background-size:  100% 61px;
        text-indent: -9999px;
      }
    }
    .close-popup {
      width: 32px;
      height: 32px;
      background: url(../assets/popclose.png) 0 0 no-repeat;
      background-size: 32px 32px;
      position: absolute;
      left: 50%;
      bottom: -50px;
      transform: translate(-50%, 0);
      z-index: 30;
      text-indent: -9999px;
    }
  }
</style>
