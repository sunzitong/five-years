<template>
  <div class="clues">
    <img src="../assets/Goyoo-banner.png" alt="" class="clues-img">
    <img src="../assets/clues-ready.png" alt="" class="clues-ready-top">
    <div class="each-clue" v-for="(item, index) in cluesList" v-bind:key="index">
      <div class="clues-name">楼宇位置</div>
      <div class="clues-content">{{item.address}}</div>
      <div class="clues-name">租赁区域</div>
      <div class="clues-content">{{item.area}}m²</div>
      <div class="clues-name">业务联系人</div>
      <div class="clues-content">{{item.linkName}} {{item.phone}}</div>
      <img src="../assets/clues-all.png" alt="" class="clues-all">
    </div>
    <div class="no-clus" v-if="cluesList.length === 0">暂无数据</div>
  </div>
</template>
<script>
import { wxShare } from '@guanyu/h5-tools';
import * as http from '../unit/server';

export default {
  name: 'clue',
  data() {
    return {
      cluesList: [],
    };
  },
  created() {
    this.getInitClues();
  },
  mounted() {
    const shareConf = {
      debug: false,
      api: `${window.location.origin}/gymwebsite/getJsapiSigna`,
      title: '冠寓|领先的租赁住房服务商',
      link: `${window.location.origin}/webapp/radar/go`,
      img: 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/app/KwDNZN4dPV7fkTSTRgwlWw.png',
      desc: '龙湖旗下集中式租赁住房品牌，行业影响力第一/连续三年品牌影响力第一，期待与您合作共赢',
      type: '',
      dataUrl: '',
      success: () => {},
    };
    wxShare(shareConf);
  },
  methods: {
    getInitClues() {
      // 该页面背景颜色应该为一个图片！！！！
      http.getCluesList('', localStorage.getItem('radarSessionId')).then((res) => {
        this.cluesList = res.data.data.list || {};
      });
    },
    getQueryVariable(variable) {
      const query = window.location.search.substring(1);
      const vars = query.split('&');
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        // eslint-disable-next-line eqeqeq
        if (pair[0] == variable) { return pair[1]; }
      }
      return (false);
    },
  },
};
</script>
<style lang="less">
body, html{
  margin: 0px;
  padding: 0px;
  height: 100%;
}
  .clues{
    min-height: 100%;
    flex-direction: row;
    background:linear-gradient(180deg,rgba(2,42,105,1) 0%,rgba(42,93,176,1) 100%);
    position: relative;
    padding-top: 45px;
    padding-bottom: 20px;
    background-image: url(../assets/backOneImg.png);
    background-repeat: no-repeat;
    background-position: right;
    background-size: 105% 100%;
    .clues-img{
      width: 87px;
      height: 18px;
      position: absolute;
      left: 18px;
      top: 20px;
    }
    .clues-ready-top{
      display: block;
      width: 132px;
      height: 50px;
      margin: 10px auto;
      padding-left: 10px;
    }
    .each-clue{
      width:299px;
      height:126px;
      background:rgba(255,255,255,1);
      box-shadow:0px 1px 14px 0px rgba(93,151,242,1) inset;
      border-radius:4px;
      margin: 20px auto 0px;
      padding: 20px 23px;
      position: relative;
      .clues-name{
        height: 17px;
        line-height: 17px;
        font-size: 12px;
        color: #666666;
        font-family: 'PingFangSC-Regular,PingFang SC';
        font-weight: 400;
      }
      .clues-content{
        height: 20px;
        line-height: 20px;
        color: #333333;
        font-size: 14px;
        font-weight: 400;
        font-family: 'PingFangSC-Regular,PingFang SC';
        margin-bottom: 10px;
      }
      .clues-all{
        width: 47px;
        height: 47px;
        position: absolute;
        right: 18px;
        bottom: 18px;
      }
    }
  }
  .no-clus{
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: absolute;
    top: 40%;
    font-size: 16px;
    opacity: 0.7;
    letter-spacing: 3px;
    color: #ffffff;
    font-weight: 400;
    font-family: 'PingFangSC-Semibold,PingFang SC';
    width: 100%
  }
</style>
