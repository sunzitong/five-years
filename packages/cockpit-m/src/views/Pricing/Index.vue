<template>
  <div class="page__pricing">
    <template v-if="priceData && !noData">
      <ProCard title="调价信号" class="pricing__part">
        <template #extra>
          <SignalLight
            v-for="color in ['GREEN', 'YELLOW', 'RED']"
            :key="color"
            :color="color"
            showLabel
          />
        </template>
        <template>
          <div class="pricing__desc">
            建议日期：{{ priceData.referenceDate }}
          </div>
          <div class="pricing__content">
            <ProTable
              :dataSource="priceData.signal || []"
              :columns="signalColumns"
            >
              <template v-slot:extra="{ cellKey, defaultValue }">
                <SignalLight :color="defaultValue" v-if="cellKey === 'light'" />
                <div class="van-ellipsis" v-else-if="cellKey === 'layoutName'">
                  {{ defaultValue }}
                </div>
                <div v-else-if="cellKey === 'changeNum'">
                  {{ defaultValue > 0 ? `+${defaultValue}` : defaultValue }}%
                </div>
                <div v-else>{{ defaultValue }}</div>
              </template>
            </ProTable>
          </div>
        </template>
      </ProCard>
      <ProCard title="调价分析">
        <template #extra v-if="layoutData.pickerProps.columns.length > 1">
          <ProPicker
            :pickerProps="layoutData.pickerProps"
            v-model="layoutData.pickerValue"
            @change="fetchData"
          >
            <template v-slot:value="{ value }">
              {{ (value && value.layoutName) || value }}
            </template>
          </ProPicker>
        </template>
        <div class="pricing__part">
          <!-- 我情图 -->
          <div class="pricing__title--sub">
            门店库存去化率
            <Tooltip title="门店库存去化率" :content="priceData.mainNote" />
            <Tooltip
              title="调价建议"
              :content="priceData.note"
              :show.sync="showBadgeNote"
              :iconProps="{ hidden: true }"
            />
          </div>
          <MainInfoCharts
            :dataSource="priceData.mainInfo"
            class="pricing__charts"
          />
        </div>
        <div class="pricing__part">
          <!-- 敌情图 -->
          <div class="pricing__title--sub">门店两公里范围内民宅挂牌量价</div>
          <PriceInfoCharts
            :dataSource="priceData.enemyInfo"
            class="pricing__charts"
            type="enemyInfo"
          />
        </div>
        <div class="pricing__part">
          <!-- 行情图 -->
          <div class="pricing__title--sub">城市民宅挂牌量价</div>
          <PriceInfoCharts
            :dataSource="priceData.industryInfo"
            class="pricing__charts"
            type="industryInfo"
          />
        </div>
      </ProCard>
    </template>
    <van-empty :image="emptyImage || 'search'" v-if="noData">
      <template #description>
        <p class="empty__title">您好，您的门店本期暂无调价建议</p>
        <p class="empty__sub-title">可能原因如下：</p>
        <p class="empty__text">1、门店没有进入运营期或进入运营期时间短。</p>
        <p class="empty__text">2、门店近期新签数据较少。</p>
        <p class="empty__text">3、其他系统性原因。</p>
      </template>
    </van-empty>
  </div>
</template>

<script lang="ts">
import Base from "@/views/Base";
import { Component, Inject } from "vue-property-decorator";
import SignalLight from "./components/SignalLight.vue";
import ProTable from "@/components/ProTable.vue";
import ProCard from "@/components/ProCard.vue";
import Tooltip from "@/components/Tooltip.vue";
import ProPicker from "@/components/ProPicker.vue";
import {
  ModifyPrice,
  ModifyPriceLayouts,
  queryModifyPrice,
  queryModifyPriceLayouts,
} from "@/service";
import { iwant, Nullable } from "@guanyu/shared";
import isEmpty from "lodash/isEmpty";
import { toVw } from "@/utils/tools";
import MainInfoCharts from "./components/MainInfoCharts.vue";
import PriceInfoCharts from "./components/PriceInfoCharts.vue";

@Component({
  components: {
    SignalLight,
    ProTable,
    ProCard,
    Tooltip,
    ProPicker,
    MainInfoCharts,
    PriceInfoCharts,
  },
})
export default class PricingPage extends Base {
  @Inject() emptyImage!: string;
  isEmpty = isEmpty;

  // APP右上角点击icon弹窗
  showBadgeNote = false;

  // 调价信号
  signalColumns = [
    { title: "户型", dataIndex: "layoutName" },
    { title: "信号灯", dataIndex: "light", width: toVw(50, true) },
    { title: "建议日销售\n均价（元）", dataIndex: "todayPrice" },
    { title: "建议销售\n均价", dataIndex: "advisePrice" },
    { title: "建议调价\n幅度", dataIndex: "changeNum" },
  ];

  // 户型
  layoutData = {
    pickerProps: {
      columns: [] as ModifyPriceLayouts[],
      valueKey: "layoutName",
      defaultIndex: 0,
    },
    pickerValue: {} as ModifyPriceLayouts,
  };

  // 调价数据
  priceData: Nullable<ModifyPrice> = null;

  projectId = "";

  // 无调价建议
  noData = false;

  async mounted() {
    // 参数判断
    const projectId = iwant.string(this.$route.query.projectId);
    if (!projectId) {
      return;
    }
    this.projectId = projectId;
    // TODO 暂不支持户型参数
    // await this.fetchLayout();
    await this.fetchData();
  }

  // 请求户型下拉列表
  async fetchLayout() {
    const response = await queryModifyPriceLayouts({
      projectId: this.projectId,
    });
    if (response?.status === "ok") {
      const data = iwant.array(response.data);
      this.layoutData.pickerProps.columns = data;
      // 手动赋值 如果由ProPicker绑定需要添加nextTick
      if (!isEmpty(data)) {
        this.layoutData.pickerValue =
          data[this.layoutData.pickerProps.defaultIndex];
      }
    }
  }

  // 请求调价数据
  async fetchData() {
    // const layoutId = this.layoutData.pickerValue.layoutId;
    // if (!layoutId) return;
    const response = await queryModifyPrice({
      projectId: this.projectId,
      // layoutId,
    });
    if (response?.status === "ok") {
      const data = iwant.object(response.data);
      this.noData =
        isEmpty(data?.signal) &&
        isEmpty(data?.mainInfo) &&
        isEmpty(data?.enemyInfo) &&
        isEmpty(data?.industryInfo);
      this.priceData = data;
      // APP右上角点击icon弹窗
      if (!this.noData) {
        this.setAppBadge({
          image: "dirver_action_blue",
          callback: () => {
            this.showBadgeNote = true;
          },
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page__pricing {
  .pricing {
    &__desc {
      font-size: 12px;
      color: #64696e;
      padding: 2px 18px;
      margin-bottom: 10px;
    }
    &__title--sub {
      padding: 2px 18px;
      font-size: 16px;
      color: #232832;
    }
    &__charts {
      margin-top: 12px;
    }
    &__part {
      margin-bottom: 34px;
    }
  }

  .empty {
    &__title {
      font-size: 16px;
      margin: 8px 0 38px;
    }
    &__sub-title {
      font-size: 14px;
      margin-bottom: 10px;
    }
    &__text {
      font-size: 14px;
    }
  }

  &::v-deep {
    .van-empty__description {
      padding: 0 38px;
      font-size: 14px;
      line-height: 20px;
      color: #5b5b5b;
    }
    .pro__card__title h3 {
      font-weight: 500;
      color: #232832;
    }
    .van-empty__description {
      color: #232832;
    }
  }
}
</style>
