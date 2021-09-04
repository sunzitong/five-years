<template>
  <div class="page__central_award_supplement__map">
    <div class="text_pannel">
      <!-- 仪表盘组件 -->
      <div
        class="app-echarts"
        ref="wrapper"
        style="width: 183px; height: 200px"
      ></div>
      <div class="top_text">全年已到账</div>
      <div class="bottom_text">
        <span>{{ billNum }}</span>
        万
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
export default class A5 extends Vue {
  @Ref() wrapper!: HTMLDivElement;

  billNum = 332;

  mounted() {
    const myChart = echarts.init(this.wrapper);
    // myChart.showLoading();
    let option = {};
    option && myChart.setOption(option);
    window.addEventListener("resize", () => {
      myChart.resize();
    });
  }
}
</script>

<style lang="scss" scoped>
.top_text {
  font-family: "PingFang SC";
  font-size: 30px;
  line-height: 26px;
  color: #ffffff;

  margin-bottom: 10px;
}

.text_pannel {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  text-align: center;
}

.bottom_text {
  font-size: 26px;
  line-height: 26px;
  color: #01f5f1;

  span {
    font-family: "DIN Alternate";
    font-size: 40px;
    line-height: 36px;
  }
}
</style>
