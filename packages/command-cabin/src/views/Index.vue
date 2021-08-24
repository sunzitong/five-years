<template>
  <div class="page__index">
    <div class="header"></div>
    <div class="main">
      <div class="main-left">
        <SubWrapper title="拓展盘面">
          <template #extra>
            <a href="javascript:;">详情 →</a>
          </template>
          <van-row gutter="24">
            <van-col>
              <Card title="签约达成" style="width: 727px; height: 814px"></Card>
            </van-col>
            <van-col>
              <Card title="商机储备" style="width: 640px; height: 814px"></Card>
            </van-col>
            <van-col>
              <Card title="中央奖补" style="width: 804px; height: 814px"></Card>
            </van-col>
          </van-row>
        </SubWrapper>
        <SubWrapper title="营造盘面">
          <template #extra>
            <a href="javascript:;">详情 →</a>
          </template>
          <van-row gutter="24">
            <van-col>
              <Card
                title="项目开业"
                style="width: 1580px; height: 775px"
              ></Card>
            </van-col>
            <van-col>
              <Card title="产品品质" style="width: 616px; height: 775px"></Card>
            </van-col>
          </van-row>
          <van-row gutter="24">
            <van-col>
              <Card
                title="开业延期"
                style="width: 2220px; height: 710px"
              ></Card>
            </van-col>
          </van-row>
        </SubWrapper>
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
import SubWrapper from "@/components/SubWrapper/index.vue";
import Card from "@/components/Card/index.vue";

@Component({
  components: {
    SubWrapper,
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
