<template>
  <div class="page__a4__map">
    <div class="cooperation_table">
      <van-row justify="space-between" type="flex" class="table_row table_head">
        <van-col :span="4" class="table_col">{{ indexName[0] }}</van-col>
        <van-col :span="4" class="table_col">{{ indexName[1] }}</van-col>
        <van-col :span="4" class="table_col">{{ indexName[2] }}</van-col>
      </van-row>
      <div class="table_body">
        <van-row
          animated
          v-for="(item, index) in list"
          :key="index"
          justify="space-between"
          type="flex"
          class="table_row"
        >
          <van-col :span="4" class="table_col">{{ item.name }}</van-col>
          <van-col :span="4" class="table_col">{{ item.has }}家</van-col>
          <van-col :span="4" class="table_col">{{ item.ing }}家</van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base } from "@/views/Base";

@Component({
  components: {},
})
export default class A4 extends Base {
  indexName = [
    // 表头
    "",
    "已合作",
    "洽谈中",
  ];

  list = [
    {
      name: "汪汪汪",
      has: 8742,
      ing: 33,
    },
    {
      name: "喵喵喵",
      has: 433,
      ing: 532,
    },
    {
      name: "牟牟牟",
      has: 12,
      ing: 7642,
    },
  ];
}
</script>

<style lang="scss" scoped>
.cooperation_table {
  text-align: center;
  font-family: "PingFang SC";
  font-size: 30px;
  line-height: 50px;
  color: #ffffff;
  margin: 30px 30px 56px 30px;
  text-align: center;
  border-bottom: 1px solid #3e5290;

  .table_head {
    background: rgba(36, 56, 109, 0.7);
    text-align: center;
  }

  .table_body .table_col:nth-child(2),
  .table_body .table_col:nth-child(3) {
    font-family: "PingFang SC";
    font-size: 28px;
    line-height: 50px;
    color: #01f5f1;
  }

  .table_col {
    @extend %flex-center;
    flex-direction: column;
    height: 75px;
    width: 33.3%;
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
