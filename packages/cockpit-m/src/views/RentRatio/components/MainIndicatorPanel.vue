<template>
  <div class="main_indicator_panel">
    <ProNotification :theme="store.rentData.warnLight">
      {{ store.rentData.warnLightNote }}
    </ProNotification>
    <div class="main_panel_container">
      <div class="dashboard">
        <h3>时点出租率</h3>
        <DashboardComponent
          v-model="store.rentData.rentRatio"
          :anchorBorderColor="notice.anchorBorderColor"
          :anchorLinearColor="notice.anchorLinearColor"
          :detailTextColor="notice.detailTextColor"
        />
        <div class="dashboard_content">
          时点在租间数：
          <span>{{ store.rentData.rentNum }}</span>
        </div>
      </div>
      <div class="dashboard">
        <h3>月累平均出租率</h3>
        <DashboardComponent
          v-model="store.rentData.rentRatioMonthly"
          :anchorBorderColor="notice.anchorBorderColor"
          :anchorLinearColor="notice.anchorLinearColor"
          :detailTextColor="notice.detailTextColor"
        />
        <div class="dashboard_content">
          月累平均在租间数：
          <span>{{ store.rentData.rentNumMonthly }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Base from "@/views/Base";
import { Component } from "vue-property-decorator";
import ProNotification from "@/components/ProNotification.vue";
import DashboardComponent from "@/components/DashboardComponent.vue";

@Component({
  components: {
    ProNotification,
    DashboardComponent,
  },
})
export default class MainIndicatorPanel extends Base {
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
    if (typeof this.store.rentData.warnLight === "string") {
      return map[this.store.rentData.warnLight] || map.default;
    }
    return map.default;
  }
}
</script>

<style lang="scss" scoped>
.main_panel_container {
  display: flex;

  margin: 0 18px 12px 18px;
  padding: 12px;
  // box-sizing: border-box;
  box-shadow: 0px 0px 14px rgba(226, 232, 240, 0.34);
  border-radius: 2px;

  .dashboard {
    flex: 1;
    display: flex;
    flex-flow: column;
    align-items: flex-start;

    h3 {
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 22px;
      color: #232832;
    }

    .dashboard_content {
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 17px;
      color: rgba(132, 132, 132, 0.7);

      span {
        margin-left: -0.5em;
        color: #232832;
      }
    }
  }
}
</style>
