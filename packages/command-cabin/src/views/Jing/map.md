0 首屏
0-5 中央奖补
0-6 透后攻坚
0-8 成本分析
0-9 产品品质
0-10 维保报事

--模板--

```js
<template>
  <div class="page__example__map">
    <div class="app-echarts" ref="wrapper"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import echarts from "@/plugins/echarts";
import { ECharts } from "echarts/core";
import { getMapJson } from "@/service";

console.log(echarts);

@Component({
  components: {},
})
export default class Example extends Vue {}
</script>

<style lang="less" scoped>
.page__example__map {
  .app-echarts {
    width: 1000px;
    height: 1000px;
  }
}
</style>
```
