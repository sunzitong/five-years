<template>
  <div class="checkout-ratio">
    <ProNotification :theme="resData.warnLight">
      {{ resData.warnLightNote }}
    </ProNotification>
    <div class="checkout-ratio__dashboard">
      <h3>月累平均违退率</h3>
      <DashboardComponent
        v-model="resData.defCheckoutRatioMonthly"
        :range="[3, 5]"
        :anchorBorderColor="notice.anchorBorderColor"
        :anchorLinearColor="notice.anchorLinearColor"
        :detailTextColor="notice.detailTextColor"
      />
      <div class="checkout-ratio__dashboard__content">
        <div>
          当月违退间数：
          <em>{{ resData.defCheckoutNumMonthly }}</em>
        </div>
        <div>
          月累平均在租间数：
          <em>{{ resData.rentNumMonthly }}</em>
        </div>
      </div>
    </div>
    <!-- 近12个月违退率趋势 -->
    <ProCard title="近12个月违退率趋势">
      <RenewRatioTrendComponent v-model="defCheckoutTrend" />
    </ProCard>
    <!-- 违退原因分布 -->
    <ProCard title="违退原因分布">
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
import {
  queryDefCheckoutRatio,
  DefCheckoutRatio,
  queryDefCheckoutRatioReason,
} from "@/service";
import { IdField, iwant } from "@guanyu/shared";
import DashboardComponent from "@/components/DashboardComponent.vue";
import ProNotification from "@/components/ProNotification.vue";
import NoRenewReasonTrendComponent from "./components/NoRenewReasonTrendComponent.vue";
import RenewRatioTrendComponent from "./components/RenewRatioTrendComponent.vue";

@Component({
  components: {
    ProCard,
    ItemLayoutPlane,
    ProPicker,
    NoRenewReasonTrendComponent,
    RenewRatioTrendComponent,
    DashboardComponent,
    ProNotification,
  },
})
export default class CheckoutRatio extends Base {
  /** 接口数据 */
  resData: Partial<DefCheckoutRatio> = {};

  /** 门店ID */
  get projectId() {
    return this.$route.query.projectId as IdField;
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
  get defCheckoutTrend() {
    return this.resData.defCheckoutTrend ?? [];
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

  get checkoutDataTypeList() {
    return this.store?.valueEnum?.checkoutDataTypeList ?? [];
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
    queryDefCheckoutRatio({ projectId: this.projectId }).then((response) => {
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
    queryDefCheckoutRatioReason({
      projectId: this.projectId,
      dataType: `${value.name}`,
    }).then((response) => {
      if (response?.status === "ok") {
        this.resData.noRenewReasonTrend = response.data;
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.checkout-ratio {
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
    > h3 {
      font-family: PingFang SC;
      font-size: 14px;
    }
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
