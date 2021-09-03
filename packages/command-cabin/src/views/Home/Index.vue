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
              <Card title="项目获取" style="width: 720px; height: 957px"></Card>
            </van-col>
            <van-col>
              <Card
                title="商机储备"
                size="small"
                style="width: 735px; height: 514px"
              ></Card>
              <WhiteSpace />
              <Card
                title="商机转化"
                size="small"
                style="width: 735px; height: 419px"
              ></Card>
            </van-col>
            <van-col>
              <Card title="战略合作" style="width: 817px; height: 494px"></Card>
              <WhiteSpace />
              <van-row gutter="24">
                <van-col>
                  <Card
                    title="中央奖补"
                    size="small"
                    style="width: 394px; height: 438px"
                  ></Card>
                </van-col>
                <van-col>
                  <Card
                    title="投后攻坚"
                    size="small"
                    style="width: 399px; height: 438px"
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
                style="width: 1605px; height: 634px"
              ></Card>
              <WhiteSpace />
              <Card
                title="开业延期"
                style="width: 1605px; height: 792px"
              ></Card>
            </van-col>
            <van-col>
              <Card title="成本分析" style="width: 691px; height: 634px"></Card>
              <WhiteSpace />
              <Card title="产品品质" style="width: 691px; height: 367px">
                <B4 />
              </Card>
              <WhiteSpace />
              <Card title="维保报事" style="width: 691px; height: 401px">
                <B5 />
              </Card>
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
                style="width: 1557px; height: 589px"
              ></Card>
            </van-col>
            <van-col>
              <WhiteSpace />
              <Card style="width: 739px; height: 563px"></Card>
            </van-col>
          </van-row>
          <WhiteSpace />
          <van-row gutter="24">
            <van-col>
              <Card
                title="经营性支出"
                style="width: 1566px; height: 666px"
              ></Card>
              <WhiteSpace />
              <van-row gutter="24">
                <van-col>
                  <Card
                    title="客户洞察"
                    style="width: 905px; height: 396px"
                  ></Card>
                </van-col>
                <van-col>
                  <Card
                    title="24小时设备离线率"
                    style="width: 628px; height: 396px"
                  ></Card>
                </van-col>
              </van-row>
            </van-col>
            <van-col>
              <Card
                title="舆情风险"
                style="width: 739px; height: 1086px"
              ></Card>
            </van-col>
          </van-row>
        </SubWrapper>
        <WhiteSpace />
        <SubWrapper title="经营现状">
          <template #extra>
            <a href="javascript:;">详情 →</a>
          </template>
          <van-row gutter="24">
            <van-col>
              <Card style="width: 905px; height: 702px"></Card>
            </van-col>
            <van-col>
              <Card style="width: 1400px; height: 702px"></Card>
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
import Base from "@/views/Base";
import SubWrapper from "@/components/SubWrapper/index.vue";
import Card from "@/components/Card/index.vue";
import WhiteSpace from "@/components/WhiteSpace/index.vue";

/** Jing */
import B4 from "./components/B4.vue";
import B5 from "./components/B5.vue";

@Component({
  components: {
    SubWrapper,
    Card,
    WhiteSpace,
    B4,
    B5,
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
    max-width: 2400px;
    min-width: 2400px;
  }
  .main-center {
    flex: 1;
  }
  .main-right {
    max-width: 2400px;
    min-width: 2400px;
  }

  .main-left-row {
    padding: 20px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
