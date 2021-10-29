<template>
  <div class="down-box">
    <img class="logo" src="../assets/logo.png" alt="">
    <div class="logo-share">全新定义租住生活</div>
    <img class="down-handle" @click="handleDown" src="../assets/down_logo.png" alt="">
    <div class="down-text">下载冠寓APP</div>
    <div class="guide-brower" v-if="handleShadow" @touchmove.prevent @click="hideBrower">
      <img class="guid-img" src="../assets/rander.png" alt="">
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      handleShadow: false,
      id: null,
    };
  },
  created() {
  },
  methods: {
    getIsWxClient() {
      const ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) || ua.match(/micromessenger/i)) {
        return true;
      }
      return false;
    },
    handleDown() {
      if (this.getIsWxClient()) {
        // 微信环境 显示引导弹窗
        this.handleShadow = true;
        return;
      }
      window.location.href = 'https://android.myapp.com/myapp/detail.htm?apkName=com.guanyu.gy';
    },
    hideBrower() {
      this.handleShadow = false;
    },
  },
};
</script>
<style lang="less">
body, html{
  margin: 0px;
  padding: 0px,
}
html{width: 100%;height: 100%;}
body{width: 100%;height: 100%;}
.down-box{
  width: 100%;
  height: 100%;
  position: relative;
  background: url('https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/constract/2pWhvNCg5gQ.png?x-oss-process=image/resize,s_600/interlace,1/format,jpg')
              no-repeat
              0 center / 100% 100%;
}
.logo{
  width: 134px;
  height: 134px;
  position: absolute;
  left: 50%;
  margin-left: -67px;
  top: 183px;
}
.logo-share{
  height: 25px;
  line-height: 25px;
  color: #FFFFFF;
  text-align: center;
  position: absolute;
  top: 310px;
  font-size: 18px;
  font-weight: 400;
  font-family: 'PingFangSC-Regular,PingFang SC';
  left: 50%;
  transform: translate(-50%, 0);
  letter-spacing: 5px;
}
.down-handle{
  width: 125px;
  height: 125px;
  position: absolute;
  top: 450px;
  left: 50%;
  margin-left: -62.5px;
}
.down-text{
  text-align: center;
  font-size: 15px;
  color: rgba(255,255,255,1);
  position: absolute;
  top: 585px;
  left: 50%;
  transform: translate(-50%, 0);
  letter-spacing: 1px;
}
.open-browser{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 777;;
}
.guide-brower{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 777;
    background: rgba(0,0,0,0.7);
    .guid-img{
      width: 198px;
      height: 85px;
      position: absolute;
      right: 14px;
      top:6px;
    }
  }
</style>
