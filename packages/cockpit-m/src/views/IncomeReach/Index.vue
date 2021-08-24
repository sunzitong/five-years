<template>
  <div class="page__income" v-if="responseData">
    <ProNotification :theme="responseData.warnLight">
      {{ responseData.warnLightNote }}
    </ProNotification>
    <article class="part-board">
      <h3 class="title">全业态收入达成</h3>
      <DashboardComponent
        :value="get(responseData, 'incomeReachRatio', 0)"
        v-bind="dashboardProps"
        :range="[95, 100]"
        :max="105"
      />
      <ul class="text">
        <li class="item">
          <span class="name">实际收入：</span>
          <span class="value">{{ get(responseData, "income", "--") }}元</span>
        </li>
        <li class="item">
          <span class="name">平均单房价格：</span>
          <span class="value">
            {{ get(responseData, "avgPerRoomPrice", "--") }}元
          </span>
        </li>
      </ul>
    </article>
    <ProCard title="收入达成详情" class="part-detatil">
      <template v-slot:extra>
        <ProPicker
          v-model="datePicker.value"
          @change="fetchDetails"
          :pickerProps="datePicker.props"
        >
          <template v-slot:value="{ value }">
            {{ value }}
          </template>
        </ProPicker>
      </template>
      <ProTable
        :columns="columnsReach"
        :dataSource="get(responseData, 'incomeReachDetails', [])"
      >
        <template v-slot:extra="{ cellKey, defaultValue }">
          {{ cellKey === "reachRatio" ? `${defaultValue}%` : defaultValue }}
        </template>
      </ProTable>
    </ProCard>
    <ProCard title="近12个月收入达成趋势" class="part-reach">
      <BarCharts
        :dataSource="get(responseData, 'incomeReachTrend', [])"
        type="incomeReachTrend"
      ></BarCharts>
    </ProCard>
    <ProCard title="近12个月平均单房价格趋势" class="part-avg">
      <BarCharts
        :dataSource="get(responseData, 'avgPerRoomPriceTrend', [])"
        type="avgPerRoomPriceTrend"
      ></BarCharts>
    </ProCard>
    <ProCard title="收入/预算日趋势" class="part-daily">
      <template #extra>
        <ProPicker v-model="calendarPicker.value">
          <template v-slot:value="{ value }">
            {{ calendarPicker.formatValue(value) }}
          </template>
          <template v-slot:picker="{ cancel }">
            <van-calendar
              class="calendar-picker"
              @confirm="
                (date) => {
                  calendarPicker.confirm(date);
                  cancel(date);
                }
              "
              v-bind="calendarPicker.props"
            ></van-calendar>
          </template>
        </ProPicker>
      </template>
      <div class="text">
        <div class="item">
          <span class="name">收入总和：</span>
          <span class="value">
            {{ get(responseData, "incomeDailyTrend.incomeTotal", "--") }}
          </span>
        </div>
        <div class="item">
          <span class="name">预算总和：</span>
          <span class="value">
            {{ get(responseData, "incomeDailyTrend.targetTotal", "--") }}
          </span>
        </div>
      </div>
      <AreaCharts
        :dataSource="get(responseData, 'incomeDailyTrend.list', [])"
      ></AreaCharts>
    </ProCard>
    <ProCard title="原因分析" class="part-reason">
      <template #extra>
        <ProPicker
          v-model="reasonPicker.value"
          :pickerProps="reasonPicker.props"
          @change="fetchReason"
        >
          <template v-slot:value="{ value }">
            {{ value ? value.text : "--" }}
          </template>
        </ProPicker>
      </template>
      <ItemLayoutPlane :ignoreLevel="ignoreLevel" :data="resonList" />
    </ProCard>
    <ProCard title="可选提升方案" class="part-solve">
      <ItemLayoutPlane :ignoreLevel="ignoreLevel" :data="solveList" />
    </ProCard>
  </div>
</template>

<script lang="ts">
import Base from "@/views/Base";
import { Component, Watch } from "vue-property-decorator";
import ProTable, { ColumnsItem } from "@/components/ProTable.vue";
import ProCard from "@/components/ProCard.vue";
import ProPicker from "@/components/ProPicker.vue";
import { iwant, Nullable } from "@guanyu/shared";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import {
  IncomeReach,
  queryIncomeReach,
  queryIncomeReachDaily,
  queryIncomeReachDetails,
  queryIncomeReachReason,
} from "@/service";
import AreaCharts from "./components/AreaCharts.vue";
import BarCharts from "./components/BarCharts.vue";
import DashboardComponent from "@/components/DashboardComponent.vue";
import ItemLayoutPlane from "@/components/ItemLayout/ItemLayoutPlane.vue";
import dayjs from "dayjs";
import ProNotification from "@/components/ProNotification.vue";
import { stringify } from "qs";

@Component({
  components: {
    ProTable,
    ProCard,
    ProPicker,
    AreaCharts,
    BarCharts,
    DashboardComponent,
    ItemLayoutPlane,
    ProNotification,
  },
})
export default class IncomeReachPage extends Base {
  isEmpty = isEmpty;

  get = get;

  projectId = "";

  responseData: Nullable<IncomeReach> = null;

  // 原因分析
  resonList: Record<string, any> = [];
  // 可选提升方案
  solveList: Record<string, any> = [];
  // 收入达成详情 月选择
  datePicker = {
    /** ProPicker */
    props: {
      columns: [] as string[],
    },
    value: null as string | null,
  };
  // 收入/预算日趋势 区间选择
  calendarPicker = {
    props: {
      minDate: null as Date | null,
      maxDate: null as Date | null,
      defaultDate: null as Date[] | null,
      poppable: false,
      color: "#1c7af7",
      type: "range",
      showTitle: false,
    },
    value: null as Date[] | null,
    formatValue: (value: Date[]) => {
      if (!value) return "--";
      return [
        dayjs(value[0]).format("YY/MM/DD"),
        dayjs(value[1]).format("YY/MM/DD"),
      ].join("-");
    },
    confirm: (date: Date[]) => {
      this.calendarPicker.value = date;
      this.fetchDaily();
    },
  };
  // 原因分析 业态选择
  reasonPicker = {
    props: {
      columns: [] as Record<string, any>[],
      valueKey: "text",
    },
    value: null as Nullable<Record<string, any>>,
  };
  // 收入达成详情
  columnsReach: ColumnsItem[] = [
    { title: "收入类型", dataIndex: "format" },
    { title: "实际收入", dataIndex: "income" },
    { title: "预算收入", dataIndex: "target" },
    { title: "达成度", dataIndex: "reachRatio" },
  ];
  // 原因分析和方案是否忽略匹配度
  ignoreLevel = false;
  // 仪表盘
  get dashboardProps() {
    const { responseData } = this;
    if (!responseData) return {};
    return (
      {
        RED: {
          anchorLinearColor: "#fed5dc",
          anchorBorderColor: "#FF5F6E",
          detailTextColor: "#fb5966",
        },
        GREEN: {
          anchorLinearColor: "#fff",
          anchorBorderColor: "#a3d2fd",
          detailTextColor: "#000",
        },
        YELLOW: {
          anchorLinearColor: "#fddaa9",
          anchorBorderColor: "#FF9A23",
          detailTextColor: "#fb9030",
        },
      }[responseData.warnLight] || {}
    );
  }

  @Watch("responseData.optStage")
  showRightNavButton(val: string) {
    // 运营期的时候显示计算器
    if (val === "STEADY") {
      window.app_jpmp_to_marketing_calc = () => {
        this.$router.push(`/revenue-forecast?projectId=${this.projectId}`);
      };
      this.setAppNavButtons({
        right: [
          {
            title: {
              text: "收入预测",
              fontSize: 14,
              color: "#232832",
            },
            image: {
              src:
                "https://guanyuoss.oss-cn-qingdao.aliyuncs.com/prod/guanyuapp/PsCfX3oQpRIao20X4QNaKw.png",
              position: "left",
              width: 16,
              height: 18,
            },
            js: "window.app_jpmp_to_marketing_calc()",
          },
        ],
      });
      return;
    }
    this.hiddenNavButtons("right");
  }

  async mounted() {
    this.responseData = null;
    const { datePicker, calendarPicker, reasonPicker } = this;
    const now = dayjs();
    // 初始化收入达成详情月选择
    for (let i = 0; i < 12; i++) {
      datePicker.props.columns.push(now.subtract(i, "month").format("YYYY-MM"));
    }
    // 初始化收入预算日趋势区间选择
    calendarPicker.props.minDate = now.subtract(12, "month").toDate();
    calendarPicker.props.maxDate = now.subtract(1, "day").toDate();
    const dateRange = [
      now.subtract(7, "day").toDate(),
      now.subtract(1, "day").toDate(),
    ];
    calendarPicker.props.defaultDate = dateRange;
    calendarPicker.value = dateRange;
    // 初始化原因分析业态选择
    reasonPicker.props.columns = [...this.store.valueEnum.formatTypeList];
    // 请求
    this.projectId = iwant.string(this.$route.query.projectId);
    await this.fetchData();
    this.iosCompatibility();
  }

  // ios兼容
  iosCompatibility() {
    this.$nextTick(() => {
      if (window.document.scrollingElement) {
        window.document.scrollingElement.scrollTop = 0;
      }
    });
  }

  // 转换原因分析和可选提升方案
  formatResponseData() {
    if (!this.responseData) return;
    this.resonList = iwant.array(this.responseData.reason).map((item) => ({
      title: item.note,
      desc: item.noteRemark,
      level: item.matchDegree,
      levelDesc: item.matchDegreeDesc,
    }));
    this.solveList = iwant.array(this.responseData.solve).map((item) => ({
      // FIXME iOS设备后退无数据
      url:
        item.url &&
        item.url + stringify(this.$route.query, { addQueryPrefix: true }),
      title: item.note,
      desc: item.noteRemark,
      level: item.matchDegree,
      levelDesc: item.matchDegreeDesc,
    }));
    // 一展 商业 增值 不展示匹配度
    this.ignoreLevel = ["CoWorking", "Commerce", "Increment"].includes(
      this.reasonPicker.value?.value
    );
  }
  // 收入达成所有数据
  async fetchData() {
    const response = await queryIncomeReach({
      projectId: this.projectId,
    });
    if (response?.status === "ok") {
      const data = iwant.object(response.data);
      this.responseData = data;
      this.formatResponseData();
    }
  }
  // 收入达成详情
  async fetchDetails() {
    if (!this.responseData || !this.datePicker.value) return;
    const response = await queryIncomeReachDetails({
      projectId: this.projectId,
      dataDate: this.datePicker.value,
    });
    if (response?.status === "ok") {
      const data = iwant.array(response.data);
      this.responseData.incomeReachDetails = data;
    }
  }
  // 收入/预算日趋势
  async fetchDaily() {
    if (!this.responseData || !this.calendarPicker.value) return;
    const response = await queryIncomeReachDaily({
      projectId: this.projectId,
      dataDateFrom: dayjs(this.calendarPicker.value[0]).format("YYYY-MM-DD"),
      dataDateTo: dayjs(this.calendarPicker.value[1]).format("YYYY-MM-DD"),
    });
    if (response?.status === "ok") {
      const data = iwant.object(response.data);
      this.responseData.incomeDailyTrend = data;
    }
  }
  // 原因分析
  async fetchReason() {
    if (!this.responseData || !this.reasonPicker.value) return;
    const response = await queryIncomeReachReason({
      projectId: this.projectId,
      formatType: this.reasonPicker.value.value,
    });
    if (response?.status === "ok") {
      const data = iwant.object(response.data);
      this.responseData.reason = data.reason;
      this.responseData.solve = data.solve;
      this.formatResponseData();
    }
  }
}
</script>

<style lang="scss" scoped>
.page__income {
  min-height: 100vh;
  color: #232832;
  &::v-deep {
    .pro__card {
      margin-top: 16px;
    }
  }
  .part-board {
    display: flex;
    flex-flow: column nowrap;
    width: 342px;
    /* height: 164px; */
    margin: 14px auto 22px;
    background: #ffffff;
    border: 0.5px solid #f4f3f7;
    box-sizing: border-box;
    box-shadow: 0px 0px 14px rgba(226, 232, 240, 0.34);
    border-radius: 2px;
    .text {
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      margin: auto 18px 18px;
      .name {
        color: #848484;
      }
    }
    .title {
      margin: 12px 12px 0;
      font-weight: bold;
      font-size: 14px;
      color: #232832;
    }
  }

  .part-daily {
    .text {
      display: flex;
      font-size: 12px;
      margin: 8px 18px 16px;
      .item {
        margin-right: 18px;
        .name {
          color: #64696e;
        }
      }
    }
  }

  .calendar-picker {
    height: 70vh;
    color: #666;
  }
}
</style>
