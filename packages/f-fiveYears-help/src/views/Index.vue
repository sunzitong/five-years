<template>
  <div class="page__index">
    <div class="page_main">
      <div class="btnLogin" v-on:click="handleLogin"></div>
      <div class="over-time">2021年9月17日-2021年10月18日</div>
      <div class="tips">登录后才可以发起助力呦！</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Inject } from "vue-property-decorator";
import Base from "./Base";
import { getToken, toLogin } from "@/utils/guanyu";
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
  /**
   * 分享方法
   * 来源 App.vue中定义
   */
  @Inject() share!: () => void;
  isLogin = !getToken();
  popParm = {
    isShow: false,
    buttonContext: "发送",
    descript: "发送至微信好友或群聊",
  };
  time = 1631756689137;
  activeTab = 1;
  loading = false;
  mounted() {
    document.title = "冠寓五周年助力活动";
    if (this.visitSource === "小程序") {
      this.share();
    }
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
  handleSelectTab($event: any) {
    let tabIndex = $event.target.getAttribute("tabIndex");
    this.activeTab = tabIndex;
  }
  handleInvitation() {
    this.popParm.isShow = true;
    this.popParm.descript = "邀请好友助力";
    this.popParm.buttonContext = "邀请";
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
</style>
