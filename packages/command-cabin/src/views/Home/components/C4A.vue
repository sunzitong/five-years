<template>
  <div class="c4a-container" :class="{ fold: isFold }">
    <CardB fill="#113069">
      <div class="head">
        <div class="title">供销存</div>
        <div class="fold" @click="isFold = !isFold">
          <span>{{ isFold ? "点击展开" : "点击收起" }}</span>
          <Icon :type="isFold ? 'unfold' : 'fold'" :size="44" />
        </div>
        <router-link class="detail" to="/supply-the-plate" tag="div">
          <span>供销存详情</span>
          <van-icon name="down" />
        </router-link>
      </div>
      <div class="table-container" v-if="!isFold">
        <table>
          <thead>
            <tr>
              <th rowspan="2" width="14%">区域</th>
              <th rowspan="2" width="12%">
                YTD收入
                <br />
                缺口
              </th>
              <th rowspan="2" width="12%">预估获取项目收入缺口</th>
              <th colspan="4">已开业项目收入缺口</th>
              <th rowspan="2" width="14%">解约&终止项目收入缺口</th>
            </tr>
            <tr>
              <th width="12%">延期开业</th>
              <th width="12%">提前开业</th>
              <th width="12%">正常营业</th>
              <th width="12%">中止</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ formatValue(response.regionName) }}</td>
              <td>{{ formatValue(response.ytdIncomeGap) }}</td>
              <td>{{ formatValue(response.forecastIncomeGap) }}</td>
              <td>
                {{ formatValue(response.openedAndPostponeIncomeGap) }}
              </td>
              <td>{{ formatValue(response.openedAndAheadIncomeGap) }}</td>
              <td>{{ formatValue(response.openAsUsualIncomeGap) }}</td>
              <td>{{ formatValue(response.openedAndTerminationIncomeGap) }}</td>
              <td>{{ formatValue(response.contractTerminationIncomeGap) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </CardB>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import Icon from "@/components/Icon/Index.vue";
import CardB from "@/components/CardB/Index.vue";
import { StoreKey, useStore } from "@/store";
import {
  fetchSupplyAndMarketingSave,
  SupplyAndMarketingSaveReturn,
} from "@/service/analysis/bigScreen/mainBoard/center/supplyAndMarketingSave";
import { iwant } from "@guanyu/shared";

@Component({
  components: { Icon, CardB },
})
export default class C4A extends Base implements IFetch {
  isFold = true;
  response: Partial<SupplyAndMarketingSaveReturn> = {};
  async fetch() {
    const response = await useStore(fetchSupplyAndMarketingSave, {
      key: StoreKey.HomeSupplyAndMarketingSave,
      params: {
        dateScope: this.store.global.dateScope,
        orgType: this.store.global.dataLevel,
        orgId: this.store.global.orgTree.orgId,
        orgName: this.store.global.orgTree.orgName,
        date: +this.store.global.yearValue,
      },
    });
    if (response?.status === "ok") {
      this.response = iwant.object(response.data);
    } else {
      this.response = {};
    }
    return response;
  }
}
</script>
<style lang="scss" scoped>
.c4a-container {
  position: absolute;
  bottom: 180px;
  font-size: 40px;
  color: #fff;
  &::v-deep {
    .app-card-b__content {
      min-height: 160px;
    }
  }

  &.fold {
    width: 834px;
    .head {
      height: 134px;
    }
  }
}
.head {
  height: 60px;
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  margin: 20px 40px;
  .title {
    margin: 0 auto 0 0;
  }
  .fold,
  .detail {
    display: flex;
    align-items: center;
    cursor: pointer;
    span {
      margin-right: 14px;
    }
  }
  .fold {
    span {
      color: #dbf0ff;
      opacity: 0.5;
    }
  }
  .detail {
    margin: 0 0 0 44px;
    .van-icon {
      transform: rotate(-90deg);
    }
  }
}
.table-container {
  font-size: 36px;
  color: #fff;
  table {
    table-layout: fixed;
    min-width: 1572px;
    margin: 0 36px 40px;
    text-align: center;
    border-collapse: collapse;
  }
  thead {
    background: #0e173c;
  }
  tbody {
    color: #90a4c3;
    background: rgba(14, 23, 60, 0.5);
  }
  tr {
    height: 60px;
  }
  th {
    font-weight: normal;
    border-left: 1px solid #445da5;
  }
  thead tr:nth-child(1) {
    border-bottom: 1px solid #445da5;
    th:nth-child(1) {
      border: none;
    }
  }
  .warn {
    color: #ff3980;
  }
}
</style>
