<template>
  <div class="page__b1b__map">
    <div class="header">
      <div class="left_title">{{ title }}</div>
      <div class="tabs_box">
        <span class="tab_btn" v-for="(el, index) in tabNames" :key="index">
          {{ el }}
        </span>
      </div>
    </div>
    <div class="charts" ref="wrapper"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import { Base } from "@/views/Base";
import mitter, { EventName } from "@/utils/mitter";

@Component({
  components: {},
})
export default class B1B extends Base {
  /**
   * 折线图标题
   */
  @Prop({ default: () => "" }) readonly title!: string;
  /**
   * 折线图标签列表
   */
  @Prop({ default: () => [] }) readonly tabNames!: string[];
  @Ref() wrapper!: HTMLDivElement;

  mounted() {
    const myChart = echarts.init(this.wrapper);
    let option = {};
    option && myChart.setOption(option);
    mitter.on(EventName.ResizeEcharts, () => {
      myChart.resize();
    });
  }
}
</script>

<style lang="scss" scoped>
.page__b1b__map {
  width: 100%;
  height: 600px;
}

.header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-end;

  .left_title {
    font-size: 40px;
    line-height: 40px;
    color: #ffffff;
  }
  .tabs_box {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    color: #90a4c3;
    background: rgba(56, 196, 255, 0.2);
    border-radius: 10px;

    .tab_btn {
      text-align: center;
      font-size: 30px;
      line-height: 80px;
      min-width: 160px;
      padding: 0 10px;
      height: 80px;
    }
  }
}

.charts {
  width: 100%;
  height: 512px;
  background-color: #fff;
  margin-bottom: 35px;
}
</style>
