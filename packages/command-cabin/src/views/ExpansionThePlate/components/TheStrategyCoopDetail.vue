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
          v-for="item in response.list"
          :key="item.id"
          :class="{ warn: item.overdueWarning === '是' }"
        >
          <td v-for="opt in options" :key="opt.name">
            {{ formatValue(item[opt.name]) }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="footer">
      <Select
        @input="fetch"
        name="Options"
        :options="type"
        v-model="typeValue"
        title="类型"
        multiple
        placeholder="全部"
      ></Select>
      <Select
        @input="fetch"
        name="Options"
        :options="enterpriseState"
        v-model="enterpriseStateValue"
        title="企业状态"
        multiple
        placeholder="全部"
      ></Select>
      <Select name="TheOrgTree" title="地区选择"></Select>
      <Pagination
        :pages="response.pages"
        :total="response.total"
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
import { iwant } from "@guanyu/shared";
import Select from "@/views/components/Select/Index.vue";
import Pagination from "@/components/Pagination/Index.vue";
import {
  fetchStrategyCoopDetail,
  StrategyCoopDetailReturn,
  List,
} from "@/service/analysis/bigScreen/mainBoard/expandDisk/strategyCoopDetail";

/**战略宽表 */
@Component({
  components: { Select, Pagination },
})
export default class TheStrategyCoopDetail extends Base implements IFetch {
  /**
   * 类型
   */
  type = {
    1: "国企平台",
    2: "总对总",
    3: "资金方",
  };
  typeValue: string[] = [];

  /**
   * 企业状态
   */
  enterpriseState = {
    1: "已合作",
    2: "洽谈中",
    3: "暂缓",
    4: "流失",
  };
  enterpriseStateValue: string[] = [];

  options: { name: keyof List; text: string }[] = [
    { name: "city", text: "城市" },
    { name: "partnerName", text: "合作方名称" },
    { name: "enterpriseStateDesc", text: "企业状态描述" },
    { name: "typeDesc", text: "类型描述" },
  ];

  pageNum = 1;

  pageSize = 20;

  response: Partial<StrategyCoopDetailReturn> = {};

  /**
   * 自动触发 重复调用
   */
  async fetch() {
    const response = await useStore(fetchStrategyCoopDetail, {
      key: StoreKey.ExpansionAwardInfo,
      params: {
        // 大区城市
        orgType: this.store.global.dataLevel,
        // 组织ID
        orgId: this.store.global.orgTree.orgId,
        type: this.typeValue.length ? this.typeValue.join(",") : undefined,
        enterpriseState: this.enterpriseStateValue.length
          ? this.enterpriseStateValue.join(",")
          : undefined,
        // 页容量
        pageSize: this.pageSize,
        // 页码
        pageNum: this.pageNum,
      },
    });
    if (response?.status === "ok") {
      response.data = iwant.object(response.data);
      response.data.list = iwant.array(response.data.list);
      this.response = response.data;
    }
    return response;
  }

  /**
   * 翻页
   */
  change(num: number) {
    this.pageNum = num;
    this.fetch();
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

function fetchExpandWideDetail(fetchExpandWideDetail: any, arg1: { key:
StoreKey.ExpansionAwardInfo; params: { // 大区城市 orgType:
import("../../../service/analysis/commandCabin/publicEnum").DataLevels; //
组织ID orgId: number; // 页容量 pageSize: number; // 页码 pageNum: number; }; })
{ throw new Error("Function not implemented."); }
