<template>
  <div class="de_bg">
    <GoToBack :border="true" title="订单详情" />
    <div class="de_top">
      <img class="de_top_img" alt="" :src="donesrc" />
      <div class="de_top_title">{{ pageData.orderStatusDesc }}</div>
      <div class="de_top_sub">
        <div class="de_top_sub_status">{{ pageData.orderTypeDesc }}</div>
        <div class="de_top_sub_num">{{ pageData.orderNo }}</div>
      </div>
    </div>
    <div class="de_card">
      <div class="de_card_title">入住信息</div>
      <div class="de_card_item" v-for="item in stayInfo" :key="item.name">
        <div class="de_card_item_title">{{ item.name }}</div>
        <div class="de_card_item_desc">{{ item.desc }}</div>
      </div>
      <div class="de_card_title last">订单信息</div>
      <div class="de_card_item" v-for="item in orderInfo" :key="item.name">
        <div class="de_card_item_title">{{ item.name }}</div>
        <div v-if="!item.phone" class="de_card_item_desc">{{ item.desc }}</div>
        <div v-if="item.phone" class="de_card_item_desc">
          <a :href="`tel:${item.desc}`">{{ item.desc }}</a>
        </div>
      </div>
    </div>
    <div
      class="order_detail_bottom"
      v-if="
        pageData.orderStatus === 'TO_CONFIRM' ||
        pageData.orderStatus === 'RESERVED'
      "
    >
      <div class="order_detail_bottom_button" @click="submitData">取消订单</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Inject } from "vue-property-decorator";
import GoToBack from "@/components/GoToBack.vue";
import Base from "./Base";
import { cancelOrder, getOrderDetail } from "@/api";
import { getToken, toLogin } from "@/utils/guanyu";
import { formatDateLocal } from "@/utils/tools";
import DONE from "@/assets/img/orderDetail/done.png";
import { Dialog, Notify } from "vant";

@Component({
  components: {
    GoToBack,
  },
})
export default class OrderDetail extends Base {
  @Inject() visitSource!: string;
  // app和小程序分享
  @Inject() share!: () => void;
  // 图片地址
  protected donesrc = DONE;
  // 入住信息
  protected pageData: any = {};
  // 入住信息
  protected stayInfo: Array<any> = [];
  // 订单信息
  protected orderInfo: Array<any> = [];

  mounted() {
    this.getOrderDetail();
    document.title = "预订冠寓";
    if (this.visitSource === "小程序") {
      this.share();
    }
  }

  /**
   * 获取城市列表
   */
  async getOrderDetail() {
    const { orderId, oaAccount } = this.$route.query;
    const res = await getOrderDetail({
      oaAccount,
      orderId,
    });
    if (!res) return;
    if (res.status === "ok") {
      const { data } = res;
      this.pageData = data;
      this.stayInfo = [
        { name: "姓名", desc: data.userName },
        { name: "电话", desc: data.phone },
        { name: "证件类型", desc: data.idTypeDesc },
        { name: "证件号码", desc: data.idNo },
        { name: "发票抬头", desc: data.invoiceTitle },
        { name: "OA账号", desc: data.oaAccount },
      ];
      this.orderInfo = [
        { name: "所属公司", desc: data.companyName },
        { name: "入住门店", desc: data.projectName },
        { name: "门店地址", desc: data.projectAddress },
        { name: "门店电话", desc: data.projectPhone, phone: true },
        { name: "签约日期", desc: formatDateLocal(data.signDate) },
        { name: "预计入住日期", desc: formatDateLocal(data.startTime) },
        { name: "预计退房日期", desc: formatDateLocal(data.endTime) },
        { name: "实际入住日期", desc: formatDateLocal(data.checkinTime) },
        { name: "实际退房日期", desc: formatDateLocal(data.checkoutTime) },
        { name: "房间编号", desc: data.roomNo },
        { name: "日租金标准（元/天）", desc: data.dailyRentAmount },
      ];
    }
  }

  /**
   * 提交订单数据
   */
  submitData() {
    const { orderId, oaAccount } = this.$route.query;
    const data = {
      orderId, //门店id
      oaAccount, //门店名称
    };
    Dialog.confirm({
      title: "是否确认取消该订单?",
      confirmButtonColor: "#1989fa",
    })
      .then(async () => {
        const res = await cancelOrder(data);
        if (!res) return;
        if (res.status === "ok") {
          Notify({ type: "success", message: "取消成功" });
          this.getOrderDetail();
        } else {
          Notify({ type: "danger", message: res.msg || "取消失败" });
        }
      })
      .catch(() => {
        // on cancel
      });
  }

  login() {
    const token = getToken();
    // 未登录
    if (!token) {
      toLogin();
      return;
    }
  }
}
</script>

<style lang="scss">
.de_bg {
  padding-top: 44px;
  min-height: 100vh;
  background-color: #fff;
}
.de_top {
  background-color: #3273eb;
  padding: 20px 20px 20px;
  position: relative;
  z-index: 0;
  .de_top_img {
    width: 90px;
    position: absolute;
    right: 40px;
    bottom: 10px;
  }
  .de_top_title {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    color: #ffffff;
    line-height: 34px;
  }
  .de_top_sub {
    .de_top_sub_status {
      display: inline-block;
      background: #ffffff;
      border-radius: 4px;
      font-family: PingFang SC;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 17px;
      color: #3273eb;
      padding: 1px 2px;
    }
    .de_top_sub_num {
      display: inline-block;
      font-family: PingFang SC;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      color: #ffffff;
      margin-left: 6px;
    }
  }
}
.de_card {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 20px 20px 80px;
  position: relative;
  z-index: 1;
  background-color: #fff;
  margin-top: -10px;
  .de_card_title {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    color: #333333;
  }
  .de_card_title.last {
    margin-top: 25px;
  }
  .de_card_item {
    padding: 10px 0 14px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    .de_card_item_title {
      font-family: PingFang SC;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      color: #666666;
    }
    .de_card_item_desc {
      font-family: PingFang SC;
      font-style: normal;
      font-weight: normal;
      font-size: 17px;
      color: #333333;
      margin-top: 10px;
      a {
        color: #3273eb;
      }
    }
  }
}
.order_detail_bottom {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 1000;
  background: #ffffff;
  box-shadow: inset 0px 0.5px 0px rgba(0, 0, 0, 0.08);
  padding-bottom: env(safe-area-inset-bottom);
  .order_detail_bottom_button {
    width: 355px;
    height: 50px;
    line-height: 50px;
    border: 2px solid rgba(50, 115, 235, 0.1);
    box-sizing: border-box;
    border-radius: 8px;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    text-align: center;
    color: #3273eb;
    margin: 10px auto;
  }
}
.page__index {
  .header {
    font-size: 15px;
    text-align: center;
    .share {
      position: fixed;
      top: 20px;
      right: 0;
      width: 62px;
      height: 30px;
      font-size: 0;
      @extend %bg-img-share;
    }
  }
}
</style>
