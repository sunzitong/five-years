<template>
  <div class="address-popup">
    <div class="fixed" @click="hideAddr()"></div>
    <div class="main-cont">
      <h3>填写收货信息</h3>
      <!-- 关闭按钮 -->
      <div class="close-btn" @click="hideAddr()"></div>
      <div class="cont-box">
        <div class="input-box">
          <span class="label">手机号</span>
          <input type="number" placeholder="请输入手机号" v-model="params.recipientPhone" />
        </div>
        <div class="input-box">
          <span class="label">姓名</span>
          <input type="text" placeholder="请输入姓名" v-model="params.recipientName"  maxlength="24"/>
        </div>
        <div class="input-box">
          <span class="label">地址</span>
          <input type="text" placeholder="请输入地址" v-model="params.recipientAddr" maxlength="100" />
        </div>
      </div>
      <div class="submit-btn" @click="addressSubmit()">提交</div>
    </div>
  </div>
</template>

<script lang="ts">
import "./index.scss";
import { Component, Vue } from "vue-property-decorator";
import to from "await-to-js";
import { submitAddr } from "@/api";
import { Toast } from "vant";

@Component({
  props: ["curPrize"]
})
export default class Address extends Vue {
  params: Record<string, any> = {
    id: this.curPrize.id, // 奖品id
    recipientName: this.curPrize.recipientName, //收货人姓名
    recipientPhone: this.curPrize.recipientPhone, // 收货电话
    recipientAddr: this.curPrize.recipientAddr // 收货地址
  };

  checkItems() {
    if (!this.params.recipientPhone) {
      Toast("请输入收货人手机号");
      return;
    }
    if (
      !parseInt(this.params.recipientPhone) ||
      this.params.recipientPhone.length !== 11
    ) {
      Toast("请输入正确的手机号");
      return;
    }
    if (!this.params.recipientName) {
      Toast("请输入收货人姓名");
      return;
    }
    if (!this.params.recipientAddr) {
      Toast("请输入收货人地址");
      return;
    }
    return true;
  }
  /**
   * 提交收货地址
   */
  async addressSubmit() {
    // 校验必填项
    if (!this.checkItems()) return;
    const [, res] = await to(submitAddr(this.params));
    if (!res) return;
    if (res.code === 0) {
      Toast.success("提交成功");
      this.$emit("hideAddr");
    }
  }
  // 点击黑色透明蒙层关闭弹窗
  hideAddr() {
    this.$emit("hideAddr");
  }
}
</script>
