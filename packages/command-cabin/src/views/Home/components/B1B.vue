<template>
  <div class="pannel_right">
    <div class="top">
      <div class="pannel_text">
        年开业目标间数：
        <span>{{ targetNum }}</span>
      </div>
      <div class="pannel_sub_text">
        <div class="left">
          已开业间数：
          <span>{{ hasOpen }}</span>
          <span>{{ hasOpenRatio }}%</span>
        </div>
        <div class="right">
          待开业间数：
          <div class="right_bottom">
            <div class="text_before">
              <div class="box_line_one"></div>
              <div class="box_line_two"></div>
            </div>
            <div class="text_container">
              <div>
                待获取：
                <span>{{ toGet }}</span>
                <span>{{ toGetRatio }}%</span>
              </div>
              <div>
                已获取：
                <span>{{ hasGet }}</span>
                <span>{{ hasGetRatio }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pie_charts">
      <div
        class="left_echarts"
        ref="leftCharts"
        style="width: 300px; height: 380px"
      ></div>
      <div
        class="right_echarts"
        ref="rightCharts"
        style="width: 300px; height: 380px"
      ></div>
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
export default class B1B extends Vue {
  @Ref() wrapper!: HTMLDivElement;

  targetNum = 15432;

  hasOpen = 8961;
  hasOpenRatio = 43;

  toGet = 8961;
  toGetRatio = 43;

  hasGet = 8961;
  hasGetRatio = 43;
}
</script>

<style lang="scss" scoped>
.pannel_right {
  margin-left: 41px;

  .pannel_text {
    font-family: "PingFang SC";
    font-size: 30px;
    line-height: 30px;
    color: #ffffff;

    margin-top: 30px;
    margin-bottom: 36px;

    span {
      font-family: "DIN Alternate";
      font-weight: bold;
      font-size: 40px;
      line-height: 36px;
      text-align: right;
      color: #01f5f1;
    }
  }

  .pannel_sub_text {
    font-family: "PingFang SC";
    font-size: 28px;
    line-height: 30px;
    color: #ffffff;

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;

    span {
      font-family: "DIN Alternate";
      font-weight: bold;
      font-size: 34px;
      line-height: 36px;
      color: #01f5f1;
    }
  }
}
</style>
