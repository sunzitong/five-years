

--模板--

```js
<template>
  <div class="page__maintenance_report__map">
    <div class="app-echarts" ref="wrapper"></div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import { ECharts } from "echarts/core";

console.log(echarts);

@Component({
  components: {},
})
export default class Example extends Vue {
  @Ref() wrapper!: HTMLDivElement;

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

<style lang="scss" scoped></style>

```
