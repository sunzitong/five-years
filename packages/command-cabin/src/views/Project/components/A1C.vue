<template>
  <div class="box">
    <ul class="list">
      <li class="item">
        <div class="name">客户性质</div>
        <div class="desc">{{ formatValue(response.customerProperty) }}</div>
      </li>
      <li class="item">
        <div class="name">合作模式</div>
        <div class="desc">{{ formatValue(response.cooperationMode) }}</div>
      </li>
      <li class="item">
        <div class="name">租赁面积</div>
        <div class="desc">{{ formatValue(response.rentalArea) }}</div>
      </li>
      <li class="item">
        <div class="name">用地性质</div>
        <div class="desc">{{ formatValue(response.useLandNature) }}</div>
      </li>
      <li class="item">
        <div class="name">产权性质</div>
        <div class="desc">
          {{ formatValue(sepNumber(response.propertyRightNature)) }}
        </div>
      </li>
    </ul>
    <a class="footer" @click="toggleDialog">
      <div class="text">
        投资任务书
        <van-icon name="down" />
      </div>
    </a>
    <van-dialog
      class="dialog"
      width="2000"
      v-model="show"
      :show-confirm-button="false"
      :get-container="() => $root.$el"
    >
      <CardB>
        <div class="content">
          <embed width="100%" height="960" :src="response.investmentLink" />
          <span class="cross" @click="toggleDialog">
            <van-icon name="cross" />
          </span>
        </div>
      </CardB>
    </van-dialog>
  </div>
</template>

<script lang="ts">
import {
  ProjectBaseInfoReturn,
  fetchProjectBaseInfo,
} from "@/service/analysis/bigScreen/projectBoard/basicInformation/projectBaseInfo";
import { StoreKey, useStore } from "@/store";
import { Base, IFetch } from "@/views/Base";
import { iwant } from "@guanyu/shared";
import CardB from "@/components/CardB/Index.vue";
import { Component } from "vue-property-decorator";

@Component({
  components: {
    CardB,
  },
})
export default class A1C extends Base implements IFetch {
  show = true;

  response: Partial<ProjectBaseInfoReturn> = {};
  /**
   * 自动触发 重复调用
   * @returns response
   */
  async fetch() {
    const response = await useStore(fetchProjectBaseInfo, {
      key: StoreKey.ProjectBaseInfo,
      params: { orgId: this.store.global.project.orgId },
    });
    if (response?.status === "ok") {
      this.response = iwant.object(response.data);
    }
    return response;
  }

  /**
   * 弹窗显示/隐藏
   */
  toggleDialog() {
    this.show = !this.show;
  }
}
</script>

<style lang="scss" scoped>
$padding-x: 100px;
.box {
  padding: 0 26px;
  font-size: 40px;
  line-height: 1;
  color: #90a4c3;
  height: 534px;
}
.list {
  box-sizing: border-box;
  height: 516px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  background: linear-gradient(
    90deg,
    rgba(65, 105, 158, 0.1) 10%,
    rgba(65, 105, 158, 0) 80%
  );
  padding: 14px 0 14px $padding-x;
  .item {
    display: flex;
    justify-content: space-between;
    line-height: 56px;
    box-sizing: border-box;
    .name {
      flex: 3;
    }
    .desc {
      flex: 5;
    }
  }
}
.footer {
  position: absolute;
  width: 320px;
  height: 80px;
  color: #fff;
  font-size: 36px;
  bottom: 0;
  right: 0;
  backdrop-filter: blur(30px);
  border: 2px solid rgba(81, 128, 228, 0.8);
  border-radius: 10px;
  .text {
    height: 100%;
    @extend %flex-center;
    position: relative;
    z-index: 1;
  }
  .van-icon {
    transform: rotate(-90deg);
    margin-left: 16px;
  }
  &::before {
    background: linear-gradient(
      180deg,
      rgba(81, 128, 228, 0.2) 6%,
      #0e1430 92%
    );
    content: "";
    position: absolute;
    top: -2px;
    right: -2px;
    bottom: -2px;
    left: -2px;
    border-radius: 10px;
  }
}
.dialog {
  background: transparent;
  .content {
    margin: 30px;
  }
  .cross {
    position: absolute;
    right: 0;
    bottom: -40px;
    font-size: 40px;
  }
}
</style>
