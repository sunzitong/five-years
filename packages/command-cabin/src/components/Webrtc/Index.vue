<template>
  <div ref="webrtc" class="app-webrtc"></div>
</template>
<script lang="ts">
import { Base } from "@/views/Base";
import { getEnvHost, iwant } from "@guanyu/shared";
import { Component, Prop, Ref, Watch } from "vue-property-decorator";
import { PlayerConfig } from "./webrtc.type";
export type { PlayerConfig } from "./webrtc.type";

@Component
export default class Webrtc extends Base {
  /**
   * 容器
   */
  @Ref() webrtc!: HTMLDivElement;

  /**
   * 播放器配置
   */
  @Prop() config!: PlayerConfig;

  /**
   * 初始化webrtc 播放器
   */
  @Watch("config", { deep: true, immediate: true })
  onConfigChange(value: PlayerConfig) {
    this.initPlayer(value);
  }

  /**
   * 初始化播放器
   */
  initPlayer(val?: PlayerConfig) {
    this.$nextTick(() => {
      const user = iwant.object(this.store?.currentUser);
      const config = {
        accessChannel: "c3-zhihuicang",
        watermark: `${user.oaAccount} ${user.phone}`,
        autoplay: false,
        // cameraId: "00bcf8bbe82e0c36daa781e8568cd7d4",
        // cameraId: "0002c6450e0cd4025ef3ba3a9c712aac",
        env: getEnvHost() === "production" ? "prod" : "uat",
        ...(val ?? {}),
      };
      this.destroyPlayer();
      console.log(getEnvHost());
      this.player = new window.Player(this.webrtc, config);
    });
  }

  /**
   * 销毁播放器
   */
  destroyPlayer() {
    if (this.player) this.player.destroy();
  }

  /**
   * 组件卸载
   */
  beforeDestroy() {
    // 销毁播放器
    this.destroyPlayer();
  }
}
</script>
<style lang="scss" scoped></style>
