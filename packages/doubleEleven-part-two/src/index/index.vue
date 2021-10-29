<template>
  <div class="home">
    <div class="Banner">
      <img src="https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/constract/a8pePFfeIoA.png?x-oss-process=image/resize,s_600/interlace,1/format,jpg" alt="">
    </div>
    <div :class="boxName">
      <div class="ChoiceShop">
        <div class="ChoiceCommon" @click="UserChoiceCity">
          {{areapName}}
          <img class="Selected" src="../assets/selected.png" alt="">
        </div>
        <div class="ChoiceCommon" @click="ChoiceShop">
          {{shopName}}
          <img class="Selected" src="../assets/selected.png" alt="">
        </div>
        <div class="ChoiceCommon" v-if="!inApp">
          <input v-on:input='inputFunc' class="InputCommon"
            v-model="phoneNumber" type="tel" placeholder="请输入手机号" placeholder-class='PhoneStyle'>
          <img v-if="phoneNumber.length > 0" @click="clearPhoneNumber" class="Selected Closed"
          src="../assets/clearInput.png" alt="">
        </div>
        <div class="ChoiceCommon" v-if="!inApp">
          <input  v-on:input='inputGetCode' v-model="phoneCode" class="InputCommon"
            type="tel" placeholder="请输入验证码" placeholder-class='PhoneStyle'>
          <div v-if="!sendPhoneCode" class="getPhoneCode"
            @click="CansendPhoneCode">{{sendName}}</div>
          <div v-else class="getPhoneCode">{{conutDown}}后重新发送</div>
        </div>
        <div class="RightGet" @click="getRightNow">
          <img src="../assets/getRightNow.png" alt="">
        </div>
        <ul class="DerailCommon UserChoiced" v-if="AreaDerail">
          <li v-for="(item, index) in httpGetShopList" v-bind:key="index" class="EachLi"
          @click="HideAreaChoice({item})">{{item.cityName}}</li>
        </ul>
        <ul class="DerailCommon UserChoiced areaChoiced" v-if="ShopDerail">
          <li v-for="(items, index) in shopArys" v-bind:key="index" class="EachLi"
          @click="HideCityChoice({items})">{{items.itemName}}</li>
        </ul>
      </div>
      <div class="GameRules">
        <img class="RulesTop" src="../assets/activeRules.png" alt="">
        <div class="RulesBox">
          <span class="AddWeight">活动时间：2019.11.14-2020.4.30</span><br/>
          <span class="AddWeight">活动内容：</span><br/>
          1、在活动有效期内，用户可在此页面填写登录信息并领取优惠券。<br/>
          2、此优惠券有效期至2020年4月30日，需在此日期前签约使用，并满足租期大于等于3个月的要求。<br/>
          3、使用此优惠券的用户，可享受租期内5-15天不等租金的返工福利优惠，天数以各个地区返工及门店政策为准，具体可询问门店运营管理人员。此部分优惠金额将平均分配到签约租期内每个月房租进行优惠，用户需在签约时选取优惠券使用。<br/>
          4、本优惠券使用后不可退换，不可买卖及赠予，不可与其他优惠券叠加使用（续租用户可叠加98折优惠），请保持领取手机号和签约手机号一致。<br/>
          5、本活动部分门店不参与，具体以门店政策为准，请在领取或签约前询问门店管理人员。<br/>
          <span class="AddWeight">【其他】</span><br/>
          1、冠寓有权对通过技术手段等恶意影响活动公平原则的行为进行鉴定并取消其参加活动的资格。<br/>
          2、在法律许可的范围内，冠寓保留变更、调整、终止本活动的权利以及调整或变换活动奖品的权利。<br/>
          3、因不可抗力事件使本活动不能实现，冠寓不承担责任。不可抗力指自然灾害、政策管制等不可预见、不可控制或可预见但不可避免事件。<br/>
           4、活动最终解释权归冠寓所有。<br/>
        </div>
      </div>
    </div>
    <div class="ShowResult" v-if="showRusultGet">
      <div v-if="resultStatus">
        <img class="ResultSuccess" src="../assets/getGiftsNow.png" alt="">
        <div class="resolt-success-text">恭喜你</div>
      </div>
      <div v-if="!resultStatus">
        <img class="ResultSuccess" src="../assets/sorry.png" alt="">
        <div class="resolt-success-text">很抱歉</div>
      </div>
      <div class="success-content">{{successContent}}</div>
      <img v-if="enviroment === 'App'"
        class="down-app" @click="goSignShop" src="../assets/choiceSign.png" alt="">
      <img v-if="enviroment === 'web'"
        class="down-app" @click="GotoDownApp" src="../assets/openApp.png" alt="">
      <img v-if="enviroment === 'Wx' || enviroment === 'miniWx'"
        class="down-app" @click="closeResult" src="../assets/iKnow.png" alt="">
      <img class="close-down-app" @click="closeResult" src="../assets/closeShadow.png" alt="">
    </div>
    <div class="ShowToast" v-if="ShowToast">{{toastContent}}</div>
    <div v-if="prevenTouch" @click="releaseChoice" class="BoxCommon BoxShadow"
      @touchmove.stop.prevent='Donothing'></div>
    <div v-if="getResult" @click="closeResult" class="BoxCommon ResultBox"
      @touchmove.stop.prevent='Donothing'></div>
  </div>
</template>
<script>
import wx from 'weixin-js-sdk';
import { getAppAuthInfo, judgeIsInGyApp, openLogin } from '@guanyu/guanyu-h5-tools';
import { wxShare } from '@guanyu/h5-tools';
import { setTimeout } from 'timers';
import { getShopList, getPhoneCode, drawCoupon } from '../utils/server';

export default {
  name: 'Goyoo',
  data() {
    return {
      ShowToast: false,
      areapName: '选择城市',
      areaId: '',
      shopName: '门店名称',
      shopId: '',
      shopArys: [],
      boxName: '',
      httpGetShopList: {}, // 数据返回
      AreaDerail: false, // 选择城市开关
      ShopDerail: false, // 选择门店开关
      sendPhoneCode: false, // 是否发送验证码
      conutDown: 60, // 倒计时
      enviroment: '', // 当前环境 app/h5
      countDownInterval: null, // 倒计时
      showRusultGet: false, // 是否调用立即领取接口
      toastContent: '', // 提示内容
      successContent: '', // 调用领取接口返回
      phoneNumber: '', // 手机号
      isInWx: false, // 是否在微信中
      phoneCode: '', // 验证码
      inMiniGram: Boolean, // 是否存在微信小程序当中
      sendName: '获取验证码', // 发送验证码区域内容
      resultStatus: Boolean, // 调接口返回结果
      prevenTouch: false, // 放滑动
      getResult: false, // 返回结果遮罩
      token: '', // 用户登录token
      inApp: true, // 是否在app内部
    };
  },
  created() {
    window.zhuge.track('双十一折扣券第二弹页');
    this.getState();
    this.initShare(); // 初始化分享数据
  },
  methods: {
    getState() {
      const sendDate = '';
      getShopList(sendDate).then((res) => {
        if (res.data.code === 0) {
          this.httpGetShopList = res.data.data.citys;
        }
      });
      wx.miniProgram.getEnv((res) => {
        if (res.miniprogram) {
          this.token = this.getUrlParam('sessionId');
          if (!this.token) {
            // 非完整用户需填写手机号
            this.inApp = false;
            this.boxName = 'StoreOthersWeb';
          } else {
            this.inApp = true;
            this.boxName = 'StoreOthersApp';
          }
          this.enviroment = 'miniWx';
        }
      });
      const ua = navigator.userAgent.toLowerCase();
      if (judgeIsInGyApp()) {
        // true  在app内部
        this.inApp = true;
        this.enviroment = 'App';
        this.boxName = 'StoreOthersApp';
        this.token = getAppAuthInfo().access_token;
      } else if (ua.match(/MicroMessenger/i) === 'micromessenger') {
        this.isInWx = true;
        this.enviroment = 'Wx';
      } else {
        this.inApp = false;
        this.enviroment = 'web';
        this.boxName = 'StoreOthersWeb';
      }
    },
    initShare() {
      const url = `${window.location.origin}/fe/doubleEleven-part-two/index.html`;
      // const url = 'http://m.test109.iguanyu.com/fe/doubleEleven-part-two/index.html';
      wxShare({
        api: `${window.location.origin}/gymwebsite/getJsapiSigna`, // 获取微信鉴权的接口地址,
        title: '冠寓有料，第二弹', // 分享标题,
        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致,
        img: 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/constract/WMFPNVvxdOY.png', // 分享图标,
        desc: '冠寓有料，第二弹。猛料来袭，错过再等一年。', // 分享描述,
        type: 'link', // 分享类型,music、video或link，不填默认为link,
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      });
    },
    UserChoiceCity() {
      // 选择城市
      this.AreaDerail = true;
      this.prevenTouch = true; // 遮罩层，防滑动
    },
    HideAreaChoice(item) {
      // 点击 li  隐藏城市选择
      this.AreaDerail = false;
      this.areapName = item.item.cityName;
      this.areaId = item.item.cityId;
      this.prevenTouch = false;
      this.shopArys = item.item.items;
      // 门店列表进行重置
      this.shopName = '门店名称';
    },
    HideCityChoice(items) {
      // 点击 li  隐藏门店选择
      this.ShopDerail = false;
      this.shopName = items.items.itemName;
      this.shopId = items.items.itemId;
      this.prevenTouch = false;
    },
    ChoiceShop() {
      // 选择门店
      if (this.areapName === '选择城市') {
        this.showToast('您需要先选择城市后才可选择领取门店');
        return;
      }
      this.ShopDerail = true; // 下拉框出现
      this.prevenTouch = true; // 遮罩层，防滑动
    },
    getRightNow() {
      // 点击立即领取
      if (this.inApp) {
        if (this.enviroment === 'App') {
          if (!getAppAuthInfo().access_token) {
            // 用户未登录, 跳转至登录页
            openLogin();
            return;
          }
        }
      }
      const phoneTest = /^1[23456789]\d{9}$/;
      if (this.areapName === '选择城市') {
        this.showToast('您需要先选择城市后才可选择领取门店');
        return;
      } else if (this.shopName === '门店名称') {
        this.showToast('请选择门店');
        return;
      }
      if (!judgeIsInGyApp()) {
        if (this.enviroment === 'web' || this.enviroment === 'Wx') {
          // 不在app 内部判断手机号和验证码是否存在
          if (!phoneTest.test(this.phoneNumber)) {
            this.showToast('很抱歉，您输入的手机号不正确请检查');
            return;
          } else if (!this.sendPhoneCode) {
            this.showToast('请先发送验证码');
            return;
          } else if (this.phoneCode === '') {
            this.showToast('请输入验证码');
            return;
          }
        }
      }
      const sendDate = {
        cityId: this.areaId,
        itemId: this.shopId,
        itemName: this.shopName,
        phone: this.phoneNumber,
        token: this.token,
        channel: this.inApp ? 'app' : 'wep',
        verificationCode: this.phoneCode,
      };
      drawCoupon(sendDate).then((res) => {
        if (res.data.code === 0) {
          this.getResult = true;
          this.successContent = `成功领取“${this.shopName}”优惠券，前往冠寓APP即可查看使用`;
          this.showRusultGet = true;
          this.resultStatus = true; // 恭喜你
        } else if (res.data.code === 1002) {
          this.getResult = true;
          this.successContent = `你已领取过“${this.shopName}”优惠券，无法重复领取，前往冠寓APP即可查看使用`;
          this.showRusultGet = true;
          this.resultStatus = false; // 很抱歉
        } else if (res.data.code === 1001) {
          // 领取异常提示
          this.showToast(res.data.msg || '服务异常');
        } else if (res.data.code === 1003) {
          this.showToast('很抱歉，活动已经结束');
        }
      })
        .catch(() => {
          this.showToast('领取异常，请重新尝试');
        });
    },
    CansendPhoneCode() {
      // 发送验证码
      const phoneTest = /^1[23456789]\d{9}$/;
      if (!phoneTest.test(this.phoneNumber)) {
        this.showToast('很抱歉，您输入的手机号不正确请检查');
        return;
      }
      getPhoneCode(this.phoneNumber).then((res) => {
        // 短信发送
        if (res.data.code === 0) {
          // 短信发送成功
          this.sendPhoneCode = true;
          this.countDownInterval = setInterval(() => {
            this.conutDown = this.conutDown - 1;
            if (this.conutDown === 0) {
              setTimeout(() => {
                this.sendPhoneCode = false;
                this.conutDown = 60;
                this.sendName = '重新发送';
                clearInterval(this.countDownInterval); // 执行完清除定时器
              }, 1000);
            }
          }, 1000);
          this.showToast('验证码已发送,请注意查收');
        }
      });
    },
    goSignShop() {
      // 前去 选房签约 即 回到首页
      window.location = 'guanyu://page.gy/recommend';
    },
    inputFunc(e) {
      // 手机号切割
      this.phoneNumber = e.target.value.replace(/[^\d]/g, '').slice(0, 11);
    },
    getUrlParam(name) {
      // 获取地址栏参数
      const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
      const r = decodeURI(window.location.search).substr(1).match(reg);
      if (r != null) {
        return decodeURI(unescape(r[2]));
      }
      return null;
    },
    clearPhoneNumber() {
      // 清除电话号
      this.phoneNumber = '';
    },
    inputGetCode(e) {
      // 验证码切割
      this.phoneCode = e.target.value.replace(/[^\d]/g, '').slice(0, 6);
    },
    GotoDownApp() {
      // 进入app 下载页面
      window.location.href = 'https://android.myapp.com/myapp/detail.htm?apkName=com.guanyu.gy';
    },
    closeResult() {
      // 领取结果。点击黑色背景状态置为初始化状态
      this.getResult = false;
      this.showRusultGet = false;
      // 清除定时器
      this.sendPhoneCode = false;
      this.conutDown = 60;
      clearInterval(this.countDownInterval);
    },
    showToast(name) {
      this.ShowToast = true;
      this.toastContent = name;
      setTimeout(() => {
        this.ShowToast = false;
      }, 1400);
    },
    Donothing() {},
    releaseChoice() {
      // 释放选择城市和门店
      this.AreaDerail = false;
      this.ShopDerail = false;
      this.prevenTouch = false;
    },
  },
};
</script>
<style lang="less">
.home{
  .ShowToast{
    padding: 10px 25px;
    color: #FFFFFF;
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    font-size: 28px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 16px;
    max-width: 500px;
    text-align: center;
  }
  .Banner{
    width: 100%;
    height: 536px;
    background-image: url('../assets/placeholder.png');
    background-position: 0px 0px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    img{
      width: 100%;
      height: 100%;
    }
  }
  input::-webkit-input-placeholder {
    color: #D89862;
    font-size: 30px;
  }
  .StoreOthersApp{
    min-height: 600px;
    padding-top: 380px;
    padding-bottom: 110px;
    background: #CF452F;
    margin-top: -3px;
    position: relative;
  }
  .StoreOthersWeb{
    min-height: 600px;
    padding-top: 540px;
    padding-bottom: 110px;
    background: #CF452F;
    margin-top: -14px;
    position: relative;
  }
  .ChoiceShop{
      width: 602px;
      padding: 51px 44px 0px 44px;
      border-radius: 24px;
      position: absolute;
      top: -110px;
      background: #FFD66D;
      left: 50%;
      margin-left: -345px;
      background-image: url('https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/constract/Ve209ES3G4Q.png?x-oss-process=image/resize,s_600/interlace,1/format,jpg');
      background-repeat: no-repeat;
      background-position: 0px 0px;
      background-size: 100% 100%;
      padding-bottom: 10px;
      .ChoiceCommon{
        border-bottom: 0.5PX dashed #AC483D;
        width: 600px;
        height: 88px;
        line-height: 88px;
        position: relative;
        font-size: 30px;
        font-family: 'PingFang-SC-Medium,PingFang-SC';
        font-weight: 500;
        color: #AC483D;
        position: relative;
        .getPhoneCode{
          height: 30px;
          line-height: 34px;
          padding: 10px 15px;
          border-radius: 26px;
          color: #FFFFFF;
          font-family: 'PingFang-SC-Medium,PingFang-SC';
          font-size: 26px;
          font-weight: 500;
          position: absolute;
          right: 0px;
          top: 50%;
          margin-top: -25px;
          background: #F6574F;
        }
        .Selected{
          position: absolute;
          width: 26px;
          height: 24px;
          right: 0px;
          top: 37px;
        }
        .Closed{
          width: 30px;
          height: 30px;
        }
        .InputCommon{
          width: 90%;
          font-size: 30px;
          color: #AC483D;
          border: 0;
          outline: none;
          background-color: rgba(0, 0, 0, 0);
        }
      }
      .ChoiceTop{
        width: 584px;
        padding-left: 16px;
      }
      .UserChoiced{
        top: 112px;
        width: 650px;
        background: #FFFFFF;
      }
      .areaChoiced{
        top: 200px;
      }
      .DerailCommon{
        position: absolute;
        right: 22px;
        max-height: 454px;
        overflow: auto;
        background: #FFFFFF;
        -webkit-overflow-scrolling: touch;
        z-index: 33;
        padding-left: 0px;
        .EachLi{
          height: 92px;
          line-height: 92px;
          background: #FFFFFF;
          color: #AC483D;
          font-size: 30px;
          width: 606px;
          list-style: none;
          text-align: left;
          padding-left: 24px;
          border-bottom: 0.5PX dashed #AC483D;
        }
        .EachLi:last-child {
          border-bottom: 0px;
        }
      }
      .RightGet{
        width: 395px;
        height: 98px;
        margin: 41px auto;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .GameRules{
      width: 650px;
      padding: 20px;
      background: #FFD66D;
      border-radius: 24px;
      margin: 0 auto;
      position: relative;
      .RulesTop{
        display: block;
        width: 402px;
        height: 89px;
        position: absolute;
        left: 50%;
        margin-left: -201px;
        top: -30px;
      }
      .RulesBox{
        width: 590px;
        border-radius: 16PX;
        color: #AC483D;
        font-weight: 500;
        font-family: 'PingFangSC-Medium,PingFang SC';
        font-size: 13PX;
        letter-spacing: 1px;
        padding: 70px 30px 50px 30px;
        line-height: 41px;
        background:linear-gradient(270deg,#FFE58C 0%,#FFF0A2 100%);
        box-shadow: 4px 4px 14px #EECC7F;
        .AddWeight{
          font-weight: 800;
        }
      }
    }
  .ShowResult{
    width: 632px;
    height: 739px;
    position: fixed;
    left: 50%;
    top: 45%;
    z-index: 35;
    transform: translate(-50%, -50%);
    background-image: url('../assets/congratulation.png');
    background-repeat: no-repeat;
    background-position: 0px 0px;
    background-size: 100% 100%;
    .ResultSuccess{
      width: 259px;
      height: 190px;
      position: absolute;
      left: 48%;
      top: 128px;
      transform: translate(-50%, 0);
    }
    .resolt-success-text{
      font-size: 43px;
      font-weight: bold;
      color: #D7533A;
      text-align: center;
      font-family: 'PingFang-SC-Medium,PingFang-SC';
      margin-bottom: 25px;
      position: absolute;
      left: 50%;
      top: 345px;
      transform: translate(-50%, 0px);
    }
    .success-content{
      width: 490.4px;
      height: 120px;
      line-height: 41px;
      font-size: 28.8px;
      color: #D44833;
      position: absolute;
      left: 50%;
      top: 425px;
      text-align: justify;
      transform: translate(-50%, 0px);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    .down-app{
      width: 356px;
      height: 87px;
      position: absolute;
      left: 50%;
      bottom: 74px;
      transform: translate(-50%, 0);
    }
    .close-down-app{
      width: 64px;
      height: 64px;
      position: absolute;
      left: 50%;
      bottom: -75px;
      transform: translate(-50%, 0px);
    }
  }
  .BoxCommon{
    position: fixed;
    z-index: 32;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
  }
  .BoxShadow{
    background: rgba(0, 0, 0, 0);
  }
  .ResultBox{
    background: rgba(0, 0, 0, 0.7);
  }
}
</style>
