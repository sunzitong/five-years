<template>
  <div class="container">
    <div class="content">
      <ul class="list">
        <template v-for="item in list">
          <li
            class="item animate__animated animate__fadeIn"
            :key="item.year"
            :class="{ active: item.year === activeYear }"
            @click="activeYear = item.year"
          >
            <div class="details">
              <div class="year">{{ item.year }}</div>
              <ul class="part">
                <li>新增获取间数：{{ formatValue(item.newRoomNum) }}万间</li>
                <li>新增开业间数：{{ formatValue(item.newOpenNum) }}万间</li>
              </ul>
              <ul class="part">
                <li>净利润率：{{ formatValue(item.profit) }}%</li>
                <li>NPI利润率：{{ formatValue(item.npiProfit) }}%</li>
              </ul>
              <ul class="part">
                <li>收入总额：{{ formatValue(item.income) }}万元</li>
                <li>收入达成率：{{ formatValue(item.incomeRate) }}%</li>
                <li>平均出租率：{{ formatValue(item.rentRate) }}%</li>
              </ul>
            </div>
          </li>
        </template>
      </ul>
      <div class="tools">
        <div
          class="btn btn--prev"
          :class="{
            disabled: startIndex <= 0 || itemLength >= response.length,
          }"
          @click="startIndex--"
        >
          <van-icon name="arrow-left" />
        </div>
        <div
          class="btn btn--next"
          :class="{
            disabled: startIndex + itemLength >= response.length,
          }"
          @click="startIndex++"
        >
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import StepNumber from "@/components/StepNumber/Index.vue";
import CardB from "@/components/CardB/Index.vue";
import Animationend from "@/components/Animationend/Index.vue";
import { StoreKey, useStore } from "@/store";
import {
  EventsItemReturn,
  fetchEvents,
} from "@/service/analysis/bigScreen/mainBoard/center/events";
import { iwant } from "@guanyu/shared";

@Component({
  components: {
    StepNumber,
    CardB,
    Animationend,
  },
})
export default class C5 extends Base implements IFetch {
  response: EventsItemReturn[] = [];

  startIndex = 0;

  itemLength = 5;

  activeYear = 2;

  get list() {
    return this.response.slice(
      this.startIndex,
      this.startIndex + this.itemLength
    );
  }

  async fetch() {
    const response = await useStore(fetchEvents, {
      key: StoreKey.HomeEvents,
      params: {
        orgType: this.store.global.dataLevel,
        orgId: this.store.global.orgTree.orgId,
      },
    });
    if (response?.status === "ok") {
      this.response = iwant.array(response.data);
    }
    return;
  }
}
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  height: 1650px;
  margin: 10px 0 0;
  background: linear-gradient(
    90deg,
    rgba(1, 15, 65, 0.5) 0%,
    rgba(8, 16, 44, 0.5) 50.26%,
    rgba(4, 18, 68, 0.5) 99.48%
  );
  border: 1px solid #0c265e;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url($track-1), url($track-2);
    background-repeat: no-repeat;
    background-size: 100%;
    background-position-y: bottom, 96%;
  }
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 3px;
    bottom: 0;
    background: linear-gradient(
      90deg,
      rgba(1, 245, 241, 0) 0%,
      rgba(48, 116, 206, 1) 50%,
      rgba(1, 245, 241, 0) 100%
    );
  }
}
.content {
  position: relative;
  height: 100%;
  .list {
    display: flex;
    justify-content: space-between;
    padding: 0 22px;
    height: 100%;
    --animate-duration: 600ms;
  }
  .item {
    width: 412px;
    display: flex;
    font-size: 30px;
    color: #90a4c3;
    line-height: 1.4;
    .details {
      margin: 0 auto;
      width: 383px;
      height: 600px;
      @extend %bg-img-supply-normal;
      transition: 500ms;
      pointer-events: none;
    }
    &.active {
      background: linear-gradient(
        360deg,
        #1b3d75 0%,
        rgba(11, 33, 65, 0) 85.79%
      );
      .details {
        @extend %bg-img-supply-active;
      }
    }

    .year {
      font-size: 36px;
      color: #ffffff;
      margin: 32px 20px 24px;
    }
    .part {
      background: linear-gradient(
        89.96deg,
        rgba(5, 203, 253, 0.1) 0%,
        rgba(0, 127, 249, 0) 100.9%
      );
      margin: 0 10px 34px;
      padding: 0 8px;
      white-space: nowrap;
    }

    &:nth-child(1) .details {
      margin-top: 978px;
    }
    &:nth-child(2) .details {
      margin-top: 811px;
    }
    &:nth-child(3) .details {
      margin-top: 602px;
    }
    &:nth-child(4) .details {
      margin-top: 342px;
    }
    &:nth-child(5) .details {
      margin-top: 0;
    }
  }
  .tools {
    position: absolute;
    bottom: 0;
    width: 100%;
    @extend %flex-center;
    .btn {
      @extend %flex-center;
      margin: 0 3px;
      width: 240px;
      height: 90px;
      font-size: 40px;
      color: #01f5f1;
      background: rgba(56, 196, 255, 0.3);
      backdrop-filter: blur(20px);
      cursor: pointer;
      &.disabled {
        background: rgba(56, 196, 255, 0.1);
        color: #3e6997;
        pointer-events: none;
      }
    }
  }
}
</style>
