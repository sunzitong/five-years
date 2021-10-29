<template>
  <div class="page-marketing-expense">
    <div class="dashboard" v-if="resData">
      <h3>运营成本剩余</h3>
      <div class="liquidfill">
        <EchartsLiquidfill :value="resData.leftRatio / 100" />
      </div>
      <div class="dashboard__content">
        <div>
          运营成本剩余：
          <em>{{ resData.leftAmount }}万元</em>
        </div>
      </div>
    </div>
    <ProCard title="近12个月运营成本趋势">
      <MarketingExpenseTrendComponent v-model="marketingExpenseTrendData" />
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
import EchartsLiquidfill from "@/components/EchartsLiquidfill.vue";
import MarketingExpenseTrendComponent from "./components/MarketingExpenseTrendComponent.vue";
import { OptCost, queryOptCost } from "@/service";
import { iwant, Nullable } from "@guanyu/shared";

@Component({
  components: {
    ProCard,
    EchartsLiquidfill,
    ItemLayoutPlane,
    MarketingExpenseTrendComponent,
  },
})
export default class OperationalCost extends Base {
  /** 服务器请求数据  */
  resData: Nullable<OptCost> = null;

  /**
   * 可选提升方案
   * 4期不上
   */
  get solveList() {
    return [];
  }

  /**
   * 原因分析
   * 4期不上
   */
  get reasonList() {
    return [];
  }

  /** 近12个月营销费用趋势 */
  get marketingExpenseTrendData() {
    return this.resData?.trend ?? [];
  }

  mounted() {
    const projectId = iwant.string(this.$route.query.projectId);
    queryOptCost({ projectId }).then((response) => {
      if (response?.status === "ok") {
        this.resData = response.data;
      }
    });
  }
}
</script>
<style lang="scss" scoped>
.page-marketing-expense {
  padding-top: 12px;
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
