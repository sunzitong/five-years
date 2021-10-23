<template>
  <Spin :height="955" :loading="loading" :empty="empty">
    <div class="page__a1__map">
      <!-- 上半部分 -->
      <div class="top_text">
        <div class="left_text">
          已签约间数
          <div class="num">
            <span>{{ sepNumber(resData.signedRoomNum) }}</span>
            <!-- 万 -->
          </div>
        </div>
        <div class="right_top_text">
          <div class="row_content">
            重资产
            <span class="value">
              {{ sepNumber(resData.heavySignedRoomNum) }}
            </span>
          </div>
          <div class="row_content">
            中资产
            <span class="value">
              {{ sepNumber(resData.mediumSignedRoomNum) }}
            </span>
          </div>
          <div class="row_content">
            轻资产
            <span class="value">
              {{ sepNumber(resData.lightSignedRoomNum) }}
            </span>
          </div>
        </div>
      </div>
      <!-- 下半部分 -->
      <div class="bottom_content">
        <div class="left_bottom_text">
          <div class="left_text">
            获取目标
            <div class="num">
              <span>{{ sepNumber(resData.yearExpandTarget) }}</span>
              <!-- 万 -->
            </div>
          </div>
          <div class="left_text">
            目标差额
            <div
              class="num"
              :class="{
                danger: resData.targetDiff < 0,
              }"
            >
              <span>{{ sepNumber(resData.targetDiff) }}</span>
              <!-- 万 -->
            </div>
          </div>
          <!-- <div class="left_text">
          已签约间数（非协同）
          <div class="num">
            <span>{{ sepNumber(signedRoom) }}</span>
            万
          </div>
        </div> -->
        </div>
        <!-- 饼图 -->
        <div class="chart">
          <van-circle
            v-model="currentRate"
            class="position"
            :rate="resData.expandFinishRatio"
            layer-color="rgba(247, 209, 74, 0.35)"
            color="#F7D14A"
            :size="250"
            :strokeWidth="50"
            :speed="100"
          >
            <div class="rate-text">
              <div>拓展完成率</div>
              <div class="value">{{ resData.expandFinishRatio }}%</div>
            </div>
          </van-circle>
        </div>
      </div>
    </div>
  </Spin>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import {
  fetchProjectAcquire,
  ProjectAcquireReturn,
} from "@/service/analysis/bigScreen/mainBoard/expandDisk/projectAcquire";
import { StoreKey, useStore } from "@/store";
import { iwant } from "@guanyu/shared";

@Component({
  components: {},
})
export default class A1 extends Base implements IFetch {
  /**
   * 饼图
   */
  @Ref() wrapper!: HTMLDivElement;
  resData: Partial<ProjectAcquireReturn> = {};

  currentRate = 0;

  /**
   * 自动触发 重复调用
   * @returns response
   */
  async fetch() {
    const response = await useStore(fetchProjectAcquire, {
      key: StoreKey.HomeProjectAcquire,
      params: {
        orgType: this.store.global.dataLevel,
        orgId: this.store.global.orgTree.orgId,
        year: +this.store.global.yearValue,
      },
    });
    if (response?.status === "ok") {
      this.resData = iwant.object(response.data);
      this.empty = false;
    } else {
      this.empty = true;
    }

    return response;
  }
}
</script>

<style lang="scss" scoped>
.page__a1__map {
  display: flex;
  flex-flow: column nowrap;
  color: #90a4c3;

  .top_text {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin: 43px 50px 0 50px;

    .left_text {
      flex: 1.1;
    }

    .right_top_text {
      flex: 1;
    }

    .row_content {
      display: flex;
      align-items: center;
      height: 48px;
      background: linear-gradient(
        89.96deg,
        rgba(5, 203, 253, 0.1) 0%,
        rgba(0, 127, 249, 0) 100.9%
      );
      margin: 20px 0;
      &::before {
        content: "";
        width: 2px;
        height: 100%;
        background: #5180e4;
        box-shadow: 0px 0px 10px #5180e4;
        margin-right: 30px;
      }
      .value {
        margin-left: 36px;
        @extend %value-font;
        font-weight: bold;
        font-size: 36px;
        line-height: 42px;
        color: #dbf0ff;
        opacity: 0.9;
      }
    }
  }
}

.bottom_content {
  margin: 47px 50px;

  display: flex;
  flex-flow: row;
  justify-content: space-between;
  height: 534px;
}

.left_bottom_text {
  flex: 1.1;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
}

.right_bottom_text {
  flex: 1;
}

.left_text {
  font-size: 40px;
  line-height: 40px;

  .num {
    padding-top: 18px;
    font-size: 36px;
    line-height: 48px;

    &.danger span {
      color: #ff2a76;
    }

    span {
      color: #dbf0ff;
      margin-left: 6px;
      @extend %value-font;
      font-weight: bold;
      font-size: 66px;
      line-height: 60px;
    }
  }
}

.chart {
  width: 500px;
  height: 500px;
  @extend %bg-img-circle-1;
  background-size: 370px 370px;
  background-position: 65px 47px;

  .position {
    margin: 125px 125px;
  }

  .rate-text {
    margin: 92px 0;
    font-size: 24px;
    line-height: 24px;
    color: #8090aa;

    .value {
      @extend %value-font;
      font-weight: bold;
      font-size: 48px;
      line-height: 48px;
      color: #dbf0ff;
    }
  }
}
</style>
