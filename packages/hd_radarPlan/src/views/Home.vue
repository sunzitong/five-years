<template>
  <div id="app">
    <div class="swiper-container swiper1">
      <div class="swiper-wrapper">
        <div class="swiper-slide slideFirst" style="background: #073375">
          <img class="GoyooLogo" src="../assets/Goyoo-banner.png" alt="" />
          <img class="GoyooRandar" src="../assets/Goyoo-randar.png" alt="" />
          <div class="GoyooTitle">
            <img class="TitleLeftLine TitleCommon" src="../assets/title-left.png" alt="" />
            <div class="Title">我们是龙湖冠寓</div>
            <img class="TitlerightLine TitleCommon" src="../assets/title-right.png" alt="" />
          </div>
          <div class="RandarExplain">
            龙湖冠寓是龙湖集团集中式长租公寓品牌，在空间即服务的战略下，
            龙湖冠寓将“住、商、办公、社交、服务”生态化联动一体。截至2019年底，已布局全国30余个一、二线城市，开业逾8万间。
          </div>
          <div class="Goyoo-suport">
            <img class="each-suport-manage" src="../assets/suport.png" alt="" />
            <img class="each-suport-manage" src="../assets/suport.png" alt="" />
            <img class="each-suport-manage" src="../assets/suport.png" alt="" />
            <img class="each-suport-manage" src="../assets/suport.png" alt="" />
          </div>
          <img
            class="TurnDown TurnCommon"
            @click="TurnDownSlider"
            src="../assets/next-page.png"
            alt=""
          />
        </div>
        <div class="swiper-slide" style="background: #073375">
          <div class="GoyooTitle">
            <img class="TitleLeftLine TitleCommon" src="../assets/title-left.png" alt="" />
            <div class="Title">重金寻找闲置楼宇</div>
            <img class="TitlerightLine TitleCommon" src="../assets/title-right.png" alt="" />
          </div>
          <img class="find-house-top" src="../assets/find-house-top.png" alt="" />
          <div class="reward-money-station">｜奖励金额视项目情况而定｜</div>
          <div class="content-introduce">
            <div class="each-content">
              <img class="content-share" src="../assets/content-img.png" alt="" />
              <img class="content-center" src="../assets/content-center.png" alt="" />
              <span class="content-range"> 商业、酒店、村集体土地<br />工业、产业园等 </span>
            </div>
            <div class="each-content">
              <img class="content-share" src="../assets/content-area.png" alt="" />
              <img class="content-center" src="../assets/rent-area.png" alt="" />
              <span class="content-range"> 3000平米以上，独栋为佳<br />位置极佳可放宽 </span>
            </div>
            <div class="each-content">
              <img class="content-share" src="../assets/area-position.png" alt="" />
              <img class="content-center" src="../assets/show-position.png" alt="" />
              <span class="content-range"> 公共交通便利<br />生活设施完善 </span>
            </div>
            <div class="each-content">
              <img class="content-share" src="../assets/cooperation-way.png" alt="" />
              <img class="content-center" src="../assets/get-war-comparation.png" alt="" />
              <span class="content-range"> 可租可购，租期在10年以上<br />出售视具体情况而定 </span>
            </div>
          </div>
          <img
            class="TurnDown TurnCommon"
            @click="TurnDownSlider"
            src="../assets/next-page.png"
            alt=""
          />
        </div>
        <div class="swiper-slide" style="background: #073375">
          <div class="GoyooTitle">
            <img class="TitleLeftLine TitleCommon" src="../assets/title-left.png" alt="" />
            <div class="Title">快来提供线索吧</div>
            <img class="TitlerightLine TitleCommon" src="../assets/title-right.png" alt="" />
          </div>
          <div class="fill-form">
            <div class="each-form-content" @click="getCurentCitys">
              <span class="form-left">所在城市</span>
              <input
                v-if="curentCityName.length === 0"
                class="form-input"
                type="text"
                placeholder="请选择物业所在城市"
                disabled="disabled"
              />
              <img
                v-if="curentCityName.length === 0"
                class="choice-more"
                src="../assets/choice-other.png"
                alt=""
              />
              <input
                class="form-input no-more-choice"
                v-else
                v-model="curentCityName"
                type="text"
              />
            </div>
            <div class="each-form-content">
              <span class="form-left">楼宇位置</span>
              <input
                class="form-input no-more-choice"
                type="text"
                placeholder="请输入楼宇的具体地址"
              />
            </div>
            <div class="each-form-content">
              <span class="form-left">楼宇面积（m²）</span>
              <input
                class="form-input no-more-choice"
                type="tel"
                placeholder="请输入楼宇的具体面积"
              />
            </div>
            <div class="each-form-content">
              <span class="form-left">联系人</span>
              <input
                class="form-input no-more-choice"
                type="text"
                placeholder="请留下楼宇联系人的姓名"
              />
            </div>
            <div class="each-form-content">
              <span class="form-left">联系电话</span>
              <input
                class="form-input no-more-choice"
                maxlength="11"
                type="tel"
                placeholder="请留下楼宇联系人的电话"
              />
            </div>
            <div class="each-form-content" @click="getProfession">
              <span class="form-left">联系人身份</span>
              <input
                v-if="professionName.length === 0"
                class="form-input"
                type="text"
                placeholder="请选择联系人身份"
                disabled="disabled"
              />
              <img
                v-if="professionName.length === 0"
                class="choice-more"
                src="../assets/choice-other.png"
                alt=""
              />
              <input
                class="form-input no-more-choice"
                v-else
                v-model="professionName"
                type="text"
              />
            </div>
            <div class="explain-show-consumer">
              我们会在收到线索后24小时内联系您 请保持联系畅通！
            </div>
            <button class="send-clue">发送线索</button>
            <div class="query-clue" @click="checkPrivideClue">
              查询已提供线索
              <img src="../assets/query-clue.png" alt="" />
            </div>
            <div class="scanning-code">
              <img class="code-img" src="../assets/explame.jpg" alt="" />
              <div class="store-phone-code">
                <div class="each-contact">有这样的物业，就快扫码推荐吧</div>
                <div class="each-contact">
                  客服电话<img src="../assets/phone-code.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="swiper-container swiper2" :style="{ bottom: transBtn + 'px' }">
      <div class="swiper-wrapper">
        <div
          v-for="item in citysAry"
          :key="item"
          @click="getCurentCityName(item)"
          class="swiper-slide"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="swiper-container swiper3" :style="{ bottom: profetionBtn + 'px' }">
      <div class="swiper-wrapper">
        <div
          v-for="item in professionType"
          :key="item"
          @click="getProfesionName(item)"
          class="swiper-slide"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="send-phone-code" v-if="handleClueUser">
      <div class="phone-content">
        <span class="content-top">成为线索人</span>
        <div class="send-phoneCode">
          <input
            type="tel"
            class="commonInput"
            v-model="userPhone"
            maxlength="11"
            placeholder="请输入您的手机号码"
          />
        </div>
        <div class="get-phone-code">
          <input
            type="tel"
            class="fill-phone-code"
            v-model="sendCode"
            maxlength="6"
            placeholder="请输入验证码"
          />
          <span class="user-send-code" @click="(e) => testPhoneCode(e)">{{ phoneText }}</span>
        </div>
        <button class="user-register" @click="rightRigster">注册</button>
        <img src="../assets/close-shadow.png" alt="" @click="closeBoxshadow" class="close-shadow" />
      </div>
    </div>
  </div>
</template>
<script>
import VDistpicker from 'v-distpicker';
import { createDingXiang } from '../utils.js';
import * as http from '../unit/server';

let mySwiper = null;
let swiperSelect = null;
let profetionSelect = null;
window.onload = function () {
  mySwiper = new Swiper('.swiper1', {
    pagination: {
      el: 'swiper1',
      hideOnClick: true,
    },
    direction: 'vertical', // 垂直切换选项
  });
  swiperSelect = new Swiper('.swiper2', {
    pagination: {
      el: 'swiper2',
      hideOnClick: true,
    },
    direction: 'vertical', // 垂直切换选项
    slidesPerView: 3,
    paginationClickable: true,
    spaceBetween: 30,
    freeMode: true,
  });
  profetionSelect = new Swiper('.swiper3', {
    pagination: {
      el: 'swiper3',
      hideOnClick: true,
    },
    direction: 'vertical', // 垂直切换选项
    slidesPerView: 3,
    paginationClickable: true,
    spaceBetween: 30,
    freeMode: true,
  });
};
export default {
  name: '',
  data() {
    return {
      citysAry: ['北京', '上海', '广州', '福建', '浙江', '吉林', '香港'],
      professionType: ['中介', '产权方', '二房东', '三房东', '其他'],
      transBtn: -600,
      profetionBtn: -600,
      userPhone: null, // 用户输入手机号
      judgeSystem: '',
      curentCityName: '', // 当前城市
      professionName: '', // 职业名称
      addInp: true,
      phoneText: '发送验证码',
      mask: true, // 是否可以点击发送验证码
      rid: '',
      codeInterval: null, // 计时器
      handleClueUser: false, // 成为线索人
      sendCode: null, // 获取验证码手机号
    };
  },
  components: {
    VDistpicker,
  },
  created() {
    this.getIntialValue();
  },
  mounted() {
    this.SMCaptcha = createDingXiang(
      (token) => {
        this.picValidResult = token;
        this.smCaptchaCallback();
        this.SMCaptcha.hide();
      },
      (fail) => {
      }
    );
  },
  methods: {
    getIntialValue() {
      http.getUserInfo().then((res) => {
      });
    },
    testPhoneCode(e) {
      if (!this.mask) return;
      if (/^1[3456789]\d{9}$/.test(this.userPhone)) {
        const { SMCaptcha } = this;
        e.preventDefault(SMCaptcha);
        // return;
        SMCaptcha.reload();
        SMCaptcha.show();
      }
    },
    smCaptchaCallback() {
      this.handlePhoneSend();
      this.mask = false;
      http.postPhoneCode(this.userPhone, this.picValidResult).then((res) => {
      });
    },
    checkPrivideClue() {
      this.$router.push('/about');
    },
    TurnDownSlider() {
      mySwiper.slideNext();
    },
    TurnUpSlider() {
      mySwiper.slidePrev();
    },
    getCurentCitys() {
      this.transBtn = 0;
    },
    getCurentCityName(name) {
      this.curentCityName = name;
      this.transBtn = -700;
    },
    getProfesionName(name) {
      this.professionName = name;
      this.profetionBtn = -700;
    },
    getProfession() {
      this.profetionBtn = 0;
    },
    selected(data) {
      this.mask = false;
      this.addInp = false;
    },
    closeBoxshadow() {
      // 关闭 成为线索人
      this.handleClueUser = false;
    },
    handlePhoneSend() {
      // 成功发送验证码后的处理
      this.phoneText = `${60}s后重新发送`;
      let newNumber = 60;
      setTimeout(() => {
        this.codeInterval = setInterval(() => {
          newNumber--;
          this.phoneText = `${newNumber}s后重新发送`;
          if (newNumber === 0) {
            clearInterval(this.codeInterval);
            this.phoneText = '发送验证码';
          }
        }, 1000);
      }, 1000);
    },
    rightRigster() {
      // 立即注册
      const sendData = {
        phone: Number(this.userPhone),
        code: Number(this.sendCode),
        openId: 'XKHFHSKFKUKSHFKUS',
        unionId: 'HUGHSKGHKUDHGKSHKFH',
      };
      http.userRigster(sendData).then((res) => {
        if (res.data.status === 'ok') {
          // 注册成功
          this.handleClueUser = false;
        }
      });
    },
  },
};
</script>

<style lang="less">
body,
html {
  margin: 0px;
  padding: 0px;
  height: 100%;
}
* {
  margin: 0px;
  padding: 0px;
}
.slideFirst {
  background: url('https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/constract/RHNo9NO2LsE.png');
}
.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  overflow: hidden;
}
#app,
.swiper-container,
.swiper-wrapper {
  height: 100%;
}
.TurnCommon {
  width: 32px;
  height: 27px;
  text-align: center;
  line-height: 54px;
  border-radius: 6px;
  color: #FFFFFF;
  font-size: 16px;
  position: absolute;
  left: 50%;
  margin-left: -16px;
  z-index: 999;
}
.TurnDown {
  bottom: 19px;
}
.TurnUp {
  top: 40px;
}
.GoyooLogo {
  width: 87px;
  height: 18px;
  margin: 20px 0px 25px 18px;
  display: block;
}
.GoyooRandar {
  width: 254px;
  height: 172px;
  margin: 0px 0px 65px 1.5px;
  display: block;
}
.GoyooHouse {
  height: 450px;
  width: 300px;
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 1;
}
.GoyooTitle {
  height: 60px;
  position: relative;
  .TitleCommon {
    margin-top: 67px;
    position: absolute;
    top: 50%;
    margin-top: -4.5px;
    display: block;
    width: 90px;
    height: 9px;
  }
  .Title {
    font-size: 17px;
    font-weight: 600;
    font-family: 'PingFangSC-Semibold,PingFang SC';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #FFFFFF;
  }
  .TitleLeftLine {
    left: 26px;
  }
  .TitlerightLine {
    right: 26px;
  }
}
.fill-form {
  width: 335px;
  height: 460px;
  margin: 0 auto;
  background: #FFFFFF;
  border-radius: 8px;
  padding: 15px 5px;
  .each-form-content {
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
    border-bottom: 1px solid #F4F2F4;
    display: flex;
    justify-content: space-between;
    position: relative;
    .form-left {
      font-size: 15px;
      color: #333333;
      font-weight: 600;
      letter-spacing: 1px;
      font-family: 'PingFangSC-Medium,PingFang SC';
    }
    .store-choiceCitys {
      width: 100%;
      height: 300px;
      right: 0px;
      position: absolute;
      bottom: -300px;
      background: #e58;
      z-index: 999;
      overflow: auto;
    }
    .form-input {
      min-width: 170px;
      height: 21px;
      display: inline-block;
      line-height: 20px;
      border: none;
      outline: none;
      background: #FFFFFF;
      text-align: right;
      position: absolute;
      right: 24px;
      top: 15px;
      font-size: 14px;
      font-family: 'PingFangSC-Regular,PingFang SC';
      font-weight: 400;
      color: #333333;
      line-height: 21px;
    }
    .form-input::-webkit-input-placeholder {
      font-size: 15px;
      font-family: 'PingFangSC-Regular,PingFang SC';
      font-weight: 400;
      color: rgba(211, 211, 211, 1);
      line-height: 21px;
    }
    .choice-more {
      width: 6px;
      height: 13px;
      position: absolute;
      right: 9px;
      top: 50%;
      margin-top: -7px;
    }
    .no-more-choice {
      right: 9px;
    }
  }
  .explain-show-consumer {
    width: 195px;
    height: 34px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 17px;
    margin: 20px auto;
    text-align: center;
  }
  .send-clue {
    width: 315px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 8px;
    background: #285DB7;
    color: #FFFFFF;
    font-size: 17px;
    font-family: 'PingFangSC-Medium,PingFang SC';
    font-weight: 500;
    margin: 15px auto;
    outline: none;
    display: block;
  }
  .query-clue {
    width: 84px;
    height: 17px;
    margin: 15px auto;
    font-size: 12px;
    clear: #2B5DB1;
    font-weight: 400;
    font-family: 'PingFangSC-Regular,PingFang SC';
    position: relative;
    color: #2B5DB1;
    text-align: center;
    img {
      width: 4px;
      height: 10px;
      position: absolute;
      right: -9px;
      top: 50%;
      margin-top: -5px;
    }
  }
  .scanning-code {
    height: 70px;
    width: 281px;
    margin: 30px auto;
    display: flex;
    justify-content: space-between;
    .code-img {
      width: 68px;
      height: 68px;
      padding: 1px;
      background: #FFFFFF;
    }
    .store-phone-code {
      display: flex;
      flex-direction: column;
      padding: 6px 0px;
      .each-contact {
        flex: 1;
        font-size: 14px;
        color: #FFFFFF;
        font-weight: 500;
        line-height: 29px;
        font-family: 'PingFangSC-Medium,PingFang SC';
        position: relative;
        img {
          position: absolute;
          width: 120px;
          top: 50%;
          transform: translate(0, -50%);
          left: 64px;
        }
      }
    }
  }
}
.swiper2,
.swiper3 {
  position: fixed;
  width: 100%;
  transition: bottom 0.5s;
  height: 200px;
  background: #FFFFFF;
  font-weight: bold;
  color: #000000;
  text-align: center;
  font-size: 16px;
  font-family: 'PingFangSC-Regular,PingFang SC';
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #888888;
    width: 100%;
    height: 40px;
    line-height: 40px;
    color: #FFFFFF;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
}
.RandarExplain {
  letter-spacing: 1px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  text-align: justify;
  width: 345px;
  margin: 0 auto;
  font-family: 'PingFangSC-Regular,PingFang SC';
  color: #FFFFFF;
  margin-bottom: 10px;
}
.Goyoo-suport {
  width: 350px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .each-suport-manage {
    width: 170px;
    height: 70px;
    margin: 2.5px 2.5px;
  }
}
.find-house-top {
  width: 258px;
  height: 102px;
  display: block;
  margin: 0 auto;
}
.reward-money-station {
  height: 16px;
  line-height: 16px;
  margin-top: 8px;
  color: #FFFFFF;
  letter-spacing: 1px;
  margin-bottom: 26px;
  font-family: 'PingFangSC-Regular,PingFang SC';
  font-size: 11px;
  text-align: center;
}
.content-introduce {
  display: flex;
  flex-wrap: wrap;
  .each-content {
    text-align: center;
    position: relative;
    width: 50%;
    .content-share {
      width: 108px;
      display: block;
      border: 0.5px dashed #888888;
      margin: 0 auto;
    }
    .content-center {
      width: 80px;
      height: 30px;
      position: absolute;
      left: 50%;
      margin-left: -46px;
      top: 96px;
      padding: 6px;
      border: 0.5px dashed #888888;
    }
    .content-range {
      font-size: 12px;
      margin-top: 30px;
      display: block;
      margin-bottom: 10px;
      color: #FFFFFF;
      line-height: 18px;
    }
  }
}
.send-phone-code {
  position: fixed;
  top: 0px;
  left: 0px;
  background: #666666;
  width: 100%;
  height: 100%;
  z-index: 999;
  .phone-content {
    width: 255px;
    height: 255px;
    margin: 156px auto;
    border-radius: 8px;
    padding: 25px 20px;
    background: #FFFFFF;
    position: relative;
    input {
      border: 1px solid rgba(220, 220, 220, 1);
      border-radius: 6px;
      outline: none;
    }
    .commonInput {
      border: none;
      height: 21px;
      line-height: 21px;
      width: 150px;
      border-radius: 0px;
      color: #333333;
      font-size: 15px;
    }
    .commonInput::-webkit-input-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #cccccc;
      font-size: 15px;
    }
    .get-phone-code {
      width: 255px;
      height: 50px;
      border: 1px solid rgba(220, 220, 220, 1);
      border-radius: 6px;
      margin-top: 15px;
      position: relative;
      .fill-phone-code {
        height: 21px;
        line-height: 21px;
        font-size: 15px;
        padding: 15px 0px 14px 10px;
        width: 100px;
        border: none;
      }
      .fill-phone-code::-webkit-input-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #cccccc;
        font-size: 15px;
      }
      .user-send-code {
        text-align: center;
        height: 20px;
        line-height: 20px;
        padding-left: 10px;
        border-left: 1px solid #EBEBEB;
        font-size: 15px;
        color: #2988E0;
        font-weight: 500;
        font-family: 'PingFangSC-Medium,PingFang SC';
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translate(0px, -50%);
      }
    }
    .close-shadow {
      display: block;
      width: 39px;
      height: 39px;
      position: absolute;
      bottom: -60px;
      left: 50%;
      transform: translate(-50%, 0);
    }
    .user-register {
      width: 255px;
      height: 50px;
      border-radius: 8px;
      background: #285DB7;
      color: #FFFFFF;
      text-align: center;
      line-height: 50px;
      margin: 20px auto;
      font-size: 18px;
      font-weight: 500;
      outline: none;
    }
    .content-top {
      height: 25px;
      line-height: 25px;
      font-size: 18px;
      color: #333333;
      text-align: center;
      display: block;
      font-family: 'PingFangSC-Medium,PingFang SC';
      font-weight: 500;
    }
    .send-phoneCode {
      width: 245px;
      height: 35px;
      padding: 15px 0px 0px 10px;
      font-size: 15px;
      color: #333333;
      margin-top: 20px;
      border: 1px solid #DCDCDC;
      border-radius: 6px;
    }
  }
}
</style>
