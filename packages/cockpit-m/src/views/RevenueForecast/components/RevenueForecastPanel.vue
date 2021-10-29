<template>
  <div class="detail-table">
    <div class="tab-top">
      <div>预测环比提升：{{ tableData.yoy ? tableData.yoy : "--" }}%</div>
      <div class="stress-data">
        <em>{{ tableData.income ? tableData.income : "--" }}</em>
        <span>万元</span>
      </div>
    </div>
    <div class="tab-bottom">
      <div>
        平均出租率预测：
        <span>{{ tableData.rentRatio ? tableData.rentRatio : "--" }}%</span>
      </div>
      <div class="tab-bottom-right">
        平均单房价格预测：
        <span>{{ tableData.price ? tableData.price : "--" }}元</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Base from "@/views/Base";
import { AnyObject } from "@guanyu/shared";
import { Component, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class RevenueForecastPanel extends Base {
  @Prop({ default: () => ({}) }) readonly tableData!: AnyObject;
}
</script>

<style lang="scss" scoped>
.detail-table {
  height: 173px;
  background: linear-gradient(119.19deg, #4f6dd8 31.55%, #4f6dd8 95.38%);
  color: #ffffff;

  .tab-top {
    padding: 23px 14px 27px 14px;
    height: 90px;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    font-family: "PingFang SC";
    font-style: normal;
    font-weight: normal;
    font-size: 12px;

    .stress-data {
      em {
        vertical-align: bottom;
        margin-left: 16px;
        font-family: "DIN Alternate";
        font-style: normal;
        font-weight: bold;
        font-size: 50px;
        line-height: 40px;
      }
      span {
        vertical-align: bottom;
        margin-left: 8px;
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: normal;
        font-size: 24px;
      }
    }
  }

  .tab-bottom {
    display: flex;
    justify-content: space-around;
    align-items: center;
    line-height: 24px;

    font-family: "PingFang SC";
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.65);

    span {
      color: #ffffff;
    }

    .tab-bottom-right {
      border-left: 1px solid rgba(255, 255, 255, 0.17);
      padding-left: 8px;
    }
  }
}
</style>
