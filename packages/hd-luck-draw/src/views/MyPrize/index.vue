<template>
  <div class="mt-prize">
    <div class="prize-List" v-for="item in prizeList" :key="item.id">
      <div class="top-cont">
        <div class="img-box">
          <img :src="item.prizeImg" alt />
        </div>
        <div class="b-title">
          <h2>{{item.name}}</h2>
          <div
            :class="[item.prizeType === 0 ? 'address-btn' : 'status']"
            @click="showAddr(item)"
          >{{setBtnText(item)}}</div>
        </div>
      </div>
      <div
        class="prize-tip"
      >{{item.prizeType === 0 ? '奖品在活动结束后7个工作日内进行派发,请保持手机畅通' : '折扣券发送至抽奖用户的账户中,登陆冠寓app后,租房时可自动减免房租'}}</div>
    </div>
    <Address :curPrize="curPrize" v-if="isShowAddr" @hideAddr="hideAddr()"></Address>
  </div>
</template>
<script lang="ts">
import "./index.scss";
import { Component } from "vue-property-decorator";
import Base from "../Base";
import to from "await-to-js";
import { getMyPrize } from "@/api";
import Address from "@/components/Address/index.vue";

@Component({
  components: {
    Address
  }
})
export default class Index extends Base {
  mounted() {
    window.zhuge.track("我的奖品页");
    document.title = "我的奖品";
    // 获取我的奖品列表
    this.getMyPrize();
  }

  prizeList: Array<Record<string, any>> = [];

  //  奖品id
  curPrize = {};

  //  是否显示地址弹窗
  isShowAddr = false;

  btnText = "填写收货信息";

  setBtnText(item: any) {
    if (item.prizeType !== 0) return "状态:已发放";
    if (item.prizeType === 0) {
      if (item.recipientName) {
        return "修改收货信息";
      }
      return "填写收货信息";
    }
  }

  /**
   * 获取奖品列表
   */
  async getMyPrize() {
    const [, res] = await to(getMyPrize());
    if (!res) return;
    if (res.code === 0) {
      this.prizeList = res.data;
    }
  }

  // 展示收货地址弹窗
  showAddr(item: any) {
    const { prizeType } = item;
    if (prizeType !== 0) return;
    this.curPrize = item;
    this.isShowAddr = true;
  }
  // 关闭收货地址弹窗
  hideAddr() {
    this.isShowAddr = false;
    this.getMyPrize();
  }
}
</script>
