<template>
  <div id="app">
    <div class="notice-title">
      <div class="title">{{newsNotice.title}}</div>
      <span class="notice-time">{{startTime}}</span>
    </div>
    <div class="store-content">
      <div class="content-text">{{newsNotice.desc}}</div>
    </div>
    <div class="each-matter">
      <div class="matter-tile">影响时间</div>
      <div class="matter-content">{{periodStartTime}} - {{periodEndTime}}</div>
    </div>
    <div class="each-matter">
      <div class="matter-tile">影响区域</div>
      <div class="matter-content" v-for="(item) in infectArea"
        v-bind:key="item">{{item}}</div>
    </div>
    <div class="each-matter">
      <div class="matter-tile">注意事项</div>
      <div class="matter-content" v-for="(item) in attentionMater"
        v-bind:key="item">{{item}}</div>
    </div>
    <div class="notice-other contack"><div class="btnBefore">联系人</div>：{{newsNotice.contacts}}</div>
    <div class="notice-other"><div class="btnBefore">联系电话</div>：{{newsNotice.contactsTel}}</div>
    <div class="notice-other">{{newsNotice.projectName}}</div>
  </div>
</template>
<script>

import { wxShare } from '@guanyu/h5-tools';
import { getAppAuthInfo } from '@guanyu/guanyu-h5-tools';
import { getNewsNotice } from '../utils/server';

export default {
  data() {
    return {
      newsNotice: {},
      activeId: null, // 活动id
      periodStartTime: null, // 影响时间-开始
      periodEndTime: null, // 影响时间-结束
      infectArea: [], // 影响区域
      attentionMater: [], // 注意事项
      startTime: null, // 开始时间
    };
  },
  created() {
    this.getNotice();
    this.initialWxShare();
  },
  methods: {
    getNotice() {
      this.activeId = this.getQueryVariable('id');
      const token = getAppAuthInfo().access_token;
      // const token = 'C36F8E3CE8CB8AC7BEB3F3AF1FD51A7F';
      getNewsNotice(this.activeId, token).then((res) => {
        if (res.status === 200) {
          const response = res.data.data;
          this.newsNotice = response;
          this.periodStartTime = this.timestampToTime(Number(response.periodStartTime));
          this.periodEndTime = this.timestampToTime(Number(response.periodEndTime));
          this.infectArea = this.transformLineBreak(response.area);
          this.attentionMater = this.transformLineBreak(response.note);
          this.startTime = this.timestampToTime(Number(response.time));
        }
      });
    },
    initialWxShare() {
      const url = `${window.location.origin}/fe/hd_newNotice/index.html?id=${this.activeId}`;
      wxShare({
        api: `${window.location.origin}/gymwebsite/getJsapiSigna`, // 获取微信鉴权的接口地址,
        title: '消息公告', // 分享标题,
        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致,
        img: 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/constract/AgzTgzJnpKE.png', // 分享图标,
        desc: '查看消息公告详情', // 分享描述,
        type: 'link', // 分享类型,music、video或link，不填默认为link,
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      });
    },
    timestampToTime(timestamp) {
      const date = new Date(timestamp);// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      const Y = `${date.getFullYear()}年`;
      const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}月`;
      const D = `${date.getDate()}日 `;
      const h = `${date.getHours()}:`;
      const m = `${date.getMinutes()}:`;
      const s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    transformLineBreak(str) {
      if (!str) {
        return [];
      }
      const arr = str.split(/\n/g);
      return arr;
    },
    getQueryVariable(name) {
      const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
      const r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    },
  },
};
</script>


<style lang="less">
body, html{margin: 0px; padding: 0px}
#app{
}
.notice-title{
  padding: 0px 10px;
  .title{
    height: 28px;
    line-height: 28px;
    font-size: 20px;
    color: #333333;
    font-weight: 550;
    padding-left: 10px;
    margin: 20px 0px 5px 0px;
  }
  .notice-time{
    font-size: 12px;
    color: #999999;
    font-weight: 400;
    height: 17px;
    line-height: 17px;
    width: 96%;
    display: block;
    padding-left: 10px;
    border-bottom: 1px solid #ECECEE;
    padding-bottom: 10px
  }
}
.each-matter{
  margin-top: 10px;
  padding: 0 20px 0px 20px;
  .matter-tile{
    height: 21px;
    line-height: 21px;
    font-size: 15px;
    color: #333333;
    font-weight: 550;
    margin-bottom: 5px;
  }
  .matter-content{
    font-size: 15px;
    font-weight: 400;
    color: #666666;
    line-height: 25px;
    margin-bottom: 5px;
    text-align: justify;
    word-wrap: word-break;
    .content-number{
      margin-right: 10px;
    }
  }
}
.store-content{
  font-size: 15px;
  font-weight: 400;
  line-height: 25px;
  padding: 0px 0px;
  margin: 10px 0px;
  color: rgba(102,102,102,1);
  .content-text{
    padding: 0px 20px;
    text-align: justify;
    word-wrap: word-break;
  }
  img{
    display: block;
    border-radius: 8px;
    margin: 10px 0px;
    width: 100%;
  }
}
.notice-other{
  font-size: 15px;
  color: #333333;
  font-weight: bold;
  padding-left: 20px;
  height: 21px;
  line-height: 21px;
  margin-bottom: 10px;
  .btnBefore{
    display: inline-block;
  }
}
.contack{
  margin-top: 10px;
}
</style>
