<template>
  <div class="page__a1__map">
    <!-- 上半部分 -->
    <div class="top_text">
      <div class="left_text">
        已签约间数
        <div class="num">
          <span>{{ sepNumber(signRoom) }}</span>
          万
        </div>
      </div>
      <div class="right_top_text">
        <div class="row_content">
          重资产
          <span class="value">{{ sepNumber(heavyNum) }}</span>
        </div>
        <div class="row_content">
          中资产
          <span class="value">{{ sepNumber(middleNum) }}</span>
        </div>
        <div class="row_content">
          轻资产
          <span class="value">{{ sepNumber(lightNum) }}</span>
        </div>
      </div>
    </div>
    <!-- 下半部分 -->
    <div class="bottom_content">
      <div class="left_bottom_text">
        <div class="left_text">
          获取目标
          <div class="num">
            <span>{{ sepNumber(gainTarget) }}</span>
            万
          </div>
        </div>
        <div class="left_text">
          目标差额
          <div class="num spcial">
            <span>{{ sepNumber(targetDiffer) }}</span>
            万
          </div>
        </div>
        <div class="left_text">
          已签约间数
          <div class="num">
            <span>{{ sepNumber(signedRoom) }}</span>
            万
          </div>
        </div>
      </div>
      <!-- 饼图 -->
      <div
        class="right_bottom_text"
        style="width: 300px; height: 534px; background: #5180e4"
      >
        <div class="chart">
          <van-circle :value="40" :rate="40" :stroke-width="60" :size="200" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
// import echarts from "@/plugins/echarts";
import Base from "@/views/Base";
import { AnyObject } from "@guanyu/shared";

@Component({
  components: {},
})
export default class A1 extends Base {
  /**
   * 饼图
   */
  @Ref() wrapper!: HTMLDivElement;

  signRoom = 1218900; // 已签约间数
  heavyNum = 6000; // 重资产间数
  middleNum = 6000; // 中资产间数
  lightNum = 6000; // 轻资产间数

  gainTarget = 54544; // 获取目标
  targetDiffer = 54544; // 目标差额
  signedRoom = 23900; // 已签约间数

  pieData: AnyObject[] = [
    // 饼图对象数组
    {
      name: "获取目标",
      value: 80,
    },
    {
      name: "已签约间数",
      value: 20,
    },
  ];

  centerVlue = 80; // 饼图中心值文本

  //   mounted() {
  //     this.paintPieChart();
  //   }

  //   paintPieChart() {
  //     const myChart = echarts.init(this.wrapper);
  //     // myChart.showLoading();
  //     let option = {
  //       grid: {
  //         x: "40%",
  //       },
  //       title: {
  //         //中心数值
  //         text: this.centerVlue + "%",
  //         left: "27%",
  //         top: "30%",
  //         z: 100,
  //         textStyle: {
  //           fontFamily: "DIN Alternate",
  //           fontWeight: "bold",
  //           fontSize: 40,
  //           lineHeight: 36,
  //           color: "#01F5F1",
  //         },
  //       },
  //       graphic: {
  //         // 中心文字
  //         type: "text",
  //         left: "23%",
  //         top: "50%",
  //         z: 100,
  //         style: {
  //           text: "拓展完成率",
  //           textAlign: "center",
  //           fontFamily: "PingFang SC",
  //           fontSize: 24,
  //           lineHeight: 20,
  //           fill: "#FFFFFF",
  //         },
  //       },
  //       legend: {
  //         orient: "vertical",
  //         right: "16%",
  //         top: "center",
  //         icon: "rec",
  //         itemWidth: 20,
  //         itemHeight: 20,
  //         itemGap: 35,
  //         data: this.pieData,
  //         textStyle: {
  //           fontFamily: "PingFang SC",
  //           color: "#FFFFFF",
  //           fontSize: 28,
  //           lineHeight: 39,
  //           // width: 84,
  //         },
  //       },
  //       series: [
  //         {
  //           type: "pie",
  //           avoidLabelOverlap: false,
  //           radius: ["60%", 120],
  //           center: ["31%", "48%"],
  //           color: ["#F7D14A", "#57A6FB"],
  //           label: {
  //             show: false,
  //           },
  //           data: this.pieData,
  //         },
  //       ],
  //     };
  //     option && myChart.setOption(option);
  //     window.addEventListener("resize", () => {
  //       myChart.resize();
  //     });
  //   }
}
</script>

<style lang="scss" scoped>
.page__a1__map {
  display: flex;
  flex-flow: column nowrap;
  // justify-content: space-between;

  font-family: "PingFang SC";
  color: #90a4c3;

  .top_text {
    display: flex;
    flex-flow: row nowrap;
    // justify-content: space-between;
    align-items: center;
    margin: 43px 50px 0 50px;

    .left_text {
      flex: 1;
    }

    .right_top_text {
      flex: 1;
    }

    .row_content {
      display: flex;
      align-items: center;
      height: 48px;
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
      .value {
        margin-left: 36px;
        font-family: "DIN Alternate";
        font-weight: bold;
        font-size: 36px;
        line-height: 42px;
        color: #dbf0ff;
        opacity: 0.9;
      }
    }
  }
}

.bottom_content {
  margin: 47px 50px;

  display: flex;
  flex-flow: row;
  justify-content: space-between;
  height: 534px;
}

.left_bottom_text {
  flex: 1;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}

.right_bottom_text {
  flex: 1;
}

.left_text {
  font-size: 40px;
  line-height: 40px;

  .num {
    padding-top: 18px;
    font-size: 36px;
    line-height: 48px;

    span {
      margin-left: 6px;
      font-family: "DIN Alternate";
      font-weight: bold;
      font-size: 66px;
      line-height: 60px;
      color: #dbf0ff;
    }
  }

  .spcial span {
    color: #ff3980;
  }
}

.chart {
  width: 300px;
  height: 340px;
  @extend %bg-img-circle-1;
  @extend %flex-center;
}
</style>
