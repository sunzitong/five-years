<template>
  <Spin class="timeline" :loading="loading">
    <van-row
      gutter="10"
      type="flex"
      justify="space-between"
      style="position: relative; z-index: 10"
    >
      <van-col class="col" v-for="item in timeLineData" :key="item.label">
        <div class="top">
          <div class="label">{{ item.label }}</div>
          <div class="date">{{ item.date }}</div>
        </div>
        <div class="note">{{ item.note }}</div>
      </van-col>
    </van-row>
  </Spin>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Base from "@/views/Base";
import {
  fetchProjectBaseInfo,
  ProjectBaseInfoReturn,
} from "@/service/analysis/bigScreen/projectBoard/basicInformation/projectBaseInfo";
import { useStore, StoreKey } from "@/store";
import { iwant } from "@guanyu/shared";

@Component
export default class A1B extends Base {
  timeLineData = [
    { label: "通过投委会", date: "2017-02-01", note: "IPD产品" },
    {
      label: "签约完成",
      date: "2017-02-01",
      note: "开业检分数 90 工期 9个月 消防情况 优",
    },
    { label: "结构封顶", date: "2017-02-01", note: "KP出租率 45%" },
    { label: "主体竣备", date: "2017-02-01", note: null },
    { label: "精装完成", date: "2017-02-01", note: null },
    { label: "移交运营", date: "2017-02-01", note: null },
    { label: "开业", date: "2017-02-01", note: null },
    {
      label: "成本决算",
      date: "2017-02-01",
      note: "目标成本 120万元 结算成本 118万元 结余金额 1万元 翻修成本约 3万元",
    },
  ];

  // TODO 接口文档未出，此处是拷贝
  response: Partial<ProjectBaseInfoReturn> = {};
  async fetch() {
    const response = await useStore(fetchProjectBaseInfo, {
      key: StoreKey.ProjectBaseInfo,
      params: { phId: this.store.global.project.phId },
    });
    if (response?.status === "ok") {
      this.response = iwant.object(response.data);
    }
    return response;
  }
}
</script>

<style lang="scss" scoped>
.timeline {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    height: 10px;
    width: 100%;
    top: 150px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background-image: linear-gradient(
      to right,
      #4d609d 0%,
      #4d609d 20%,
      transparent 50%
    );
    background-size: 10px 10px;
    background-repeat: repeat-x;
  }

  .col {
    max-width: 300px;
  }

  .top {
    position: relative;
    height: 150px;
    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 2px;
      height: 20px;
      background: #f50;
    }
  }

  .label {
    font-size: 36px;
    color: #fff;
  }

  .date {
    color: #90a4c3;
    font-size: 30px;
  }

  .note {
    padding-top: 30px;
    width: 200px;
    font-size: 28px;
    color: #90a4c3;
  }
}
</style>
