<template>
  <div class="successCompont">
    <div class="activeStatus">
      <img class="StatusBack" src="https://guanyuoss.oss-cn-qingdao.aliyuncs.com/test/constract/-SQz0SISb_E.png?x-oss-process=image/resize,s_400/interlace,1/format,jpg" alt="">
      <!-- <img class="StatusClose" @click='CloseShaow' src="../assets/popclose.png" alt=""> -->
      <div v-if="status == 'NOT_START'" class="StatusText">很抱歉，活动暂未开启</div>
      <div v-if="status == 'NOT_START'" class="StartTime">开启时间：{{startTime}} </div>
      <div v-if="status == 'EXPIRED'" class="StatusText">很抱歉，活动已经结束了</div>
      <div v-if="status == 'EXPIRED'" class="EndBtn">下次赶早呦!</div>
      <div v-if="status == 'CLOSED'" class="CloseDown">很抱歉，活动暂时关闭了</div>
    </div>
    <div class="boxShadow" @click.stop></div>
  </div>
</template>

<script>
export default {
  name: 'showResponse',
  props: {
    status: String,
    startTime: String,
  },
  data() {
    return {
      showTitle: '', // 显示内容
      showBtnConent: '',
    };
  },
  created() {
  },
  methods: {
    // 关闭领取成功弹窗
    CloseShaow() {
      this.$emit('ShowStatusSend');
      console.log('关闭弹窗');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .activeStatus{
    width: 290px;
    height: 201px;
    line-height: 201px;
    position: fixed;
    z-index: 444;
    left: 50%;
    margin-left: -145px;
    top: 50%;
    margin-top: -100px;
    border-radius: 20px;
    text-align: center;
    .StatusBack{
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0px;
      top: 0px;
      z-index: -2;
      border-radius: 10px;
    }
    .StatusClose{
      width: 32px;
      height: 32px;
      position: absolute;
      bottom: -50px;
      left: 50%;
      margin-left: -16px;
    }
    .StatusText{
      width: 231px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      margin: 54px auto 0px;
      font-size: 21px;
      color: #703C0F;
      font-weight: 600;
    }
    .CloseDown{
      width: 231px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      margin: 69px auto 0px;
      font-size: 21px;
      color: #703C0F;
      font-weight: 600;
    }
    .EndBtn{
      width: 231px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      margin: 5px auto;
      font-size: 21px;
      color: #703C0F;
      font-weight: 600;
    }
    .StartTime{
      font-size: 15px;
      color: #703C0F;
      text-align: center;
      margin-top: 20px;
      height: 21px;
      line-height: 5px;
    }
  }
  .boxShadow{
    background: #000000;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 23;
  }
</style>
