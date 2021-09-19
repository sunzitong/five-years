<template>
  <div class="page__e2b__map">
    <div
      class="app-echarts"
      ref="wrapper"
      style="width: 574px; height: 350px"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import { Base } from "@/views/Base";
import { AnyObject } from "@guanyu/shared";
import mitter, { EventName } from "@/utils/mitter";

@Component({
  components: {},
})
export default class E2B extends Base {
  /**
   * 接口返回值
   *
   */
  @Ref() wrapper!: HTMLDivElement;

  /**
   * 格式化数据
   */
  resData = [
    {
      name: "三费",
      value: 90,
    },
    {
      name: "营销费用",
      value: 76,
    },
    {
      name: "运营成本",
      value: 85,
    },
    {
      name: "管理成本",
      value: 45,
    },
    {
      name: "租金成本",
      value: 59.2,
    },
  ];

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

  names = ["三费", "营销费用", "运营成本", "管理成本", "租金成本"]; // name标签
  values = this.getArrayValue(this.resData, "value"); // value数组
  sum = this.values.reduce((pre, cur) => pre + cur, 0); // 所有成本之和
  color = ["#55D5F3", "#A957FB", "#57A6FB", "#FFEF69", "#FE513A"];

  /**
   * 遍历生成图形配置所需的配置项
   */
  buildConfiguration() {
    let res: AnyObject = {
      series: [],
      yAxis: [],
    };

    for (let i = 0; i < this.resData.length; i++) {
      res.series.push({
        // 展示数据
        type: "pie",
        clockwise: false, //顺时加载
        emphasis: { scale: false }, //鼠标移入变大
        radius: [165 - i * 33, 150 - i * 33],
        center: ["45%", "50%"],
        label: {
          show: false,
        },
        itemStyle: {
          borderRadius: 88,
          label: { show: false },
          labelLine: { show: false },
          borderWidth: 13,
        },
        data: [
          {
            name: this.resData[i].name,
            value: this.resData[i].value,
            itemStyle: {
              color: this.color[i],
            },
          },
          {
            // 阴影
            name: "",
            value: this.sum - this.resData[i].value,
            itemStyle: {
              borderRadius: 88,
              color: "rgba(0,0,0,0)",
              borderWidth: 0,
            },
            tooltip: { show: false },
            emphasis: { scale: false },
          },
        ],
      });
      res.series.push({
        // 背景阴影，根据z层级覆盖
        name: "",
        type: "pie",
        silent: true,
        clockwise: false, //顺时加载
        z: 1, // 控制叠加层级
        emphasis: { scale: false }, //鼠标移入变大
        radius: [165 - i * 33, 150 - i * 33], //数组的第一项是内半径，第二项是外半径
        borderRadius: 88,
        center: ["45%", "50%"],
        label: { show: false },
        itemStyle: {
          label: { show: false },
          labelLine: { show: false },
          borderWidth: 13,
        },
        data: [
          {
            value: 7.5, // 阴影75%
            itemStyle: {
              borderRadius: 88,
              color: "#14437F",
            },
            tooltip: { show: false },
          },
          {
            // 阴影最后25%透明
            name: "",
            value: 2.5,
            itemStyle: {
              borderRadius: 88,
              color: "rgba(0,0,0,0)",
              borderWidth: 0,
            },
            tooltip: { show: false },
          },
        ],
      });
      res.yAxis.push(this.resData[i].value);
    }

    return res;
  }

  /**
   * 加入坐标轴
   */
  mounted() {
    const res = this.buildConfiguration();

    const myChart = echarts.init(this.wrapper);
    // myChart.showLoading();
    let option = {
      legend: {
        show: true,
        icon: "none",
        left: "42%",
        top: "1%",
        width: 190,
        itemGap: 0,
        formatter: (name: any) => {
          let num = 0;
          this.resData.forEach((el) => {
            if (el.name === name) {
              num = el.value;
            }
          });
          return "{title|" + name + "} {value|" + num + "%}";
        },
        textStyle: {
          rich: {
            title: {
              fontFamily: "PingFang SC",
              fontSize: 24,
              lineHeight: 21,
              width: 96,
              marginRight: 50,
              color: "#FFFFFF",
            },
            value: {
              width: 80,
              fontFamily: "DIN Alternate",
              fontWeight: "bold",
              fontSize: 30,
              lineHeight: 25,
              align: "right",
              color: "#01F5F1",
            },
          },
        },
        itemStyle: {
          color: [
            "transparant",
            "transparant",
            "transparant",
            "transparant",
            "transparant",
          ],
        },

        data: this.names,
      },
      grid: {
        top: "13%",
        left: "48%",
        width: "40%",
        height: "20%",
        containlabel: false,
      },
      xAxis: { show: false },
      yAxis: [
        {
          type: "category",
          asisTick: { show: true },
          axisLabel: {
            show: true,
            intervel: 0,
            color: "#FFFFFF",
            fontSize: 24,
          },
          data: res.yAxis,
        },
      ],
      series: res.series,
    };
    option && myChart.setOption(option);
    mitter.on(EventName.ResizeEcharts, () => {
      myChart.resize();
    });
  }
}
</script>

<style lang="scss" scoped>
.app-echarts {
  margin: 24px 0 20px 0;
}
</style>
