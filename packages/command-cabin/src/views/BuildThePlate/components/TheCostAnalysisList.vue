<template>
  <div class="table-wrap">
    <table class="table" cellspacing="0">
      <thead>
        <tr>
          <th v-for="opt in options" :key="opt.name">{{ opt.text }}</th>
        </tr>
        <tr class="line">
          <th :colspan="options.length" class="line"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in list"
          :key="item.id"
          :class="{
            warn: item.overdueWarning === '是',
          }"
        >
          <td v-for="opt in options" :key="opt.name">
            {{ formatValue(item[opt.name]) }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="footer">
      <Select
        name="YearRange"
        title="成本上线时间"
        v-model="yearRange"
        @input="fetch"
      ></Select>
      <Select
        name="Options"
        :options="risk"
        v-model="riskValue"
        title="目标成本差异率风险"
        @input="fetch"
      ></Select>
      <Select name="TheOrgTree" title="地区选择"></Select>
      <Pagination
        :total="Math.ceil(response.length / pageSize)"
        @change="change"
        :value="pageNum"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import { StoreKey, useStore } from "@/store";
import Select from "@/views/components/Select/Index.vue";
import Pagination from "@/components/Pagination/Index.vue";
import dayjs from "dayjs";
import {
  CostAnalysisListItemReturn,
  fetchCostAnalysisList,
} from "@/service/analysis/bigScreen/mainBoard/construct/costAnalysisList";
import { iwant } from "@guanyu/shared";

/**拓展台账宽表 */
@Component({
  components: { Select, Pagination },
})
export default class TheCostAnalysisList extends Base implements IFetch {
  yearRange: number[] = [];

  created() {
    const year = dayjs().year();
    this.yearRange = [year, year];
    window.dayjs = dayjs;
  }

  /**
   * 风险类型 Delay("延期风险"), CrossYear("跨年风险"), NoRisk("无风险")，默认全部
   */
  risk = {
    Default: "全部",
    True: "有风险",
    False: "无风险",
  };
  riskValue = "Default";

  options: { name: keyof CostAnalysisListItemReturn; text: string }[] = [
    { name: "phId", text: "分期ID" },
    { name: "projectName", text: "项目名称" },
    { name: "city", text: "城市" },
    { name: "approvedDate", text: "目标成本上线时间" },
    { name: "targetCostNonTax", text: "总目标成本" },
    { name: "dynamicCostNonTax", text: "总动态成本" },
    { name: "diff", text: "目标成本差异率" },
  ];

  pageNum = 1;
  pageSize = 20;

  response: CostAnalysisListItemReturn[] = [];

  /**
   * 前端翻页
   */
  get list() {
    const { pageNum, pageSize, response } = this;
    return response.slice((pageNum - 1) * pageSize, pageNum * pageSize);
  }

  /**
   * 自动触发 重复调用
   */
  async fetch() {
    let isRisk: boolean | undefined = undefined;
    if (this.riskValue === "True") {
      isRisk = true;
    }
    if (this.riskValue === "False") {
      isRisk = false;
    }
    const response = await useStore(fetchCostAnalysisList, {
      key: StoreKey.CostAnalysisList,
      params: {
        regionType: this.store.global.dataLevel,
        regionId: this.store.global.orgTree.orgId,
        approvedDateFrom: dayjs()
          .year(this.yearRange[0])
          .startOf("y")
          .format("YYYY-MM-DD HH:mm:ss"),
        approvedDateTo: dayjs()
          .year(this.yearRange[1])
          .endOf("y")
          .format("YYYY-MM-DD HH:mm:ss"),
        isRisk,
      },
    });
    if (response?.status === "ok") {
      this.response = iwant.array(response.data);
    }
    return response;
  }

  /**
   * 翻页
   */
  change(num: number) {
    this.pageNum = num;
  }
}
</script>

<style lang="scss" scoped>
.table-wrap {
  position: relative;
  z-index: 1;
  height: 2578px;
  background: linear-gradient(
    90deg,
    rgba(1, 15, 65, 0.5) 0%,
    rgba(8, 16, 44, 0.5) 6.86%,
    rgba(4, 18, 68, 0.5) 13.58%
  );
  border: 1px solid #0c265e;
  border-top: 2px solid #5180e4;
  color: #90a4c3;
  font-size: 40px;
  .table {
    width: 100%;
    white-space: pre-line;
    text-align: center;
  }
  thead {
    color: #fff;
  }
  tbody {
    max-height: 2200px;
    tr:nth-child(odd) {
      background: #0e173c;
    }
  }
  tr {
    height: 110px;
  }
  .warn {
    color: #ff3980;
  }
  .line {
    height: 2px;
    background: #5180e4;
  }
  .footer {
    height: 268px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    padding: 0 200px 0 186px;
    .page {
      margin: 0 0 0 auto;
    }
  }
}
.select {
  margin-right: 86px;
}
</style>
