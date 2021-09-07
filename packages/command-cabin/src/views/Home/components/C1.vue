<template>
  <div class="main-top-info">
    <van-row gutter="30">
      <van-col span="8">
        <Card style="height: 273px">
          <van-row gutter="44" class="row">
            <van-col>
              <Icon type="room-number" :size="200" />
            </van-col>
            <van-col>
              <div class="title">累计获取房间数(万)</div>
              <div class="num" style="color: #48cdfc">
                {{ response.getRoomNum }}
              </div>
            </van-col>
          </van-row>
        </Card>
        <van-row gutter="34" class="srow" type="flex" justify="center">
          <van-col>
            <Icon type="brand" :size="77" />
          </van-col>
          <van-col>
            <div class="title">品牌指数</div>
            <div class="num" style="color: #ee7647">
              NO.{{ response.brandPointNum }}
            </div>
          </van-col>
        </van-row>
      </van-col>
      <van-col span="8">
        <Card style="height: 273px">
          <van-row gutter="44" class="row">
            <van-col>
              <Icon type="number-of-opening-rooms" :size="200" />
            </van-col>
            <van-col>
              <div class="title">累计开业房间数(间)</div>
              <div class="num" style="color: #b07df7">
                {{ response.openRoomNum }}
              </div>
            </van-col>
          </van-row>
        </Card>
        <van-row gutter="34" class="srow" type="flex" justify="center">
          <van-col>
            <Icon type="users" :size="93" />
          </van-col>
          <van-col>
            <div class="title">累计服务用户数</div>
            <div class="num" style="color: #5fceb3">
              {{ response.servedPersonNum }}
            </div>
          </van-col>
        </van-row>
      </van-col>
      <van-col span="8">
        <Card style="height: 273px">
          <van-row gutter="44" class="row">
            <van-col><Icon type="year-income" :size="200" /></van-col>
            <van-col>
              <div class="title">年累总收入(亿)</div>
              <div class="num" style="color: #5fceb3">
                {{ response.incomeNum }}
              </div>
            </van-col>
          </van-row>
        </Card>
        <van-row gutter="34" class="srow" type="flex" justify="center">
          <van-col>
            <Icon type="income" :size="81" />
          </van-col>
          <van-col>
            <div class="title">累计租户</div>
            <div class="num" style="color: #4770ff">
              {{ response.tenantNum }}
            </div>
          </van-col>
        </van-row>
      </van-col>
    </van-row>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Card from "@/components/Card/Index.vue";
import Icon from "@/components/Icon/Index.vue";
import {
  fetchNumYearly,
  NumYearlyReturn,
} from "@/service/analysis/bigScreen/mainBoard/center/numYearly";
import Base from "@/views/Base";

@Component({
  components: {
    Card,
    Icon,
  },
})
export default class C1 extends Base {
  /**
   * 返回数据
   */
  response: NumYearlyReturn = {
    /** 房间间数 */
    getRoomNum: 0,
    /** 累计开业房间间数 */
    openRoomNum: 0,
    /** 年累计收 */
    incomeNum: 0,
    /** 品牌指数 */
    brandPointNum: 1,
    /** 累计服务用户数 */
    servedPersonNum: 0,
    /** 累计租户 */
    tenantNum: 0,
  };

  async created() {
    const response = await fetchNumYearly();
    if (response?.status === "ok") {
      this.response = response.data ?? {};
    }
  }
}
</script>
<style lang="scss" scoped>
.main-top-info {
  margin: 0 66px;
  .row {
    padding-left: 113px;
    .title {
      padding-top: 41px;
      font-size: 40px;
      color: #fff;
    }
    .num {
      font-size: 100px;
      font-weight: bold;
      @extend %value__letter;
    }
  }

  .srow {
    margin: 30px auto;
    .title {
      font-size: 30px;
      color: #fff;
    }
    .num {
      font-size: 66px;
      font-weight: bold;
      @extend %value__letter;
    }
  }
}
</style>
