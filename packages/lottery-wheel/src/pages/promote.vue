<template>
  <div id="promote">
    <div>
      <img src="../assets/img/head.png" alt="" style="width: 100%;">
    </div>
    <div class="content">
      <div class="btn" @click="pathIndex()">立即预约看房赚积分</div>
      <div class="tip">
        <div class="tip-content">
          <p class="bottom1">【获取积分】</p>
          <p class="bottom2"> 1）预约奖励：在预约页面或App填写手机号并选择门店预约后自动升级为龙湖冠寓会员，并获得50积分（每个手机号限一次）。</p>
          <p class="bottom2"> 2）分享奖励：成功登陆后，在冠寓APP内完成一次房源分享（分享至朋友圈），即可获得10积分，每人每天最多获得30积分。</p>
          <p class="bottom1">【获取限时积分奖励】</p>
          <p class="bottom2">续约奖励：活动期间成功续约并完成支付可获得10000积分（仅限成都及厦门用户参与，其他城市敬请期待）。</p>
          <p class="bottom1">【抽奖奖品】</p>
          <p class="bottom2">抽奖奖品以大转盘实时展示为准。</p>
          <p class="bottom1">【领奖规则】</p>
          <p class="bottom2">1、虚拟类奖品（京东e卡、e袋洗礼品卡）在“中奖纪录”里即可查询。</p>
          <p class="bottom2">2、实物类奖品在中奖纪录中填写收货信息（奖品快递收货地址仅限中国大陆地区。</p>
          <p class="bottom2">3、中奖人需确保提供的领奖信息清晰准确，如果因领奖信息有误、不完整或不清晰而导致奖品不能正常发放的情况，视为放弃领奖资格。</p>
          <p class="bottom2">4、活动奖品以收到实物为准，冠寓有权用等价值的奖品对奖品清单中的奖品做替换。</p>
          <p class="bottom1">【注】</p>
          <p class="bottom2">- 冠寓有权对通过技术手段等恶意影响活动公平原则的行为进行鉴定并取消其参加活动的资格。</p>
          <p class="bottom2">- 活动最终解释权归冠寓所有。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable*/
export default {
  name: 'promote',
  data (){
    return{

    }
  },
  mounted() {
    setTimeout(() => {
      window.zhuge.track('预约看房换积分推广页')
    }, 2000)
  },
  methods: {
    pathIndex (){
      window.zhuge.track('预约看房换积分推广页-预约看房换积分按钮')
      location.href = '//m.iguanyu.com/'
    }
  }
}
</script>
<style lang="less">
#promote{
  width: 100%;
  background: rgb(171,229,206) url("../assets/img/q_01.png"); 
  background-repeat:repeat-y; 
  background-size: 100%;
  .content{
    background: rgb(170,228,206) url("../assets/img/j_03.png"); 
    background-repeat:repeat-y; 
    background-size: 100%;
    padding-bottom: 27px;
    padding-top: 15px;
  }
  .tip {
    margin-top: 15px;
    width: 89%;
    margin: 0 auto;
    border: 2px solid #331011;
    border-radius: 15px;
    background-color: #fff;
  }
  .tip-content {
    padding: 13px 23px;
    font-size: 14px;
    color: #331015;
    line-height: 1.5;
  }
  .btn{
      width: 89%;
      border: 2px solid #000;
      margin: 0 auto;
      margin-bottom: 23px;
      border-radius: 15px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      font-size: 24px;
      background-color: #fcff38;
  }
}
</style>
