<template>
  <div class="app-header"><h1>冠寓总指挥中心</h1></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class FixedNav extends Vue {}
</script>

<style lang="scss" scoped>
.app-header {
  width: 7680px;
  height: 220px;
  text-align: center;
  color: #fff;
  @extend %bg-img-header;
  h1 {
    font-size: 100px;
    line-height: 100px;
    padding-top: 45px;
  }
}
</style>
