<template>
  <div class="page__attack_after_throwing__map">
    <div class="text_pannel">
      <!-- 仪表盘组件 -->
      <div
        class="app-echarts"
        ref="wrapper"
        style="width: 183px; height: 183px"
      ></div>
      <div class="top_text">净全年利润攻坚贡献值</div>
      <van-row class="text_row">
        <van-col :span="12" class="left_text">当年</van-col>
        <van-col :span="12" class="right_text">
          {{ sepNumber(currentYear) }}万
        </van-col>
      </van-row>
      <van-row class="text_row">
        <van-col :span="12" class="left_text">全周期</van-col>
        <van-col :span="12" class="right_text">
          {{ sepNumber(wholeCycle) }}万
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import { sepNumber } from "@/utils/tools";

console.log(echarts);

@Component({
  components: {},
})
export default class A6 extends Vue {
  @Ref() wrapper!: HTMLDivElement;

  sepNumber = sepNumber;

  currentYear = 8200;
  wholeCycle = 3553;

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

  margin-bottom: 26px;
}

.text_pannel {
  text-align: center;
}

.text_row {
  margin: 0 30px 0 30px;
  .left_text {
    font-size: 28px;
    line-height: 28px;
    text-align: left;

    margin-bottom: 19px;
  }
  .right_text {
    font-size: 26px;
    line-height: 24px;
    color: #01f5f1;
    text-align: right;

    span {
      font-family: "DIN Alternate";
      font-weight: bold;
      font-size: 40px;
      line-height: 40px;
    }
  }
}

.bottom_text {
  font-size: 26px;
  line-height: 26px;
  color: #01f5f1;

  margin-top: 10px;

  span {
    font-family: "DIN Alternate";
    font-size: 40px;
    line-height: 36px;
  }
}
</style>
