<template>
  <div class="page__b1a__map">
    <template v-for="i in num">
      <B1B
        :key="i"
        v-if="i < 4 && i !== 1"
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
        :specialTabIndex="
          i === 1 && specialTabIndex !== -2 ? 2 : specialTabIndex
        "
        :ifChange="ifChange"
        :currentSort.sync="sortList[i - 1]"
        ref="charts"
      />
    </template>

    <div class="select_options_container">
      <div
        @click="toggleNav"
        class="app-fixed-nav__btn"
        :style="{ top: visible ? null : 'auto' }"
      >
        <FixedNavBtn position="right" text="图表切换" />
      </div>
      <div v-if="visible" class="options_tab">
        <div v-for="i in num" :key="i">
          <div>{{ titles[i - 1] }}</div>
          <div class="pic_select_options">
            <span
              v-for="(tab, j) in tabs[i - 1]"
              :key="tab"
              class="slect_btn"
              :class="{ active: j === (sortList[i - 1] || 0) }"
              @click="handleClick(i - 1, j)"
            >
              {{ tab }}
            </span>
          </div>
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

  sortList: number[] = [0, 0, 0, 0];

  /**
   * 是否显示导航
   */
  visible = false;

  handleClick(refIndex: number, tagIndex: number) {
    this.charts[refIndex]?.handleClick(tagIndex);
  }

  /**
   * 切换快捷导航
   */
  toggleNav() {
    this.visible = !this.visible;
  }
}
</script>

<style lang="scss" scoped>
.page__b1a__map {
  position: relative;
  padding: 17px;
  height: 2484px;
}

.select_options_container {
  box-sizing: border-box;
  display: flex;
  align-items: center;

  position: absolute;
  bottom: 0px;
  right: 100%;

  font-size: 30px;
  color: #ffffff;
}
.options_tab {
  width: 662px;
  padding: 48px 70px 48px 50px;
  background: rgba(11, 31, 81, 0.6);
  backdrop-filter: blur(20px);
  border-radius: 10px;
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
  right: 100%;
  height: 380px;
  top: 0;
  bottom: 3px;
  margin: auto 0;
}
</style>
