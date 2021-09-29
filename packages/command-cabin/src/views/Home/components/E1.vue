<template>
  <Spin class="warning" :loading="loading" :empty="empty">
    <div class="table-wrapper">
      <table class="table" cellspacing="0">
        <thead>
          <tr>
            <th v-for="item of columns" :key="item.dataIndex">
              {{ item.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item of response" :key="item.projectId">
            <td v-for="o of columns" :key="o.dataIndex">
              <template v-if="o.dataIndex === columns[4].dataIndex">
                <Icon
                  type="warning"
                  v-for="(n, index) of 3"
                  :color="
                    index + 1 <= item[o.dataIndex] ? ['#FF3980'] : ['#6F6F6F']
                  "
                  :key="n"
                />
              </template>
              <template v-else-if="o.dataIndex === columns[2].dataIndex">
                <div class="warningType" :class="getWarningInfo(item).cls">
                  <Icon
                    size="20"
                    type="security"
                    :color="getWarningInfo(item).color"
                  />
                  <span>{{ item[o.dataIndex] }}</span>
                </div>
              </template>
              <template v-else>
                {{ item[o.dataIndex] }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </Spin>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import F1A from "./F1A.vue";
import F1B from "./F1B.vue";
import { StoreKey, useStore } from "@/store";
import Icon from "@/components/Icon/Index.vue";
import { Swipe } from "vant";
import {
  EarlyWarningItemReturn,
  fetchEarlyWarning,
} from "@/service/analysis/bigScreen/mainBoard/center/earlyWarning";

@Component({
  components: {
    F1A,
    F1B,
    Icon,
  },
})
export default class E1 extends Base implements IFetch {
  @Ref() swipe!: Swipe;

  /**
   * 表格数据
   */
  dataSource = [];

  /**
   * 表头
   */
  columns = [
    { title: "门店", dataIndex: "projectName" },
    { title: "阶段", dataIndex: "stageDesc" },
    { title: "预警类型", dataIndex: "typeDesc" },
    { title: "预警详情", dataIndex: "detail" },
    { title: "风险程度", dataIndex: "riskDegree" },
  ];

  /**
   * 返回数据
   */
  response: EarlyWarningItemReturn[] = [];

  /**
   * 获取预警信息更改主题
   */
  getWarningInfo(type: string) {
    const cls = {
      aaa: true,
    };
    const color = "#fff";
    return { cls, color };
  }

  /**
   * 请求数据
   * 自动触发 重复调用
   * @returns response
   */
  async fetch() {
    const response = await useStore(fetchEarlyWarning, {
      key: StoreKey.HomeEarlyWarning,
      params: {
        dataLevel: this.store.global.dataLevel,
        levelId: this.store.global.orgTree.orgId,
        dateScope: this.store.global.dateScope,
        stage: "INVEST",
        riskDegree: 3,
      },
    });
    if (response?.status === "ok") {
      this.response = response.data ?? [];
    }
    return response;
  }
}
</script>

<style lang="scss" scoped>
$step-color: #0e173c;
.table-wrapper {
  height: 770px;
  overflow: hidden;
}
.table {
  width: 100%;
  table-layout: fixed;
  text-align: center;
  td,
  th {
    height: 100px;
  }
  th {
    background: $step-color;
  }
  td {
    color: #90a4c3;
  }
  tbody {
    tr:nth-child(even) {
      background: $step-color;
    }
  }
  .warningType {
    display: inline-block;
    padding: 5px 15px;
    border: 1px solid #f50;
    text-align: center;
    border-radius: 100px;
    svg {
      margin-right: 5px;
    }
    &.aaa {
      background: rgba(255, 203, 123, 0.2);
      border: 1px solid #ffcb7b;
    }
    &.bbb {
      background: rgba(255, 57, 128, 0.2);
      border: 1px solid #ff3980;
    }
    &.ccc {
      background: rgba(153, 183, 246, 0.2);
      border: 1px solid #99b7f6;
    }
    &.ddd {
      background: rgba(180, 145, 253, 0.2);
      border: 1px solid #b491fd;
    }
    &.eee {
      background: rgba(34, 203, 152, 0.2);
      border: 1px solid #22cb98;
    }
  }
}
</style>
