<template>
  <div ref="webrtc" class="app-webrtc"></div>
</template>
<script lang="ts">
import { getEnvHost, iwant } from "@guanyu/shared";
import { Component, Prop, Ref, Vue, Watch } from "vue-property-decorator";
import { PlayerConfig } from "./webrtc.type";
export type { PlayerConfig } from "./webrtc.type";

@Component
export default class Webrtc extends Vue {
  /**
   * 容器
   */
  @Ref() webrtc!: HTMLDivElement;

  /**
   * 播放器配置
   */
  @Prop() config!: PlayerConfig;

  /**
   * 组件挂载
   */
  mounted() {
    // this.initPlayer();
  }

  /**
   * 初始化webrtc 播放器
   */
  @Watch("config", { deep: true, immediate: true })
  onConfigChange(value: PlayerConfig) {
    this.initPlayer(value);
  }

  /**
   * 用户数据更新
   */
  @Watch("store.currentUser", { deep: true, immediate: true })
  onCurrentUserChange() {
    this.initPlayer(this.config);
  }

  /**
   * 初始化播放器
   */
  initPlayer(val?: PlayerConfig) {
    this.$nextTick(() => {
      const user = iwant.object(this.store?.currentUser);
      // if (!user.phone && !user.oaAccount) return;
      const config = {
        accessChannel: "huiyan",
        watermark: `${user.oaAccount} ${user.phone}`,
        autoplay: false,
        // cameraId: "00bcf8bbe82e0c36daa781e8568cd7d4",
        env: getEnvHost() === "production" ? "prod" : "uat",
        ...(val ?? {}),
        cameraId: "0002c6450e0cd4025ef3ba3a9c712aac",
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
