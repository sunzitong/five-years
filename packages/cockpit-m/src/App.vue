<template>
  <div id="app">
    <AppLoading v-if="dataStatus === 'loading'" />
    <template v-if="routerStatus">
      <router-view v-if="$route.query.projectId && dataStatus === 'ok'" />
      <Empty
        v-if="!$route.query.projectId || dataStatus === 'fail'"
        style="
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: #fff;
        "
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Provide } from "vue-property-decorator";
import AppLoading from "@/components/AppLoading.vue";
import MixStore from "@/store/MixStore";
import { PublicEnum, queryPublicEnum } from "./service";
import { castKeys } from "@guanyu/shared";
import emptyImage from "./assets/img/empty.png";

@Component({
  name: "app",
  components: {
    AppLoading,
  },
})
export default class App extends Mixins(MixStore) {
  // 枚举数据请求状态
  dataStatus = "loading";
  // 路由加载完成
  routerStatus = false;

  @Provide() emptyImage = emptyImage;

  async created() {
    this.$router.onReady(() => {
      this.routerStatus = true;
      if (!this.$route.query.projectId) {
        this.$toast.fail("projectId 参数错误");
      }
    });
    /**
     * 请求公共枚举
     */
    const response = await queryPublicEnum();
    if (response?.status === "ok") {
      const data = response?.data ?? {};
      const valueEnum = {} as Record<
        keyof PublicEnum,
        Record<"name" | "text", string>[]
      >;
      for (let key in data) {
        valueEnum[key] = castKeys(data[key], {
          desc: "text",
          name: "value",
        });
      }
      this.store.valueEnum = valueEnum;
      this.dataStatus = "ok";
    } else {
      this.dataStatus = "fail";
    }
  }
}
</script>
<style lang="scss">
#app {
  min-height: 100vh;
  backface-visibility: hidden;
  .van-overlay {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .van-dropdown-menu__title {
    color: #232832;
    font-size: 14px;
    max-width: 10em;
  }

  .van-dropdown-menu__title::after {
    border-width: 1px;
    width: 4px;
    height: 4px;
    border-color: transparent transparent #232832 #232832;
  }

  .van-dropdown-menu__title--active::after {
    border-color: transparent transparent #1c7af7 #1c7af7;
  }
  .van-cell {
    padding: 12px 18px;
  }
  .van-popup--center.van-popup--round {
    border-radius: 4px;
  }
  .van-dropdown-menu__bar {
    box-shadow: none;
    border-bottom: 1px solid #f5f5f5;
  }
  .page__credit .van-circle__text {
    font-size: 12px;
  }
}
</style>
