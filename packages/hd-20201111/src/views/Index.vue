<template>
  <div class="page__index">
    <header class="header">
      <aside class="share" v-if="visitSource === 'APP'" @click="share">
        分享
      </aside>
    </header>
    <main class="main">
      <ul>
        <!-- <li v-for="item in activityList" :key="item.id">
          <a :href="item.activityUrl" v-if="item.isOpen">
            <img :src="item.imageUrl" alt="" />
          </a>
          <a href="" v-else class="disable">
            <img :src="item.noOpenImageUrl" alt="" />
          </a>
        </li> -->
        <li v-for="item in activityList" :key="item.id">
          <a href="#" @click="(e) => activityJump(e, item)">
            <img
              :src="item.isOpen === 1 ? item.imageUrl : item.noOpenImageUrl"
            />
          </a>
        </li>
      </ul>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Inject } from "vue-property-decorator";
import Base from "./Base";
import { getCityList, getActivityList } from "@/api";
import { getToken, toLogin } from "@/utils/guanyu";
import { stringify } from "qs";

@Component
export default class Index extends Base {
  @Inject() visitSource!: string;
  // app和小程序分享
  @Inject() share!: () => void;

  // 活动列表
  activityList: Record<string, any> = [];

  // 城市名字
  cityName = "";

  // 门店ID
  cityId = "";

  stringify = stringify;

  mounted() {
    // 双十一活动主页埋点
    window.zhuge.track("进入_2020双11活动主页");
    // console.log("$this", this.$route);
    this.cityName = this.env.cityName;
    this.cityId = this.env.cityID;
    // console.log(this.cityName);
    // console.log(this.cityId);

    document.title = "万元省钱攻略一触即GO";
    if (this.visitSource === "小程序") {
      this.share();
    }
    this.getActivityList();
  }

  // 获取活动列表
  async getActivityList() {
    const activityNumber = 202010277856;
    const res = await getActivityList(activityNumber);
    if (!res) return;
    if (res.status === "ok") {
      this.activityList = res.data || [];
    }
  }

  /**
   * 获取城市列表
   */
  async getCityList() {
    const res = await getCityList();
    if (!res) return;
    if (res.status === "ok") {
      /**/
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

  activityJump(e: any, item: any) {
    // 活动一埋点
    if (item.id === 1) {
      window.zhuge.track("点击_2020双11活动1");
    }
    // 活动二埋点
    if (item.id === 2) {
      window.zhuge.track("点击_2020双11活动二");
    }
    // 活动三埋点
    if (item.id === 3) {
      window.zhuge.track("点击_2020双11活动三");
    }
    // 活动四埋点
    if (item.id === 4) {
      window.zhuge.track("点击_2020双11活动四");
    }
    e.preventDefault();
    if (item.isOpen !== 1) return;
    const str = item.activityUrl;
    // 只有H5链接
    if (str.indexOf("|") === -1) {
      window.location.href = `${str}?${stringify(this.$route.query)}`;
      return;
    }
    // activityUrl包含h5链接和小程序链接，| 前链接为H5，| 后链接为小程序
    const strs = str.split("|");
    // 跳转H5链接
    const h5Url = strs[0];
    // 跳转小程序链接
    const miniProUrl = strs[1];
    if (this.visitSource === "小程序") {
      window.wx.miniProgram.navigateTo({
        url: miniProUrl,
      });
    } else {
      window.location.href = `${h5Url}?${stringify(this.$route.query)}`;
    }
  }
}
</script>

<style lang="scss">
.page__index {
  width: 100%;
  min-height: 100vh;
  background: url("https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/app/--3_Rzxk6Tk0p3HmuNrZlQ.png")
    0 0 no-repeat;
  background-size: 100%;
  height: 2277.5px;

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

  .main {
    position: relative;

    // .disable {
    //   pointer-events: none;
    // }

    li:nth-child(1) {
      position: absolute;
      top: 593.5px;
      left: 144px;
      width: 188.5px;
      height: 283.5px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    li:nth-child(2) {
      position: absolute;
      top: 1026.5px;
      right: 181.5px;
      width: 193.5px;
      height: 312px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    li:nth-child(3) {
      position: absolute;
      top: 1439px;
      left: 199.5px;
      width: 175.5px;
      height: 301px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    li:nth-child(4) {
      position: absolute;
      top: 2028px;
      left: 12px;
      width: 250px;
      height: 158.5px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
