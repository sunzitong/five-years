<template>
  <Spin :height="470" :loading="loading" :empty="empty">
    <div class="page__a6__map">
      <div class="text_pannel">
        <!-- 饼图 -->
        <div class="chart" ref="wrapper"></div>
        <div class="content_box">
          <div class="top_text">净利润贡献值</div>
          <div class="top_text">{{ yearFlag ? "(全年)" : "(全周期)" }}</div>
        </div>
        <div class="container">
          <div class="text_row">
            <van-row>
              <van-col :span="8" class="left_text">当年</van-col>
              <van-col :span="15" class="right_text">
                <span>{{ sepNumber(currentYear) }}</span>
                万
              </van-col>
            </van-row>
            <van-row>
              <van-col :span="8" class="left_text">全周期</van-col>
              <van-col :span="15" class="right_text">
                <span>{{ sepNumber(wholeCycle) }}</span>
                万
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
    </div>
  </Spin>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import ProgressCircle from "@/components/Progress/ProgressCircle.vue";
import {
  fetchExpansionAwardInfo,
  ExpansionAwardInfoReturn,
} from "@/service/analysis/bigScreen/mainBoard/expandDisk/expansionAwardInfo";
import { Base, IFetch } from "@/views/Base";
import { AnyObject, iwant } from "@guanyu/shared";
import _ from "lodash";
import { StoreKey, useStore } from "@/store";
import echarts from "@/plugins/echarts";
import { EChartsOption } from "echarts";
import mitter, { EventName } from "@/utils/mitter";

@Component({
  components: { ProgressCircle },
})
export default class A6 extends Base implements IFetch {
  /**
   * 接口返回值
   * /analysis/bigScreen/mainBoard/expandDisk
   */
  @Ref() wrapper!: HTMLDivElement;
  resData: Partial<ExpansionAwardInfoReturn> = {};
  pieData: AnyObject[] = [];
  /**
   * 显示全年时，此值为true
   */
  yearFlag = true;
  /**
   * 全周期预算达成率
   */
  cycleRate: number | "--" = "--";
  /**
   * 全年预算达成率
   */
  yearRate: number | "--" = "--";
  /**
   * 全年利润攻坚贡献值
   */
  currentYear: number | string = "--";
  /**
   * 全周期利润攻坚贡献值
   */
  wholeCycle: number | string = "--";

  value = 0; //中心数值

  /**
   * 自动触发 重复调用
   * @returns response
   */
  async fetch() {
    const response = await useStore(fetchExpansionAwardInfo, {
      key: StoreKey.HomeExpansionAwardInfo,
      params: {
        regionType: this.store.global.dataLevel,
        regionId: this.store.global.orgTree.orgId,
      },
    });
    if (response?.status === "ok") {
      this.resData = response.data;
      this.currentYear = _.isNil(this.resData.yearNetIncomeCollected)
        ? "--"
        : this.resData.yearNetIncomeCollected;
      this.wholeCycle = _.isNil(this.resData.allNetIncomeCollected)
        ? "--"
        : this.resData.allNetIncomeCollected;

      this.cycleRate = _.isNil(this.resData.allNetIncomeCompletionRate)
        ? "--"
        : this.resData.allNetIncomeCompletionRate;
      this.yearRate = _.isNil(this.resData.yearNetIncomeCompletionRate)
        ? "--"
        : this.resData.yearNetIncomeCompletionRate;

      this.pieData = [
        // 饼图对象数组
        {
          name: "all",
          value: 100 - iwant.number(this.resData.yearNetIncomeCompletionRate),
        },
        {
          name: "reach",
          value: iwant.number(this.resData.yearNetIncomeCompletionRate),
        },
      ];
      this.paintChart();

      /**
       * 全周期与全年取值循环切换
       */
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (this.yearFlag) {
          this.pieData[1].value = iwant.number(
            this.resData.allNetIncomeCompletionRate
          );
        } else {
          this.pieData[1].value = iwant.number(
            this.resData.yearNetIncomeCompletionRate
          );
        }
        this.yearFlag = !this.yearFlag;
        this.paintChart();
      }, 1000);
    } else {
      this.empty = true;
    }
    return response;
  }

  beforeDestroy() {
    clearInterval(this.timer);
  }

  paintChart() {
    if (!this.myChart) {
      this.myChart = echarts.init(this.wrapper);
      mitter.on(EventName.ResizeEcharts, () => {
        this.myChart.resize();
      });
    }
    const { myChart } = this;
    // myChart.showLoading();
    let option: EChartsOption = {
      title: {
        //中心数值
        text: `${this.pieData[1].value}%`,
        left: "center",
        top: "53%",
        z: 100,
        textStyle: {
          fontFamily: this.store.env.VALUE_FONT,
          fontWeight: "bold",
          fontSize: 40,
          lineHeight: 48,
          color: "#DBF0FF",
        },
      },
      graphic: {
        // 中心文字
        type: "text",
        left: "center",
        top: "41%",
        z: 100,
        style: {
          text: "完成率",
          textAlign: "center",
          fontFamily: this.store.env.TEXT_FONT,
          fontSize: 24,
          lineHeight: 24,
          fill: "#8090AA",
        },
      },
      xAxis: { show: false },
      yAxis: { show: false },
      series: [
        {
          // 展示数据
          type: "pie",
          radius: [81, 74],
          center: ["50%", "57%"],
          label: {
            show: false,
          },
          itemStyle: {
            borderRadius: 88,
          },
          color: ["#57A6FB", "#F7D14A"],
          data: this.pieData,
        },
      ],
    };
    option && myChart.setOption(option);
  }
}
</script>

<style lang="scss" scoped>
.text_pannel {
  text-align: center;
}
.content_box {
  margin-bottom: 20px;
  .top_text {
    font-size: 36px;
    line-height: 40px;
    color: #90a4c3;
  }
}

.container {
  display: flex;
  align-items: center;
  height: 96px;
  background: linear-gradient(
    89.96deg,
    rgba(5, 203, 253, 0.1) 0%,
    rgba(0, 127, 249, 0) 100.9%
  );
  backdrop-filter: blur(10px);
  margin: 20px 0;
  &::before {
    content: "";
    width: 2px;
    height: 100%;
    background: #5180e4;
    box-shadow: 0px 0px 10px #5180e4;
    margin-right: 30px;
  }
}
.text_row {
  flex: 1;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
.left_text {
  font-size: 36px;
  line-height: 36px;
  text-align: left;
  color: #90a4c3;
}
.right_text {
  font-size: 26px;
  line-height: 36px;
  color: #90a4c3;
  text-align: right;

  span {
    @extend %value-font;
    font-weight: bold;
    font-size: 36px;
    line-height: 42px;
    color: #dbf0ff;
  }
}

.bottom_text {
  font-size: 26px;
  line-height: 26px;
  color: #01f5f1;

  margin-top: 10px;

  span {
    @extend %value-font;
    font-size: 40px;
    line-height: 36px;
  }
}

.chart {
  width: 240px;
  height: 240px;
  @extend %bg-img-circle-1;
  background-size: 100%;

  margin: 0px auto 23px auto;
}
</style>
