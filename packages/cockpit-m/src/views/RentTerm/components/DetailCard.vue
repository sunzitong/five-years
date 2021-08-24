<template>
  <div class="detail_card">
    <div class="yellow_detail_wrap">
      <!-- 上 -->
      <div class="detail_card_top">
        <h2>{{ rentData.title }}</h2>
        <div class="dangerSec">
          <TextCard class="section" :num="rentData.storeMonth" unit="月">
            <template v-slot:cardTitle>
              <div class="card_top">门店</div>
            </template>
          </TextCard>
          <TextCard
            class="section section_part"
            :num="rentData.currentMonthData"
            :numColor="flag === true ? 'color: #232832' : 'color: #FF7A00'"
            unit="%"
          >
            <template v-slot:cardTitle>
              <div class="card_top">本月到期占比</div>
            </template>
          </TextCard>
          <TextCard
            class="section section_part"
            :num="rentData.nextMonthData"
            :numColor="flag === true ? 'color: #232832' : 'color: #FF7A00'"
            unit="%"
          >
            <template v-slot:cardTitle>
              <div class="card_top">下月到期占比</div>
            </template>
          </TextCard>
        </div>
      </div>
      <!-- 下 -->
      <div class="detail_card_bottom">
        <TextCard class="bottom-part" :num="rentData.monthCountry" unit="月">
          <template v-slot:explan>
            <span class="explan">全国</span>
          </template>
        </TextCard>
        <TextCard class="bottom-part" :num="rentData.monthLocal" unit="月">
          <template v-slot:explan>
            <span class="explan">{{ rentData.areaName }}</span>
          </template>
        </TextCard>
        <div class="bottom-part"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Base from "@/views/Base";
import { Component, Prop } from "vue-property-decorator";
import TextCard from "./TextCard.vue";

@Component({
  components: {
    TextCard,
  },
})
export default class DetailCard extends Base {
  @Prop({ default: () => ({}) }) rentData!: any;
  @Prop({ default: false }) flag!: boolean;
}
</script>

<style lang="scss" scoped>
.yellow_detail_wrap {
  margin: 0 16.5px 6px 16.5px;
  padding: 12px 18px 0px 18px;
  border: 0.5px solid #f4f3f7;
  box-sizing: border-box;
  box-shadow: 0px 0px 14px rgba(226, 232, 240, 0.34);
  border-radius: 2px;
  @extend %bg-img-rent-term-background;
  background-position: 264px 76px;
  background-size: 90px 90px;
}

.detail_card_top {
  border-bottom: 1px solid #f5f5f5;

  h2 {
    margin-bottom: 12px;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
  }
}

.dangerSec {
  display: flex;

  .section {
    display: inline-block;
    flex: 1;

    margin-bottom: 15px;
  }
}

.detail_card_bottom {
  display: flex;
  align-items: center;

  padding: 14px 0px;

  .bottom-part {
    display: inline-block;
    flex: 1;
  }

  .explan {
    margin-right: 6px;
    color: rgba(35, 40, 50, 0.7);
  }
}

.card_top {
  margin-bottom: 2px;
  color: rgba(35, 40, 50, 0.7);
}

::v-deep {
  .detail_card_bottom .part_bottom_left {
    font-size: 18px;
  }
}
</style>
