

--模板--

```js
<template>
  <div class="page__maintenance_report__map">
    <div class="app-echarts" ref="wrapper"></div>
  </div>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import Base from "@/views/Base";

@Component({
  components: {},
})
export default class Example extends Base {
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
