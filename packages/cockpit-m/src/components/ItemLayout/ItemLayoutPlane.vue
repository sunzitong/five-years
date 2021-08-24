<template>
  <div>
    <ul class="item-layout-plane">
      <li
        class="item-layout-plane__li"
        v-for="(item, index) of data"
        :key="item.key || index"
        :class="lowerLevel(item.level)"
      >
        <div class="item-layout-plane__li__top">
          <div class="item-layout-plane__li__title">
            {{ index + 1 }}、{{ item.title }}
          </div>
          <div class="item-layout-plane__li__level" v-if="!ignoreLevel">
            <span class="item-layout-plane__li__label">匹配度：</span>
            <GradeText :type="lowerLevel(item.level)">
              {{ item.levelDesc || "-" }}
            </GradeText>
          </div>
        </div>
        <div v-if="item.desc" class="item-layout-plane__li__desc">
          <template v-if="item.url">
            <router-link
              :to="getSpaUrl(item.url)"
              class="item-layout-plane__a"
              v-if="getSpaUrl(item.url)"
            >
              {{ item.desc }}
            </router-link>
            <a class="item-layout-plane__a" :href="item.url" v-else>
              {{ item.desc }}
            </a>
          </template>
          <template v-else>{{ item.desc }}</template>
        </div>
      </li>
    </ul>
    <van-empty
      v-if="!data || data.length === 0"
      :image="emptyImage || 'search'"
      description="暂无数据"
    />
  </div>
</template>

<script lang="ts">
import { Component, Inject, Prop, Vue } from "vue-property-decorator";
import ItemLayout from "@/components/ItemLayout/ItemLayout.vue";
import GradeText from "@/components/GradeText.vue";

export type ReasonType = {
  /** 标题 */
  title: string;
  /** 描述 */
  desc: string;
  /** 级别 */
  level: string;
  /** 级别描述 */
  levelDesc: string;
  /** 描述链接 */
  url?: string;
};

@Component({
  components: {
    ItemLayout,
    GradeText,
  },
})
export default class ItemLayoutReason extends Vue {
  @Inject() emptyImage!: string;
  /** 数据 */
  @Prop({ default: () => [] }) data!: ReasonType[];
  /** 忽略无level的匹配度展示 */
  @Prop({ default: false, type: Boolean }) ignoreLevel!: boolean;

  lowerLevel(level: string) {
    if (!level) return "";
    return level.toLowerCase();
  }

  // 是否是项目内跳转 是返回#之后的地址 否返回false
  getSpaUrl(url: string) {
    if (!url.includes("#")) return false;
    const urlSplit = url.split("#");
    const host = location.href.split("#")[0];
    if (urlSplit[0] === "" || urlSplit[0] === "/") return urlSplit[1];
    return urlSplit[0] === host ? urlSplit[1] : false;
  }
}
</script>

<style lang="scss" scoped>
.item-layout-plane {
  margin: 0 18px;
  &__li {
    overflow: hidden;
    margin-bottom: 8px;
    padding: 10px 12px;
    background: #ffffff;
    border: 0.5px solid #f4f3f7;
    box-sizing: border-box;
    box-shadow: 0px 0px 14px rgba(240, 226, 226, 0.34);
    border-radius: 2px;
    &::before {
      content: "";
      position: absolute;
      right: 0;
      bottom: -10px;
      width: 134px;
      height: 52px;
    }
  }

  &__a {
    color: #a5aaaf;
    text-decoration: underline;
  }

  &__li.highest {
    background: linear-gradient(90deg, #f7faff 0%, #d8e6fe 100%);
    &::before {
      opacity: 1;
      @extend %bg-img-plane-bottom;
    }
    .item-layout-plane__li__desc {
      font-size: 12px;
      color: #000;
    }
  }

  &__li.higher {
    background: linear-gradient(90deg, #fff 0%, #f0f5fb 100%);
    &::before {
      opacity: 0.5;
      @extend %bg-img-plane-bottom;
    }
  }
}

.item-layout-plane__li {
  position: relative;

  &__top {
    position: relative;
    display: flex;
    flex-flow: row;
  }

  &__title {
    flex: 1;
    color: #232832;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 5px;
  }

  &__label {
    color: #a5aaaf;
    font-size: 12px;
  }

  &__level {
    white-space: nowrap;
    margin-left: 12px;
  }

  &__desc {
    position: relative;
    color: #a5aaaf;
    font-size: 10px;
  }
}
</style>
