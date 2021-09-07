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
          <van-row class="data_row">
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
                  <van-col :span="11" class="text_abstract">待获取：</van-col>
                  <van-col :span="6" class="value_details">
                    {{ sepNumber(toGet) }}
                  </van-col>
                  <van-col :span="6" class="value_details">
                    {{ toGetRatio }}%
                  </van-col>
                </van-row>
              </div>
              <div>
                <van-row :gutter="20" type="flex" justify="flex-end">
                  <van-col :span="11" class="text_abstract">已获取：</van-col>
                  <van-col :span="6" class="value_details">
                    {{ sepNumber(hasGet) }}
                  </van-col>
                  <van-col :span="6" class="value_details">
                    {{ hasGetRatio }}%
                  </van-col>
                </van-row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <van-row>
      <van-col :span="11">
        <div
          class="left_echarts"
          ref="leftCharts"
          style="width: 430px; height: 300px"
        ></div>
      </van-col>
      <van-col :span="11">
        <div
          class="right_echarts"
          ref="rightCharts"
          style="width: 430px; height: 300px"
        ></div>
      </van-col>
    </van-row>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import { arrayToObject } from "@guanyu/shared";
import { sepNumber } from "@/utils/tools";
import {
  fetchProjectOpen,
  ProjectOpenReturn,
} from "@/service/bigScreen/mainBoard/construct/projectOpen/";
import dayjs from "dayjs";
// import { iwant, Nullable } from "@guanyu/shared";

@Component({
  components: {},
})
export default class B1B extends Vue {
  sepNumber = sepNumber;

  @Ref() leftCharts!: HTMLDivElement;

  @Ref() rightCharts!: HTMLDivElement;

  resData: Partial<ProjectOpenReturn> = {};

  year = dayjs().year();

  targetNum: number | "--" = "--";

  hasOpen: number | "--" = "--";
  hasOpenRatio: number | "--" = "--";

  toGet: number | "--" = "--";
  toGetRatio: number | "--" = "--";

  hasGet: number | "--" = "--";
  hasGetRatio: number | "--" = "--";

  pieData1 = [
    {
      name: "重资产",
      value: "43",
    },
    {
      name: "中资产",
      value: "43",
    },
    {
      name: "轻资产",
      value: "43",
    },
  ];

  pieData2 = [
    {
      name: "重资产",
      value: "43",
    },
    {
      name: "中资产",
      value: "43",
    },
    {
      name: "轻资产",
      value: "43",
    },
  ];

  objData1 = arrayToObject(this.pieData1, { key: "name", value: "value" });
  objData2 = arrayToObject(this.pieData1, { key: "name", value: "value" });

  async created() {
    const response = await fetchProjectOpen({
      regionType: "group",
      regionId: 85,
      dataTime: this.year,
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
    }
  }

  mounted() {
    const myLeftChart = echarts.init(this.leftCharts);
    // myChart.showLoading();
    let option1 = {
      legend: {
        orient: "vertical",
        left: "50%",
        top: "10%",
        icon: "rec",
        itemWidth: 20,
        itemHeight: 20,
        itemGap: 43,
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
          radius: ["30%", 75],
          center: ["25%", "45%"],
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
        left: "50%",
        top: "10%",
        icon: "rec",
        itemWidth: 20,
        itemHeight: 20,
        itemGap: 43,
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
          radius: ["30%", 75],
          center: ["25%", "45%"],
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
    }

    .data_row {
      width: 350px;
    }

    .right {
      // width: 480px;
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
        }
      }
    }
  }
}
</style>
