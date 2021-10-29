<template>
  <ProCard :title="`筹开达成率(${prepareReachRatio.grade}分)`">
    <template v-slot:extra>
      <router-link :to="jumpTo()">查看KP达成排名</router-link>
    </template>
    <template v-slot:titleIcon>
      <Tooltip
        v-if="prepareReachRatio.note"
        title="筹开达成率"
        :content="prepareReachRatio.note"
      />
    </template>
    <ProTable
      :columns="columns"
      :dataSource="prepareReachRatio.list"
      rowKey="indexName"
    >
      <template v-slot:icon="{ row, cellKey }">
        <Tooltip
          v-if="cellKey === 'sigleGrade' && row.note"
          :iconProps="{ size: 16 }"
          :title="row.indexName"
          :content="row.note"
        />
      </template>
    </ProTable>
  </ProCard>
</template>

<script lang="ts">
import Base from "@/views/Base";
import { Component } from "vue-property-decorator";
import ProTable from "@/components/ProTable.vue";
import ProCard from "@/components/ProCard.vue";
import Tooltip from "@/components/Tooltip.vue";
import { getQueries } from "@guanyu/shared";

@Component({
  components: {
    ProTable,
    ProCard,
    Tooltip,
  },
})
export default class PrepareComponent extends Base {
  columns = [
    { title: "指标", dataIndex: "indexName", width: "1rem" },
    { title: "指标值", dataIndex: "indexValue" },
    { title: "单项得分", dataIndex: "sigleGrade" },
    { title: "权重", dataIndex: "weight" },
    { title: "最终得分", dataIndex: "finalGrade" },
  ];

  /**
   * 渠道效能
   */
  get prepareReachRatio() {
    return this.store.optData?.prepareReachRatioList ?? {};
  }

  jumpTo() {
    const { projectId } = getQueries();
    return `/yearsKP?projectId=${projectId || ""}`;
  }
}
</script>

<style lang="scss"></style>
