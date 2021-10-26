<template>
  <div>
    <!-- 信息指数 -->
    <CreditComponent />
    <!-- 渠道效能值 -->
    <ChannelComponent />
    <!-- 运营健康值 -->
    <OperationalComponent />
  </div>
</template>

<script lang="ts">
import Base from "@/views/Base";
import { Component } from "vue-property-decorator";

/**
 * 信用指数
 */
import CreditComponent from "./components/CreditComponent.vue";
/**
 * 渠道效能值
 */
import ChannelComponent from "./components/ChannelComponent.vue";
/**
 * 运营健康度
 */
import OperationalComponent from "./components/OperationalComponent.vue";

@Component({
  components: {
    CreditComponent,
    ChannelComponent,
    OperationalComponent,
  },
})
export default class PageOperation extends Base {
  get optData() {
    return this.store.optData;
  }
}
</script>

<style lang="scss"></style>
