<template>
  <div class="continer">
    <div class="china"></div>
    <ul class="options">
      <li
        v-for="(item, index) in options"
        :key="index"
        class="item"
        :class="{ active: optionIndex === index }"
        @click="optionIndex = index"
      >
        {{ item.text }}
        <StepNumber :to="optionBar[item.numName]" :duration="100" />
        <span v-if="index === 2">%</span>
      </li>
    </ul>
    <div
      class="circle"
      :class="{ 'circle--warn': circleWarn(item) }"
      v-for="item in mapData"
      :key="item.orgId"
      @click="setOrgTree(item)"
    >
      {{ item.orgName }}
      {{ item[options[optionIndex].numName] }}
      {{ item[options[optionIndex].limitName] }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import StepNumber from "@/components/StepNumber/Index.vue";
import { DataLevels } from "@/service/analysis/commandCabin/publicEnum/enums";
import {
  fetchMapChangeBar,
  MapChangeBarReturn,
} from "@/service/analysis/bigScreen/mainBoard/center/mapChangeBar";
import { StoreKey, useStore } from "@/store";
import { iwant } from "@guanyu/shared";
import {
  fetchMapCircle,
  MapCircleItemReturn,
} from "@/service/analysis/bigScreen/mainBoard/center/mapCircle";
import { OrgTreeItemReturn } from "@/service/analysis/commandCabin/orgTree";

@Component({
  components: {
    StepNumber,
  },
})
export default class C4 extends Base implements IFetch {
  /**
   * 总盘面大区、城市
   */
  @Prop({ required: true }) levelValue!: DataLevels;

  /**
   * 切换条
   */
  options: {
    numName: keyof MapCircleItemReturn;
    limitName: keyof MapCircleItemReturn;
    text: string;
  }[] = [
    {
      numName: "newIncreNum",
      limitName: "newIncreFinishLimit",
      text: "新增获取房间数",
    },
    { numName: "openNum", limitName: "openFinishLimit", text: "开业间数" },
    {
      numName: "netProfitsRatio",
      limitName: "netProfitsFinishLimit",
      text: "净利润率",
    },
    {
      numName: "allFormatIncome",
      limitName: "allFormatIncomeFinishLimit",
      text: "全业态收入(万元)",
    },
  ];
  optionIndex = 2;
  optionBar: Partial<MapChangeBarReturn> = {};

  /**
   * 地图圆圈数据
   */
  mapData: MapCircleItemReturn[] = [];

  /**
   * 请求圆圈数据
   */
  @Watch("levelValue")
  async fetch() {
    const response = await useStore(fetchMapCircle, {
      key: StoreKey.HomeMapCircle,
      params: {
        dataLevel: this.levelValue,
        dateScope: this.store.global.dateScope,
      },
    });
    if (response?.status === "ok") {
      this.mapData = response.data;
    }
    this.setOptionBar();
    return response;
  }

  /**
   * 设置optionBar
   */
  setOptionBar() {
    if (this.store.global.dataLevel === DataLevels.GROUP) {
      this.fetchGroup();
    } else {
      const optionBar = this.mapData.find(
        (item) => item.orgId === this.store.global.orgTree.orgId
      );
      this.optionBar = optionBar || {};
    }
  }

  /**
   * 请求全国数据并设置optionBar
   */
  async fetchGroup() {
    const response = await useStore(fetchMapChangeBar, {
      key: StoreKey.HomeMapChangeBar,
      params: {
        dataLevel: this.store.global.dataLevel,
        dateScope: this.store.global.dateScope,
        levelId: this.store.global.orgTree.orgId,
      },
    });
    if (response?.status === "ok") {
      this.optionBar = iwant.object(response.data);
    }
  }

  /**
   * 设置全局组架
   */
  setOrgTree(item: OrgTreeItemReturn) {
    this.store.global.dataLevel = this.levelValue;
    this.store.global.orgTree = item;
  }

  /**
   * 圆圈颜色
   */
  circleWarn(item: MapCircleItemReturn) {
    // 新增获取房间数
    if (this.optionIndex === 0) {
      return item.newIncreFinishLimit < 100;
    }
    // 开业间数
    if (this.optionIndex === 1) {
      return item.openFinishLimit < 100;
    }
    // 净利润率
    if (this.optionIndex === 2) {
      return item.netProfitsFinishLimit < 100;
    }
    // 全业态收入(万元)
    if (this.optionIndex === 3) {
      // FIXME 收入总额/收入总额预算＜95%时
      return item.allFormatIncomeFinishLimit < 95;
    }
    return false;
  }
}
</script>
<style lang="scss" scoped>
.continer {
  position: relative;
  height: 1858px;
}
.china {
  position: absolute;
  @extend %bg-img-china;
  width: 2607px;
  height: 2098px;
  left: -330px;
  bottom: 0;
  pointer-events: none;
}
.options {
  position: absolute;
  left: 0;
  bottom: 600px;
  font-size: 42px;
  color: #3b8db2;
  cursor: pointer;
  .item {
    @extend %bg-img-mopt-0;
    background-size: 100% 100% !important;
    height: 84px;
    line-height: 84px;
    padding: 0 36px;
    margin: 10px 0;
    &.active {
      @extend %bg-img-mopt-1;
      color: #ffffff;
    }
  }
}
.circle {
  &--warn {
    color: red;
  }
}
</style>
