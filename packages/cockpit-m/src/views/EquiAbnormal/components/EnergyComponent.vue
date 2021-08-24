<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="finishedText"
      @load="onLoad"
    >
      <ProTable
        rowKey="id"
        sticky
        :stickyTop="49"
        :columns="columnsEnergy"
        :dataSource="dataSourceEnergy"
      >
        <template v-slot:extra="{ row, defaultValue, cellKey }">
          <template v-if="cellKey === 'equMsgList'">
            <div
              class="catchWidth"
              v-for="item of row.equMsgList"
              :key="item.equipTypeDesc"
            >
              {{ item.equipTypeDesc }}：{{ item.exceptionRemark }}
            </div>
          </template>
          <template v-else>
            {{ defaultValue }}
          </template>
        </template>
      </ProTable>
    </van-list>
    <ProPicker ref="picker" :showValue="false">
      <template v-slot:picker="{ cancel }">
        <van-datetime-picker
          v-bind="dateTimePicker.props"
          @cancel="cancel"
          @confirm="
            (date) => {
              dateTimePicker.confirm(date);
              cancel();
            }
          "
        />
      </template>
    </ProPicker>
  </van-pull-refresh>
</template>

<script lang="ts">
import Base from "@/views/Base";
import { Component, Ref } from "vue-property-decorator";
import ProTable, { ColumnsItem } from "@/components/ProTable.vue";
import ProCard from "@/components/ProCard.vue";
import ProPicker from "@/components/ProPicker.vue";
import { iwant, Nullable } from "@guanyu/shared";
import { EquipmentEnergy, queryEquipmentEnergy } from "@/service";
import dayjs from "dayjs";

@Component({
  components: {
    ProTable,
    ProCard,
    ProPicker,
  },
})
export default class EnergyComponent extends Base {
  @Ref() picker!: ProPicker;
  pageNum = 1;
  pageSize = 10;
  startDate = dayjs().subtract(1, "days");
  /** 加载载 */
  loading = false;
  /** 加载完成 */
  finished = false;
  /** 刷新 */
  refreshing = false;
  // 接口数据
  cusStoreData: Nullable<EquipmentEnergy> = null;
  dataSourceEnergy: EquipmentEnergy["list"] = [];
  /** 设备离线 */
  columnsEnergy: ColumnsItem[] = [
    { title: "房间号", dataIndex: "roomNumber" },
    { title: "房间在租情况", dataIndex: "rentStatus" },
    { title: "异常情况", dataIndex: "equMsgList" },
  ];

  /**
   * 日期控件属性
   */
  dateTimePicker = {
    props: {
      minDate: new Date(
        this.startDate.subtract(12, "months").format("YYYY-MM-DD")
      ),
      maxDate: new Date(this.startDate.format("YYYY-MM-DD")),
      type: "date",
      value: new Date(this.startDate.format("YYYY-MM-DD")),
    },
    confirm: (date: string) => {
      this.dateTimePicker.props.value = new Date(
        dayjs(date).format("YYYY-MM-DD")
      );
      /** 重新设置picker为选中的日期 */
      this.showPickerAndSetDefaultValue();
      this.onRefresh();
    },
  };

  /** 项目ID */
  get projectId() {
    return iwant.string(this.$route.query.projectId);
  }

  /** 没有数据不显示没有更多了 */
  get finishedText() {
    return this.dataSourceEnergy?.length === 0 ? "" : "没有更多了";
  }

  mounted() {
    this.showPickerAndSetDefaultValue();
    this.fetchData();
  }

  /**
   * 设置日期选择框值
   */
  showPickerAndSetDefaultValue() {
    window.app_picker_change_handler = () => {
      this.picker.toggle(true);
    };
    this.setAppNavButtons({
      right: [
        {
          title: {
            text:
              dayjs(this.dateTimePicker.props.value).format("YYYY-MM-DD") ??
              this.startDate.format("YYYY-MM-DD"),
            fontSize: 14,
            color: "#1C7AF7",
          },
          image: {
            src:
              "https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/guanyuapp/rQq-JEUc88HbqMLprufG-g.png",
            position: "right",
            width: 16,
            height: 14,
          },
          js: "window.app_picker_change_handler()",
        },
      ],
    });
  }

  /**
   * 加载数据
   */
  async fetchData() {
    if (!this.projectId || !this.dateTimePicker.props.value) return;
    const response = await queryEquipmentEnergy({
      projectId: this.projectId,
      date: dayjs(this.dateTimePicker.props.value).format("YYYY-MM-DD"),
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    });
    if (response?.status === "ok") {
      const data = iwant.object(response.data);
      this.cusStoreData = data;
      this.dataSourceEnergy = this.dataSourceEnergy.concat(data.list);
      this.finished = this.dataSourceEnergy.length >= data.total;
    } else {
      this.finished = true;
    }
  }

  /**
   * 加载更多
   */
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

  /**
   * 下拉刷新
   */
  onRefresh() {
    this.dataSourceEnergy = [];
    this.refreshing = false;
    this.pageNum = 0;
    this.finished = false;
    this.loading = true;
    this.onLoad();
  }
}
</script>

<style lang="scss" scoped>
.catchWidth {
  max-width: 168px;
  text-align: left;
}
</style>
