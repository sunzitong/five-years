<template>
  <div class="page__index">
    <header class="header">
      <div
        id="wxLaunchBox"
        v-html="
          renderDom(
            'https://goyoo-assets.longfor.com/test/app/d5ZnuZTaRUaGjmplRJjVTA.png'
          )
        "
      ></div>
      <a @click="handleGoPage">打开小程序</a>
      <aside class="share" @click="share">分享</aside>
    </header>
    <main class="main">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
      >
        <van-cell
          v-for="item in list"
          :key="item.id"
          :title="item.value"
          :label="item.name"
        />
      </van-list>
    </main>
    <aside>
      <van-button
        type="info"
        @click="show = true"
        style="position: fixed; top: 0"
      >
        说明
      </van-button>
      <van-popup
        v-model="show"
        position="right"
        :style="{
          height: '100%',
          width: '80%',
          padding: '20px',
          boxSizing: 'border-box',
        }"
      >
        <p>
          <a
            href="https://www.npmjs.com/package/vue-property-decorator"
            target="_blank"
          >
            <span>
              <van-icon name="info-o" />
              【装饰器】
            </span>
            更多装饰器用法参考vue-property-decorator
          </a>
        </p>
        <p>
          <span>
            <van-icon name="info-o" />
            【mock】
          </span>
          直接使用yapi mock平台的代理，配置vue.config.js
          <a href="http://docs.gyapt.cn/mock/">http://docs.gyapt.cn/mock/</a>
        </p>
        <p>
          <span>
            <van-icon name="info-o" />
            【mock】
          </span>
          本地mock需要进入mock目录安装依赖，mock代码写在 /mock/routes
          中，启动项目用npm run dev
        </p>
        <p>
          <span>
            <van-icon name="info-o" />
            【store】
          </span>
          全局数据在 /src/store
          中，组件继承Base则会mixin到组件中，通过this直接读写，未使用vuex
        </p>
        <p>
          <span>
            <van-icon name="info-o" />
            【EventBus】
          </span>
          事件总线，使用第三方库mitt（与Vue无关），参考 /src/utils/mitter.ts
        </p>
        <p>
          <span>
            <van-icon name="info-o" />
            【调试】
          </span>
          除了通过浏览器扩展外，可以通过 window.PAGE 和 window.VIEW
          变量查看当前页面组件和顶层Vue实例，仅开发模式有效。
        </p>
        <p>
          <span>
            <van-icon name="info-o" />
            【css】
          </span>
          /src/assets/ 中有预定义一些scss样式，在.vue组件中可以直接使用
          bg-img.scss 和 variable.scss 中的预定义变量。
        </p>
        <p>
          <span>
            <van-icon name="info-o" />
            【css】
          </span>
          支持less。
        </p>
        <p>
          <span>
            <van-icon name="info-o" />
            【自适应】
          </span>
          Vue.rpx和Vue.prototype.$rpx是当前html的fontSize值，自适应变化；
        </p>
        <p>
          <span>
            <van-icon name="info-o" />
            【自适应】
          </span>
          Vue.rem和Vue.prototype.$rem是rem计算系数(默认100，不会变化)，即375px宽时，$rpx==$rem==100，100px==1rem;
        </p>
        <p>
          <span>
            <van-icon name="info-o" />
            【自适应】
          </span>
          如果第三方UI组件或者其他不兼容的情况，在vue.config.js中配置转换为vw单位即可；
        </p>
        <p>
          <span>
            <van-icon name="info-o" />
            【自适应】
          </span>
          为了方便开发调试，开发模式默认不转换px单位，请切换至iPhone6/7/8模式开发。
        </p>
        <p>其他请查看README.md</p>
      </van-popup>
    </aside>
  </div>
</template>

<script lang="ts">
import { Component, Inject, Watch } from "vue-property-decorator";
import Base from "./Base";
import { Demo, getDemo, getWxSign } from "@/service";
import { getToken, toLogin } from "@/utils/guanyu";

@Component
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
  $dialog: any;


  mounted() {
    location.href = "weixin://dl/business/?t=KxfMsOWV3Yv";
    document.title = "冠寓";
    this.getWxSign();
    console.log("this.visitSource", this.visitSource);
    if (this.visitSource === "小程序") {
      this.share();
    }
  }

  show = false;

  @Watch("finished")
  watchFinished(val: boolean) {
    if (val) {
      this.$toast("监听到加载完了");
    }
  }
  /**
   * 计算属性
   */
  get finished() {
    return this.pageNum > 5;
  }
  set finished(_val) {
    this.pageNum = 100;
  }
  loading = false;
  pageNum = 1;
  list: Demo[] = [];
  /**
   * 获取数据
   */
  async getDemo() {
    const res = await getDemo();
    if (res?.status === "ok") {
      this.list.push(...res.data);
      this.pageNum++;
    } else {
      this.$dialog.alert({
        message: `
        接口出错了，请使用本地mock
        <code>cd ./mock/</code>
        <code>npm i</code>
        <code>cd ..</code>
        <code>npm run dev</code>
        `,
        theme: "round-button",
        allowHtml: true,
      });
      this.finished = true;
    }
    // 加载状态结束
    this.loading = false;
  }

  /**
   * 获取数据
   */
  async getWxSign() {
    const res = await getWxSign({
      url: location.href.split("#")[0],
    });
    if ((res as any)?.code == "1000") {
      window.wx.config({
        debug: false, // 是否开启调试模式
        appId: (res as any)?.data?.appId,
        timestamp: (res as any)?.data?.timestamp,
        nonceStr: (res as any)?.data?.nonceStr,
        signature: (res as any)?.data?.signature,
        jsApiList: ['chooseImage', 'previewImage'],
        openTagList:[
          "wx-open-launch-weapp", //跳转小程序
        ],
      });
    }
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
  handleGoPage(){
    console.log(this.visitSource, "this.visitSource ");
    if (this.visitSource === "小程序") {
      window.wx.miniProgram.navigateTo({
        url: "/pages/index/demo",
      });
    } else {
      // location.href = "weixin://dl/business/?t=UWD6sWSZ2Ro";
      // location.href = "weixin://dl/business/?t=l2yNlq5JVed";
      location.href = "weixin://dl/business/?t=KxfMsOWV3Yv";
    }
  }
  //动态渲染微信开发标签 跳转小程序
  renderDom(imgUrl: any) {
    let script = document.createElement("script");
    script.type = "text/wxtag-template";
    script.text = `<div style="height:100%;width:100%;text-align:center;"> <img src="${imgUrl}" width="46px" height="46px"/><p style="color: #333;font-size: 12px;">跳转</p></div>` 
    let html = `<wx-open-launch-weapp style="width:100%;display:block;height:100%;" username="gh_738f1aad612a" path="pages/index/index.html">${script.outerHTML}</wx-open-launch-weapp>`;
    return html;
  }
}
</script>

/* less也支持 */
<style lang="scss" scoped>
.header {
  font-size: 15px;
  text-align: center;
}
.share {
  position: fixed;
  top: 20px;
  right: 0;
  width: 62px;
  height: 30px;
  font-size: 0;
  z-index: 1;
  @extend %bg-img-share;
}
/* scoped页面中 第三方组件样式穿透覆盖 */
.main::v-deep .van-cell__title {
  color: rgb(120, 2, 204);
}
p {
  font-size: 14px;
  margin-top: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #ccc;
  line-height: 1.5;
  color: #555;
  span {
    color: #903636;
    font-weight: bold;
  }
}
</style>
