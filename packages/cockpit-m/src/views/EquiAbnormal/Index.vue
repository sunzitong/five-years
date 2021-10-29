<template>
  <div class="page__cus">
    <van-tabs
      sticky
      v-model="active"
      @change="changeTabsHandle"
      color="#1C7AF7"
    >
      <van-tab name="equipment">
        <template #title>
          <span v-zhuge="'设备与能耗异常详情页-设备离线'">设备离线</span>
        </template>
        <EquipmentComponent />
      </van-tab>
      <van-tab name="energy">
        <template #title>
          <span v-zhuge="'设备与能耗异常详情页-能耗异常'">能耗异常</span>
        </template>
        <EnergyComponent ref="energy" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import Base from "@/views/Base";
import { Component, Ref } from "vue-property-decorator";
import EquipmentComponent from "./components/EquipmentComponent.vue";
import EnergyComponent from "./components/EnergyComponent.vue";
import dayjs from "dayjs";

@Component({
  components: {
    EquipmentComponent,
    EnergyComponent,
  },
})
export default class EquiAbnormal extends Base {
  /** 选中什么签 */
  active: "equipment" | "energy" = "equipment";

  dataDate: string | null = dayjs().format("YYYY-MM");

  @Ref() readonly energy!: EnergyComponent;

  mounted() {
    this.getAppPickerValue((month) => {
      console.log("this.dataDate = month;", this.dataDate);
      this.dataDate = month;
      return true;
    });
  }

  changeTabsHandle(name: string) {
    if (name === "equipment") {
      /** 隐藏顶部日期选择 */
      this.hiddenNavButtons("right");
    }

    if (name === "energy") {
      /**
       * 当key为0时隐藏日期选择
       * 当key为1时显示日期选择、此时需要设置默认值
       * 为了不重新设置值，直接调用子组件的方法及子组件选中日期
       */
      this.energy?.showPickerAndSetDefaultValue?.();
    }
  }
}
</script>

<style lang="scss" scoped>
.page__cus {
  padding-top: 12px;
  &::v-deep {
    .pro__card__title {
      color: #232832;
    }
    .van-tabs__wrap {
      padding-bottom: 5px;
    }
  }
}
</style>
