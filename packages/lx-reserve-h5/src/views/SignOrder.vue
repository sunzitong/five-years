<template>
  <div class="so_bg">
    <GoToBack title="预定冠寓-填写订单信息" />
    <div class="so_top">
      <div class="so_top_title">{{ pageData.projectName }}</div>
      <div class="so_top_sub_title">
        {{
          `${pageData.startDate} 至 ${pageData.endDate} 共 ${pageData.num} 晚`
        }}
      </div>
    </div>
    <div class="so_card">
      <div class="so_card_top">
        {{ pageData.name }}
        <img :src="verifysrc" class="so_card_top_img" alt="" srcset="" />
      </div>
      <div class="so_card_idcard">
        身份证号
        <input
          v-model="idVal"
          class="so_card_bottom_l_input"
          placeholder="请输入身份证号"
        />
      </div>
      <div class="so_card_bottom">
        <div class="so_card_bottom_l">
          <img :src="phonesrc" class="so_card_bottom_img" alt="" />
          <span class="so_card_bottom_span" v-if="!editTel">{{ telVal }}</span>
          <input
            v-if="editTel"
            v-model="telVal"
            class="so_card_bottom_l_input"
            placeholder="请输入电话"
          />
        </div>
        <div class="so_card_bottom_r" @click="toggleEdit">
          {{ editTel ? "确认" : "修改" }}
        </div>
      </div>
    </div>
    <div class="so_bottom">
      <div class="so_bottom_title">OA账号</div>
      <input
        v-model="oaVal"
        class="so_bottom_input invoce"
        placeholder="请输入OA账号"
        disabled
      />
    </div>
    <div class="so_bottom">
      <div class="so_bottom_title">发票信息</div>
      <input
        v-model="pageData.invoiceTitle"
        class="so_bottom_input invoce"
        placeholder=""
        disabled
      />
      <!-- <div class="so_bottom_lenevo" v-if="editLenove">
        <van-cell
          v-for="item in lenoveList"
          :key="item"
          :title="item"
          @click="lenoveSure(item)"
        />
      </div> -->
    </div>
    <div class="detail_bottom">
      <div class="detail_bottom_l van-ellipsis">¥ 0</div>
      <div class="detail_bottom_r" @click="submitData">提交</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Inject } from "vue-property-decorator";
import Base from "./Base";
import { signNew, getInvoiceList } from "@/api";
import GoToBack from "@/components/GoToBack.vue";
import { getToken, toLogin } from "@/utils/guanyu";
import VERIFY from "@/assets/img/signOrder/verify.png";
import PHONE from "@/assets/img/signOrder/phone.png";
import { Dialog, Notify } from "vant";
import moment from "moment";

let timer = 0;

@Component({
  components: {
    GoToBack,
  },
})
export default class SignOrder extends Base {
  @Inject() visitSource!: string;
  // app和小程序分享
  @Inject() share!: () => void;
  // 城市列表
  protected pageData: any = {};
  // 认证图片
  protected verifysrc: string = VERIFY;
  // 电话图片
  protected phonesrc: string = PHONE;
  // 电话编辑
  protected editTel = false;
  // 电话值
  protected telVal = "15810567464";
  // oa值
  protected oaVal: any = "";
  // oa值
  protected idVal: any = "";
  // 联想编辑状态
  protected editLenove = false;
  // 联想数组
  protected lenoveList: Array<string> = [];

  mounted() {
    this.setPageDate();
    document.title = "预订冠寓";
    if (this.visitSource === "小程序") {
      this.share();
    }
  }

  setPageDate() {
    const {
      startDate,
      endDate,
      projectName,
      num,
      price,
      name,
      invoiceTitle,
      phone,
      oaAccount,
    } = this.$route.query;
    this.pageData = {
      startDate,
      endDate,
      projectName,
      num,
      price,
      name: name,
      invoiceTitle,
      oaAccount: oaAccount,
    };
    this.oaVal = oaAccount;
    this.telVal = phone && phone.toString();
  }

  // 跳转到我的订单
  gotoOrderList() {
    const { token, oaAccount } = this.$route.query;
    this.$router.push({
      path: `/orderList?oaAccount=${oaAccount}&token=${token}`,
    });
  }

  toggleEdit() {
    this.editTel = !this.editTel;
  }

  // lenoveSure(item: any) {
  //   this.invoceVal = item;
  //   this.lenoveList = [];
  //   this.editLenove = false;
  // }

  // invoiceFocus() {
  //   this.editLenove = true;
  // }

  // invoiceChange(e: any) {
  //   const val = e.target.value;
  //   if (timer) clearTimeout(timer);
  //   timer = setTimeout(async () => {
  //     const res = await getInvoiceList({ companyName: val });
  //     if (!res) return;
  //     if (res.status === "ok") {
  //       this.lenoveList = res.data;
  //     }
  //   }, 500);
  // }

  /**
   * 提交订单数据
   */
  submitData() {
    const {
      startDate,
      endDate,
      projectId,
      projectName,
      num,
      price,
      name,
      invoiceTitle,
      changeNo,
    } = this.$route.query;
    const data = {
      projectId, //门店id
      projectName, //门店名称
      startTime: moment(startDate.toString()).valueOf(), //预计入住时间
      endTime: moment(endDate.toString()).valueOf(), //预计离店时间
      dailyRentAmount: price, //单价
      userName: name && name.toString(), //入住人姓名
      phone: this.telVal, //手机号
      idType: "Id", //证件类型
      idNo: this.idVal, //身价证号
      invoiceTitle: invoiceTitle && invoiceTitle.toString(), //发票抬头
      oaAccount: this.oaVal, //oa账号
      daysGap: num, //住多少天
      changeNo,
    };
    if (!this.telVal || !/^1[3456789]\d{9}$/.test(this.telVal)) {
      Notify({ type: "danger", message: "请完善手机号" });
      return;
    }
    if (!this.oaVal) {
      Notify({ type: "danger", message: "请完善OA账号" });
      return;
    }
    if (!this.idVal) {
      Notify({ type: "danger", message: "请完善身份" });
      return;
    }
    Dialog.confirm({
      // title: "是否确认提交订单（请确认相关信息是否正确）?",
      message: "是否确认提交订单？如行程有变，请及时取消订单，避免额外费用产生",
      confirmButtonColor: "#1989fa",
    })
      .then(async () => {
        const res = await signNew(data);
        if (!res) return;
        if (res.status === "ok") {
          Notify({ type: "success", message: "提交成功" });
          this.gotoOrderList();
        } else {
          Notify({ type: "danger", message: res.msg || "提交失败" });
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
.so_bg {
  max-height: 100vh;
  background-color: #fff;
  padding-top: 44px;
}
.so_top {
  padding: 20px;
  .so_top_title {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    color: #333333;
  }
  .so_top_sub_title {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 17px;
    color: #666666;
  }
}
.so_card {
  width: 311px;
  height: 116px;
  background: linear-gradient(118.2deg, #e6f3ff 32.64%, #e2fcff 90.91%);
  border-radius: 20px;
  margin: 0 auto;
  padding: 20px;
  .so_card_top {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    color: #333333;
    line-height: 1;
    margin-top: 6px;
    .so_card_top_img {
      height: 20px;
      vertical-align: bottom;
    }
  }
  .so_card_idcard {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    color: #666666;
    margin-top: 7px;
    padding-bottom: 12px;
    border-bottom: 1px solid #d2ecfd;
    .so_card_bottom_l_input {
      width: 156px;
      border: none;
      // background: linear-gradient(118.2deg, #e6f3ff 32.64%, #e2fcff 90.91%);
      opacity: 1;
      padding: 5px 0 5px 10px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      background-color: rgba(0, 0, 0, 0);
    }
  }
  .so_card_bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    .so_card_bottom_l {
      font-family: PingFang SC;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      color: #333333;
      display: flex;
      align-items: center;
      .so_card_bottom_img {
        height: 18px;
        width: 18px;
        margin-right: 5px;
      }
      .so_card_bottom_span {
        display: inline-block;
        overflow: hidden;
        width: 156px;
        height: 28px;
        line-height: 28px;
      }
      .so_card_bottom_l_input {
        width: 156px;
        border: none;
        // background: linear-gradient(118.2deg, #e6f3ff 32.64%, #e2fcff 90.91%);
        opacity: 1;
        padding: 5px 0 5px 10px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      }
    }
    .so_card_bottom_r {
      font-family: PingFang SC;
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      text-align: center;
      color: #3273eb;
      border-radius: 40px;
      padding: 10px 40px;
      border: 2px solid #d2ecfd;
    }
  }
}
.so_bottom {
  margin: 0 20px;
  position: relative;
  .so_bottom_title {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    color: #666666;
    margin: 10px 0 0;
  }
  .so_bottom_input {
    width: 100%;
    border: none;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    color: #333333;
    padding: 10px 0 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }
  .so_bottom_input.invoce {
    background-color: #fff;
  }
  .so_bottom_lenevo {
    width: 100%;
    height: 200px;
    overflow: hidden;
    overflow-y: scroll;
    position: absolute;
  }
}
.detail_bottom {
  width: calc(100% - 20px);
  display: flex;
  position: absolute;
  bottom: 0;
  background-color: #fff;
  height: 50px;
  box-shadow: inset 0px 0.5px 0px rgba(0, 0, 0, 0.08);
  padding: 10px;
  padding-bottom: 10p + env(safe-area-inset-bottom);
  .detail_bottom_l {
    flex: 1;
    padding-left: 2px;
    height: 50px;
    line-height: 50px;
    font-family: Alibaba PuHuiTi;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    color: #3273eb;
  }
  .detail_bottom_r {
    width: 173px;
    height: 50px;
    line-height: 50px;
    background: #3273eb;
    border-radius: 8px;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    color: #fff;
    text-align: center;
  }
}
</style>
