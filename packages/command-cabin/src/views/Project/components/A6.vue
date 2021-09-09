<template>
  <div class="timeline">
    <van-row
      gutter="20"
      type="flex"
      align="center"
      v-for="item in timeLineData"
      :key="item.label"
      style="position: relative; z-index: 10"
    >
      <van-col span="6">
        <div class="label">{{ item.label }}</div>
      </van-col>
      <van-col span="2">
        <div class="dot"></div>
        <div class="cover"></div>
      </van-col>
      <van-col span="4">
        <div class="date">{{ item.date }}</div>
      </van-col>
      <van-col span="8" style="padding: 50px 0">
        <div class="note" v-if="item.note">{{ item.note }}</div>
      </van-col>
    </van-row>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Base from "@/views/Base";

@Component
export default class A6 extends Base {
  timeLineData = [
    { label: "通过投委会", date: "2017-02-01", note: "IPD产品" },
    {
      label: "签约完成",
      date: "2017-02-01",
      note: "开业检分数 90 工期 9个月 消防情况 优",
    },
    { label: "精装进场", date: "2017-02-01", note: "KP出租率 45%" },
    { label: "移交运营", date: "2017-02-01", note: null },
    { label: "开业", date: "2017-02-01", note: null },
    {
      label: "成本决算",
      date: "2017-02-01",
      note: "目标成本 120万元 结算成本 118万元 结余金额 1万元 翻修成本约 3万元",
    },
  ];
}
</script>

<style lang="scss" scoped>
.timeline {
  .label {
    font-size: 36px;
    text-align: right;
    color: #01f5f1;
  }

  .dot {
    position: relative;
    width: 42px;
    height: 42px;
    margin: 0 auto;
    border-radius: 100%;
    background-color: #2f588a;

    &::before {
      content: "";
      position: absolute;
      top: 5px;
      left: 5px;
      right: 5px;
      bottom: 5px;
      border-radius: 100%;
      background-color: #62aed8;
    }

    &::after {
      content: "";
      position: absolute;
      top: 12px;
      left: 12px;
      right: 12px;
      bottom: 12px;
      border-radius: 100%;
      background-color: #79d4fa;
    }
  }

  &::before {
    content: "";
    position: absolute;
    width: 10px;
    top: 0;
    left: 29.166666%;
    bottom: 0;
    margin-left: -6px;
    width: 10px;
    background-image: linear-gradient(
      to bottom,
      #4d609d 0%,
      #4d609d 20%,
      transparent 50%
    );
    background-size: 10px 10px;
    background-repeat: repeat-y;
  }

  .van-row:nth-last-child(1)::before,
  .van-row:nth-child(1)::before {
    content: "";
    position: absolute;
    top: 0;
    left: 29.16666%;
    width: 20px;
    margin-left: -10px;
    background: #0b1f51;
    height: 50%;
  }

  .van-row:nth-last-child(1)::before {
    top: auto;
    bottom: 0;
  }

  .date {
    color: #fff;
    font-size: 30px;
  }

  .note {
    padding: 16px 35px;
    background: #24386d;
    border-radius: 10px;
    font-size: 28px;
    color: #88a3e9;
  }
}
</style>
