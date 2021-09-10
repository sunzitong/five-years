<template>
  <div class="page__a1__map">
    <!-- 顶部文字 -->
    <div class="top_text">
      <van-row justify="space-between" type="flex" class="top_text">
        <van-col :span="18">已签约间数</van-col>
        <van-col :span="6" class="abstract_style">
          {{ sepNumber(signRoom) }}
        </van-col>
      </van-row>
      <div class="point_line"></div>
      <van-row justify="space-between" type="flex" class="middle_text">
        <van-col :span="8">
          <span>重</span>
          <span>{{ sepNumber(heavyNum) }}</span>
        </van-col>
        <van-col :span="8">
          <span>中</span>
          <span>{{ sepNumber(middleNum) }}</span>
        </van-col>
        <van-col :span="8">
          <span>轻</span>
          <span>{{ sepNumber(lightNum) }}</span>
        </van-col>
      </van-row>
      <!-- 中部列表 -->
      <ul class="middle_ul">
        <li>
          <van-row justify="space-between" type="flex" class="ul_text">
            <van-col>获取目标</van-col>
            <van-col class="abstract_style">
              {{ sepNumber(gainTarget) }}
            </van-col>
          </van-row>
        </li>
        <li>
          <van-row justify="space-between" type="flex" class="ul_text">
            <van-col>目标差额</van-col>
            <van-col class="abstract_style special">
              {{ sepNumber(targetDiffer) }}
            </van-col>
          </van-row>
        </li>
        <li>
          <van-row justify="space-between" type="flex" class="ul_text">
            <van-col>
              已签约间数
              <span>（非协同）</span>
            </van-col>
            <van-col class="abstract_style">
              {{ sepNumber(signedRoom) }}
            </van-col>
          </van-row>
        </li>
      </ul>
      <!-- 下部饼图 -->
    </div>
    <div class="middle_text"></div>
    <div
      class="app-echarts"
      ref="wrapper"
      style="width: 100%; height: 250px"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
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

  mounted() {
    this.paintPieChart();
  }

  paintPieChart() {
    const myChart = echarts.init(this.wrapper);
    // myChart.showLoading();
    let option = {
      grid: {
        x: "40%",
      },
      title: {
        //中心数值
        text: this.centerVlue + "%",
        left: "27%",
        top: "30%",
        z: 100,
        textStyle: {
          fontFamily: "DIN Alternate",
          fontWeight: "bold",
          fontSize: 40,
          lineHeight: 36,
          color: "#01F5F1",
        },
      },
      graphic: {
        // 中心文字
        type: "text",
        left: "23%",
        top: "50%",
        z: 100,
        style: {
          text: "拓展完成率",
          textAlign: "center",
          fontFamily: "PingFang SC",
          fontSize: 24,
          lineHeight: 20,
          fill: "#FFFFFF",
        },
      },
      legend: {
        orient: "vertical",
        right: "16%",
        top: "center",
        icon: "rec",
        itemWidth: 20,
        itemHeight: 20,
        itemGap: 35,
        data: this.pieData,
        textStyle: {
          fontFamily: "PingFang SC",
          color: "#FFFFFF",
          fontSize: 28,
          lineHeight: 39,
          // width: 84,
        },
      },
      series: [
        {
          type: "pie",
          avoidLabelOverlap: false,
          radius: ["60%", 120],
          center: ["31%", "48%"],
          color: ["#F7D14A", "#57A6FB"],
          label: {
            show: false,
          },
          data: this.pieData,
        },
      ],
    };
    option && myChart.setOption(option);
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  }
}
</script>

<style lang="scss" scoped>
.top_text {
  margin: 50px 30px 10px 30px;

  font-family: "PingFang SC";
  font-size: 30px;
  line-height: 30px;
  color: #ffffff;

  .abstract_style {
    font-family: "DIN Alternate";
    font-weight: bold;
    font-size: 40px;
    line-height: 36px;
    text-align: right;
    color: #01f5f1;
  }

  .point_line {
    position: relative;
    left: 77px;
    width: 69px;
    height: 53px;
    border-left: 1px solid #1b4985;
    border-bottom: 1px solid #1b4985;
  }

  .middle_text {
    position: relative;
    top: -15px;
    margin-left: 160px;
    margin-bottom: 25px;
  }
  .middle_text span:nth-child(1) {
    font-family: "PingFang SC";
    font-size: 28px;
    line-height: 39px;
    color: #ffffff;
  }
  .middle_text span:nth-child(2) {
    font-family: "DIN Alternate";
    font-weight: bold;
    font-size: 34px;
    line-height: 36px;
    color: #01f5f1;

    margin-left: 6px;
  }

  .middle_ul {
    margin: 0 30px 56px 0;

    li {
      border-bottom: 1px dashed #1b4985;
      .ul_text {
        padding: 30px 0;

        span {
          font-size: 26px;
          line-height: 22px;
          letter-spacing: 2.5px;
          color: #777777;
        }
      }
    }
    li:nth-child(1) {
      border-top: 1px dashed #1b4985;
    }
  }

  .special {
    color: #ff2a76;
  }
}
</style>
