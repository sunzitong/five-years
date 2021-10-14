<template>
  <div class="pictrues-more">
    <span @click="toggleDialog">更多</span>
    <div v-if="show">
      <van-dialog
        class="dialog"
        v-model="show"
        width="2293"
        :show-confirm-button="false"
        :get-container="() => $root.$el"
      >
        <SubWrapperA title="现场风险监控" style="width: 2293px">
          <CardA title="现场监控">
            <Spin :loading="loading" :empty="empty">
              <div class="pictures-wrapper">
                <van-swipe
                  lazy-render
                  ref="swipe"
                  :loop="false"
                  :show-indicators="false"
                  @change="changeHandle"
                >
                  <van-swipe-item
                    v-for="(item, index) of response"
                    :key="index"
                  >
                    <div class="pictures">
                      <div class="label">{{ item.location }}</div>
                      <Webrtc
                        :key="item.cameraId"
                        :config="webrtcConfig"
                        v-if="index === currentIndex"
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
                </div>
              </div>
              <div class="pictures-gallery">
                <div class="title">
                  <span>视觉选择</span>
                </div>
                <div class="body">
                  <div class="gallery">
                    <div
                      class="item"
                      @click="() => swipe.swipeTo(item.index)"
                      v-for="item of pageContent"
                      :key="item.cameraId"
                    >
                      <van-image
                        width="707"
                        height="379"
                        :src="item.imageUrl"
                      ></van-image>
                      <div class="label">{{ item.location }}</div>
                    </div>
                  </div>
                  <div class="pagination">
                    <Pagination
                      :total="response.length"
                      :pages="Math.ceil(response.length / 3)"
                      v-model="pageNum"
                    />
                  </div>
                </div>
              </div>
            </Spin>
          </CardA>
          <WhiteSpace />
          <CardA>
            <div class="closes">
              <span class="cross" @click="toggleDialog">
                <van-icon name="cross" />
              </span>
              <span class="cross" @click="toggleDialog">
                <van-icon name="cross" />
              </span>
            </div>
          </CardA>
        </SubWrapperA>
      </van-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Ref } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import { StoreKey, useStore } from "@/store";
import SubWrapperA from "@/components/SubWrapperA/Index.vue";
import CardA from "@/components/CardA/Index.vue";
import WhiteSpace from "@/components/WhiteSpace/Index.vue";
import Webrtc from "@/components/Webrtc/Index.vue";
import Pagination from "@/components/Pagination/Index.vue";
import {
  CameraListItemReturn,
  fetchCameraList,
} from "@/service/analysis/bigScreen/projectBoard/monitor/cameraList";
import { iwant } from "@guanyu/shared";
import { Swipe } from "vant";

@Component({
  components: {
    Webrtc,
    SubWrapperA,
    CardA,
    WhiteSpace,
    Pagination,
  },
})
export default class C1A extends Base implements IFetch {
  @Ref() swipe!: Swipe;

  /**
   * 对外暴露事件
   */
  @Prop() onToggle!: (val: boolean) => void;

  /**
   * 当前索引
   */
  currentIndex = 0;

  /**
   * 当前页
   */
  pageNum = 1;

  /**
   * 是否显示弹窗
   */
  show = false;

  /**
   * 渲染页面内容
   */
  get pageContent() {
    const e = this.pageNum * 3;
    return this.response.slice(e - 3, e);
  }

  /**
   * 播放器配置
   */
  get webrtcConfig() {
    const item = this.response[this.currentIndex] ?? {};
    return {
      width: 2181,
      height: 1226,
      autoplay: true,
      poster: item.imageUrl,
      cameraId: item.cameraId,
    };
  }

  /**
   * 切换轮播
   */
  changeHandle(index: number) {
    this.currentIndex = index;
    this.pageNum = Math.ceil((index + 1) / 3);
  }

  /**
   * 切换显示弹窗
   */
  toggleDialog() {
    this.show = !this.show;
    if (typeof this.onToggle === "function") {
      this.onToggle(this.show);
    }
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
      this.response = iwant.array(response.data).map((item, index) => {
        return {
          ...item,
          index,
        };
      });
      this.empty = false;
    } else {
      this.empty = true;
    }
    return response;
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  background: transparent;
  border-radius: 0;
  .content {
    margin: 30px;
  }
  .closes {
    padding: 30px 40px 10px;
    display: flex;
    justify-content: space-between;
  }
  .cross {
    font-size: 60px;
    color: #fff;
  }
}

.pictures-wrapper {
  position: relative;
  margin: 0 auto;
  padding-top: 25px;
  .btns {
    display: flex;
    width: 500px;
    justify-content: center;
    margin: 20px auto 0;
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 66px;
    margin: 0 5px;
    background: rgba(56, 196, 255, 0.3);
    backdrop-filter: blur(20px);
    color: #01f5f1;
    font-size: 50px;
  }
  .btn:nth-child(1) {
    margin-right: 300px;
  }
  .disabled {
    background: rgba(56, 196, 255, 0.1);
    color: #3e6997;
  }
}
.pictures {
  position: relative;
  .label {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 70px;
    line-height: 70px;
    z-index: 5;
    font-size: 36px;
    padding: 0 36px;
    background: rgba(14, 23, 60, 0.5);
    backdrop-filter: blur(10px);
    @extend %txt-over;
  }
}

.pictures-gallery {
  .title {
    height: 90px;
    border-bottom: 1px solid #1b3148;
    span {
      display: inline-block;
      padding: 16px 52px;
      color: #5180e4;
      font-size: 40px;
      border-bottom: 2px solid #777b85;
      background: linear-gradient(
        180deg,
        rgba(83, 214, 255, 0) 0%,
        rgba(81, 128, 228, 0.1) 100%
      );
    }
  }
  .gallery {
    display: flex;
    padding: 30px;
    justify-content: space-between;
    .label {
      height: 70px;
      padding: 0 36px;
      font-size: 36px;
    }
    .item {
      background: #1a212c;
    }
  }
  .pagination {
    display: flex;
    padding: 20px;
    justify-content: flex-end;
  }
  .pagination::v-deep {
    .page__total {
      font-size: 40px;
    }
  }
}
</style>
