<template>
  <div class="page_rent_term" v-if="res">
    <ProNotification :theme="res.warnLight">
      {{ res.warnLightNote }}
    </ProNotification>
    <DetailCard :rentData="rentData" :flag="res.warnLight === 'GREEN'" />
    <ProCard
      title="在租合同租期分布"
      :styleTitle="cardTitleStyle"
      class="pie_chart_part"
    >
      <div class="pie_chart_wrap">
        <div ref="pieChart" class="chart"></div>
      </div>
    </ProCard>
    <ProCard
      title="未来12个月租期落点"
      :styleTitle="cardTitleStyle"
      class="complex_chart_part"
    >
      <div class="complex_chart_wrap">
        <!-- <div class="chart_title_explan">
          <van-tag type="primary" color="#1C7AF7" text-color="#FFFFFF">
            Beta
          </van-tag>
          <span id="title_explan">理想流速倒推模型Beta版</span>
        </div> -->
        <div ref="complexChart" class="complex_chart"></div>
      </div>
    </ProCard>
    <!-- <ProCard
      title="租期落点建议方案"
      :styleTitle="cardTitleStyle"
      class="complex_chart_part"
    >
      <div class="table_wrap">
        <div class="chart_title_explan">
          <van-tag type="primary" color="#1C7AF7" text-color="#FFFFFF">
            Beta
          </van-tag>
          <span id="title_explan">理想流速倒推模型Beta版</span>
        </div>
        <ProTable
          :columns="columnsScheme"
          :dataSource="res.scheme"
          :tr-class="
            ({ rowData }) =>
              rowData.adviseType === 'STOP' ? 'select_row' : null
          "
        />
      </div>
    </ProCard> -->
  </div>
</template>

<script lang="ts">
import Base from "@/views/Base";
import { iwant, Nullable } from "@guanyu/shared";
import { Component, Ref } from "vue-property-decorator";
import { queryRentTerm, RentTerm } from "@/service";
import DetailCard from "./components/DetailCard.vue";
import ProNotification from "@/components/ProNotification.vue";
import ProCard from "@/components/ProCard.vue";
import echarts from "@/plugins/echarts";
import { EChartsOption } from "echarts/types/dist/shared";
import ProTable, { ColumnsItem } from "@/components/ProTable.vue";
import { toRpx } from "@/utils/tools";

@Component({
  components: {
    DetailCard,
    ProNotification,
    ProCard,
    ProTable,
  },
})
export default class RentTermPage extends Base {
  @Ref() readonly pieChart!: HTMLDivElement;
  @Ref() readonly complexChart!: HTMLDivElement;

  cardTitleStyle = { fontWeight: 500, color: "#232832" };

  //返回数据
  res: Nullable<RentTerm> = null;

  columnsScheme: ColumnsItem[] = [
    { title: "到期月份", dataIndex: "dataDate" },
    { title: "签约租期", dataIndex: "rentTerm" },
    { title: "建议到期\n间数", dataIndex: "adviseNum" },
    { title: "实际到期\n间数", dataIndex: "realNum" },
    { title: "建议", dataIndex: "adviseNote" },
  ];

  get rentData() {
    if (!this.res) return {};
    // if (this.res?.warnLight === "RED") return {};
    else {
      return {
        title: "平均租期",
        storeMonth: this.res.rentTermNum,
        currentMonthData: this.res.expireRatioThisMonth,
        nextMonthData: this.res.expireRatioNextMonth,
        monthLocal: this.res.areaRentTermNum,
        monthCountry: this.res.groupRentTermNum,
        areaName: this.res.areaName,
      };
    }
  }

  mounted() {
    this.queryData();
  }

  async queryData() {
    const projectId = iwant.string(this.$route.query.projectId);
    if (!projectId) {
      return;
    }
    const response = await queryRentTerm({ projectId });
    if (response?.status === "ok") {
      // console.log("response", response);
      this.res = response.data;
      this.$nextTick(() => {
        this.renderPieCharts();
        this.renderComplexCharts();
      });
    }
  }

  renderPieCharts() {
    this.myPieCharts = this.myPieCharts || echarts.init(this.pieChart);

    const rentTermNum: number[] = [];
    const rentTermRatio: number[] = [];
    const rentTermLabel: string[] = [];
    const dataValue: any[] = [];
    this.res?.trend.forEach((el) => {
      rentTermNum.push(el.num);
      rentTermRatio.push(el.ratio);
      rentTermLabel.push(el.termName);
      dataValue.push({ value: el.num, name: el.termName });
    });

    const option: EChartsOption = {
      title: {
        text: `{a|在租间数：}{b|${this.res?.rentNum}间}`,
        textStyle: {
          rich: {
            a: {
              fontSize: toRpx(12),
              color: "#64696e",
              fontWeight: "normal",
            },
            b: {
              fontSize: toRpx(12),
              color: "rgb(35, 40, 50)",
              fontWeight: "bold",
            },
          },
        },
        bottom: toRpx(0),
        left: "12%",
      },
      legend: {
        type: "scroll",
        orient: "vertical",
        left: "45%",
        top: "12%",
        itemWidth: toRpx(10),
        itemHeight: toRpx(10),
        itemGap: toRpx(12),
        formatter: function (value) {
          const index = rentTermLabel.indexOf(value);
          return `{a|${value}}{b|${rentTermRatio[index]}%}{c|${rentTermNum[index]}}`;
        },
        textStyle: {
          rich: {
            a: {
              color: "#A5AAAF",
              fontSize: toRpx(12),
              width: toRpx(80),
            },
            b: {
              color: "#232832",
              fontSize: toRpx(12),
              width: toRpx(55),
              align: "right",
            },
            c: {
              color: "#232832",
              fontSize: toRpx(12),
              width: toRpx(35),
              align: "right",
            },
          },
        },
      },
      series: [
        {
          type: "pie",
          avoidLabelOverlap: false,
          radius: ["44%", toRpx(44)],
          center: ["25%", "42%"],
          color: ["#5CA2FF", "#FF8590", "#74DCB7", "#FFD66B"],
          itemStyle: {
            borderColor: "#fff",
            borderWidth: toRpx(1),
          },
          label: {
            show: false,
          },
          data: dataValue,
        },
      ],
    };
    this.myPieCharts.setOption(option);
  }

  renderComplexCharts() {
    this.myComplexCharts =
      this.myComplexCharts || echarts.init(this.complexChart);

    const xLabel: string[] = [];
    // const advise: number[] = [];
    const fact: number[] = [];
    // const pressure: number[] = [];
    const factNum: number[] = [];
    this.res?.expireTrend.forEach((el) => {
      // let label: any = el.dataDate.match(/\d+/g)?.join("/");
      // xLabel.push(label);
      xLabel.push(el.dataDate);
      // advise.push(el.adviseRatio);
      fact.push(el.factRatio);
      // pressure.push(el.pressureRatio);
      factNum.push(el.factNum);
    });

    const option: EChartsOption = {
      tooltip: {
        trigger: "axis",
        renderMode: "html",
        formatter: (params: any) => {
          const styleInner = `display:inline-block;text-align:left;`;
          // const styleNotice = `font-size: ${toRpx(
          //   10,
          //   true
          // )};line-height: ${toRpx(12, true)}; margin-bottom: ${toRpx(
          //   4
          // )}px;color:rgba(255, 122, 0, 1);`;
          const styleNormal = `font-size: ${toRpx(
            10,
            true
          )};line-height: ${toRpx(12, true)}; margin-bottom: ${toRpx(
            4
          )}px;color:rgba(35, 40, 50, 1);`;
          const str = `<span style='${styleNormal} color: #64696E;'>${params[0].axisValueLabel}</span>`;
          const arr = (params as any[]).map((item) => {
            if (item.seriesName === "到期占比")
              return `<div style='${styleNormal}'><span style="${styleInner}">${
                item.seriesName
              }</span>：${iwant.calc(item.data, 2, true)}%</div>`;
            if (item.seriesName === "到期间数")
              return `<div style='${styleNormal}'><span style="${styleInner}">${
                item.seriesName
              }</span>：${iwant.calc(item.data, 2, true)}间</div>`;
            // return `<div style='${styleNormal}'><span style="${styleInner}">${
            //   item.seriesName
            // }</span>：${iwant.calc(item.data, 2, true)}%</div>`;
          });
          return str + arr.join("");
        },
        axisPointer: {
          lineStyle: {
            color: "#BABABA",
            width: toRpx(1),
            type: "solid",
          },
        },
      },
      grid: {
        top: "5%",
        bottom: "11%",
        left: "5%",
        right: "6%",
        borderWidth: toRpx(1),
        borderColor: "#F7F7F7",
        containLabel: true,
      },
      // legend: [
      //   {
      //     bottom: 0,
      //     itemWidth: 10,
      //     itemHeight: 10,
      //     itemGap: 18,
      //     data: [
      //       {
      //         name: "到期占比",
      //       },
      //       {
      //         name: "到期间数",
      //       },
      //       // {
      //       //   name: "建议签署线",
      //       //   itemStyle: {
      //       //     opacity: 0,
      //       //   },
      //       // },
      //       // {
      //       //   name: "到期压力线",
      //       //   itemStyle: {
      //       //     opacity: 0,
      //       //   },
      //       // },
      //     ],
      //     textStyle: {
      //       color: "#A5AAAF",
      //       lineHeight: 14,
      //       fontSize: 10,
      //     },
      //   },
      // ],
      xAxis: {
        type: "category",
        axisLine: {
          show: true,
          lineStyle: {
            color: "#F7F7F7",
            type: "solid",
            width: toRpx(2),
          },
        },
        axisLabel: {
          color: "#64696E",
          fontSize: toRpx(10),
          interval: toRpx(0),
          rotate: toRpx(60),
        },
        data: xLabel,
      },
      yAxis: {
        type: "value",
        scale: true,
        min: toRpx(0),
        boundaryGap: [0.2, 0.2],
        axisLabel: {
          color: "#A5AAAF",
          fontSize: toRpx(10),
          // formatter: "{value}%",
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#F7F7F7",
            type: "solid",
            width: toRpx(1),
          },
        },
      },
      series: [
        {
          name: "到期间数",
          type: "bar",
          barWidth: toRpx(12),
          label: {
            show: true,
            position: "top",
            fontSize: toRpx(10),
            color: "#64696E",
          },
          itemStyle: {
            color: "rgba(92, 162, 255, 1)",
            borderRadius: toRpx(1),
          },
          data: factNum,
        },
        {
          name: "到期占比",
          type: "line",
          symbolSize: 0, // symbol的大小设置为0
          showSymbol: false, // 不显示symbol
          lineStyle: {
            width: 0, // 线宽是0
            color: "rgba(0, 0, 0, 0)", // 线的颜色是透明的
          },
          // barWidth: 12,
          // itemStyle: {
          //   color: "rgba(92, 162, 255, 1)",
          //   borderRadius: toRpx(1),
          // },
          data: fact,
        },
        // {
        //   name: "建议签署线",
        //   type: "line",
        //   symbol: "none",
        //   lineStyle: {
        //     color: "#32CD96",
        //     width: 2,
        //     type: "solid",
        //   },
        //   areaStyle: {
        //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //       {
        //         offset: 0,
        //         color: "rgba(50, 205, 150, 0.19)",
        //       },
        //       {
        //         offset: 1,
        //         color: "rgba(50, 205, 150, 0)",
        //       },
        //     ]),
        //   },
        //   data: advise,
        // },
        // {
        //   name: "到期压力线",
        //   type: "line",
        //   symbol: "none",
        //   lineStyle: {
        //     color: "#FF5F6E",
        //     width: 2,
        //     type: "solid",
        //   },
        //   data: pressure,
        // },
      ],
    };
    this.myComplexCharts.setOption(option);
  }
}
</script>
<style lang="scss" scoped>
.pie_chart_part {
  .pie_chart_wrap {
    position: relative;
  }
  .chart {
    height: 120px;
  }
}

.complex_chart_part {
  .chart_title_explan {
    margin: -1.5px 18px 8px 18px;

    #title_explan {
      margin-left: 5px;
      font-size: 12px;
      line-height: 17px;
      color: #64696e;
    }
  }
  .complex_chart {
    height: 235px;
    width: 100%;
  }
}

::v-deep {
  .van-tag {
    font-size: 10px;
    font-weight: 200;
    line-height: 14px;
    padding: 0 2px;
  }

  tr {
    color: rgba(35, 40, 50, 1);

    td:last-child {
      font-weight: 500;
    }
  }
  tr.select_row {
    background: rgba(255, 195, 39, 0.2);

    td:last-child {
      color: rgba(255, 122, 0, 1);
      font-weight: 500;
    }
  }
}
</style>
