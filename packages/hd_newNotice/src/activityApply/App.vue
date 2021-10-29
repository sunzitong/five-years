<template>
  <div id="activeApply">
    <div class="banner">
      <img :src="`${initData.coverImgUrl}?x-oss-process=image/resize,s_192,m_lfit,limit_0`" alt="">
      <div class="activity-info">
        <h2>{{initData.title}}</h2>
        <p class="project-name">{{projectName}}</p>
        <p class="activity-time">{{initData.activityTimeStr}}</p>
      </div>
    </div>
    <div class="activity-input">
      <div class="input-box">
        <span>手机号</span>
        <input type="text" placeholder="请填写您的联系方式" v-model="phone">
      </div>
      <div class="input-box">
        <span>联系人姓名</span>
        <input type="text" placeholder="请填写您的称呼" v-model="userName">
      </div>
      <div class="input-box">
        <span>推荐人姓名</span>
        <input type="text" placeholder="选填" v-model="recommender">
      </div>
      <div class="input-box">
        <span>推荐人房间号</span>
        <input type="text" placeholder="选填" v-model="recommenderRoom">
      </div>
    </div>
    <div
      v-if="Array.isArray(problems) && problems.length > 0" class="activity-input">
      <h3>以下问题可以让活动发起者快速了解您，认真填写有助于通过报名审核</h3>
      <div v-for="(item, index) in problems" :key="index" class="input-box">
        <span>{{item.problemDes}}</span>
        <input type="text" placeholder="请输入" v-model="item.answer">
      </div>
    </div>
    <div class="submit-btn" @click='submit()'>
      <span>提交</span>
    </div>
    <div v-if="toastIsShow" class="toast">
      <span>{{toastMsg}}</span>
    </div>
  </div>
</template>
<script>
import { judgeDevice } from '@guanyu/h5-tools';
import { getAppAuthInfo } from '@guanyu/guanyu-h5-tools';
import Vue from 'vue';
import { Toast } from 'vant';
import zhugeio from '@guanyu/zhugeio';
import { getActiveDetail, submitSignup } from '../utils/server';
import 'vant/lib/index.css';

Vue.use(Toast);

export default {
  name: '',
  data() {
    return {
      initData: {},
      problems: [],
      phone: '',
      userName: '',
      recommender: '',
      recommenderRoom: '',
      answerList: [],
      proArr: [],
      toastIsShow: false,
      toastMsg: '',
      flag: true,
      textHeight: '',
      projectId: '',
      projectName: '',
    };
  },
  beforeMount() {
    const source = judgeDevice();
    localStorage.setItem('source', source);
    // 正式/预上线环境
    let appKey = 'c6911bc459bb41a5acbb720e91057739'; // 选填 默认： c6911bc459bb41a5acbb720e91057739
    let jsSrc = 'https://datain.longfor.com/zhuge.js?v=';
    if (window.location.href.includes('test109') || process.env.NODE_ENV === 'development') {
      jsSrc = 'https://dataintest.longfor.com/zhuge.js?v=';
      appKey = '3ec10a66f82f4951ba811df964fcc199';
    }
    zhugeio({
      appKey,
      jsSrc,
      options: {
        superProperty: {
          访问来源: source === 'browser' ? '其他' : source,
        },
      },
    });
  },
  mounted() {
    this.projectId = decodeURI(this.getQueryVariable('projectId'));
    this.projectName = decodeURI(this.getQueryVariable('projectName'));
    this.getActiveDetail();
  },
  methods: {
    getQueryVariable(variable) {
      const query = window.location.search.substring(1);
      const vars = query.split('&');
      for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        if (pair[0] == variable) { return pair[1]; }
      }
      return '';
    },
    getActiveDetail() {
      const activeId = this.getQueryVariable('id');
      let token = 'c858e7e6996d53a1';
      if (judgeDevice() === 'APP') {
        token = getAppAuthInfo().access_token;
      }
      const sendData = {
        id: activeId,
      };
      getActiveDetail(sendData, token).then((res) => {
        const { data: { data: detailData = {} } } = res;
        if (res.data.code === 10000) {
          this.initData = detailData;
          this.problems = detailData.problems.map((item) => {
            return {
              ...item,
              answer: undefined,
            };
          });
        }
      });
    },
    // 必填校验
    checkInfo() {
      if (!this.phone) {
        Toast('请输入您的联系方式');
        return false;
      }
      if (this.phone.length !== 11) {
        Toast('请输入正确的联系方式');
        return false;
      }
      if (!this.userName) {
        Toast('请填写您的称呼');
        return false;
      }
      const found = this.problems.find(element => !element.answer);
      const found2 = this.problems.find(element => element.answer && element.answer.length > 200);
      if (found && !found.answer) {
        Toast(`请输入${found.problemDes}问题回复,不少于5个字哦`);
        return false;
      }
      if (found2 && found2.answer.length > 200) {
        Toast('建议您言简意赅的表达哦');
        return false;
      }
      return true;
    },
    submit() {
      window.zhuge.track('报名申请页-提交按钮');
      if (!this.checkInfo()) return;
      if (!this.flag) return;
      this.flag = false;
      const activeId = this.getQueryVariable('id');
      // 获取提交参数
      const params = {
        id: activeId, // 必填活动id
        phone: this.phone, // 必填
        userName: this.userName, // 必填
        cityId: this.initData.cityId, // 必填
        cityName: this.initData.cityName, // 必填
        projectId: this.projectId, // 必填
        projectName: this.projectName, // 必填
        recommender: this.recommender,
        recommenderRoom: this.recommenderRoom,
        problems: this.problems, // 报名问题必填}
      };
      let token = '';
      if (judgeDevice() === 'APP') {
        token = getAppAuthInfo().access_token;
      } else {
        // 如果是在小程序内则从url上取sessionId
        token = this.getQueryVariable('sessionId');
      }
      window.zhuge.track('报名申请页-提交按钮');
      submitSignup(params, token).then((res) => {
        this.flag = true;
        // Toast('网络故障，请稍后再试');
        if (res.data.code === 10000) {
          window.location.href = 'success.html';
          // Toast(res.data.data.remarks);
          return;
        }
        Toast(res.data.message);
      }).catch(() => {
        this.flag = true;
      });
    },
  },
};
</script>
<style lang="less" scope>
  #activeApply {
    padding-bottom: 70px;
  }
  .banner {
    width: 100%;
    position: relative;
    height: 192px;
    overflow: hidden;
    img {
      width: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .activity-info {
      position: absolute;
      width: 250px;
      left: 50%;
      top: 44px;
      transform: translateX(-50%);
      background: rgba(0,0,0,0.6);
      padding: 18px 12px;
      box-sizing: border-box;
      text-align: center;
      border-radius: 8px;
      h2 {
        font-size: 20px;
        color: #FFFFFF;
        line-height: 28px;
      }
      .project-name {
        font-size: 14px;
        color: #F18D00;
        padding-top: 12px;
      }
      .activity-time {
        font-size: 14px;
        color: #F8F8F8;
        padding-top: 6px;
      }
    }
  }
  .activity-input {
    margin-top: 20px;
    margin: 0 20px;
    h3 {
      font-size: 12px;
      color: #999999;
      margin-top: 18px;
      line-height: 17px;
      font-weight: normal;
    }
    .input-box {
      margin-top: 10px;
      border-bottom: 1px solid #ededed;
      padding-bottom: 12px;
      span {
        font-size: 12px;
        color: #666666;
        display: block;
        line-height: 17px;

      }
      input {
        font-size: 17px;
        color: #333333;
        display: block;
        margin-top: 6px;
        line-height: 24px;
        border: none;
        outline: none;
        outline-color: transparent;
        box-shadow: none;
        outline-style: none;
        outline-width: 0px;
        text-shadow: none;
        -webkit-appearance: none;
        -webkit-user-select: text;
        box-shadow: none;
      }
      .textarea {
          width: 100%;
      }
    }
  }
  .submit-btn {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #ffffff;
    span {
      margin: 10px;
      background: #F18D00;
      display: block;
      height: 50px;
      line-height: 50px;
      color: #ffffff;
      border-radius: 8px;
      text-align: center;
    }
  }
  .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0,0.7);
    color: #ffffff;
    min-width: 150px;
    padding: 10px 30px;
    z-index: 20;
    text-align: center;
    border-radius: 10px;
    font-size: 16px;
  }
</style>
