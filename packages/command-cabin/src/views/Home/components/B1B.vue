<template>
  <div class="pannel_right">
    <div class="top">
      <div class="left-pannel">
        <div class="pannel_text">
          <span>年开业目标间数：</span>
          <span>{{ sepNumber(targetNum) }}</span>
        </div>
        <div class="left pannel_sub_text">
          <div>
            <van-row class="data_row">已开业间数：</van-row>
            <van-row class="data_row">
              <van-col :span="12" class="value_details">
                {{ sepNumber(hasOpen) }}
              </van-col>
              <van-col :span="12" class="value_details">
                {{ hasOpenRatio }}%
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
      <div class="right-pannel">
        <div class="right pannel_sub_text">
          <div class="text_container">
            <div>
              <van-row class="data_row">待获取待开业间数</van-row>
              <van-row class="data_row">
                <van-col :span="12" class="value_details">
                  {{ sepNumber(toGet) }}
                </van-col>
                <van-col :span="12" class="value_details">
                  {{ toGetRatio + "%" }}
                </van-col>
              </van-row>
            </div>
            <div>
              <van-row class="data_row">已获取待开业间数</van-row>
              <van-row class="data_row">
                <van-col :span="12" class="value_details">
                  {{ sepNumber(hasGet) }}
                </van-col>
                <van-col :span="12" class="value_details">
                  {{ hasGetRatio + "%" }}
                </van-col>
              </van-row>
            </div>
          </div>
        </div>
      </div>
    </div>

    <van-row>
      <van-col :span="12">
        <B1C
          :pieData="pieData1"
          style="width: 100%; height: 230px; margin-top: 60px"
        />
      </van-col>
      <van-col :span="12">
        <B1C
          :pieData="pieData2"
          style="width: 100%; height: 230px; margin-top: 60px"
        />
      </van-col>
    </van-row>
  </div>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
// import echarts from "@/plugins/echarts";
import { AnyObject, arrayToObject, iwant } from "@guanyu/shared";
import {
  fetchProjectOpen,
  ProjectOpenReturn,
} from "@/service/analysis/bigScreen/mainBoard/construct/projectOpen";
import dayjs from "dayjs";
import { Base, IFetch } from "@/views/Base";
import { StoreKey, useStore } from "@/store";
import B1C from "./B1C.vue";
import { formatValue } from "@/utils/tools";

@Component({
  components: {
    B1C,
  },
})
export default class B1B extends Base implements IFetch {
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

  targetNum: number | string = formatValue(); // 年开业目标间数

  hasOpen: number | string = formatValue(); // 已开业间数
  hasOpenRatio = formatValue(); // 已开业间数百分比

  toGet: number | string = formatValue(); // 待获取
  toGetRatio: number | string = formatValue(); // 待获取百分比

  hasGet: number | string = formatValue(); // 已获取
  hasGetRatio: number | string = formatValue(); // 已获取百分比

  pieData1: AnyObject[] = []; // 左侧饼图对象数组
  pieData2: AnyObject[] = []; // 右侧饼图对象数组

  objData1: AnyObject = {}; // 左侧饼图name-value键值对对象
  objData2: AnyObject = {}; // 右侧饼图name-value键值对对象
  color = ["#5180E4", "#F7D14A", "#B491FD"];

  getArrayValue = (array: AnyObject[], key: string) => {
    key = key || "value";
    let res: number[] = [];
    if (array) {
      array.forEach(function (t) {
        res.push(t[key]);
      });
    }
    return res;
  };

  values1: number[] = []; // value数组
  values2: number[] = []; // value数组

  /**
   * 自动触发 重复调用
   * @returns response
   */
  async fetch() {
    const response = await useStore(fetchProjectOpen, {
      key: StoreKey.HomeProjectOpen,
      params: {
        regionType: this.store.global.dataLevel,
        regionId: this.store.global.orgTree.orgId,
      },
    });
    if (response?.status === "ok") {
      this.resData = iwant.object(response.data);
      this.empty = false;

      this.targetNum = formatValue(this.resData.openTargetNum);

      this.hasOpen = formatValue(this.resData.openInfo?.total);
      this.hasOpenRatio = formatValue(this.resData.openInfo?.ratio);

      this.toGet = formatValue(this.resData.notOpenNotGetNum);
      this.toGetRatio = formatValue(this.resData.notOpenNotGetRatio);

      this.hasGet = formatValue(this.resData.notOpenInfo?.total);
      this.hasGetRatio = formatValue(this.resData.notOpenInfo?.ratio);

      this.pieData1 = iwant.array(this.resData.openInfo?.list).map((el) => {
        return {
          name: el.transactionModel,

          value: el.ratio,
        };
      });
      this.pieData2 = iwant.array(this.resData.notOpenInfo?.list).map((el) => {
        return {
          name: el.transactionModel,

          value: el.ratio,
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

      this.values1 = this.getArrayValue(this.pieData1, "value"); // value数组
      this.values2 = this.getArrayValue(this.pieData2, "value"); // value数组
    } else {
      this.empty = true;
    }
    return response;
  }
}
</script>

<style lang="scss" scoped>
.top {
  margin-right: 73px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-end;

  .pannel_text {
    padding: 40px 0 0 0px;
    font-size: 40px;
    line-height: 40px;
    color: #90a4c3;

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;

    span:nth-child(2) {
      padding: 18px 0 45px 0;
      display: inline-block;
      @extend %value-font;
      font-weight: bold;
      font-size: 66px;
      line-height: 60px;
      color: #dbf0ff;
    }
  }

  .text_abstract {
    font-size: 28px;
    line-height: 30px;
    color: #ffffff;

    padding-top: 15px;
    vertical-align: baseline;
  }

  .left {
    flex: 1;
    display: flex;
    align-items: center;
    height: 100px;
    background: linear-gradient(
      89.96deg,
      rgba(5, 203, 253, 0.1) 0%,
      rgba(0, 127, 249, 0) 100.9%
    );
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

  .pannel_sub_text {
    font-size: 36px;
    line-height: 36px;
    color: #90a4c3;

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    .value_details {
      @extend %value-font;
      font-weight: bold;
      font-size: 36px;
      line-height: 42px;
      color: #dbf0ff;
    }

    .data_row {
      width: 360px;
      padding-top: 10px;
    }
  }

  .right {
    flex: 1;
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    height: 200px;
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
</style>
