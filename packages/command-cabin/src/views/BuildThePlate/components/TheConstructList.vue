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
        title="开业年份"
        v-model="yearRange"
      ></Select>
      <Select
        @input="fetch"
        name="Options"
        :options="stage"
        v-model="stageValue"
        title="项目阶段"
      ></Select>
      <Select
        @input="fetch"
        name="Options"
        :options="riskType"
        v-model="riskTypeValue"
        title="风险类型"
      ></Select>
      <Select name="TheOrgTree" title="地区选择"></Select>
      <Pagination :total="response.pages" @change="change" :value="pageNum" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import {
  fetchList,
  List,
  ListReturn,
} from "@/service/analysis/bigScreen/mainBoard/construct/list";
import { StoreKey, useStore } from "@/store";
import { iwant } from "@guanyu/shared";
import Select from "@/views/components/Select/Index.vue";
import Pagination from "./Pagination.vue";
import dayjs from "dayjs";

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
    { name: "projectNo", text: "分期ID" },
    { name: "name", text: "项目名称" },
    { name: "cityDepartmentName", text: "城市" },
    { name: "year", text: "开业年份" },
    { name: "stage", text: "项目阶段" },
    { name: "transactionModel", text: "资产类型" },
    { name: "roomNum", text: "房间间数" },
    { name: "planEnterDate", text: "计划进场时间" },
    { name: "actualEnterDate", text: "实际进场时间" },
    { name: "structureFinishDate", text: "结构封顶时间\n（重）" },
    { name: "mainFinishDate", text: "主体竣备时间\n（重）" },
    {
      name: "transferImprovementDate",
      text: "室内清水作业面\n移交精装完成时间（重）",
    },
    { name: "improvementStartDate", text: "精装进场时间\n（中、轻）" },
    { name: "isIpd", text: "是否IPD" },
    { name: "transferServiceDate", text: "移交运营时间" },
    { name: "workDays", text: "工期天数" },
    { name: "planOpenDate", text: "计划开业时间" },
    { name: "actualOpenDate", text: "实际开业时间" },
    { name: "startCheckScore", text: "开业检分数" },
    { name: "midCheckScore", text: "中期停止点\n检查得分" },
    { name: "qualityScore", text: "移交质量评估\n合格率" },
    { name: "riskTypeDesc", text: "风险类别" },
    { name: "riskReportDate", text: "风险提报时间" },
    { name: "chokePoint", text: "项目卡点" },
    { name: "fireControlType", text: "消防证照合规性" },
  ];

  pageNum = 1;

  pageSize = 20;

  response: Partial<ListReturn> = {};

  /**
   * 自动触发 重复调用
   */
  async fetch() {
    const response = await useStore(fetchList, {
      key: StoreKey.ConstructList,
      params: {
        // 大区城市
        orgType: this.store.global.dataLevel,
        // 组织ID
        orgId: this.store.global.orgTree.orgId,
        // 开业开始时间
        openYearStart: this.yearRange[0],
        // 开业结束时间
        openYearEnd: this.yearRange[1],
        // 项目阶段
        stage: this.stageValue === "Default" ? undefined : this.stageValue,
        // 延期类型
        riskType:
          this.riskTypeValue === "Default" ? undefined : this.riskTypeValue,
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
