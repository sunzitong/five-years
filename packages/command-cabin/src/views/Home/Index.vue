<template>
  <div class="page__index">
    <div class="main">
      <div class="main-left">
        <SubWrapperA style="width: 2694px; height: 1203px" title="拓展盘面">
          <van-row gutter="20">
            <van-col>
              <CardA title="项目获取" style="width: 866px; height: 1046px">
                <A1 />
              </CardA>
            </van-col>
            <van-col>
              <CardA title="商机储备" style="width: 866px; height: 425px">
                <A2 />
              </CardA>
              <WhiteSpace />
              <CardA title="商机转化" style="width: 866px; height: 574px">
                <!-- <A3 /> -->
              </CardA>
            </van-col>
            <van-col>
              <CardA title="战略合作" style="width: 870px; height: 452px">
                <!-- <A4 /> -->
              </CardA>
              <WhiteSpace />
              <van-row gutter="20">
                <van-col>
                  <CardA title="中央奖补" style="width: 425px; height: 574px">
                    <A5 />
                  </CardA>
                </van-col>
                <van-col>
                  <CardA
                    title="投后攻坚"
                    size="small"
                    style="width: 425px; height: 574px"
                  >
                    <A6 />
                  </CardA>
                </van-col>
              </van-row>
            </van-col>
          </van-row>
        </SubWrapperA>
        <WhiteSpace />
        <SubWrapperA style="width: 2694px; height: 1741px" title="营造盘面">
          <template #extra>
            <a href="javascript:;">详情 →</a>
          </template>
          <van-row gutter="20">
            <van-col>
              <CardA title="项目开业" style="width: 1720px; height: 813px">
                <B1 />
              </CardA>
              <WhiteSpace />
              <CardA title="开业延期" style="width: 1720px; height: 750px">
                <B2 />
              </CardA>
            </van-col>
            <van-col>
              <CardA title="成本分析" style="width: 902px; height: 660px">
                <B3 />
              </CardA>
              <WhiteSpace />
              <CardA title="产品品质" style="width: 902px; height: 490px">
                <B4 />
              </CardA>
              <WhiteSpace />
              <CardA title="维保报事" style="width: 902px; height: 394px">
                <B5 />
              </CardA>
            </van-col>
          </van-row>
        </SubWrapperA>
      </div>
      <div class="main-center">
        <div style="height: 1876px">
          <C1 />
          <C2 />
        </div>
        <div class="global-button global-button--1">
          <ButtonGroupA>
            <van-radio-group v-model="centerChartType" direction="horizontal">
              <van-radio name="main">
                <Icon type="map" :size="36" class="button-icon--left" />
                总盘面
              </van-radio>
              <van-radio name="guanyu">
                <Icon type="flag" :size="36" class="button-icon--left" />
                冠寓大事记
              </van-radio>
            </van-radio-group>
          </ButtonGroupA>
        </div>
        <SubWrapperA
          style="width: 2113px; height: 680px; margin: 0 0 44px"
          title="现场风险监控"
        >
          现场风险监控
        </SubWrapperA>
        <div class="global-button global-button--2">
          <ButtonGroupA revert>
            <van-radio-group value="nav" direction="horizontal">
              <van-radio
                :name="showNavPanel ? 'nav' : null"
                @click="
                  () => {
                    showNavPanel = !showNavPanel;
                    showScopePanel = false;
                  }
                "
              >
                快捷导航
                <Icon
                  type="arrow-bold-bottom"
                  class="button-icon--right"
                  color="#01F5F1"
                  v-if="showNavPanel"
                />
                <Icon
                  type="arrow-bold-top"
                  class="button-icon--right"
                  color="#5180e4"
                  v-else
                />
              </van-radio>
            </van-radio-group>
          </ButtonGroupA>
          <ButtonGroupA>
            <van-checkbox-group
              :value="['scope', 'orgTree']"
              direction="horizontal"
            >
              <van-checkbox
                :name="showScopePanel ? 'scope' : null"
                @click="
                  () => {
                    showScopePanel = !showScopePanel;
                    showOrgPanel = false;
                  }
                "
              >
                {{ scopeValue }}
                <Icon
                  type="arrow-bold-bottom"
                  class="button-icon--right"
                  color="#01F5F1"
                  v-if="showScopePanel"
                />
                <Icon
                  type="arrow-bold-top"
                  class="button-icon--right"
                  color="#5180e4"
                  v-else
                />
              </van-checkbox>
              <van-checkbox
                :name="showOrgPanel ? 'orgTree' : null"
                @click="
                  () => {
                    showOrgPanel = !showOrgPanel;
                    showScopePanel = false;
                  }
                "
              >
                {{ store.global.orgTree.orgName }}
                <Icon
                  type="arrow-bold-bottom"
                  class="button-icon--right"
                  color="#01F5F1"
                  v-if="showOrgPanel"
                />
                <Icon
                  type="arrow-bold-top"
                  class="button-icon--right"
                  color="#5180e4"
                  v-else
                />
              </van-checkbox>
            </van-checkbox-group>
          </ButtonGroupA>
          <!-- 区域选择 -->
          <OrgPanel
            type="orgTree"
            :show="showOrgPanel"
            @update:show="showOrgPanel = false"
          />
          <!-- 时间维度选择 -->
          <OrgPanel
            type="dateScope"
            :show="showScopePanel"
            @update:show="showScopePanel = false"
          />
        </div>
      </div>
      <div class="main-right">
        <SubWrapperA style="width: 2693px; height: 2027px" title="经营现状">
          <van-row gutter="20">
            <van-col>
              <CardA title="收入量价情况" style="width: 1820px; height: 1100px">
                <template #data-cycle>{{ dataCycle }}</template>
              </CardA>
              <WhiteSpace />
              <CardA title="客户洞察" style="width: 1820px; height: 420px">
                <template #data-cycle>{{ dataCycle }}</template>
              </CardA>
              <WhiteSpace />
              <CardA
                title="24小时设备离线率"
                style="width: 1820px; height: 310px"
              >
                <template #data-cycle>{{ dataCycle }}</template>
                <E4 />
              </CardA>
            </van-col>
            <van-col>
              <CardA title="经营性支出" style="width: 801px; height: 924px">
                <template #data-cycle>{{ dataCycle }}</template>
              </CardA>
              <WhiteSpace />
              <CardA title="逾期金额" style="width: 801px; height: 924px">
                <template #data-cycle>{{ dataCycle }}</template>
              </CardA>
            </van-col>
          </van-row>
        </SubWrapperA>
        <WhiteSpace />
        <van-row gutter="20">
          <van-col>
            <SubWrapperA title="异常预警" style="width: 1845px; height: 920px">
              <CardA>
                <!-- <E5 /> -->
              </CardA>
            </SubWrapperA>
          </van-col>
          <van-col>
            <SubWrapperA
              size="small"
              title="舆情风险"
              style="width: 828px; height: 920px"
            >
              <CardA title="风险状态" style="width: 776px; height: 777px">
                <E5 />
              </CardA>
            </SubWrapperA>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Base from "@/views/Base";
import CardA from "@/components/CardA/Index.vue";
import SubWrapperA from "@/components/SubWrapperA/Index.vue";
import WhiteSpace from "@/components/WhiteSpace/Index.vue";
import FooterBackground from "@/components/FooterBackground/Index.vue";
import ButtonGroupA from "@/components/ButtonGroupA/Index.vue";
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
    SubWrapperA,
    CardA,
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
    ButtonGroupA,
    Icon,
    OrgPanel,
  },
})
export default class Home extends Base {
  /**
   * 时间维度枚举
   */
  DateScopes = DateScopes;
  /**
   * 数据周期
   */
  get dataCycle() {
    if (this.store.global.dateScope === DateScopes.MONTHLY) {
      return "月";
    }
    return null;
  }
  /**
   * 总盘面、冠寓大事记
   */
  centerChartType = "main";
  /**
   * 显示快捷导航
   */
  showNavPanel = false;
  /**
   * 显示区域选择
   */
  showOrgPanel = false;
  /**
   * 显示年累月累选择
   */
  showScopePanel = false;
  /**
   * 时间维度按钮文案
   */
  get scopeValue() {
    if (this.store.global.dateScope === DateScopes.YEARLY) {
      return "年累计";
    }
    if (this.store.global.dateScope === DateScopes.MONTHLY) {
      return "月累计";
    }
    return "--";
  }
  /**
   * 生命周期函数
   */
  created() {
    /** */
  }
}
</script>

<style lang="scss" scoped>
.page__index {
  width: 7680px;
  color: #fff;
  padding-top: 18px;
  .main {
    display: flex;
    margin: 0 60px;
  }

  .main-center {
    display: flex;
    flex-flow: column;
    padding: 0 30px;
    flex: 1;
  }

  .main-left-row {
    padding: 20px;
    display: flex;
    justify-content: space-between;
  }
}
.global-button {
  display: flex;
  padding: 0 5px;
  .button-icon--right {
    margin-left: 12px;
  }
  .button-icon--left {
    margin-right: 12px;
  }
  &--1 {
    justify-content: flex-end;
    margin: 50px 0 62px;
  }
  &--2 {
    position: relative;
    justify-content: space-between;
    margin: 0 0 108px;
  }
}
.org-panel {
  bottom: 120%;
  right: 0px;
  &--scope {
    right: 397px;
  }
}
</style>
