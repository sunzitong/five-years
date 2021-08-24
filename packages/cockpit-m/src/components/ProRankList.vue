<template>
  <div class="rank__list">
    <!-- 若当前门店在可视范围以外，该div显示 -->
    <div v-if="selectedStore" v-show="!fixBottom" class="itemContainer fixed">
      <span class="num">
        {{ dataSource.indexOf(selectedStore) + 1 }}
      </span>
      <strong class="name">
        {{ selectedStore.name }}
      </strong>
      <em class="score">
        {{ selectedStore.score }}
      </em>
    </div>
    <div v-if="selectedStore" v-show="!fixBottom" class="gap"></div>
    <ol class="list__wrapper">
      <template v-for="(item, index) of dataSource">
        <!-- 当前门店悬浮 -->
        <li
          v-if="item.id == projectId"
          :key="item.id"
          @click="onItemClick(item, index)"
          :class="item.class"
        >
          <van-sticky offset-top="100vh" @change="handleBottomScroll" />
          <van-sticky :offset-top="toRpx(49)" :z-index="1">
            <div class="itemContainer">
              <span class="num">
                <slot name="index" :item="item" :index="index">
                  {{ index + 1 }}
                </slot>
              </span>
              <strong class="name">
                <slot name="name" :item="item" :index="index">
                  {{ item.name }}
                </slot>
              </strong>
              <em class="score">
                <slot name="score" :item="item" :index="index">
                  {{ item.score }}
                </slot>
              </em>
            </div>
          </van-sticky>
        </li>
        <!-- 其他门店 -->
        <li
          v-else
          :key="item.id"
          @click="onItemClick(item, index)"
          :class="item.class"
        >
          <div class="itemContainer">
            <span class="num">
              <slot name="index" :item="item" :index="index">
                {{ index + 1 }}
              </slot>
            </span>
            <strong class="name">
              <slot name="name" :item="item" :index="index">
                {{ item.name }}
              </slot>
            </strong>
            <em class="score">
              <slot name="score" :item="item" :index="index">
                {{ item.score }}
              </slot>
            </em>
          </div>
        </li>
      </template>
    </ol>
    <van-empty
      :image="emptyImage || 'search'"
      v-if="dataSource.length === 0"
      description="暂无数据"
    />
  </div>
</template>

<script lang="ts">
import Base from "@/views/Base";
import { Component, Inject, Prop } from "vue-property-decorator";
import { toRpx } from "@/utils/tools";

export type DataSourceItemProps = {
  id: string | number;
  name: string;
  score: string;
  class: string | Record<string, boolean> | string[];
};

@Component
export default class ProRankList extends Base {
  toRpx = toRpx;
  @Inject() emptyImage!: string;
  /**
   * 标题
   */
  @Prop({ default: () => [] }) dataSource!: DataSourceItemProps[];

  /**
   * 当前门店在可见区域之外，true
   */
  fixBottom = false;

  projectId = "";

  created() {
    this.projectId = this.$route.query.projectId as string;
  }

  get selectedStore() {
    return this.dataSource.find((item) => item.id == this.projectId) || null;
  }

  mounted() {
    console.log(this.selectedStore);
  }

  onItemClick(item: DataSourceItemProps, index: number) {
    this.$emit("on-item-click", item, index);
  }

  handleBottomScroll(isFixed: boolean) {
    this.fixBottom = isFixed;
  }
}
</script>
<style lang="scss" scoped>
.text__hidden {
  color: rgba(0, 0, 0, 0);
}

.gap {
  height: 56px;
}

.rank__list {
  // border-top: 1px solid #fafafa;

  li {
    position: relative;
    align-items: center;
    // padding: 8px 18px;
    font-family: PingFang SC;
    box-sizing: border-box;

    &::after {
      content: "";
      position: absolute;
      left: 18px;
      right: 18px;
      bottom: 0;
      border-bottom: 1px solid #fafafa;
    }

    &.active {
      background: #dcebff;
      &::after {
        border-bottom: 1px solid rgba(0, 0, 0, 0);
      }
    }
  }

  .itemContainer {
    display: flex;
    padding: 8px 18px;
    width: 100%;
    box-sizing: border-box;

    &.fixed {
      background-color: #dcebff;
      position: fixed;
      top: 49px;
      height: 56px;
      z-index: 1;
    }

    .num {
      height: 40px;
      width: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 16px;
    }

    .name {
      flex: 1;
      margin: 0 8px;
      font-size: 16px;
      line-height: 40px;
      font-weight: normal;
      word-break: break-all;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .score {
      flex: 0.15;
      font-family: DIN Alternate;
      font-weight: bold;
      font-size: 20px;
      line-height: 40px;
      font-style: normal;
      vertical-align: middle;
    }
  }

  li:nth-child(1) .num {
    @extend %bg-img-rank-first;
    @extend .text__hidden;
  }
  li:nth-child(2) .num {
    @extend %bg-img-rank-second;
    @extend .text__hidden;
  }
  li:nth-child(3) .num {
    @extend %bg-img-rank-third;
    @extend .text__hidden;
  }

  // li:active {
  //   background-color: #fafafa;
  //   display: inline-block;
  // }

  ::v-deep {
    .van-sticky--fixed {
      background-color: #dcebff;
    }
  }
}
</style>
