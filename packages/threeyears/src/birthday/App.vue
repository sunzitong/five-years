<template>
  <div id="app">
    <img class="BackImg" :src="`${publicPath}img/sources/dianliang_bg.jpg`" alt="">
    <img class="LogoBackImgNew" :src="`${publicPath}img/sources/banner_main.jpg`" alt="">
    <div class="ImgMainBox" v-for="(item, index) in birthAry" v-bind:key="index">
      <h1 class="BirthArea">{{item.name}}</h1>
      <div class="EachCityImgs">
        <div class="BirthStoreImg" :style="`width: ${item.imgNumber}px`">
          <img class="EachImg" style="width:300px;margin-left:14px"
            v-for="(items, index) in item.imgStore" :src="items"
            v-bind:key="index" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { wxShare } from '@guanyu/h5-tools';
import { BirthDayImgs } from '../utils/task';

export default {
  name: '',
  data() {
    return {
      name: '我的奖品',
      imgLoading: true,
      publicPath: process.env.BASE_URL,
      storeImGBOX: [],
      birthAry: [],
      loadingNumber: 1,
    };
  },
  created() {
    this.getInitialDate();
    this.initShare();
  },
  methods: {
    getInitialDate() {
      const newImgAry = BirthDayImgs();
      this.birthAry = newImgAry;
      const newAryPush = [];
      for (let i = 0; i < newImgAry.length; i += 1) {
        newAryPush.push(...newImgAry[i].imgStore);
      }
      this.ready(newAryPush.slice(0, 40));
    },
    initShare() {
      const url = `${window.location.origin}/fe/threeyears/index.html`;
      wxShare({
        api: `${window.location.origin}/gymwebsite/getJsapiSigna`, // 获取微信鉴权的接口地址,
        title: '冠寓三周年点亮仪式 百万好礼抽不停！', // 分享标题,
        debug: false,
        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致,
        img: 'https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/constract/DS3crsbVqEw.png', // 分享图标,
        desc: '点亮星光抽大奖，switch、kindle、戴森吹风机、租房大礼包等你来！', // 分享描述,
        type: '', // 分享类型,music、video或link，不填默认为link,
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空,
      });
    },
    ready(pics) {
      const picsAll = pics.map((picsAry) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = picsAry;
          img.onload = () => resolve(picsAry);
          img.onerror = () => reject(this.handleErrorImg(picsAry)); // 如果失败调用处理失败函数
        });
      });
      Promise.all(picsAll).then(() => {
        this.imgLoading = false;
      }).catch(() => {
        this.imgLoading = false;
      });
    },
    handleErrorImg(picsAry) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = picsAry;
        img.onload = () => resolve(picsAry);
        img.onerror = () => reject(this.handleErrorImg(picsAry));
      });
    },
  },
};
</script>


<style lang="less">
.BackImg{
  position: fixed;
  z-index: -10;
  width: 100%;
  left: 0px;
  top: 0px;
  height: 100%;
}
html,body{margin: 0px;padding: 0px;}
.LogoBackImgNew{
  width: 100%;
}
.BirthArea{
  width: 100%;
  text-align: center;
  margin: 0px 0px 10px 0px;
  padding: 0px;
  font-size: 24px;
  color: #fff6cf;
  margin-top: 60px;
}
.ImgMainBox{
  width: 100%;
  overflow: hidden;
  .EachCityImgs{
    height: 240px;
    width: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
    .BirthStoreImg{
      overflow: auto;
      width: 4000px;
      height: 240px;
      .EachImg{
        float: left;
        height: 240px;
      }
    }
  }
}
</style>
