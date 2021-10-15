<template>
  <div class="container">
    <div class="china"></div>
    <div class="tb-card" v-if="showTable">
      <CardB fill="#113069" :fillOpacity="0.6">
        <table class="sum">
          <tr>
            <td rowspan="3" width="320">{{ store.global.orgTree.orgName }}</td>
            <td colspan="2">新增获取房间数</td>
            <td colspan="2">新增开业间数</td>
          </tr>
          <tr>
            <td>实际</td>
            <td>偏差</td>
            <td>实际</td>
            <td>偏差</td>
          </tr>
          <tr>
            <td>{{ formatValue(tableData.newGetRoomNum) }}间</td>
            <td :class="{ warn: tableData.newGetRoomNumBias < 0 }">
              {{ formatValue(tableData.newGetRoomNumBias) }}间
            </td>
            <td>{{ formatValue(tableData.openRoomNum) }}间</td>
            <td :class="{ warn: tableData.newOpenRoomNumBias < 0 }">
              {{ formatValue(tableData.newOpenRoomNumBias) }}间
            </td>
          </tr>
          <tr>
            <td rowspan="2">项目数据</td>
            <td colspan="2">权益后净利润</td>
            <td colspan="2">收入总额含税</td>
          </tr>
          <tr>
            <td>实际</td>
            <td>偏差</td>
            <td>实际</td>
            <td>偏差</td>
          </tr>
          <tr>
            <td>总计</td>
            <td>{{ formatValue(tableData.netProfitRateAll) }}%</td>
            <td :class="{ warn: tableData.netProfitRateBiasAll < 0 }">
              {{ formatValue(tableData.netProfitRateBiasAll) }}%
            </td>
            <td>{{ formatValue(tableData.totalIncomeAll) }}万</td>
            <td
              :class="{
                warn:
                  tableData.totalIncomeAll /
                    (tableData.totalIncomeAll - tableData.totalIncomeBiasAll) <
                  95,
              }"
            >
              {{ formatValue(tableData.totalIncomeBiasAll) }}万
            </td>
          </tr>
        </table>
        <Animationend
          :scrollMinCount="3"
          :height="300"
          :dataSource="tableData.centerRegionDetails"
        >
          <template v-slot="{ list }">
            <table class="scroll">
              <tr animated v-for="item in list" :key="item.id">
                <td width="320">
                  <div class="proj-name" @click="projectClicked(item)">
                    <div class="van-multi-ellipsis--l2">
                      {{ item.projectName }}
                    </div>
                    <van-icon name="arrow" />
                  </div>
                </td>
                <td>{{ formatValue(item.netProfitRate) }}%</td>
                <td :class="{ warn: item.netProfitRateBias < 0 }">
                  {{ formatValue(item.netProfitRateBias) }}%
                </td>
                <td>{{ formatValue(item.totalIncome) }}万</td>
                <td
                  :class="{
                    warn:
                      item.totalIncome /
                        (item.totalIncome - item.totalIncomeBias) <
                      95,
                  }"
                >
                  {{ formatValue(item.totalIncomeBias) }}万
                </td>
              </tr>
            </table>
          </template>
        </Animationend>
        <div
          class="date"
          v-show="store.global.dateScope === DateScopes.MONTHLY"
        >
          月
        </div>
        <van-icon name="cross" class="close" @click="showTable = false" />
      </CardB>
    </div>
    <ul class="options">
      <li
        v-for="(item, index) in options"
        :key="index"
        class="item"
        :class="{ active: optionIndex === index }"
        @click="setOptionIndex(index)"
      >
        {{ item.text }}
        <StepNumber :to="optionData[item.numName]" :duration="100" />
        <span v-if="index === 2">%</span>
      </li>
    </ul>
    <template v-if="showCircle">
      <div
        v-for="item in mapData"
        :key="item.orgId"
        class="circle"
        :class="{
          circle__city: levelValue === DataLevels.CITY,
          'circle--warn': circleWarn(item),
          'circle--active': circleActive(item),
        }"
        :style="{ left: item.longitude + 'px', top: item.latitude + 'px' }"
        @click="circleClicked(item)"
      >
        <!-- 禁用动画 v-model="item.currentRate" :speed="100" :rate="item[options[optionIndex].limitName]"-->
        <van-circle
          :value="item[options[optionIndex].limitName]"
          :layer-color="getCircleColor(item, 0)"
          :color="getCircleColor(item, 1)"
          :stroke-width="56"
        >
          <div
            class="circle__text"
            v-if="levelValue !== DataLevels.CITY || circleActive(item)"
          >
            <div
              class="value"
              :class="{
                'value--city': levelValue === DataLevels.CITY,
              }"
            >
              {{ item[options[optionIndex].numName] }}
            </div>
            <div
              class="name"
              :class="{
                'name--city': levelValue === DataLevels.CITY,
              }"
            >
              {{ item.orgName }}
            </div>
          </div>
          <div class="circle__text" v-else>
            {{ item.orgName }}
          </div>
        </van-circle>
      </div>
    </template>
    <C4A />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { Base, IFetch } from "@/views/Base";
import StepNumber from "@/components/StepNumber/Index.vue";
import CardB from "@/components/CardB/Index.vue";
import Animationend from "@/components/Animationend/Index.vue";
import {
  DataLevels,
  DateScopes,
} from "@/service/analysis/commandCabin/publicEnum/enums";
import {
  fetchMapChangeBar,
  MapChangeBarReturn,
} from "@/service/analysis/bigScreen/mainBoard/center/mapChangeBar";
import {
  findOrgTreeByOrgId,
  findProjectByPhId,
  StoreKey,
  useStore,
} from "@/store";
import { iwant } from "@guanyu/shared";
import {
  fetchMapCircle,
  MapCircleItemReturn,
} from "@/service/analysis/bigScreen/mainBoard/center/mapCircle";
import { OrgTreeItemReturn } from "@/service/analysis/commandCabin/orgTree";
import {
  CenterRegionDetail,
  fetchRegionDetailsInfo,
  RegionDetailsInfoReturn,
} from "@/service/analysis/bigScreen/mainBoard/center/regionDetailsInfo";

import C4A from "./C4A.vue";

type MapData = (MapCircleItemReturn & {
  currentRate?: number;
})[];

@Component({
  components: {
    StepNumber,
    CardB,
    Animationend,
    C4A,
  },
})
export default class C4 extends Base implements IFetch {
  DateScopes = DateScopes;
  DataLevels = DataLevels;
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
    { numName: "openNum", limitName: "openFinishLimit", text: "新增开业间数" },
    {
      numName: "netProfitsRatio",
      limitName: "netProfitsFinishLimit",
      text: "净利润率",
    },
    {
      numName: "allFormatIncome",
      limitName: "allFormatIncomeFinishLimit",
      text: "主营业务收入(万元)",
    },
  ];
  optionIndex = 0;
  /**
   * 切换条数据
   */
  optionData: Partial<MapChangeBarReturn> = {};
  /**
   * 表格数据
   */
  tableData: Partial<RegionDetailsInfoReturn> = {};
  showTable = false;
  /**
   * 地图圆圈数据
   */
  mapData: MapData = [];

  showCircle = false;

  mounted() {
    this.loopOption();
  }

  beforeDestroy() {
    clearTimeout(this.timer);
  }

  setOptionIndex(index: number) {
    clearTimeout(this.timer);
    this.optionIndex = index;
    this.loopOption(1000 * 120);
  }

  loopOption(sec = 6000) {
    this.timer = setTimeout(() => {
      if (this.optionIndex >= 3) {
        this.optionIndex = 0;
      } else {
        this.optionIndex++;
      }
      this.loopOption();
    }, sec);
  }

  /**
   * 全局切换时
   */
  @Watch("store.global.dataLevel")
  dataLevelChanged(val: DataLevels) {
    if (val === DataLevels.GROUP) {
      this.tableData = {};
      this.showTable = false;
    } else {
      this.fetchDetails();
      this.showTable = true;
    }
  }

  @Watch("levelValue")
  levelValueChanged() {
    this.showCircle = false;
  }

  /**
   * 请求圆圈数据
   * 参数不是直接使用global dateLevel
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
      const data: MapData = iwant.array(response.data);
      data.forEach((item) => {
        if (!item.currentRate) {
          item.currentRate = 0;
        }
      });
      this.mapData = data;
    } else {
      this.mapData = [];
    }
    this.setOptionBar();
    this.showCircle = true;
    return response;
  }

  /**
   * 设置optionBar
   */
  setOptionBar() {
    if (this.store.global.dataLevel === DataLevels.GROUP) {
      this.fetchGroup();
    } else {
      const optionData = this.mapData.find(
        (item) => item.orgId === this.store.global.orgTree.orgId
      );
      this.optionData = optionData || {};
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
      this.optionData = iwant.object(response.data);
    }
  }

  /**
   * 请求表格数据
   */
  async fetchDetails() {
    if (this.store.global.dataLevel === DataLevels.GROUP) {
      return;
    }
    const response = await useStore(fetchRegionDetailsInfo, {
      key: StoreKey.HomeRegionDetailsInfo,
      params: {
        regionType: this.store.global.dataLevel,
        regionId: this.store.global.orgTree.orgId,
        dateScope: this.store.global.dateScope,
      },
    });
    if (response?.status === "ok") {
      this.tableData = iwant.object(response.data);
    }
  }

  /**
   * 点击地图圆圈数据
   * 设置全局组架
   * 设置切换条数据
   */
  async circleClicked(item: OrgTreeItemReturn) {
    const orgTree = await findOrgTreeByOrgId(item.orgId);
    if (!orgTree) return;
    this.store.global.dataLevel = this.levelValue;
    this.store.global.orgTree = orgTree;
    this.showTable = true;
    this.setOptionBar();
    this.fetchDetails();
  }

  /**
   * 选择门店
   * @item 门店数据
   */
  async projectClicked(item: CenterRegionDetail) {
    // 当前门店
    const project = await findProjectByPhId(item.phId);
    if (!project) return;
    // 不能设置全局组架
    // this.store.global.dataLevel = DataLevels.CITY;
    // this.store.global.orgTree = orgTree;
    // 全局门店与全局组架无关
    this.store.global.project = project;
    this.$router.push("/project");
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
      // 收入总额/收入总额预算＜95%时
      return item.allFormatIncomeFinishLimit < 95;
    }
    return false;
  }

  /**
   * 圆圈是否选中
   */
  circleActive(item: MapCircleItemReturn) {
    return item.orgId === this.store.global.orgTree.orgId;
  }

  /**
   * 获取进度颜色
   * @type 1:color 0:layout-color
   */
  getCircleColor(item: MapCircleItemReturn, type: 1 | 0) {
    const isActive = this.circleActive(item);
    if (isActive) {
      return ["#4C452D", "#F7D14A"][type];
    }
    const isWarn = this.circleWarn(item);
    if (isWarn) {
      return ["#75384E", "#FF3980"][type];
    }
    return ["#10674D", "#22CB98"][type];
  }
}
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  height: 1858px;
  --dart: #0e173c;
  --light: rgba(14, 23, 60, 0.5);
}
/* 地图 */
.china {
  position: absolute;
  @extend %bg-img-china;
  width: 2607px;
  height: 2098px;
  left: -330px;
  bottom: 0;
  pointer-events: none;
}
/* 地图数据切换条 */
.options {
  position: absolute;
  left: 0;
  bottom: 560px;
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
    transition: 150ms;
    &.active {
      @extend %bg-img-mopt-1;
      color: #ffffff;
    }
  }
}
/* 地图圆圈 */
.circle {
  transform-origin: center center;
  position: absolute;
  width: 170px;
  height: 170px;
  cursor: pointer;

  &::v-deep {
    .van-circle {
      width: 100%;
      height: 100%;
    }
  }
  &__text {
    @extend %flex-center;
    flex-flow: column nowrap;
    width: 90%;
    height: 90%;
    margin: 5%;
    border-radius: 50%;

    background: rgba(5, 11, 36, 0.1);
    backdrop-filter: blur(10px);
    color: #acbfdc;
    white-space: nowrap;
    position: relative;
    font-weight: normal;
    .name {
      font-size: 30px;
      &--city {
        font-size: 18px;
      }
    }
    .value {
      color: #dbf0ff;
      @extend %value-font;
      font-size: 42px;
      &--city {
        font-size: 25px;
      }
    }
  }
  &__city {
    width: 100px;
    height: 100px;
    font-size: 36px;
  }
}
.circle__city.circle--active {
  transform: scale(1.7);
  z-index: 1;
}
/* 数据表格 */
.tb-card {
  position: absolute;
  bottom: 1000px;
  left: 0;
  .app-card-b {
    width: 1292px;
    max-height: 840px;
  }
  table {
    table-layout: fixed;
    border-collapse: collapse;
    width: 100%;
    border-radius: 6px 6px 0 0;
    overflow: hidden;
    text-align: center;
    color: #90a4c3;
    font-size: 36px;
    tr {
      background: var(--dart);
    }
  }
  .sum {
    tr {
      height: 60px;
      /* 综合数据 */
      &:nth-child(-n + 2) {
        border-bottom: 1px solid #445da5;
      }
      &:nth-child(-n + 3) {
        td {
          border-right: 1px solid #445da5;
          &:nth-last-child(1) {
            border-right: none;
          }
        }
      }
      &:nth-child(3) {
        color: #fff;
      }
      /* 项目数据header */
      &:nth-child(4) {
        border-bottom: 1px solid #445da5;
      }
      &:nth-child(4),
      &:nth-child(5) {
        background: var(--light);
        td {
          border-right: 1px solid #445da5;
          &:nth-last-child(1) {
            border-right: none;
          }
        }
      }
      &:nth-last-child(1) {
        height: 100px;
      }
    }
  }
  .scroll {
    max-height: 300px;
    overflow: hidden;
    tr {
      height: 100px;
      /* 数据行 */
      &:nth-child(2n + 1) {
        background: var(--light);
      }
      &:hover {
        .proj-name {
          color: #01f5f1;
        }
      }
    }
  }

  .date {
    color: #90a4c3;
    font-size: 36px;
    position: absolute;
    bottom: 10px;
    left: 33px;
  }
  .close {
    position: absolute;
    bottom: 0;
    right: 6px;
    color: #fff;
    font-size: 40px;
    padding: 14px;
    cursor: pointer;
  }

  .warn {
    color: #ff3980;
  }

  .proj-name {
    display: flex;
    align-items: center;
    line-height: 1.2;
    cursor: pointer;
  }

  &::v-deep {
    .app-card-b__content {
      padding: 33px 36px 78px 36px;
    }
  }
}
</style>
