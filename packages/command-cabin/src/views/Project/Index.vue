<template>
  <div class="page__project">
    <WhiteSpace />
    <div class="main">
      <div class="main-left">
        <SubWrapperA title="基本信息" style="width: 1961px; height: 2972px">
          <!-- 资产类型 -->
          <CardA style="width: 1909px; height: 1380px">
            <A1 />
          </CardA>
          <WhiteSpace />
          <CardA style="width: 1909px; height: 486px">
            <A2 />
          </CardA>
          <WhiteSpace />
          <CardA title="项目区位" style="width: 1909px; height: 914px"></CardA>
        </SubWrapperA>
      </div>
      <div class="main-center">
        <SubWrapperA
          title="财务相关指标及预估"
          style="width: 2856px; height: 2740px"
        >
          <van-row gutter="20">
            <van-col>
              <CardA
                title="财务相关指标及预估"
                style="width: 1590px; height: 2610px"
              ></CardA>
            </van-col>
            <van-col>
              <CardA
                title="当前投资实现情况"
                style="width: 1193px; height: 1611px"
              ></CardA>
              <WhiteSpace />
              <CardA
                title="奖补到账"
                style="width: 1193px; height: 246px"
              ></CardA>
              <SubWrapperA
                title="风险监控"
                size="small"
                style="width: 1193px; height: 736px"
              >
                <CardA style="width: 1148px; height: 584px"></CardA>
              </SubWrapperA>
            </van-col>
          </van-row>
        </SubWrapperA>

        <div class="global-button">
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
                门店选择
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
            type="project"
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
        <SubWrapperA title="经营现状" style="width: 2693px; height: 2027px">
          <van-row gutter="20">
            <van-col>
              <CardA title="收入量价情况" style="width: 1820px; height: 1100px">
                <template #data-cycle>{{ dataCycle }}</template>
              </CardA>
              <WhiteSpace />
              <van-row gutter="20">
                <van-col>
                  <CardA
                    title="综合经营指数"
                    style="width: 900px; height: 420px"
                  >
                    <D2 />
                  </CardA>
                  <WhiteSpace />
                  <CardA
                    title="24小时设备离线率"
                    style="width: 900px; height: 310px"
                  >
                    <D3 />
                    <template #data-cycle>{{ dataCycle }}</template>
                  </CardA>
                </van-col>
                <van-col>
                  <CardA
                    title="客户洞察"
                    style="width: 900px; height: 750px"
                  ></CardA>
                </van-col>
              </van-row>
            </van-col>
            <van-col>
              <CardA title="经营性支出" style="width: 801px; height: 924px">
                <template #data-cycle>{{ dataCycle }}</template>
                <D5 />
              </CardA>
              <WhiteSpace />
              <CardA title="逾期金额" style="width: 801px; height: 924px">
                <template #data-cycle>{{ dataCycle }}</template>
                <D6 />
              </CardA>
            </van-col>
          </van-row>
        </SubWrapperA>
        <WhiteSpace />
        <van-row gutter="20">
          <van-col>
            <SubWrapperA title="风险预警" style="width: 1846px; height: 920px">
              <CardA style="width: 1794px; height: 770px"></CardA>
            </SubWrapperA>
          </van-col>
          <van-col>
            <SubWrapperA
              size="small"
              title="舆情风险"
              style="width: 828px; height: 920px"
            >
              <CardA title="舆情风险" style="width: 776px; height: 770px">
                <F1 />
              </CardA>
            </SubWrapperA>
          </van-col>
        </van-row>
      </div>
    </div>

    <div class="project-name">{{ store.global.project.projectName }}</div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Base from "@/views/Base";
import SubWrapperA from "@/components/SubWrapperA/Index.vue";
import CardA from "@/components/CardA/Index.vue";
import WhiteSpace from "@/components/WhiteSpace/Index.vue";
import A1 from "./components/A1.vue";
import A2 from "./components/A2.vue";
import D2 from "./components/D2.vue";
import D3 from "./components/D3.vue";
import D5 from "./components/D5.vue";
import D6 from "./components/D6.vue";
import F1 from "./components/F1.vue";
import ButtonGroup from "@/components/ButtonGroup/Index.vue";
import Icon from "@/components/Icon/Index.vue";
import OrgPanel from "@/views/components/OrgPanel.vue";
import { DateScopes } from "@/service/analysis/commandCabin/publicEnum";
import ButtonGroupA from "@/components/ButtonGroupA/Index.vue";

@Component({
  components: {
    SubWrapperA,
    CardA,
    WhiteSpace,
    A1,
    A2,
    D2,
    D3,
    D5,
    D6,
    F1,
    ButtonGroup,
    Icon,
    OrgPanel,
    ButtonGroupA,
  },
})
export default class Index extends Base {
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
    return this.formatValue(null);
  }
}
</script>

<style lang="scss" scoped>
.page__project {
  width: 7680px;
  color: #fff;
  .main {
    display: flex;
    margin: 0 60px;
  }
  .main-center {
    flex: 1;
    margin: 0 20px;
  }
}
.global-button {
  position: relative;
  display: flex;
  justify-content: space-between;
  left: 0;
  right: 0;
  bottom: 0;
  height: 192px;
  margin-top: 40px;
  padding: 0 14px 0 8px;
  .org-panel {
    bottom: 220px;
    &--scope {
      right: 397px;
    }
  }
}
.project-name {
  position: absolute;
  top: 70px;
  right: 130px;
  font-weight: bold;
  font-size: 66px;
  color: #fff;
}
</style>
