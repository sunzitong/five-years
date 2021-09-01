<template>
  <div class="home">
    <div class="Banner">
      <img class="BannerBackImg"
        src="https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/constract/ThdcATEl198.png?x-oss-process=image/resize,s_400/interlace,1/format,jpg" alt="">
      <div class="ShopName">{{activeTitle}}</div>
      <div class="ShopTitle">{{activityName}}现金券</div>
      <div class="ShopMoneyBox">
        <span class="shopPrice">￥{{couponMoney}}</span>元
      </div>
    </div>
    <div class="input-box-cont">
      <div class="input-box">
        <div class="phone-input">
          <input type="tel" v-on:input='inputFunc' placeholder="请输入领取手机号" maxlength="11" v-model="params.phone">
          <i
            v-if="params.phone.length > 0"
            class="close"
            @click='deleteInputInfo'>清空手机号</i>
        </div>
        <div class="code-input">
          <input type="tel" v-on:input='slicePhoneCode' placeholder="请输入验证码"
          v-model="params.verificationCode">
          <em
            class="get-code-btn"
            :class="disabled ? 'disabled' : null"
            @click="getCode">
            {{codeText}}
          </em>
        </div>
      </div>
      <div
        class="submit-btn"
        @click="submitBtn">
        立即领取
      </div>
    </div>
    <div class="rules-text">
      <h4>活动规则：</h4>
      <p class="valid-time">
        活动有效期：{{data.startTime}} 至 {{data.endTime}}
      </p>
      <p class="valid-time" v-if="couponExpireTime > 0">
        券的使用时间：【领取{{couponExpireTime}}天内有效】
      </p>
      <p class="valid-time" v-else>
        券的使用时间：{{data.startTime}} 至 {{data.endTime}}
      </p>
      <div class="text" v-for="(item, index) in gameRules" v-bind:key="index">
        {{item}}
      </div>
    </div>
    <div class="preView" v-if="preview" @touchmove.stop.prevent='Donothing'></div>
    <SuccessPopup v-if="successPopupIsShow" @successPopupClose="successPopupClose"
    :status="popMsg.status" :shopName="popMsg.shopName" :drawPrice="popMsg.drawPrice"  />
    <showResponse  v-if="ShowStatus" :status="responseDate" :startTime="startTime" @ShowStatusSend="ShowStatusSend" />
    <div class="showTitle" v-if="JudgeToast">{{showTitleContent}}</div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
import SuccessPopup from '@/components/SuccessPopup';
import showResponse from '@/components/showResponse';
import { getActiveDetail, drawCounpon, sendPhoneCode } from '@/utils/server.js';

export default {
  name: 'home',
  components: {
    SuccessPopup,
    showResponse,
  },
  data() {
    return {
      data: {},
      params: {
        activityNumber: '', // 活动编号掉接口使用
        phone: '', // 手机号2222
        verificationCode: '', // 验证码
      },
      couponExpireTime: Number, // 券有效时间
      JudgeToast: false, // 开关
      showTitleContent: '', // 提示信息
      startTime: '', // 开始时间
      IfsenCode: false, // 是否发送验证码
      successPopupIsShow: false,
      ShowStatus: false,
      popMsg: {
        status: '', // 成功、失败
        shopName: '', // 门店名称
        drawPrice: '', // 领取奖金
      },
      preview: false, // 预览模式
      responseDate: '',
      activityName: '', // 活动名称+
      timeAll: 60,
      expireAt: '',
      gameRules: [],
      timeInterval: '',
      disabled: false,
      activeTitle: '', // 活动标题
      couponMoney: '', // 活动金额
      codeText: '发送验证码',
    };
  },
  created() {
    this.getData();
  },
  methods: {

    // 获取验证码倒计时
    codeButton() {
      this.timeInterval = setInterval(() => {
        this.timeAll = this.timeAll - 1;
        this.codeText = `${this.timeAll}秒后重新获取`;
      }, 1000);
      this.IfsenCode = true;
      setTimeout(() => {
        this.clearIntervalComon();
        this.IfsenCode = false;
      }, 61000);
    },

    inputFunc(e) {
      // 手机号 只允许舒服正整数
      this.params.phone = e.target.value.replace(/[^\d]/g, '').slice(0, 11);
    },
    slicePhoneCode(e) {
      // 验证码 只允许舒服正整数
      this.params.verificationCode = e.target.value.replace(/[^\d]/g, '').slice(0, 6);
    },
    Donothing() {},
    // 获取活动详情
    getData() {
      this.params.activityNumber = this.getUrlParam('number');
      getActiveDetail(this.params.activityNumber).then((res) => {
        console.log('活动信息', res);
        const response = res.data.data;
        this.activeTitle = response.projectName;
        this.popMsg.shopName = response.projectName;
        this.couponMoney = response.couponMoney;
        this.couponExpireTime = response.couponExpireTime;
        this.activityName = response.activityName;
        this.popMsg.drawPrice = response.couponMoney;
        if (response.activityStatus === 'NOT_START' || response.activityStatus === 'EXPIRED' || response.activityStatus === 'CLOSED') {
          this.ShowStatus = true; // 显示提示框
          this.responseDate = response.activityStatus;
          this.startTime = response.startTime;
        }
        this.data = response;
        console.log(response.description.split('\n'));
        this.gameRules = response.description.split('\n');
      });
      console.log(this.getUrlParam('preview'));
      if (this.getUrlParam('preview')) {
        // 预览模式
        this.preview = true;
      }
    },

    // 清空手机号
    deleteInputInfo() {
      this.params.phone = '';
    },

    // 手机号校验
    phoneCheck(phone) {
      const pattern = /^1[23456789]\d{9}$/;
      if (!pattern.test(phone)) {
        this.showToset('很抱歉，您输入的手机号格式不正确');
        return false;
      }
      return true;
    },

    // 获取验证码
    getCode() {
      if (!this.phoneCheck(this.params.phone)) return;
      if (this.disabled) return;
      sendPhoneCode(this.params.phone).then((res) => {
        console.log('发送验证码成功', res);
        if (res.data.code === 0) {
          this.codeButton();
          this.disabled = true;
          return;
        }
        this.showToset('发送失败');
        this.disabled = false;
      })
        .catch(() => {
          this.showToset('发送短信异常, 请稍后重试');
        });
    },
    clearIntervalComon() {
      // 清除定时器
      this.disabled = false;
      this.codeText = '获取验证码';
      this.timeAll = 60;
      clearInterval(this.timeInterval);
    },
    getUrlParam(name) {
      const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
      const r = decodeURI(window.location.search).substr(1).match(reg);
      if (r != null) {
        return decodeURI(unescape(r[2]));
      }
      return null;
    },
    // 领取优惠券提交
    submitBtn() {
      if (!this.phoneCheck(this.params.phone)) {
        this.showToset('很抱歉，您输入的手机号格式不正确');
        return;
      }
      if (!this.IfsenCode) {
        this.showToset('很抱歉，请先发送验证码');
        return;
      }
      if (this.params.verificationCode.length < 6) {
        this.showToset('很抱歉，您输入的验证码格式不正确');
        return;
      }
      getActiveDetail(this.params.activityNumber).then((resD) => {
        const response = resD.data.data;
        if (response.activityStatus === 'NOT_START' || response.activityStatus === 'EXPIRED' || response.activityStatus === 'CLOSED') {
          this.ShowStatus = true; // 显示提示框
          this.responseDate = response.activityStatus;
          this.startTime = response.startTime;
          return;
        }
        const sendDate = {
          activityNumber: this.params.activityNumber, // 活动编号
          phone: this.params.phone, // 手机号
          verificationCode: this.params.verificationCode, // 验证码
        };
        console.log(sendDate);
        drawCounpon(sendDate).then((res) => {
          if (res.data.code === 0) {
            this.successPopupIsShow = true;
            this.popMsg.status = '恭喜您已成功领取';
            this.clearIntervalComon();
          } else {
            this.showToset(res.data.msg);
          }
        });
      });
    },

    showToset(content) {
      // 提示
      this.JudgeToast = true;
      this.showTitleContent = content;
      setTimeout(() => {
        this.JudgeToast = false;
      }, 1400);
    },

    // 关闭领取弹窗
    successPopupClose() {
      this.successPopupIsShow = false;
    },
    ShowStatusSend() {
      this.ShowStatus = false;
    },
  },
};
</script>

<style lang="scss">
@import '../style/reset.css';
.home {
  max-width: 414PX;
  margin: 0 auto;
  font-family: 'PingFangSC-Semibold, sans-serif';
  .head-banner {
    margin-top: 10px;
    background: url(../assets/banner-bg.png) 0 0 no-repeat;
    background-size: 670px 254px;
    .head-banner-cont {
      padding: 20px 45px;
      font-family: 'PingFangSC-Regular,PingFang SC';
      h2 {
        font-size: 21px;
        color: #703C0F;
        line-height: 30px;
        font-family: 'PingFangSC-Regular,PingFang SC';
      }
      h3 {
        font-size: 15px;
        color: #703C0F;
        line-height: 21px;
      }
      .price-coupon {
        font-size: 25px;
        color:#703C0F;
        text-align: right;
        // padding-right: 3px;
        font-weight: bold;
        em {
          font-weight: normal;
          font-style: normal;
          font-size: 15px;
          color: #703C0F;
        }
      }
    }
  }
  .Banner{
    height: 157px;
    padding-top: 10px;
    position: relative;
    .BannerBackImg{
      width: 100%;
      height: 100%;
    }
    .ShopName{
      height: 29.5px;
      line-height: 29.5px;
      color: #703C0F;
      font-weight: 600;
      font-size: 21px;
      position: absolute;
      left: 45px;
      top: 30px;
      font-family: 'PingFangSC-Semibold,PingFang SC';
      width: 80%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .ShopTitle{
      height: 21px;
      line-height: 21px;
      color: #703C0F;
      font-size: 15px;
      position: absolute;
      left: 45px;
      top: 65px;
      font-family: 'PingFangSC-Semibold,PingFang SC';
    }
    .ShopMoneyBox{
      color: #703C0F;
      font-family: 'PingFangSC-Semibold,PingFang SC';
      position: absolute;
      right: 50px;
      font-size: 15px;
      font-weight: 600;
      bottom: 36.5px;
      .shopPrice{
        font-size: 25px;
        height: 35px;
        line-height: 35px;
        margin-right: 3px;
      }
    }
  }
  .input-box-cont {
    padding: 25px 25px 0 25px;
    .input-box {
      .phone-input, .code-input {
        border-bottom: 1px solid #DDDDDD;
        width: 100%;
        position: relative;

        input {
          // border: 1px solid #000;
          border: none;
          width: 100%;
          padding: 13px 0;
          font-size: 16px;
          font-family: 'PingFangSC-Regular,PingFang SC';
          &:focus {
            outline: none;
          }
        }
        .close {
          position: absolute;
          right: 0;
          top: 50%;
          background: url(../assets/close.png) center center no-repeat;
          width: 32px;
          height: 32px;
          background-size: 16px 16px;
          transform: translate(0, -50%);
          font-style: normal;
          text-indent: -9999px;
        }
        .cleaerCode{
          right: 80px;
        }
        .get-code-btn, .disabled {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translate(0, -50%);
          font-size: 16px;
          color: #FF8409;
          font-family: 'PingFangSC-Regular,PingFang SC';
        }
        .disabled {
          color: #999999;
        }
      }
    }
    .submit-btn {
      margin-top: 22px;
      font-size: 17px;
      font-family: 'PingFangSC-Regular,PingFang SC';
      line-height: 50px;
      background:linear-gradient(270deg,rgba(254,186,16,1) 0%,rgba(255,215,0,1) 100%);
      color: #fff;
      text-align: center;
      border-radius: 5px;
    }
  }
  .rules-text {
    margin: 25px 25px 0 25px;
    background: #FFFBE9;
    padding: 25px 25px 20px 25px;
    box-sizing: border-box;
    h4 {
      font-size: 18px;
      font-family: 'PingFangSC-Regular,PingFang SC';
      line-height: 25px;
      font-weight: bold;
      color: #674930;
    }
    .valid-time {
      font-size: 14px;
      font-family: 'PingFangSC-Regular,PingFang SC';
      font-weight:400;
      color: #674930;
      line-height: 19px;
      padding-top: 15px;
    }
    .text {
      padding-top: 8px;
      font-size: 14px;
      color: #674930;
      font-family: 'PingFangSC-Regular,PingFang SC';
      font-weight: 400;
      line-height: 24px;
      white-space:normal;
      word-break:break-all;
    }
  }
  .showTitle{
    position: absolute;
    left: 50%;
    top: 30%;
    background: #cccccc;
    transform: translate(-50%, 0);
    z-index: 40;
    text-align: center;
    padding: 15px 20px;
    background: rgba(0,0,0,0.7);
    color: #ffffff;
    font-size: 15px;
    border-radius: 10px;
    white-space: nowrap;
  }
  .preView{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 444;
    left: 0px;
    top: 0px;
  }
}
</style>
