<template>
  <div class="page__maintenance_report__map">
    <div
      class="app-echarts"
      ref="wrapper"
      style="width: 100%; height: 250px"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import Vector from "./Vector.png";

// console.log(echarts);

@Component({
  components: {},
})
export default class E4 extends Vue {
  @Ref() wrapper!: HTMLDivElement;
  data = [
    {
      name: "水",
      value: 10,
    },
    {
      name: "电",
      value: 25,
    },
    {
      name: "门禁",
      value: 50,
    },
  ];

  mounted() {
    const myChart = echarts.init(this.wrapper);
    let titleArr: any[] = [];
    let seriesArr: any[] = [];
    const colors = [["#59D1FE"], ["#8E3AFF"], ["#EEBC4A"]];
    this.data.forEach(function (item, index) {
      titleArr.push({
        text: item.name,
        top: "50%",
        textAlign: "center",
        left: index * 35 + 15 + "%",
        textStyle: {
          fontWeight: "normal",
          fontSize: "16",
          color: "#fff",
          textAlign: "center",
        },
      });
      seriesArr.push({
        name: item.name,
        type: "pie",
        startAngle: 30,
        radius: [60, 70],
        top: -20,
        center: [index * 35 + 15 + "%", "50%"],
        // radius: ["48%", "50%"],
        hoverAnimation: false,
        data: [
          {
            //画中间的图标
            name: "",
            value: 0,
            label: {
              position: "inside",
              backgroundColor: {
                image: Vector,
              },
              width: 45,
              height: 45,
              borderRadius: 50,
              padding: 0,
            },
          },
          {
            value: item.value,
            itemStyle: {
              normal: {
                color: colors[index],
              },
            },
            label: {
              show: true,
              position: "center",
              fontSize: "20",
              fontWeight: "bold",
              color: "#fff",
              formatter: function (params: any) {
                return params.value + "%";
              },
            },
          },
          {
            name: "",
            value: 100 - item.value,
            label: {
              show: false,
            },
            itemStyle: {
              normal: {
                color: "#14437F",
              },
            },
          },
        ],
      });
    });

    const option = {
      tooltip: {
        formatter: (params: any) => {
          const { value } = params;
          return "占比" + "：" + value + " %";
        },
      },
      title: titleArr,
      series: seriesArr,
    };
    option && myChart.setOption(option);
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  }
}
</script>

<style lang="less" scoped></style>
