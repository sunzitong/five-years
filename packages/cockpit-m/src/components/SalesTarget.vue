<template>
  <div class="sales-target" :class="progressCls">
    <div class="sales-target__title">{{ title }}</div>
    <div class="sales-target__info">
      <slot>
        <strong class="sales-target__info__num">{{ roomNum }}</strong>
        <em class="sales-target__info__unit">{{ unit }}</em>
        <div class="sales-target__info__progress">
          {{ progress }}
        </div>
      </slot>
    </div>
    <div class="sales-target__progress">
      <div
        class="sales-target__progressinner"
        :style="{ width: progress }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class SalesTarget extends Vue {
  /**
   * 标题
   */
  @Prop() title!: string;

  /**
   * 房间数
   */
  @Prop() roomNum!: string;

  /**
   * 单位
   */
  @Prop() unit!: string;

  /**
   * 进度
   */
  @Prop() progress!: number | string;

  /**
   * 达成
   */
  @Prop({ default: true }) isComplete!: boolean;

  /**
   * 是否达成显示不同class
   */
  get progressCls() {
    return {
      fail: !this.isComplete,
      success: this.isComplete,
    };
  }

  data = Array.from({ length: 10 }).map(() => ({
    title: "房间",
    roomNum: "1/2",
    unit: "间",
    progress: "100%",
  }));
}
</script>
<style lang="scss" scoped>
.sales-target {
  width: 100%;
}

.sales-target.success {
  .sales-target__info__progress {
    color: #45c698;
  }
  .sales-target__progressinner {
    background: linear-gradient(90deg, #526eff 0%, #29d9ff 100%);
  }
}

.sales-target.fail {
  .sales-target__info__progress {
    color: #f15355;
  }
  .sales-target__progressinner {
    background: linear-gradient(90deg, #526eff 0%, #ec3a41 100%);
  }
}

.sales-target__title {
  margin-bottom: 8px;
  color: #64696e;
  font-size: 14px;
}

.sales-target__info {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.sales-target__info__num {
  font-size: 20px;
  color: #232832;
  font-style: normal;
  font-weight: normal;
}

.sales-target__info__unit {
  font-size: 14px;
  color: #232832;
  font-style: normal;
}

.sales-target__info__progress {
  font-size: 14px;
  margin-left: auto;
}

.sales-target__progress {
  height: 4px;
  background: linear-gradient(90deg, #ffffff 0%, #f4f9fa 100%);
  box-shadow: inset -1px -1px 0px #ffffff,
    inset 1px 1px 0px rgba(201, 213, 226, 0.25);
  border-radius: 20px;
}

.sales-target__progressinner {
  height: 100%;
  border-radius: 20px;
  background: linear-gradient(90deg, #526eff 0%, #29d9ff 100%);
}
</style>
