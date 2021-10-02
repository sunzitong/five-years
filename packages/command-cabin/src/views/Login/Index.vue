<template>
  <div class="page__login">
    <div class="background">
      <video
        style="width: 100%; height: 100%; object-fit: cover"
        :src="`${store.env.BASE_URL}video/loginbg.mov`"
        autoplay
        loop
        :poster="`${store.env.BASE_URL}video/poster.jpg`"
      ></video>
    </div>
    <div class="content">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 2070 2070"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_b)">
          <circle
            cx="1036"
            cy="1034"
            r="788.119"
            fill="#113069"
            fill-opacity="0.8"
          />
        </g>
        <g filter="url(#filter1_b)">
          <circle
            cx="1035"
            cy="1035"
            r="1035"
            fill="#153045"
            fill-opacity="0.8"
          />
        </g>
        <circle
          cx="1035.5"
          cy="1034.5"
          r="863.582"
          stroke="#68DFFF"
          stroke-width="4"
          stroke-dasharray="8 8"
        />
        <circle
          cx="1035.5"
          cy="1034.5"
          r="800.601"
          stroke="url(#paint0_linear)"
          stroke-width="52"
        />
        <circle
          cx="1035.5"
          cy="1034.5"
          r="707.982"
          stroke="#68DFFF"
          stroke-width="7"
          stroke-linejoin="round"
          stroke-dasharray="14 14"
        />
        <rect
          x="616.007"
          y="613.696"
          width="840.23"
          height="840.23"
          stroke="#8BF9FC"
          stroke-width="6"
        />
        <path
          d="M1513.43 557.451H1263.37L1293.79 588.828H1480.16V779.943L1513.43 806.566V557.451Z"
          fill="#8BF9FC"
        />
        <path
          d="M1513.43 1508.27H1263.37L1293.79 1476.89H1480.16V1285.78L1513.43 1259.16V1508.27Z"
          fill="#8BF9FB"
        />
        <path
          d="M561.663 557.451H811.729L781.303 588.828H594.942V779.943L561.663 806.566V557.451Z"
          fill="#8BF9FC"
        />
        <path
          d="M561.663 1508.27H811.729L781.303 1476.89H594.942V1285.78L561.663 1259.16V1508.27Z"
          fill="#8BF9FB"
        />
        <defs>
          <filter
            id="filter0_b"
            x="227.88"
            y="225.881"
            width="1616.24"
            height="1616.24"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImage" stdDeviation="10" />
            <feComposite
              in2="SourceAlpha"
              operator="in"
              result="effect1_backgroundBlur"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_backgroundBlur"
              result="shape"
            />
          </filter>
          <filter
            id="filter1_b"
            x="-30"
            y="-30"
            width="2130"
            height="2130"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImage" stdDeviation="15" />
            <feComposite
              in2="SourceAlpha"
              operator="in"
              result="effect1_backgroundBlur"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_backgroundBlur"
              result="shape"
            />
          </filter>
          <linearGradient
            id="paint0_linear"
            x1="1035.5"
            y1="958.037"
            x2="1035.5"
            y2="1861.1"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#8BF9FB" />
            <stop offset="1" stop-color="#6FD5DD" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <QR :value="qrCodePath" class="qr" v-if="qrCodePath" />
      <van-loading
        class="qr"
        size="50%"
        v-if="!qrCodePath || qrCodeStatus !== 'VALID'"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base } from "@/views/Base";
import { fetchQrurl } from "@/service/auth/api/sso/qrurl";
import { fetchQrconn } from "@/service/auth/api/sso/qrconn";
import dayjs from "dayjs";
import mitter, { EventName } from "@/utils/mitter";
import QR from "qrcode.vue";
import { fetchToken } from "@/service/auth/token";
import { fetchSwitchRole } from "@/service/auth/switchRole";

/**营造盘面详情 */
@Component({
  components: { QR },
})
export default class Login extends Base {
  qrCodePath = "";
  qrCodeStatus = "VALID";
  timer = -1;
  idmStatus = {
    1: "CONFIRM", // 二维码已扫描，已确认登录
    2104: "INVALID", // 参数为空或者不符合规则
    4209: "INVALID", // 无效二维码（非法，不存在，过期超过N小时）
    4219: "VALID", //  二维码未扫描，查询超时。
    4220: "SCANNED", //  二维码无效，已扫描，已登录。
    4221: "CANCEL", //  二维码无效，已扫描，已取消登录
    4222: "INVALID", //  二维码已过期。（是N小时内生成的，已过期）
    4223: "INVALID", //  二维码无效。（无效的二维码，或过期时间已经超过N小时）
    CONFIRM: "CONFIRM", //  成功
    INVALID: "INVALID", //  失败
    VALID: "VALID", //  轮询
    SCANNED: "SCANNED", //  已扫描
    CANCEL: "CANCEL", //  已取消
  };

  created() {
    this.fetchQR();
  }

  beforeDestroy() {
    clearTimeout(this.timer);
  }

  /**
   * 请求二维码
   */
  async fetchQR() {
    this.qrCodePath = "";
    const response = await fetchQrurl({ source: "oms" });
    if (response?.status === "ok") {
      const { data } = response;
      const path = `longfor://login/scanCode?name=${encodeURIComponent(
        data.appName
      )}&id=${encodeURIComponent(data.qrId)}`;
      this.qrCodePath = path;
      this.qrCodeStatus = "VALID";
      // 开始轮询二维码
      this.timer = setTimeout(() => {
        this.fetchQRStatus(data.qrId);
      }, 5000);
    } else {
      // 重新请求二维码
      this.timer = setTimeout(() => {
        this.fetchQR();
      }, 5000);
    }
  }
  /**
   * 轮询二维码
   */
  async fetchQRStatus(qrId: string) {
    const response = await fetchQrconn({
      code: qrId,
      timestamp: dayjs().valueOf(),
      source: "oms",
    });
    if (response?.status === "ok") {
      const {
        data: { status, token },
      } = response;
      const qrCodeStatus = this.idmStatus[status] || "VALID";
      this.qrCodeStatus = qrCodeStatus;
      if (qrCodeStatus === "CONFIRM") {
        // 登录成功
        this.successCallback(token);
        return;
      }
      if (qrCodeStatus === "INVALID") {
        // 二维码失效-重新请求二维码
        this.fetchQR();
        return;
      }
    }
    // 登录失败-轮询
    this.timer = setTimeout(() => {
      this.fetchQRStatus(qrId);
    }, 3000);
  }
  /**
   * 登录成功回调
   */
  successCallback(token: string) {
    localStorage.setItem("token", token);
    mitter.emit(EventName.UpdateGlobalData);
    this.$router.push("/");
  }
  /**
   * 获取用户信息
   */
  async fetchCurrentUser() {
    const response = await fetchToken();
    if (response?.status === "ok") {
      this.store.currentUser = response.data;
    }
  }
  /**
   * 切换角色
   */
  async switchRole() {
    if (!this.store.currentUser) return;
    const response = await fetchSwitchRole({
      userId: this.store.currentUser.userId,
      roleId: this.store.currentUser.roleId,
      source: "oms",
    });
    if (response?.status === "ok") {
      this.successCallback(response.data.token);
    }
  }
}
</script>

<style lang="scss" scoped>
.page__login {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .background {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
  }

  .content {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    width: 15vw;
    height: 15vw;
    margin: auto;
  }
  .qr {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 43%;
    height: 43%;
    &::v-deep canvas {
      width: 100% !important;
      height: 100% !important;
    }
    @extend %flex-center;
    line-height: 100%;
    background: #14314c;
    color: #8cf8fa;
  }
}
</style>
