<template>
  <Spin class="box" :loading="loading">
    <div class="iframe-wrapper">
      <iframe
        width="1600"
        height="741"
        frameborder="0"
        scrolling="no"
        :src="response"
      ></iframe>
    </div>
  </Spin>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import { StoreKey, useStore } from "@/store";
import { fetchLocationUrl } from "@/service/analysis/bigScreen/projectBoard/projectLocation/locationUrl";

@Component
export default class A3 extends Base implements IFetch {
  /**
   * 项目区位地址
   */
  response = "";

  /**
   * 自动触发 重复调用
   * @returns response
   */
  async fetch() {
    const response = await useStore(fetchLocationUrl, {
      key: StoreKey.ProjectLocationUrl,
      params: { orgId: this.store.global.project.orgId },
    });
    if (response?.status === "ok") {
      this.response = response.data?.locationUrl;
    }
    return response;
  }
}
</script>
<style lang="scss" scoped>
.iframe-wrapper {
  height: 830px;
  @extend %flex-center;
  align-content: center;
}
</style>
