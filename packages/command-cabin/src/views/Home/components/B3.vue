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
        <Animationend :scrollMinCount="3" :height="322" :dataSource="newList">
          <template v-slot="{ list }">
            <div class="process_item" animated v-for="el in list" :key="el.id">
              <div class="item_name">
                <div class="item_name_item">
                  {{ el.projectName }}
                </div>
              </div>
              <div class="line_box">
                <div
                  class="content"
                  :style="{ width: (el.diff || 0) + '%' }"
                ></div>
              </div>
              <div class="item_value">
                <div class="item_value_item">{{ formatValue(el.diff) }}%</div>
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
import { formatValue } from "@/utils/tools";
import { iwant } from "@guanyu/shared";
import { DateScopes } from "@/service/analysis/commandCabin/publicEnum/enums";

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
  projecttNum: number | string = formatValue(); // 成本风险预警项目
  differRatio: number | string = formatValue(); // 总体成本差异率

  get newList() {
    if (this.resData?.costAnalysisModelList) {
      this.resData.costAnalysisModelList.map((el) => {
        if (el.projectName.length > 9) {
          el.projectName = this.getFormatString(el.projectName, 10);
        }
      });
      return this.resData.costAnalysisModelList;
    }
    return null;
  }

  /**
   * strVal: 需要格式化的字符串
   * len(纯数字)：格式化后字符串的长度
   *
   * 超过指定长度，只保留最后len-1个字符，向前隐藏
   */
  getFormatString(strVal: string, len: number) {
    const strLen = strVal.length;
    if (strLen > len) {
      return `...${strVal.substring(strVal.length - len + 1)}`;
    } else {
      return strVal;
    }
  }

  async fetch() {
    const response = await useStore(fetchCostAnalysis, {
      key: StoreKey.HomeCostAnalysis,
      params: {
        orgType: this.store.global.dataLevel,
        orgId: this.store.global.orgTree.orgId,
        dateScope: DateScopes.YEARLY,
        date: +this.store.global.yearValue,
      },
    });
    if (response?.status === "ok") {
      this.resData = iwant.object(response.data);
      this.projecttNum = formatValue(this.resData.riskItemNum);
      this.differRatio = formatValue(this.resData.allItemDiff);
    } else {
      this.empty = true;
    }
    return response;
  }
}
</script>

<style lang="scss" scoped>
.page__b3__map {
  padding: 40px 0px 0 15px;
}
.abstract_text {
  font-size: 40px;
  line-height: 40px;
  color: #90a4c3;
  padding: 18px 20px 0px 90px;
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
    color: #90a4c3;
  }
}
.span_style2 {
  @extend %value-font;
  font-weight: bold;
  font-size: 66px;
  line-height: 60px;
  color: #dbf0ff;

  &.danger {
    color: #ff2a76;
  }
}

.process_container {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  height: 284px;
  margin: 66px 80px;
  overflow: hidden;
}

.process_item {
  display: inline-block;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 22px 0;

  .item_name {
    color: #90a4c3;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;

    .item_name_item {
      font-size: 40px;
      line-height: 40px;
      width: 230px;
    }
  }

  .line_box {
    flex: 1;
    // width: 300px;
    margin: 0 30px;
    height: 14px;
    background: #172c47;

    .content {
      min-width: 0;
      max-width: 100%;
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
      min-width: 140px;
    }
  }
}
</style>
