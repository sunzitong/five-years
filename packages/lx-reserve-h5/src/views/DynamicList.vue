<template>
  <div class="order_list_bg">
    <GoToBack :border="true" title="我的异动单" />
    <ul class="order_list_box">
      <van-list
        v-if="orderList.length"
        v-model="loading"
        :finished="true"
        finished-text="没有更多了"
        @load="getOrderList"
      >
        <li
          class="order_item"
          v-for="item in orderList"
          :key="item.orderId"
          @click="gotoReserve(item)"
        >
          <div class="order_title">
            <span>异动单号: {{ item.changeNo }}</span>
            <img class="active_arrow" :src="arrowsrc" />
          </div>
          <div class="re_list">
            <div class="re_item">
              <div class="re_item_title">可办理入住时段</div>
              <div class="re_item_sub">
                {{ item.startDate + " 至 " + item.endDate }}
              </div>
            </div>
          </div>
          <div class="re_list last">
            <div class="re_item">
              <div class="re_item_title">临时入住天数</div>
              <div class="re_item_sub">{{ item.stayDay }}</div>
            </div>
            <div class="re_item last">
              <div class="re_item_title">调入城市</div>
              <div class="re_item_sub">{{ item.cityName }}</div>
            </div>
          </div>
        </li>
      </van-list>
    </ul>
    <van-empty v-if="!orderList.length" description="暂无数据" />
    <div class="orderButton" @click="gotoOrderList">我的订单</div>
  </div>
</template>

<script lang="ts">
import { Component, Inject } from "vue-property-decorator";
import GoToBack from "@/components/GoToBack.vue";
import qs from "qs";
import moment from "moment";
import { Toast } from "vant";
import Base from "./Base";
import { getChangeList, getUserByToken } from "@/api";
import { getToken, toLogin } from "@/utils/guanyu";
import ARROWRIGHT from "@/assets/img/arrow-right.png";
// import moment from "moment";

@Component({
  components: {
    GoToBack,
  },
})
export default class OrderList extends Base {
  @Inject() visitSource!: string;
  // app和小程序分享
  @Inject() share!: () => void;
  // 时间戳
  protected timestamp: any = 1605867390000;
  // 用户信息
  protected userInfo: any = {};
  // 电话图片
  protected arrowsrc: string = ARROWRIGHT;
  // 订单列表
  protected orderList: Array<any> = [];
  // 页码
  protected pageNum = 1;
  // loading
  protected loading = false;
  // loading
  protected finished = false;

  mounted() {
    this.getAuthData();
    document.title = "预订冠寓";
    if (this.visitSource === "小程序") {
      this.share();
    }
  }

  // 跳转到时间选择页
  gotoReserve(item: any) {
    const { token } = this.$route.query;
    const {
      orderId,
      cityId,
      cityName,
      stayDay,
      budgetBearer,
      changeNo,
      userName,
      startDate = 1605692253000, // 2020-11-18
      endDate = 1605692253000, // 2020-11-18
    } = item;
    const params = {
      cityId,
      cityName,
      orderId,
      timestamp: this.timestamp,
      num: stayDay,
      invoiceTitle: budgetBearer,
      changeNo,
      name: userName,
      token,
      startDate: moment(startDate).format("YYYY-MM-DD"),
      endDate: moment(endDate).format("YYYY-MM-DD"),
    };
    // 早于开始前7天
    const before = moment(this.timestamp)
      .add(7, "day")
      .isBefore(moment(startDate), "day");
    // 晚于最晚一天以上
    const after = moment(this.timestamp).isAfter(moment(endDate), "day");
    if (before || after) {
      Toast.fail("当前日期不在可下单时间段内，请进行核实");
    } else {
      console.log(moment(startDate).isBefore(moment(this.timestamp), "day"));
      // 如果预计入住开始时间晚于当前时间，则当天即为预计入住开始时间
      if (moment(startDate).isBefore(moment(this.timestamp), "day")) {
        params.startDate = moment(this.timestamp).format("YYYY-MM-DD");
      }
      this.$router.push({
        path: `/reserve?${qs.stringify(params)}`,
      });
    }
  }

  // 跳转到我的订单
  gotoOrderList() {
    const { token } = this.$route.query;
    const { userName } = this.userInfo;
    this.$router.push({
      path: `/orderList?oaAccount=${userName}&token=${token}`,
    });
  }

  /**
   * 获取用户信息
   */
  async getAuthData() {
    const { token } = this.$route.query;
    const res = await getUserByToken();
    if (!res) return;
    if (res.status === "ok") {
      /*  */
      this.userInfo = res.data;
      const { userName } = this.userInfo;
      localStorage.setItem("oaAccount", userName);
      localStorage.setItem("token", token && token.toString());
      this.getOrderList();
    }
  }

  /**
   * 获取城市列表
   */
  async getOrderList() {
    const { userName } = this.userInfo;
    const res = await getChangeList({
      oaAccount: userName && userName.toString(),
    });
    if (!res) return;
    if (res.status === "ok") {
      /**/
      this.timestamp = res.timestamp;
      if (res.data && res.data.length === 0) {
        this.finished = true;
        this.loading = false;
      }
      this.orderList = res.data.map((item: any) => {
        const { startDate, endDate } = item;
        return {
          ...item,
          startDate: moment(startDate).format("YYYY-MM-DD"),
          endDate: moment(endDate).format("YYYY-MM-DD"),
        };
      });
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
  padding-bottom: 50px;
}
.order_item {
  padding: 0px 18px;
  background-color: #fff;
  margin-top: 10px;
}
.order_title {
  height: 43px;
  font-family: PingFang SC;
  font-weight: 500;
  font-size: 15px;
  color: #333333;
  line-height: 43px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #f8f8f8;
  .active_arrow {
    height: 10px;
    width: 3px;
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
  margin-top: 10px;
  .re_item {
    text-align: left;
    .re_item_title {
      font-family: PingFang SC;
      font-size: 12px;
      color: #666666;
    }
    .re_item_sub {
      font-size: 15px;
      color: #333333;
      margin-top: 0;
    }
  }
  .re_item.last {
    margin-left: 36px;
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
.re_list.last {
  margin-top: 15px;
  padding-bottom: 10px;
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
.orderButton {
  height: 46px;
  line-height: 46px;
  width: calc(100% - 4px);
  font-family: PingFang SC;
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  text-align: center;
  color: #3273eb;
  background: #fff;
  border: 2px solid rgba(50, 115, 235, 0.1);
  border-radius: 8px;
  position: fixed;
  bottom: 0;
}
</style>
