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
              <Card title="商机转化" style="width: 727px; height: 814px"></Card>
            </van-col>
            <van-col>
              <Card title="项目获取" style="width: 640px; height: 814px"></Card>
            </van-col>
            <van-col>
              <Card title="战略合作" style="width: 804px; height: 382px"></Card>
              <WhiteSpace />
              <van-row gutter="24">
                <van-col>
                  <Card
                    title="中央奖补"
                    size="small"
                    style="width: 390px; height: 400px"
                  ></Card>
                </van-col>
                <van-col>
                  <Card
                    title="投后攻坚"
                    size="small"
                    style="width: 390px; height: 400px"
                  ></Card>
                </van-col>
              </van-row>
            </van-col>
          </van-row>
        </SubWrapper>
        <WhiteSpace />
        <SubWrapper title="营造盘面">
          <template #extra>
            <a href="javascript:;">详情 →</a>
          </template>
          <van-row gutter="24">
            <van-col>
              <Card
                title="项目开业"
                style="width: 1580px; height: 660px"
              ></Card>
              <WhiteSpace />
              <Card
                title="开业延期"
                style="width: 1580px; height: 670px"
              ></Card>
            </van-col>
            <van-col>
              <Card title="成本分析" style="width: 616px; height: 540px"></Card>
              <WhiteSpace />
              <Card title="产品品质" style="width: 616px; height: 370px">
                <ProductQuality />
              </Card>
              <WhiteSpace />
              <Card title="维保报事" style="width: 616px; height: 390px"></Card>
            </van-col>
          </van-row>
        </SubWrapper>
      </div>
      <div class="main-center">main-center</div>
      <div class="main-right">
        <SubWrapper title="经营现状">
          <template #extra>
            <a href="javascript:;">详情 →</a>
          </template>
          <van-row gutter="24">
            <van-col>
              <Card
                title="全业态收入及完成度"
                style="width: 1565px; height: 480px"
              ></Card>
            </van-col>
            <van-col>
              <Card
                title="平均续租率"
                style="width: 631px; height: 480px"
              ></Card>
            </van-col>
          </van-row>
          <WhiteSpace />
          <van-row gutter="24">
            <van-col>
              <van-row gutter="24">
                <van-col>
                  <Card
                    title="经营性支出"
                    style="width: 876px; height: 587px"
                  ></Card>
                </van-col>
                <van-col>
                  <Card
                    title="成本使用进度"
                    style="width: 562px; height: 587px"
                  ></Card>
                </van-col>
              </van-row>
              <WhiteSpace />
              <van-row gutter="24">
                <van-col>
                  <Card
                    title="客户洞察"
                    style="width: 876px; height: 363px"
                  ></Card>
                </van-col>
                <van-col>
                  <Card
                    title="设备离线率"
                    style="width: 562px; height: 363px"
                  ></Card>
                </van-col>
              </van-row>
            </van-col>
            <van-col>
              <Card title="舆情风险" style="width: 734px; height: 978px"></Card>
            </van-col>
          </van-row>
        </SubWrapper>
        <WhiteSpace />
        <SubWrapper title="舆情风险">
          <template #extra>
            <a href="javascript:;">详情 →</a>
          </template>
          <van-row gutter="24">
            <van-col>
              <Card title="收入预警" style="width: 706px; height: 688px"></Card>
            </van-col>
            <van-col>
              <Card title="事件预警" style="width: 904px; height: 688px"></Card>
            </van-col>
            <van-col>
              <Card title="监控预警" style="width: 561px; height: 688px"></Card>
            </van-col>
          </van-row>
        </SubWrapper>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Base from "./Base";
import SubWrapper from "@/components/SubWrapper/index.vue";
import Card from "@/components/Card/index.vue";
import WhiteSpace from "@/components/WhiteSpace/index.vue";
/** Jing */
import ProductQuality from "@/views/Jing/0-10.vue";

@Component({
  components: {
    SubWrapper,
    Card,
    WhiteSpace,
    ProductQuality,
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
