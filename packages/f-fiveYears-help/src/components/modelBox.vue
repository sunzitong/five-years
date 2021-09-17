<template>
  <div class="popMainLayOut">
    <div class="popMain">
      <img class="conectImage" :src="backgroundUrl" />
      <div class="descript">{{ descript }}</div>
      <div class="btnConfirm" @click="handleConfirm">{{ buttonContext }}</div>
    </div>
    <div class="close" @click="handleClose"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
@Component
export default class MixinMask extends Vue {
  @Prop({ default: "发送至微信好友或群聊" }) descript!: string;
  @Prop({ default: "发送" }) buttonContext!: string;
  @Prop({
    default:
      "https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/leM0J9cHa0nFYMKh8U2DLQ.png",
  })
  backgroundUrl!: string;
  created() {
    // console.log(this.isShow,'this.isShow123');
  }
  @Emit("confirm") private handleConfirm() {
    console.log("confirm");
  }
  @Emit("closed") private handleClose() {
    console.log("closed");
  }
}
</script>
/* less也支持 */
<style lang="scss" scoped>
.van-overlay {
  z-index: 99999;
}
.popMainLayOut {
  position: relative;
  height: 100%;
}
.popMain {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/w4pZhQSB-KIriqB2NLPtag.png") 0 0 no-repeat;
  background-size: contain;
  background-position: center;
  height: 335px;
  position: relative;
  top: 25%;
  color: #fff;
}
.conectImage {
  width: 208px;
  height: 171px;
}
.close {
  position: absolute;
  background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/xr6Ep_zxVUCyFf_z1gr76g.png") 0 0 no-repeat;
  background-size: contain;
  background-position: center;
  height: 35px;
  width: 35px;
  position: fixed;
  left: 44%;
  bottom: 90px;
}
.descript {
  font-size: 15px;
}
.btnConfirm {
  background: url(https://goyoo-assets.longfor.com//prod/app/JTEYpVYQyxBFGYaFGSzRVQ.png)
    0 0 no-repeat;
  background-size: contain;
  background-position: center;
  width: 158.5px;
  height: 33.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #0E0748;
  margin-top: 25px;
}
</style>
