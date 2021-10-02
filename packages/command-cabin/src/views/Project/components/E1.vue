<template>
  <Spin class="warning" :loading="loading" :empty="empty">
    <div class="table-wrapper">
      <van-row type="flex" align="center" style="margin-bottom: 47px">
        <van-col span="2" class="cus-label">预警阶段</van-col>
        <van-col span="10" class="cus-checkbox-wrapper">
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
        <van-col span="2" class="cus-label">预警阶段</van-col>
        <van-col span="10" class="cus-checkbox-wrapper">
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
      <Animationend
        key="1"
        :height="500"
        :scrollMinCount="5"
        :dataSource="response"
      >
        <template v-slot="{ list }">
          <table class="table" cellspacing="0">
            <tbody>
              <tr animated v-for="item of list" :key="item.projectId">
                <td v-for="o of columns" :key="o.dataIndex">
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
    </div>
  </Spin>
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

import { WarningOptStages } from "@/service/analysis/commandCabin/publicEnum/enums";
import {
  EarlyWarningItemReturn,
  fetchEarlyWarning,
} from "@/service/analysis/bigScreen/projectBoard/managementSituation/earlyWarning";

@Component({
  components: {
    F1A,
    F1B,
    Icon,
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
   * 返回数据
   */
  response: EarlyWarningItemReturn[] = [];

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
      // // 超期预警
      // OVER_PERIOD: {
      //   style: {
      //     "background-color": "rgba(255, 203, 123, 0.2)",
      //     "border-color": "#ffcb7b",
      //     color: "#ffcb7b",
      //   },
      //   iconColor: "#ffcb7b",
      // },
      // // 收入预警
      // INCOME: {
      //   style: {
      //     "background-color": "rgba(255, 57, 128, 0.2)",
      //     "border-color": "#ff3980",
      //     color: "#ff3980",
      //   },
      //   iconColor: "#ff3980",
      // },
      // // 出租率预警
      // RENT_RATIO: {
      //   style: {
      //     "background-color": "rgba(153, 183, 246, 0.2)",
      //     "border-color": "#99b7f6",
      //     color: "#99b7f6",
      //   },
      //   iconColor: "#99b7f6",
      // },
      //  人员离岗, 颜色无
      // STAFF_LEAVE: {
      //   style: {
      //     "background-color": "rgba(255, 203, 123, 0.2)",
      //     "border-color": "#99b7f6",
      //     color: "#99b7f6",
      //   },
      //   iconColor: "#99b7f6",
      // },
      // // 运营品质
      // OPT_QUALITY: {
      //   style: {
      //     "background-color": "rgba(180, 145, 253, 0.2)",
      //     "border-color": "#b491fd",
      //     color: "#b491fd",
      //   },
      //   iconColor: "#b491fd",
      // },
      // // 安全风险
      // SECURITY: {
      //   style: {
      //     "background-color": "rgba(34, 203, 152, 0.2)",
      //     "border-color": "#22cb98",
      //     color: "#22cb98",
      //   },
      //   iconColor: "#22cb98",
      // },
      // // 火情风险
      // FIRE_SITUATION: {
      //   style: {
      //     "background-color": "rgba(34, 203, 152, 0.2)",
      //     "border-color": "#f50",
      //     color: "#f50",
      //   },
      //   iconColor: "#f50",
      // },
    };
    const theme = typeMaps[item.stage] ?? {};
    return theme;
  }

  /**
   * 请求数据
   * 自动触发 重复调用
   * @returns response
   */
  async fetch() {
    const response = await useStore(fetchEarlyWarning, {
      key: StoreKey.HomeEarlyWarning,
      params: {
        projectId: this.store.global.project.projectId,
        stage: this.stage.join(","),
        riskDegree: this.riskDegree.join(","),
      },
    });
    if (response?.status === "ok") {
      this.response = response.data ?? [];
    }
    return response;
  }
}
</script>

<style lang="scss" scoped>
$step-color: #0e173c;
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
  }
  .cus-checkbox-wrapper {
    span {
      position: relative;
      display: inline-block;
      color: #90a4c3;
      margin: 0 10px;
      font-size: 36px;
      background: #0e173c;
      border-radius: 10px;
      padding: 8px;
      border: 2px solid #0e173c;
      text-align: center;
      cursor: pointer;
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
      width: 152px;
    }
    .type2 {
      width: 194px;
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
