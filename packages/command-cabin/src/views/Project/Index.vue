<template>
  <div class="page__project">
    <div class="header">龙湖冠寓重庆佳华北宸里店</div>
    <div class="main">
      <div class="main-left">
        <SubWrapper title="财务相关指标及预估">
          <template #extra>
            数据取自主数据、龙头、智计划、成本管理系统｜更新时间08-23 17:00
          </template>
          <van-row gutter="24">
            <van-col>
              <!-- 资产类型 -->
              <Card style="width: 1098px; height: 560px">
                <A1 />
              </Card>
              <WhiteSpace />
              <Card :showFooter="true" style="width: 1098px; height: 560px">
                <template #footer>
                  <a>查看详情→</a>
                </template>
                <A2 />
              </Card>
            </van-col>
            <van-col>
              <Card style="width: 1218px; height: 1145px"></Card>
            </van-col>
          </van-row>
          <WhiteSpace />
          <van-row gutter="24">
            <van-col>
              <Card
                title="经营团队"
                size="small"
                style="width: 764px; height: 408px"
              >
                <A3 />
              </Card>
            </van-col>
            <van-col>
              <Card
                title="设计团队"
                size="small"
                style="width: 764px; height: 408px"
              >
                <A4 />
              </Card>
            </van-col>
            <van-col>
              <Card
                title="施工团队"
                size="small"
                style="width: 764px; height: 408px"
              >
                <A5 />
              </Card>
            </van-col>
          </van-row>
          <WhiteSpace />
          <van-row>
            <van-col>
              <Card
                title="项目区位"
                style="width: 2340px; height: 1115px"
              ></Card>
            </van-col>
          </van-row>
        </SubWrapper>
      </div>
      <div class="main-center">
        <SubWrapper title="财务指标达成及预估">
          <template #extra>
            <a href="javascript:;">详情 →</a>
          </template>
          <van-row gutter="24">
            <van-col>
              <WhiteSpace />
              <Card style="width: 1506px; height: 2398px"></Card>
            </van-col>
            <van-col>
              <Card title="综合经营指数" style="width: 1050px; height: 597px">
                <C5 />
              </Card>
              <WhiteSpace />
              <Card
                title="当前投资实现情况"
                style="width: 1050px; height: 582px"
              ></Card>
              <WhiteSpace />
              <Card
                title="奖补到账"
                style="width: 1050px; height: 260px"
              ></Card>
            </van-col>
          </van-row>
        </SubWrapper>
      </div>
      <div class="main-right">
        <SubWrapper title="经营现状">
          <template #extra>
            <a href="javascript:;">详情 →</a>
          </template>
          <van-row gutter="24">
            <van-col>
              <Card
                title="全业态收入及完成度"
                style="width: 1593px; height: 578px"
              ></Card>
            </van-col>
            <van-col>
              <WhiteSpace />
              <Card style="width: 723px; height: 555px"></Card>
            </van-col>
          </van-row>
          <WhiteSpace />
          <van-row gutter="24">
            <van-col>
              <Card
                title="经营性支出"
                style="width: 904px; height: 556px"
              ></Card>
            </van-col>
            <van-col>
              <Card title="逾期金额" style="width: 665px; height: 556px"></Card>
            </van-col>
            <van-col>
              <Card title="舆情风险" style="width: 723px; height: 556px">
                <D7 />
              </Card>
            </van-col>
          </van-row>
          <WhiteSpace />
          <van-row gutter="24">
            <van-col>
              <Card title="客户洞察" style="width: 904px; height: 392px"></Card>
            </van-col>
            <van-col>
              <Card
                title="24小时设备离线率"
                style="width: 665px; height: 392px"
              >
                <D5 />
              </Card>
            </van-col>
            <van-col>
              <Card
                title="能源费用(收支差)"
                style="width: 723px; height: 312px"
              >
                <D8 />
              </Card>
            </van-col>
          </van-row>
          <WhiteSpace />
          <van-row gutter="24">
            <van-col>
              <Card
                title="风险预警"
                style="width: 2340px; height: 1114px"
              ></Card>
            </van-col>
          </van-row>
        </SubWrapper>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Base from "@/views/Base";
import SubWrapper from "@/components/SubWrapper/Index.vue";
import Card from "@/components/Card/Index.vue";
import WhiteSpace from "@/components/WhiteSpace/Index.vue";
import A1 from "./components/A1.vue";
import A2 from "./components/A2.vue";
import A3 from "./components/A3.vue";
import A4 from "./components/A4.vue";
import A5 from "./components/A5.vue";
import C5 from "./components/C5.vue";
import D5 from "./components/D5.vue";
import D7 from "./components/D7.vue";
import D8 from "./components/D8.vue";

@Component({
  components: {
    SubWrapper,
    Card,
    WhiteSpace,
    A1,
    A2,
    A3,
    A4,
    A5,
    C5,
    D5,
    D7,
    D8,
  },
})
export default class Index extends Base {}
</script>

<style lang="scss" scoped>
.page__project {
  width: 7680px;
  color: #fff;
  .header {
    height: 120px;
    line-height: 120px;
    font-size: 60px;
    text-align: center;
    margin-bottom: 45px;
  }
  .main {
    display: flex;
    margin: 0 60px;
  }
  .main-right,
  .main-left {
    max-width: 2420px;
    min-width: 2420px;
  }
  .main-center {
    flex: 1;
    margin: 0 40px;
  }

  .main-left-row {
    padding: 20px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
