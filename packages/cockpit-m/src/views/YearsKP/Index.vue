<template>
  <div class="page__rank">
    <van-dropdown-menu active-color="#1C7AF7">
      <van-dropdown-item
        v-model="payload.range"
        @change="queryYearKPData"
        :options="enums.rangeCodeList"
      />
      <van-dropdown-item :title="assetTypeTitle" ref="screen">
        <div class="define__dropdown__item">
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
import ProRankList from "@/components/ProRankList.vue";
import ButtonSelectGroup from "@/components/ButtonSelectGroup.vue";
import { assetTypeEnum, queryYearlyKpSort, RankItemProps } from "@/service";

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
export default class YearsKP extends Base {
  /**
   * 请求参数
   */
  payload = {
    year: `${iwant.date(new Date(), "YYYY")}`,
    range: "", // 范围
    projectId: "",
    assetType: DEFAULT_ASSET_TYPE, // 资产类型
  };

  /**
   * 下拉菜单筛选项的实例
   */
  @Ref() screen!: DropdownItem;

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
   * 资产类型Map
   */
  get assetTypeMaps() {
    const assetsmap = iwant
      .array(this.enums.assetTypeList)
      .reduce((prev, curr) => {
        prev[curr.name] = curr.text;
        return prev;
      }, {});
    return assetsmap;
  }

  /**
   * 资产类型标题
   */
  get assetTypeTitle() {
    const assets = iwant.array(this.payload.assetType);
    if (assets.length === 0) {
      return "资产类型";
    }
    return assets.map((item) => this.assetTypeMaps[item]).join(",");
  }

  /**
   * 获取排行列表数据
   */
  get rankListDataSource() {
    const source = this.rankListData.map((item) => {
      const active = Number(item.projectId) === Number(this.projectId);
      return {
        name: item.projectName,
        id: item.projectId,
        class: { active },
        score: `${item.grade}%`,
      };
    });
    return source;
  }

  /**
   * 门店id
   */
  get projectId() {
    return (this.$route.query.projectId as string) || "";
  }

  /**
   * 渲染完成
   */
  mounted() {
    this.payload.range = iwant.array(this.enums.rangeCodeList)[0]?.name; // 范围
    this.payload.projectId = this.projectId;
    this.queryYearKPData();

    /**
     * 小冠原生 picker 变更
     * onPickerChange
     */
    this.getAppPickerValue((e) => {
      this.payload.year = e;
      this.queryYearKPData();
      return true;
    });
  }

  /**
   * 获取年度KP列表
   */
  async queryYearKPData() {
    const response = await queryYearlyKpSort(this.payload);
    if (response?.status === "ok") {
      this.rankListData = iwant.array(response.data);
      /**
       * 设置Picker默认值
       */
      this.setAppPickerDefaultValue({
        // select date 选中的日期
        startDate: this.payload.year,
        type: "year",
      });

      /**
       * 设置picker区间值
       */
      this.setAppPickerRange({
        startDate: "2021-01-01",
        endDate: iwant.date(new Date(), "YYYY-MM-DD") as string,
      });
    }
  }

  /**
   * 筛选确定
   */
  onConfirm() {
    if (iwant.array(this.payload.assetType).length === 0) {
      this.$toast("请至少选择一项资产类型");
      return;
    }
    this.screen.toggle();
    this.queryYearKPData();
  }

  /**
   * 筛选取消
   */
  onReset() {
    this.payload.assetType = DEFAULT_ASSET_TYPE;
  }
}
</script>

<style lang="scss" scoped>
.page__rank {
  overflow: hidden;
  padding-top: 50px;
}

.van-dropdown-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.buttons {
  display: flex;
}

.define__dropdown__item {
  padding: 18px;
}
</style>
