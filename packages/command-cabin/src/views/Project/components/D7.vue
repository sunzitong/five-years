<template>
  <div class="box">
    <div class="header">
      <div class="red">
        红
        <span class="value__letter">{{ response.redNum }}</span>
      </div>
      <div class="orange">
        橙
        <span class="value__letter">{{ response.yellowNum }}</span>
      </div>
    </div>
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Watch } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import { arrayToObject, iwant } from "@guanyu/shared";
import {
  fetchSentiment,
  NumsByType,
  SentimentReturn,
} from "@/service/analysis/bigScreen/projectBoard/managementSituation/sentiment";
import Base from "@/views/Base";
import { StoreKey, useStore } from "@/store";

@Component({
  components: {},
})
export default class D7 extends Base {
  @Ref() chart!: HTMLDivElement;

  /**
   * 返回值
   */
  response: SentimentReturn = {
    redNum: 0,
    yellowNum: 0,
    numsByType: [],
  };

  async created() {
    const response = await useStore(fetchSentiment, {
      key: StoreKey.ProjectSentiment,
      params: {
        projectId: this.store.global.project.projectId,
        dateScope: this.store.global.dateScope,
      },
    });

    if (response?.status === "ok") {
      this.response = response.data ?? {};
    }
  }

  /**
   * 取出数据的百分比值
   */
  get numsByTypeMaps() {
    return arrayToObject(this.response.numsByType, {
      key: "typeNum",
      value: "ratio",
    });
  }

  /**
   * 更新数据并重绘Echarts
   */
  @Watch("response.numsByType", { immediate: true })
  onNumsByTypeChange(list: NumsByType) {
    if (!this.echarts) return;
    const val = iwant.array(list).map((item) => {
      return { name: item.typeNum, value: item.num };
    });
    this.echarts.setOption({ series: [{ data: val }] });
  }

  mounted() {
    this.echarts = echarts.init(this.chart);
    const option = {
      legend: {
        orient: "vertical",
        right: "10%",
        top: "center",
        icon: "rec",
        itemWidth: 20,
        itemHeight: 20,
        itemGap: 16,
        formatter: (params: any) => {
          return `{a|${params}}{b|  ${this.numsByTypeMaps[params]}%}`;
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
          data: this.pipData,
        },
      ],
    };
    this.echarts.setOption(option);
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
