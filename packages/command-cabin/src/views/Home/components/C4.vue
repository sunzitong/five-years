<template>
  <div class="continer">
    <div class="china"></div>
    <ul class="options">
      <li
        class="item"
        :class="{ active: optionValue === key }"
        v-for="(text, key) in options"
        :key="key"
        @click="optionValue = key"
      >
        {{ text }}
        <StepNumber :to="optionBar[key]" />
        <span v-if="key === 'netProfitsRatio'">%</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
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

@Component({
  components: {
    StepNumber,
  },
})
export default class C4 extends Base implements IFetch {
  /**
   * 总盘面大区、城市
   */
  @Prop({ required: true }) scopeValue!: DataLevels;

  options = {
    newIncreNum: "新增获取房间数",
    openNum: "开业间数",
    netProfitsRatio: "净利润率",
    allFormatIncome: "全业态收入(万元)",
  };

  optionValue: string | null = null;

  optionBar: Partial<MapChangeBarReturn> = {};

  mapData: MapCircleItemReturn[] = [];

  async fetch() {
    const response = await useStore(fetchMapCircle, {
      key: StoreKey.HomeMapCircle,
      params: {
        dataLevel: this.store.global.dataLevel,
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
      if (optionBar) {
        this.optionBar = optionBar;
      }
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
    background-size: 100% 100%;
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
</style>
