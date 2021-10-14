<template>
  <Spin class="timeline-wrapper" :loading="loading" :empty="empty">
    <div class="timeline">
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
          <div class="note">
            <span v-for="s of item.note" :key="s">{{ s }}</span>
          </div>
        </van-col>
      </van-row>
    </div>
  </Spin>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import { useStore, StoreKey } from "@/store";
import { iwant } from "@guanyu/shared";
import _ from "lodash";
import {
  fetchMilepost,
  MilepostReturn,
} from "@/service/analysis/bigScreen/projectBoard/basicInformation/milepost";

export enum LightAssetType {
  /**
   * 轻资产
   */
  LightAsset = "LightAsset",

  /**
   * 中资产
   */
  MediumAsset = "MediumAsset",

  /**
   * 重资产
   */
  HeavyAsset = "HeavyAsset",
}

@Component
export default class A1B extends Base implements IFetch {
  /**
   * 时间轴数据
   */
  get timeLineData() {
    const {
      transactionModel,
      firstInvestmentTime,
      signingTime,
      improvementStartDate,
      transferServiceDate,
      actualOpenDate,
      approvedDate,
      dynamicCostNonTax,
      targetCostNonTax,
      costValLandSum,
      startCheckScore,
      workDays,
      fireControlType,
      pointRentRatioToday,
      isIpd,
      structureFinishDate,
      mainFinishDate,
      transferImprovementDate,
      budgetBalanceNoTax,
    } = this.response;

    /**
     * 是否IPD产品
     */
    const improvementNote = isIpd === "是" ? ["IPD产品"] : [];

    switch (transactionModel) {
      case LightAssetType.MediumAsset:
      case LightAssetType.LightAsset:
        return [
          {
            label: "通过投委会",
            date: this.formatValue(firstInvestmentTime),
            note: [],
          },
          {
            label: "签约完成",
            date: this.formatValue(signingTime),
            note: [],
          },
          {
            label: "精装进场",
            date: this.formatValue(improvementStartDate),
            note: improvementNote,
          },
          {
            label: "移交运营",
            date: this.formatValue(transferServiceDate),
            note: [
              `开业检分数 ${this.formatValue(startCheckScore)} `,
              `工期 ${this.formatValue(workDays)}天`,
              `消防情况 ${this.formatValue(fireControlType)}`,
            ],
          },
          {
            label: "开业",
            date: this.formatValue(actualOpenDate),
            note: [`KP出租率 ${this.formatValue(pointRentRatioToday)}%`],
          },
          {
            label: "成本决算",
            date: this.formatValue(approvedDate),
            note: [
              `目标成本 ${this.formatValue(targetCostNonTax)}万元`,
              `动态成本 ${this.formatValue(dynamicCostNonTax)}万元`,
              `结算成本 ${this.formatValue(costValLandSum)}万元`,
              `结余金额 ${this.formatValue(budgetBalanceNoTax)}万元`,
            ],
          },
        ];
      case LightAssetType.HeavyAsset:
        return [
          {
            label: "通过投委会",
            date: this.formatValue(firstInvestmentTime),
            note: [],
          },
          {
            label: "签约完成",
            date: this.formatValue(signingTime),
            note: [],
          },
          {
            label: "结构封顶",
            date: this.formatValue(structureFinishDate),
            note: [],
          },
          {
            label: "主题竣备",
            date: this.formatValue(mainFinishDate),
            note: [],
          },
          {
            label: "精装完成",
            date: this.formatValue(transferImprovementDate),
            note: improvementNote,
          },
          {
            label: "移交运营",
            date: this.formatValue(transferServiceDate),
            note: [
              `开业检分数 ${this.formatValue(startCheckScore)} `,
              `工期 ${this.formatValue(workDays)}天`,
              `消防情况 ${this.formatValue(fireControlType)}`,
            ],
          },
          {
            label: "开业",
            date: this.formatValue(actualOpenDate),
            note: [`KP出租率 ${this.formatValue(pointRentRatioToday)}%`],
          },
          {
            label: "成本决算",
            date: this.formatValue(approvedDate),
            note: [
              `目标成本 ${this.formatValue(targetCostNonTax)}万元`,
              `动态成本 ${this.formatValue(dynamicCostNonTax)}万元`,
              `结算成本 ${this.formatValue(costValLandSum)}万元`,
              `结余金额 ${this.formatValue(budgetBalanceNoTax)}万元`,
            ],
          },
        ];
      default:
        return [];
    }
  }

  response: Partial<MilepostReturn> = {};

  async fetch() {
    const response = await useStore(fetchMilepost, {
      key: StoreKey.ProjectMilepost,
      params: {
        orgId: this.store.global.project.orgId,
      },
    });
    if (response?.status === "ok") {
      this.response = iwant.object(response.data);
    }

    this.empty = _.isEmpty(this.response);

    return response;
  }
}
</script>

<style lang="scss" scoped>
.timeline-wrapper {
  height: 380px;
  overflow: hidden;
}
.timeline {
  position: relative;
  height: 100%;
  margin: 40px 40px -40px 40px;
  text-align: center;
  &::before {
    content: "";
    position: absolute;
    height: 24px;
    width: 100%;
    top: 150px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    @extend %bg-img-step-bg;
    border-radius: 2px;
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
      width: 3px;
      margin-left: -3px;
      height: 40px;
      background-image: linear-gradient(
        to bottom,
        rgba(1, 245, 241, 0) 0%,
        rgba(1, 245, 241, 1) 100%
      );
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
    // width: 215px;
    height: 190px;
    padding-top: 30px;
    overflow: hidden;
    font-size: 28px;
    color: #90a4c3;
    > span {
      display: block;
      white-space: nowrap;
      @extend %txt-over;
    }
  }
}
</style>
