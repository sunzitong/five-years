<template>
  <div class="page__index">
    <div class="ruleBtn" @click="handleRule">活动规则</div>
    <div class="page_main">
      <div class="btnLogin" v-on:click="handleLogin"></div>
      <div class="over-time">2021年9月17日-2021年10月18日</div>
      <div class="tips" @click="handleGoHelp">登录后才可以发起助力呦！</div>
    </div>
    <!-- 弹窗模态框 -->
    <van-overlay :show="isShow" @click="handleClosed">
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
    document.title = "冠寓五周年助力活动";
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
      toLogin();
      return;
    }
  }
  handleGoHelp(): void {
    this.$router.push({
      path: "/myInvitation",
    });
  }
  handleRule(): void {
    this.isShow = true;
  }
  handleClosed(): void {
    this.isShow = false;
  }
  async getNum() {
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
  height: calc(100vh);
}
.over-time {
  position: absolute;
  bottom: 218px;
  color: #fff;
  text-shadow: 0px 0px 8px #fd08fe;
}
.tips {
  position: absolute;
  bottom: 62px;
  color: #fff;
  opacity: 0.7;
}

.page_main {
  display: flex;
  justify-content: center;
  bottom: 90px;
  background: url(https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/gtLfSv5iUOqV8UPbr5SqZQ.png)
    no-repeat;
  width: 375px;
  height: 890px;
  background-size: contain
}
.btnLogin {
  position: absolute;
  bottom: 89px;
  background: url(https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/6fj9IxRgs7xBWT5UxUXHkw.png) 0 0 no-repeat;
  background-size: cover;
  width: 242px;
  height: 44px;
}
.ruleBtn {
  position: fixed;
  display: flex;
  align-items: center;
  text-align: center;
  right: 0;
  top: 240px;
  width: 23px;
  height: 87px;
  font-weight: 500;
  font-weight: 500;
  color: #00FFFF;
  text-shadow: 0px 0px 12px #00fbfd, 0px 2px 4px rgb(0 0 0 / 89%);
  border: 1px solid #00FFFF;
  border-right: 0;
  border-radius: 12px 0 0 12px;
  z-index: 98;
}
</style>
