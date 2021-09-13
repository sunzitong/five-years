<template>
  <div class="page__index">
    <div class="main">
      <div class="main-left">
        <SubWrapper title="拓展盘面">
          <van-row gutter="24">
            <van-col>
              <Card title="项目获取" style="width: 720px; height: 957px">
                <A1 />
              </Card>
            </van-col>
            <van-col>
              <Card
                title="商机储备"
                size="small"
                style="width: 735px; height: 514px"
              >
                <A2 />
              </Card>
              <WhiteSpace />
              <Card
                title="商机转化"
                size="small"
                style="width: 735px; height: 419px"
              >
                <A3 />
              </Card>
            </van-col>
            <van-col>
              <Card title="战略合作" style="width: 817px; height: 494px">
                <A4 />
              </Card>
              <WhiteSpace />
              <van-row gutter="24">
                <van-col>
                  <Card
                    title="中央奖补"
                    size="small"
                    style="width: 394px; height: 438px"
                  >
                    <A5 />
                  </Card>
                </van-col>
                <van-col>
                  <Card
                    title="投后攻坚"
                    size="small"
                    style="width: 399px; height: 438px"
                  >
                    <A6 />
                  </Card>
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
              <Card title="项目开业" style="width: 1605px; height: 634px">
                <B1 />
              </Card>
              <WhiteSpace />
              <Card title="开业延期" style="width: 1605px; height: 792px">
                <B2 />
              </Card>
            </van-col>
            <van-col>
              <Card title="成本分析" style="width: 691px; height: 634px">
                <B3 />
              </Card>
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
      <div class="main-center">
        <C1 />
      </div>
      <div class="main-right">
        <SubWrapper title="经营现状">
          <van-row gutter="24">
            <van-col>
              <Card
                title="全业态收入及完成度"
                style="width: 1557px; height: 589px"
              >
                <template #data-cycle>{{ dataCycle }}</template>
              </Card>
            </van-col>
            <van-col>
              <WhiteSpace />
              <Card style="width: 739px; height: 563px">
                <template #data-cycle>{{ dataCycle }}</template>
                <C2 />
              </Card>
            </van-col>
          </van-row>
          <WhiteSpace />
          <van-row gutter="24">
            <van-col>
              <Card title="经营性支出" style="width: 1566px; height: 666px">
                <template #data-cycle>{{ dataCycle }}</template>
                <E2 />
              </Card>
              <WhiteSpace />
              <van-row gutter="24">
                <van-col>
                  <Card title="客户洞察" style="width: 905px; height: 396px">
                    <template #data-cycle>{{ dataCycle }}</template>
                  </Card>
                </van-col>
                <van-col>
                  <Card
                    title="24小时设备离线率"
                    style="width: 628px; height: 396px"
                  >
                    <template #data-cycle>{{ dataCycle }}</template>
                    <E4 />
                  </Card>
                </van-col>
              </van-row>
            </van-col>
            <van-col>
              <Card title="舆情风险" style="width: 739px; height: 1086px">
                <template #data-cycle>{{ dataCycle }}</template>
                <E5 />
              </Card>
            </van-col>
          </van-row>
        </SubWrapper>
        <WhiteSpace />
        <SubWrapper title="经营现状">
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
    <div class="footer">
      <FooterBackground />
      <div class="global-button">
        <div class="left">
          <ButtonGroup>
            <van-radio-group value="拓展盘面详情" direction="horizontal">
              <van-radio name="拓展盘面详情">
                拓展盘面详情
                <Icon
                  type="arrow-right"
                  :size="36"
                  class="button-icon--right"
                />
              </van-radio>
            </van-radio-group>
          </ButtonGroup>
          <ButtonGroup>
            <van-radio-group value="营造盘面详情" direction="horizontal">
              <van-radio name="营造盘面详情">
                营造盘面详情
                <Icon
                  type="arrow-right"
                  :size="36"
                  class="button-icon--right"
                />
              </van-radio>
            </van-radio-group>
          </ButtonGroup>
        </div>
        <div class="center">
          <ButtonGroup>
            <van-radio-group value="main" direction="horizontal">
              <van-radio name="main">
                <Icon type="map" :size="36" class="button-icon--left" />
                总盘面
              </van-radio>
              <van-radio name="guanyu">
                <Icon type="flag" :size="36" class="button-icon--left" />
                冠寓大事记
              </van-radio>
            </van-radio-group>
          </ButtonGroup>
          <ButtonGroup>
            <van-checkbox-group :value="scopeValue" direction="horizontal">
              <van-checkbox
                :name="DateScopes.YEARLY"
                @click="scopeChange(DateScopes.YEARLY)"
              >
                年累计
              </van-checkbox>
              <van-checkbox
                :name="DateScopes.MONTHLY"
                @click="scopeChange(DateScopes.MONTHLY)"
              >
                月累计
              </van-checkbox>
              <van-checkbox name="orgTree" @click="scopeChange('orgTree')">
                {{ store.global.orgTree.orgName }}
                <van-icon :name="showOrgPanel ? 'arrow-down' : 'arrow-up'" />
              </van-checkbox>
            </van-checkbox-group>
          </ButtonGroup>
          <!-- 区域选择 -->
          <OrgPanel
            type="orgTree"
            :show="showOrgPanel"
            @update:show="scopeChange('orgTree')"
          />
        </div>
        <div class="right">
          <ButtonGroup>
            <van-radio-group value="经营现状详情" direction="horizontal">
              <van-radio name="经营现状详情">
                经营现状详情
                <Icon
                  type="arrow-right"
                  :size="36"
                  class="button-icon--right"
                />
              </van-radio>
            </van-radio-group>
          </ButtonGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Base from "@/views/Base";
import Card from "@/components/Card/Index.vue";
import SubWrapper from "@/components/SubWrapper/Index.vue";
import WhiteSpace from "@/components/WhiteSpace/Index.vue";
import FooterBackground from "@/components/FooterBackground/Index.vue";
import ButtonGroup from "@/components/ButtonGroup/Index.vue";
import Icon from "@/components/Icon/Index.vue";
import { DateScopes } from "@/service/analysis/commandCabin/publicEnum";

/** Jing */
import A1 from "./components/A1.vue";
import A2 from "./components/A2.vue";
import A3 from "./components/A3.vue";
import A4 from "./components/A4.vue";
import A5 from "./components/A5.vue";
import A6 from "./components/A6.vue";
import B1 from "./components/B1.vue";
import B2 from "./components/B2.vue";
import B3 from "./components/B3.vue";
import B4 from "./components/B4.vue";
import B5 from "./components/B5.vue";
import E4 from "./components/E4.vue";
import C1 from "./components/C1.vue";
import C2 from "./components/C2.vue";
import E2 from "./components/E2.vue";
import E5 from "./components/E5.vue";
import OrgPanel from "@/views/components/OrgPanel.vue";

@Component({
  components: {
    FooterBackground,
    SubWrapper,
    Card,
    WhiteSpace,
    A1,
    A2,
    A3,
    A4,
    A5,
    A6,
    B1,
    B2,
    B3,
    B4,
    B5,
    C1,
    C2,
    E2,
    E4,
    E5,
    ButtonGroup,
    Icon,
    OrgPanel,
  },
})
export default class Home extends Base {
  /**
   * 数据周期
   */
  dataCycle = "月";

  /**
   * 时间范围枚举
   */
  DateScopes = DateScopes;
  /**
   * 显示隐藏区域选择
   */
  showOrgPanel = false;
  /**
   * 范围选择
   */
  scopeValue: string[] = [];
  scopeChange(value: any) {
    if ([DateScopes.YEARLY, DateScopes.MONTHLY].includes(value)) {
      this.store.global.dateScope = value;
      this.showOrgPanel = false;
      this.scopeValue = [value];
    } else {
      if (this.showOrgPanel) {
        this.scopeValue = this.scopeValue.filter((a) => a !== value);
      } else {
        this.scopeValue.push(value);
      }
      this.showOrgPanel = !this.showOrgPanel;
    }
  }

  created() {
    this.scopeValue = [this.store.global.dateScope];
  }
}
</script>

<style lang="scss" scoped>
.page__index {
  width: 7680px;
  color: #fff;
  padding-top: 55px;
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
  .footer {
    position: relative;
    height: 253px;
  }
}
.global-button {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 140px;
  .button-icon--right {
    margin-left: 12px;
  }
  .button-icon--left {
    margin-right: 12px;
  }
  .left,
  .center,
  .right {
    display: flex;
    position: relative;
  }
  .left {
    width: 32%;
    justify-content: flex-start;
  }
  .center {
    width: 36%;
    justify-content: space-between;
    margin: -20px 0 auto;
  }
  .right {
    width: 32%;
    justify-content: flex-end;
  }
}
</style>
