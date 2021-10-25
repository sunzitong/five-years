<template>
  <div class="table-wrapper">
    <van-row type="flex" align="center">
      <van-col class="cus-label">
        项目动态收益回收周期
        <span>{{ month }}</span>
        个月
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
    <Spin class="investment" :loading="loading" :empty="empty">
      <Animationend
        key="1"
        :height="1300"
        :scrollMinCount="13"
        :dataSource="dataSource"
      >
        <template v-slot="{ list }">
          <table class="table" cellspacing="0">
            <tbody>
              <tr animated v-for="item of list" :key="item.quota">
                <td v-for="o of columns" :key="o.dataIndex">
                  <div :class="o.dataIndex">
                    {{ splitString(item[o.dataIndex]) }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </Animationend>
    </Spin>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import { StoreKey, useStore } from "@/store";
import Animationend from "@/components/Animationend/Index.vue";
import {
  CurrentInfoReturn,
  fetchCurrentInfo,
} from "@/service/analysis/bigScreen/projectBoard/finance/currentInfo";
import { iwant } from "@guanyu/shared";

@Component({
  components: {
    Animationend,
  },
})
export default class B2 extends Base implements IFetch {
  /**
   * 表格数据
   */
  dataSource: CurrentInfoReturn["list"] = [];

  /**
   * 表头
   */
  columns = [
    { title: "指标", dataIndex: "quota" },
    { title: "投资刻度版", dataIndex: "graduation" },
    { title: "月度运维版", dataIndex: "reality" },
    { title: "差异", dataIndex: "diff" },
  ];

  /**
   * 返回数据
   */
  response: Partial<CurrentInfoReturn> = {};

  /**
   * 投资多少个月
   */
  get month() {
    return this.formatValue(this.response.month);
  }

  splitString(str: string) {
    let newStr = str;
    if (str.length > 16) {
      newStr = str.split("/").join("/\n");
    }
    return newStr;
  }

  /**
   * 请求数据
   * 自动触发 重复调用
   * @returns response
   */
  async fetch() {
    const response = await useStore(fetchCurrentInfo, {
      key: StoreKey.ProjectCurrentInfo,
      params: {
        phId: this.store.global.project.phId,
      },
    });
    if (response?.status === "ok") {
      this.response = iwant.object(response.data);
      this.dataSource = iwant.array(this.response.list);
    }

    this.empty = !this.dataSource.length;
    return response;
  }
}
</script>

<style lang="scss" scoped>
$step-color: #0e173c;
.table-wrapper {
  word-break: break-all;
}
.investment {
  height: 1290px;
}

.cus-label {
  padding: 30px 50px;
  color: #90a4c3;
  font-size: 40px;
  span {
    margin: 0 5px;
    color: #fff;
    font-weight: bold;
  }
}
.table {
  white-space: pre-wrap;
  width: 100%;
  table-layout: fixed;
  text-align: center;
  font-size: 36px;
  td,
  th {
    height: 100px;
  }
  th {
    background: $step-color;
    font-weight: normal;
  }
  td {
    // padding: 0 2px;
    color: #90a4c3;
  }
  tbody {
    tr:nth-child(even) {
      background: $step-color;
    }
  }
  .quota {
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 1.2;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
}
</style>
