<template>
  <div class="table-wrapper">
    <van-row type="flex" align="center" style="margin-bottom: 47px">
      <van-col span="2" class="cus-label">预警阶段</van-col>
      <van-col class="cus-checkbox-wrapper">
        <label v-for="item of warningOptStages" :key="item.name">
          <input
            class="cus-checkbox"
            name="stage"
            :value="item.name"
            @change="fetch"
            type="checkbox"
            v-model="stage"
          />
          <span class="type1">
            {{ item.desc }}
            <em><Icon type="checked" /></em>
          </span>
        </label>
      </van-col>
      <van-col span="2" class="cus-label">风险程度</van-col>
      <van-col class="cus-checkbox-wrapper">
        <label v-for="(m, i) of riskDegrees" :key="m.name">
          <input
            class="cus-checkbox"
            name="riskDegree"
            type="checkbox"
            @change="fetch"
            :value="m.name"
            v-model="riskDegree"
          />
          <span class="type2">
            <Icon
              :size="54"
              type="warning"
              v-for="(n, index) of 3"
              :color="index + 1 <= 3 - i ? ['#FF3980'] : ['#6F6F6F']"
              :key="n"
            />
            <em><Icon type="checked" /></em>
          </span>
        </label>
      </van-col>
    </van-row>
    <table class="table" cellspacing="0">
      <thead>
        <tr>
          <th v-for="item of columns" :key="item.dataIndex">
            {{ item.title }}
          </th>
        </tr>
      </thead>
    </table>
    <Spin class="pre-warning" :loading="loading" :empty="empty">
      <Animationend
        key="1"
        :height="500"
        :scrollMinCount="5"
        :dataSource="response"
      >
        <template v-slot="{ list }">
          <table class="table" cellspacing="0">
            <tbody>
              <tr animated v-for="item of list" :key="item.id">
                <td
                  v-for="o of columns"
                  :key="o.dataIndex"
                  @click="toggleModal(item, o.dataIndex)"
                >
                  <div :class="o.dataIndex">
                    <template v-if="o.dataIndex === columns[4].dataIndex">
                      <Icon
                        type="warning"
                        :size="54"
                        v-for="(n, index) of 3"
                        :color="
                          index + 1 <= item[o.dataIndex]
                            ? ['#FF3980']
                            : ['#6F6F6F']
                        "
                        :key="n"
                      />
                    </template>
                    <template v-else-if="o.dataIndex === columns[2].dataIndex">
                      <div
                        class="warningType"
                        :style="getWarningInfo(item).style"
                      >
                        <Icon
                          size="24"
                          type="security"
                          :color="getWarningInfo(item).iconColor"
                        />
                        <span>{{ item[o.dataIndex] }}</span>
                      </div>
                    </template>
                    <template v-else>
                      {{ item[o.dataIndex] }}
                    </template>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </Animationend>
    </Spin>
    <C3A v-model="show" :orderId="orderId" :dataSource="response" />
  </div>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import F1A from "./F1A.vue";
import F1B from "./F1B.vue";
import { StoreKey, useStore } from "@/store";
import Icon from "@/components/Icon/Index.vue";
import { Swipe } from "vant";
import Animationend from "@/components/Animationend/Index.vue";
import C3A from "./C3A.vue";
import {
  EarlyWarningItemReturn,
  fetchEarlyWarning,
} from "@/service/analysis/bigScreen/mainBoard/managementSituation/earlyWarning";
import { WarningOptStages } from "@/service/analysis/commandCabin/publicEnum/enums";
import { iwant } from "@guanyu/shared";

@Component({
  components: {
    F1A,
    F1B,
    Icon,
    C3A,
    Animationend,
  },
})
export default class E1 extends Base implements IFetch {
  @Ref() swipe!: Swipe;

  /**
   * 表格数据
   */
  dataSource = [];

  /**
   * 表头
   */
  columns = [
    { title: "门店", dataIndex: "projectName" },
    { title: "阶段", dataIndex: "stageDesc" },
    { title: "预警类型", dataIndex: "typeDesc" },
    { title: "预警详情", dataIndex: "detail" },
    { title: "风险程度", dataIndex: "riskDegree" },
  ];

  /**
   * 预警阶段
   */
  warningOptStages = [
    { name: WarningOptStages.INVEST, desc: "投资" },
    { name: WarningOptStages.OPERATE, desc: "运营" },
    { name: WarningOptStages.MARKETING, desc: "营销" },
  ];

  /**
   * 风险等级
   */
  riskDegrees = [
    { name: 3, desc: "3" },
    { name: 2, desc: "2" },
    { name: 1, desc: "1" },
  ];

  /**
   * 预警阶段表单
   */
  stage = [];

  /**
   * 风险等级表单
   */
  riskDegree = [];

  /**
   * 显示弹窗
   */
  show = false;

  /**
   * 工单ID
   */
  orderId: null | number = null;

  /**
   * 返回数据
   */
  response: EarlyWarningItemReturn[] = [];

  toggleModal(item: EarlyWarningItemReturn, type: string) {
    // 门店ID可点击
    if (type !== this.columns[0].dataIndex) return;
    if (!item.orderId) return;
    this.orderId = item.orderId;
    if (!this.show) {
      this.orderId = null;
    }
    this.orderId = item.orderId;
    this.show = !this.show;
  }

  /**
   * 获取预警信息更改主题
   */
  getWarningInfo(item: EarlyWarningItemReturn) {
    const typeMaps = {
      // 投资
      INVEST: {
        style: {
          "background-color": "rgba(255, 203, 123, 0.2)",
          "border-color": "#ffcb7b",
          color: "#ffcb7b",
        },
        iconColor: "#ffcb7b",
      },
      // 运营
      OPERATE: {
        style: {
          "background-color": "rgba(255, 57, 128, 0.2)",
          "border-color": "#ff3980",
          color: "#ff3980",
        },
        iconColor: "#ff3980",
      },
      // 营销
      MARKETING: {
        style: {
          "background-color": "rgba(153, 183, 246, 0.2)",
          "border-color": "#99b7f6",
          color: "#99b7f6",
        },
        iconColor: "#99b7f6",
      },
    };
    const theme = typeMaps[item.stage] ?? {};
    return theme;
  }

  /**
   * 请求数据
   * 自动触发 重复调用
   * @returns response
   */
  async fetch(force?: boolean) {
    const response = await useStore(fetchEarlyWarning, {
      key: StoreKey.HomeEarlyWarning,
      params: {
        dataLevel: this.store.global.dataLevel,
        levelId: this.store.global.orgTree.orgId,
        stage: this.stage.join(","),
        riskDegree: this.riskDegree.join(","),
      },
      force,
    });
    if (response?.status === "ok") {
      this.response = iwant.array(response.data);
    }

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.fetch(true);
    }, 1000 * 60 * 10);

    /**
     * 处理无数据
     */
    this.empty = !this.response.length;
    return response;
  }

  beforeDestroy() {
    clearTimeout(this.timer);
  }
}
</script>

<style lang="scss" scoped>
$step-color: #0e173c;
.pre-warning {
  height: 369px;
}
.table-wrapper {
  padding-top: 47px;
  .cus-checkbox {
    -webkit-appearance: none;
    outline: none;
    opacity: 0;
  }
  .cus-label {
    text-align: right;
    color: #90a4c3;
    font-size: 36px;
    margin: 0 30px;
  }
  .cus-checkbox-wrapper {
    span {
      box-sizing: border-box;
      position: relative;
      display: inline-block;
      color: #90a4c3;
      font-size: 36px;
      height: 70px;
      background: #0e173c;
      border-radius: 10px;
      border: 2px solid #0e173c;
      text-align: center;
      cursor: pointer;
      margin-right: 16px;
      em {
        position: absolute;
        right: 0;
        top: 0;
        display: none;
        svg {
          vertical-align: top;
        }
      }
    }
    .type1 {
      width: 192px;
      line-height: 66px;
    }
    .type2 {
      width: 214px;
      border: 2px solid transparent;
      background: transparent;
    }
    .cus-checkbox:checked + span {
      color: #01f5f1;
      border: 2px solid #01f5f1;
      em {
        display: block;
      }
    }
    svg {
      vertical-align: middle;
    }
  }
}
.table {
  width: 100%;
  table-layout: fixed;
  text-align: center;
  font-size: 40px;
  td,
  th {
    height: 100px;
    font-weight: normal;
  }
  th {
    background: $step-color;
  }
  td {
    color: #90a4c3;
  }
  tbody {
    tr:nth-child(even) {
      background: $step-color;
    }
  }
  .projectName {
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 1.2;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .warningType {
    display: inline-block;
    padding: 5px 15px;
    min-width: 6em;
    border: 1px solid #f50;
    text-align: center;
    border-radius: 100px;
    font-size: 34px;
    border-width: 1px;
    border-style: solid;
    svg {
      margin-right: 5px;
    }
  }
}
</style>
