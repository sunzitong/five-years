<template>
  <Spin :height="2533" :loading="loading" :empty="empty">
    <div class="page__b1__map">
      <B1A
        :titles="titles"
        :tabs="tabList"
        :list="resData.infoMap"
        :monthXLabel="monthXLabel"
        :yearXlabel="yearXlabel"
        :yLabel0="yLabel0"
        :yLabel1="yLabel1"
        :yLabel2="yLabel2"
        :yLabel3="yLabel3"
        :num="num"
      />
    </div>
  </Spin>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import { StoreKey, useStore } from "@/store";
import {
  fetchFinanceLine,
  FinanceLineReturn,
} from "@/service/analysis/bigScreen/projectBoard/finance/financeLine";
import B1A from "./B1A.vue";
import { AnyObject, iwant } from "@guanyu/shared";

@Component({
  components: { B1A },
})
export default class B1 extends Base implements IFetch {
  resData: Partial<FinanceLineReturn> = {};

  tabLabels = {
    HeavyAsset: [
      ["净利润率", "NPI利润率", "YC", "现金流"],
      ["收入", "平均出租率", "平均单房价格", "涨幅"],
      ["三费合计", "营销费用", "运营成本", "管理成本"],
      ["COST"],
    ],
    MediumAsset: [
      ["净利润率", "NPI利润率", "YC", "现金流"],
      ["收入", "平均出租率", "平均单房价格", "涨幅"],
      ["三费合计", "营销费用", "运营成本", "管理成本"],
      ["承租租金", "COST"],
    ],
    LightAsset: [
      ["净利润率", "NPI利润率", "现金流"],
      ["收入", "平均出租率", "平均单房价格", "涨幅"],
      ["三费合计", "营销费用", "运营成本", "管理成本"],
    ],
  };

  pannelTitles = {
    HeavyAsset: [
      "净利润率/NPI利润率/Y-C/现金流预估",
      "收入预估",
      "三费预估",
      "承租租金&COST预估",
    ],
    MediumAsset: [
      "净利润率/NPI利润率/Y-C/现金流预估",
      "收入预估",
      "三费预估",
      "承租租金&COST预估",
    ],
    LightAsset: ["净利润率/NPI利润率/Y-C/现金流预估", "收入预估", "三费预估"],
  };

  tabList: string[][] = [];
  titles: string[] = [];

  monthXLabel: number[] = [];
  yearXlabel: number[] = []; // 运营月、运营年横坐标
  yLabel0: number[][][] = []; // 投资任务书版
  yLabel1: number[][][] = []; //最新过会版
  yLabel2: number[][][] = []; // 实际+月度运维版
  yLabel3: number[][][] = []; // 月度运维版

  num = 0; // 折线图数量

  /**
   * 图表数据结构构建
   */
  buildData(transactionModel: string) {
    let { infoMap, month, year } = this.resData;

    if (infoMap && month) {
      if (transactionModel === "LightAsset") {
        // 构建月度横坐标
        infoMap.month1.forEach((el: AnyObject) => {
          this.monthXLabel.push(el.dataNum / 12);
        });

        // 构建三条折线数据结构（二维数组）
        let propMap = [
          ["profitRate", "npiProfitRate", "cashSum"],
          ["openIncome", "avgRate", "avgPriece", "priceIncrement"],
          ["threeCost", "marketExpense", "operCost", "manageCost"],
        ];
        let latitude = propMap.length;
        for (let i = 0; i < latitude; i++) {
          // 第i幅图
          let props = propMap[i].length;
          let pic0: number[][] = [], // 折线图i中投资任务书版
            pic1: number[][] = [], // 折线图i中投资最新过会版
            pic2: number[][] = [], // 折线图i中实际运维版
            pic3: number[][] = []; // 折线图i中月度运维版
          for (let j = 0; j < props; j++) {
            let data0: number[] = [], // 折线图i标签j中投资任务书版
              data1: number[] = [], // 折线图i标签j中投资最新过会版
              data2: number[] = [], // 折线图i标签j中实际运维版
              data3: number[] = []; // 折线图i标签j中月度运维版
            // 第j个标签
            let prop = propMap[i][j];
            infoMap?.month1.forEach((el) => {
              // 第k条折线
              data0.push(el[prop]);
            });
            infoMap?.month2.forEach((el) => {
              data1.push(el[prop]);
            });
            infoMap?.month3.forEach((el) => {
              if (el.dataNum > (month as number)) {
                data2.push(0);
                data3.push(el[prop]);
              } else {
                data2.push(el[prop]);
                data3.push(0);
              }
            });
            pic0.push(data0);
            pic1.push(data1);
            pic2.push(data2);
            pic3.push(data3);
          }
          this.yLabel0.push(pic0);
          this.yLabel1.push(pic1);
          this.yLabel2.push(pic2);
          this.yLabel3.push(pic3);
        }
        this.num = 3;
      } else if (transactionModel === "MediumAsset") {
        // 构建月度横坐标
        infoMap.month1.forEach((el: AnyObject) => {
          this.monthXLabel.push(el.dataNum / 12);
        });

        infoMap.year1.forEach((el: AnyObject) => {
          this.yearXLabel.push(el.dataNum);
        });
        // 构建三条折线数据结构（二维数组）
        let propMap = [
          ["profitRate", "npiProfitRate", "ycost", "cashSum"],
          ["openIncome", "avgRate", "avgPriece", "priceIncrement"],
          ["threeCost", "marketExpense", "operCost", "manageCost"],
          ["rental", "cost"],
        ];
        let latitude = propMap.length;
        for (let i = 0; i < latitude; i++) {
          // 第i幅图
          let props = propMap[i].length;
          let pic0: number[][] = [], // 折线图i中投资任务书版
            pic1: number[][] = [], // 折线图i中投资最新过会版
            pic2: number[][] = [], // 折线图i中实际运维版
            pic3: number[][] = []; // 折线图i中月度运维版
          for (let j = 0; j < props; j++) {
            let data0: number[] = [], // 折线图i标签j中投资任务书版
              data1: number[] = [], // 折线图i标签j中投资最新过会版
              data2: number[] = [], // 折线图i标签j中实际运维版
              data3: number[] = []; // 折线图i标签j中月度运维版
            // 第j个标签
            let prop = propMap[i][j];
            if (prop === "cost") {
              infoMap?.year1.forEach((el) => {
                data0.push(el[prop]);
              });
              infoMap?.year2.forEach((el) => {
                data1.push(el[prop]);
              });
              infoMap?.year3.forEach((el) => {
                if (el.dataNum > (year as number)) {
                  data2.push(0);
                  data3.push(el[prop]);
                } else {
                  data2.push(el[prop]);
                  data3.push(0);
                }
              });
            } else {
              infoMap?.month1.forEach((el) => {
                // 第k条折线
                data0.push(el[prop]);
              });
              infoMap?.month2.forEach((el) => {
                data1.push(el[prop]);
              });
              infoMap?.month3.forEach((el) => {
                if (el.dataNum > (month as number)) {
                  data2.push(0);
                  data3.push(el[prop]);
                } else {
                  data2.push(el[prop]);
                  data3.push(0);
                }
              });
            }
            pic0.push(data0);
            pic1.push(data1);
            pic2.push(data2);
            pic3.push(data3);
          }
          this.yLabel0.push(pic0);
          this.yLabel1.push(pic1);
          this.yLabel2.push(pic2);
          this.yLabel3.push(pic3);
        }
        this.num = 4;
      } else if (transactionModel === "HeavyAsset") {
        // 构建月度横坐标
        infoMap.month1.forEach((el: AnyObject) => {
          this.monthXLabel.push(el.dataNum / 12);
        });

        infoMap.year1.forEach((el: AnyObject) => {
          this.yearXLabel.push(el.dataNum);
        });
        // 构建三条折线数据结构（二维数组）
        let propMap = [
          ["profitRate", "npiProfitRate", "ycost", "cashSum"],
          ["openIncome", "avgRate", "avgPriece", "priceIncrement"],
          ["threeCost", "marketExpense", "operCost", "manageCost"],
          ["cost"],
        ];
        let latitude = propMap.length;
        for (let i = 0; i < latitude; i++) {
          // 第i幅图
          let props = propMap[i].length;
          let pic0: number[][] = [], // 折线图i中投资任务书版
            pic1: number[][] = [], // 折线图i中投资最新过会版
            pic2: number[][] = [], // 折线图i中实际运维版
            pic3: number[][] = []; // 折线图i中月度运维版
          for (let j = 0; j < props; j++) {
            let data0: number[] = [], // 折线图i标签j中投资任务书版
              data1: number[] = [], // 折线图i标签j中投资最新过会版
              data2: number[] = [], // 折线图i标签j中实际运维版
              data3: number[] = []; // 折线图i标签j中月度运维版
            // 第j个标签
            let prop = propMap[i][j];
            if (prop === "cost") {
              infoMap?.year1.forEach((el) => {
                data0.push(el[prop]);
              });
              infoMap?.year2.forEach((el) => {
                data1.push(el[prop]);
              });
              infoMap?.year3.forEach((el) => {
                if (el.dataNum > (year as number)) {
                  data2.push(0);
                  data3.push(el[prop]);
                } else {
                  data2.push(el[prop]);
                  data3.push(0);
                }
              });
            } else {
              infoMap?.month1.forEach((el) => {
                // 第k条折线
                data0.push(el[prop]);
              });
              infoMap?.month2.forEach((el) => {
                data1.push(el[prop]);
              });
              infoMap?.month3.forEach((el) => {
                if (el.dataNum > (month as number)) {
                  data2.push(0);
                  data3.push(el[prop]);
                } else {
                  data2.push(el[prop]);
                  data3.push(0);
                }
              });
            }
            pic0.push(data0);
            pic1.push(data1);
            pic2.push(data2);
            pic3.push(data3);
          }
          this.yLabel0.push(pic0);
          this.yLabel1.push(pic1);
          this.yLabel2.push(pic2);
          this.yLabel3.push(pic3);
        }
        this.num = 4;
      }
    }
  }

  async fetch() {
    const response = await useStore(fetchFinanceLine, {
      key: StoreKey.ProjectFinanceLine,
      params: {
        phId: this.store.global.project.phId,
      },
    });
    if (response?.status === "ok") {
      this.resData = response.data;
      this.tabList = this.tabLabels[
        iwant.string(this.resData.transactionModel)
      ];
      this.titles = this.pannelTitles[
        iwant.string(this.resData.transactionModel)
      ];
      this.buildData(iwant.string(this.resData.transactionModel));
    } else {
      this.empty = true;
    }
    return response;
  }
}
</script>

<style lang="scss" scoped></style>
