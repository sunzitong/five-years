<template>
  <div class="pannel_right">
    <div class="top">
      <div class="pannel_text">
        年开业目标间数：
        <span>{{ sepNumber(targetNum) }}</span>
      </div>
      <div class="pannel_sub_text">
        <div class="left">
          已开业间数：
          <van-row class="data_row" :gutter="20">
            <van-col :span="6" class="value_details">
              {{ sepNumber(hasOpen) }}
            </van-col>
            <van-col :span="6" class="value_details">
              {{ hasOpenRatio }}%
            </van-col>
          </van-row>
        </div>
        <div class="right">
          待开业间数：
          <div class="right_bottom">
            <div class="text_before">
              <div class="box_line_one"></div>
              <div class="box_line_two"></div>
            </div>
            <div class="text_container">
              <div>
                <van-row :gutter="20" type="flex" justify="flex-end">
                  <van-col :span="8" class="text_abstract">待获取：</van-col>
                  <van-col :span="6" class="value_details">
                    {{ sepNumber(toGet) }}
                  </van-col>
                  <van-col :span="6" class="value_details">
                    {{ toGetRatio + "%" }}
                  </van-col>
                </van-row>
              </div>
              <div>
                <van-row :gutter="20" type="flex" justify="flex-end">
                  <van-col :span="8" class="text_abstract">已获取：</van-col>
                  <van-col :span="6" class="value_details">
                    {{ sepNumber(hasGet) }}
                  </van-col>
                  <van-col :span="6" class="value_details">
                    {{ hasGetRatio + "%" }}
                  </van-col>
                </van-row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <van-row>
      <van-col :span="12">
        <div
          class="left_echarts"
          ref="leftCharts"
          style="width: 450px; height: 300px"
        ></div>
      </van-col>
      <van-col :span="12">
        <div
          class="right_echarts"
          ref="rightCharts"
          style="width: 450px; height: 300px"
        ></div>
      </van-col>
    </van-row>
  </div>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import { AnyObject, arrayToObject, iwant } from "@guanyu/shared";
import {
  fetchProjectOpen,
  ProjectOpenReturn,
} from "@/service/analysis/bigScreen/mainBoard/construct/projectOpen/";
import dayjs from "dayjs";
import Base from "@/views/Base";
// import { iwant, Nullable } from "@guanyu/shared";

@Component({
  components: {},
})
export default class B1B extends Base {
  /**
   * 左侧饼图
   */
  @Ref() leftCharts!: HTMLDivElement;
  /**
   * 右侧饼图
   */
  @Ref() rightCharts!: HTMLDivElement;
  /**
   * 接口返回值
   * /bigScreen/mainBoard/construct/projectOpen
   */
  resData: Partial<ProjectOpenReturn> = {};

  year = dayjs().year();

  targetNum: number | "--" = "--"; // 年开业目标间数

  hasOpen: number | "--" = "--"; // 已开业间数
  hasOpenRatio: number | "--" = "--"; // 已开业间数百分比

  toGet: number | "--" = "--"; // 待获取
  toGetRatio: number | "--" = "--"; // 待获取百分比

  hasGet: number | "--" = "--"; // 已获取
  hasGetRatio: number | "--" = "--"; // 已获取百分比

  pieData1: AnyObject[] = []; // 左侧饼图对象数组
  pieData2: AnyObject[] = []; // 右侧饼图对象数组

  objData1: AnyObject = {}; // 左侧饼图name-value键值对对象
  objData2: AnyObject = {}; // 右侧饼图name-value键值对对象

  async created() {
    const response = await fetchProjectOpen({
      regionType: this.store.global.dataLevel,
      regionId: this.store.global.orgId,
    });
    if (response?.status === "ok") {
      this.resData = response.data;

      this.targetNum = this.resData.openTargetNum ?? "--";

      this.hasOpen = this.resData.openInfo?.total ?? "--";
      this.hasOpenRatio = this.resData.openInfo?.ratio ?? "--";

      this.toGet = this.resData.notOpenNotGetNum ?? "--";
      this.toGetRatio = this.resData.notOpenNotGetRatio ?? "--";

      this.hasGet = this.resData.notOpenInfo?.total ?? "--";
      this.hasGetRatio = this.resData.notOpenInfo?.ratio ?? "--";

      this.pieData1 = iwant.array(this.resData.openInfo?.list).map((el) => {
        return {
          name: el.transactionModel,
          value: iwant.calc(el.ratio, 2, true),
        };
      });
      this.pieData2 = iwant.array(this.resData.notOpenInfo?.list).map((el) => {
        return {
          name: el.transactionModel,
          value: iwant.calc(el.ratio, 2, true),
        };
      });

      this.objData1 = arrayToObject(this.pieData1, {
        key: "name",
        value: "value",
      });
      this.objData2 = arrayToObject(this.pieData2, {
        key: "name",
        value: "value",
      });

      this.paintChart();
    }
  }

  paintChart() {
    const myLeftChart = echarts.init(this.leftCharts);
    // myChart.showLoading();
    let option1 = {
      legend: {
        orient: "vertical",
        right: "3%",
        top: "18%",
        icon: "rec",
        itemWidth: 20,
        itemHeight: 20,
        itemGap: 35,
        data: this.pieData1,
        formatter: (params: any) => {
          return `{a|${params}}{b|  ${this.objData1[params]}%}`;
        },
        textStyle: {
          rich: {
            a: {
              color: "#FFFFFF",
              fontSize: 28,
              lineHeight: 39,
              width: 84,
            },
            b: {
              color: "#01F5F1",
              fontSize: 34,
              lineHeight: 36,
              align: "right",
            },
          },
        },
      },
      series: [
        {
          type: "pie",
          avoidLabelOverlap: false,
          radius: ["25%", 70],
          center: ["20%", "48%"],
          color: ["#F7D14A", "#57A6FB", "#A957FB"],
          label: {
            show: false,
          },
          data: this.pieData1,
        },
      ],
    };
    option1 && myLeftChart.setOption(option1);
    window.addEventListener("resize", () => {
      myLeftChart.resize();
    });

    const myRightChart = echarts.init(this.rightCharts);
    // myChart.showLoading();
    let option2 = {
      legend: {
        orient: "vertical",
        right: "3%",
        top: "18%",
        icon: "rec",
        itemWidth: 20,
        itemHeight: 20,
        itemGap: 35,
        data: this.pieData2,
        formatter: (params: any) => {
          return `{a|${params}}{b|  ${this.objData1[params]}%}`;
        },
        textStyle: {
          rich: {
            a: {
              color: "#FFFFFF",
              fontSize: 28,
              lineHeight: 39,
              width: 84,
            },
            b: {
              color: "#01F5F1",
              fontSize: 34,
              lineHeight: 36,
              align: "right",
            },
          },
        },
      },
      series: [
        {
          type: "pie",
          avoidLabelOverlap: false,
          radius: ["25%", 70],
          center: ["20%", "48%"],
          color: ["#F7D14A", "#57A6FB", "#A957FB"],
          label: {
            show: false,
          },
          data: this.pieData2,
        },
      ],
    };
    option2 && myRightChart.setOption(option2);
    window.addEventListener("resize", () => {
      myRightChart.resize();
    });
  }
}
</script>

<style lang="scss" scoped>
.top {
  margin-left: 41px;
  margin-right: 65px;

  .pannel_text {
    font-family: "PingFang SC";
    font-size: 30px;
    line-height: 30px;
    color: #ffffff;

    margin-top: 30px;
    margin-bottom: 36px;

    span {
      font-family: "DIN Alternate";
      font-weight: bold;
      font-size: 40px;
      line-height: 36px;
      text-align: right;
      color: #01f5f1;
    }
  }

  .text_abstract {
    font-family: "PingFang SC";
    font-size: 28px;
    line-height: 30px;
    color: #ffffff;

    padding-top: 15px;
    vertical-align: baseline;
  }

  .pannel_sub_text {
    font-family: "PingFang SC";
    font-size: 28px;
    line-height: 30px;
    color: #ffffff;

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    .value_details {
      font-family: "DIN Alternate";
      font-weight: bold;
      font-size: 34px;
      line-height: 36px;
      color: #01f5f1;

      padding-top: 12px;
      width: 110px;
      text-align: right;
    }

    .data_row {
      width: 340px;
    }

    .right {
      flex: 1;
      .right_bottom {
        display: flex;
        flex-flow: row nowrap;

        .text_before {
          position: relative;
          top: 8px;
          left: 70px;
          width: 40px;
          height: 79px;
          border-left: 1px solid #1b4985;
          border-bottom: 1px solid #1b4985;

          .box_line_one {
            height: 50%;
            border-bottom: 1px solid #1b4985;
          }
        }

        .text_container {
          margin-left: 100px;
          height: 100px;
          width: 300px;

          display: flex;
          flex-flow: column nowrap;
          justify-content: flex-end;

          .van-row {
            width: 400px;
          }
        }
      }
    }
  }
}
</style>
