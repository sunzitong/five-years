<template>
  <div class="renew-ratio">
    <ProNotification :theme="resData.warnLight">
      {{ resData.warnLightNote }}
    </ProNotification>
    <div class="renew-ratio__dashboard">
      <h3>月累平均续租率</h3>
      <DashboardComponent
        v-model="resData.renewRatioMonthly"
        :range="[35, 40]"
        :anchorBorderColor="notice.anchorBorderColor"
        :anchorLinearColor="notice.anchorLinearColor"
        :detailTextColor="notice.detailTextColor"
      />
      <div class="renew-ratio__dashboard__content">
        <div>
          月累到期间数：
          <em>{{ resData.expireNumMonthly }}</em>
        </div>
        <div>
          30天内到期间数：
          <em>{{ resData.expireNumThirtyDays }}</em>
        </div>
      </div>
    </div>
    <!-- 近12个月续租率趋势 -->
    <ProCard title="近12个月续租率趋势">
      <RenewRatioTrendComponent v-model="renewRatioTrend" />
    </ProCard>
    <!-- 30天内到期间数情况 -->
    <ProCard title="30天内到期间数情况">
      <ExpireTrendComponent v-model="expireTrend" />
    </ProCard>
    <!-- 不续租原因分布 -->
    <ProCard title="不续租原因分布">
      <template v-slot:extra>
        <ProPicker
          :pickerProps="pickerData.props"
          v-model="pickerData.value"
          @change="pickerValueChange"
        >
          <template v-slot:value="{ value }">
            {{ (value && value.text) || value }}
          </template>
        </ProPicker>
      </template>
      <NoRenewReasonTrendComponent v-model="noreason" />
    </ProCard>
    <!-- 原因分析 -->
    <ProCard title="原因分析" v-if="!!reason.length">
      <ItemLayoutPlane :data="reason" />
    </ProCard>
    <!-- 可选提升方案 -->
    <ProCard title="可选提升方案" v-if="!!promotionPlan.length">
      <ItemLayoutPlane :data="promotionPlan" />
    </ProCard>
  </div>
</template>

<script lang="ts">
import Base from "@/views/Base";
import { Component, Watch } from "vue-property-decorator";
import ProCard from "@/components/ProCard.vue";
import ItemLayoutPlane from "@/components/ItemLayout/ItemLayoutPlane.vue";
import ProPicker from "@/components/ProPicker.vue";
import { queryRenewRatio, queryRenewRatioReason, RenewRatio } from "@/service";
import { iwant } from "@guanyu/shared";
import DashboardComponent from "@/components/DashboardComponent.vue";
import ProNotification from "@/components/ProNotification.vue";
import NoRenewReasonTrendComponent from "./components/NoRenewReasonTrendComponent.vue";
import ExpireTrendComponent from "./components/ExpireTrendComponent.vue";
import RenewRatioTrendComponent from "./components/RenewRatioTrendComponent.vue";

@Component({
  components: {
    ProCard,
    ItemLayoutPlane,
    ProPicker,
    NoRenewReasonTrendComponent,
    ExpireTrendComponent,
    RenewRatioTrendComponent,
    DashboardComponent,
    ProNotification,
  },
})
export default class RenewRatioPage extends Base {
  /** 接口数据 */
  resData: Partial<RenewRatio> = {};

  /** 门店ID */
  get projectId() {
    return this.$route.query.projectId as string;
  }

  /** 通知数据 */
  get notice() {
    const map = {
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
      default: {},
    };
    if (typeof this.resData.warnLight === "string") {
      return map[this.resData.warnLight] || map.default;
    }
    return map.default;
  }

  /** 近12个月续租率趋势 */
  get renewRatioTrend() {
    return this.resData.renewRatioTrend ?? [];
  }

  /** 30天内到期间数情况 */
  get expireTrend() {
    return this.resData.expireTrend ?? [];
  }

  /** 不续租原因分布 */
  get noreason() {
    return this.resData.noRenewReasonTrend ?? [];
  }

  /** 原因分析数据 */
  get reason() {
    const reason = iwant.array(this.resData.reason);
    return reason.map((item) => ({
      title: item.note,
      desc: item.noteRemark,
      level: item.matchDegree,
      levelDesc: item.matchDegreeDesc,
    }));
  }

  /** 提升方案数据 */
  get promotionPlan() {
    const plane = iwant.array(this.resData.solve);
    return plane.map((item) => ({
      title: item.note,
      level: item.matchDegree,
      levelDesc: item.matchDegreeDesc,
    }));
  }

  /** DOM渲染完成 */
  mounted() {
    if (!this.projectId || Array.isArray(this.projectId)) {
      return;
    }
    /** 页面接口 */
    queryRenewRatio({ projectId: this.projectId }).then((response) => {
      if (response?.status === "ok") {
        this.resData = response?.data;
      }
    });
  }

  /** ProPicker */
  pickerData = {
    props: {
      columns: [] as Record<string, any>[],
      valueKey: "text",
    },
    value: null,
  };

  @Watch("this.store.valueEnum", { immediate: true, deep: true })
  enumLoad() {
    this.pickerData.props.columns = this.store.valueEnum.checkoutDataTypeList;
  }

  pickerValueChange(value: Record<string, any>) {
    queryRenewRatioReason({
      projectId: this.projectId,
      dateType: `${value.name}`,
    }).then((response) => {
      if (response?.status === "ok") {
        this.resData.noRenewReasonTrend = response.data;
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.renew-ratio {
  &__notice {
    margin-bottom: 12px;
  }

  &__dashboard {
    padding: 10px 18px;
    margin: 0 18px 14px;
    border: 0.5px solid #f4f3f7;
    box-sizing: border-box;
    box-shadow: 0px 0px 14px rgba(226, 232, 240, 0.34);
    border-radius: 2px;
  }

  &__dashboard__content {
    display: flex;
    justify-content: space-between;
    color: #848484;
    em {
      color: #232832;
      font-style: normal;
    }
  }
}
</style>
