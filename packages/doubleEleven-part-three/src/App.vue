<template>
  <div id="app">
    <img class="app-banner" src="https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/constract/Iny4mRXa7m4.png?x-oss-process=image/resize,s_500/interlace,1/format,jpg" alt="">
    <img class="app-title" src="./assets/activeRules.png" alt="">
    <div class="app-content">
      <span class="Top">活动时间：2019年11月21日—2020年1月31日</span><br/>
      <span>活动内容：</span><br/>
      <span>1、龙湖冠寓部分城市门店上架特价房源，下载冠寓APP或询问门店运营人员即可获取最新特价房信息。</span><br/>
      <span>2、本活动不与其他优惠券共享，是否与其他租金折扣活动共享具体按门店政策执行，不同门店间政策可能不同。</span><br/>
      <span>3、门店展示的其他优惠活动具体执行及优惠金额以门店运营人员口径为准，理论上不与本次活动叠加。</span><br/>
      <span class="Center">其他：</span><br/>
      <span>1、冠寓有权对通过技术手段等恶意影响活动公平原则的行为进行鉴定并取消其参加活动的资格。 </span><br/>
      <span>2、在法律许可的范围内，冠寓留变更、调整、终止本活动的权利以及调整或变换活动奖品的权利。 </span><br/>
      <span>3、因不可抗力事件使本活动不能实现，冠寓不承担责任。不可抗力指自然灾害、政策管制等不可预见、不可控制或可预见但不可避免事件。</span><br/>
      <span>4、活动最终解释权归冠寓所有。</span><br/>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Goyoo',
  data() {
    return {
    };
  },
  created() {
    window.zhuge.track('双十一折扣券第三弹页');
    this.initData();
  },
  methods: {
    initData() {
    },
  },
};
</script>


<style lang="less">
html, body{margin: 0px;padding: 0px;background: #FF8243}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #FF8243;
  padding-bottom: 62px;
  max-width: 500PX;
  margin: 0 auto;
}
.app-banner{
  width: 100%;
  height: 542px;
  display: block;
}
.app-title{
  width: 690px;
  height: 150px;
  display: block;
  margin: 31px auto -10px;
}
.app-content{
  display: block;
  width: 610px;
  min-height: 800px;
  margin: 0 auto;
  background: url('./assets/activeContent.png');
  background-position: 0px 0px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 60px 40px 0px 40px;
  text-align: left;
  span{
    color: #EB4917;
    font-size: 26px;
    line-height: 42px;
    font-weight: 500;
    font-family: 'PingFangSC-Medium,PingFang SC';
  }
  .Top{font-weight: 800;}
  .Center{margin: 30px 0px;font-weight: 800;}
}
</style>
