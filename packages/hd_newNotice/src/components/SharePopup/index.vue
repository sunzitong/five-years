<template>
  <div :class="[`sharePopup ${isShowStyle.shareIshow}`]">
    <div :class="[`fixedBj ${isShowStyle.fixedIsShow}`]" @click="cancelShare()"></div>
    <div :class="[`shareBox  ${isShowStyle.shareBoxIsShow}`]">
      <div class="shareBtnBox">
        <div class="weChat" @click='openShare()'>
          <i class="IconWechat"></i>
          分享给朋友
        </div>
        <div class="posters" @click="drawSharePosters()">
          <i class="iconPosters"></i>
          生成分享海报
        </div>
      </div>
    </div>
    <div class="guide-share" v-if="guideShare" @touchmove.prevent @click="hideShare">
      <img class="guid-img" src="../../assets/guide_share.png" alt="">
    </div>
  </div>
</template>


<script>

export default {
  name: 'SharePopup',
  props: [
    'isShowSharePopup',
    'isShowStyle',
  ],
  data() {
    return {
      guideShare: false,
    };
  },
  methods: {
    cancelShare() {
      this.$emit('cancelShare');
    },
    openShare() {
      this.guideShare = true;
    },
    hideShare() {
      this.guideShare = false;
    },
    drawSharePosters() {
      this.$emit('drawSharePosters');
      this.$emit('cancelShare');
    },
  },
};
</script>
<style lang="less" scope>
.sharePopup {
  position: fixed;
  left: 0;
  z-index: 300;
  width: 100%;
}
.hideShare {
  animation: show 0.5s forwards;
}
@keyframes hideShare {
  0% {
    bottom: 0;
  }
  100% {
    bottom: -10000px;
  }
}
.fixedBj {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  width: 100%;
  background: rgba(0,0,0,0.6);
  z-index: 100;
  display: none;
}
.shareBox {
  position: fixed;
  left: 0;
  bottom: -100%;
  width: 100%;
  z-index: 200;
  .shareBtnBox {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: #ffffff;
    box-sizing: border-box;
    width: 100%;
    padding: 30px 60px 40px 60px;
  }
  .weChat, .posters {
    text-align: center;
    font-size: 12px;
    color: #444444;
    i {
      display: block;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      margin: 0 auto;
    }
    .IconWechat {
      background: url('../../assets/wxShare.png') 0 0 no-repeat;
      background-size: 58px 58px;
    }
    .iconPosters {
      background: url('../../assets/wxCircle.png') 0 0 no-repeat;
      background-size: 58px 58px;
    }
  }
  .cancelBtn {
    background: rgba(255, 255, 255, 1);
    font-size: 16px;
    color: #999999;
    padding: 13px 0;
    text-align: center;
  }
}

.show {
  animation: show 0.5s forwards;
}
@keyframes show {
  0% {
    bottom: -195px;
  }
  100% {
    bottom: 0;
  }
}


.hide {
  animation: hide 0.5s forwards;
}
@keyframes hide {
  0% {

    bottom: 0;
  }
  100% {
    bottom: -195px;
  }
}


.showFixedBj {
    display: block;
    animation: showFixedBj 0.5s forwards;
  }
  @keyframes showFixedBj {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.5;
    }
  }

.guide-share{
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 777;
  background: rgba(0,0,0,0.7);
  .guid-img{
    width: 375px;
    position: absolute;
    left: 0;
    top: 6px;
  }
}

</style>
