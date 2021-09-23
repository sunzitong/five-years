<template>
  <div class="page__plate">
    <SubWrapperA title="营造盘面详情" style="height: 2750px">
      <TheConstructList v-if="tab === 0" />
      <TheCostAnalysisList v-if="tab === 1" />
    </SubWrapperA>
    <div class="footer">
      <van-tabs
        v-model="tab"
        background="transparent"
        title-inactive-color="#90A4C3"
        title-active-color="#01F5F1"
        :line-height="6"
        :line-width="88"
        color="#01F5F1"
      >
        <van-tab title="营造台账宽表"></van-tab>
        <van-tab title="成本列表"></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base } from "@/views/Base";
import SubWrapperA from "@/components/SubWrapperA/Index.vue";
import TheConstructList from "./components/TheConstructList.vue";
import TheCostAnalysisList from "./components/TheCostAnalysisList.vue";

/**营造盘面详情 */
@Component({
  components: {
    SubWrapperA,
    TheConstructList,
    TheCostAnalysisList,
  },
})
export default class BuildThePlate extends Base {
  tab = 0;
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
  &::v-deep {
    .van-tabs {
      width: 560px;
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
