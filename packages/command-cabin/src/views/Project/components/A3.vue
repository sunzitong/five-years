<template>
  <div class="iframe-wrapper">
    <Spin class="nodata" empty></Spin>
    <iframe
      v-if="response"
      width="1600"
      height="741"
      frameborder="0"
      scrolling="no"
      :src="response"
    ></iframe>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import { StoreKey, useStore } from "@/store";
import { fetchLocationUrl } from "@/service/analysis/bigScreen/projectBoard/projectLocation/locationUrl";

@Component({
  components: {},
})
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
    } else {
      this.response = "";
    }
    this.empty = !this.response;
    return response;
  }
}
</script>
<style lang="scss" scoped>
.iframe-wrapper {
  position: relative;
  height: 830px;
  @extend %flex-center;
  align-content: center;
  iframe {
    position: relative;
    z-index: 10;
  }
}
.nodata {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
