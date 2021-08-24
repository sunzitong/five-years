<template>
  <div class="page__rank">
    <van-dropdown-menu active-color="#1C7AF7">
      <van-dropdown-item
        v-model="payload.indexCode"
        :options="enums.indexCodeList"
        @change="queryMonthlyIndexNumList"
      />
      <van-dropdown-item
        v-model="payload.range"
        :options="enums.rangeCodeList"
        @change="queryMonthlyIndexNumList"
      />
      <van-dropdown-item
        title="筛选"
        ref="screen"
        title-class="dropdown__item__screen"
      >
        <div class="define__dropdown__item">
          <ButtonSelectGroup
            v-model="payload.optStage"
            :multiple="true"
            title="门店周期（多选）"
            :options="enums.optStageList"
          />
          <ButtonSelectGroup
            v-model="payload.assetType"
            :multiple="true"
            title="资产类型（多选）"
            :options="enums.assetTypeList"
          />
          <div class="buttons">
            <van-button
              style="margin-right: 5px; height: 48px; font-size: 16px"
              block
              plain
              color="#1C7AF7"
              type="primary"
              @click="onReset"
            >
              重置
            </van-button>
            <van-button
              style="margin-left: 5px; height: 48px; font-size: 16px"
              block
              color="#1C7AF7"
              type="primary"
              @click="onConfirm"
            >
              确定
            </van-button>
          </div>
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>
    <ProRankList :dataSource="rankListDataSource" />
  </div>
</template>

<script lang="ts">
import Base from "@/views/Base";
import { DropdownItem } from "vant";
import { iwant } from "@guanyu/shared";
import { Component, Ref } from "vue-property-decorator";
import ProRankList, { DataSourceItemProps } from "@/components/ProRankList.vue";
import ButtonSelectGroup from "@/components/ButtonSelectGroup.vue";
import {
  assetTypeEnum,
  optStageEnum,
  queryMonthlyIndexNumSort,
  RankItemProps,
} from "@/service";

/**
 * 默认门店周期
 */
const DEFULT_OPT_STAGE: optStageEnum[] = ["CLIMBING", "STEADY"];

/**
 * 默认资产类型
 */
const DEFAULT_ASSET_TYPE: assetTypeEnum[] = [
  "HEAVY",
  "MEDIUM",
  "LIGHT_ENTRUST_OPT",
];

@Component({
  components: {
    ButtonSelectGroup,
    ProRankList,
  },
})
export default class Rank extends Base {
  /**
   * 请求参数
   */
  payload = {
    month: `${iwant.date(new Date(), "YYYY-MM")}`, // 考核月度
    indexCode: "",
    range: "",
    projectId: "",
    optStage: DEFULT_OPT_STAGE, // 门店周期
    assetType: DEFAULT_ASSET_TYPE, // 资产类型
  };

  /**
   * 下拉菜单筛选项的实例
   */
  @Ref() readonly screen!: DropdownItem;

  /**
   * 排名列表
   */
  rankListData: RankItemProps[] = [];

  /**
   * 全部枚举的计算属性
   */
  get enums() {
    return this.store.valueEnum ?? {};
  }

  /**
   * 门店id
   */
  get projectId() {
    return (this.$route.query.projectId as string) || "";
  }

  /**
   * 排名列表数据
   */
  get rankListDataSource() {
    const source = iwant.array(this.rankListData).map((item) => {
      const active = Number(item.projectId) === Number(this.projectId);
      return {
        name: item.projectName,
        id: item.projectId,
        class: { active },
        score: item.grade,
      };
    });
    return source;
  }

  /**
   * 渲染完成
   */
  mounted() {
    this.payload.indexCode = iwant.array(this.enums.indexCodeList)[0]?.name; // 指标
    this.payload.range = iwant.array(this.enums.rangeCodeList)[0]?.name; // 范围
    this.payload.projectId = this.projectId;
    this.queryMonthlyIndexNumList();

    /**
     * 小冠原生 picker 变更
     * onPickerChange
     * month 2020-01
     */
    this.getAppPickerValue((month) => {
      this.payload.month = month;
      this.queryMonthlyIndexNumList();
      return true;
    });
  }

  /**
   * 请求月度排名
   */
  async queryMonthlyIndexNumList() {
    const response = await queryMonthlyIndexNumSort(this.payload);
    if (response?.status === "ok") {
      this.rankListData = response.data ?? {};
      /**
       * 设置Picker默认值
       */
      this.setAppPickerDefaultValue({
        // select date 选中的日期
        startDate: this.payload.month,
        type: "month",
      });

      /**
       * 设置picker区间值
       */
      this.setAppPickerRange({
        startDate: "2021-05-01",
        endDate: iwant.date(new Date(), "YYYY-MM-DD") as string,
      });
    }
  }

  /**
   * 筛选确定
   */
  onConfirm() {
    if (iwant.array(this.payload.optStage).length === 0) {
      this.$toast("请至少选择一项门店周期");
      return;
    }
    if (iwant.array(this.payload.assetType).length === 0) {
      this.$toast("请至少选择一项资产类型");
      return;
    }
    this.screen.toggle();
    this.queryMonthlyIndexNumList();
  }

  /**
   * 筛选取消
   */
  onReset() {
    this.payload.optStage = DEFULT_OPT_STAGE; // 门店周期
    this.payload.assetType = DEFAULT_ASSET_TYPE; // 资产类型
  }

  /**
   * 点击LI跳转
   */
  onItemClick(item: DataSourceItemProps) {
    this.$router.push({
      path: "/credit",
      query: {
        projectId: `${item.id}`,
      },
    });
  }
}
</script>

<style lang="scss" scoped>
.page__rank {
  overflow: hidden;
  padding-top: 49px;
}

.buttons {
  display: flex;
}

.define__dropdown__item {
  padding: 18px;
}

.van-dropdown-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

::v-deep {
  .dropdown__item__screen::after {
    content: "\F058";
    transform: rotate(0) translateY(-50%);
    top: 25%;
    right: 2px;
    margin: 0;
    width: 0;
    height: 0;
    border: none;
    font: normal normal normal 14px/1 "vant-icon";
  }
}
</style>
