<template>
  <div id="container">
    <div class="thewheel">
      <p class="thewheel-p"><b>当前可用积分总额 {{ integral }}</b></p>
      <div class="wheel-main">
         <div class="wheel-pointer-box">
            <div class="wheel-pointer" @click="rotateClick()" :style="{transform:rotate_angle_pointer,transition:rotate_transition_pointer}"></div>
        </div>
        <div class="wheel-bg" :style="{transform:rotate_angle,transition:rotate_transition}">
          <div class="prize-list">
              <div class="prize-item" v-for="(item,index) in prize_list" :key="index">
                  <div class="prize-pic">
                      <img :src="item.image">
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
    <div class="title" @click="pathRecord()">
      <img src="../assets/img/title_05.png" alt="">
    </div>
    <div class="content">
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
    <!-- 每次点击抽奖时的弹框 -->
    <div v-transfer-dom>
      <confirm v-model="costPointshow"
        title=""
        @on-confirm="rotate_handle">
        <p style="text-align:center;font-size: 18px">{{costPointTitle}}</p>
      </confirm>
    </div>
    <!-- 获取奖品弹框 -->
    <div v-transfer-dom>
      <confirm v-model="okPrize"
        title=""
        confirm-text="我的奖品"
        cancel-text="再抽一次"
        @on-cancel="rotate_handle"
        @on-confirm="pathRecord">
        <p style="text-align:center;font-size: 18px">{{drawStatus}}</p>
      </confirm>
    </div>
    <!-- 未获取奖品弹框 -->
    <div v-transfer-dom>
      <confirm v-model="noPrize"
        title=""
        confirm-text="再抽一次"
        cancel-text="不抽了"
        @on-confirm="rotate_handle">
        <p style="text-align:center;font-size: 18px">{{drawStatus}}</p>
      </confirm>
    </div>
    <!-- 安慰奖品弹框 -->
    <div v-transfer-dom>
      <confirm v-model="type"
        title=""
        confirm-text="我的奖品"
        cancel-text="再抽一次"
        @on-cancel="rotate_handle"
        @on-confirm="pathRecord">
        <p style="text-align:center;font-size: 18px">{{drawStatus}}</p>
      </confirm>
    </div>
    <toast v-model="prompt" type="text" position="middle" :time="1500" >{{ promptTile }}</toast>
    <loading v-model="showLoading" :text="loadText"></loading>
  </div>
</template>
<script>
/* eslint-disable*/
import api from '../api/index'
import { TransferDom, Confirm, Toast } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Confirm,
    Toast,
  },
  data() {
    return {
      prompt: false, // 是否toast显示
      costPointshow: false, // 是否点击抽奖弹框
      okPrize: false, // 是否获取奖品弹框
      noPrize: false, // 是否未获取奖品弹框
      promptTile: "", // toast显示文案
      costPointTitle: "",  // 点击抽奖时的弹框titile
      drawStatus:"", //得奖和未得奖的title
      loadText: '加载中...', //load文案
      showLoading:false,
      integral: 0, // 本人积分
      prize_list: [
        {
          image: require("../assets/img/jp/4.png"), // 奖品图片
          stockNum: 0,
          id: 72,
          name: "谢谢",
          isPrize: 0
        },
        {
          image: require("../assets/img/jp/1.png"), // 奖品图片
          stockNum: 0,
          id: 73,
          name: "iphoneXs", // 奖品名称
          isPrize: 1 // 该奖项是否为奖品
        },
        {
          image: require("../assets/img/jp/2.png"), // 奖品图片
          stockNum: 0,
          id: 74,
          name: "Beats Solo3蓝牙耳机",
          isPrize: 1
        },
        {
          image: require("../assets/img/jp/3.png"), // 奖品图片
          stockNum: 2,
          id: 75,
          name: "kindle阅读器",
          isPrize: 1
        },
        {
          image: require("../assets/img/jp/7.png"), // 奖品图片
          stockNum: 1000,
          id: 76,
          name: "京东e卡5元",
          isPrize: 1
        },
        {
          image: require("../assets/img/jp/5.png"), // 奖品图片
          stockNum: 400,
          id: 77,
          name: "京东e卡10元",
          isPrize: 1
        },
        {
          image: require("../assets/img/jp/6.png"), // 奖品图片
          stockNum: 50,
          id: 78,
          name: "京东e卡100元",
          isPrize: 1
        },
        {
          image: require("../assets/img/jp/8.png"), // 奖品图片
          stockNum: 493,
          id: 79,
          name: "e袋洗礼品卡",
          isPrize: 1
        }
      ], //奖品列表
      prize_ids: [72, 73, 74, 75, 76, 77, 78, 79],
      start_rotating_degree: 0, //初始旋转角度
      rotate_angle: 0, //将要旋转的角度
      start_rotating_degree_pointer: 22, //指针初始旋转角度
      rotate_angle_pointer: 0, //指针将要旋转的度数
      rotate_transition: "transform 6s ease-in-out", //初始化选中的过度属性控制
      rotate_transition_pointer: "transform 12s ease-in-out", //初始化指针过度属性控制
      click_flag: true, //是否可以旋转抽奖
      index: 1,
      type: false,
      mobile: '',
      lmid: ''
    }
  },
  created() {
    api.postDetail().then(res => {
      this.costPointTitle = `${'确定使用'+res.result.activityInfo.costPoint+'积分开始抽奖？'}`
      // this.prize_list = res.result.prizeInfos;
    })
    api.postCustomerPoint().then(res => {
      if(res.result==null){
        this.integral = 0;
      } else {
        this.mobile = res.result.mobile;
        this.lmid = res.result.lmid;
        this.integral = res.result.point;
      }
    })
  },
  computed: {
   
  },
  methods: {
    rotateClick () { // 抽奖显示弹框
      if(this.integral!==0) {
        this.costPointshow=true;
      } else {
        this.prompt =true;
        this.promptTile = "主人、可用积分不足无法抽奖";
      }
    },
    rotate_handle () { // 点击转盘弹框确定 && 再来一次 && // 调用抽奖接口
      this.showLoading=true;
      api.postDraw().then(res => {
        window.zhuge.track('积分抽奖页-开始抽奖按钮');
        window.zhuge.identify(this.mobile, {"lmid": this.lmid})
        if(!res.success){
          this.prompt =true;
          this.promptTile = res.error;
          this.showLoading=false;
          return;
        }
        // res.result.itemid = 3;
        // res.result.type = 1;
        // res.result.noPrize = true;
        this.drawStatus = res.result.name;
        this.showLoading=false;
        this.index = this.prize_ids.indexOf(res.result.id); //指定每次旋转到的奖品下标
        this.rotating(res.result);
        api.postCustomerPoint().then(res => {
          if(res.result==null){
            this.integral = 0;
          } else {
            this.integral = res.result.point;
          }
        })
      })
    },
    pathRecord () {   // 获得奖品弹框确定 && 跳转奖品详情
      this.$router.push({path:`/record`});  
    },
    rotating(obj) {
      if (!this.click_flag) return;
      var type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
      var during_time = 5; // 默认为1s
      var result_index = this.index; // 最终要旋转到哪一块，对应prize_list的下标
      var result_angle = [360, 315, 270, 225, 180, 135, 94, 48]; //最终会旋转到下标的位置所需要的度数
      var rand_circle = 6; // 附加多转几圈，2-3
      this.click_flag = false; // 旋转结束前，不允许再次触发
      console.log(result_angle[result_index])
      if (type == 0) {
        // 转动盘子
        var rotate_angle = this.start_rotating_degree + rand_circle * 360 + 
          result_angle[result_index] - this.start_rotating_degree % 360;
        this.start_rotating_degree = rotate_angle;
        this.rotate_angle = "rotate(" + rotate_angle + "deg)";
        var that = this;
        // 旋转结束后，允许再次触发
        setTimeout( ()=> {
          that.click_flag = true;
          if(!obj.noPrize){
            if(obj.type === 2){
              that.type = obj.type === 2;
              that.drawStatus = `喜从天降，小冠偷偷送给您惊喜鼓励奖一份，快去看看吧！`;
            }else{
              that.okPrize=true;
              that.drawStatus = `恭喜您获得了${obj.name}`;
            }
          } else {
            that.noPrize=true;
            that.drawStatus = `很遗憾您没有中奖`;
          }
          console.log(obj)
        }, during_time * 1000 + 1500); // 延时，保证转盘转完
      } else {
        //
      }
    },
  }
}
</script>
<style lang="less">
#container {
  width: 100%;
  background-color: #aae4ce;
  background:  url("../assets/img/q_01.png"); 
  background-repeat:repeat-y; 
  background-size: 100%;
  .thewheel{
    width: 100%;
    background: #000 url("../assets/img/background.png") no-repeat    // rgb(171,229,206)
      center top;
    background-size: 100%;
    padding-bottom: 1.65rem;
  }
  .thewheel-p{
    padding-top: 82%;
    text-align: center;
    font-size: 14px;
    color:#000;
  }
  .wheel-main{
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-top: 15px;
    overflow: hidden;
  }
  .wheel-bg{
    width: 6.6rem;
    height: 6.6rem;
    background: url("../assets/img/draw_wheel.png") no-repeat;
    background-size: 100% 100%;
    color: #fff;
    transition: transform 3s ease;
    transform: rotate(22deg);
  }
  .wheel-bg div {
    text-align: center;
    display: flex;
  }
  .wheel-pointer-box{
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    -webkit-transform: translate(-50%, -60%);
    transform: translate(-50%, -60%);
  }
  .wheel-pointer {
    width: 127px;
    height: 127px;
    background: url("../assets/img/start.png") no-repeat center top;
    background-size: 100%;
    transform-origin: center 60%;
  }

  .prize-list {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .prize-list .prize-item {
    position: absolute;
    width: 2.2rem;
    height: 48%;
    z-index: 2;
    left: 33%;
    -moz-transform-origin:50% 100%;
    -webkit-transform-origin:50% 100%;
    -o-transform-origin:50% 100%;
  }
  .prize-list .prize-item:first-child {
    transform: rotate(0deg);
  }
  .prize-list .prize-item:nth-child(2) {
    transform: rotate(45deg);
  }
  .prize-list .prize-item:nth-child(3) {
    transform: rotate(90deg);
  }
  .prize-list .prize-item:nth-child(4) {
    transform: rotate(135deg);
  }
  .prize-list .prize-item:nth-child(5) {
    transform: rotate(180deg);
  }
  .prize-list .prize-item:nth-child(6) {
    transform: rotate(225deg);
  }
  .prize-list .prize-item:nth-child(7) {
    transform: rotate(-94deg);
  }
  .prize-list .prize-item:nth-child(8) {
    transform: rotate(-48deg);
  }
  .prize-pic img {
  }
  .title{
    width: 5.6rem;
    padding-top: 0.24rem;
    margin-top: -1.68rem;
    margin-left: 18%;
  }
  .content{
      background: rgb(170,228,206) url("../assets/img/j_03.png"); 
      background-repeat:repeat-y; 
      background-size: 100%;
      padding-bottom: 27px;
      padding-top: 16px;
    .tip {
      margin-top: 15px;
      width: 89%;
      margin: 0 auto;
      border: 1px solid #331011;
      border-radius: 15px;
      background-color: #fff;
    }
    .tip-content {
      padding: 13px 23px;
      font-size: 14px;
      color: #331015;
      line-height: 1.5;
    }
  }
  .bottom1{
    margin-bottom: 10px;
  }
  .bottom2{
    margin-bottom: 15px;
  }
  .weui-dialog__bd:first-child {
    font-size: 18px;
  }
  .weui-dialog {
    width: 90%!important;
  }
  .weui-mask {
    background: rgba(0, 0, 0, 0.8)!important;
  }
}

</style>

