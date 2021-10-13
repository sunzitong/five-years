<template>
  <div class="page__b1a__map">
    <template v-for="i in num">
      <B1B
        :key="i"
        v-if="i < 4"
        :title="titles[i - 1]"
        :tabNames="tabs[i - 1]"
        :xLabel="xLabel"
        :yLabel0="yLabel0[i - 1]"
        :yLabel1="yLabel1[i - 1]"
        :yLabel2="yLabel2[i - 1]"
        :yLabel3="yLabel3[i - 1]"
        :monthTag="monthTag"
        :yearTag="yearTag"
        :yIndex="yIndex[i - 1]"
        :ifChange="ifChange"
        :currentSort.sync="sortList[i - 1]"
        ref="charts"
      />
      <B1B
        :key="i"
        v-else
        :title="titles[i - 1]"
        :tabNames="tabs[i - 1]"
        :xLabel="xLabel"
        :yLabel0="yLabel0[i - 1]"
        :yLabel1="yLabel1[i - 1]"
        :yLabel2="yLabel2[i - 1]"
        :yLabel3="yLabel3[i - 1]"
        :monthTag="monthTag"
        :yearTag="yearTag"
        :yIndex="yIndex[i - 1]"
        :specialTabIndex="specialTabIndex"
        :ifChange="ifChange"
        :currentSort.sync="sortList[i - 1]"
        ref="charts"
      />
    </template>

    <div
      style="
        position: absolute;
        bottom: 100px;
        font-size: 40px;
        background: #000;
      "
    >
      <div
        v-for="i in num"
        :key="i"
        @click="sortList[i - 1] = 1"
        style="margin: 100px"
      >
        {{ titles[i - 1] }}----
        <span
          v-for="(tab, j) in tabs[i - 1]"
          :key="tab"
          :style="{ color: j === (sortList[i - 1] || 0) ? 'red' : '#fff' }"
          @click="handleClick(i, j)"
        >
          {{ j }}
          -{{ tab }}
          {{ sortList[i - 1] }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
import { Base } from "@/views/Base";
import { AnyObject } from "@guanyu/shared";
import B1B from "./B1B.vue";

@Component({
  components: { B1B },
})
export default class B1A extends Base {
  handleClick(refIndex: number, tagIndex: number) {
    this.charts[refIndex - 1]?.handleClick(tagIndex);
  }
  @Ref() charts!: B1B[];
  /**
   * 折线图标题列表
   */
  @Prop({ default: () => [] }) readonly titles!: string[];
  /**
   * 折线图tabs列表
   */
  @Prop({ default: () => [] }) readonly tabs!: string[][];
  /**
   * 折线图数据源
   */
  @Prop({ default: () => ({}) }) readonly list!: AnyObject;

  /**
   * 折线图横坐标
   */
  @Prop({ default: () => [] }) readonly xLabel!: number[][];
  /**
   * 折线图月度数据源1
   */
  @Prop({ default: () => [] }) readonly yLabel0!: number[][];
  /**
   * 折线图数据源2
   */
  @Prop({ default: () => [] }) readonly yLabel1!: number[][][];
  /**
   * 折线图数据源3
   */
  @Prop({ default: () => [] }) readonly yLabel2!: number[][][];
  /**
   * 折线图数据源4
   */
  @Prop({ default: () => [] }) readonly yLabel3!: number[][][];
  /**
   * 折线图数量
   */
  @Prop({ default: () => 0 }) readonly num!: number;
  /**
   * 当前月
   */
  @Prop({ default: () => 0 }) readonly monthTag!: number;
  /**
   * 当前年
   */
  @Prop({ default: () => 0 }) readonly yearTag!: number;
  /**
   * cost tab所在index
   */
  @Prop({ default: () => -1 }) readonly specialTabIndex!: number;
  /**
   * yIndex设置
   */
  @Prop({ default: () => [] }) readonly yIndex!: number[][];
  /**
   * 门店切换标志
   */
  @Prop({ default: () => false }) readonly ifChange!: boolean;

  sortList: number[] = [];
}
</script>

<style lang="scss" scoped>
.page__b1a__map {
  position: relative;
  padding: 80px;
}
</style>
