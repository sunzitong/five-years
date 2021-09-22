<template>
  <div class="box">
    <div class="header">
      <div class="title">
        资产类型：
        <span>{{ formatValue(response.transactionModel) }}</span>
      </div>
    </div>
    <ul class="list">
      <li class="item">
        <div class="label">开业间数</div>
        <div class="value">
          {{ formatValue(sepNumber(response.openRoomNum)) }}
          <span class="unit">间</span>
        </div>
      </li>
      <li class="item">
        <div class="label">底商面积</div>
        <div class="value">
          {{ formatValue(sepNumber(response.businessArea)) }}
          <span class="unit">万m²</span>
        </div>
      </li>
      <li class="item">
        <div class="label">一展工位数</div>
        <div class="value">
          {{ formatValue(sepNumber(response.workstationNum)) }}
          <span class="unit">个</span>
        </div>
      </li>
      <li class="item">
        <div class="label">车位个数</div>
        <div class="value">
          {{ formatValue(sepNumber(response.parkingSpaceNum)) }}
          <span class="unit">个</span>
        </div>
      </li>
      <li class="item">
        <div class="label">增值点位</div>
        <div class="value">
          {{ formatValue(sepNumber(response.valueAddedPoint)) }}
          <span class="unit">个</span>
        </div>
      </li>
      <li class="item" v-if="response.transactionModelType === 'HeavyAsset'">
        <div class="label">获取时间</div>
        <div class="value">
          {{ formatValue(response.acquireTime) }}
        </div>
      </li>
      <li
        class="item"
        v-if="
          ['MiddleAsset', 'LightAsset'].includes(response.transactionModelType)
        "
      >
        <div class="label">年限</div>
        <div class="value">
          {{ formatValue(sepNumber(response.term)) }}
          <span class="unit">
            {{
              `年（${formatValue(response.projectBeginTime)}～${formatValue(
                response.projectEndTime
              )}）`
            }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import {
  ProjectBaseInfoReturn,
  fetchProjectBaseInfo,
} from "@/service/analysis/bigScreen/projectBoard/basicInformation/projectBaseInfo";
import { iwant } from "@guanyu/shared";
import { StoreKey, useStore } from "@/store";

@Component
export default class A1A extends Base implements IFetch {
  response: Partial<ProjectBaseInfoReturn> = {};
  /**
   * 自动触发 重复调用
   * @returns response
   */
  async fetch() {
    const response = await useStore(fetchProjectBaseInfo, {
      key: StoreKey.ProjectBaseInfo,
      params: { orgId: this.store.global.project.orgId },
    });
    if (response?.status === "ok") {
      this.response = iwant.object(response.data);
    }
    return response;
  }
}
</script>

<style lang="scss" scoped>
$light: #dbf0ff;
$padding-x: 125px;
.box {
  display: flex;
  flex-flow: column nowrap;
  color: #90a4c3;
  line-height: 1;
  .list {
    display: flex;
    flex-wrap: wrap;
    height: 376px;
    background: rgba(65, 105, 158, 0.1);
  }
  .item {
    min-width: 25%;
    height: 120px;
    padding-left: $padding-x;
    box-sizing: border-box;
    margin-top: 50px;
  }
}
.header {
  position: relative;
  z-index: 10;
  display: flex;
  width: 100%;
  height: 92px;
  margin: 0 auto;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    bottom: 0;
    background: linear-gradient(
      90deg,
      rgba(83, 214, 255, 0.05) 0%,
      rgba(81, 128, 228, 0.5) 49.92%,
      rgba(83, 214, 255, 0.05) 100%
    );
  }
  .title {
    padding: 0 52px;
    line-height: 92px;
    font-size: 40px;
    color: #5180e4;
    text-align: center;
    background: linear-gradient(
      180deg,
      rgba(83, 214, 255, 0) 0%,
      rgba(81, 128, 228, 0.1) 100%
    );
    border-bottom: 2px solid #5180e4;
    span {
      color: #fff;
    }
  }
}
.light {
  color: $light;
}
.label {
  font-size: 40px;
}
.value {
  @extend %value__letter;
  font-size: 60px;
  color: $light;
  margin-top: 6px;
}
.unit {
  font-size: 36px;
  color: #90a4c3;
}
</style>
