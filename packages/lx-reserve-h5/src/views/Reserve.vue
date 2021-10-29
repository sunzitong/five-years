<template>
  <div class="re_box">
    <GoToBack title="预定冠寓" />
    <div class="re_top"></div>
    <div class="re_card">
      <div class="re_city">{{ pageData.cityName }}</div>
      <div class="re_list">
        <div class="re_item" @click="onOpenCale()">
          <div class="re_item_title">入住</div>
          <div class="re_item_sub">{{ minLocalDateStr }}</div>
        </div>
        <div class="re_item night">
          <div class="re_item_title">{{ pageData.num }}晚</div>
        </div>
        <div class="re_item">
          <div class="re_item_title">离店</div>
          <div class="re_item_sub">{{ maxLocalDateStr }}</div>
        </div>
      </div>
      <div class="re_list button_list">
        <div class="button" @click="gotoStoreList">查询</div>
      </div>
    </div>
    <van-calendar
      title="起始日期选择"
      v-model="caleShow"
      color="#1989fa"
      @confirm="onConfirm"
      :default-date="minDate"
      :min-date="minDisableDate"
      :max-date="maxDisableDate"
    />
  </div>
</template>

<script lang="ts">
import { Component, Inject } from "vue-property-decorator";
import GoToBack from "@/components/GoToBack.vue";
import Base from "./Base";
import { getCityList, getUserByToken } from "@/api";
import { getToken, toLogin } from "@/utils/guanyu";
import moment from "moment";
import { stringify } from "qs";
// import TOP from "@/assets/img/reserve/top.png";

@Component({
  components: {
    GoToBack,
  },
})
export default class Index extends Base {
  @Inject() visitSource!: string;
  // app和小程序分享
  @Inject() share!: () => void;
  // 用户信息
  protected userInfo: any = {};
  // 城市列表
  protected cityList: Array<any> = [];
  // 城市列表
  protected pageData: any = { num: 0 };
  // 日期选择
  protected caleShow = false;
  // 最小时间日期
  protected defaultDate: any = new Date();
  // 最小时间日期
  protected minDate: any = new Date();
  // 最大时间日期
  protected maxDate: any = new Date();
  // 最大时间日期
  protected minDisableDate: any = new Date();
  // 最大时间日期
  protected maxDisableDate: any = new Date();
  // 最小字符串日期
  protected minDateStr: string | undefined;
  // 最大字符串日期
  protected maxDateStr: string | undefined;
  // 最小汉字日期
  protected minLocalDateStr: string | undefined = "";
  // 最大汉字日期
  protected maxLocalDateStr: string | undefined = "";

  mounted() {
    document.title = "预订冠寓";
    if (this.visitSource === "小程序") {
      this.share();
    }
    this.getPageData();
    this.getAuthData();
  }

  getPageData() {
    const {
      cityName = "北京",
      num = 0,
      timestamp = "1602208442736",
      startDate = moment().format("YYYY-MM-DD"),
      endDate = moment().format("YYYY-MM-DD"),
    } = this.$route.query;
    const timestampNum = Number(timestamp);
    this.pageData = {
      cityName,
      num,
    };
    const currentData = moment(timestampNum);
    console.log(startDate.toString());
    const startTime = moment(startDate.toString());
    this.minDate = startTime.toDate();
    this.defaultDate = this.currentData;
    this.maxDate = moment(endDate.toString()).toDate();

    this.setStartAndEndTime();
    // 当异动单开始日期为未来日期时，则默认入住日期为异动单开始日期
    if (currentData.isBefore(startTime, "day")) {
      this.minLocalDateStr = startTime.format("MM月DD日");
      return;
    }
    // 当异动单开始日期为当前日期
    if (currentData.isSame(startTime, "day")) {
      // 若当前时间为14:00之后, 则默认入住日期为第二天
      if (currentData.hour() >= 14) {
        this.minDate = moment(this.minDate).add(1, "day").toDate();
        this.defaultDate = this.minDate;
        this.setStartAndEndTime();
      } else {
        // 则默认入住日期为当天
        this.minDate = currentData.toDate();
        this.defaultDate = this.minDate;
        this.setStartAndEndTime();
      }
    }
    // 禁用选择时间区间
    // 如果当前默认时间大于可选最小时间，则禁用之前得时间
    if (moment(this.minDate).isAfter(moment(this.minDisableDate))) {
      this.minDisableDate = moment(this.minDate).toDate();
    } else {
      this.minDisableDate = currentData.toDate();
    }
    // 如果新增6天之后，时间大于结束时间，则使用hr-Π时间，否则，使用t+6时间进行禁用
    if (
      moment(this.minDate).add(6, "day").isBefore(moment(endDate.toString()))
    ) {
      this.maxDisableDate = moment(this.minDate).add(6, "day").toDate();
    } else {
      this.maxDisableDate = moment(endDate.toString()).toDate();
    }
    // 
  }

  /**
   * 获取用户信息
   */
  async getAuthData() {
    const res = await getUserByToken();
    if (!res) return;
    if (res.status === "ok") {
      /*  */
      this.userInfo = res.data;
    }
  }

  setStartAndEndTime() {
    const { num } = this.$route.query;
    this.maxDate = moment(this.minDate).add(Number(num), "day").toDate();
    this.minLocalDateStr = moment(this.minDate).format("MM月DD日");
    this.maxLocalDateStr = moment(this.maxDate).format("MM月DD日");
  }

  formatDate(date: Date): string {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  }

  onOpenCale(): void {
    this.caleShow = true;
  }

  onConfirm(date: Date) {
    this.caleShow = false;
    this.minDate = date;
    this.setStartAndEndTime();
  }

  // 跳转到门店列表
  gotoStoreList() {
    const {
      cityId,
      cityName,
      invoiceTitle,
      changeNo,
      name,
      token,
    } = this.$route.query;
    const { phone, userName } = this.userInfo;
    const url = stringify({
      startDate: moment(this.minDate).format("YYYY-MM-DD"),
      endDate: moment(this.maxDate).format("YYYY-MM-DD"),
      cityId,
      cityName,
      num: this.pageData.num,
      phone,
      invoiceTitle,
      changeNo,
      name,
      token,
      oaAccount: userName,
    });
    this.$router.push({
      path: `/storeList?${url}`,
    });
  }

  /**
   * 获取城市列表
   */
  async getCityList() {
    const res = await getCityList();
    if (!res) return;
    if (res.status === "ok") {
      /**/
      this.cityList = res.data;
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
.re_box {
  padding-top: 44px;
}
.re_top {
  width: 100%;
  height: 200px;
  background: url($VUE_APP_BASE_IMG + "reserve/top.png") no-repeat top left;
  background-size: 100% 100%;
}
.re_card {
  position: absolute;
  left: 12px;
  width: calc(100% - 64px);
  top: 164px;
  background: #ffffff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  .re_city {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 34px;
    color: #333333;
    padding-bottom: 15px;
    border-bottom: 1px solid #f8f8f8;
    padding-left: 10px;
  }
  .re_list {
    display: flex;
    align-items: center;
    justify-content: left;
    background-color: #fff;
    .re_item {
      text-align: left;
      padding: 10px;
      .re_item_title {
        font-size: 14px;
        color: #999999;
      }
      .re_item_sub {
        font-size: 14px;
        color: #000;
        margin-top: 10px;
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
}

.button_list {
  flex-direction: column;
  padding-top: 30px;
  .button {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    text-align: center;
    color: #fff;
    background: #3273eb;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  .button.order {
    height: 46px;
    line-height: 46px;
    width: calc(100% - 4px);
    color: #3273eb;
    background: #fff;
    border: 2px solid rgba(50, 115, 235, 0.1);
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
