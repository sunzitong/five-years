<template>
  <div class="page__plate">
    <SubWrapperA :title="tabs[tab]" style="height: 2750px">
      <TheExpandWideDetail v-if="tab === 0" />
      <TheYearTargetDetail v-if="tab === 1" />
      <TheStrategyCoopDetail v-if="tab === 2" />
    </SubWrapperA>
    <div class="footer">
      <div class="back" @click="back">
        <Icon type="back" :size="30" />
      </div>
      <van-tabs
        v-model="tab"
        background="transparent"
        title-inactive-color="#90A4C3"
        title-active-color="#01F5F1"
        :line-height="6"
        :line-width="88"
        color="#01F5F1"
      >
        <van-tab
          :title="title"
          v-for="(title, index) in tabs"
          :key="index"
        ></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base } from "@/views/Base";
import SubWrapperA from "@/components/SubWrapperA/Index.vue";
import TheExpandWideDetail from "./components/TheExpandWideDetail.vue";
import TheYearTargetDetail from "./components/TheYearTargetDetail.vue";
import TheStrategyCoopDetail from "./components/TheStrategyCoopDetail.vue";
import Icon from "@/components/Icon/Index.vue";

/**营造盘面详情 */
@Component({
  components: {
    SubWrapperA,
    TheExpandWideDetail,
    TheYearTargetDetail,
    TheStrategyCoopDetail,
    Icon,
  },
})
export default class ExpansionThePlate extends Base {
  tabs = ["营造台账宽表", "年度目标表", "战略合作表"];
  tab = 0;
  back() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.page__plate {
  width: 7070px;
  margin: 0 auto;
}
.footer {
  @extend %flex-center;
  height: 110px;
  margin-top: 50px;
  background: linear-gradient(
    270.05deg,
    rgba(50, 107, 152, 0.14) 0.04%,
    rgba(14, 23, 60, 0.7) 50.02%,
    rgba(50, 107, 152, 0.14) 99.96%
  );
  .back {
    width: 100px;
    line-height: 110px;
    margin-right: 10px;
    text-align: center;
    cursor: pointer;
  }
  &::v-deep {
    .van-tabs {
      width: 882px;
      &__wrap {
        height: 110px;
      }
    }
    .van-tab__text {
      font-size: 40px;
      line-height: 110px;
    }
  }
}
</style>
