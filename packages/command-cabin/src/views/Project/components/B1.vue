<template>
  <Spin :height="2533" :loading="loading" :empty="empty">
    <div class="page__b1__map">
      <B1A :titles="titles" :tabs="tabList" :list="resData.infoMap" />
    </div>
  </Spin>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import { StoreKey, useStore } from "@/store";
import {
  fetchFinanceLine,
  FinanceLineReturn,
} from "@/service/analysis/bigScreen/projectBoard/finance/financeLine";
import B1A from "./B1A.vue";
import { iwant } from "@guanyu/shared";

@Component({
  components: { B1A },
})
export default class B1 extends Base implements IFetch {
  resData: Partial<FinanceLineReturn> = {};

  tabLabels = {
    HeavyAsset: [
      ["净利润率", "NPI利润率", "YC", "现金流"],
      ["收入", "平均出租率", "平均单房价格", "涨幅"],
      ["三费合计", "营销费用", "运营成本", "管理成本"],
      ["COST"],
    ],
    MediumAsset: [
      ["净利润率", "NPI利润率", "YC", "现金流"],
      ["收入", "平均出租率", "平均单房价格", "涨幅"],
      ["三费合计", "营销费用", "运营成本", "管理成本"],
      ["承租租金", "COST"],
    ],
    LightAsset: [
      ["净利润率", "NPI利润率", "现金流"],
      ["收入", "平均出租率", "平均单房价格", "涨幅"],
      ["三费合计", "营销费用", "运营成本", "管理成本"],
    ],
  };

  pannelTitles = {
    HeavyAsset: [
      "净利润率/NPI利润率/Y-C/现金流预估",
      "收入预估",
      "三费预估",
      "承租租金&COST预估",
    ],
    MediumAsset: [
      "净利润率/NPI利润率/Y-C/现金流预估",
      "收入预估",
      "三费预估",
      "承租租金&COST预估",
    ],
    LightAsset: ["净利润率/NPI利润率/Y-C/现金流预估", "收入预估", "三费预估"],
  };

  tabList: string[][] = [];
  titles: string[] = [];

  async fetch() {
    const response = await useStore(fetchFinanceLine, {
      key: StoreKey.ProjectFinanceLine,
      params: {
        phId: this.store.global.project.phId,
      },
    });
    if (response?.status === "ok") {
      this.resData = response.data;
      this.tabList = this.tabLabels[
        iwant.string(this.resData.transactionModel)
      ];
      this.titles = this.pannelTitles[
        iwant.string(this.resData.transactionModel)
      ];
    } else {
      this.empty = true;
    }
    return response;
  }
}
</script>

<style lang="scss" scoped></style>
