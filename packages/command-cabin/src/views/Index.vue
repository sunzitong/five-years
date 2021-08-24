<template>
  <div class="page__index">
    <div class="header"></div>
    <div class="main">
      <div class="main-left">
        <Subtitle title="拓展盘面">
          <template #extra>
            <a href="javascript:;">详情 →</a>
          </template>
        </Subtitle>
        <van-row gutter="24" style="margin: 0 48px">
          <van-col style="width: 738px; height: 814px"><Card></Card></van-col>
          <van-col style="width: 652px; height: 814px"><Card></Card></van-col>
          <van-col style="width: 810px; height: 814px"><Card></Card></van-col>
        </van-row>
        <Subtitle title="营造盘面">
          <template #extra>
            <a href="javascript:;">详情 →</a>
          </template>
        </Subtitle>
        <van-row gutter="24">
          <van-col style="width: 727px; height: 814px"><Card :showFooter="true"></Card></van-col>
          <van-col style="width: 640px; height: 814px"><Card></Card></van-col>
          <van-col style="width: 804px; height: 814px"><Card></Card></van-col>
        </van-row>
      </div>
      <div class="main-center">main-center</div>
      <div class="main-right">main-right</div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Base from "./Base";
import Subtitle from "@/components/Subtitle/index.vue";
import Card from "@/components/Card/index.vue";

@Component({
  components: {
    Subtitle,
    Card,
  },
})
export default class Index extends Base {}
</script>

<style lang="scss" scoped>
.page__index {
  width: 7680px;
  color: #fff;
  .header {
    height: 100px;
  }
  .main {
    display: flex;
    margin: 0 60px;
  }
  .main-left {
    max-width: 2300px;
    min-width: 2300px;
  }
  .main-center {
    flex: 1;
  }
  .main-right {
    max-width: 2300px;
    min-width: 2300px;
  }

  .main-left-row {
    padding: 20px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
