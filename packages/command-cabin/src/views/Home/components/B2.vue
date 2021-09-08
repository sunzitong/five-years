<template>
  <div class="page__opening_extension__map">
    <div class="abstract_text">
      当前开业风险项目
      <span>{{ riskProject }}</span>
      个，共计
      <span>{{ sepNumber(storeNum) }}</span>
      间
    </div>
    <div class="scroll_table">
      <van-row justify="space-between" type="flex" class="table_row table_head">
        <!-- <van-col :span="6" class="special"> -->
        <!-- <van-row>{{ indexName[0].name }}</van-row> -->
        <!-- <van-row>
            <van-col :span="12" class="special">
              {{ indexName[0].value[0] }}
            </van-col>
            <van-col :span="12" class="special">
              {{ indexName[0].value[1] }}
            </van-col>
          </van-row> -->
        <!-- </van-col> -->
        <van-col :span="4" class="table_col">{{ indexName[0] }}</van-col>
        <van-col :span="3" class="table_col">{{ indexName[1] }}</van-col>
        <van-col :span="4" class="table_col">{{ indexName[2] }}</van-col>
        <van-col :span="3" class="table_col">{{ indexName[3] }}</van-col>
        <van-col :span="3" class="table_col">{{ indexName[4] }}</van-col>
        <van-col :span="3" class="table_col">{{ indexName[5] }}</van-col>
        <van-col :span="4" class="table_col">{{ indexName[6] }}</van-col>
      </van-row>
      <div class="table_body">
        <Animationend :scrollMinCount="5" :height="504" :dataSource="col">
          <template v-slot="{ list }">
            <van-row
              animated
              v-for="(item, index) in list"
              :key="index"
              justify="space-between"
              type="flex"
              class="table_row"
            >
              <!-- <van-col :span="3" class="table_col">{{ item.a }}</van-col>
              <van-col :span="3" class="table_col">{{ item.b }}</van-col> -->
              <van-col :span="4" class="table_col">
                {{ item.planOpenDate }}
              </van-col>
              <van-col :span="3" class="table_col">{{ item.cityName }}</van-col>
              <van-col :span="4" class="table_col">
                <div class="van-multi-ellipsis--l2">
                  {{ item.projectName }}
                </div>
              </van-col>
              <van-col :span="3" class="table_col">
                {{ item.transactionModel }}
              </van-col>
              <van-col :span="3" class="table_col">
                {{ sepNumber(item.roomNum) }}
              </van-col>
              <van-col :span="3" class="table_col">{{ item.riskType }}</van-col>
              <van-col :span="4" class="table_col">
                {{ item.chokePoint }}
              </van-col>
            </van-row>
          </template>
        </Animationend>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import Animationend from "@/components/Animationend/Index.vue";
import {
  fetchProjectDelayInfo,
  ProjectDelayInfoReturn,
} from "@/service/bigScreen/mainBoard/construct/projectDelayInfo";
import { AnyObject, iwant } from "@guanyu/shared";
import dayjs from "dayjs";
import Base from "@/views/Base";

@Component({
  components: {
    Animationend,
  },
})
export default class B2 extends Base {
  @Ref() wrapper!: HTMLDivElement;
  resData: Partial<ProjectDelayInfoReturn> = {};
  year = dayjs().year();

  indexName = [
    // {
    //   name: "开业时间",
    //   value: ["预计算开业时间", "投委会开业时间"],
    // },
    "预计开业时间",
    "地区",
    "项目",
    "资产类型",
    "房间数",
    "延期类型",
    "项目卡点",
  ];

  col: AnyObject[] = [];

  riskProject: number | "--" = "--";

  storeNum: number | "--" = "--";

  async created() {
    const response = await fetchProjectDelayInfo({
      regionType: "group",
      regionId: 85,
      dataTime: this.year,
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
  }
}
</script>

<style lang="scss" scoped>
.page__opening_extension__map {
  margin-top: 12px;
  border-radius: 0 0 14px 14px;
  overflow: hidden;
}
.abstract_text {
  margin: 10px 0 30px 30px;
  font-family: "PingFang SC";
  font-size: 30px;
  line-height: 34px;
  letter-spacing: 2.5px;
  color: #ffffff;

  span {
    @extend %value__letter;
    color: #ff2a76;
    font-size: 40px;
    line-height: 36px;
  }
}

.scroll_table {
  text-align: center;
  font-family: "PingFang SC";
  font-size: 26px;
  line-height: 40px;
  color: #ffffff;

  .table_head {
    background: rgba(36, 56, 109, 0.7);

    .special {
      line-height: 50px;
    }
  }

  .table_col {
    @extend %flex-center;
    flex-direction: column;
    height: 100px;
  }

  .van-row {
    border-bottom: 1px solid #3e5290;
    &:nth-last-child(1) {
      border: none;
    }
  }

  .van-col {
    border-right: 1px solid #3e5290;
    &:nth-last-child(1) {
      border: none;
    }
  }
}
</style>
