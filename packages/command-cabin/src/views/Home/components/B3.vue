<template>
  <Spin :height="560" :loading="loading">
    <div class="page__b3__map">
      <van-row class="abstract_text">
        <van-col :span="12">成本风险预警项目</van-col>
        <van-col :span="12">总体成本差异率</van-col>
      </van-row>
      <van-row class="abstract_text">
        <van-col class="span_style1" :span="12">
          {{ projecttNum }}
          <span>个</span>
        </van-col>
        <van-col class="span_style2" :span="12">{{ differRatio }}%</van-col>
      </van-row>
      <div class="process_container">
        <Animationend
          :scrollMinCount="4"
          :height="300"
          :dataSource="resData.costAnalysisModelList"
        >
          <template v-slot="{ list }">
            <div class="process_item" animated v-for="el in list" :key="el.id">
              <div class="item_name">
                <div class="item_name_item van-multi-ellipsis--l2">
                  {{ el.projectName }}
                </div>
              </div>
              <div class="line_box">
                <div class="content" :style="{ width: el.useRate + '%' }"></div>
              </div>
              <div class="item_value">
                <div class="item_value_item">{{ el.useRate }}%</div>
              </div>
            </div>
          </template>
        </Animationend>
      </div>
    </div>
  </Spin>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import { StoreKey, useStore } from "@/store";
import Animationend from "@/components/Animationend/Index.vue";
import {
  CostAnalysisReturn,
  fetchCostAnalysis,
} from "@/service/analysis/bigScreen/mainBoard/construct/costAnalysis";

@Component({
  components: {
    Animationend,
  },
})
export default class B3 extends Base implements IFetch {
  resData: Partial<CostAnalysisReturn> = {};
  /**
   * 条形图
   */
  @Ref() wrapper!: HTMLDivElement;
  projecttNum: number | "--" = "--"; // 成本风险预警项目
  differRatio: number | "--" = "--"; // 总体成本差异率
  labels: string[] = []; // name标签
  values: number[] = []; // 数值标签

  async fetch() {
    const response = await useStore(fetchCostAnalysis, {
      key: StoreKey.HomeCostAnalysis,
      params: {
        regionType: this.store.global.dataLevel,
        regionId: this.store.global.orgTree.orgId,
      },
    });
    if (response?.status === "ok") {
      this.resData = response.data;
      this.projecttNum = this.resData.riskItemNum
        ? this.resData.riskItemNum
        : "--";
      this.differRatio = this.resData.allItemDiff
        ? this.resData.allItemDiff
        : "--";

      this.resData.costAnalysisModelList?.forEach((el) => {
        this.labels.push(el.projectName);
        this.values.push(el.useRate);
      });
      // this.paintChart();
    } else {
      this.empty = true;
    }
    return response;
  }
}
</script>

<style lang="scss" scoped>
.page__b3__map {
  padding: 40px 0px 0 0px;
}
.abstract_text {
  font-size: 40px;
  line-height: 40px;
  color: #90a4c3;
  padding: 18px 50px 0px 90px;
}
.span_style1 {
  @extend %value-font;
  font-weight: bold;
  font-size: 66px;
  line-height: 60px;
  color: #dbf0ff;

  span {
    margin-left: 6px;
    font-size: 36px;
    line-height: 48px;
    font-weight: normal;
  }
}
.span_style2 {
  @extend %value-font;
  font-weight: bold;
  font-size: 66px;
  line-height: 60px;
  color: #ff2a76;
}

.process_container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  height: 284px;
  margin: 66px 80px;
}

.process_item {
  display: inline-block;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 22px 0;

  .item_name {
    color: #90a4c3;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;

    .item_name_item {
      font-size: 40px;
      line-height: 40px;
      width: 200px;
    }
  }

  .line_box {
    flex: 1;
    // width: 300px;
    margin: 0 30px;
    height: 14px;
    background: #172c47;

    .content {
      width: 0;
      height: 100%;
      background: linear-gradient(
        -90deg,
        #5180e4 0%,
        rgba(81, 128, 228, 0) 100%
      );
      transition: 1s;
    }
  }

  .item_value {
    color: #dbf0ff;
    display: inline-block;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;

    .item_value_item {
      margin: 0 24px 0 0px;
      @extend %value-font;
      font-size: 50px;
      line-height: 66px;
      text-align: right;
      width: 135px;
    }
  }
}
</style>
