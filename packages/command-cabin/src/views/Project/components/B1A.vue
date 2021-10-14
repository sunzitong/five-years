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

    <div class="select_options_container">
      <div class="app-fixed-nav__btn">
        <FixedNavBtn position="right" text="快捷导航" />
      </div>
      <div v-for="i in num" :key="i" @click="sortList[i - 1] = 1">
        <div>{{ titles[i - 1] }}</div>
        <div class="pic_select_options">
          <span
            v-for="(tab, j) in tabs[i - 1]"
            :key="tab"
            class="slect_btn"
            :class="{ active: j === (sortList[i - 1] || 0) }"
            @click="handleClick(i, j)"
          >
            {{ tab }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref } from "vue-property-decorator";
import { Base } from "@/views/Base";
import { AnyObject } from "@guanyu/shared";
import B1B from "./B1B.vue";
import FixedNavBtn from "@/components/FixedNav/components/FixedNavBtn.vue";

@Component({
  components: { B1B, FixedNavBtn },
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

.select_options_container {
  padding: 48px 70px 48px 50px;
  min-width: 780px;
  height: 614px;
  box-sizing: border-box;

  background: rgba(11, 31, 81, 0.6);
  backdrop-filter: blur(20px);
  border-radius: 10px;

  position: absolute;
  bottom: 42px;
  left: -800px;
  z-index: 1000;

  font-size: 30px;
  line-height: 30px;
  color: #ffffff;
}
.pic_select_options {
  margin: 30px 0 50px 0;
}
.slect_btn {
  padding: 10px 21px;
  font-size: 28px;
  line-height: 28px;
  color: #b4b4b4;
  background: #1c3062;
  border: 1px solid #018da5;
  box-sizing: border-box;
}
.active {
  color: #ffffff;
  background: #203771;
  border: 2px solid #01f5f1;
  box-sizing: border-box;
}

.app-fixed-nav__btn {
  position: absolute;
  // left: -1000px;
}
</style>
