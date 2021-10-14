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
    <div
      class="content"
      v-if="!userRoles"
      :style="{ transform: `scale(${1 / store.env.SCALE})` }"
    >
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
      <QR v-if="qrCodePath" :value="qrCodePath" :size="852" class="qr" />
      <van-loading
        class="qr"
        size="50%"
        v-if="!qrCodePath || qrCodeStatus !== 'VALID'"
      />
    </div>
    <div class="roles" v-if="userRoles">
      <CardA style="width: 100%; height: auto" title="身份选择">
        <ul class="list">
          <li
            v-for="item in userRoles"
            :key="item.id"
            @click="activeRoleId = item.id"
            class="role"
            :class="{ active: item.active }"
          >
            <span>
              {{ item.desc }}
            </span>
          </li>
          <li v-if="!userRoles.length && allowRoleList.length">
            对不起，该用户没有权限。
          </li>
          <li class="hr"></li>
          <li class="entry" @click="fetchSwitchRole" v-if="userRoles.length">
            进入
          </li>
          <li class="logout" @click="fetchLogout">
            <Icon type="back" />
          </li>
        </ul>
      </CardA>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from "dayjs";
import QR from "qrcode.vue";
import CardA from "@/components/CardA/Index.vue";
import Icon from "@/components/Icon/Index.vue";
import { Component } from "vue-property-decorator";
import { fetchLogout } from "@/service/auth/api/logout";
import { fetchQrconn } from "@/service/auth/api/sso/qrconn";
import { fetchQrurl } from "@/service/auth/api/sso/qrurl";
import { fetchSwitchRole } from "@/service/auth/switchRole";
import { removeStore } from "@/store";
import mitter, { EventName } from "@/utils/mitter";
import { Base } from "@/views/Base";
import { fetchRoleList } from "@/service/analysis/commandCabin/roleList";
import { iwant } from "@guanyu/shared";

@Component({
  components: { QR, CardA, Icon },
})
export default class Login extends Base {
  /**
   * 二维码字符串
   */
  qrCodePath = "";
  /**
   * 二维码状态
   */
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

  activeRoleId: null | number = null;

  allowRoleList: number[] = [];

  // { id: number; desc: string; active: boolean }[] = [];
  get userRoles() {
    if (!this.store.currentUser) return null;
    const { userRoleOrgs = [] } = this.store.currentUser;
    const list = [];
    for (const role of userRoleOrgs) {
      if (this.allowRoleList.includes(role.roleId)) {
        list.push(role);
      }
    }
    return list.map((role) => ({
      id: role.roleId,
      desc: role.roleName,
      // role.roleName +
      // " | " +
      // role.organizationInfos.map((org) => org.name).join("-"),
      active: role.roleId === this.activeRoleId,
    }));
  }

  async created() {
    await this.fetchLogout();
    /*
    if (!this.store.currentUser) {
      this.fetchQR();
    } else {
      this.activeRoleId = this.store.currentUser.roleId;
    }
    */
  }

  beforeDestroy() {
    clearTimeout(this.timer);
  }

  /**
   * 扫码成功后
   * token解析成功展示主岗
   * token解析失败重新请求
   */
  loginCallback() {
    if (this.store.currentUser) {
      this.activeRoleId = this.store.currentUser.roleId;
      this.fetchAllowRoleList();
    } else {
      // token失败-重新请求二维码
      this.fetchQR();
    }
  }

  /**
   * 请求二维码
   */
  async fetchQR() {
    this.qrCodePath = "";
    const response = await fetchQrurl(undefined, {
      showLoading: false,
      headers: { source: "oms" },
    });
    if (response?.status === "ok") {
      const data = iwant.object(response.data);
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
    const response = await fetchQrconn(
      {
        code: qrId,
        timestamp: dayjs().valueOf(),
      },
      { showLoading: false, headers: { source: "oms" } }
    );
    if (response?.status === "ok") {
      const data = iwant.object(response.data);
      const qrCodeStatus = this.idmStatus[data.status] || "VALID";
      this.qrCodeStatus = qrCodeStatus;
      if (qrCodeStatus === "CONFIRM") {
        // 登录成功 请求全局数据
        localStorage.setItem("token", data.token);
        mitter.emit(EventName.FetchGlobalData, this.loginCallback);
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
   * 切换角色
   */
  async fetchSwitchRole() {
    if (
      !this.store.currentUser ||
      !this.activeRoleId ||
      !this.allowRoleList.includes(this.activeRoleId)
    ) {
      return;
    }
    const switchCallback = () => {
      // 请求全局数据
      mitter.emit(EventName.FetchGlobalData);
      this.$router.push("/");
    };
    if (this.store.currentUser.roleId === this.activeRoleId) {
      switchCallback();
      return;
    }
    const response = await fetchSwitchRole({
      userId: this.store.currentUser.userId,
      roleId: this.activeRoleId,
      source: "oms",
    });
    if (response?.status === "ok") {
      localStorage.setItem("token", response.data.token);
      // 请求全局数据
      switchCallback();
    }
  }
  /**
   * 退出登录
   */
  async fetchLogout() {
    // 清空所有数据
    removeStore();
    await fetchLogout();
    localStorage.removeItem("token");
    this.store.currentUser = null;
    // 重新请求二维码
    this.timer = setTimeout(() => {
      this.fetchQR();
    }, 1000);
  }

  /**
   * 获取合法的角色列表
   */
  async fetchAllowRoleList() {
    const response = await fetchRoleList();
    if (response?.status === "ok") {
      this.allowRoleList = iwant.array(response.data);
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

  .roles {
    position: fixed;
    left: 0;
    right: 0;
    width: 1100px;
    margin: auto;
    bottom: 24%;
    z-index: 10;
    background: rgba(21, 48, 69, 0.8);
    backdrop-filter: blur(30px);
    border-radius: 20px;
    .list {
      color: #90a4c3;
      font-size: 40px;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      padding: 60px 0 0;
      li {
        @extend %flex-center;
        cursor: pointer;
        &:hover {
          color: #fff;
        }
      }
    }
    .role {
      width: 700px;
      height: 90px;
      background: #22475f;
      border: 2px solid #3b707d;
      border-radius: 4px;
      margin: 18px 0;
      box-sizing: border-box;
      &.active {
        border-color: #01f5f1;
        color: #fff;
        background: transparent;
        padding: 6px;
        span {
          @extend %flex-center;
          background: linear-gradient(
            181.25deg,
            rgba(1, 245, 241, 0) 10.53%,
            rgba(1, 245, 241, 0.48) 118.58%
          );
          border-radius: 2px;
          width: 100%;
          height: 100%;
        }
      }
    }
    .hr {
      width: 100%;
      height: 1px;
      margin: 42px 0 0;
      background: linear-gradient(
        90deg,
        rgba(83, 214, 255, 0.05) 0%,
        rgba(81, 128, 228, 0.5) 52.37%,
        rgba(83, 214, 255, 0.05) 104.91%
      );
    }
    .entry {
      width: 700px;
      height: 100px;
      background: #1d5e8f;
      backdrop-filter: blur(20px);
      border-radius: 10px;
      margin-top: 60px;
    }
    .logout {
      width: 100px;
      height: 100px;
      margin: 20px 0;
    }
    &::v-deep {
      .app-card-a-background {
        display: none;
      }
    }
  }
}
</style>
