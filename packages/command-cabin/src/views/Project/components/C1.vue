<template>
  <Spin :loading="loading" :empty="empty">aaaa</Spin>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import { StoreKey, useStore } from "@/store";
import {
  CameraListItemReturn,
  fetchCameraList,
} from "@/service/analysis/bigScreen/projectBoard/monitor/cameraList";

@Component({
  components: {},
})
export default class C1 extends Base implements IFetch {
  /**
   * 返回数据
   */
  response: CameraListItemReturn[] = [];

  async fetch() {
    const response = await useStore(fetchCameraList, {
      key: StoreKey.ProjectCameraList,
      params: {
        orgId: this.store.global.orgTree.orgId,
      },
    });
    if (response?.status === "ok") {
      this.response = response.data ?? [];
      this.empty = false;
    } else {
      this.empty = true;
    }
    return response;
  }
}
</script>

<style lang="scss" scoped></style>
