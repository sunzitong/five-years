<template>
  <div class="container">
    <div class="coupon">
      <div class="title">月付不涨价券</div>
      <div class="dash" />
      <div class="desc">签约时选择月付时，可以使用本券抵月付服务费</div>
    </div>
    <div class="revice-btn" @click="receiveMonthPayNotComeUp">立即领取</div>
    <div class="instructions">
      优惠券使用说明：
      <br />
      1.现阶段仅面向4级及以上用户，领取后可在【冠寓app-我的-优惠券】中查看。
      <br />
      2.该券同一用户同一自然年内只能使用一次，有效期截止至本年度12月31日。
      <br />
      3.使用时请提前兑换月付不涨价券后进行签约，并告知门店运营官。
    </div>
    <CommonConfirm
      v-if="showCommonConfirm"
      @confrimCb="confrimCb"
      :title="title"
      :desc="desc"
    />
  </div>
</template>

<script lang="ts">
import { Component, Inject } from "vue-property-decorator";
import { judgeSystem, judgeDevice } from "@guanyu/h5-tools";
import { Toast } from "vant";
import { requestReceiveMonthPayNotComeUp } from "@/service";
import CommonConfirm from "@/components/CommonConfirm.vue";
import { getToken, toLogin } from "@/utils/guanyu";
import { getQueries } from "@/utils/tools";
import Base from "./Base";

@Component({
  components: {
    CommonConfirm,
  },
})
export default class Index extends Base {
  @Inject() visitSource!: string;

  mounted() {
    document.title = "领取优惠券";
  }

  title = "";
  desc = "";
  showCommonConfirm = false;


  confrimCb() {
    this.showCommonConfirm = false;
  }

  /**
   * 会员领取月付不涨价接口
   */
  async receiveMonthPayNotComeUp() {
    const res = await requestReceiveMonthPayNotComeUp({
      activityNumber: 202106044536, //活动编号
      channel: "app", //渠道
      token: getQueries().token, // 渠道是app时，传token
      buCode: getQueries().buCode,
    });

    if (!res) return;

    const { code, msg } = res;
    if (+code === 0) {
      // 领取成功
      this.title = "领取成功！";
      this.desc =
        "恭喜您，成功领取到一张月付不涨价券，请到【冠寓APP-我的-优惠券】中查看。";
      this.showCommonConfirm = true;
    } else {
      // 领取失败
      this.title = "系统提示";
      this.desc = msg;
      this.showCommonConfirm = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  overflow: scroll;
  background: #ffffff;

  .coupon {
    background-image: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/jtPsa7i90LwKbzOu5wpS1A.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin: 24px 18px 0px 18px;
    min-height: 119px;
    position: relative;
    overflow: auto;

    .title {
      margin: 14px 20px 0px 20px;
      font-weight: bold;
      font-size: 20px;
      line-height: 28px;
      color: #f18d00;
      // overflow: hidden;
      // white-space: nowrap;
      // text-overflow: ellipsis;
    }

    .desc {
      margin: 8px 20px 21px 20px;
      font-size: 12px;
      line-height: 17px;
      color: #f18d00;
    }

    .dash {
      border: 0.5px dashed #ffddae;
      margin: 10px 15px 0px 15px;
      // position: absolute;
      // width: calc(100% - 30px);
      // top: 52px;
      // left: 15px;
    }
  }

  .revice-btn {
    cursor: pointer;
    margin: 20px 20px 0px 20px;
    height: 50px;
    background: #f18d00;
    border-radius: 8px;
    font-weight: 500;
    font-size: 17px;
    line-height: 50px;
    text-align: center;
    color: #ffffff;
  }

  .instructions {
    margin: 26px 20px 0px 20px;
    font-size: 12px;
    line-height: 17px;
    color: #999999;
  }
}
</style>
