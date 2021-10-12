<template>
  <div class="pictrues-more">
    <van-dialog
      class="dialog"
      v-model="show"
      width="3020"
      :show-confirm-button="false"
      :get-container="() => $root.$el"
    >
      <SubWrapperA title="现场风险监控" style="width: 3015">
        <CardA opacity="1" fill="rgba(8, 18, 35, 1)">
          <van-row gutter="40">
            <van-col span="18">
              <div class="box">
                <div class="carda-title">
                  <span>现场风险监控</span>
                </div>
                <div class="pictures-wrapper">
                  <Webrtc :config="webrtcConfig" />
                </div>
              </div>
            </van-col>
            <van-col span="6">
              <div class="box">
                <div class="carda-title">
                  <span>问题描述</span>
                </div>
                <div class="pictrues-info">
                  <h3>{{ response.projectName }}</h3>
                  <ul>
                    <li>
                      <div class="label">问题描述：</div>
                      <div class="con">{{ response.problem }}</div>
                    </li>
                    <li>
                      <div class="label">发现时间：</div>
                      <div class="con">{{ response.showTime }}</div>
                    </li>
                    <li>
                      <div class="label">整改时间：</div>
                      <div class="con">{{ response.reformTime }}</div>
                    </li>
                  </ul>
                </div>
              </div>
            </van-col>
          </van-row>
          <WhiteSpace />
          <van-row gutter="40">
            <van-col span="18">
              <div class="box">
                <div class="carda-title">
                  <span>问题现场照片</span>
                </div>
                <div class="gallery">
                  <div
                    class="item"
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
              </div>
            </van-col>
            <van-col span="6">
              <div class="box">
                <div class="carda-title">
                  <span>联系人</span>
                </div>
                <div class="pictrues-info contacts">
                  <ul>
                    <li v-for="person of contacts" :key="person.phone">
                      <div class="label">{{ person.roleName }}：</div>
                      <div class="con">
                        {{ person.name }} {{ person.phone }}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </van-col>
          </van-row>
        </CardA>
        <CardA fill="rgba(8, 18, 35, 1)" opacity="1">
          <div class="closes">
            <span class="cross" @click="toggleDialog">
              <van-icon name="cross" />
            </span>
            <div class="btns">
              <div class="btn" @click="prevOrderDetail">上一个</div>
              <div class="btn" @click="nextOrderDetail">下一个</div>
            </div>
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
   * 工单id
   */
  @Prop({ default: null }) orderId!: number | null;

  /**
   * 当前页
   */
  pageNum = 1;

  /**
   * 工单id列表
   */
  orderIdList: number[] = [];

  /**
   * 工单id索引
   */
  orderIdIndex = 0;

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
    const item = iwant.object(this.response) ?? {};
    return {
      width: 2181,
      height: 1226,
      autoplay: true,
      poster: item.pictureUrl,
      cameraId: item.cameraId,
    };
  }

  /**
   * 监听dataSource 更新工单id列表
   */
  @Watch("dataSource", { deep: true })
  onDataSourceChange(val: MonitorListItemReturn[]) {
    console.log("dataSource", val);
    this.orderIdList = iwant.array(val).map((item) => item.orderId);
  }

  /**
   * 工单id变更
   */
  @Watch("orderId")
  onOrderIdChange(val: number | null) {
    console.log("orderId", val);
    const orderIdIndex = this.orderIdList.findIndex((item) => item === val);
    this.orderIdIndex = orderIdIndex;
  }

  @Watch("orderIdIndex")
  onOrderIdIndexChange() {
    this.fetch(true);
  }

  /**
   * 获取当前工单id
   */
  getCurrentOrderId() {
    return this.orderIdList[this.orderIdIndex];
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
    if (this.orderIdList.length === 0) return;
    this.orderIdIndex += 1;
    if (this.orderIdIndex === this.orderIdList.length) {
      this.orderIdIndex = 0;
    }
    console.log("this.nextOrderDetail", this.orderIdIndex);
  }

  /**
   * 上一个工单
   */
  prevOrderDetail() {
    if (this.orderIdList.length === 0) return;
    this.orderIdIndex -= 1;
    if (this.orderIdIndex === -1) {
      this.orderIdIndex = this.orderIdList.length - 1;
    }
    console.log("this.nextOrderDetail", this.orderIdIndex);
  }

  /**
   * 工单详情返回数据
   */
  response: Partial<MonitorInfoReturn> = {};

  /**
   * 获取工单详情
   */
  async fetch(force?: boolean) {
    const orderId = this.getCurrentOrderId();
    // if (!orderId) return;

    console.log("aaaaa", orderId);

    const response = await useStore(fetchMonitorInfo, {
      key: StoreKey.HomeMonitorInfo,
      params: {
        orderId,
      },
      force,
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
    margin-top: 20px;
    padding: 30px 40px 10px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .cross {
    cursor: pointer;
    font-size: 60px;
    color: #fff;
  }
}

.btns {
  display: flex;
  width: 500px;
  justify-content: center;
  padding: 40px;
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 292px;
    height: 80px;
    margin: 0 5px;
    backdrop-filter: blur(20px);
    color: #fff;
    font-size: 36px;
    cursor: pointer;
    background: linear-gradient(
      279.3deg,
      rgba(81, 128, 228, 0.2) 6.65%,
      rgba(81, 128, 228, 0.2) 92.58%
    );
  }
  .btn:nth-child(1) {
    margin-right: 80px;
  }
  .disabled {
    background: rgba(56, 196, 255, 0.1);
    color: #3e6997;
  }
}

.pictures-wrapper {
  position: relative;
  margin: 0 auto;
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
  margin-bottom: 40px;
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
  margin-bottom: 40px;
  justify-content: flex-end;
}

.pagination::v-deep {
  .page__total {
    font-size: 40px;
  }
}

.pictrues-info {
  > h3 {
    padding: 30px 0;
    font-size: 40px;
  }
  li {
    margin-top: 20px;
    display: flex;
    color: #e4f8ff;
    font-size: 36px;
    line-height: 50px;
    align-items: center;
    .label {
      color: #80a4c9;
    }
  }
  &.contacts {
    overflow: hidden;
    min-height: 400px;
    padding-left: 30px;
    border-left: 2px solid #5180e4;
    background: linear-gradient(
      90deg,
      rgba(5, 203, 253, 0.1) 0.19%,
      rgba(0, 127, 249, 0) 98.66%
    );
  }
}

.carda-title {
  height: 90px;
  border-bottom: 1px solid #1b3148;
  margin-bottom: 30px;
  span {
    display: inline-block;
    padding: 16px 52px;
    color: #5180e4;
    font-size: 40px;
    border-bottom: 2px solid #5180e4;
    background: linear-gradient(
      180deg,
      rgba(83, 214, 255, 0) 0%,
      rgba(81, 128, 228, 0.1) 100%
    );
  }
}
</style>
