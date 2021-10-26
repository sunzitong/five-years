<template>
  <div class="app-subwrapper">
    <div class="app-subwrapper__header">
      <div class="app-subwrapper__title">
        {{ title }}
      </div>
      <div class="app-subwrapper__extra">
        <DataSource v-if="dataSource">
          {{ dataSource }}
        </DataSource>
        <slot name="extra"></slot>
      </div>
    </div>
    <div class="app-subwrapper__body">
      <slot>
        <span>{{ title }}</span>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import DataSource from "@/components/DataSource/Index.vue";
import { SourceType } from "../Card/Index.vue";

@Component({
  components: {
    DataSource,
  },
})
export default class SubWrapper extends Vue {
  /**
   * 标题
   */
  @Prop({ default: "" }) title!: string;

  /**
   * 数据来源
   */
  @Prop({ default: "" }) dataSource!: string;

  /**
   * 设置数据来源
   * @param source 来源
   * @param time 时间
   * @returns 数据来源
   */
  setCardDataSource(source: SourceType) {
    const { from, time } = source ?? {};
    if (!from || !time) return;
    this.dataSource = `数据取自${from.toUpperCase()} | 更新时间${time}`;
  }

  mounted() {
    console.log(this.title);
  }
}
</script>

<style lang="scss" scoped>
.app-subwrapper {
  &__header {
    position: relative;
    height: 100px;
    @extend %bg-img-subtitle-bg;
    background-position: left center;
    background-size: 1358px 99px;
    background-color: linear-gradient(
      180deg,
      #001d74 0%,
      rgba(1, 22, 86, 0.61) 89.94%
    );
  }

  &__title {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    color: #fff;
  }

  &__extra {
    position: absolute;
    right: 40px;
    top: 50%;
    color: #fff;
    transform: translateY(-50%);
    font-size: 26px;
    display: flex;

    a {
      color: #fff;
    }
  }

  &__body {
    padding: 40px 30px 0;
    overflow: hidden;
    background: linear-gradient(
      180deg,
      rgba(1, 22, 86, 0.5) 0%,
      rgba(1, 22, 86, 0.61) 100%
    );
    // background: linear-gradient(180deg, #f50 0%, rgba(1, 22, 86, 0.61) 100%);
  }
}
</style>
