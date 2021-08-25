<template>
  <div id="app">
    <!-- <img class="bg" src="https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/app/9QUSNO0zza8l7NBqUFmyJg.png" alt=""> -->
    <div class="formInfo">
      <div>
        <div class="each-form-content">
          <span class="form-left">所在城市</span>
          <img class="choice-more" src="../assets/choice-other.png" alt />
          <input
            class="form-input"
            v-model="curentCityName"
            type="text"
            placeholder="请选择物业所在城市"
          />
          <div class="box-shadow" @click="getCurentCitys"></div>
        </div>
        <div class="each-form-content">
          <span class="form-left">楼宇位置</span>
          <input
            maxlength="200"
            class="form-input no-more-choice"
            type="text"
            v-model="address"
            @blur="handleScroll"
            @focus="changeDisticker"
            placeholder="请输入楼宇的具体地址"
          />
        </div>
        <div class="each-form-content">
          <span class="form-left">楼宇面积(m²)</span>
          <input
            class="form-input no-more-choice"
            type="text"
            v-model="areaNumber"
            @focus="changeDisticker"
            @input="change"
            placeholder="请输入楼宇的具体面积"
          />
        </div>
        <div class="each-form-content">
          <span class="form-left">联系人</span>
          <input
            maxlength="40"
            class="form-input no-more-choice"
            type="text"
            v-model="linkName"
            @blur="handleScroll"
            @focus="changeDisticker"
            placeholder="请留下楼宇联系人的姓名"
          />
        </div>
        <div class="each-form-content">
          <span class="form-left">联系电话</span>
          <input
            class="form-input no-more-choice"
            maxlength="20"
            v-model="userPhone"
            @blur="handleScroll"
            @focus="changeDisticker"
            @keyup="getPhonenumberNew"
            type="tel"
            placeholder="请留下楼宇联系人的电话"
          />
        </div>
      </div>
      <button class="submitClub" @click="sendHouseClue">提交合作信息</button>
      <img class="erweima" src="https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/app/QBAwKSZ9aMEKI4_7pVnkew.png" alt="">
    </div>
    <v-distpicker
      v-if="checkGetArea"
      class="choice-area"
      type="mobile"
      @province="getProvice"
      @city="getCity"
      @area="getArea"
      @selected="onSelected"
    ></v-distpicker>
  </div>
</template>
<script>
import { wxShare } from '@guanyu/h5-tools';
import { setTimeout } from 'timers';
import VDistpicker from 'v-distpicker';
import { Toast } from 'vant';
import * as http from '../unit/server';
import 'vant/lib/picker/style';

// eslint-disable-next-line no-unused-vars
export default {
  name: '',
  data() {
    return {
      preNum: '',
      userPhone: '', // 用户输入手机号
      linkName: '', // 姓名
      curentCityName: '', // 当前城市
      addInp: true,
      province: '',
      city: '',
      area: '',
      address: '',
      // subLock: true, // 提交锁
      areaNumber: '', // 面积
      phoneText: '发送验证码',
      mask: true, // 是否可以点击发送验证码
      sendCodeHandle: false, // 是否发送验证码
      canRigster: false, // 是否可以注册
      checkGetArea: false, // 是否填写省市区
      specificArea: '', // 省市区具体地址
      rid: '',
      areaCode: '', // 整个地区code码
      registerUser: false, // 是否为注册用户
      btnDistancenew: null,
      codeMargin: null,
      sessionId: undefined,
      tips: -300, // 控制提示文案距离
      tipsContent: '', // 提示文案
      codeInterval: null, // 计时器
      handleClueUser: false, // 成为线索人
      sendCode: null, // 获取验证码手机号
    };
  },
  components: {
    VDistpicker,
  },
  created() {
    this.handleScreen();
  },
  mounted() {
    const shareConf = {
      debug: false,
      api: `${window.location.origin}/gymwebsite/getJsapiSigna`,
      title: '冠寓|领先的租赁住房服务商',
      link: `${window.location.origin}/webapp/radar/go`,
      img:
        'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/app/KwDNZN4dPV7fkTSTRgwlWw.png',
      desc: '龙湖旗下集中式租赁住房品牌，行业影响力第一，期待与您合作共赢',
      type: '',
      dataUrl: '',
      success: () => {},
    };
    wxShare(shareConf);
  },
  methods: {
    onSelected(data) {
      this.areaCode = data.area.code;
    },
    hideTips() {
      // 隐藏tips
      setTimeout(() => {
        this.tips = -200; // 发送成功提示
      }, 2000);
    },
    getProvice(a) {
      // 获取省
      this.province = a.value;
    },
    getPhonenumberNew() {
      const isnum = /^\d+$/.test(this.userPhone);
      if (!isnum) {
        if (this.userPhone === '') {
          return;
        }
        Toast('电话请输入数字');
        this.userPhone = '';
      }
    },
    getAreaNew() {
      const isnum = /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/.test(
        this.areaNumber
      );
      if (!isnum) {
        if (this.areaNumber === '') {
          return;
        }
        Toast('面积请输入数字');
        this.areaNumber = '';
      }
    },
    change(e) {
      // console.log(e);
      // console.log('ff', this.preNum.split('.')[1]);
      // console.log('ff', this.preNum.split('.')[0]);
      const isnum = /^\d+$/.test(e.data);
      // const preNum = this.areaNumber.substr(0, this.areaNumber.length - 1);
      // 输入
      if (e.data !== null) {
        // 最新输入非数字
        if (!isnum) {
          // console.log(e);
          // 之前无值
          if (!this.preNum) {
            Toast('面积请输入数字');
            this.areaNumber = this.areaNumber.substr(
              0,
              this.areaNumber.length - 1
            );
          }
          // 数字中不带点
          if (!this.preNum.includes('.')) {
            // 新值不为点
            // console.log('e.data', e.data);
            if (e.data !== '.') {
              Toast('面积请输入数字');
              this.areaNumber = this.areaNumber.substr(
                0,
                this.areaNumber.length - 1
              );
            }
          }
          // 有数字值
          if (this.preNum) {
            // 数字中带点
            if (this.preNum.includes('.')) {
              Toast('面积请输入数字');
              this.areaNumber = this.areaNumber.substr(
                0,
                this.areaNumber.length - 1
              );
            }
          }
          this.preNum = this.areaNumber;
        }
        // 最新输入数字
        if (isnum) {
          // 之前的值中不包括点
          if (!this.preNum.includes('.')) {
            if (this.areaNumber.length > 7) {
              Toast('小数点前最多7位数');
              this.areaNumber = this.areaNumber.substr(
                0,
                this.areaNumber.length - 1
              );
            }
          }
          if (this.preNum.includes('.')) {
            if (this.areaNumber.split('.')[0].length > 7) {
              Toast('小数点前最多7位数');
              this.areaNumber = this.preNum;
              // console.log('preNum', this.preNum);
              // console.log('this.areaNumber', this.areaNumber);
              // this.areaNumber = preNum;
            }
          }
          // console.log(12313);
          this.preNum = this.areaNumber;
        }
      } else if (
        this.preNum.includes('.')
        && !this.areaNumber.includes('.')
        && this.preNum.split('.')[1]
      ) {
        // 删除
        // eslint-disable-next-line prefer-destructuring
        this.areaNumber = this.preNum.split('.')[0];
        // if (this.preNum.includes('.') && !this.areaNumber.includes('.')) {
        //   this.areaNumber = this.preNum.split('.')[0];
        // }
      }
      this.areaNumber = this.areaNumber.replace(/[\u4e00-\u9fa5]/g, '');
      this.areaNumber = this.areaNumber.replace(/[a-zA-Z]/g, '');
      this.preNum = this.areaNumber;
    },
    // checkForm(text) {
    //   this.tipsContent = text;
    //   this.tips = 10; // 发送成功提示
    //   this.hideTips();
    // },
    handleScroll() {
      // input 失去焦点 错位问题
      // window.scrollTo(0, 0);
    },
    changeDisticker() {
      // 其他input聚焦时 地区三级联动插件隐藏
      this.checkGetArea = false;
      // this.handleVant = false;
    },
    getCity(a) {
      // 获取市区
      this.city = a.value;
    },
    handleScreen() {
      const screenHeight = document.documentElement.scrollHeight;
      // const htmlDom = document.getElementsByTagName('html')[0];
      if (screenHeight <= 640) {
        this.btnDistancenew = 5;
        this.codeMargin = 0;
        // setTimeout(() => {
        //   htmlDom.style.fontSize = '33px';
        // }, 800)
      } else {
        this.btnDistancenew = 45;
        this.codeMargin = 30;
      }
    },
    getArea(a) {
      // 获取乡镇
      this.area = a.value;
      this.curentCityName = `${this.province} ${this.city} ${this.area}`;
      this.checkGetArea = false; // 获取到省市区
      // window.scrollTo(0, 0);
    },
    sendHouseClue() {
      // 发送线索
      // if (!this.registerUser) {
      //   // 地址栏和本地缓存都没有  该用户未注册过
      //   this.handleClueUser = true;
      //   return;
      // }
      if (this.curentCityName === '') {
        this.tipsContent = '请选择当前城市';
        Toast(this.tipsContent);
        // this.checkForm('请选择当前城市');
        return;
      } else if (this.address === '') {
        this.tipsContent = '请输入楼宇位置';
        Toast(this.tipsContent);
        // this.checkForm('请输入楼宇位置');
        return;
      } else if (this.areaNumber === '') {
        this.tipsContent = '请输入楼宇面积';
        Toast(this.tipsContent);
        // this.checkForm('请输入楼宇面积');
        return;
      } else if (this.linkName === '') {
        this.tipsContent = '请输入联系人姓名';
        Toast(this.tipsContent);
        // this.checkForm('请输入联系人姓名');
        return;
      } else if (this.userPhone === '') {
        this.tipsContent = '请输入联系人电话';
        Toast(this.tipsContent);
        // this.checkForm('请输入联系人电话');
        return;
      }
      // if (!this.subLock) {
      //   return;
      // }
      // this.subLock = false;
      const sendData = {
        linkName: encodeURI(this.linkName),
        phone: encodeURI(this.userPhone),
        province: encodeURI(this.province),
        city: encodeURI(this.city),
        district: encodeURI(this.area),
        areaCode: encodeURI(this.areaCode),
        address: encodeURI(this.address),
        area: encodeURI(Number(this.areaNumber)),
        // linkType: encodeURI(this.professionName),
      };
      http
        .userSureClues(sendData)
        .then((res = {}) => {
          if (res.data.status === 'ok') {
            this.tipsContent = '合作信息发送成功';
            Toast(this.tipsContent);
            // this.clearInfom();
            // setTimeout(() => {
            //   window.location.href = 'clues.html';
            //   this.clearInfom();
            // }, 1000);
          } else {
            this.tipsContent = res.data.msg || '系统错误';
            Toast(this.tipsContent);
            // this.clearInfom();
            this.handleClueUser = true;
          }
          // this.subLock = true; // 上锁
          // this.tips = 10; // 发送成功提示
          // this.hideTips();
        })
        .catch((e) => {
          Toast('系统错误');
        });
    },
    clearInfom() {
      this.curentCityName = '';
      this.address = '';
      this.areaNumber = '';
      this.linkName = '';
      this.userPhone = '';
      // this.professionName = '';
      // this.professtionValue = '';
    },
    getCurentCitys() {
      // 点击城市选择
      this.checkGetArea = true; // 显示省市区三级联动
    },
    selected() {
      this.mask = false;
      this.addInp = false;
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
.swiper-slide {
  overflow: hidden;
}
.slideSeconde,
.slidethreed {
  background-image: url(../assets/backTwoImg.png);
  background-repeat: no-repeat;
  background-position: right;
  background-size: 105% 100%;
}
.choiceIdentfy {
  position: fixed;
  bottom: 0px;
  z-index: 999;
  width: 100%;
}
.choice-area {
  height: 50vh;
  position: fixed;
  bottom: 0px;
  z-index: 999 !important;
  left: 0px;
  width: 100%;
  overflow: auto;
  background: #ffffff;
}
.swiper-container {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 6617px;
  background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/app/9QUSNO0zza8l7NBqUFmyJg.png")
    0 0 no-repeat;
  background-size: 100%;
  overflow: scroll;
}
// .bg {
//   width: 100%;
//   vertical-align: middle
// }
.erweima {
  width: 68px;
  height: 68px;
  margin-top: 65px;
  margin-left: 36px;
}
.formInfo {
  position: absolute;
  top: 5972px;
  left: 50%;
  transform: translateX(-50%);
  width: 335px;
  height: 250px;
  .each-form-content {
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
    border-bottom: 1px solid #f4f2f4;
    display: flex;
    justify-content: space-between;
    position: relative;
    .form-left {
      font-size: 15px;
      color: #333333;
      font-weight: 600;
      letter-spacing: 1px;
      font-family: "PingFangSC-Medium,PingFang SC";
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
      min-width: 200px;
      height: 21px;
      display: inline-block;
      line-height: 20px;
      border: none;
      outline: none;
      background: #ffffff;
      text-align: right;
      position: absolute;
      right: 24px;
      top: 15px;
      font-size: 14px;
      font-family: "PingFangSC-Regular,PingFang SC";
      font-weight: 400;
      color: #333333;
      line-height: 21px;
    }
    .box-shadow {
      position: absolute;
      width: 98%;
      height: 100%;
      z-index: 977;
    }
    .form-input::-webkit-input-placeholder {
      font-size: 15px;
      font-family: "PingFangSC-Regular,PingFang SC";
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
      transform: translate(0, -45%);
    }
    .no-more-choice {
      right: 9px;
    }
  }
}

.submitClub {
  margin: 69px auto 0;
  width: 315px;
  height: 50px;
  background-color: #043880;
  border-radius: 8px;
  font-size: 17px;
  line-height: 24px;
  font-weight: 500;
  color: #ffffff;
  outline: none;
  border: none;
  display: block;
}
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
  color: #ffffff;
  font-size: 16px;
  display: block;
  margin: 0 auto;
}
.tips {
  position: fixed;
  top: 10px;
  width: 60%;
  min-height: 30px;
  line-height: 30px;
  font-size: 16px;
  letter-spacing: 1px;
  text-align: center;
  border-radius: 4px;
  z-index: 999;
  background: #46a9d5;
  color: #ffffff;
  left: 50%;
  transform: translate(-50%, 0);
  transition: all 0.5s;
}
.back-color {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #21509d;
  z-index: -4;
  top: 0px;
  left: 0px;
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
  margin: 0px 0px 65px 12px;
  display: block;
}
.slideFirst {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: -3;
}
.Goyoo-back-img {
  position: absolute;
  z-index: -1;
  width: 290px;
  height: 400px;
  top: 0px;
  right: 0px;
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
  height: 24px;
  position: relative;
  margin-bottom: 14px;
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
    font-family: "PingFangSC-Semibold,PingFang SC";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
  }
  .TitleLeftLine {
    left: 26px;
  }
  .TitlerightLine {
    right: 26px;
  }
}
.fill-form {
  width: 85%;
  height: 460px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 8px;
  padding: 10px 5px;
  .each-form-content {
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
    border-bottom: 1px solid #f4f2f4;
    display: flex;
    justify-content: space-between;
    position: relative;
    .form-left {
      font-size: 15px;
      color: #333333;
      font-weight: 600;
      letter-spacing: 1px;
      font-family: "PingFangSC-Medium,PingFang SC";
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
      min-width: 200px;
      height: 21px;
      display: inline-block;
      line-height: 20px;
      border: none;
      outline: none;
      background: #ffffff;
      text-align: right;
      position: absolute;
      right: 24px;
      top: 15px;
      font-size: 14px;
      font-family: "PingFangSC-Regular,PingFang SC";
      font-weight: 400;
      color: #333333;
      line-height: 21px;
    }
    .box-shadow {
      position: absolute;
      width: 98%;
      height: 100%;
      z-index: 977;
    }
    .form-input::-webkit-input-placeholder {
      font-size: 15px;
      font-family: "PingFangSC-Regular,PingFang SC";
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
      transform: translate(0, -45%);
    }
    .no-more-choice {
      right: 9px;
    }
  }
  .explain-show-consumer {
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
    background: #285db7;
    color: #ffffff;
    font-size: 17px;
    font-family: "PingFangSC-Medium,PingFang SC";
    font-weight: 500;
    margin: 15px auto;
    outline: none;
    border: none;
    display: block;
  }
  .query-clue {
    width: 104px;
    height: 17px;
    line-height: 17px;
    margin: 15px auto 14px;
    font-size: 12px;
    display: block;
    clear: #2b5db1;
    font-weight: 400;
    font-family: "PingFangSC-Regular,PingFang SC";
    position: relative;
    color: #2b5db1;
    text-align: center;
    background-image: url(../assets/query-clue.png);
    background-repeat: no-repeat;
    background-position: right;
    background-size: 4px 8px;

    // img{
    //   width: 4px;
    //   height: 8px;
    //   position: absolute;
    //   top: 54%;
    //   margin-top: -3px;
    // }
  }
  .scanning-code {
    height: 70px;
    width: 281px;
    display: flex;
    justify-content: space-between;
    .code-img {
      width: 68px;
      height: 68px;
      padding: 1px;
      background: #ffffff;
    }
    .store-phone-code {
      display: flex;
      flex-direction: column;
      padding: 6px 0px;
      .each-contact {
        flex: 1;
        font-size: 14px;
        color: #ffffff;
        font-weight: 500;
        line-height: 29px;
        font-family: "PingFangSC-Medium,PingFang SC";
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
.operate-handle {
  height: 40px;
  background: #ffffff;
  color: #2e92de;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;
  border-bottom: 1px solid #cccccc;
  .handle-common {
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    display: inline-block;
  }
}
.swiper3 {
  position: fixed;
  width: 100%;
  transition: bottom 0.5s;
  height: 200px;
  background: #ffffff;
  font-weight: bold;
  color: #000000;
  text-align: center;
  font-size: 16px;
  font-family: "PingFangSC-Regular,PingFang SC";
  .swiper-slide {
    text-align: center;
    font-size: 16px;
    background: #ffffff;
    color: #333333;
    border-bottom: 1px solid #cccccc;
    width: 100%;
    font-weight: 400;
    height: 30px;
    line-height: 30px;
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
  font-family: "PingFangSC-Regular,PingFang SC";
  color: #ffffff;
  margin: 0px auto 15px;
}
.Goyoo-suport {
  width: 350px;
  margin: 0px auto;
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
  color: #ffffff;
  letter-spacing: 1px;
  margin-bottom: 26px;
  font-family: "PingFangSC-Regular,PingFang SC";
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
      margin: 0 auto;
    }
    .content-center {
      width: 80px;
      height: 34px;
      position: absolute;
      left: 50%;
      margin-left: -46px;
      top: 96px;
      padding: 6px;
    }
    .content-range {
      font-size: 12px;
      margin-top: 30px;
      display: block;
      margin-bottom: 10px;
      color: #ffffff;
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
    background: #ffffff;
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
        border-left: 1px solid #ebebeb;
        font-size: 15px;
        color: #2988e0;
        font-weight: 500;
        font-family: "PingFangSC-Medium,PingFang SC";
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
      background: #285db7;
      color: #ffffff;
      text-align: center;
      line-height: 50px;
      margin: 20px auto 12px;
      font-size: 18px;
      font-weight: 500;
      outline: none;
      border: none;
    }
    .user-become {
      font-size: 12px;
      color: #666666;
      font-family: "PingFangSC-Regular,PingFang SC";
      font-weight: 400;
      text-align: center;
    }
    .content-top {
      height: 25px;
      line-height: 25px;
      font-size: 18px;
      color: #333333;
      text-align: center;
      display: block;
      font-family: "PingFangSC-Medium,PingFang SC";
      font-weight: 500;
    }
    .send-phoneCode {
      width: 245px;
      height: 35px;
      padding: 15px 0px 0px 10px;
      font-size: 15px;
      color: #333333;
      margin-top: 20px;
      border: 1px solid #dcdcdc;
      border-radius: 6px;
    }
  }
}
</style>
