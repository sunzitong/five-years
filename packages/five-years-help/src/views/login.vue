<template>
  <div class="page__index">
    <div class="ruleBtn" @click="handleRule">活动规则</div>
    <div class="page_main">
      <div class="btnLogin" @click="login"></div>
      <div class="over-time">{{ numberInfo.startTimeStr }}-{{ numberInfo.endTimeStr }}</div>
      <div class="tips">登录后才可以发起助力呦！</div>
    </div>
    <!-- 弹窗模态框 -->
    <van-overlay :show="isShow" @click="handleClosed" :lock-scroll="false">
      <modelBox :popType="1" @closed="handleClosed"></modelBox>
    </van-overlay>
  </div>
</template>

<script lang="ts">
import { Component, Inject } from "vue-property-decorator";
import Base from "./Base";
import { getToken, toLogin } from "@/utils/guanyu";
import { getNumber } from "@/service";
import modelBox from "@/components/modelBox.vue";
@Component({
  components: {
    modelBox,
  },
})
export default class Index extends Base {
  /**
   * 运行环境
   * 来源 App.vue中定义
   */
  @Inject() visitSource!: string;

  numberInfo: any = {}; //获取活动编号信息
  loading = false;
  isShow = false;
  mounted() {
    document.title = "新星集好运，租房更省力";
    this.getNumber();
  }
  handleLogin() {
    this.login();
  }
  /**
   * 调用App和小程序登录
   */
  login() {
    const token = getToken();
    // 未登录
    if (!token) {
      const backUrl: any = this.$route.query.backUrl;
      toLogin(decodeURIComponent(backUrl));
      return;
    }
  }
  handleRule(): void {
    this.isShow = true;
  }
  handleClosed(): void {
    this.isShow = false;
  }
  async getNumber() {
    const res = await getNumber({
      type: 1,
    });
    if ((res as any)?.code == "0") {
      this.numberInfo = res?.data;
    }
  }
}
</script>

/* less也支持 */
<style lang="scss" scoped>
.page__index {
  overflow: hidden;
  height: calc(103vh);
}
.over-time {
  position: absolute;
  top: 432px;
  color: #fff;
  text-shadow: 0px 0px 8px #fd08fe;
}
.tips {
  position: absolute;
  top: 586px;
  color: #fff;
  opacity: 0.7;
}

.page_main {
  display: flex;
  justify-content: center;
  bottom: 90px;
  background: url(https://goyoo-assets.longfor.com/prod/app/gtLfSv5iUOqV8UPbr5SqZQ.png)
    no-repeat;
  width: 375px;
  height: 890px;
  background-size: contain
}
.btnLogin {
  position: absolute;
  top: 533px;
  background: url(https://goyoo-assets.longfor.com/prod/app/6fj9IxRgs7xBWT5UxUXHkw.png) 0 0 no-repeat;
  background-size: cover;
  width: 242px;
  height: 44px;
}
.ruleBtn {
  position: fixed;
  display: flex;
  text-align: center;
  vertical-align: middle;
  align-items: center;
  right: -2px;
  top: 240px;
  width: 23px;
  height: 71px;
  font-weight: 500;
  font-weight: 500;
  color: #00FFFF;
  text-shadow: 0px 0px 12px #00fbfd, 0px 2px 4px rgb(0 0 0 / 89%);
  border: 1px solid #00FFFF;
  border-right: 0;
  border-radius: 12px 0 0 12px;
  z-index: 98;
  font-size: 12px;
  line-height: 15px;
}
</style>
