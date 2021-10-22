<template>
  <Spin :height="2533" :empty="empty">
    <div class="page__b1__map">
      <B1A
        :titles="titles"
        :tabs="tabList"
        :list="resData.infoMap"
        :xLabel="xLabel"
        :yLabel0="yLabel0"
        :yLabel1="yLabel1"
        :yLabel2="yLabel2"
        :yLabel3="yLabel3"
        :num="num"
        :monthTag="monthTag"
        :yearTag="yearTag"
        :specialTabIndex="specialTabIndex"
        :yIndex="yIndex[resData.transactionModel]"
        :ifChange="this.flag.reset"
      />
    </div>
  </Spin>
</template>

<script lang="ts">
import { Component, Watch } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import { StoreKey, useStore } from "@/store";
import {
  fetchFinanceLine,
  FinanceLineReturn,
} from "@/service/analysis/bigScreen/projectBoard/finance/financeLine";
import B1A from "./B1A.vue";
import { iwant } from "@guanyu/shared";

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
      "COST预估",
    ],
    MediumAsset: [
      "净利润率/NPI利润率/Y-C/现金流预估",
      "收入预估",
      "三费预估",
      "承租租金&COST预估",
    ],
    LightAsset: ["净利润率/NPI利润率/现金流预估", "收入预估", "三费预估"],
  };

  yIndex = {
    //百分比 - 0, 万元 - 1, 元 - 2
    HeavyAsset: [[0, 0, 0, 1], [1, 0, 2, 0], [1, 1, 1, 1], [1]],
    MediumAsset: [
      [0, 0, 0, 1],
      [1, 0, 2, 0],
      [1, 1, 1, 1],
      [1, 1],
    ],
    LightAsset: [
      [0, 0, 1],
      [1, 0, 2, 0],
      [1, 1, 1, 1],
    ],
  };

  tabList: string[][] = [];
  titles: string[] = [];

  xLabel: number[][] = []; // 运营月、运营年横坐标
  yLabel0: number[][][] = []; // 投资任务书版
  yLabel1: number[][][] = []; //最新过会版
  yLabel2: (number | string)[][][] = []; // 实际+月度运维版
  yLabel3: (number | string)[][][] = []; // 月度运维版
  monthTag = 0; // 运营月单位 分割线
  yearTag = 0; // 运营年单位 分割线
  specialTabIndex = -1; //cost tab所在index

  num = 0; // 折线图数量

  /**
   * 图表数据结构构建
   */
  buildData(transactionModel: string) {
    let { infoMap, month, year } = this.resData;
    this.xLabel = [];
    this.yLabel0 = [];
    this.yLabel1 = [];
    this.yLabel2 = [];
    this.yLabel3 = [];

    debugger;
    if (infoMap && month) {
      if (transactionModel === "LightAsset") {
        debugger;
        // 构建月度横坐标
        let monthXLabel: number[] = [];
        const list = (monthNum: number) =>
          [...new Array(monthNum).keys()].map((el) => el + 1);

        let monthNum = Math.max(
          infoMap.month1 && infoMap.month1.length,
          infoMap.month2 && infoMap.month2.length,
          infoMap.month3 && infoMap.month3.length
        );
        if (monthNum > 0) {
          monthXLabel = list(monthNum);
        }

        this.xLabel.push(monthXLabel);
        this.monthTag = monthXLabel.indexOf(iwant.number(this.resData.month));

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
            pic2: (number | string)[][] = [], // 折线图i中实际运维版
            pic3: (number | string)[][] = []; // 折线图i中月度运维版
          for (let j = 0; j < props; j++) {
            let data0: number[] = [], // 折线图i标签j中投资任务书版
              data1: number[] = [], // 折线图i标签j中投资最新过会版
              data2: (number | string)[] = [], // 折线图i标签j中实际运维版
              data3: (number | string)[] = []; // 折线图i标签j中月度运维版
            // 第j个标签
            let prop = propMap[i][j];
            infoMap.month1 &&
              infoMap?.month1.forEach((el) => {
                // 第k条折线
                data0.push(el[prop]);
              });
            infoMap.month2 &&
              infoMap?.month2.forEach((el) => {
                data1.push(el[prop]);
              });
            infoMap.month3 &&
              infoMap?.month3.forEach((el) => {
                if (el.dataNum < (month as number)) {
                  data2.push("-");
                  data3.push(el[prop]);
                } else if (el.dataNum === (month as number)) {
                  data2.push(el[prop]);
                  data3.push(el[prop]);
                } else {
                  data2.push(el[prop]);
                  data3.push("-");
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
        // 构建横坐标
        let monthXLabel: number[] = [],
          yearXLabel: number[] = [];

        let monthNum = Math.max(
          infoMap.month1 && infoMap.month1.length,
          infoMap.month2 && infoMap.month2.length,
          infoMap.month3 && infoMap.month3.length
        );
        const list = (monthNum: number) =>
          [...new Array(monthNum).keys()].map((el) => el + 1);
        if (monthNum > 0) {
          monthXLabel = list(monthNum);
        }
        let yearNum = Math.max(
          infoMap.year1 && infoMap.year1.length,
          infoMap.year2 && infoMap.year2.length,
          infoMap.year3 && infoMap.year3.length
        );
        if (yearNum > 0) {
          yearXLabel = list(yearNum);
        }

        // this.xLabel = [];
        this.xLabel.push(monthXLabel, yearXLabel);

        this.monthTag = monthXLabel.indexOf(iwant.number(this.resData.month));
        this.yearTag = yearXLabel.indexOf(iwant.number(this.resData.year));
        this.specialTabIndex = 1;

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
            pic2: (number | string)[][] = [], // 折线图i中实际运维版
            pic3: (number | string)[][] = []; // 折线图i中月度运维版
          for (let j = 0; j < props; j++) {
            let data0: number[] = [], // 折线图i标签j中投资任务书版
              data1: number[] = [], // 折线图i标签j中投资最新过会版
              data2: (number | string)[] = [], // 折线图i标签j中实际运维版
              data3: (number | string)[] = []; // 折线图i标签j中月度运维版
            // 第j个标签
            let prop = propMap[i][j];
            if (prop === "cost" || prop === "ycost") {
              infoMap.year1 &&
                infoMap?.year1.forEach((el) => {
                  data0.push(el[prop]);
                });
              infoMap.year2 &&
                infoMap?.year2.forEach((el) => {
                  data1.push(el[prop]);
                });
              infoMap.year3 &&
                infoMap?.year3.forEach((el) => {
                  if (el.dataNum < (year as number)) {
                    data2.push("-");
                    data3.push(el[prop]);
                  } else if (el.dataNum === (year as number)) {
                    data2.push(el[prop]);
                    data3.push(el[prop]);
                  } else {
                    data2.push(el[prop]);
                    data3.push("-");
                  }
                });
            } else {
              infoMap.month1 &&
                infoMap?.month1.forEach((el) => {
                  // 第k条折线
                  data0.push(el[prop]);
                });
              infoMap.month2 &&
                infoMap?.month2.forEach((el) => {
                  data1.push(el[prop]);
                });
              infoMap.month3 &&
                infoMap?.month3.forEach((el) => {
                  if (el.dataNum < (month as number)) {
                    data2.push("-");
                    data3.push(el[prop]);
                  } else if (el.dataNum === (month as number)) {
                    data2.push(el[prop]);
                    data3.push(el[prop]);
                  } else {
                    data2.push(el[prop]);
                    data3.push("-");
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
        // 构建横坐标
        let monthXLabel: number[] = [],
          yearXLabel: number[] = [];
        const list = (monthNum: number) =>
          [...new Array(monthNum).keys()].map((el) => el + 1);

        let monthNum = Math.max(
          infoMap.month1 && infoMap.month1.length,
          infoMap.month2 && infoMap.month2.length,
          infoMap.month3 && infoMap.month3.length
        );
        if (monthNum > 0) {
          monthXLabel = list(monthNum);
        }

        let yearNum = Math.max(
          infoMap.year1 && infoMap.year1.length,
          infoMap.year2 && infoMap.year2.length,
          infoMap.year3 && infoMap.year3.length
        );
        if (yearNum > 0) {
          yearXLabel = list(yearNum);
        }

        this.xLabel.push(monthXLabel, yearXLabel);

        this.monthTag = monthXLabel.indexOf(iwant.number(this.resData.month));
        this.yearTag = yearXLabel.indexOf(iwant.number(this.resData.year));
        this.specialTabIndex = 0;

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
            pic2: (number | string)[][] = [], // 折线图i中实际运维版
            pic3: (number | string)[][] = []; // 折线图i中月度运维版
          for (let j = 0; j < props; j++) {
            let data0: number[] = [], // 折线图i标签j中投资任务书版
              data1: number[] = [], // 折线图i标签j中投资最新过会版
              data2: (number | string)[] = [], // 折线图i标签j中实际运维版
              data3: (number | string)[] = []; // 折线图i标签j中月度运维版
            // 第j个标签
            let prop = propMap[i][j];
            if (prop === "cost" || prop === "ycost") {
              infoMap.year1 &&
                infoMap?.year1.forEach((el) => {
                  data0.push(el[prop]);
                });
              infoMap.year2 &&
                infoMap?.year2.forEach((el) => {
                  data1.push(el[prop]);
                });
              infoMap.year3 &&
                infoMap?.year3.forEach((el) => {
                  if (el.dataNum < (year as number)) {
                    data2.push("-");
                    data3.push(el[prop]);
                  } else if (el.dataNum === (month as number)) {
                    data2.push(el[prop]);
                    data3.push(el[prop]);
                  } else {
                    data2.push(el[prop]);
                    data3.push("-");
                  }
                });
            } else {
              infoMap.month1 &&
                infoMap?.month1.forEach((el) => {
                  // 第k条折线
                  data0.push(el[prop]);
                });
              infoMap.month2 &&
                infoMap?.month2.forEach((el) => {
                  data1.push(el[prop]);
                });
              infoMap.month3 &&
                infoMap?.month3.forEach((el) => {
                  if (el.dataNum < (month as number)) {
                    data2.push("-");
                    data3.push(el[prop]);
                  } else if (el.dataNum === (month as number)) {
                    data2.push(el[prop]);
                    data3.push(el[prop]);
                  } else {
                    data2.push(el[prop]);
                    data3.push("-");
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

  flag = {
    phId: true,
    reset: false,
  };

  @Watch("store.global.project.phId")
  projectChanged() {
    this.flag.phId = true;
  }

  async fetch() {
    const response = await useStore(fetchFinanceLine, {
      key: StoreKey.ProjectFinanceLine,
      params: {
        phId: this.store.global.project.phId,
      },
    });
    if (response?.status === "ok") {
      this.resData = iwant.object(response.data);
      this.empty = false;
      if (this.resData.transactionModel) {
        this.tabList = this.tabLabels[
          iwant.string(this.resData.transactionModel)
        ];
        this.titles = this.pannelTitles[
          iwant.string(this.resData.transactionModel)
        ];
        this.buildData(iwant.string(this.resData.transactionModel));
      } else {
        const { transactionModel } = this.store.global.project;
        this.tabList = this.tabLabels[transactionModel];
        this.titles = this.pannelTitles[transactionModel];
        this.buildData(transactionModel);
      }
    } else {
      this.empty = true;
    }
    if (this.flag.phId) {
      this.flag.phId = false;
      this.flag.reset = !this.flag.reset;
    }
    return response;
  }
}
</script>

<style lang="scss" scoped></style>
