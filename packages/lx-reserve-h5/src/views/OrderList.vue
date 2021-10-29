<template>
  <div class="order_list_bg">
    <GoToBack :border="true" title="订单列表" />
    <ul class="order_list_box">
      <van-list
        v-if="orderList.length"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getOrderList"
      >
        <li
          class="order_item"
          v-for="item in orderList"
          :key="item.orderId"
          @click="gotoOrderDetail(item)"
        >
          <div class="order_title">
            <span>订单号 {{ item.orderNo }}</span>
            <span class="active_status">{{ item.orderStatusDesc }}</span>
          </div>
          <div class="order_content">
            <h5 class="project_name">{{ item.projectName }}</h5>
          </div>
          <div class="re_list">
            <div class="re_item" @click="onOpenCale()">
              <div class="re_item_title">入住</div>
              <div class="re_item_sub">{{ item.startTime }}</div>
            </div>
            <div class="re_item night">
              <div class="re_item_title">{{ item.stayDay }}晚</div>
            </div>
            <div class="re_item">
              <div class="re_item_title">离店</div>
              <div class="re_item_sub">{{ item.endTime }}</div>
            </div>
          </div>
          <div class="or_people">
            <div class="or_people_title">入住人</div>
            <div class="or_people_bottom">
              <div class="or_people_name">{{ item.userName }}</div>
              <div class="or_people_status">{{ item.orderTypeDesc }}</div>
            </div>
          </div>
        </li>
      </van-list>
    </ul>
    <van-empty v-if="!orderList.length" description="暂无数据" />
  </div>
</template>

<script lang="ts">
import { Component, Inject } from "vue-property-decorator";
import GoToBack from "@/components/GoToBack.vue";
import Base from "./Base";
import { getOrderList } from "@/api";
import { getToken, toLogin } from "@/utils/guanyu";
import moment from "moment";

@Component({
  components: {
    GoToBack,
  },
})
export default class OrderList extends Base {
  @Inject() visitSource!: string;
  // app和小程序分享
  @Inject() share!: () => void;
  // 订单列表
  protected orderList: Array<any> = [];
  // 页码
  protected pageNum = 1;
  // loading
  protected loading = false;
  // loading
  protected finished = false;

  mounted() {
    this.getOrderList();
    document.title = "预订冠寓";
    if (this.visitSource === "小程序") {
      this.share();
    }
  }

  // 跳转到门店列表
  gotoOrderDetail(item: any) {
    const { token } = this.$route.query;
    const { orderId, oaAccount } = item;
    this.$router.push({
      path: `/orderDetail?orderId=${orderId}&oaAccount=${oaAccount}&token=${token}`,
    });
  }

  /**
   * 获取城市列表
   */
  async getOrderList() {
    const { oaAccount } = this.$route.query;
    const account = oaAccount || localStorage.getItem("oaAccount");
    const res = await getOrderList({
      orderType: "CHANGE_PLACE",
      oaAccount: account ? account.toString() : "",
      pageNum: this.pageNum,
      pageSize: 10,
    });
    if (!res) return;
    if (res.status === "ok") {
      /**/
      if (res.data.list && res.data.list.length === 0) {
        this.finished = true;
        this.loading = false;
      }
      const list = res.data.list.map((item: any) => {
        const { startTime, endTime } = item;
        return {
          ...item,
          startTime: moment(startTime).format("YYYY-MM-DD"),
          endTime: moment(endTime).format("YYYY-MM-DD"),
        };
      });
      this.orderList = this.orderList.concat(list || []);
      this.pageNum += 1;
    }
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
.order_list_bg {
  padding-bottom: env(safe-area-inset-bottom);
}
.order_list_box {
  padding-top: 44px;
}
.order_item {
  padding: 0px 18px;
  background-color: #fff;
  margin-top: 10px;
}
.order_title {
  height: 43px;
  font-weight: 500;
  font-size: 15px;
  line-height: 43px;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #f8f8f8;
  .active_status {
    color: #f14900;
  }
  .unactive_status {
    color: #666666;
  }
}
.order_content {
  padding-top: 10px;
  padding-bottom: 15px;
  .project_name {
    height: 25px;
    line-height: 25px;
    font-weight: 400;
    font-size: 18px;
  }
}
.re_list {
  display: flex;
  align-items: center;
  justify-content: left;
  background-color: #fff;
  .re_item {
    text-align: left;
    .re_item_title {
      font-size: 14px;
      color: #999999;
    }
    .re_item_sub {
      font-size: 14px;
      color: #000;
      margin-top: 5px;
    }
  }
  .re_item.night {
    flex: 1;
    .re_item_title {
      width: 65px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: #f8f8f8;
      border-radius: 15px;
      margin: 0 auto;
    }
  }
}
.or_people {
  text-align: left;
  padding: 15px 0 20px;
  .or_people_title {
    font-size: 14px;
    color: #999999;
  }
  .or_people_bottom {
    .or_people_name {
      display: inline-block;
      font-size: 14px;
      color: #000;
      margin-top: 5px;
    }
    .or_people_status {
      display: inline-block;
      font-family: PingFang SC;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      color: #3273eb;
      border: 2px solid rgba(0, 122, 255, 0.3);
      box-sizing: border-box;
      border-radius: 4px;
      padding: 1px 4px;
      margin-left: 6px;
    }
  }
}
</style>
