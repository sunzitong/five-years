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
        :total="response.length"
        :pages="Math.ceil(response.length / pageSize)"
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
  pageSize = 20;
  response: any[] = [];

  options: { name: any; text: string }[] = [
    { name: "phId", text: "区域" },
    { name: "projectName", text: "YTD收入缺口" },
    { name: "city", text: "预估获取项目收入缺口" },
    { name: "approvedDate1", text: "延期开业" },
    { name: "approvedDate2", text: "提前开业" },
    { name: "approvedDate3", text: "正常开业" },
    { name: "approvedDate4", text: "中止" },
    { name: "targetCostNonTax", text: "解约&终止项目收入缺口" },
  ];

  created() {
    const now = dayjs();
    this.years = {
      [now.format("YYYYMM")]: now.year(),
      [now.format("YYYY12")]: now.year() - 1,
    };
    this.yearValue = now.format("YYYYMM");
  }
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
    this.response = [];
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
