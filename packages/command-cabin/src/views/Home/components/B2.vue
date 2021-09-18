<template>
  <Spin :loading="loading" style="height: 660px">
    <div class="page__opening_extension__map">
      <div class="abstract_text">
        当前开业风险项目
        <span>{{ riskProject }}</span>
        个，共计
        <span>{{ sepNumber(storeNum) }}</span>
        间
      </div>
      <div class="scroll_table">
        <van-row
          justify="space-between"
          type="flex"
          class="table_row table_head"
        >
          <van-col :span="5" class="table_col">预计开业时间</van-col>
          <van-col :span="5" class="table_col">项目</van-col>
          <van-col :span="4" class="table_col">资产类型</van-col>
          <van-col :span="5" class="table_col">房间数</van-col>
          <van-col :span="5" class="table_col">延期卡点</van-col>
        </van-row>
        <div class="table_body">
          <Animationend :scrollMinCount="4" :height="400" :dataSource="col">
            <template v-slot="{ list }">
              <van-row
                animated
                v-for="(item, index) in list"
                :key="index"
                justify="space-between"
                type="flex"
                class="table_row"
              >
                <van-col :span="5" class="table_col">
                  {{ item.planOpenDate }}
                </van-col>
                <van-col :span="5" class="table_col">
                  <div class="van-multi-ellipsis--l2">
                    {{ item.projectName }}
                  </div>
                </van-col>
                <van-col :span="4" class="table_col">
                  {{ item.transactionModel }}
                </van-col>
                <van-col :span="5" class="table_col">
                  {{ sepNumber(item.roomNum) }}
                </van-col>
                <van-col :span="5" class="table_col">
                  {{ item.chokePoint }}
                </van-col>
              </van-row>
            </template>
          </Animationend>
        </div>
      </div>
    </div>
  </Spin>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Animationend from "@/components/Animationend/Index.vue";
import {
  fetchProjectDelayInfo,
  ProjectDelayInfoReturn,
} from "@/service/analysis/bigScreen/mainBoard/construct/projectDelayInfo";
import { AnyObject, iwant } from "@guanyu/shared";
import Base from "@/views/Base";
import { StoreKey, useStore } from "@/store";

@Component({
  components: {
    Animationend,
  },
})
export default class B2 extends Base {
  /**
   * 接口返回值
   * /bigScreen/mainBoard/construct/projectDelayInfo
   */
  resData: Partial<ProjectDelayInfoReturn> = {};

  /**
   * 表格数据
   */
  col: AnyObject[] = [];

  riskProject: number | "--" = "--"; // 当前开业风险项目

  storeNum: number | "--" = "--"; // 风险房间数

  /**
   * 自动触发 重复调用
   */
  async fetch() {
    const response = await useStore(fetchProjectDelayInfo, {
      key: StoreKey.HomeProjectDelayInfo,
      params: {
        regionType: this.store.global.dataLevel,
        regionId: this.store.global.orgTree.orgId,
      },
    });
    if (response?.status === "ok") {
      this.resData = response.data;

      this.riskProject = this.resData.delayProjectNum ?? "--";
      this.storeNum = this.resData.delayRoomNum ?? "--";

      this.col = iwant.array(this.resData.delayModelList).map((el) => {
        return {
          planOpenDate: el.planOpenDate ? el.planOpenDate : "--",
          cityName: el.cityName ? el.cityName : "--",
          projectName: el.projectName ? el.projectName : "--",
          transactionModel: el.transactionModel ? el.transactionModel : "--",
          roomNum: el.roomNum ? el.roomNum : "--",
          riskType: el.riskType ? el.riskType : "--",
          chokePoint: el.chokePoint ? el.chokePoint : "--",
        };
      });
    }
    return response;
  }
}
</script>

<style lang="scss" scoped>
.page__opening_extension__map {
  color: #90a4c3;
}
.abstract_text {
  margin: 50px;
  font-family: "PingFang SC";
  font-size: 40px;
  line-height: 40px;
  letter-spacing: 2.5px;

  span {
    @extend %value__letter;
    color: #ff3980;
    font-size: 48px;
    line-height: 36px;
  }
}

.scroll_table {
  text-align: center;
  font-family: "PingFang SC";
  font-size: 36px;
  line-height: 40px;
  margin: 0 10px;

  .table_head {
    color: #fff;
    font-size: 40px;
    .table_col {
      height: 90px;
    }
  }

  .table_col {
    @extend %flex-center;
    flex-direction: column;
    height: 100px;
  }

  .van-row {
    &.table_head {
      background: rgba(14, 23, 60, 1) !important;
    }
    &:nth-child(even) {
      background: rgba(14, 23, 60, 0.8);
    }
    &:nth-child(odd) {
      background: rgba(14, 23, 60, 0.3);
    }
  }
  .table_body {
    height: 400px;
    overflow: hidden;
  }
}
</style>
