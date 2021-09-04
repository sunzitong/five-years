<template>
  <div class="page__maintenance_report__map">
    <div class="chart">
      <div v-for="(item, index) in data" v-bind:key="index" class="chart-item">
        <div class="chart-icon">
          <Icon :type="iconArr[index]" size="22" />
        </div>
        <van-circle
          v-model="item.value"
          :rate="item.value"
          :speed="100"
          :color="colors[index]"
          layer-color="#14437F"
          :stroke-width="70"
          :size="160"
          stroke-linecap="butt"
          :clockwise="true"
        >
          <div class="rate-text">
            <div class="value">{{ item.value }}%</div>
            <div class="desc">{{ item.name }}</div>
          </div>
        </van-circle>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import Icon from "@/components/Icon/Index.vue";

// console.log(echarts);

@Component({
  components: {
    Icon,
  },
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
  colors = ["#59D1FE", "#8E3AFF", "#EEBC4A"];
  iconArr = ["water-drop", "lightning", "door"];
}
</script>

<style lang="scss" scoped>
.chart {
  display: flex;
  justify-content: space-around;
  padding-top: 50px;
  .chart-item {
    transform: rotate(45deg);
    position: relative;
    z-index: 1;
    .chart-icon {
      transform: rotate(-45deg);
      width: 45px;
      height: 45px;
      box-sizing: border-box;
      background: #14437f;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: -20px;
      right: 60px;
      z-index: 100;
    }
    .rate-text {
      transform: rotate(-45deg);
      @extend %flex-center;
      flex-flow: column nowrap;
      height: 100%;
      line-height: 1;
      .value {
        @extend %value__letter;
        font-weight: bold;
        font-size: 32px;
      }
      .desc {
        font-size: 24px;
        margin-top: 8px;
      }
    }
  }
}
</style>
