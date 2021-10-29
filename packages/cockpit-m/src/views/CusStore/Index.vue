<template>
  <div class="page__cus">
    <ProCard title="个人转化率" v-if="cusStoreData">
      <ProTable
        rowKey="name"
        :columns="columnsPersonal"
        :dataSource="cusStoreData.personal"
      >
        <template v-slot:th="{ dataIndex }">
          <span v-if="dataIndex === 'ration'">
            <div>P1/P4</div>
            <div class="th__minor">转化率</div>
          </span>
        </template>
        <template v-slot:extra="{ cellKey, defaultValue }">
          {{ cellKey === "ration" ? `${defaultValue}%` : defaultValue }}
        </template>
      </ProTable>
    </ProCard>
    <div class="hr"></div>
    <ProCard title="渠道转化率" v-if="cusStoreData">
      <ProTable
        rowKey="name"
        :columns="columnsChannel"
        :dataSource="cusStoreData.channel"
      >
        <template v-slot:th="{ dataIndex }">
          <span v-if="dataIndex === 'ration'">
            <div>P1/P4</div>
            <div class="th__minor">转化率</div>
          </span>
        </template>
        <template v-slot:extra="{ cellKey, defaultValue }">
          {{ cellKey === "ration" ? `${defaultValue}%` : defaultValue }}
        </template>
      </ProTable>
    </ProCard>
  </div>
</template>

<script lang="ts">
import Base from "@/views/Base";
import { Component } from "vue-property-decorator";
import ProTable, { ColumnsItem } from "@/components/ProTable.vue";
import ProCard from "@/components/ProCard.vue";
import { iwant, Nullable } from "@guanyu/shared";
import isEmpty from "lodash/isEmpty";
import { CusStore, queryCusStore } from "@/service";
import dayjs from "dayjs";

@Component({
  components: {
    ProTable,
    ProCard,
  },
})
export default class CusStorePage extends Base {
  isEmpty = isEmpty;

  projectId = "";
  // 参数 日期选择
  dataDate: string | null = null;
  // 接口数据
  cusStoreData: Nullable<CusStore> = null;
  // table配置
  columnsPersonal: ColumnsItem[] = [
    { title: "姓名", dataIndex: "name" },
    { title: "P1", dataIndex: "p1" },
    { title: "P2", dataIndex: "p2" },
    { title: "P4", dataIndex: "p4" },
    { title: "P1/P4转化率", dataIndex: "ration" },
  ];
  // table配置
  columnsChannel: ColumnsItem[] = [
    { title: "渠道平台", dataIndex: "name" },
    { title: "P1", dataIndex: "p1", sortable: true },
    { title: "P2", dataIndex: "p2", sortable: true },
    { title: "P4", dataIndex: "p4", sortable: true },
    { title: "P1/P4转化率", dataIndex: "ration", sortable: true },
  ];

  async mounted() {
    // 设置APP日期选择回调
    this.getAppPickerValue((month) => {
      this.dataDate = month;
      this.fetchData();
      return true;
    });
    // 设置APP日期选择区间
    this.setAppPickerRange({
      startDate: dayjs().subtract(11, "month").format("YYYY-MM-DD"),
      endDate: dayjs().format("YYYY-MM-DD"),
    });
    // 设置日期默认值
    this.dataDate = dayjs().format("YYYY-MM");
    // 参数判断
    const projectId = iwant.string(this.$route.query.projectId);
    if (!projectId) {
      return;
    }
    this.projectId = projectId;
    await this.fetchData();
  }

  async fetchData() {
    if (!this.dataDate) return;
    const response = await queryCusStore({
      projectId: this.projectId,
      dataDate: this.dataDate,
    });
    if (response?.status === "ok") {
      const data = iwant.object(response.data);
      this.cusStoreData = data;
      // 设置APP日期默认值
      this.setAppPickerDefaultValue({
        startDate: this.dataDate,
        type: "month",
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.page__cus {
  &::v-deep {
    .pro__card__title {
      color: #232832;
    }
  }
  .hr {
    height: 6px;
    background-color: #f9f9f9;
  }
  .th__minor {
    font-size: 10px;
    color: #a5aaaf;
  }
}
</style>
