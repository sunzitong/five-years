<template>
  <div class="page__index">
    <div class="main">
      <O1 />
      <div class="main-left">
        <SubWrapperA style="width: 2694px; height: 1203px" title="拓展盘面">
          <van-row gutter="20">
            <van-col>
              <CardA title="项目获取" style="width: 866px; height: 1053px">
                <A1 />
              </CardA>
            </van-col>
            <van-col>
              <CardA title="商机储备" style="width: 866px; height: 452px">
                <A2 />
              </CardA>
              <WhiteSpace />
              <CardA title="商机转化" style="width: 866px; height: 581px">
                <A3 />
              </CardA>
            </van-col>
            <van-col>
              <CardA title="战略合作" style="width: 870px; height: 452px">
                <A4 />
              </CardA>
              <WhiteSpace />
              <van-row gutter="20">
                <van-col>
                  <CardA title="中央奖补" style="width: 425px; height: 582px">
                    <A5 />
                  </CardA>
                </van-col>
                <van-col>
                  <CardA
                    title="投后攻坚"
                    size="small"
                    style="width: 425px; height: 582px"
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
              <CardA title="开业延期" style="width: 1720px; height: 758px">
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
              <CardA title="维保报事" style="width: 902px; height: 401px">
                <B5 />
              </CardA>
            </van-col>
          </van-row>
        </SubWrapperA>
      </div>
      <div class="main-center">
        <div style="height: 1876px">
          <C1 />
          <C4 :levelValue="mapLevelValue" v-if="centerChartType === 'main'" />
          <C5 v-if="centerChartType === 'guanyu'" />
        </div>
        <div class="global-button global-button--1">
          <ButtonGroupA>
            <van-radio-group v-model="centerChartType" direction="horizontal">
              <van-radio
                name="main"
                @click="
                  () => {
                    if (store.global.dataLevel === DataLevels.GROUP) {
                      showMapLevelPanel = !showMapLevelPanel;
                    }
                  }
                "
              >
                <!-- <Icon type="map" :size="36" class="button-icon--left" /> -->
                总盘面({{ mapLevelOptions[mapLevelValue] }})
                <span v-show="store.global.dataLevel === DataLevels.GROUP">
                  <Icon
                    type="arrow-bold-bottom"
                    class="button-icon--right"
                    :color="centerChartType === 'main' ? '#01F5F1' : '#5180e4'"
                    v-if="showMapLevelPanel"
                  />
                  <Icon
                    type="arrow-bold-top"
                    class="button-icon--right"
                    :color="centerChartType === 'main' ? '#01F5F1' : '#5180e4'"
                    v-else
                  />
                </span>
              </van-radio>
              <van-radio
                name="guanyu"
                @click="showMapLevelPanel = false"
                v-show="store.global.dataLevel === DataLevels.GROUP"
              >
                <!-- <Icon type="flag" :size="36" class="button-icon--left" /> -->
                冠寓大事纪
              </van-radio>
            </van-radio-group>
          </ButtonGroupA>
          <!-- 总盘面大区、城市 -->
          <OptionPanel
            name="Options"
            :show.sync="showMapLevelPanel"
            :options="mapLevelOptions"
            v-model="mapLevelValue"
          />
        </div>
        <SubWrapperA
          style="width: 2113px; height: 680px; margin: 0 0 44px"
          title="现场风险监控"
        >
          <CardA style="height: 530px">
            <C3 />
          </CardA>
        </SubWrapperA>
        <div class="global-button global-button--2">
          <ButtonGroupA revert>
            <van-radio-group value="nav" direction="horizontal">
              <van-radio
                :name="showNavPanel ? 'nav' : null"
                @click="showNavPanel = !showNavPanel"
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
          <!-- 时间维度选择 -->
          <OptionPanel name="TheDateScopes" :show.sync="showScopePanel" />
          <!-- 区域选择 -->
          <OptionPanel name="TheOrgTree" :show.sync="showOrgPanel" />
          <!-- 快捷导航 -->
          <OptionPanel name="TheNavMenu" :show.sync="showNavPanel" />
        </div>
      </div>
      <div class="main-right">
        <SubWrapperA style="width: 2693px; height: 2027px" title="经营现状">
          <van-row gutter="20">
            <van-col>
              <CardA title="收入量价情况" style="width: 1820px; height: 930px">
                <template #data-cycle>{{ dataCycle }}</template>
                <D1 />
              </CardA>
              <WhiteSpace />
              <CardA title="客户洞察" style="width: 1820px; height: 452px">
                <template #data-cycle>{{ dataCycle }}</template>
                <D3 />
              </CardA>
              <WhiteSpace />
              <CardA
                title="24小时设备离线率"
                style="width: 1820px; height: 452px"
              >
                <D4 />
              </CardA>
            </van-col>
            <van-col>
              <CardA title="经营性支出" style="width: 801px; height: 930px">
                <template #data-cycle>{{ dataCycle }}</template>
                <D2 />
              </CardA>
              <WhiteSpace />
              <CardA title="逾期金额" style="width: 801px; height: 924px">
                <D5 />
              </CardA>
            </van-col>
          </van-row>
        </SubWrapperA>
        <WhiteSpace />
        <van-row gutter="20">
          <van-col>
            <SubWrapperA title="异常预警" style="width: 1845px; height: 920px">
              <CardA style="width: 1794px; height: 770px">
                <E1 />
              </CardA>
            </SubWrapperA>
          </van-col>
          <van-col>
            <SubWrapperA
              size="small"
              title="舆情风险"
              style="width: 828px; height: 920px"
            >
              <CardA title="风险状态" style="width: 776px; height: 770px">
                <F1 />
              </CardA>
            </SubWrapperA>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch } from "vue-property-decorator";
import { Base } from "@/views/Base";
import CardA from "@/components/CardA/Index.vue";
import SubWrapperA from "@/components/SubWrapperA/Index.vue";
import WhiteSpace from "@/components/WhiteSpace/Index.vue";
import FooterBackground from "@/components/FooterBackground/Index.vue";
import ButtonGroupA from "@/components/ButtonGroupA/Index.vue";
import Icon from "@/components/Icon/Index.vue";
import {
  DataLevels,
  DateScopes,
} from "@/service/analysis/commandCabin/publicEnum/enums";

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
import C1 from "./components/C1.vue";
import O1 from "./components/O1.vue";
import C3 from "./components/C3.vue";
import C4 from "./components/C4.vue";
import C5 from "./components/C5.vue";
import D1 from "./components/D1.vue";
import D2 from "./components/D2.vue";
import D3 from "./components/D3.vue";
import D4 from "./components/D4.vue";
import D5 from "./components/D5.vue";
import E1 from "./components/E1.vue";
import F1 from "./components/F1.vue";
import OptionPanel from "@/views/components/OptionPanel/Index.vue";

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
    O1,
    C3,
    C4,
    C5,
    D1,
    D2,
    D3,
    D4,
    D5,
    E1,
    F1,
    ButtonGroupA,
    Icon,
    OptionPanel,
  },
})
export default class Home extends Base {
  DataLevels = DataLevels;
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
   * 总盘面、冠寓大事纪
   * main guanyu
   */
  centerChartType = "main";
  /**
   * 总盘面数据区域
   */
  mapLevelOptions = { [DataLevels.AREA]: "大区", [DataLevels.CITY]: "城市" };
  /**
   * 总盘面数据区域
   */
  mapLevelValue = DataLevels.AREA;

  /**
   * 全局切换时同步切换总盘面
   */
  @Watch("store.global.dataLevel")
  dataLevelChanged(val: DataLevels) {
    if (val === DataLevels.GROUP) {
      this.mapLevelValue = DataLevels.AREA;
    } else {
      this.mapLevelValue = val;
      this.showMapLevelPanel = false;
      // 大事纪只有全国数据
      this.centerChartType = "main";
    }
  }

  /**
   * 总盘面大区、城市
   */
  showMapLevelPanel = false;
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
    const suffix = `累计(${this.store.global.dateValue})`;
    if (this.store.global.dateScope === DateScopes.YEARLY) {
      return `年${suffix}`;
    }
    if (this.store.global.dateScope === DateScopes.MONTHLY) {
      return `月${suffix}`;
    }
    return this.formatValue(null);
  }
  /**
   * 生命周期函数
   */
  created() {
    this.dataLevelChanged(this.store.global.dataLevel);
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
  position: relative;
  display: flex;
  padding: 0 5px;
  .button-icon--right {
    margin-left: 12px;
  }
  .button-icon--left {
    margin-right: 12px;
  }
  &--1 {
    justify-content: center;
    margin: 50px 0 62px;
  }
  &--2 {
    position: relative;
    justify-content: space-between;
    margin: 0 0 108px;
  }
}
.page__index {
  .option-panel {
    bottom: 120%;
    right: 0px;
    &.TheDateScopes {
      right: 397px;
    }
    &.TheNavMenu {
      left: 0;
      right: auto;
    }
    &.Options {
      left: 664px;
      right: auto;
    }
    &.TheOrgTree {
      z-index: 22;
    }
  }
}
</style>
