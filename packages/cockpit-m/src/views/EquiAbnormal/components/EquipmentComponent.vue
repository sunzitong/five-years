<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="finishedText"
      @load="onLoad"
    >
      <ProTable
        sticky
        :stickyTop="49"
        rowKey="id"
        :columns="columnsEqui"
        :dataSource="dataSourceEquipment"
      ></ProTable>
    </van-list>
  </van-pull-refresh>
</template>

<script lang="ts">
import Base from "@/views/Base";
import { Component } from "vue-property-decorator";
import ProTable, { ColumnsItem } from "@/components/ProTable.vue";
import ProCard from "@/components/ProCard.vue";
import { iwant, Nullable } from "@guanyu/shared";
import { EquipmentOffline, queryEquipment } from "@/service";

@Component({
  components: {
    ProTable,
    ProCard,
  },
})
export default class EquipmentComponent extends Base {
  pageNum = 0;
  pageSize = 10;
  /** 加载载 */
  loading = false;
  /** 加载完成 */
  finished = false;
  /** 刷新 */
  refreshing = false;
  // 接口数据
  cusStoreData: Nullable<EquipmentOffline> = null;
  dataSourceEquipment: EquipmentOffline["list"] = [];
  /** 设备离线 */
  columnsEqui: ColumnsItem[] = [
    { title: "房间号", dataIndex: "roomNumber" },
    { title: "设备", dataIndex: "equipTypeDesc" },
    { title: "未同步天数", dataIndex: "offlineDay" },
  ];
  /** 项目ID */
  get projectId() {
    return iwant.string(this.$route.query.projectId);
  }

  /** 没有数据不显示没有更多了 */
  get finishedText() {
    return this.dataSourceEquipment.length === 0 ? "" : "没有更多了";
  }

  async fetchData() {
    if (!this.projectId) return;
    const response = await queryEquipment({
      projectId: this.projectId,
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    });
    if (response?.status === "ok") {
      const data = iwant.object(response.data);
      this.cusStoreData = data;
      this.dataSourceEquipment = this.dataSourceEquipment.concat(data.list);
      this.finished = this.dataSourceEquipment.length >= data.total;
    } else {
      this.finished = true;
    }
  }

  async onLoad() {
    this.refreshing = false;
    this.pageNum++;
    await this.fetchData();
    this.loading = false;
    // 取后端接口返回页码
    if (this.cusStoreData?.pageNum) {
      this.pageNum = this.cusStoreData.pageNum;
    }
  }

  onRefresh() {
    this.dataSourceEquipment = [];
    this.refreshing = false;
    this.pageNum = 0;
    this.finished = false;
    this.loading = true;
    this.onLoad();
  }
}
</script>

<style lang="scss" scoped></style>
