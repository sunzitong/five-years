<template>
  <div id="sharePosters">
    <div class="fixedBjPosters" @click="closePoster()"></div>
    <div class="canvasBox">
      <div class="posterBox">
        <div class="imgBox">
          <img :src="storeDetail.coverImgUrl" alt="">
        </div>
        <div class="infoBox">
          <h2 class="titleInfo">{{storeDetail.title}}</h2>
          <p class="projectInfo">{{setProjectInfo()}}</p>
          <p class="timeInfo">{{storeDetail.activityTimeStr}}</p>
        </div>
        <div class="footerImg">
          <img :src='footerImgBase' alt="">
          <div class="qrCode">
            <img :src='codeImg' alt="">
          </div>
        </div>
      </div>
      <!-- 保存按钮 -->
      <div class="saveButton" @click="downLoadImg()"></div>
    </div>
  </div>
</template>
<script>
import footerImgBase from '@/assets/base@2x.png';
import miniCodeImg from '@/assets/miniCodeImg.jpg';
import Vue from 'vue';
import { Toast } from 'vant';
import 'vant/lib/index.css';

Vue.use(Toast);

export default {
  name: 'SharePosters',
  props: ['storeDetail', 'shortUrl'],
  data() {
    return {
      codeImg: '',
      footerImgBase,
      miniCodeImg,
    };
  },
  mounted() {
    // 正式站
    let domain = 'm.iguanyu.com';
    // 测试站
    if (window.location.href.includes('m.test109.iguanyu.com') || process.env.NODE_ENV === 'development') {
      domain = 'm.test109.iguanyu.com';
    }
    // 预上线
    if (window.location.href.includes('m.staging.iguanyu.com')) {
      domain = 'm.staging.iguanyu.com';
    }
    if (this.getQueryVariable('isPreview')) {
      this.codeImg = miniCodeImg;
    } else {
      this.codeImg = `http://${domain}/webapp/mini/getQRCode?key=${encodeURIComponent(this.shortUrl)}&page=packageA/pages/bearWeb/bearWeb&hyaline=true`;
    }
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
    setProjectInfo() {
      let projectInfo = '';
      if (Array.isArray(this.storeDetail.projects) && this.storeDetail.projects.length > 2) {
        projectInfo = `${this.storeDetail.projects[0].projectName}　${this.storeDetail.projects[1].projectName} ...`;
        return projectInfo;
      }
      return this.storeDetail.projectstr;
    },
    downLoadImg() {
      Toast('截图保存后分享给好友吧');
    },
    closePoster() {
      this.$emit('closePoster');
    },
  },
};
</script>
<style lang="less">
  #sharePosters {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    z-index: 500;
  }
  .fixedBjPosters {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    width: 100%;
    background: #000000;
    z-index: 200;
  }
  .canvasBox {
    position: relative;
    left: 0;
    top: 10%;
    margin: 0 auto;
    z-index: 300;
    width: 100%;
    background: #FFFFFF;
    .posterBox {
      margin: 0 10px;
      padding-top: 10px;
      .imgBox {
        width: 100%;
        padding: 37.4% 0;
        position: relative;
        overflow: hidden;
        border-radius: 8px;
        margin: 0 auto;
        img {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 100%;
          transform: translate(-50%, -50%);
        }
      }
      .infoBox {
        padding: 0 8px;
        h2, p {
          margin: 0;
          padding: 0;
        }
        h2 {
          font-size: 20px;
          color: #333333;
          line-height: 28px;
          padding-top: 12px;
        }
        .projectInfo {
          font-size: 15px;
          color: #F18D00;
          line-height: 21px;
          padding-top: 6px;
        }
        .timeInfo {
          font-size: 14px;
          color: #666666;
          line-height: 20px;
          padding-top: 6px;
        }
      }
      .footerImg {
        position: relative;
        padding-top: 22px;
        img {
          width: 100%;
          display: block;
        }
        .qrCode {
          position: absolute;
          right: 10px;
          bottom: 10px;
          width: 19.41%;
          height: 82%;
          background: url('../../assets/QR.png') 0 0 no-repeat;
          background-size: 100%;
          // padding:
          img {
            margin: 0 auto;
            width: 88%;
            height: 88%;
            margin: 0 auto;
            background: #ffffff;
            margin-top: 6%;
          }
        }
      }
    }
  }
  .saveButton {
    position: absolute;
    left: 50%;
    bottom: -91px;
    transform: translateX(-50%);
    width: 65px;
    height: 65px;
    background: url('../../assets/btn_save.png') 0 0 no-repeat;
    background-size: 65px 65px;
  }
</style>
