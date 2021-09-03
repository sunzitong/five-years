<template>
  <div class="page__opening_extension__map">
    <div class="abstract_text">
      当前开业风险项目
      <span>{{ riskProject }}</span>
      个，共计
      <span>{{ storeNum }}</span>
      间
    </div>
    <div class="scroll_table">
      <van-row justify="space-between" type="flex" class="table_row table_head">
        <van-col :span="6" class="special">
          <van-row>{{ indexName[0].name }}</van-row>
          <van-row>
            <van-col :span="12" class="special">
              {{ indexName[0].value[0] }}
            </van-col>
            <van-col :span="12" class="special">
              {{ indexName[0].value[1] }}
            </van-col>
          </van-row>
        </van-col>
        <van-col :span="3" class="table_col">{{ indexName[1] }}</van-col>
        <van-col :span="2" class="table_col">{{ indexName[2] }}</van-col>
        <van-col :span="4" class="table_col">{{ indexName[3] }}</van-col>
        <van-col :span="2" class="table_col">{{ indexName[4] }}</van-col>
        <van-col :span="2" class="table_col">{{ indexName[5] }}</van-col>
        <van-col :span="2" class="table_col">{{ indexName[6] }}</van-col>
        <van-col :span="3" class="table_col">{{ indexName[7] }}</van-col>
      </van-row>
      <div class="table_body">
        <van-row
          v-for="(item, index) in col"
          :key="index"
          justify="space-between"
          type="flex"
          class="table_row"
        >
          <van-col :span="3" class="table_col">{{ item.a }}</van-col>
          <van-col :span="3" class="table_col">{{ item.b }}</van-col>
          <van-col :span="3" class="table_col">{{ item.c }}</van-col>
          <van-col :span="2" class="table_col">{{ item.d }}</van-col>
          <van-col :span="4" class="table_col">
            <div class="van-multi-ellipsis--l2">
              {{ item.e }}
            </div>
          </van-col>
          <van-col :span="2" class="table_col">{{ item.f }}</van-col>
          <van-col :span="2" class="table_col">{{ item.g }}</van-col>
          <van-col :span="2" class="table_col">{{ item.h }}</van-col>
          <van-col :span="3" class="table_col">{{ item.i }}</van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class B2 extends Vue {
  @Ref() wrapper!: HTMLDivElement;

  indexName = [
    {
      name: "开业时间",
      value: ["预计算开业时间", "投委会开业时间"],
    },
    "预计开业时间",
    "地区",
    "项目",
    "资产类型",
    "房间数",
    "延期类型",
    "项目卡点",
  ];

  col = [
    {
      a: "2021.9.3",
      b: "2021.9.1",
      c: "2021.7.9",
      d: "成都",
      e: "北京回龙观项目冠寓深圳xxxxxxx",
      f: "重资产",
      g: 343442,
      h: "延期",
      i: "消防证照办理",
    },
    {
      a: 2,
      b: 2,
      c: 2,
      d: 2,
      e: 2,
      f: 2,
      g: 2,
      h: 2,
      i: 2,
    },
    {
      a: 4,
      b: 4,
      c: 4,
      d: 4,
      e: 4,
      f: 4,
      g: 4,
      h: 4,
      i: 4,
    },
    {
      a: 5,
      b: 5,
      c: 5,
      d: 5,
      e: 5,
      f: 5,
      g: 5,
      h: 5,
      i: 5,
    },
    {
      a: 6,
      b: 6,
      c: 6,
      d: 6,
      e: 6,
      f: 6,
      g: 6,
      h: 6,
      i: 6,
    },
  ];

  riskProject = 5;

  storeNum = 100;
}
</script>

<style lang="scss" scoped>
.abstract_text {
  margin: 30px 0 33px 30px;
  font-family: "PingFang SC";
  font-size: 30px;
  line-height: 34px;
  letter-spacing: 2.5px;
  color: #ffffff;

  span {
    font-family: "DIN Alternate";
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
