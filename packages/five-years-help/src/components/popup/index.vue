<template>
  <transition name="fade" mode="out-in" v-if="isShow">
    <div class="ls-mask" @touchmove.prevent>
      <div class="ls-mask-window">
        <div class="popMain">
          <img
            class="conectImage"
            src="https://goyoo-assets.longfor.com/prod/app/tXakW3Qq5rr_zrPQpy26_Q.png"
          />
          <div class="descript errorText">{{ content }}</div>
        </div>
        <!-- <div class="ls-mask-footer">
          <div @click="onCancel">{{ cancelText }}</div>
          <div @click="onConfirm">{{ confirmText }}</div>
        </div> -->
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      title: "提示",
      content: null,
      cancelText: "取消",
      confirmText: "确认",
      cancel: Function,
      confirm: Function,
      isSync: false,
      isShow: false,
    };
  },
  methods: {
    onCancel() {
      if (!this.isSync) this.isShow = false;
      this.cancel();
    },
    onConfirm() {
      if (!this.isSync) this.isShow = false;
      this.confirm();
    },
  },
};
</script>
<style scoped>
#app {
  overflow: hidden;
}
.popMain {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("https://goyoo-assets.longfor.com/prod/app/w4pZhQSB-KIriqB2NLPtag.png") 0 0 no-repeat;
  background-size: contain;
  background-position: center;
  height: 335px;
  margin-top: 30%;
  color: #fff;
}
.errorText {
  margin-top: 32px;
}
.conectImage {
  width: 208px;
  height: 171px;
}
.tipsImage {
  background: url(https://goyoo-assets.longfor.com/prod/app/Ci2Pz6NOvtZpfQ9KiacGwQ.png) 0 0 no-repeat;
  background-size: contain;
  background-position: right;
  margin-right: 53px;
  margin-top: 20px;
  height: 107px;
}
.ls-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
}
.ls-mask-window {
  padding-top: 20px;
  width: 80%;
  /* background: white; */
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}
.ls-mask-window > h2 {
  text-align: center;
}
.ls-mask-content {
  padding: 20px;
  text-align: center;
}
.ls-mask-footer {
  height: 45px;
  border-top: 1px solid #f0f0f0;
  display: flex;
}
.ls-mask-footer > div {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
.ls-mask-footer > div:active {
  background: #fafafa;
}
.ls-mask-footer > div:nth-child(1) {
  border-right: 1px solid #f0f0f0;
  color: gray;
}
</style>
