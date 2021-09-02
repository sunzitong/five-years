<template>
  <div class="page__maintenance_report__map">
    <div class="whole_pannel">
      <div
        class="app-echarts"
        ref="wrapper"
        style="width: 360px; height: 280px"
      ></div>
      <div class="pannel_values">
        <div class="values_left">
          <div v-for="(value, index) in values" :key="index">
            {{ value }}
          </div>
        </div>
        <div class="values_right">
          <div v-for="(ratio, index) in ratios" :key="index">{{ ratio }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import echarts from "@/plugins/echarts";

console.log(echarts);

@Component({
  components: {},
})
export default class B5 extends Vue {
  @Ref() wrapper!: HTMLDivElement;

  names = ["电器类", "硬装类", "水暖类", "渗漏类", "设备类", "其他"];

  values = [88, 12, 97, 97, 100, 100];

  ratios = [88, 12, 97, 7, 20, 20];

  data = [
    {
      name: "电器类",
      value: 88,
    },
    {
      name: "硬装类",
      value: 88,
    },
    {
      name: "水暖类",
      value: 88,
    },
    {
      name: "渗漏类",
      value: 88,
    },
    {
      name: "设备类",
      value: 88,
    },
    {
      name: "其他",
      value: 88,
    },
  ];

  mounted() {
    const myChart = echarts.init(this.wrapper);
    // myChart.showLoading();
    let option = {
      legend: {
        orient: "vertical",
        left: "60%",
        top: "0%",
        icon: "rec",
        itemWidth: 20,
        itemHeight: 20,
        itemGap: 18,
        // data: this.data,
        // formatter: function (value: any) {
        //   const index = this.names.indexOf(value);
        //   return `{a|${this.names[index]}}{b|${this.values[index]}%`;
        // },
        textStyle: {
          color: "#FFFFFF",
          fontSize: 28,
          rich: {
            a: {
              color: "#FFFFFF",
              fontSize: 28,
              width: 84,
            },
            b: {
              color: "#01F5F1",
              fontSize: 34,
              width: 33,
              align: "right",
            },
          },
        },
      },
      series: [
        {
          type: "pie",
          avoidLabelOverlap: false,
          radius: ["40%", 91.5],
          center: ["25%", "45%"],
          color: [
            "#FE513A",
            "#FFEF69",
            "#57A6FB",
            "#A957FB",
            "#55D5F3",
            "#56EDA3",
          ],
          label: {
            show: false,
          },
          data: this.data,
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

<style lang="less" scoped>
.whole_pannel {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;

  .pannel_values {
    position: relative;
    top: -5px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    color: #01f5f1;
    font-family: "DIN Alternate";
    font-weight: bold;
    font-size: 34px;

    .values_left,
    .values_right {
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-evenly;
    }

    .values_right {
      margin-left: 39px;
    }
  }
}
</style>
