<template>
  <div id="app">
    <AppHeader />
    <div class="logo"></div>
    <div v-show="!inLogin">
      <FixedNav />
      <FixedNav position="right" />
    </div>
    <!-- 路由 -->
    <router-view
      v-if="!appLoading || inLogin"
      :class="{ 'show-shadow': showShadow }"
    />
    <!-- 若有初始化的请求 可以设置在未完成时页面loading -->
    <AppLoading v-else />
    <!-- 控制缩放 -->
    <div
      v-if="$root.env.DEBUG"
      :style="{ transform: 'scale(' + 1 / scale + ')' }"
      class="screen-resize"
    >
      {{ showShadow ? "已显示内容边框" : "已隐藏内容边框" }}
      <van-switch v-model="showShadow" :size="20" />
      {{ resize ? "已启用自动缩放" : "已显示网页原始大小" }}
      <van-switch v-model="resize" @change="resizeHandle" :size="20" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import AppLoading from "@/components/AppLoading.vue";
import MixStore from "@/store/MixStore";
import FixedNav from "@/components/FixedNav/Index.vue";
import AppHeader from "@/components/Header/Index.vue";
import mitter, { EventName } from "./utils/mitter";
import { removeStore, StoreKey, useStore } from "./store";
import {
  fetchOrgTree,
  OrgTreeItemReturn,
} from "./service/analysis/commandCabin/orgTree";
import { fetchProjectList } from "./service/analysis/commandCabin/projectList";
import _ from "lodash";
import { fetchToken } from "./service/auth/token";
import { DataLevels } from "./service/analysis/commandCabin/publicEnum/enums";
import dayjs from "dayjs";

@Component({
  name: "app",
  components: {
    AppLoading,
    FixedNav,
    AppHeader,
  },
})
export default class App extends Mixins(MixStore) {
  resize = !sessionStorage.getItem("unresize");

  showShadow = false;

  appLoading = true;

  scale = 1;

  get inLogin() {
    return this.$route.meta.name === "login";
  }
  /**
   * 屏幕缩放
   */
  resizeHandle(event?: UIEvent) {
    /**
     * 触发mitt事件重绘echarts
     */
    mitter.emit(EventName.ResizeEcharts, event);
    /**
     * 计算网页大小
     */
    const app = this.$root.$el as HTMLDivElement;
    if (!this.resize) {
      app.style.removeProperty("transform");
      document.body.style.removeProperty("width");
      document.body.style.removeProperty("height");
      this.scale = 1;
    } else {
      const fixWidth = 7680;
      const fixHeight = 3240;
      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;
      const sx = winWidth / fixWidth;
      const sy = winHeight / fixHeight;
      if (sx <= sy) {
        app.style.setProperty(
          "transform",
          `translateY(${(winHeight - fixHeight * sx) / 2}px) scale(${sx})`
        );
        this.scale = sx;
      } else {
        app.style.setProperty(
          "transform",
          `translateX(${(winWidth - fixWidth * sy) / 2}px) scale(${sy})`
        );
        this.scale = sy;
      }
      document.body.style.setProperty("width", "100vw");
      document.body.style.setProperty("height", "100vh");
    }
    if (this.resize) {
      sessionStorage.removeItem("unresize");
    } else {
      sessionStorage.setItem("unresize", "unresize");
    }
    this.store.env.SCALE = this.scale;
  }
  /**
   * 右键点击
   */
  contentMenuHandle(e: MouseEvent) {
    e.preventDefault();
    return false;
  }
  /**
   * 网页点击
   */
  documentClick(event: MouseEvent) {
    mitter.emit(EventName.DocumentClick, event);
  }
  /**
   * 接口出错
   */
  serviceError(status?: number | string) {
    if (!status) return;
    if (+status === 401) {
      // 清除用户信息
      removeStore();
      this.store.currentUser = null;
      if (!this.inLogin) {
        this.$router
          .replace("/login")
          .catch(_.noop)
          .finally(() => {
            this.appLoading = false;
          });
      }
    }
  }

  created() {
    this.resizeHandleDebounce = _.debounce(this.resizeHandle, 1000);
    // 7680 x 3240
    window.addEventListener("resize", this.resizeHandleDebounce);
    // 点击网页触发
    window.addEventListener("click", this.documentClick);
    if (!this.$root.env.DEBUG) {
      document.addEventListener("contextmenu", this.contentMenuHandle);
    }
    // 注册接口错误事件
    mitter.on(EventName.ServiceError, this.serviceError);
    // 注册登录回调事件
    mitter.on(EventName.FetchGlobalData, this.fetchGlobalData);
    // 请求全局数据
    this.$router.onReady(() => {
      mitter.emit(EventName.FetchGlobalData);
    });
  }

  mounted() {
    this.resizeHandle();
  }

  destroyed() {
    window.removeEventListener("resize", this.resizeHandleDebounce);
    window.removeEventListener("click", this.documentClick);
    if (!this.$root.env.DEBUG) {
      document.removeEventListener("contextmenu", this.contentMenuHandle);
    }
  }

  /**
   * 请求区域门店数据
   * 赋值全局数据
   */
  async fetchGlobalData(loginCallback?: AnyFunction) {
    this.appLoading = true;
    // 清空所有数据
    removeStore();
    if (!this.store.currentUser) {
      // 用户信息请求失败 跳转login
      const fallback = () => {
        this.$router
          .push("/login")
          .catch(_.noop)
          .finally(() => {
            this.appLoading = false;
          });
        if (loginCallback) {
          loginCallback();
        }
      };
      if (localStorage.getItem("token")) {
        const response = await fetchToken();
        if (response?.status === "ok") {
          this.store.currentUser = response.data;
          if (loginCallback) {
            this.appLoading = false;
            loginCallback();
            return;
          }
        } else {
          return fallback();
        }
      } else {
        return fallback();
      }
    }
    // FIXME Auth缓存问题
    setTimeout(async () => {
      // 获取区域数据
      const promiseOrgTree = useStore(fetchOrgTree, { key: StoreKey.OrgTree });
      // 获取门店数据
      const promiseProjectList = useStore(fetchProjectList, {
        key: StoreKey.ProjectList,
      });
      const resOrgTree = await promiseOrgTree;
      const resProjectList = await promiseProjectList;
      if (resOrgTree?.status === "ok" && resProjectList?.status === "ok") {
        /**
         * 格式化组架
         */
        this.formatOrgTree(resOrgTree.data);
        /**
         * 初始化时间
         */
        this.resetDateScope();
        /**
         * 初始化组架
         */
        if (resOrgTree.data[0].childList) {
          if (resOrgTree.data[0].isHidden) {
            /**
             * 无全国权限
             * dataLevel初始化为大区
             */
            this.store.global.dataLevel = DataLevels.AREA;
            this.store.global.orgTree = resOrgTree.data[0].childList[0];
          } else {
            /**
             * 有全国权限
             * dataLevel初始化为全国
             */
            this.store.global.dataLevel = DataLevels.GROUP;
            this.store.global.orgTree = resOrgTree.data[0];
          }
          /**
           * 初始化城市
           */
          this.store.global.project = resProjectList.data[0];

          this.appLoading = false;
        }
      }
    }, 1500);
    window.MAIAAPM?.setUid(this.store.currentUser?.userId);
  }

  /**
   * 给orgTree添加parent属性
   */
  formatOrgTree(tree: OrgTreeItemReturn[], parent?: OrgTreeItemReturn) {
    tree.forEach((item: OrgTreeItemReturn & { parent?: OrgTreeItemReturn }) => {
      item.parent = parent;
      if (item.childList) {
        this.formatOrgTree(item.childList, item);
      }
    });
  }

  /**
   * 重设年累月累初始值
   */
  resetDateScope() {
    const now = dayjs(this.store.env.NOW);
    this.store.global.dateValue = now.format("YYYY");
    this.store.global.yearValue = now.format("YYYY");
    this.store.global.monthValue = now.format("YYYY-MM");
  }
}
</script>

<style lang="scss">
#app {
  background-color: #09080c;
  width: 7680px;
  height: 3240px;
  transform-origin: 0 0;
  overflow: hidden;
  font-family: "DIN Alternate, PingFang SC";
  position: relative;
  @extend %bg-img-bg-earth;
  background-position-y: 180px;
}
.logo {
  width: 336px;
  height: 70px;
  position: absolute;
  left: 60px;
  top: 62px;
  z-index: 20;
  @extend %bg-img-logo;
}
/* 数字字体文件 */
.value-font {
  @extend %value-font;
}
.screen-resize {
  @extend %flex-center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  transform-origin: 0 0;
  color: #fff;
  box-shadow: #fff -2px 2px 10px 0px;
  font-size: 16px;
}
.show-shadow .app-card-a__content > * {
  box-shadow: 0 0 10px #fff;
}
</style>
