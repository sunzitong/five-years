<template>
  <div>
    <ProCard title="ProNotification">
      <div style="margin: 20px">
        <ProNotification theme="RED">红色</ProNotification>
        <ProNotification theme="GREEN">绿色</ProNotification>
        <ProNotification theme="YELLOW">黄色</ProNotification>
      </div>
    </ProCard>
    <ProCard title="GradeText">
      <div style="margin: 20px">
        <GradeText type="higher">较高</GradeText>
        |
        <GradeText type="highest">高</GradeText>
        |
        <GradeText type="middle">中</GradeText>
        |
        <GradeText type="low">低</GradeText>
      </div>
    </ProCard>
    <ProCard title="可选提升方案(ItemLayoutPlane)">
      <ItemLayoutPlane :data="planeData" />
    </ProCard>
    <ProCard title="原因分析(ItemLayoutPlane)">
      <ItemLayoutPlane :data="resonData" />
    </ProCard>

    <ProCard title="原因分析">
      <div class="grid-wrap">
        <div
          class="grid-wrap__item"
          v-for="(item, index) in saleTargetData"
          :key="index"
        >
          <SalesTarget
            :progress="item.progress"
            :roomNum="item.roomNum"
            :unit="item.unit"
            :title="item.title"
            :isComplete="item.isComplete"
          />
        </div>
      </div>
    </ProCard>
    <ProCard title="水球 EchartsLiquidfill">
      <EchartsLiquidfill :value="0.5" />
    </ProCard>
    <ProCard title="动态调价信号 SignalLight">
      <div style="margin: 20px">
        <SignalLight color="RED" showLabel />
        <SignalLight color="GREEN" />
        <SignalLight color="YELLOW" showLabel label="自定义label" />
      </div>
    </ProCard>
    <ProCard title="Tooltip">
      <div style="margin: 20px">
        <Tooltip
          type="popover"
          content="库存去化率 = (月累计新签间数+月累计续租间数)/(上月末库存+月累计到期间数+月累计违退间数)。"
        />
        <span>popover</span>
      </div>
      <div style="margin: 20px">
        <Tooltip
          title="弹窗标题"
          content="库存去化率 = (月累计新签间数+月累计续租间数)/(上月末库存+月累计到期间数+月累计违退间数)。"
        />
        <span>popup</span>
      </div>
    </ProCard>
    <ProCard title="ProPicker">
      <div style="margin: 20px">
        <ProPicker
          :pickerProps="pickerData.props"
          v-model="pickerData.value"
          @change="pickerData.change"
        >
          <template v-slot:value="{ value }">
            {{ (value && value.text) || value }}
          </template>
        </ProPicker>
      </div>
    </ProCard>
    <ProCard title="ProTable">
      <div style="margin: 20px; font-size: 14px; line-height: 3">
        <p>dataSource: 数据源,必传 - []</p>
        <p>columns: 表格配置,必传 - []</p>
        <p>rowKey: 一般设置'id',默认index - string</p>
        <p>sticky: 启用thead粘性布局,默认false - boolean</p>
        <p>stickyTop: sticky模式的offsetTop距离,自动转px,默认0 - number</p>
        <p>trClass: tbody tr className,支持函数 - any</p>
        <p>trStyle: tbody tr style,支持函数 - any</p>
        <p>emptyProps: van-empty props - van-empty</p>
      </div>
    </ProCard>
  </div>
</template>

<script lang="ts">
import Base from "@/views/Base";
import { Component } from "vue-property-decorator";
import GradeText from "@/components/GradeText.vue";
import ProCard from "@/components/ProCard.vue";
import ItemLayoutReason from "@/components/ItemLayout/ItemLayoutReason.vue";
import ItemLayoutPlane from "@/components/ItemLayout/ItemLayoutPlane.vue";
import SalesTarget from "@/components/SalesTarget.vue";
import EchartsLiquidfill from "@/components/EchartsLiquidfill.vue";
import SignalLight from "@/views/Pricing/components/SignalLight.vue";
import Tooltip from "@/components/Tooltip.vue";
import ProPicker from "@/components/ProPicker.vue";
import ProNotification from "@/components/ProNotification.vue";

@Component({
  components: {
    GradeText,
    ProCard,
    ItemLayoutReason,
    ItemLayoutPlane,
    SalesTarget,
    EchartsLiquidfill,
    SignalLight,
    Tooltip,
    ProPicker,
    ProNotification,
  },
})
export default class Example extends Base {
  /** 原因分析 */
  resonData = Array.from({ length: 1 }).map(() => ({
    title: "部分顾客对房间租金及水",
    desc:
      "此退房原因占比高于全国平均水平32此退房原因占比高于全国原因占比高于全国平均水平32.2%。",
    level: "HIGHEST",
    levelDesc: "高",
  }));

  /** 提升方案 */
  planeData = Array.from({ length: 1 }).map(() => ({
    title: "顾客工作变动占比高",
    desc: "此退房原因占比高于全国平均水平23.2%。",
    level: "HIGHER",
    levelDesc: "较高",
  }));

  /** 提升方案 */
  saleTargetData = Array.from({ length: 3 }).map(() => ({
    title: "净增",
    roomNum: "1/2",
    unit: "间",
    isComplete: Math.round(Math.random() * 100) % 2 === 0,
    progress: `${Math.round(Math.random() * 100)}%`,
  }));

  /** ProPicker */
  pickerData = {
    props: {
      columns: [
        { text: "阳光大开间", id: 1 },
        { text: "精选阳光复式", id: 2 },
      ],
      valueKey: "text",
      // defaultIndex: 0,
    },
    value: null,
    change: (val: Record<string, any>) => {
      console.log(val);
    },
  };
}
</script>

<style lang="scss" scoped>
.grid-wrap {
  display: flex;
  flex-flow: wrap;
}

.grid-wrap__item {
  flex-basis: 50%;
  box-sizing: border-box;
  padding: 10px 18px;
}

.grid-wrap__item:nth-child(2n + 1) {
  flex-basis: 50%;
  padding-left: 10px;
}
.pro__card {
  margin: 40px 20px;
  box-shadow: 0 0 1px 1px #f5f5f5;
  overflow: hidden;
}
</style>
