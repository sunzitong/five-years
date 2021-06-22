<template>
  <div class="container">
    <div class="coupon">
      <div class="title">月付不涨价券</div>
      <div class="dash" />
      <div class="desc">签约时选择月付时，可以使用本券抵月付服务费</div>
    </div>
    <div class="revice-btn" @click="receiveMonthPayNotComeUp">
      立即领取1
    </div>
    <div class="instructions">
      优惠券使用说明：
      <br />
      1.现阶段仅面向5级用户开放，可在冠寓APP“我的”-“花珑珠”-“月付不涨价券”免费领取。
      <br />
      2.同一用户一个自然年内只能使用一次月付不涨价券。
      <br />
      3.此优惠券的有效期为本年度12月31日，过期作废
      <br />
      4.月付不涨价券”不可与其他优惠同时使用
      <br />
      5.已领取的“月付不涨价券”请到冠寓APP“我的”——“优惠券”中查看
      <br />
      6.此券可在全国所有冠寓门店通用。
      <br />
      7.请在操作签约前提前兑换月付不涨价券，并告知门店运营官您要使用该券。
      <br />
      8.珑珠抵扣金额部分不支持开具发票
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
    // if (this.isWeiXinInner() === -1) {
    //   this.isWeiXin = false;
    // } else {
    //   this.isWeiXin = true;
    // }
  }

  title = "";
  desc = "";
  showCommonConfirm = false;

  // head() {
  //   return {
  //     title: "付款方式",
  //   };
  // }

  confrimCb() {
    this.showCommonConfirm = false;
  }

  /**
   * 会员领取月付不涨价接口
   */
  async receiveMonthPayNotComeUp() {
    console.log(1)
    const token = getToken();
    // 未登录
    if (!token) {
      console.log(2)
      toLogin();
      return;
    }
    const res = await requestReceiveMonthPayNotComeUp({
      activityNumber: 202106044536, //活动编号
      channel: "app", //渠道
      token, // 渠道是app时，传token
      buCode:
        judgeDevice() === "小程序"
          ? "C30403"
          : judgeSystem() === "isIos"
          ? "C30603"
          : "C30503", //ios来的传C30603 安卓来的传C30503
    });

    if (!res) return;

    const { code, msg } = res;
    if (+code === 0) {
      // 领取成功
      this.title = "领取成功！";
      this.desc =
        "恭喜您，成功领取到一张月付不涨价券，请到冠寓APP 我的-优惠券中查看。";
      this.showCommonConfirm = true;
    } else {
        // 领取失败
      this.title = "系统提示";
      this.desc = msg;
      this.showCommonConfirm = true;
    }
    // if (!res || res.status === "fail") return;
    // if (res.code === 10000) {
    //   const { rentQtyDescList = [] } = res.data;
    //   this.payModeList = rentQtyDescList;
    // } else {
    //   Toast.fail(res.message);
    // }
  }

  // 判断是否在微信里
  // isWeiXinInner() {
  //   return navigator.userAgent.toLowerCase().indexOf("micromessenger");
  // }
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
