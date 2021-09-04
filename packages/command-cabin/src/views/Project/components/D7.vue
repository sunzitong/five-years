<template>
  <div class="box">
    <div class="header">
      <div class="red">
        红
        <span class="value__letter">12</span>
      </div>
      <div class="orange">
        橙
        <span class="value__letter">23</span>
      </div>
    </div>
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import { sepNumber } from "@/utils/tools";
import { arrayToObject } from "@guanyu/shared";

console.log(echarts);

@Component({
  components: {},
})
export default class D7 extends Vue {
  sepNumber = sepNumber;

  @Ref() chart!: HTMLDivElement;

  pieData = [
    {
      name: "01",
      value: "43",
    },
    {
      name: "02",
      value: "53",
    },
    {
      name: "03",
      value: "43",
    },
    {
      name: "04",
      value: "43",
    },
    {
      name: "05",
      value: "43",
    },
    {
      name: "06",
      value: "43",
    },
  ];

  objData = arrayToObject(this.pieData, { key: "name", value: "value" });

  mounted() {
    const myChart = echarts.init(this.chart);
    let option = {
      legend: {
        orient: "vertical",
        right: "10%",
        top: "center",
        icon: "rec",
        itemWidth: 20,
        itemHeight: 20,
        itemGap: 16,
        data: this.pieData,
        formatter: (params: any) => {
          return `{a|${params}}{b|  ${this.objData[params]}%}`;
        },
        textStyle: {
          rich: {
            a: {
              color: "#BFC0C1",
              fontFamily: "DIN Alternate",
              fontSize: 26,
              width: 84,
            },
            b: {
              color: "#01F5F1",
              fontFamily: "DIN Alternate",
              fontSize: 34,
              align: "right",
              width: 120,
              marginLeft: 84,
            },
          },
        },
      },
      series: [
        {
          type: "pie",
          avoidLabelOverlap: false,
          radius: ["50%", 130],
          center: ["25%", "50%"],
          color: [
            "#FF2A76",
            "#F4BD44",
            "#E49981",
            "#4988FD",
            "#67E1FB",
            "#55E49E",
          ],
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
$light: #01f5f1;
.header {
  display: flex;
  margin: 10px 0 50px;
  .red,
  .orange {
    font-size: 30px;
    span {
      font-size: 40;
      color: $light;
    }
  }
  .red {
    margin: 0 42px 0 auto;
  }

  .orange {
    margin: 0 auto 0 42px;
  }
}
.chart {
  width: 100%;
  height: 300px;
}
</style>
