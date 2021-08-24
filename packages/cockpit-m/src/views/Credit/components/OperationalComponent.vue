<template>
  <ProCard :title="`运营健康度(${coptHealthy.grade}分)`">
    <template v-slot:titleIcon>
      <Tooltip
        v-if="coptHealthy.note"
        title="运营健康度"
        :content="coptHealthy.note"
      />
    </template>
    <ProTable
      :columns="columns"
      :dataSource="coptHealthy.list"
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

@Component({
  components: {
    ProTable,
    ProCard,
    Tooltip,
  },
})
export default class OperationalComponent extends Base {
  columns = [
    { title: "指标", dataIndex: "indexName", width: "1rem" },
    { title: "指标值", dataIndex: "indexValue" },
    { title: "单项得分", dataIndex: "sigleGrade" },
    { title: "权重", dataIndex: "weight" },
    { title: "最终得分", dataIndex: "finalGrade" },
  ];

  /**
   * 运营健康度
   */
  get coptHealthy() {
    return this.store.optData?.coptHealthyList ?? {};
  }
}
</script>

<style lang="scss"></style>
