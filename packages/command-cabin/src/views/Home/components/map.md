--模板--

```js
<template>
  <Spin :height="833" :loading="loading" :empty="empty">
    <div class="page__maintenance_report__map">
      <div class="app-echarts" ref="wrapper"></div>
    </div>
  </Spin>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import Base from "@/views/Base";
import mitter, { EventName } from "@/utils/mitter";

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
    mitter.on(EventName.ResizeEcharts, () => {
      myChart.resize();
    });
  }
}
</script>

<style lang="scss" scoped></style>

```
