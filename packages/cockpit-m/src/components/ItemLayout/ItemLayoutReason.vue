<template>
  <ItemLayout :data="data">
    <template v-slot="{ item, index }">
      <div class="item-layout-reason">
        <div class="item-layout-reason__title">
          {{ index }}、{{ item.title }}
        </div>
        <div class="item-layout-reason__bottom">
          <div class="item-layout-reason__desc">{{ item.desc }}</div>
          <div class="item-layout-reason__level">
            <span class="item-layout-reason__label">匹配度：</span>
            <GradeText>{{ item.level }}</GradeText>
          </div>
        </div>
      </div>
    </template>
  </ItemLayout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ItemLayout from "@/components/ItemLayout/ItemLayout.vue";
import GradeText from "@/components/GradeText.vue";

export type ReasonType = {
  /** 标题 */
  title: string;
  /** 描述 */
  desc: string;
  /** 级别 */
  level: string;
};

@Component({
  components: {
    ItemLayout,
    GradeText,
  },
})
export default class ItemLayoutReason extends Vue {
  /** 数据 */
  @Prop({ default: () => [] }) data!: ReasonType[];
}
</script>

<style lang="scss" scoped>
.item-layout-reason {
  &__title {
    color: #232832;
    font-size: 14px;
    padding-right: 12px;
    margin-bottom: 5px;
  }

  &__label {
    color: #a5aaaf;
  }

  &__bottom {
    display: flex;
    flex-flow: row;
  }

  &__desc {
    color: #a5aaaf;
    font-size: 12px;
  }

  &__level {
    margin-left: 12px;
    white-space: nowrap;
  }
}
</style>
