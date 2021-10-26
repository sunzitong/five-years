<template>
  <div class="page-marketing-expense">
    <div class="dashboard" v-if="resData">
      <h3>营销费用剩余</h3>
      <div class="liquidfill">
        <EchartsLiquidfill :value="resData.leftRatio / 100" />
      </div>
      <div class="dashboard__content">
        <div>
          营销费用剩余：
          <em>{{ resData.leftAmount }}万元</em>
        </div>
      </div>
    </div>
    <ProCard title="近12个月营销费用趋势">
      <MarketingExpenseTrendComponent v-model="marketingExpenseTrendData" />
    </ProCard>
    <ProCard title="获客渠道分析">
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
      <div class="echarts" v-if="resData">
        <ChannelAnalysisComponent
          :text="resData.channelNum"
          :subtext="resData.channelName"
          v-model="channelAnalysisData"
        />
      </div>
    </ProCard>
    <ProCard title="原因分析" v-if="!!reasonList.length">
      <ItemLayoutPlane :data="reasonList" />
    </ProCard>
    <ProCard title="可选提升方案" v-if="!!solveList.length">
      <ItemLayoutPlane :data="solveList" />
    </ProCard>
  </div>
</template>

<script lang="ts">
import Base from "@/views/Base";
import { Component } from "vue-property-decorator";
import ProCard from "@/components/ProCard.vue";
import ItemLayoutPlane from "@/components/ItemLayout/ItemLayoutPlane.vue";
import ProPicker from "@/components/ProPicker.vue";
import EchartsLiquidfill from "@/components/EchartsLiquidfill.vue";
import MarketingExpenseTrendComponent from "./components/MarketingExpenseTrendComponent.vue";
import ChannelAnalysisComponent from "./components/ChannelAnalysisComponent.vue";
import { MarketingCost, queryMarketingCost } from "@/service";
import { iwant, Nullable } from "@guanyu/shared";
import dayjs from "dayjs";

@Component({
  components: {
    ProPicker,
    ProCard,
    EchartsLiquidfill,
    ItemLayoutPlane,
    MarketingExpenseTrendComponent,
    ChannelAnalysisComponent,
  },
})
export default class MarketingExpense extends Base {
  /** 服务器数据 */
  resData: Nullable<MarketingCost> = null;

  /**
   * 可选提升方案
   * 4期不上
   */
  get solveList() {
    return [];
  }

  get dataSourceRemark() {
    return this.resData?.dataSourceRemark;
  }

  /**
   * 原因分析
   * 4期不上
   */
  get reasonList() {
    return [];
  }

  /** 地区付费渠道分析 */
  get channelAnalysisData() {
    return this.resData?.channel ?? [];
  }

  /** 近12个月营销费用趋势 */
  get marketingExpenseTrendData() {
    return this.resData?.trend ?? [];
  }

  pickerColumns() {
    const date = dayjs().subtract(1, "days");
    const columns = [];
    const max = 12;
    for (let i = 0; i < max; i++) {
      const v = date.subtract(i, "months").format("YYYY-MM");
      columns.push({ text: v, value: v });
    }
    return columns;
  }

  /** ProPicker */
  pickerData = {
    props: {
      columns: this.pickerColumns() as Record<string, any>[],
      valueKey: "text",
    },
    value: null,
  };

  /**
   * 日期切换
   */
  pickerValueChange(value: Record<string, any>) {
    this.reqMarketingCost(value.text);
  }

  mounted() {
    /**
     * 后台要求传空为全量数据
     * 有日期为请求部分数据
     */
    this.reqMarketingCost("");
  }

  /**
   * 获取接口数据
   */
  reqMarketingCost(dataDate: string) {
    const projectId = iwant.string(this.$route.query.projectId);
    queryMarketingCost({
      projectId,
      dataDate,
    }).then((response) => {
      if (response?.status === "ok") {
        if (dataDate === "") {
          // 第一次加载
          this.resData = response.data;
        } else {
          // 第二次局部更新只更新channel
          if (this.resData?.channel) {
            this.resData.channel = response.data.channel;
          }
        }
      }
    });
  }
}
</script>
<style lang="scss" scoped>
.page-marketing-expense {
  padding-top: 12px;
  .echarts {
    position: relative;
    text-align: center;
    .tips {
      position: absolute;
      color: #848484;
      z-index: 100;
      top: 50%;
      left: 21%;
      font-size: 12px;
      transform: translate(-50%, -50%) scale(0.85);
    }
  }
  .dashboard {
    padding: 10px;
    margin: 0 18px 14px;
    border: 0.5px solid #f4f3f7;
    box-sizing: border-box;
    box-shadow: 0px 0px 14px rgba(226, 232, 240, 0.34);
    border-radius: 2px;
    .liquidfill {
      padding: 15px 0;
    }
    &__content {
      display: flex;
      justify-content: space-around;
      color: #848484;
      em {
        color: #232832;
        font-style: normal;
      }
    }
  }
}
</style>
