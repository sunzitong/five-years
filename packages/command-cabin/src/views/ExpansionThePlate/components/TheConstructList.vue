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
          :class="{ warn: item.riskType !== 'NoRisk' }"
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
        name="YearRange"
        title="首次投委会时间"
        v-model="yearRange"
      ></Select>
      <Select
        @input="fetch"
        name="Options"
        :options="grade"
        v-model="gradeValue"
        title="等级"
        multiple
        placeholder="全部"
      ></Select>
      <Select
        @input="fetch"
        name="Options"
        :options="overdue"
        v-model="overdueValue"
        title="过会超期预警"
        multiple
        placeholder="全部"
      ></Select>
      <Select name="TheOrgTree" title="地区选择"></Select>
      <Pagination :total="response.pages" @change="change" :value="pageNum" />
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
import dayjs from "dayjs";

import {
  ExpandWideDetailReturn,
  fetchExpandWideDetail,
  List,
} from "@/service/analysis/bigScreen/mainBoard/expandDisk/expandWideDetail";

/**营造台账宽表 */
@Component({
  components: { Select, Pagination },
})
export default class TheConstructList extends Base implements IFetch {
  yearRange: number[] = [];

  created() {
    const year = dayjs().year();
    this.yearRange = [year, year];
    window.dayjs = dayjs;
  }

  grade = {
    A: "A",
    B: "B",
    C: "C",
    D: "D",
    E: "E",
    F: "F",
  };
  gradeValue: string[] = [];

  overdue = {
    Y: "是",
    N: "否",
  };
  overdueValue: string[] = [];

  // multiple
  // required

  /**
   * 项目阶段  Open("已开业"), NotOpen("未开业")，默认全部
   */
  stage = {
    Default: "全部",
    Open: "已开业",
    NotOpen: "已开业",
  };
  stageValue = "Default";

  /**
   * 风险类型 Delay("延期风险"), CrossYear("跨年风险"), NoRisk("无风险")，默认全部
   */
  riskType = {
    Default: "全部",
    Delay: "延期风险",
    CrossYear: "跨年风险",
    NoRisk: "无风险",
  };
  riskTypeValue = "Default";

  options: { name: keyof List; text: string }[] = [
    { name: "projectCode", text: "项目编码" },
    { name: "create_time", text: "立项时间" },
    { name: "grade", text: "等级" },
    { name: "gradeDesc", text: "等级对应的名称" },
    { name: "existingStatus", text: "现有状态" },
    { name: "cityCode", text: "城市编码" },
    { name: "city", text: "城市" },
    { name: "projectName", text: "项目名称" },
    { name: "assetType", text: "资产类型" },
    { name: "cooperationMode", text: "合作模式" },
    { name: "expanderLoginName", text: "拓展人" },
    { name: "numberOfRooms", text: "房间数" },
    { name: "firstInvestmentTime", text: "首次投委会时间" },
    { name: "signingTime", text: "签约时间" },
    { name: "oaRegionalDevelopmentDirector", text: "地区拓展负责人" },
    { name: "thisWeekLatestProgress", text: "本周最新进展" },
    { name: "projectReasonAction", text: "项目卡点原因及\n突破动作" },
    { name: "suspendDrain", text: "暂缓/流失原因" },
    { name: "overdueWarning", text: "过会超期预警" },
    { name: "overdueDays", text: "超期天数" },
  ];

  pageNum = 1;

  pageSize = 20;

  response: Partial<ExpandWideDetailReturn> = {};

  /**
   * 自动触发 重复调用
   */
  async fetch() {
    const response = await useStore(fetchExpandWideDetail, {
      key: StoreKey.ExpansionAwardInfo,
      params: {
        // 大区城市
        orgType: this.store.global.dataLevel,
        // 组织ID
        orgId: this.store.global.orgTree.orgId,
        firstInvestStartTime: this.yearRange[0],
        firstInvestEndTime: this.yearRange[1],
        gradeList: this.gradeValue,
        overdueWarning: this.overdueValue,
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
