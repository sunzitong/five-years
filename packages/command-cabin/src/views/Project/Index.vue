<template>
  <div class="page__project">
    <WhiteSpace />
    <div class="main">
      <div class="main-left">
        <SubWrapperA title="基本信息" style="width: 1961px; height: 2972px">
          <!-- 资产类型 -->
          <CardA style="width: 1909px; height: 1379px">
            <A1 />
          </CardA>
          <WhiteSpace />
          <CardA style="width: 1909px; height: 429px">
            <A2 />
          </CardA>
          <WhiteSpace />
          <CardA title="项目区位" style="width: 1909px; height: 976px"></CardA>
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
    <div class="footer">
      <div class="global-button">
        <ButtonGroup>
          <van-checkbox-group :value="centerType" direction="horizontal">
            <van-checkbox name="meeting" @click="centerChange('meeting')">
              会议中心
            </van-checkbox>
            <van-checkbox name="command" @click="centerChange('command')">
              实时指挥中心
            </van-checkbox>
            <van-checkbox name="project" @click="centerChange('project')">
              门店选择
              <van-icon :name="showOrgPanel ? 'arrow-down' : 'arrow-up'" />
            </van-checkbox>
          </van-checkbox-group>
        </ButtonGroup>
      </div>
      <OrgPanel
        :show="showOrgPanel"
        @update:show="centerChange('project')"
        type="project"
      />
    </div>
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
import F1 from "./components/F1.vue";
import ButtonGroup from "@/components/ButtonGroup/Index.vue";
import Icon from "@/components/Icon/Index.vue";
import OrgPanel from "@/views/components/OrgPanel.vue";
import { DateScopes } from "@/service/analysis/commandCabin/publicEnum";

@Component({
  components: {
    SubWrapperA,
    CardA,
    WhiteSpace,
    A1,
    A2,
    D2,
    D3,
    F1,
    ButtonGroup,
    Icon,
    OrgPanel,
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
  showOrgPanel = false;
  /**
   * 会议中心 实时指挥中心
   */
  centerType = ["meeting"];
  /**
   * 切换
   */
  centerChange(type: string) {
    if (["meeting", "command"].includes(type)) {
      this.centerType = [type];
    } else {
      if (!this.showOrgPanel) {
        this.centerType.push(type);
      } else {
        this.centerType = this.centerType.filter((a) => a !== type);
      }
      this.showOrgPanel = !this.showOrgPanel;
    }
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
.footer {
  position: relative;
  width: 100%;
  height: 0;
  margin: auto;
  .global-button {
    position: absolute;
    width: 34.6%;
    display: flex;
    justify-content: flex-end;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
}
.org-panel {
  right: 2525px;
  bottom: 160px;
}
</style>
