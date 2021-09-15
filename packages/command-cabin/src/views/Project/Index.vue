<template>
  <div class="page__project">
    <div class="header">龙湖冠寓重庆佳华北宸里店</div>
    <div class="main">
      <div class="main-left">
        <SubWrapperA title="财务相关指标及预估">
          <van-row gutter="24">
            <van-col>
              <!-- 资产类型 -->
              <CardA style="width: 1098px; height: 560px">
                <A1 />
              </CardA>
              <WhiteSpace />
              <CardA :showFooter="true" style="width: 1098px; height: 560px">
                <template #footer>
                  <a>
                    投资任务书
                    <Icon type="arrow-right" color="#fff" />
                  </a>
                </template>
                <A2 />
              </CardA>
            </van-col>
            <van-col>
              <CardA style="width: 1218px; height: 1145px"><A6 /></CardA>
            </van-col>
          </van-row>
          <WhiteSpace />
          <van-row gutter="24">
            <van-col>
              <CardA
                title="经营团队"
                size="small"
                style="width: 764px; height: 408px"
              >
                <A3 />
              </CardA>
            </van-col>
            <van-col>
              <CardA
                title="设计团队"
                size="small"
                style="width: 764px; height: 408px"
              >
                <A4 />
              </CardA>
            </van-col>
            <van-col>
              <CardA
                title="施工团队"
                size="small"
                style="width: 764px; height: 408px"
              >
                <A5 />
              </CardA>
            </van-col>
          </van-row>
          <WhiteSpace />
          <van-row>
            <van-col>
              <CardA
                title="项目区位"
                style="width: 2340px; height: 1115px"
              ></CardA>
            </van-col>
          </van-row>
        </SubWrapperA>
      </div>
      <div class="main-center">
        <SubWrapperA title="财务指标达成及预估">
          <van-row gutter="24">
            <van-col>
              <WhiteSpace />
              <CardA style="width: 1506px; height: 2398px"></CardA>
            </van-col>
            <van-col>
              <CardA title="综合经营指数" style="width: 1050px; height: 597px">
                <C5 />
              </CardA>
              <WhiteSpace />
              <CardA
                title="当前投资实现情况"
                style="width: 1050px; height: 582px"
              ></CardA>
              <WhiteSpace />
              <CardA
                title="奖补到账"
                style="width: 1050px; height: 260px"
              ></CardA>
            </van-col>
          </van-row>
        </SubWrapperA>
      </div>
      <div class="main-right">
        <SubWrapperA title="经营现状">
          <van-row gutter="24">
            <van-col>
              <CardA
                title="全业态收入及完成度"
                style="width: 1593px; height: 578px"
              >
                <template #data-cycle>{{ dataCycle }}</template>
              </CardA>
            </van-col>
            <van-col>
              <WhiteSpace />
              <CardA style="width: 723px; height: 555px">
                <D6 />
              </CardA>
            </van-col>
          </van-row>
          <WhiteSpace />
          <van-row gutter="24">
            <van-col>
              <CardA
                title="经营性支出"
                style="width: 904px; height: 556px"
              ></CardA>
            </van-col>
            <van-col>
              <CardA title="逾期金额" style="width: 665px; height: 556px"></CardA>
            </van-col>
            <van-col>
              <CardA title="舆情风险" style="width: 723px; height: 556px">
                <D7 />
              </CardA>
            </van-col>
          </van-row>
          <WhiteSpace />
          <van-row gutter="24">
            <van-col>
              <CardA title="客户洞察" style="width: 904px; height: 392px"></CardA>
            </van-col>
            <van-col>
              <CardA
                title="24小时设备离线率"
                style="width: 665px; height: 392px"
              >
                <D5 />
              </CardA>
            </van-col>
            <van-col>
              <CardA
                title="能源费用(收支差)"
                style="width: 723px; height: 312px"
              >
                <D8 />
              </CardA>
            </van-col>
          </van-row>
          <WhiteSpace />
          <van-row gutter="24">
            <van-col>
              <CardA
                title="风险预警"
                style="width: 2340px; height: 1114px"
              ></CardA>
            </van-col>
          </van-row>
        </SubWrapperA>
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
import A3 from "./components/A3.vue";
import A4 from "./components/A4.vue";
import A5 from "./components/A5.vue";
import A6 from "./components/A6.vue";
import D6 from "./components/D6.vue";
import C5 from "./components/C5.vue";
import D5 from "./components/D5.vue";
import D7 from "./components/D7.vue";
import D8 from "./components/D8.vue";
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
    A3,
    A4,
    A5,
    A6,
    D6,
    C5,
    D5,
    D7,
    D8,
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
