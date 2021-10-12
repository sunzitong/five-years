<template>
  <Spin class="pictrues-wrapper" :loading="loading" :empty="empty">
    <van-swipe
      :touchable="false"
      autoplay="20000"
      indicator-color="transparent"
    >
      <van-swipe-item v-for="(pictrue, index) of pictures" :key="index">
        <div class="pictures">
          <van-row gutter="20">
            <van-col v-for="item of pictrue" :key="item.projectId">
              <div class="picture">
                  <!-- @click="toggleModal(item)" -->
                <van-image
                  radius="5px 5px 0 0"
                  width="700"
                  height="394"
                  :src="item.pictureUrl"
                ></van-image>
                <div class="store">
                  <span>{{ item.projectName }}</span>
                </div>
                <div class="problem">
                  <span>{{ item.problem }}</span>
                </div>
                <div class="desc" v-if="item.optStatusDesc">
                  <span>{{ item.optStatusDesc }}</span>
                </div>
              </div>
            </van-col>
          </van-row>
        </div>
      </van-swipe-item>
    </van-swipe>
    <C3A v-model="show" v-if="show" :orderId="orderId" :dataSource="response" />
  </Spin>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Icon from "@/components/Icon/Index.vue";
import { Base, IFetch } from "@/views/Base";
import StepNumber from "@/components/StepNumber/Index.vue";
import C3A from "./C3A.vue";
import { StoreKey, useStore } from "@/store";
import {
  fetchMonitorList,
  MonitorListItemReturn,
} from "@/service/analysis/bigScreen/mainBoard/center/monitorList";
import { iwant } from "@guanyu/shared";

@Component({
  components: {
    C3A,
    Icon,
    StepNumber,
  },
})
export default class C3 extends Base implements IFetch {
  /**
   * 返回数据
   */
  response: MonitorListItemReturn[] = [];

  /**
   * 是否显示弹窗
   */
  show = false;

  /**
   * 工单id
   */
  orderId: null | number = null;

  /**
   * 图片分组
   */
  get pictures() {
    const LEN = 3;
    const pics = iwant.array(this.response);
    const array = [];
    for (let i = 0; i < pics.length; i += LEN) {
      array.push(pics.slice(i, i + LEN));
    }
    return array;
  }

  /**
   * 显示弹窗
   */
  toggleModal(item: MonitorListItemReturn) {
    if (item.orderId && !this.show) {
      this.orderId = item.orderId;
      console.log(this.orderId);
    } else {
      this.orderId = null;
    }
    this.show = !this.show;
  }

  /**
   * 自动触发 重复调用
   * @returns response
   */
  async fetch(force?: boolean) {
    const response = await useStore(fetchMonitorList, {
      key: StoreKey.HomeMonitorList,
      params: {
        dataLevel: this.store.global.dataLevel,
        levelId: this.store.global.orgTree.orgId,
        dateScope: this.store.global.dateScope,
      },
      force,
    });
    if (response?.status === "ok") {
      this.response = iwant.array(response.data);
    }
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.fetch(true);
    }, 1000 * 60 * 10);
    return response;
  }

  beforeDestroy() {
    clearTimeout(this.timer);
  }
}
</script>
<style lang="scss" scoped>
$problem-height: 74px;

.pictrues-wrapper {
  padding: 25px;
}
.pictures {
  display: flex;
  width: 2140px;
  .picture {
    position: relative;
  }
  .store {
    position: absolute;
    bottom: $problem-height;
    left: 0;
    right: 0;
    height: 70px;
    line-height: 70px;
    padding: 0 36px;
    font-size: 36px;
    background: rgba(14, 23, 60, 0.5);
    backdrop-filter: blur(10px);
    color: #fff;
    span {
      display: block;
      @extend %txt-over;
    }
  }
  .problem {
    height: $problem-height;
    line-height: $problem-height;
    font-size: 40px;
    background: #0e173c;
    padding: 0 36px;
    span {
      display: block;
      @extend %txt-over;
    }
  }
  .desc {
    position: absolute;
    left: 10px;
    top: 10px;
    padding: 10px 15px;
    color: #fff;
    background: #ff3980;
    border-radius: 8px;
  }
}
</style>
