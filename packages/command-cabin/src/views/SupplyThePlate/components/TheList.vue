<template>
  <div class="table-wrap">
    <table class="table" cellspacing="0">
      <thead>
        <tr>
          <template v-for="(opt, index) in options">
            <th
              :key="opt.name"
              v-if="index < 3 || index > 6"
              rowspan="2"
              :class="{ 'line--left': index === options.length - 1 }"
            >
              {{ opt.text }}
            </th>
            <th
              :key="opt.name"
              v-if="index === 3"
              colspan="4"
              class="line--left line--bottom"
            >
              已开业项目收入缺口
            </th>
          </template>
        </tr>
        <tr>
          <template v-for="(opt, index) in options">
            <th
              :key="opt.name"
              v-if="index >= 3 && index <= 6"
              :class="{ 'line--left': index === 3 }"
            >
              {{ opt.text }}
            </th>
          </template>
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
            warn: item.isRisk,
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
        name="Options"
        :options="years"
        v-model="yearValue"
        title="年份"
        @input="fetch"
      ></Select>
      <Select name="TheOrgTree" title="地区选择"></Select>
      <Pagination
        :total="response.citySupplyDetails.length + 1"
        :pages="Math.ceil(response.citySupplyDetails.length / pageSize)"
        @change="change"
        :value="pageNum"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import Select from "@/views/components/Select/Index.vue";
import Pagination from "@/components/Pagination/Index.vue";
import dayjs from "dayjs";
import { StoreKey, useStore } from "@/store";
import {
  fetchSupplyAndMarketingSaveDetail,
  SupplyAndMarketingSaveDetailReturn,
} from "@/service/analysis/bigScreen/mainBoard/center/supplyAndMarketingSaveDetail";
import { iwant } from "@guanyu/shared";
import { DateScopes } from "@/service/analysis/commandCabin/publicEnum/enums";

/**成本列表 */
@Component({
  components: { Select, Pagination },
})
export default class TheList extends Base implements IFetch {
  /**
   * 当前年和上一年
   */
  years: Record<string, number> = {};
  yearValue = "";
  pageNum = 1;
  pageSize = 18;
  response: Partial<SupplyAndMarketingSaveDetailReturn> = {
    citySupplyDetails: [],
  };

  options: {
    name: keyof SupplyAndMarketingSaveDetailReturn;
    text: string;
  }[] = [
    { name: "needShowName", text: "区域" },
    { name: "ytdIncomeGap", text: "YTD收入缺口" },
    { name: "forecastIncomeGap", text: "预估获取项目收入缺口" },
    { name: "openedAndPostponeIncomeGap", text: "延期开业" },
    { name: "openedAndAheadIncomeGap", text: "提前开业" },
    { name: "openAsUsualIncomeGap", text: "正常开业" },
    { name: "openedAndTerminationIncomeGap", text: "中止" },
    { name: "contractTerminationIncomeGap", text: "解约&终止项目收入缺口" },
  ];

  created() {
    const now = dayjs(this.store.env.NOW);
    this.years = {
      [now.format("YYYY-MM")]: now.year(),
      [now.format("YYYY-12")]: now.year() - 1,
    };
    this.yearValue = now.format("YYYY-MM");
  }
  /**
   * 前端翻页
   */
  get list() {
    const { pageNum, pageSize, response } = this;
    const details = iwant.array(response.citySupplyDetails);
    const list = [response];
    list.push(...details.slice((pageNum - 1) * pageSize, pageNum * pageSize));
    return list;
  }

  /**
   * 自动触发 重复调用
   */
  async fetch() {
    const response = await useStore(fetchSupplyAndMarketingSaveDetail, {
      key: StoreKey.HomeSupplyAndMarketingSaveDetail,
      params: {
        orgType: this.store.global.dataLevel,
        orgId: this.store.global.orgTree.orgId,
        orgName: this.store.global.orgTree.orgName,
        date: this.yearValue,
        // TODO 固定年累
        dateScope: DateScopes.YEARLY,
      },
    });
    if (response?.status === "ok") {
      const data = iwant.object(response.data);
      data.needShowName = data.regionName;
      data.citySupplyDetails = iwant.array(data.citySupplyDetails);
      this.response = data;
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
    min-width: 2700px;
    margin: auto;
    white-space: pre-line;
    text-align: center;
    table-layout: fixed;
  }
  thead {
    color: #fff;
    .line--left {
      border-left: 1px solid #445da5;
    }
    .line--bottom {
      border-bottom: 1px solid #445da5;
    }
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
