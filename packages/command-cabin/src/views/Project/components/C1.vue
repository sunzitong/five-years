<template>
  <Spin :height="584" :loading="loading" :empty="empty">
    <div class="pictures-wrapper">
      <van-swipe
        ref="swipe"
        :loop="false"
        :show-indicators="false"
        @change="changeHandle"
        lazy-render
        :style="`height: ${webrtcConfig.height}px`"
      >
        <van-swipe-item v-for="(item, index) of response" :key="index">
          <div class="pictures">
            <div class="label">{{ item.location }}</div>
            <Webrtc
              :key="item.cameraId"
              :config="webrtcConfig"
              v-if="index === currentIndex && !show"
            />
            <van-image
              v-else
              radius="5px 5px 0 0"
              :width="webrtcConfig.width"
              :height="webrtcConfig.height"
              :src="item.imageUrl"
            ></van-image>
          </div>
        </van-swipe-item>
      </van-swipe>
      <div class="btns">
        <div
          class="btn"
          :class="{ disabled: currentIndex === 0 }"
          @click="() => swipe.prev()"
        >
          <van-icon name="arrow-left" />
        </div>
        <div
          class="btn"
          :class="{ disabled: currentIndex === response.length - 1 }"
          @click="() => swipe.next()"
        >
          <van-icon name="arrow" />
        </div>
        <div class="btn more">
          <C1A :onToggle="onToggleModal" />
        </div>
      </div>
    </div>
  </Spin>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import { StoreKey, useStore } from "@/store";
import Webrtc from "@/components/Webrtc/Index.vue";
import {
  CameraListItemReturn,
  fetchCameraList,
} from "@/service/analysis/bigScreen/projectBoard/monitor/cameraList";
import { iwant } from "@guanyu/shared";
import { Swipe } from "vant";
import C1A from "./C1A.vue";

@Component({
  components: {
    Webrtc,
    C1A,
  },
})
export default class C1 extends Base implements IFetch {
  @Ref() swipe!: Swipe;

  /**
   * 是否显示了弹窗
   */
  show = false;

  /**
   * 当前索引
   */
  currentIndex = 0;

  /**
   * 播放器配置
   */
  get webrtcConfig() {
    const item = this.response[this.currentIndex] ?? {};
    return {
      width: 940,
      height: 480,
      autoplay: true,
      poster: item.imageUrl,
      cameraId: item.cameraId,
    };
  }

  /**
   * 是否显示了弹窗
   */
  onToggleModal(status: boolean) {
    this.show = status;
    console.log("this.show", this.show);
  }

  /**
   * 切换轮播
   */
  changeHandle(index: number) {
    this.currentIndex = index;
  }

  /**
   * 返回数据
   */
  response: CameraListItemReturn[] = [];

  async fetch() {
    const response = await useStore(fetchCameraList, {
      key: StoreKey.ProjectCameraList,
      params: {
        orgId: this.store.global.project.orgId,
      },
    });
    if (response?.status === "ok") {
      this.response = iwant.array(response.data);
    } else {
      this.response = [];
    }
    this.empty = !this.response.length;
    return response;
  }
}
</script>

<style lang="scss" scoped>
.pictures-wrapper {
  position: relative;
  width: 940px;
  margin: 0 auto;
  padding-top: 25px;
  .btns {
    display: flex;
    margin: 0 auto;
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 240px;
    height: 90px;
    margin-right: 5px;
    background: rgba(56, 196, 255, 0.3);
    backdrop-filter: blur(20px);
    color: #01f5f1;
    font-size: 50px;
  }
  .more {
    margin: 0 0 0 auto;
    font-size: 36px;
  }
  .disabled {
    background: rgba(56, 196, 255, 0.1);
    color: #3e6997;
  }
}
.pictures {
  position: relative;
  // &::after {
  //   content: "";
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  //   bottom: 0;
  // }
  .label {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    line-height: 70px;
    z-index: 5;
    padding: 0 36px;
    background: rgba(14, 23, 60, 0.5);
    backdrop-filter: blur(10px);
    @extend %txt-over;
  }
}
</style>
