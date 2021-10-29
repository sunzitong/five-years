<template>
  <ProCard :title="`信用指数(${creditIndex.grade}分)`">
    <template v-slot:titleIcon>
      <Tooltip
        v-if="creditIndex.note"
        title="信用指数"
        :content="creditIndex.note"
      />
    </template>
    <ProTable
      :columns="columns"
      :dataSource="creditIndex.list"
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
export default class CreditComponent extends Base {
  columns = [
    { title: "指标", dataIndex: "indexName", width: "1rem" },
    { title: "指标值", dataIndex: "indexValue" },
    { title: "单项得分", dataIndex: "sigleGrade" },
    { title: "权重", dataIndex: "weight" },
    { title: "最终得分", dataIndex: "finalGrade" },
  ];

  /**
   * 信息指数
   */
  get creditIndex() {
    return this.store.optData?.creditIndexList ?? {};
  }
}
</script>

<style lang="scss"></style>
