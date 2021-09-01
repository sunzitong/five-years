<template>
  <div
    class="home"
    :style="{background: initData.background}">
    <div class="heaer-banner">
      <img :src="initData.coverImgUrl" alt="">
      <!-- <img src="https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/2QQ8gTRraME.png" alt=""> -->

    </div>
    <div class="main-cont">
      <div
        class="input-box-wrap"
        :style="backgroundStyle">
        <div class="input-cont">
          <div class="input-box">
            <div class="input">
              <i class="icon01"></i>
              <input
                type="text"
                class="phone-box"
                placeholder="请输入您的手机号sztszt"
                v-model="params.phone"
                @blur="loseFocus()">
            </div>
          </div>
          <div class="input-box">
            <div class="input">
              <i class="icon02"></i>
              <input
                type="text"
                class="phone-box"
                placeholder="请输入验证码"
                @blur="loseFocus()"
                v-model="params.code">
            </div>
            <span
              class="verification-code"
              @click="UserSendcode">{{codeText}}</span>
          </div>
          <div
            class="submit-btn"
            @click="receiveCoupon()">
            <img :src="initData.buttonImageUrl" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="store-introduce">
      <div class="title-box">
        <i class="title-icon"></i>
        <span
          :style="{color: initData.titleColor}">品质租房 就是冠寓</span>
        <i class="title-icon"></i>
      </div>
      <p
        :style="{color: initData.textColor}">
        <i class="icon01"></i>
          <em>龙湖冠寓</em>  是国内TOP 10房企龙湖集团，推出的品质租房品牌。截至目前，已在全国30余个城市，点亮近8万余盏温暖的灯。品牌围绕“匠心品质、科技智能、安全安心”等关键词，全新定义租住生活。在冠寓，和有趣的年轻人住在一起！
      </p>
      <div class="img-box">
        <div class="img">
          <img src="../assets/1.png" alt="" class="w-auto">
        </div>
        <div class="img">
          <img src="../assets/2.png" alt="">
        </div>
        <div class="img">
          <img src="../assets/3.png" alt="">
        </div>
        <div class="img">
          <img src="../assets/1.png" alt="" class="w-auto">
        </div>
        <div class="img">
          <img src="../assets/2.png" alt="">
        </div>
        <div class="img">
          <img src="../assets/3.png" alt="">
        </div>
      </div>
    </div>
    <div class="activity-rules">
      <div class="title-box">
        <i class="title-icon"></i>
        <span
          :style="{color: initData.titleColor}">活动规则</span>
        <i class="title-icon"></i>
      </div>
      <pre
        :style="{color: initData.textColor}">
        {{initData.description}}
      </pre>
    </div>
    <div
      v-if="showToast.show"
      class="show-toast">
      <p>{{ showToast.msg }}</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import { wxShare } from '@guanyu/h5-tools';
import toastMessage from '@/components/Toast';

export default {
  name: 'home',
  components: {
    // HelloWorld,
  },
  data() {
    return {
      activityNumber: '',
      initData: {},
      codeText: '获取验证码',
      backgroundStyle: {
        background: '',
        backgroundSize: '375px',
      },
      backgroundImgUrl: '',
      sendAuthCode: true,
      submitDisable: true,
      params: {
        phone: '',
        code: '',
      },
      showToast: {
        show: false,
        msg: '',
      },
    };
  },
  mounted() {
    this.activityNumber = this.$route.query.activityNumber;
    this.getInitData(this.activityNumber);
  },
  methods: {
    // 分享
    wxShareFun(initData) {
      wxShare({
        debug: false, // 默认为false，不开启调试模式
        api: '/gymwebsite/getJsapiSigna', // 获取微信鉴权的接口地址, 不填写默认为 /gymwebsite/getJsapiSigna
        title: initData.shareTitle, // 分享标题,
        link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致,
        img: initData.shareImgUrl, // 分享图标,
        desc: initData.shareContent, // 分享描述,
        type: '', // 分享类型,music、video或link，不填默认为link,
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空,
      });
    },

    // 获取页面初始数据
    getInitData(activityNumber) {
      this.$axios.get(`/coupon_api/api/activity/${activityNumber}`).then((res) => {
        if (res.data.code === 0) {
          this.initData = res.data.data;
          this.backgroundStyle.background = `url(${res.data.data.logoImageUrl}) center center no-repeat`;
          document.title = res.data.data.activityName;
          this.wxShareFun(res.data.data);
        }
      });
    },
    // 输入框失去焦点时将页面位置还原
    loseFocus() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    // 手机号校验
    checkPhone(phone) {
      if (!phone) {
        toastMessage({
          message: '请输入您的手机号',
          duration: 1800,
        });
        return false;
      }
      const pattern = /^\d+$/g;
      if (!phone.match(pattern) || phone.length !== 11) {
        toastMessage({
          message: '请输入正确的手机号',
          duration: 1800,
        });
        return false;
      }
      return true;
    },
    // 倒计时
    // 发送验证码
    UserSendcode() {
      if (!this.sendAuthCode) return;
      if (!this.checkPhone(this.params.phone)) return;
      this.sendAuthCode = false;
      this.auth_time = 59;
      // 倒计时
      const auth_timetimer = setInterval(() => {
        this.codeText = `${this.auth_time--}秒后重新获取`;
        if (this.auth_time <= 0) {
          this.codeText = '获取验证码';
          this.sendAuthCode = true;
          clearInterval(auth_timetimer);
        }
      }, 1000);
      // 调用获取验证码接口
      this.getCode(this.params.phone);
    },
    checkInfo() {
      if (!this.checkPhone(this.params.phone)) return false;
      if (!this.params.code) {
        toastMessage({
          message: '请输入验证码',
          duration: 1800,
        });
        return false;
      }
      return true;
    },
    // 获取验证码
    getCode(phone) {
      if (!this.checkPhone(phone)) return false;
      this.$axios.get(`/coupon_api/api/verification_code?phone=${phone}`).then((res) => {
        if (res.data.code === 0) {
          toastMessage({
            message: '验证码已发送',
            duration: 1800,
          });
        } else {
          toastMessage({
            message: res.data.code.msg,
            duration: 1800,
          });
        }
      }).catch(() => {
        toastMessage({
          message: '网络故障请稍后再试',
          duration: 1800,
        });
      });
    },

    // 领取优惠券
    receiveCoupon() {
      // 校验信息填写
      if (!this.checkInfo()) return;
      // 防止重复提交
      if (!this.submitDisable) return;
      this.submitDisable = false;
      const params = {
        activityNumber: this.activityNumber,
        channel: 'wap',
        couponNumber: this.initData.coupons[0].couponNumber,
        couponType: this.initData.coupons[0].couponType,
        phone: this.params.phone,
        verificationCode: this.params.code,
      };
      this.$axios.post('/coupon_api/api/coupon/receive', params).then((res) => {
        this.submitDisable = true;
        if (res.data.code === 0) {
          toastMessage({
            message: '恭喜您，已经成功领取冠寓租房折扣券',
            duration: 1800,
          });
          this.params = {
            phone: '',
            code: '',
          };
        } else if (res.data.code === 3002) {
          toastMessage({
            message: '很抱歉，每人仅可领取一张冠寓租房折扣券',
            duration: 1800,
          });
        } else {
          toastMessage({
            message: res.data.msg,
            duration: 1800,
          });
        }
      }).catch(() => {
        this.submitDisable = true;
        toastMessage({
          message: '网络故障请稍后再试',
          duration: 1800,
        });
      });
    },
  },
};
</script>


<style lang="less">
  @import '../style/reset.css';
  .home {
    overflow: hidden;
    padding-top: 3.7rem;
  }
  .heaer-banner {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    img {
      width: 100%;
    }
  }
  .main-cont, .store-introduce, .activity-rules {
    position: relative;
    z-index: 20;
  }
  .store-introduce {
    p {
      font-size: 0.26rem;
      color: #FFFFFF;
      line-height: 0.4rem;
      padding-top: 0.36rem;
      em {
        font-size: 0.34rem;
      }
      i {
        width: 0.36rem;
        height: 0.28rem;
        background: url(../assets/text_icon.png) 0 0 no-repeat;
        background-size: 0.36rem 0.28rem;
        display: inline-block;
        margin-right: 0.24rem;
      }
    }
  }
  .activity-rules {
    padding: 0.5rem 0.4rem 1.5rem 0.4rem;
    pre {
      font-size: 0.26rem;
      line-height: 0.42rem;
      padding-top: 0.4rem;
      white-space: pre-line;
    }
  }
  .img-box {
    display: flex;
    flex-wrap: wrap;
    margin-left: -0.2rem;
    padding-top: 0.26rem;
    .img {
      width: 50%;
      box-sizing: border-box;
      padding: 0.2rem 0 0 0.2rem;
      img {
        width: 100%;
        display: block;
      }
      &:nth-child(1), &:nth-child(4) {
        width: 100%;
      }
    }
  }
  .input-cont {
    padding: 0.5rem 1.2rem 0 1.2rem;
  }
  .input-box-wrap {
    margin: 0 auto;
    width: 7.5rem;
    height: 8rem;
    background-size: 7.5rem 8rem!important;
    .input-box {
      overflow: hidden;
      .input {
        border-bottom: 1px solid #cccccc;
        float: left;
        width: 100%;
        display: flex;
      }
      i {
        min-width: 0.36rem;
        height: 0.36rem;
        margin: 0.46rem 0.14rem 0 0;
        float: left;
      }
      .icon01 {
        background: url(../assets/code_icon.png) 0 0 no-repeat;
        background-size: 0.36rem 0.36rem;
      }
      .icon02 {
        background: url(../assets/phone_icon.png) 0 0 no-repeat;
        background-size: 0.36rem 0.36rem;
      }
      input {
        padding: 0.4rem 0 0.16rem  0;
        color: #333333;
        background: transparent;
        border: 0;
        font-size: 0.32rem;
        outline: none;
        &:focus{
          outline: none;
        }
        &::-webkit-input-placeholder{
          color: #cccccc;
        }
        &:disabled{
          background: none;
          color: #666666;
          -webkit-text-fill-color: #666666;
          opacity: 1;
          -webkit-opacity:1;
        }
        &:disabled::-webkit-input-placeholder{
          color: #cccccc;
          -webkit-text-fill-color: #cccccc;;
          opacity: 1;
          -webkit-opacity:1;
        }
      }
      .verification-code {
        width: 2.1rem;
        height: 0.6rem;
        background: #FFA400;
        font-size: 0.26rem;
        color: #FFFFFF;
        line-height: 0.6rem;
        text-align: center;
        margin-top: 0.4rem;
        border-radius: 0.06rem;
        white-space: nowrap;
        float: right;
      }
      &:nth-child(2){
        .input {
          margin-right: 0.1px;
          width: 2.8rem;
        }
      }
    }
    .submit-btn {
      width: 5rem;
      height: 1rem;
      margin-top: 0.7rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .store-introduce {
    padding: 0 0.4rem;
    p {

    }
  }
  .title-box {
    font-size: 0.36rem;
    line-height: 0.5rem;
    text-align: center;
    i {
      width: 0.46rem;
      height: 0.34rem;
      background: url(../assets/title_icon.png) 0 0 no-repeat;
      background-size: 0.46rem 0.34rem;
      vertical-align: middle;
      display: inline-block;
    }
    span {
      margin: 0 0.24rem;
      color: #FFFFFF;
    }
  }
  .show-toast {
    position: fixed;
    left: 50%;
    top: 38%;
    transform: translate(-50%, 0);
    z-index: 300;
    text-align: center;
    p {
      background: rgba(0,0,0,0.7);
      border-radius: 8px;
      font-size: 16px;
      color: #ffffff;
      line-height: 26px;
      padding: 10px 20px;
    }
  }
</style>
