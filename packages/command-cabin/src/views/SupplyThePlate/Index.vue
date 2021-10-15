<template>
  <div class="page__plate">
    <SubWrapperA title="供销存详情" style="height: 2750px">
      <TheList />
    </SubWrapperA>
    <div class="footer">
      <div class="back" @click="back">
        <Icon type="back" :size="30" />
        返回
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { Base } from "@/views/Base";
import SubWrapperA from "@/components/SubWrapperA/Index.vue";
import TheList from "./components/TheList.vue";
import Icon from "@/components/Icon/Index.vue";

/**营造盘面详情 */
@Component({
  components: {
    SubWrapperA,
    TheList,
    Icon,
  },
})
export default class SupplyThePlate extends Base {
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 140px;
    height: 110px;
    text-align: center;
    cursor: pointer;
    color: #90a4c3;
    font-size: 40px;
  }
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
