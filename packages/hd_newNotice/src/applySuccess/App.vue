<template>
  <div id="applySuccess">
    <img src="../assets/apply_status.png" alt="">
    <h2>报名成功</h2>
    <p>您报名的活动可在“我的活动”中查看</p>
    <div class="gotoGoyooStarHome" @click='gotoGoyooStar()'>更多活动</div>
    <div class="gotoMyActivity" @click='gotoMyActivity()'>查看我的活动</div>
  </div>
</template>
<script>

export default {
  name: '',
  data() {
    return {

    };
  },
  beforeMount() {

  },
  mounted() {
    this.getActiveDetail();
  },
  methods: {
    gotoGoyooStar() {
      window.wx.miniProgram.switchTab({ url: '/pages/goyooStar/goyooStar' });
    },
    gotoMyActivity() {
      window.wx.miniProgram.navigateTo({ url: '/packageA/pages/myActivity/myActivity' });
    },
  },
};
</script>
<style lang="less" scope>
  #applySuccess {
    text-align: center;
    padding: 30px 20px 0;
    img {
      width: 135px;
      height: 135px;
      margin: 0 auto;
    }
    h2 {
      font-size: 20px;
      line-height: 28px;
      padding-top: 10px;
      color: 333333;
    }
    p {
      font-size: 15px;
      line-height: 21px;
      color: #666666;
      margin-bottom: 40px;
      padding-top: 10px;
    }
    .gotoGoyooStarHome, .gotoMyActivity {
      display: block;
      text-decoration: none;
      font-size: 17px;
      color: #824921;
      height: 50px;
      line-height: 50px;
      border: 2px solid rgba(130, 73, 33, 0.1);
      border-radius: 8px;
      margin-bottom: 15px;
    }
    .gotoMyActivity {
      background: #F18D00;
      border-color: #F18D00;
      color: #ffffff;
    }
  }
</style>
