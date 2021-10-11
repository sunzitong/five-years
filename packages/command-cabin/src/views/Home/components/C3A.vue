<template>
  <div class="pictrues-more">
    <van-dialog
      class="dialog"
      v-model="show"
      width="3015"
      :show-confirm-button="false"
      :get-container="() => $root.$el"
    >
      <SubWrapperA title="现场风险监控" style="width: 3015">
        <van-row>
          <van-col span="18">
            <CardA
              opacity="1"
              fill="rgba(8, 18, 35, 1)"
              title="现场监控"
              style="height: 1348px"
            >
              <Spin :loading="loading" :empty="empty">
                <div class="pictures-wrapper">
                  <Webrtc :config="webrtcConfig" />
                </div>
              </Spin>
            </CardA>
            <WhiteSpace />
            <CardA
              opacity="1"
              fill="rgba(8, 18, 35, 1)"
              title="问题现场照片"
              style="height: 625px"
            >
              <div class="gallery">
                <div
                  class="item"
                  @click="() => swipe.swipeTo(item.index)"
                  v-for="(item, index) of pageContent.list"
                  :key="index"
                >
                  <van-image width="707" height="397" :src="item"></van-image>
                </div>
              </div>
              <div class="pagination">
                <Pagination
                  :total="pageContent.total"
                  :pages="Math.ceil(pageContent.total / 3)"
                  v-model="pageNum"
                />
              </div>
            </CardA>
          </van-col>
          <van-col span="6">
            <CardA
              opacity="1"
              fill="rgba(8, 18, 35, 1)"
              title="问题描述"
              style="height: 1348px"
            ></CardA>
            <WhiteSpace />
            <CardA
              opacity="1"
              fill="rgba(8, 18, 35, 1)"
              title="联系人"
              style="height: 625px"
            ></CardA>
          </van-col>
        </van-row>
        <CardA fill="rgba(8, 18, 35, 1)" opacity="1">
          <div class="btns">
            <div
              class="btn"
              :class="{ disabled: currentIndex === 0 }"
              @click="prevOrderDetail"
            >
              <van-icon name="arrow-left" />
            </div>
            <div
              class="btn"
              :class="{ disabled: currentIndex === response.length - 1 }"
              @click="nextOrderDetail"
            >
              <van-icon name="arrow" />
            </div>
          </div>
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
</template>

<script lang="ts">
import { Prop, Component, Ref, VModel, Watch } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import { StoreKey, useStore } from "@/store";
import SubWrapperA from "@/components/SubWrapperA/Index.vue";
import CardA from "@/components/CardA/Index.vue";
import WhiteSpace from "@/components/WhiteSpace/Index.vue";
import Webrtc from "@/components/Webrtc/Index.vue";
import Pagination from "@/components/Pagination/Index.vue";
import { iwant } from "@guanyu/shared";
import { Swipe } from "vant";
import {
  fetchMonitorInfo,
  MonitorInfoReturn,
} from "@/service/analysis/bigScreen/mainBoard/center/monitorInfo";
import { MonitorListItemReturn } from "@/service/analysis/bigScreen/mainBoard/center/monitorList";

@Component({
  components: {
    Webrtc,
    SubWrapperA,
    CardA,
    WhiteSpace,
    Pagination,
  },
})
export default class C3A extends Base implements IFetch {
  @Ref() swipe!: Swipe;

  /**
   * 对外暴露事件
   */
  @Prop() onToggle!: (val: boolean) => void;

  /**
   * show
   */
  @VModel({ type: Boolean }) show!: boolean;

  /**
   * orderId 集合
   */
  @Prop({ default: () => [] }) dataSource!: MonitorListItemReturn[];

  /**
   * 当前索引
   */
  currentIndex = 0;

  /**
   * 当前页
   */
  pageNum = 1;

  /**
   * 工单id列表
   */
  orderIdList: number[] = [];

  /**
   * 联系人
   */
  get contacts() {
    return iwant.array(this.response.contacts);
  }

  /**
   * 渲染页面内容
   */
  get pageContent() {
    const e = this.pageNum * 3;
    const imgs = iwant.array(this.response.problemPictureUrls);
    return {
      list: imgs.slice(e - 3, e),
      total: imgs.length,
    };
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
   * 监听dataSource 更新工单id列表
   */
  @Watch("dataSource", { deep: true })
  onDataSourceChange(val: MonitorListItemReturn[]) {
    this.orderIdList = iwant.array(val).map((item) => item.orderId);
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
   * 下一个工单
   */
  nextOrderDetail() {
    console.log("nextOrderDetail");
  }

  /**
   * 上一个工单
   */
  prevOrderDetail() {
    console.log("prevOrderDetail");
  }

  /**
   * 工单详情返回数据
   */
  response: Partial<MonitorInfoReturn> = {};

  /**
   * 获取工单详情
   */
  async fetch() {
    const response = await useStore(fetchMonitorInfo, {
      key: StoreKey.HomeMonitorInfo,
      params: {
        orderId: 12345,
      },
    });
    if (response?.status === "ok") {
      this.response = iwant.object(response.data);
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

.btns {
  display: flex;
  width: 500px;
  justify-content: center;
  margin: 20px auto 0;
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

.pictures-wrapper {
  position: relative;
  margin: 0 auto;
  padding-top: 25px;
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
</style>
