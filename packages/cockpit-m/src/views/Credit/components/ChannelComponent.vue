<template>
  <ProCard :title="`渠道效能值(${channelEffect.grade}分)`">
    <template v-slot:titleIcon>
      <Tooltip
        v-if="channelEffect.note"
        title="渠道效能"
        :content="channelEffect.note"
      />
    </template>
    <ProTable
      :columns="columns"
      :dataSource="channelEffect.list"
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
export default class ChannelComponent extends Base {
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
  get channelEffect() {
    return this.store.optData?.channelEffectList ?? {};
  }
}
</script>

<style lang="scss"></style>
