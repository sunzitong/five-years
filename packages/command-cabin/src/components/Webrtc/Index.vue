<template>
  <div ref="webrtc" class="app-webrtc"></div>
</template>
<script lang="ts">
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
   * 初始化播放器
   */
  initPlayer(val?: PlayerConfig) {
    this.$nextTick(() => {
      const config = {
        accessChannel: "huiyan",
        watermark: "jxxxx",
        autoplay: false,
        // cameraId: "00bcf8bbe82e0c36daa781e8568cd7d4",
        cameraId: "16c01eaf613008b444a842d860911a17",
        ...(val ?? {}),
      };
      this.destroyPlayer();
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
